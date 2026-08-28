"use client";

import { useState, useEffect } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  // Tutup panel pakai Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock scroll saat panel terbuka
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const r = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, pageUrl }),
      });
      const data = (await r.json()) as { ok?: boolean; error?: string };
      if (!r.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Gagal mengirim. Coba lagi.");
        return;
      }
      setStatus("ok");
      setEmail("");
      setMessage("");
      // Auto close setelah 2.5 detik
      setTimeout(() => {
        setStatus("idle");
        setOpen(false);
      }, 2500);
    } catch {
      setStatus("error");
      setErrorMsg("Tidak terhubung. Cek koneksi lalu coba lagi.");
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label="Buka form feedback"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-transform hover:scale-105 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v6A2.5 2.5 0 0 1 14.5 14H8.5l-3.5 3v-3H5.5A2.5 2.5 0 0 1 3 11.5v-6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal overlay + panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        >
          <div
            className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 m-3 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:m-6">
            <button
              type="button"
              aria-label="Tutup"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>

            <h2 id="feedback-title" className="text-lg font-bold text-zinc-900">
              Kirim feedback
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Ada bug, saran, atau request template? Tulis di sini — kami baca
              semua.
            </p>

            {status === "ok" ? (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                ✓ Terima kasih! Feedback kamu sudah kami terima.
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="fb-email" className="block text-sm font-medium text-zinc-900">
                    Email
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kamu@email.com"
                    disabled={status === "submitting"}
                    className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="fb-message" className="block text-sm font-medium text-zinc-900">
                    Feedback
                  </label>
                  <textarea
                    id="fb-message"
                    required
                    minLength={5}
                    maxLength={2000}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contoh: Template admin susah dibaca di HP, mohon responsive."
                    disabled={status === "submitting"}
                    className="mt-1 block w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:opacity-50"
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    {message.length} / 2000 karakter
                  </p>
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50"
                >
                  {status === "submitting" ? "Mengirim…" : "Kirim Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
