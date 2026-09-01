"use client";

import type { SubScore } from "@/lib/ats/types";

const STATUS_COLORS: Record<SubScore["status"], { dot: string; text: string; bg: string }> = {
  excellent: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  good: { dot: "bg-emerald-400", text: "text-emerald-600", bg: "bg-emerald-50/60" },
  fair: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  poor: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
};

export function SubScoreList({ subScores }: { subScores: SubScore[] }) {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mb-3 sm:mb-4">
        Detail Skor per Aspek
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {subScores.map((sub) => {
          const c = STATUS_COLORS[sub.status];
          return (
            <details
              key={sub.key}
              className="group rounded-xl border border-zinc-200 bg-white overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-zinc-50/50 transition-colors">
                {/* Left side: dot + label + bobot */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className={`h-2.5 w-2.5 rounded-full ${c.dot} shrink-0`} />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-semibold text-sm sm:text-base text-zinc-900 truncate">
                      {sub.label}
                    </span>
                    {/* Bobot: appears on its own line on mobile (below label),
                        inline with the label on sm+ */}
                    <span className="text-[10px] sm:text-xs text-zinc-500 sm:hidden">
                      bobot {Math.round(sub.weight * 100)}%
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 shrink-0 hidden sm:inline">
                    ({Math.round(sub.weight * 100)}%)
                  </span>
                </div>

                {/* Right side: progress bar (hidden on mobile to save space) + score */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-zinc-100 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`h-full ${c.dot}`}
                      style={{ width: `${sub.score}%`, transition: "width 0.8s ease-out" }}
                    />
                  </div>
                  <span
                    className={`text-base sm:text-lg font-bold tabular-nums ${c.text} min-w-[2ch] text-right`}
                  >
                    {sub.score}
                  </span>
                </div>
              </summary>
              <div className={`border-t border-zinc-100 ${c.bg} px-3 sm:px-4 py-2.5 sm:py-3`}>
                {sub.suggestions.length > 0 ? (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700">
                    {sub.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-zinc-400 shrink-0">•</span>
                        <span className="break-words">{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-500">Tidak ada catatan.</p>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
