"use client";

import { useMemo } from "react";

const STATUS_COLORS = {
  excellent: { ring: "stroke-emerald-500", bg: "text-emerald-700", label: "Sangat Bagus" },
  good: { ring: "stroke-emerald-400", bg: "text-emerald-600", label: "Bagus" },
  fair: { ring: "stroke-amber-500", bg: "text-amber-600", label: "Cukup" },
  poor: { ring: "stroke-red-500", bg: "text-red-600", label: "Perlu Perbaikan" },
} as const;

const STROKE_BY_SIZE: Record<number, number> = {
  120: 8,
  140: 9,
  160: 10,
  180: 10,
  200: 11,
};

export function ScoreGauge({
  score,
  status,
  size,
}: {
  score: number;
  status: "excellent" | "good" | "fair" | "poor";
  /** Optional explicit size. When omitted, size is responsive via the
   *  container — caller should set it per breakpoint if pixel-perfect. */
  size?: number;
}) {
  // Default gauge size: 140 on phones, 160 on sm, 180 on md+, 200 on lg+.
  // We use CSS classes to scale, then derive stroke proportionally.
  const color = STATUS_COLORS[status];
  const gaugeSize = size ?? 180;
  const radius = (gaugeSize - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = useMemo(
    () => circumference - (score / 100) * circumference,
    [score, circumference]
  );
  const strokeWidth = STROKE_BY_SIZE[gaugeSize] ?? 10;

  // Number + "/100" inside the ring scales with gauge size
  const scoreFontClass =
    gaugeSize >= 180
      ? "text-5xl"
      : gaugeSize >= 160
        ? "text-4xl"
        : gaugeSize >= 140
          ? "text-4xl"
          : "text-3xl";

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]"
      >
        <svg
          viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}
          className="h-full w-full transform -rotate-90"
          aria-label={`Skor CV: ${score} dari 100`}
          role="img"
        >
          {/* Background circle */}
          <circle
            cx={gaugeSize / 2}
            cy={gaugeSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-zinc-100"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={gaugeSize / 2}
            cy={gaugeSize / 2}
            r={radius}
            fill="none"
            className={color.ring}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={`font-bold tabular-nums leading-none ${scoreFontClass} ${color.bg}`}
          >
            {score}
          </div>
          <div className="mt-1 text-xs sm:text-sm font-medium text-zinc-500">/ 100</div>
        </div>
      </div>
      <div
        className={`mt-3 text-sm sm:text-base font-semibold ${color.bg} text-center px-2`}
      >
        {color.label}
      </div>
    </div>
  );
}
