"use client";

import { useState } from "react";
import type { CVData, Experience } from "@/lib/cv-data";

interface TailoredExperience {
  position: string;
  company: string;
  description: string;
}

interface TailorResult {
  score: number;
  summary: string;
  tailoredExperiences: TailoredExperience[];
  missingKeywords: string[];
  suggestions: string[];
}

export function TailorSection({
  cv,
  update,
  save,
}: {
  cv: CVData;
  update: (patch: Partial<CVData>) => void;
  save: (data: CVData, templateId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [jd, setJd] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<TailorResult | null>(null);

  const minLen = 100;
  const canSubmit = jd.trim().length >= minLen && !busy;

  async function analyze() {
    setErr(null);
    setResult(null);
    setBusy(true);
    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd, templateId: "T1" }),
      });
      const data = (await res.json()) as { ok?: boolean; result?: TailorResult; error?: string };
      if (!res.ok || !data.ok || !data.result) {
        setErr(data.error || `Gagal (HTTP ${res.status})`);
        return;
      }
      setResult(data.result);
    } catch (e) {
      setErr("Tidak bisa menghubungi server. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  function applySummary() {
    if (!result) return;
    update({ summary: result.summary });
    setTimeout(() => save(cv, "T1"), 0);
  }

  function applyExperience(idx: number) {
    if (!result) return;
    const target = result.tailoredExperiences[idx];
    if (!target) return;
    const next: Experience[] = cv.experiences.map((e, i) =>
      i === idx ? { ...e, description: target.description } : e
    );
    update({ experiences: next });
    setTimeout(() => save(cv, "T1"), 0);
  }

  function scoreColor(s: number) {
    if (s >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (s >= 50) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-rose-100 text-rose-800 border-rose-300";
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 sm:p-5">
      <header className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">
            🎯 Tailor untuk Lowongan
          </h3>
          <p className="text-xs text-zinc-600 mt-0.5">
            Tempel deskripsi lowongan, AI akan menilai kecocokan & menulis ulang CV supaya lebih relevan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          {open ? "Tutup" : "Buka"}
        </button>
      </header>

      {open && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Deskripsi lowongan kerja
            </label>
            <textarea
              className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm leading-relaxed focus:border-emerald-600 focus:outline-none"
              rows={6}
              placeholder="Tempel deskripsi lowongan di sini (minimal 100 karakter)..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              maxLength={8000}
            />
            <div className="mt-1 flex items-center justify-between text-xs">
              <span
                className={
                  jd.trim().length < minLen ? "text-zinc-500" : "text-emerald-700"
                }
              >
                {jd.trim().length} / {minLen}+ karakter
              </span>
              <span className="text-zinc-400">Kuota: 10x/hari</span>
            </div>
          </div>

          <button
            type="button"
            onClick={analyze}
            disabled={!canSubmit}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? "Menganalisis..." : "Analisis dengan AI"}
          </button>

          {err && (
            <p className="rounded-lg border border-rose-300 bg-rose-50 p-3 text-xs text-rose-800">
              {err}
            </p>
          )}

          {result && (
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">
                  Skor Kecocokan
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-bold ${scoreColor(
                    result.score
                  )}`}
                >
                  {result.score} / 100
                </span>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-xs font-semibold text-zinc-700">
                    Ringkasan (tailored)
                  </p>
                  <button
                    type="button"
                    onClick={applySummary}
                    className="rounded-md border border-emerald-600 px-2 py-0.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                  >
                    Terapkan ke CV
                  </button>
                </div>
                <p className="rounded-lg bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-800">
                  {result.summary}
                </p>
              </div>

              {result.tailoredExperiences.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-zinc-700">
                    Pengalaman (tailored, max 3)
                  </p>
                  <div className="space-y-2">
                    {result.tailoredExperiences.map((t, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-zinc-200 bg-zinc-50 p-3"
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-zinc-900">
                            {t.position}
                            {t.company ? ` @ ${t.company}` : ""}
                          </p>
                          {i < cv.experiences.length && (
                            <button
                              type="button"
                              onClick={() => applyExperience(i)}
                              className="shrink-0 rounded-md border border-emerald-600 px-2 py-0.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              Terapkan #{i + 1}
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-zinc-700 whitespace-pre-line">
                          {t.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.missingKeywords.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-700">
                    Keyword yang belum ada di CV
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((k, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 text-xs text-rose-800"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.suggestions.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-700">
                    Saran
                  </p>
                  <ul className="list-disc list-outside ml-5 space-y-0.5 text-xs text-zinc-700">
                    {result.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-[10px] text-zinc-400">
                ⚠ Hasil AI bisa tidak akurat. Tinjau ulang sebelum dipakai.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
