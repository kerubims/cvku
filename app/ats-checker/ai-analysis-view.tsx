"use client";

import type { AiAnalysis } from "@/lib/ai/ats-analyzer";

const SCORE_COLORS = {
  high: "text-emerald-700 bg-emerald-50",
  mid: "text-amber-700 bg-amber-50",
  low: "text-red-700 bg-red-50",
};

function colorFor(score: number): keyof typeof SCORE_COLORS {
  if (score >= 75) return "high";
  if (score >= 50) return "mid";
  return "low";
}

export function AiAnalysisView({ analysis }: { analysis: AiAnalysis }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-emerald-50/50 to-zinc-50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm13.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.22 4.22a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.94 9.94a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM4.22 15.78a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.94-9.94a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" />
            <circle cx="10" cy="10" r="3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-900">Analisis AI (OmniRoute)</h2>
      </div>

      {/* Sub-scores AI */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <ScoreChip label="Grammar" score={analysis.grammarScore} />
        <ScoreChip label="Tone" score={analysis.toneScore} />
        <ScoreChip label="Impact" score={analysis.impactScore} />
      </div>

      {/* HR Impression */}
      <div className="rounded-lg bg-white border border-zinc-200 p-4 mb-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
          Kesan HRD
        </p>
        <p className="text-sm text-zinc-800 italic leading-relaxed">
          "{analysis.hiringImpression}"
        </p>
      </div>

      {/* Issues */}
      {analysis.issues.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-zinc-900 mb-2">
            Kalimat yang bisa diperkuat ({analysis.issues.length})
          </p>
          <div className="space-y-2">
            {analysis.issues.map((it, i) => (
              <div key={i} className="rounded-lg bg-white border border-zinc-200 p-3">
                <div className="text-xs text-zinc-500 mb-1">Asli:</div>
                <p className="text-sm text-zinc-700 line-through mb-2 leading-relaxed">
                  "{it.text}"
                </p>
                <div className="text-xs text-emerald-700 mb-1 font-semibold">Saran:</div>
                <p className="text-sm text-zinc-900 leading-relaxed mb-1">
                  "{it.suggestion}"
                </p>
                <p className="text-xs text-zinc-500 italic">— {it.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-zinc-900 mb-2">Saran Tambahan</p>
          <ul className="space-y-1.5 text-sm text-zinc-700">
            {analysis.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-600 shrink-0">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function ScoreChip({ label, score }: { label: string; score: number }) {
  const c = SCORE_COLORS[colorFor(score)];
  return (
    <div className={`rounded-lg p-3 ${c}`}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-80">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{score}</div>
    </div>
  );
}
