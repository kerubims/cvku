/**
 * POST /api/auth/login
 *
 * Body: { email: string, password: string }
 * 200: { ok: true, user: { id, email, name, role } }
 * 400/401/403/429/500: { error: string, code?: string }
 *
 * Rate limited: 10 / menit / IP.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AuthError,
  getSession,
  login,
  trackSession,
  type SessionData,
} from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const Body = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);

  // 1. Rate limit per IP
  const rl = rateLimit(`login:${ip ?? "unknown"}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan. Coba lagi dalam ${rl.retryAfter} detik.`,
        code: "RATE_LIMITED",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      }
    );
  }

  // 2. Parse + validate body
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request tidak valid.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Email atau password tidak valid.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  // 3. Login
  try {
    const user = await login(parsed.data.email, parsed.data.password, {
      ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    });

    // 4. Set iron-session cookie
    const session = await getSession();
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    session.user = user;
    session.sessionId = sessionId;
    session.expiresAt = expiresAt.getTime();
    await session.save();

    // 5. Track di admin_sessions (audit)
    await trackSession(sessionId, user.id, {
      ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    }, expiresAt);

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    if (err instanceof AuthError) {
      const status =
        err.code === "ACCOUNT_LOCKED" ? 423 :
        err.code === "ACCOUNT_DISABLED" ? 403 :
        err.code === "INVALID_CREDENTIALS" ? 401 :
        400;
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status }
      );
    }
    console.error("[/api/auth/login] error:", err);
    return NextResponse.json(
      { error: "Server error. Coba lagi nanti.", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
