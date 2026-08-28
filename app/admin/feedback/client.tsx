"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

type FeedbackItem = {
  id: string;
  email: string;
  message: string;
  page_url: string | null;
  user_agent: string | null;
  ip: string | null;
  created_at: string;
  is_read: boolean;
};

type ListResponse = {
  ok: boolean;
  total: number;
  unread: number;
  items: FeedbackItem[];
};

export function FeedbackAdminClient() {
  const router = useRouter();
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [, startSignOut] = useTransition();

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `/api/feedback?limit=200${onlyUnread ? "&unread=1" : ""}`,
        { credentials: "include" } // Kirim session cookie
      );
      if (r.status === 401) {
        // Session expired — back to login
        router.push("/admin/login");
        return;
      }
      const json: ListResponse = await r.json();
      if (!json.ok) {
        setError("Gagal memuat feedback.");
        return;
      }
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat feedback (network error).");
    } finally {
      setLoading(false);
    }
  }, [onlyUnread, router]);

  // Auto-fetch + auto-refresh tiap 30 detik
  useEffect(() => {
    void fetchList();
    const id = setInterval(() => void fetchList(), 30_000);
    return () => clearInterval(id);
  }, [fetchList]);

  async function toggleRead(id: string, current: boolean) {
    try {
      await fetch("/api/feedback", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: !current }),
      });
      void fetchList();
    } catch (err) {
      console.error("PATCH failed:", err);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Hapus feedback ini secara permanen?")) return;
    try {
      await fetch(`/api/feedback?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      void fetchList();
    } catch (err) {
      console.error("DELETE failed:", err);
    }
  }

  function handleSignOut() {
    startSignOut(async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/admin/login");
      router.refresh();
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2 text-sm">
        <label className="inline-flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(e) => setOnlyUnread(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          Hanya belum dibaca
        </label>
        <button
          type="button"
          onClick={() => void fetchList()}
          disabled={loading}
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
        >
          {loading ? "Memuat…" : "Refresh"}
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Logout
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {data && (
        <div className="mb-4 flex gap-4 text-sm text-zinc-600">
          <span>
            Total: <strong className="text-zinc-900">{data.total}</strong>
          </span>
          <span>
            Belum dibaca:{" "}
            <strong className={data.unread > 0 ? "text-emerald-700" : "text-zinc-900"}>
              {data.unread}
            </strong>
          </span>
        </div>
      )}

      {data && data.items.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">
          {onlyUnread
            ? "Tidak ada feedback yang belum dibaca."
            : "Belum ada feedback masuk."}
        </div>
      )}

      {data && data.items.length > 0 && (
        <div className="space-y-3">
          {data.items.map((f) => (
            <article
              key={f.id}
              className={`rounded-2xl border bg-white p-4 shadow-sm ${
                f.is_read
                  ? "border-zinc-200"
                  : "border-emerald-200 bg-emerald-50/30"
              }`}
            >
              <header className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-zinc-900">{f.email}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(f.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {f.ip && <span className="ml-2">· IP: {f.ip}</span>}
                    {f.page_url && (
                      <a
                        href={f.page_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-emerald-700 underline underline-offset-2"
                      >
                        Halaman
                      </a>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {!f.is_read && (
                    <span className="inline-flex items-center rounded-full bg-emerald-600 px-2 py-0.5 font-medium text-white">
                      Baru
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => void toggleRead(f.id, f.is_read)}
                    className="rounded-md border border-zinc-300 bg-white px-2.5 py-1 font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    {f.is_read ? "Tandai belum dibaca" : "Tandai dibaca"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteItem(f.id)}
                    className="rounded-md border border-red-200 bg-white px-2.5 py-1 font-medium text-red-700 hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              </header>
              <p className="whitespace-pre-wrap text-sm text-zinc-700">
                {f.message}
              </p>
              {f.user_agent && (
                <p
                  className="mt-2 truncate text-xs text-zinc-400"
                  title={f.user_agent}
                >
                  UA: {f.user_agent}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
