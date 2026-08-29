"use client";

import { useMemo } from "react";

const STATUS_COLORS = {
  excellent: { ring: "stroke-emerald-500", bg: "text-emerald-700", label: "Sangat Bagus" },
  good: { ring: "stroke-emerald-400", bg: "text-emerald-600", label: "Bagus" },
  fair: { ring: "stroke-amber-500", bg: "text-amber-600", label: "Cukup" },
  poor: { ring: "stroke-red-500", bg: "text-red-600", label: "Perlu Perbaikan" },
} as const;

export function ScoreGauge({
  score,
  status,
  size = 180,
}: {
  score: number;
  status: "excellent" | "good" | "fair" | "poor";
  size?: number;
}) {
  const color = STATUS_COLORS[status];
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = useMemo(
    () => circumference - (score / 100) * circumference,
    [score, circumference]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-zinc-100"
            strokeWidth={10}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className={color.ring}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold tabular-nums ${color.bg}`}>{score}</div>
          <div className="mt-1 text-sm font-medium text-zinc-500">/ 100</div>
        </div>
      </div>
      <div className={`mt-3 text-sm font-semibold ${color.bg}`}>{color.label}</div>
    </div>
  );
}
