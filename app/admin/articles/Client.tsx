"use client";

import { useState, useEffect } from "react";
import { calculateSeoScore } from "@/lib/seo-calculator";
import type { Article, ArticleType } from "@/lib/articles";

interface ArticlesAdminClientProps {
  type: ArticleType;
  typeLabel: string;
}

export function ArticlesAdminClient({ type, typeLabel }: ArticlesAdminClientProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    target_keyword: "",
    meta_description: "",
    content_markdown: "",
    status: "draft" as "draft" | "published" | "archived",
  });

  // SEO Score
  const seoScore = calculateSeoScore(formData);

  async function fetchArticles() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("status", filterStatus);
      params.set("type", type);
      const res = await fetch(`/api/admin/articles?${params.toString()}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.ok) setArticles(data.articles);
    } catch (err) {
      console.error("Fetch articles error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [filterStatus]);

  function resetForm() {
    setFormData({
      title: "",
      slug: "",
      target_keyword: "",
      meta_description: "",
      content_markdown: "",
      status: "draft",
    });
    setEditingArticle(null);
  }

  function openEdit(article: Article) {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      target_keyword: article.target_keyword || "",
      meta_description: article.meta_description || "",
      content_markdown: article.content_markdown,
      status: article.status,
    });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editingArticle ? "PATCH" : "POST";
    const url = editingArticle
      ? `/api/admin/articles/${editingArticle.id}`
      : "/api/admin/articles";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...formData, type }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          resetForm();
          setShowForm(false);
          fetchArticles();
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((err) => {
        console.error("Submit error:", err);
        alert("Terjadi kesalahan jaringan");
      });
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchArticles();
  }

  const metaDescLength = formData.meta_description.length;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Kelola {typeLabel}
          </h1>
          <p className="mt-1 text-zinc-500">
            {type === "cv_example"
              ? "Tambah, edit, dan kelola contoh CV dinamis untuk SEO programmatic"
              : "Kelola artikel blog: tips, berita, tutorial, dan konten editorial"}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah {typeLabel.slice(0, -1)}
        </button>
      </div>

      {/* Filter Status */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {["all", "published", "draft", "archived"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              filterStatus === status
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Article List */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Memuat...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            Belum ada {typeLabel.toLowerCase()}. Klik "Tambah" untuk memulai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Judul
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden md:table-cell">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden lg:table-cell">
                    Keyword
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    SEO
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-900 max-w-xs truncate">
                        {article.title}
                      </div>
                      <div className="text-xs text-zinc-400 truncate max-w-xs">
                        {article.meta_description || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600 font-mono hidden md:table-cell">
                      {article.slug}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500 hidden lg:table-cell">
                      {article.target_keyword || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          article.status === "published"
                            ? "bg-emerald-100 text-emerald-700"
                            : article.status === "draft"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {article.seo_score !== null && (
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            article.seo_score >= 80
                              ? "bg-emerald-100 text-emerald-700"
                              : article.seo_score >= 50
                              ? "bg-amber-100 text-amber-700"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {article.seo_score}/100
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500 whitespace-nowrap">
                      {new Date(article.updated_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(article)}
                          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal/Slide */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 sm:p-0">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-zinc-900">
                {editingArticle ? "Edit" : "Tambah"} {typeLabel.slice(0, -1)}
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Slug (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    URL: /{type === "cv_example" ? "contoh-cv" : "artikel"}/[slug]
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Target Keyword SEO
                  </label>
                  <input
                    type="text"
                    value={formData.target_keyword}
                    onChange={(e) => setFormData({ ...formData, target_keyword: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="contoh: contoh cv admin, tips interview kerja"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Meta Description (untuk Google SERP)
                    <span className="text-zinc-400 ml-1">
                      ({metaDescLength}/160 karakter)
                    </span>
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    maxLength={160}
                  />
                  <div className="mt-1 flex justify-end">
                    <span
                      className={`text-xs font-medium ${
                        metaDescLength > 160
                          ? "text-red-500"
                          : metaDescLength >= 100
                          ? "text-emerald-600"
                          : "text-zinc-400"
                      }`}
                    >
                      {metaDescLength}/160
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Konten Markdown <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content_markdown}
                    onChange={(e) => setFormData({ ...formData, content_markdown: e.target.value })}
                    rows={15}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 font-mono text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="# Judul H1\n\n## Sub-heading H2\n\nParagraf teks biasa...\n\n- Bullet list\n- Item 2\n\n**Bold text**\n\n[Link](https://example.com)"
                    required
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    Gunakan Markdown: # H1, ## H2, **bold**, - list, [link](url)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published (Live)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* SEO Score Indicator */}
                <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-900">Live SEO Score</span>
                    <span
                      className={`text-2xl font-bold ${
                        seoScore >= 80 ? "text-emerald-600" : seoScore >= 50 ? "text-amber-600" : "text-zinc-500"
                      }`}
                    >
                      {seoScore}/100
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        seoScore >= 80 ? "bg-emerald-500" : seoScore >= 50 ? "bg-amber-500" : "bg-zinc-400"
                      }`}
                      style={{ width: `${seoScore}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    {seoScore >= 80
                      ? "🎉 Excellent! Siap bersaing di Google."
                      : seoScore >= 50
                      ? "⚡ Good. Bisa ditingkatkan dengan keyword di H2 & meta description."
                      : "📝 Butuh perbaikan: tambah keyword di judul, meta desc, & struktur konten."}
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {editingArticle ? "Update" : "Simpan"} {typeLabel.slice(0, -1)}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}