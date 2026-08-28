/**
 * GET /api/auth/me
 *
 * Return info user yang sedang login (atau 401 kalau tidak).
 * Dipakai client untuk cek status login.
 */
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session.user) {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }
  return NextResponse.json({ ok: true, user: session.user });
}
