"use client";

import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  /** opsional: id unik kalau ada beberapa accordion di satu page */
  groupId = "faq",
}: {
  items: FaqItem[];
  groupId?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-zinc-200 border-y border-zinc-200">
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        const panelId = `${groupId}-panel-${i}`;
        const btnId = `${groupId}-btn-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-zinc-900 transition-colors hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-5 pr-9 text-sm leading-relaxed text-zinc-600"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
