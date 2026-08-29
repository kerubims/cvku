"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { AtsResult } from "@/lib/ats/types";
import { ScoreGauge } from "./score-gauge";
import { SubScoreList } from "./sub-score-list";
import { ShareButtons } from "./share-buttons";
import { AiAnalysisView } from "./ai-analysis-view";
import { LoadingIndicator } from "./loading-indicator";

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

      {/* Loading state — replaces form during processing */}
      {status === "loading" && (
        <div className="mt-2">
          <LoadingIndicator
            aiEnabled={aiEnabled}
            estimatedSeconds={aiEnabled ? 12 : 4}
          />
        </div>
      )}

      {/* Form */}
      {status !== "success" && status !== "loading" && (
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
              disabled={false}
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
                disabled={false}
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
                disabled={false}
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
            className="group relative w-full overflow-hidden rounded-lg bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="transition-transform group-hover:scale-110"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Cek Skor CV
            </span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 transition-transform duration-500 group-hover:translate-x-0"
              aria-hidden
            />
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
          originalText={text}
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
  originalText,
}: {
  result: AtsResult;
  warning: string | null;
  onReset: () => void;
  aiEnabled: boolean;
  originalText: string;
}) {
  const improvementRoom = Math.max(0, 100 - result.totalScore);
  const isWorthFixing = improvementRoom >= 10;

  // Build "/buat?..." link carrying the original CV text + ats issues so the
  // builder can preselect AI assist mode + scroll to the first issue.
  const builderHref = (() => {
    const params = new URLSearchParams();
    if (originalText.trim().length > 0) {
      params.set("seed", originalText.slice(0, 4000));
    }
    params.set("from", "ats-checker");
    params.set("score", String(result.totalScore));
    if (result.aiAnalysis?.issues?.[0]) {
      params.set("firstIssue", result.aiAnalysis.issues[0].suggestion.slice(0, 200));
    }
    return `/buat?${params.toString()}`;
  })();

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

      {/* 🔧 PERBAIKI SEKARANG — primary CTA to fix issues */}
      {isWorthFixing && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 sm:p-8">
          {/* Subtle pulsing accent — kept persistent per Mas Ubim's request */}
          <div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-300/40 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <span
                className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"
                aria-hidden
              />
              Rekomendasi
            </div>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl">
              CV kamu bisa naik {improvementRoom} poin lagi 🚀
            </h2>
            <p className="mt-2 text-sm text-zinc-700 sm:text-base">
              Kami udah catat {result.subScores.filter((s) => s.status === "poor").length}
              {" "}aspek yang perlu diperbaiki. Mau langsung perbaiki sekarang? Builder CVKu bakal
              prefill CV kamu + kasih saran AI real-time per kalimat.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={builderHref}
                className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-emerald-800 hover:shadow-lg active:scale-[0.99] sm:flex-none sm:px-8"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="transition-transform group-hover:rotate-12"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Perbaiki Sekarang
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 transition-transform duration-700 group-hover:translate-x-0"
                  aria-hidden
                />
              </Link>
              <button
                type="button"
                onClick={onReset}
                className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Cek CV lain dulu
              </button>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              Gratis • Tanpa login • CV kamu tidak disimpan ke server kami
            </p>
          </div>
        </div>
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
