/**
 * POST /api/auth/logout
 *
 * Hapus session: hapus row di admin_sessions + clear iron-session cookie.
 */
import { NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const session = await getSession();
  if (session.sessionId) {
    await destroySession(session.sessionId);
  }
  session.destroy();
  return NextResponse.json({ ok: true });
}
