/**
 * POST /api/ats-score
 *
 * Body (multipart/form-data):
 *   - file: PDF atau DOCX (optional, max 5MB)
 *   - text: plain text CV (optional, kalau tidak ada file)
 *   - aiEnabled: "true"/"false" (opt-in untuk AI analysis)
 *
 * Body (application/json):
 *   { text: string, aiEnabled?: boolean, jobDescription?: string }
 *
 * Return: { ok: true, result: AtsResult } atau { ok: false, error: string }
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import { scoreAts } from "@/lib/ats/scorer";
import { parseResumeFile, ParseError, MAX_FILE_SIZE } from "@/lib/ats/parse-resume";
import { analyzeCvWithAi, computeAiScore, mergeAiIntoResult } from "@/lib/ai/ats-analyzer";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import type { AtsResult } from "@/lib/ats/types";

export const runtime = "nodejs";
// ATS scoring is dynamic per-request
export const dynamic = "force-dynamic";
// Max body size: 6MB (5MB file + 1MB overhead)
export const maxDuration = 60; // 60s max (AI call bisa lama)

const JsonBodySchema = z.object({
  text: z.string().min(50, "CV minimal 50 karakter").max(20_000, "CV terlalu panjang (max 20.000 karakter)"),
  aiEnabled: z.boolean().optional().default(false),
  jobDescription: z.string().max(10_000).optional(),
});

export async function POST(request: NextRequest) {
  // Rate limit: 20 cek/jam per IP (lebih longgar dari auth karena fitur publik)
  const ip = getClientIp(request) || "unknown";
  const rl = rateLimit(`ats:${ip}`, 20, 60 * 60_000); // 20/jam
  if (!rl.ok) {
    return Response.json(
      { ok: false, error: "Terlalu banyak request. Coba lagi nanti.", code: "RATE_LIMITED", retryAfter: rl.retryAfter },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let cvText: string;
  let aiEnabled = false;
  let jobDescription: string | undefined;

  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // File upload path
      const formData = await request.formData();
      const file = formData.get("file");
      const text = formData.get("text");
      const aiFlag = formData.get("aiEnabled");
      const jd = formData.get("jobDescription");

      if (aiFlag === "true" || aiFlag === "1") aiEnabled = true;
      if (typeof jd === "string") jobDescription = jd;

      if (file instanceof File) {
        // Validate file size early
        if (file.size > MAX_FILE_SIZE) {
          return Response.json(
            { ok: false, error: `File terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 5MB.`, code: "FILE_TOO_LARGE" },
            { status: 413 }
          );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const parsed = await parseResumeFile(buffer, file.name, file.type);
        cvText = parsed.text;
      } else if (typeof text === "string" && text.length > 0) {
        cvText = text;
      } else {
        return Response.json(
          { ok: false, error: "Upload file PDF/DOCX atau paste CV sebagai teks.", code: "EMPTY_INPUT" },
          { status: 400 }
        );
      }
    } else if (contentType.includes("application/json")) {
      // JSON path (paste text only)
      const body = await request.json();
      const parsed = JsonBodySchema.safeParse(body);
      if (!parsed.success) {
        return Response.json(
          { ok: false, error: parsed.error.issues[0]?.message || "Invalid input", code: "VALIDATION_ERROR" },
          { status: 400 }
        );
      }
      cvText = parsed.data.text;
      aiEnabled = parsed.data.aiEnabled ?? false;
      jobDescription = parsed.data.jobDescription;
    } else {
      return Response.json(
        { ok: false, error: "Content-Type harus multipart/form-data atau application/json", code: "UNSUPPORTED_CONTENT_TYPE" },
        { status: 415 }
      );
    }
  } catch (err) {
    return Response.json(
      { ok: false, error: "Gagal membaca input", code: "PARSE_ERROR" },
      { status: 400 }
    );
  }

  // Validate final text
  const trimmed = cvText.trim();
  if (trimmed.length < 50) {
    return Response.json(
      { ok: false, error: "CV terlalu pendek. Minimal 50 karakter.", code: "TEXT_TOO_SHORT" },
      { status: 400 }
    );
  }

  // Limit input size (prevent abuse)
  if (trimmed.length > 20_000) {
    return Response.json(
      { ok: false, error: "CV terlalu panjang (max 20.000 karakter).", code: "TEXT_TOO_LONG" },
      { status: 413 }
    );
  }

  // Run deterministic scoring
  let result: AtsResult;
  try {
    result = await scoreAts({ text: trimmed, aiEnabled, jobDescription });
  } catch (err) {
    console.error("[ats-score] deterministic error:", err);
    return Response.json(
      { ok: false, error: "Gagal menghitung skor.", code: "SCORING_ERROR" },
      { status: 500 }
    );
  }

  // Optional: AI analysis (opt-in, fallback ke deterministic-only kalau gagal)
  if (aiEnabled) {
    try {
      const analysis = await analyzeCvWithAi(trimmed);
      const aiScore = computeAiScore(analysis);
      result = mergeAiIntoResult(result, analysis, aiScore);
    } catch (err) {
      // Fallback: tetap kasih deterministic result + warning
      const message = err instanceof Error ? err.message : "AI analysis gagal";
      console.error("[ats-score] AI error:", err);
      return Response.json({
        ok: true,
        result,
        warning: `AI analysis tidak tersedia (${message}). Hasil di bawah hanya dari pengecekan otomatis.`,
      });
    }
  }

  return Response.json({ ok: true, result });
}

// Catch runtime errors gracefully
export async function GET() {
  return Response.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
