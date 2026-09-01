"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Membaca CV", icon: "doc" },
  { label: "Cek format & kontak", icon: "check" },
  { label: "Analisis struktur", icon: "list" },
  { label: "Deteksi skill & grammar", icon: "spell" },
  { label: "AI review", icon: "spark" },
];

const ROTATING_MESSAGES = [
  "Menganalisis format CV...",
  "Memeriksa informasi kontak...",
  "Mengevaluasi struktur section...",
  "Mendeteksi action verbs...",
  "Mengukur pencapaian terukur...",
  "Menganalisis densitas skill...",
  "Menyiapkan skor akhir...",
];

function StepIcon({ name, active }: { name: string; active: boolean }) {
  const color = active ? "text-emerald-700" : "text-zinc-300";
  const common = { width: 16, height: 16, viewBox: "0 0 20 20", fill: "currentColor" } as const;
  switch (name) {
    case "doc":
      return (
        <svg {...common} className={color}>
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0013.586 3H4zm7 2a1 1 0 011 1v3.586l1.207-1.207a1 1 0 011.414 1.414l-2.828 2.828a1 1 0 01-1.414 0L7.379 9.793a1 1 0 011.414-1.414L10 9.586V6a1 1 0 011-1z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} className={color}>
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "list":
      return (
        <svg {...common} className={color}>
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "spell":
      return (
        <svg {...common} className={color}>
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} className={color}>
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
      );
    default:
      return null;
  }
}

export function LoadingIndicator({
  aiEnabled,
  estimatedSeconds = 8,
}: {
  aiEnabled: boolean;
  estimatedSeconds?: number;
}) {
  const [step, setStep] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const totalSteps = aiEnabled ? 5 : 4;
  const stepDurationMs = (estimatedSeconds * 1000) / totalSteps;

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, totalSteps - 1));
    }, stepDurationMs);
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % ROTATING_MESSAGES.length);
    }, 1800);
    const tickTimer = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => {
      clearInterval(stepTimer);
      clearInterval(msgTimer);
      clearInterval(tickTimer);
    };
  }, [stepDurationMs, totalSteps]);

  const progressPct = Math.min(100, Math.round(((step + 1) / totalSteps) * 100));
  const aiNote = aiEnabled ? " (+ AI)" : "";

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl sm:rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-zinc-50 p-4 sm:p-8 shadow-sm"
    >
      {/* Top: spinning ring + headline */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-emerald-100" />
          <div
            className="absolute inset-0 h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-transparent border-t-emerald-600 border-r-emerald-600"
            style={{ animationDuration: "0.9s" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-emerald-700"
              aria-hidden="true"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h2 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-zinc-900">
          {aiEnabled ? "Menganalisis dengan AI..." : "Menganalisis CV..."}
        </h2>
        <p
          className="mt-1 text-xs sm:text-sm text-zinc-600 transition-opacity duration-300 px-2"
          key={msgIndex}
        >
          {ROTATING_MESSAGES[msgIndex]} ({elapsed}s{aiNote})
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-5 sm:mt-6">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-zinc-600 mb-1.5 sm:mb-2">
          <span>Progress</span>
          <span className="tabular-nums">{progressPct}%</span>
        </div>
        <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <ol className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2.5">
        {STEPS.slice(0, totalSteps).map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li
              key={s.label}
              className={`flex items-center gap-2.5 sm:gap-3 rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-300 ${
                active
                  ? "bg-emerald-50 text-zinc-900 ring-1 ring-emerald-200"
                  : done
                    ? "text-zinc-500"
                    : "text-zinc-400"
              }`}
            >
              <span
                className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                  done
                    ? "bg-emerald-600 text-white"
                    : active
                      ? "bg-emerald-100 ring-2 ring-emerald-400 animate-pulse"
                      : "bg-zinc-100"
                }`}
              >
                {done ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="sm:w-3.5 sm:h-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <StepIcon name={s.icon} active={active} />
                )}
              </span>
              <span className={`min-w-0 break-words ${active ? "font-semibold" : ""}`}>
                {s.label}
              </span>
              {active && (
                <span className="ml-auto flex shrink-0 gap-1" aria-label="sedang proses">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-4 sm:mt-6 text-center text-[11px] sm:text-xs text-zinc-500 px-2">
        Mohon tunggu sebentar, lagi kerja keras buat CV kamu ✨
      </p>
    </div>
  );
}
