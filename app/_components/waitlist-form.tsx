"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        count?: number;
      };

      if (!res.ok || data.error) {
        setState("error");
        setMessage(data.error ?? "Terjadi kesalahan.");
        return;
      }
      setState("done");
      setMessage(data.message ?? "Terdaftar!");
      if (typeof data.count === "number") setCount(data.count);
    } catch {
      setState("error");
      setMessage("Koneksi bermasalah. Coba lagi.");
    }
  }

  if (state === "done") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-900">{message}</p>
        <p className="mt-1 text-sm text-emerald-700">
          Kami kabari begitu CVKu rilis.
          {count !== null && (
            <> Kamu waitlist ke-{count}.</>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Alamat email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          className="min-w-0 flex-1 rounded-full border border-zinc-400 bg-white px-5 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:shrink-0"
        >
          {state === "loading" ? "Menyimpan..." : "Gabung"}
        </button>
      </div>
      {state === "error" && (
        <p role="alert" className="mt-2 pl-5 text-sm text-red-600">
          {message}
        </p>
      )}
    </form>
  );
}
