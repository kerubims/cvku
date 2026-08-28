import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MSG = 5;
const MAX_MSG = 2000;
const MIN_EMAIL = 5;
const MAX_EMAIL = 254;

// Simple IP extractor (works behind Cloudflare / proxy)
function getClientIp(req: Request): string | null {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf;
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return null;
}

function isAuthorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  // Fail-closed: if no token set, no one can read
  if (!token) return false;
  const auth = req.headers.get("authorization") ?? "";
  // Accept "Bearer xxx" or raw token
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : auth;
  // Constant-time compare
  if (provided.length !== token.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return mismatch === 0;
}

/** POST — public submit */
export async function POST(request: Request) {
  let body: { email?: string; message?: string; pageUrl?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const message = (body.message ?? "").trim();
  const pageUrl = (body.pageUrl ?? "").trim().slice(0, 500) || null;
  const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;
  const ip = getClientIp(request);

  if (email.length < MIN_EMAIL || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Format email tidak valid." },
      { status: 400 }
    );
  }
  if (message.length < MIN_MSG) {
    return NextResponse.json(
      { error: `Feedback minimal ${MIN_MSG} karakter.` },
      { status: 400 }
    );
  }
  if (message.length > MAX_MSG) {
    return NextResponse.json(
      { error: `Feedback maksimal ${MAX_MSG} karakter.` },
      { status: 400 }
    );
  }

  try {
    await pool.query(
      `INSERT INTO feedback (email, message, page_url, user_agent, ip)
       VALUES ($1, $2, $3, $4, $5::inet)`,
      [email, message, pageUrl, userAgent, ip]
    );
    return NextResponse.json({
      ok: true,
      message: "Terima kasih! Feedback kamu sudah kami terima.",
    });
  } catch (err) {
    console.error("[feedback POST] DB error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan. Coba lagi sebentar." },
      { status: 500 }
    );
  }
}

/** GET — admin only, list feedback (newest first) */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Butuh header Authorization: Bearer <ADMIN_TOKEN>." },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "100", 10) || 100, 500);
  const offset = Math.max(parseInt(url.searchParams.get("offset") ?? "0", 10) || 0, 0);
  const onlyUnread = url.searchParams.get("unread") === "1";

  try {
    const params: unknown[] = [];
    let where = "";
    if (onlyUnread) {
      where = "WHERE is_read = false";
    }
    params.push(limit, offset);
    const r = await pool.query(
      `SELECT id, email, message, page_url, user_agent, ip, created_at, is_read
       FROM feedback
       ${where}
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      params
    );
    const total = await pool.query(
      `SELECT count(*)::int AS n, count(*) FILTER (WHERE is_read = false)::int AS unread FROM feedback`
    );
    return NextResponse.json({
      ok: true,
      total: total.rows[0].n,
      unread: total.rows[0].unread,
      items: r.rows,
    });
  } catch (err) {
    console.error("[feedback GET] DB error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

/** PATCH — admin only, mark as read/unread */
export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: string; is_read?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }
  if (!body.id || typeof body.is_read !== "boolean") {
    return NextResponse.json(
      { error: "Butuh field id dan is_read." },
      { status: 400 }
    );
  }

  try {
    const r = await pool.query(
      `UPDATE feedback SET is_read = $1 WHERE id = $2 RETURNING id, is_read`,
      [body.is_read, body.id]
    );
    if (r.rowCount === 0) {
      return NextResponse.json({ error: "ID tidak ditemukan." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id: r.rows[0].id, is_read: r.rows[0].is_read });
  } catch (err) {
    console.error("[feedback PATCH] DB error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
