import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

const COOKIE = "cvku_token";

export async function getSessionClient() {
  const store = await cookies();
  let token = store.get(COOKIE)?.value;

  if (!token) {
    token = crypto.randomUUID();
    try {
      await pool.query(
        "INSERT INTO sessions (anon_token) VALUES ($1) ON CONFLICT DO NOTHING",
        [token]
      );
    } catch {
      // table may not exist yet in early dev; ignore
    }
    try {
      store.set(COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    } catch {
      // called outside request scope
    }
  }

  return { token, pool };
}
