/**
 * Seed script: create first admin user (or reset password).
 *
 * Usage:
 *   # Local (with .env in repo root)
 *   npx tsx scripts/seed-admin.ts admin@example.com 'MyP@ssw0rd123' "Admin Name"
 *
 *   # Server (satu-baris, pakai docker compose exec)
 *   sudo docker compose -f /home/roo/Documents/project_joki/cvku/docker-compose.yml \
 *     exec -T -e SEED_EMAIL=... -e SEED_PASSWORD=... -e SEED_NAME=... web \
 *     node dist/scripts/seed-admin.js
 *
 * Env alternative: set SEED_EMAIL, SEED_PASSWORD, SEED_NAME.
 *
 * Idempotent: kalau email sudah ada di admins, update password + reset lockout.
 * Jangan commit password ke git.
 */
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

// Load .env dari repo root (kalau ada)
try {
  dotenv.config({ path: ".env" });
} catch {
  // ok — di production env di-pass via docker
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2,
});

async function main() {
  const email = (process.argv[2] || process.env.SEED_EMAIL || "").trim().toLowerCase();
  const password = process.argv[3] || process.env.SEED_PASSWORD || "";
  const name = (process.argv[4] || process.env.SEED_NAME || "Admin").trim();

  if (!email || !password) {
    console.error("Usage: seed-admin.ts <email> <password> [name]");
    console.error("   or: SEED_EMAIL=... SEED_PASSWORD=... SEED_NAME=... seed-admin.ts");
    process.exit(2);
  }
  if (password.length < 8) {
    console.error("Error: password minimal 8 karakter.");
    process.exit(2);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Error: format email tidak valid.");
    process.exit(2);
  }

  console.log(`[seed-admin] Hashing password (bcrypt cost 10)…`);
  const passwordHash = await bcrypt.hash(password, 10);

  const role = "superadmin"; // First user = superadmin (bisa tambah admin lain nanti)

  const result = await pool.query<{ id: string; email: string; name: string; role: string }>(
    `INSERT INTO admins (email, password_hash, name, role, is_active, failed_attempts, locked_until)
     VALUES ($1, $2, $3, $4, true, 0, NULL)
     ON CONFLICT (lower(email)) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name,
           role = EXCLUDED.role,
           is_active = true,
           failed_attempts = 0,
           locked_until = NULL,
           updated_at = now()
     RETURNING id, email, name, role`,
    [email, passwordHash, name, role]
  );

  const row = result.rows[0];
  console.log(`[seed-admin] OK — id=${row.id} email=${row.email} name="${row.name}" role=${row.role}`);

  await pool.end();
}

main().catch((err) => {
  console.error("[seed-admin] FAILED:", err);
  process.exit(1);
});
