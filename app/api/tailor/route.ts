import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Pool } from "pg";
import { callNovita, NovitaError } from "@/lib/ai/novita";

export const runtime = "nodejs";
export const maxDuration = 60;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

const COOKIE = "cvku_token";
const DAILY_LIMIT = 10; // tailor lebih berat dari assist (1x analisis = beberapa paragraf rewrite)
const MIN_JD_LEN = 100;
const MAX_JD_LEN = 8000;

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

interface TailoredExperience {
  position: string;
  company: string;
  description: string;
}

export interface TailorResult {
  score: number;
  summary: string;
  tailoredExperiences: TailoredExperience[];
  missingKeywords: string[];
  suggestions: string[];
}

const SYSTEM_PROMPT = `Kamu konsultan CV profesional untuk pasar kerja Indonesia.
Bandingkan CV user dengan deskripsi lowongan yang diberikan.

Output JSON dengan struktur:
{
  "score": <integer 0-100, kecocokan>,
  "summary": <string, ringkasan CV yang disesuaikan untuk lowongan, 2-3 kalimat bahasa Indonesia>,
  "tailoredExperiences": <array max 3 item: {position, company, description} dengan description = 2-3 bullet kata kerja aksi + angka/metrik>,
  "missingKeywords": <array 3-7 string, skill/kata kunci lowongan yang belum ada di CV>,
  "suggestions": <array 3-5 string, saran konkret>
}

Aturan:
- Jangan mengarang pengalaman
- Pertahankan nama perusahaan & jabatan, ubah hanya deskripsi
- score realistis berdasarkan gap`;

function extractJson(text: string): TailorResult | null {
  // Strip common wrappers: ```json ... ```, leading prose, trailing prose
  const fence = text.match(/```(?:json)?\s*([\s\S]+?)```/i);
  const raw = fence ? fence[1] : text;
  // Find the first { and last } to handle leading/trailing chatter
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  const candidate = raw.slice(first, last + 1);
  try {
    const parsed = JSON.parse(candidate) as TailorResult;
    // Sanity-check shape
    if (typeof parsed.score !== "number") return null;
    if (typeof parsed.summary !== "string") return null;
    if (!Array.isArray(parsed.tailoredExperiences)) return null;
    if (!Array.isArray(parsed.missingKeywords)) return null;
    if (!Array.isArray(parsed.suggestions)) return null;
    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      summary: parsed.summary,
      tailoredExperiences: parsed.tailoredExperiences.slice(0, 3).map((e) => ({
        position: String(e?.position ?? ""),
        company: String(e?.company ?? ""),
        description: String(e?.description ?? ""),
      })),
      missingKeywords: parsed.missingKeywords.slice(0, 7).map(String),
      suggestions: parsed.suggestions.slice(0, 5).map(String),
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId();
    if (!sessionId)
      return NextResponse.json({ error: "Sesi tidak ditemukan." }, { status: 401 });

    const body = (await request.json()) as {
      jobDescription?: string;
      templateId?: string;
    };
    const jd = (body.jobDescription ?? "").trim();
    if (jd.length < MIN_JD_LEN) {
      return NextResponse.json(
        { error: `Tempel minimal ${MIN_JD_LEN} karakter deskripsi lowongan agar AI bisa menganalisis.` },
        { status: 400 }
      );
    }
    if (jd.length > MAX_JD_LEN) {
      return NextResponse.json(
        { error: `Teks terlalu panjang (maks ${MAX_JD_LEN} karakter).` },
        { status: 400 }
      );
    }

    // Rate limit: 10 tailor/day per session
    const used = await pool.query(
      `SELECT count(*)::int AS n FROM ai_usage
       WHERE session_id = $1 AND feature = 'tailor' AND created_at > now() - interval '24 hours'`,
      [sessionId]
    );
    if (used.rows[0].n >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: `Kuota harian tercapai (${DAILY_LIMIT}x/hari). Coba lagi besok.` },
        { status: 429 }
      );
    }

    // Ambil CV user (kalau ada)
    const cvRes = await pool.query(
      "SELECT id, data FROM resumes WHERE session_id = $1 ORDER BY created_at LIMIT 1",
      [sessionId]
    );
    if (cvRes.rows.length === 0) {
      return NextResponse.json(
        { error: "Buat CV dulu sebelum menggunakan Tailor." },
        { status: 400 }
      );
    }
    const resumeId = cvRes.rows[0].id as string;
    const cvData = cvRes.rows[0].data as {
      fullName?: string;
      jobTitle?: string;
      summary?: string;
      experiences?: { position: string; company: string; description: string }[];
      skills?: string[];
    };

    // Compact CV jadi ringkas untuk prompt
    const expSummary = (cvData.experiences ?? [])
      .slice(0, 3)
      .map(
        (e, i) =>
          `${i + 1}. ${e.position} @ ${e.company}\n   ${(e.description || "").slice(0, 400)}`
      )
      .join("\n");
    const userPrompt = `CV USER:
Nama: ${cvData.fullName || "(belum diisi)"}
Jabatan saat ini: ${cvData.jobTitle || "(belum diisi)"}
Ringkasan: ${(cvData.summary || "").slice(0, 500)}
Pengalaman (3 teratas):
${expSummary || "(belum ada)"}
Skill: ${(cvData.skills ?? []).join(", ") || "(belum ada)"}

DESKRIPSI LOWONGAN:
${jd}

Tolong analisis kecocokan dan output JSON sesuai format.`;

    let result: TailorResult;
    try {
      const aiText = await callNovita(SYSTEM_PROMPT, userPrompt, {
        maxTokens: 900,
        temperature: 0.4,
        timeoutMs: 45_000,
        jsonMode: true,
      });
      const parsed = extractJson(aiText);
      if (!parsed) {
        return NextResponse.json(
          { error: "AI mengembalikan format yang tidak bisa dibaca. Coba ubah deskripsi lowongan." },
          { status: 502 }
        );
      }
      result = parsed;
    } catch (e) {
      if (e instanceof NovitaError) {
        return NextResponse.json({ error: e.message }, { status: 502 });
      }
      return NextResponse.json({ error: "Gagal memproses AI." }, { status: 500 });
    }

    // Log + persist
    await pool.query(
      "INSERT INTO ai_usage (session_id, feature, tokens) VALUES ($1, 'tailor', $2)",
      [sessionId, Math.ceil(jd.length / 4)]
    );
    await pool.query(
      `INSERT INTO job_tailors (resume_id, job_description, score, result)
       VALUES ($1, $2, $3, $4)`,
      [resumeId, jd.slice(0, 2000), result.score, JSON.stringify(result)]
    );

    return NextResponse.json({ ok: true, result });
  } catch (e) {
    return NextResponse.json({ error: "Gagal memproses permintaan." }, { status: 500 });
  }
}
