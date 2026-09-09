"use client";

import { useState, useEffect } from "react";
import { calculateSeoScore } from "@/lib/seo-calculator";
import type { Article } from "@/lib/articles";

export function ArticlesAdminClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // Calculated SEO score
  const liveSeoScore = calculateSeoScore({
    title,
    slug,
    target_keyword: targetKeyword,
    meta_description: metaDescription,
    content_markdown: contentMarkdown,
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/articles?status=${filterStatus}`);
      const data = await res.json();
      if (data.ok) {
        setArticles(data.articles || []);
      } else {
        setError(data.error || "Gagal memuat artikel.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filterStatus]);

  const handleAutoSlug = (inputTitle: string) => {
    const generated = inputTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generated);
  };

  const handleOpenCreate = () => {
    setEditingArticle({});
    setTitle("");
    setSlug("");
    setTargetKeyword("");
    setMetaDescription("");
    setContentMarkdown("");
    setStatus("draft");
    setError(null);
    setSuccess(null);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setTitle(art.title);
    setSlug(art.slug);
    setTargetKeyword(art.target_keyword || "");
    setMetaDescription(art.meta_description || "");
    setContentMarkdown(art.content_markdown || "");
    setStatus(art.status === "published" ? "published" : "draft");
    setError(null);
    setSuccess(null);
  };

  const handleSave = async (publishStatus?: "draft" | "published") => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const finalStatus = publishStatus || status;

    const payload = {
      title,
      slug,
      target_keyword: targetKeyword,
      meta_description: metaDescription,
      content_markdown: contentMarkdown,
      status: finalStatus,
    };

    try {
      let res;
      if (editingArticle?.id) {
        res = await fetch(`/api/admin/articles/${editingArticle.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (data.ok) {
        setSuccess(editingArticle?.id ? "Artikel berhasil diperbarui!" : "Artikel baru berhasil dibuat!");
        setEditingArticle(null);
        fetchArticles();
      } else {
        setError(data.error || "Gagal menyimpan artikel.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan saat menyimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, artTitle: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${artTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) {
        setSuccess("Artikel berhasil dihapus.");
        fetchArticles();
      } else {
        setError(data.error || "Gagal menghapus.");
      }
    } catch (err) {
      setError("Kesalahan saat menghapus artikel.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Kelola Artikel & Contoh CV (CMS)
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Tambah &amp; kelola halaman SEO dinamis secara langsung tanpa perlu re-deploy.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Artikel Baru
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
        {["all", "published", "draft"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
              filterStatus === st
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
            }`}
          >
            {st === "all" ? "Semua Status" : st}
          </button>
        ))}
      </div>

      {/* Table / List View */}
      {loading ? (
        <div className="py-12 text-center text-sm text-zinc-500">Memuat artikel...</div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-8 text-center text-zinc-500">
          Belum ada artikel di database. Klik &ldquo;Tambah Artikel Baru&rdquo; untuk membuat draf pertama.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50 text-xs uppercase font-semibold text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3">Judul &amp; Slug</th>
                <th className="px-4 py-3">Target Keyword</th>
                <th className="px-4 py-3 text-center">SEO Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-zinc-50/80">
                  <td className="px-4 py-3 font-medium text-zinc-900 max-w-xs truncate">
                    <div>{art.title}</div>
                    <div className="text-xs font-mono text-zinc-400 font-normal">/contoh-cv/{art.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-600">
                    {art.target_keyword ? (
                      <span className="rounded bg-zinc-100 px-2 py-1 font-mono text-zinc-700">
                        {art.target_keyword}
                      </span>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        (art.seo_score || 0) >= 80
                          ? "bg-emerald-100 text-emerald-800"
                          : (art.seo_score || 0) >= 50
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {art.seo_score || 0}/100
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${
                        art.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(art)}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="text-xs font-semibold text-rose-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal / Overlay */}
      {editingArticle !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-lg font-bold text-zinc-900">
                {editingArticle.id ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h2>
              <button
                onClick={() => setEditingArticle(null)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                ✕
              </button>
            </div>

            {/* SEO Real-time Score Gauge */}
            <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-4 text-white">
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  SEO Live Score Indicator
                </div>
                <div className="text-sm text-zinc-300 mt-0.5">
                  Optimasi judul, slug, keyword, dan isi markdown untuk skor maksimal.
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-2xl font-black ${
                    liveSeoScore >= 80
                      ? "text-emerald-400"
                      : liveSeoScore >= 50
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {liveSeoScore} <span className="text-xs font-normal text-zinc-400">/100</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Judul Artikel (H1) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingArticle.id) handleAutoSlug(e.target.value);
                  }}
                  placeholder="Contoh: Contoh CV Kasir Minimarket Lolos ATS"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="contoh-cv-kasir"
                    className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm font-mono text-zinc-900 focus:border-emerald-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAutoSlug(title)}
                    className="rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-200"
                  >
                    Auto
                  </button>
                </div>
              </div>

              {/* Target Keyword */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Target Keyword (SEO)
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="contoh cv kasir"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Status Publikasi
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="draft">Draft (Belum Live)</option>
                  <option value="published">Published (Live &amp; Indexed)</option>
                </select>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-zinc-700">
                  Meta Description (Snippet Google)
                </label>
                <span className="text-xs text-zinc-400">{metaDescription.length}/160 karakter</span>
              </div>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Kumpulan contoh CV kasir Indonesia yang lolos ATS..."
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            {/* Content Markdown */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Isi Artikel (Markdown Format) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={10}
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                placeholder="## Pendahuluan&#10;Tuliskan isi artikel di sini dalam format markdown..."
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 font-mono text-sm text-zinc-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-50"
              >
                Simpan Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave("published")}
                disabled={isSaving}
                className="rounded-xl bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
              >
                {isSaving ? "Menyimpan..." : "Publish Sekarang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
