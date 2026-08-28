"use client";

import { useEffect, useState, useCallback } from "react";

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

const TOKEN_KEY = "cvku_admin_token";

export function FeedbackAdminClient() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onlyUnread, setOnlyUnread] = useState(false);

  // Load token dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  const fetchList = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `/api/feedback?limit=200${onlyUnread ? "&unread=1" : ""}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (r.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setError("Token salah atau kadaluarsa. Masukkan ulang.");
        return;
      }
      const json = (await r.json()) as ListResponse | { error: string };
      if ("error" in json) {
        setError(json.error);
        return;
      }
      setData(json);
    } catch {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }, [token, onlyUnread]);

  // Auto-refresh
  useEffect(() => {
    if (!token) return;
    fetchList();
    const id = setInterval(fetchList, 30_000);
    return () => clearInterval(id);
  }, [token, onlyUnread, fetchList]);

  async function toggleRead(id: string, is_read: boolean) {
    if (!token) return;
    try {
      await fetch("/api/feedback", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, is_read }),
      });
      fetchList();
    } catch {
      // ignore
    }
  }

  function saveToken(e: React.FormEvent) {
    e.preventDefault();
    const t = tokenInput.trim();
    if (!t) return;
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    setTokenInput("");
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setData(null);
  }

  if (!token) {
    return (
      <form
        onSubmit={saveToken}
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-base font-semibold text-zinc-900">Masukkan Admin Token</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Token ada di <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">.env</code> server
          sebagai <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">ADMIN_TOKEN</code>.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="••••••••••••"
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Buka
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm">
          {data && (
            <>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                {data.unread} belum dibaca
              </span>
              <span className="text-zinc-600">{data.total} total</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={onlyUnread}
              onChange={(e) => setOnlyUnread(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600"
            />
            Hanya belum dibaca
          </label>
          <button
            onClick={fetchList}
            disabled={loading}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
          >
            {loading ? "Memuat…" : "Refresh"}
          </button>
          <button
            onClick={logout}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!data || data.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-500">
          {loading ? "Memuat…" : onlyUnread ? "Tidak ada feedback yang belum dibaca." : "Belum ada feedback masuk."}
        </div>
      ) : (
        <ul className="space-y-3">
          {data.items.map((f) => (
            <li
              key={f.id}
              className={`rounded-2xl border bg-white p-4 shadow-sm transition-colors ${
                f.is_read
                  ? "border-zinc-200"
                  : "border-l-4 border-l-emerald-500 border-zinc-200"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <a
                      href={`mailto:${f.email}`}
                      className="font-semibold text-zinc-900 hover:text-emerald-700"
                    >
                      {f.email}
                    </a>
                    <span className="text-xs text-zinc-500">
                      {new Date(f.created_at).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    {f.page_url && (
                      <a
                        href={f.page_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        ↗ {(() => {
                          try {
                            return new URL(f.page_url).pathname;
                          } catch {
                            return f.page_url;
                          }
                        })()}
                      </a>
                    )}
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                    {f.message}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                    {f.ip && <span>IP: {f.ip}</span>}
                    {f.user_agent && (
                      <span className="truncate max-w-md" title={f.user_agent}>
                        {f.user_agent}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleRead(f.id, !f.is_read)}
                  className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
                    f.is_read
                      ? "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {f.is_read ? "Tandai belum dibaca" : "Tandai dibaca"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
