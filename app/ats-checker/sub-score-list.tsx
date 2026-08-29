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
      <h2 className="text-xl font-bold text-zinc-900 mb-4">Detail Skor per Aspek</h2>
      <div className="space-y-3">
        {subScores.map((sub) => {
          const c = STATUS_COLORS[sub.status];
          return (
            <details
              key={sub.key}
              className="group rounded-xl border border-zinc-200 bg-white overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`h-2.5 w-2.5 rounded-full ${c.dot} shrink-0`} />
                  <span className="font-semibold text-zinc-900 truncate">{sub.label}</span>
                  <span className="text-xs text-zinc-500 ml-2 hidden sm:inline">
                    (bobot {Math.round(sub.weight * 100)}%)
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`h-full ${c.dot}`}
                      style={{ width: `${sub.score}%`, transition: "width 0.8s ease-out" }}
                    />
                  </div>
                  <span className={`text-base font-bold tabular-nums ${c.text}`}>
                    {sub.score}
                  </span>
                </div>
              </summary>
              <div className={`border-t border-zinc-100 ${c.bg} px-4 py-3`}>
                {sub.suggestions.length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-zinc-700">
                    {sub.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-zinc-400 shrink-0">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-500">Tidak ada catatan.</p>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
