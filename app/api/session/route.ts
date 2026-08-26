import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

const COOKIE = "cvku_token";

/** Ensure a session row exists for this anon token and return its id. */
export async function ensureSession(): Promise<string | null> {
  const store = await cookies();
  let token = store.get(COOKIE)?.value;

  if (!token) {
    token = crypto.randomUUID();
    store.set(COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  const existing = await pool.query(
    "SELECT id FROM sessions WHERE anon_token = $1",
    [token]
  );
  if (existing.rows.length > 0) return existing.rows[0].id as string;

  const inserted = await pool.query(
    "INSERT INTO sessions (anon_token) VALUES ($1) RETURNING id",
    [token]
  );
  return inserted.rows[0].id as string;
}

export async function POST() {
  try {
    const sessionId = await ensureSession();
    return NextResponse.json({ ok: true, sessionId });
  } catch {
    return NextResponse.json({ error: "DB belum siap." }, { status: 500 });
  }
}
