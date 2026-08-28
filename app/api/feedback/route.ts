import { NextResponse } from "next/server";
import { Pool } from "pg";
import { AuthError, requireAdmin } from "@/lib/auth";
import { getClientIp } from "@/lib/rate-limit";

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

/** POST — public submit (no auth) */
export async function POST(request: Request) {
  let body: { email?: string; message?: string; pageUrl?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const pageUrl = (body.pageUrl ?? "").trim().slice(0, 500) || null;

  if (email.length < MIN_EMAIL || email.length > MAX_EMAIL) {
    return NextResponse.json(
      { error: "Email harus 5–254 karakter." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Format email tidak valid." },
      { status: 400 }
    );
  }
  if (message.length < MIN_MSG || message.length > MAX_MSG) {
    return NextResponse.json(
      { error: `Feedback harus ${MIN_MSG}–${MAX_MSG} karakter.` },
      { status: 400 }
    );
  }

  const userAgent = request.headers.get("user-agent")?.slice(0, 500) || null;
  const ip = getClientIp(request);

  try {
    const result = await pool.query(
      `INSERT INTO feedback (email, message, page_url, user_agent, ip)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [email, message, pageUrl, userAgent, ip]
    );
    return NextResponse.json({
      ok: true,
      id: result.rows[0].id,
      message: "Terima kasih! Feedback kamu sudah kami terima.",
    });
  } catch (err) {
    console.error("[/api/feedback POST] error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan feedback. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

/** GET — admin only, list feedback */
export async function GET(request: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    throw err;
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50", 10) || 50, 200);
  const onlyUnread = url.searchParams.get("unread") === "1";

  const where = onlyUnread ? "WHERE is_read = false" : "";

  try {
    const items = await pool.query(
      `SELECT id, email, message, page_url, user_agent, ip, created_at, is_read
       FROM feedback
       ${where}
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );
    const counts = await pool.query(
      `SELECT count(*)::int AS total,
              count(*) FILTER (WHERE is_read = false)::int AS unread
       FROM feedback`
    );
    return NextResponse.json({
      ok: true,
      total: counts.rows[0].total,
      unread: counts.rows[0].unread,
      items: items.rows,
    });
  } catch (err) {
    console.error("[/api/feedback GET] error:", err);
    return NextResponse.json(
      { error: "Gagal membaca feedback." },
      { status: 500 }
    );
  }
}

/** PATCH — admin only, mark as read/unread */
export async function PATCH(request: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    throw err;
  }

  let body: { id?: string; is_read?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  const id = body.id;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id wajib." }, { status: 400 });
  }
  const isRead = body.is_read !== false; // default true

  try {
    const result = await pool.query(
      `UPDATE feedback SET is_read = $1 WHERE id = $2 RETURNING id, is_read`,
      [isRead, id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Feedback tidak ditemukan." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      ok: true,
      id: result.rows[0].id,
      is_read: result.rows[0].is_read,
    });
  } catch (err) {
    console.error("[/api/feedback PATCH] error:", err);
    return NextResponse.json(
      { error: "Gagal update feedback." },
      { status: 500 }
    );
  }
}

/** DELETE — admin only, hapus 1 feedback (untuk moderation) */
export async function DELETE(request: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    throw err;
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib di query." }, { status: 400 });
  }

  try {
    const result = await pool.query(`DELETE FROM feedback WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Feedback tidak ditemukan." },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[/api/feedback DELETE] error:", err);
    return NextResponse.json(
      { error: "Gagal hapus feedback." },
      { status: 500 }
    );
  }
}
