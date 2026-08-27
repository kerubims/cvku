import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

const COOKIE = "cvku_token";
const DAILY_LIMIT = 15;

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

export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId();
    if (!sessionId)
      return NextResponse.json({ error: "Sesi tidak ditemukan." }, { status: 401 });

    const body = (await request.json()) as { text?: string; field?: string };
    const text = (body.text ?? "").trim();
    if (text.length < 10) {
      return NextResponse.json(
        { error: "Tulis minimal beberapa kata dulu agar AI bisa membantu." },
        { status: 400 }
      );
    }
    if (text.length > 2000) {
      return NextResponse.json(
        { error: "Teks terlalu panjang (maks 2000 karakter)." },
        { status: 400 }
      );
    }

    // Rate limit: 15 assists/day per session
    const used = await pool.query(
      `SELECT count(*)::int AS n FROM ai_usage
       WHERE session_id = $1 AND created_at > now() - interval '24 hours'`,
      [sessionId]
    );
    if (used.rows[0].n >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: `Kuota harian tercapai (${DAILY_LIMIT}x/hari). Coba lagi besok.` },
        { status: 429 }
      );
    }

    const system =
      "Kamu penulis profesional CV bahasa Indonesia. Ubah input kasar user menjadi " +
      "2-4 bullet points CV yang profesional, konkret, dan diawali kata kerja aksi. " +
      "Jangan mengarang pengalaman yang tidak disebut. Jawab HANYA bullet points, " +
      "satu baris per bullet, tanpa nomor, tanpa penjelasan lain.";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let out = "";
    try {
      const res = await fetch(
        "https://api.novita.ai/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct",
            messages: [
              { role: "system", content: system },
              {
                role: "user",
                content: `Konteks kolom: ${body.field ?? "pengalaman"}\nInput mentah: ${text}`,
              },
            ],
            max_tokens: 300,
            temperature: 0.7,
            stream: false,
          }),
          signal: controller.signal,
        }
      );

      if (!res.ok) {
        throw new Error(`AI upstream ${res.status}`);
      }
      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      out = json.choices?.[0]?.message?.content?.trim() ?? "";
    } finally {
      clearTimeout(timeout);
    }

    if (!out) {
      return NextResponse.json(
        { error: "AI tidak mengembalikan hasil. Coba lagi." },
        { status: 502 }
      );
    }

    await pool.query(
      "INSERT INTO ai_usage (session_id, feature, tokens) VALUES ($1, 'assist', $2)",
      [sessionId, Math.ceil(text.length / 4)]
    );

    // Clean common markdown bullets
    const lines = out
      .split("\n")
      .map((l) =>
        l
          .replace(/\*\*/g, "")   // markdown bold
          .replace(/(?<!\w)\*(?!\s)([^*]+)\*(?!\w)/g, "$1") // markdown italic
          .replace(/^[-*•]\s/, "")
          .replace(/^\d+[.)]\s/, "")
          .trim()
      )
      .filter(Boolean);

    return NextResponse.json({ ok: true, result: lines });
  } catch (e) {
    const msg =
      e instanceof Error && e.name === "AbortError"
        ? "AI lambat merespons. Coba lagi."
        : "Gagal memproses AI.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
