"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { AtsResult } from "@/lib/ats/types";
import { ScoreGauge } from "./score-gauge";
import { SubScoreList } from "./sub-score-list";
import { ShareButtons } from "./share-buttons";
import { AiAnalysisView } from "./ai-analysis-view";

type Status = "idle" | "loading" | "success" | "error";

export function AtsCheckerClient() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AtsResult | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = (text.trim().length >= 50 || file !== null) && status !== "loading";

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError(null);
    }
  }, []);

  const handleClearFile = useCallback(() => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit) return;

      setStatus("loading");
      setError(null);
      setWarning(null);
      setResult(null);

      try {
        let res: Response;
        if (file) {
          // Multipart upload
          const formData = new FormData();
          formData.append("file", file);
          if (text.trim()) formData.append("text", text);
          formData.append("aiEnabled", aiEnabled ? "true" : "false");

          res = await fetch("/api/ats-score", {
            method: "POST",
            body: formData,
          });
        } else {
          // JSON
          res = await fetch("/api/ats-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, aiEnabled }),
          });
        }

        const data = await res.json();

        if (!res.ok || !data.ok) {
          setStatus("error");
          setError(data.error || "Gagal menghitung skor. Coba lagi.");
          return;
        }

        if (data.warning) setWarning(data.warning);
        setResult(data.result);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError("Tidak bisa terhubung ke server. Periksa koneksi internet Anda.");
      }
    },
    [canSubmit, file, text, aiEnabled]
  );

  const handleReset = useCallback(() => {
    setText("");
    setFile(null);
    setAiEnabled(false);
    setStatus("idle");
    setResult(null);
    setWarning(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      {/* Header */}
      <header className="mb-8 text-center">
        <p className="text-sm font-medium text-emerald-700 mb-2">Gratis • Tanpa Login • Hasil Instan</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          Cek Skor CV ATS Kamu
        </h1>
        <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
          Paste CV atau upload file PDF/DOCX. Sistem akan menganalisis 8 aspek ATS-friendliness
          dan memberikan skor 0-100 plus saran konkret untuk perbaikan.
        </p>
      </header>

      {/* Form */}
      {status !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Textarea */}
          <div>
            <label htmlFor="cv-text" className="block text-sm font-semibold text-zinc-900 mb-2">
              1. Paste CV Anda (plain text)
            </label>
            <textarea
              id="cv-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Salin CV Anda dan tempel di sini. Atau gunakan opsi upload di bawah."
              rows={12}
              maxLength={20_000}
              disabled={status === "loading"}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:bg-zinc-50 disabled:cursor-not-allowed resize-y"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>
                {charCount > 0 ? `${wordCount} kata, ${charCount} karakter` : "Kosongkan jika upload file"}
              </span>
              <span>{charCount}/20.000</span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="flex-1 h-px bg-zinc-200" />
            <span>ATAU</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              2. Upload file (PDF / DOCX, max 5MB)
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                disabled={status === "loading"}
                className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50"
              />
              {file && (
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="text-xs text-zinc-500 hover:text-red-600 underline shrink-0"
                >
                  Hapus
                </button>
              )}
            </div>
            {file && (
              <p className="mt-2 text-xs text-zinc-500">
                File dipilih: <span className="font-medium">{file.name}</span> (
                {(file.size / 1024).toFixed(0)}KB)
              </p>
            )}
          </div>

          {/* AI opt-in */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
                disabled={status === "loading"}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600 disabled:opacity-50"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900">
                  Aktifkan Analisis AI (Opsional, +3-5 detik)
                </p>
                <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                  AI akan menilai <strong>grammar, tone profesional, dan kekuatan narasi</strong>.
                  Skor akhir jadi gabungan skor otomatis (70%) + AI (30%). Defaultnya nonaktif
                  supaya cepat. Powered by OmniRoute.
                </p>
              </div>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading"
              ? aiEnabled
                ? "Menganalisis dengan AI..."
                : "Menganalisis CV..."
              : "Cek Skor CV"}
          </button>

          <p className="text-xs text-zinc-500 text-center">
            CV Anda tidak disimpan ke server. Analisis dilakukan real-time lalu dilupakan.
            Baca{" "}
            <Link href="/privasi" className="text-emerald-700 underline">
              Kebijakan Privasi
            </Link>{" "}
            untuk detail.
          </p>
        </form>
      )}

      {/* Result */}
      {status === "success" && result && (
        <ResultSection
          result={result}
          warning={warning}
          onReset={handleReset}
          aiEnabled={aiEnabled}
        />
      )}
    </div>
  );
}

function ResultSection({
  result,
  warning,
  onReset,
  aiEnabled,
}: {
  result: AtsResult;
  warning: string | null;
  onReset: () => void;
  aiEnabled: boolean;
}) {
  return (
    <div className="space-y-8">
      {warning && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          ⚠️ {warning}
        </div>
      )}

      {/* Score gauge + headline */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
        <ScoreGauge score={result.totalScore} status={result.status} />
        <h2 className="mt-6 text-2xl font-bold text-zinc-900">{result.headline}</h2>
        <p className="mt-2 text-sm text-zinc-500">
          {result.meta.wordCount} kata dianalisis dalam {result.meta.scoringDurationMs}ms
          {aiEnabled && result.aiScore ? ` • + AI: ${result.aiScore}/100` : ""}
        </p>
      </div>

      {/* Sub-scores */}
      <SubScoreList subScores={result.subScores} />

      {/* AI analysis (kalau aktif) */}
      {result.aiAnalysis && (
        <AiAnalysisView analysis={result.aiAnalysis} />
      )}

      {/* Share */}
      <ShareButtons
        score={result.totalScore}
        headline={result.headline}
        url="https://cvku.ksm.web.id/ats-checker"
      />

      {/* Reset button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-sm text-emerald-700 underline hover:text-emerald-800"
        >
          ← Cek CV lain
        </button>
      </div>
    </div>
  );
}
