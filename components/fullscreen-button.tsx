"use client";

import { useEffect, useState } from "react";

export function FullscreenButton({
  /** Dipakai sebagai ID target (id harus di-set manual di element yang ingin di-fullscreen) */
  targetId,
  /** Label button */
  label = "Fullscreen",
}: {
  targetId: string;
  label?: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setSupported(
      !!document.fullscreenEnabled ||
        // @ts-expect-error - vendor prefix
        !!document.webkitFullscreenEnabled
    );

    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  async function toggle() {
    if (!supported) {
      // Fallback: buka di tab baru dengan route /full
      const el = document.getElementById(targetId);
      if (el) {
        const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>${document.title}</title>${document.head.innerHTML}</head><body class="bg-zinc-100">${el.outerHTML}</body></html>`;
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("Browser tidak mendukung fullscreen dan tidak ada element target.");
      }
      return;
    }

    try {
      if (!document.fullscreenElement) {
        const el = document.getElementById(targetId);
        if (!el) return;
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      title={
        supported
          ? "Tampilkan CV dalam mode layar penuh"
          : "Browser tidak support fullscreen — akan membuka di tab baru"
      }
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        {isFullscreen ? (
          <path
            d="M6 14v3a1 1 0 0 1-1 1H2v-3M14 6V3a1 1 0 0 1 1-1h3v3M6 6V3a1 1 0 0 0-1-1H2v3M14 14v3a1 1 0 0 0 1 1h3v-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M3 6V3a1 1 0 0 1 1-1h3M14 3h3a1 1 0 0 1 1 1v3M17 14v3a1 1 0 0 1-1 1h-3M6 17H3a1 1 0 0 1-1-1v-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      {isFullscreen ? "Keluar Fullscreen" : label}
    </button>
  );
}
