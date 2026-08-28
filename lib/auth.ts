/**
 * Auth library untuk CVKu admin panel.
 *
 * Stack: iron-session (encrypted cookies) + bcryptjs (password hash) + PostgreSQL (admin users).
 *
 * Flow:
 *   1. User submit email+password di /admin/login
 *   2. POST /api/auth/login → cek bcrypt hash di tabel `admins`
 *   3. Berhasil: set encrypted cookie session via iron-session
 *   4. middleware.ts cek cookie existence → redirect ke /admin/login kalau tidak ada
 *   5. /api/feedback GET/PATCH/DELETE cek session via `requireAdmin()`
 *
 * Security:
 *   - Cookie: HttpOnly + Secure (prod) + SameSite=Lax + encrypted
 *   - Session duration: 7 hari, sliding window
 *   - Failed attempts tracking + lockout setelah 5x salah
 *   - Rate limit per IP di /api/auth/login
 *   - Constant-time compare (iron-session + bcrypt)
 */
import { cookies } from "next/headers";
import { getIronSession, type IronSession } from "iron-session";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

// ============== Types ==============

export type AdminRole = "admin" | "superadmin";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

export type SessionData = {
  user?: AdminUser;
  sessionId?: string;  // row id di admin_sessions
  expiresAt?: number;   // epoch ms
};

// ============== iron-session config ==============

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  const password = process.env.IRON_SESSION_PASSWORD;
  if (!password || password.length < 32) {
    throw new Error(
      "IRON_SESSION_PASSWORD must be set and at least 32 characters. " +
        "Generate one with: openssl rand -base64 32"
    );
  }
  return {
    cookieName: "cvku_admin_session",
    password,
    cookieOptions: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    },
  };
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, getCookieOptions());
}

// ============== DB queries ==============

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export class AuthError extends Error {
  constructor(
    message: string,
    public code:
      | "INVALID_INPUT"
      | "INVALID_CREDENTIALS"
      | "ACCOUNT_LOCKED"
      | "ACCOUNT_DISABLED"
      | "RATE_LIMITED"
      | "SERVER_ERROR"
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export async function login(
  email: string,
  password: string,
  meta: { ip: string | null; userAgent: string | null }
): Promise<AdminUser> {
  if (!email || !password) {
    throw new AuthError("Email dan password wajib.", "INVALID_INPUT");
  }
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Ambil admin row
  const { rows } = await pool.query<{
    id: string;
    email: string;
    password_hash: string;
    name: string;
    role: AdminRole;
    is_active: boolean;
    failed_attempts: number;
    locked_until: Date | null;
  }>(
    `SELECT id, email, password_hash, name, role, is_active,
            failed_attempts, locked_until
     FROM admins
     WHERE lower(email) = $1
     LIMIT 1`,
    [normalizedEmail]
  );

  if (rows.length === 0) {
    // Constant-time-ish: tetap jalankan bcrypt untuk avoid timing oracle
    await bcrypt.hash(password, 10);
    throw new AuthError("Email atau password salah.", "INVALID_CREDENTIALS");
  }

  const admin = rows[0];

  // 2. Cek lockout
  if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
    const minutes = Math.ceil(
      (new Date(admin.locked_until).getTime() - Date.now()) / 60_000
    );
    throw new AuthError(
      `Akun terkunci karena terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.`,
      "ACCOUNT_LOCKED"
    );
  }

  // 3. Cek is_active
  if (!admin.is_active) {
    throw new AuthError("Akun dinonaktifkan.", "ACCOUNT_DISABLED");
  }

  // 4. Verify password (bcrypt)
  const valid = await bcrypt.compare(password, admin.password_hash);

  if (!valid) {
    // Increment failed_attempts, lock kalau > 5
    const newFailed = admin.failed_attempts + 1;
    const shouldLock = newFailed >= MAX_FAILED_ATTEMPTS;
    await pool.query(
      `UPDATE admins
       SET failed_attempts = $1,
           locked_until = $2,
           updated_at = now()
       WHERE id = $3`,
      [
        newFailed,
        shouldLock
          ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000)
          : null,
        admin.id,
      ]
    );
    if (shouldLock) {
      throw new AuthError(
        `Akun terkunci karena ${MAX_FAILED_ATTEMPTS}x percobaan salah. Coba lagi dalam ${LOCKOUT_MINUTES} menit.`,
        "ACCOUNT_LOCKED"
      );
    }
    throw new AuthError("Email atau password salah.", "INVALID_CREDENTIALS");
  }

  // 5. Berhasil — reset failed_attempts, update last_login
  await pool.query(
    `UPDATE admins
     SET failed_attempts = 0,
         locked_until = NULL,
         last_login_at = now(),
         last_login_ip = $2,
         updated_at = now()
     WHERE id = $1`,
    [admin.id, meta.ip]
  );

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };
}

export async function trackSession(
  sessionId: string,
  adminId: string,
  meta: { ip: string | null; userAgent: string | null },
  expiresAt: Date
): Promise<void> {
  await pool.query(
    `INSERT INTO admin_sessions (id, admin_id, ip, user_agent, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE
       SET last_seen_at = now()`,
    [sessionId, adminId, meta.ip, meta.userAgent, expiresAt]
  );
}

export async function destroySession(sessionId: string): Promise<void> {
  await pool.query(`DELETE FROM admin_sessions WHERE id = $1`, [sessionId]);
}

/**
 * Untuk dipakai di API route: cek session, throw kalau tidak valid.
 * Returns admin user + session id.
 */
export async function requireAdmin(): Promise<{
  user: AdminUser;
  sessionId: string;
}> {
  const session = await getSession();
  if (!session.user || !session.sessionId) {
    throw new AuthError("Unauthorized. Silakan login.", "INVALID_CREDENTIALS");
  }
  return { user: session.user, sessionId: session.sessionId };
}
