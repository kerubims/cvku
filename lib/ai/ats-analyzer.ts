/**
 * AI analysis layer untuk ATS Score Checker (opt-in).
 *
 * Panggil OmniRoute untuk evaluasi grammar, tone, dan impact.
 * Return JSON terstruktur sesuai schema (pakai response_format: json_object).
 *
 * Biaya: 1 call per score. Default free model (auto/best-free) → ~3-5 detik.
 */

import { omnirouteChat, OmniRouteError } from "./omniroute";
import type { AtsResult } from "../ats/types";

export interface AiAnalysis {
  grammarScore: number;
  toneScore: number;
  impactScore: number;
  issues: { text: string; suggestion: string; reason: string }[];
  hiringImpression: string;
  suggestions: string[];
}

const SYSTEM_PROMPT = `Kamu adalah HRD senior di perusahaan teknologi Indonesia yang mengevaluasi CV (resume) untuk posisi entry-level hingga mid-level.

Tugasmu: analisis CV ini secara HOLISTIK (grammar, tone profesional, kekuatan narasi, kesan ke HRD).

PENTING:
- Output HARUS JSON valid (pakai response_format: json_object)
- Skor 0-100 untuk masing-masing aspek
- Deteksi 1-5 kalimat/kalimat-frasa yang bisa diperkuat
- Beri kesan HRD keseluruhan (1-2 kalimat singkat, jujur tapi tidak menghakimi)
- Saran konkret yang bisa langsung dipakai

JANGAN:
- Mengarang pengalaman yang tidak ada di CV
- Memberi skor palsu (kalau CV jelek, bilang jelek)
- Pakai bahasa Inggris kecuali untuk istilah teknis
- Lebih dari 5 issues (prioritaskan yang paling impactful)`;

function buildUserPrompt(cvText: string): string {
  return `Berikut CV yang akan dianalisis. Tolong return JSON valid sesuai schema:

{
  "grammarScore": <0-100>,
  "toneScore": <0-100, 100=sangat profesional>,
  "impactScore": <0-100, 100=pencapaiannya sangat kuat>,
  "issues": [
    {
      "text": "<kalimat atau frasa asli dari CV>",
      "suggestion": "<versi yang lebih kuat>",
      "reason": "<kenapa perlu diperbaiki>"
    }
    // max 5 issue
  ],
  "hiringImpression": "<1-2 kalimat kesan HRD>",
  "suggestions": [
    "<saran konkret 1>",
    "<saran konkret 2>",
    // max 3
  ]
}

CV yang akan dianalisis:
---
${cvText.slice(0, 4000)}
---

Return JSON valid. TIDAK BOLEH ada teks di luar JSON.`;
}

function tryParseJson(text: string): AiAnalysis | null {
  // Try direct parse
  try {
    const parsed = JSON.parse(text);
    return validateAnalysis(parsed);
  } catch {
    // Try extract JSON block
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return validateAnalysis(JSON.parse(match[0]));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function validateAnalysis(obj: unknown): AiAnalysis | null {
  if (typeof obj !== "object" || obj === null) return null;
  const o = obj as Record<string, unknown>;

  const num = (v: unknown, fallback: number): number => {
    const n = typeof v === "number" ? v : Number(v);
    if (isNaN(n) || n < 0) return fallback;
    return Math.min(100, Math.max(0, Math.round(n)));
  };
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const str = (v: unknown, fallback: string): string =>
    typeof v === "string" && v.trim() ? v : fallback;

  const issues = arr<{ text?: string; suggestion?: string; reason?: string }>(o.issues)
    .slice(0, 5)
    .map((it) => ({
      text: str(it.text, ""),
      suggestion: str(it.suggestion, ""),
      reason: str(it.reason, ""),
    }))
    .filter((it) => it.text && it.suggestion);

  return {
    grammarScore: num(o.grammarScore, 70),
    toneScore: num(o.toneScore, 70),
    impactScore: num(o.impactScore, 60),
    issues,
    hiringImpression: str(o.hiringImpression, "CV cukup standar."),
    suggestions: arr<string>(o.suggestions)
      .slice(0, 3)
      .map((s) => str(s, "")),
  };
}

/**
 * Run AI analysis (opt-in) on CV text.
 * Throws OmniRouteError jika API gagal (caller handle fallback).
 */
export async function analyzeCvWithAi(cvText: string): Promise<AiAnalysis> {
  const content = await omnirouteChat(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(cvText) },
    ],
    {
      maxTokens: 1500,
      temperature: 0.3,
      responseFormat: { type: "json_object" },
      timeoutMs: 45_000,
    }
  );

  const analysis = tryParseJson(content);
  if (!analysis) {
    throw new OmniRouteError(
      "Gagal parse JSON dari AI response",
      502,
      "INVALID_JSON"
    );
  }
  return analysis;
}

/**
 * Compute weighted AI score (0-100) untuk blending dengan deterministic.
 * Bobot: grammar 20%, tone 30%, impact 50% (impact paling penting).
 */
export function computeAiScore(analysis: AiAnalysis): number {
  return Math.round(
    analysis.grammarScore * 0.2 + analysis.toneScore * 0.3 + analysis.impactScore * 0.5
  );
}

/**
 * Merge AI analysis ke AtsResult.
 * Skor final = 70% deterministic + 30% AI (kalau AI enabled & success).
 */
export function mergeAiIntoResult(
  base: AtsResult,
  analysis: AiAnalysis,
  aiScore: number
): AtsResult {
  const blended = Math.round(base.totalScore * 0.7 + aiScore * 0.3);
  // Adjust headline based on blended score
  let headline = base.headline;
  if (blended >= 85) {
    headline = "CV ini sangat ATS-friendly dan memiliki kesan profesional yang kuat!";
  } else if (blended >= 65) {
    headline = "CV ini lumayan, dengan beberapa catatan untuk diperkuat.";
  } else if (blended >= 40) {
    headline = "CV ini perlu perbaikan substansial sebelum dikirim.";
  } else {
    headline = "CV ini kemungkinan besar ditolak. Perbaiki dulu sebelum apply.";
  }

  return {
    ...base,
    totalScore: blended,
    status: blended >= 85 ? "excellent" : blended >= 65 ? "good" : blended >= 40 ? "fair" : "poor",
    aiEnabled: true,
    aiScore,
    aiAnalysis: analysis,
    headline,
  };
}
