import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

const COOKIE = "cvku_token";

async function getSessionId(): Promise<string | null> {
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
  const r = await pool.query("SELECT id FROM sessions WHERE anon_token = $1", [token]);
  if (r.rows.length > 0) return r.rows[0].id as string;
  const ins = await pool.query(
    "INSERT INTO sessions (anon_token) VALUES ($1) RETURNING id",
    [token]
  );
  return ins.rows[0].id as string;
}

/** Upsert the single draft resume for this anonymous session. */
export async function PUT(request: Request) {
  try {
    const sessionId = await getSessionId();

    const body = (await request.json()) as {
      templateId?: string;
      data?: unknown;
    };

    const existing = await pool.query(
      "SELECT id FROM resumes WHERE session_id = $1 ORDER BY created_at LIMIT 1",
      [sessionId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE resumes SET data = $2, template_id = COALESCE($3, template_id),
         updated_at = now() WHERE id = $1`,
        [existing.rows[0].id, JSON.stringify(body.data ?? {}), body.templateId ?? null]
      );
      return NextResponse.json({ ok: true, id: existing.rows[0].id });
    }

    const inserted = await pool.query(
      `INSERT INTO resumes (session_id, template_id, data, title)
       VALUES ($1, $2, $3, 'CV Saya') RETURNING id`,
      [sessionId, body.templateId ?? "T1", JSON.stringify(body.data ?? {})]
    );
    return NextResponse.json({ ok: true, id: inserted.rows[0].id });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sessionId = await getSessionId();
    if (!sessionId) return NextResponse.json({ resume: null });

    const r = await pool.query(
      "SELECT id, template_id, data, updated_at FROM resumes WHERE session_id = $1 ORDER BY created_at LIMIT 1",
      [sessionId]
    );
    if (r.rows.length === 0) return NextResponse.json({ resume: null });

    return NextResponse.json({
      resume: {
        id: r.rows[0].id,
        templateId: r.rows[0].template_id,
        data: r.rows[0].data,
        updatedAt: r.rows[0].updated_at,
      },
    });
  } catch {
    return NextResponse.json({ error: "Gagal memuat." }, { status: 500 });
  }
}
