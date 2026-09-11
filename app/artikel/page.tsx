import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { ArticleType } from "@/lib/articles";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Artikel & Tips Karir | CVKu",
  description:
    "Artikel terbaru seputar tips karir, interview, penulisan CV, tren pekerjaan, dan panduan pencarian kerja di Indonesia.",
};

export default async function ArtikelIndex() {
  let articles: Awaited<ReturnType<typeof getAllArticles>> = [];
  try {
    articles = await getAllArticles({
      status: "published",
      type: "article" as ArticleType,
      limit: 50,
    });
  } catch (e) {
    console.error("Failed to fetch blog articles:", e);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="mb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-4">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-zinc-900">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-700">Artikel</li>
          </ol>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          Artikel & Tips Karir
        </h1>
        <p className="mt-4 text-lg text-zinc-600 max-w-3xl">
          Tips interview, panduan penulisan CV, tren lowongan kerja, dan insight
          karir terkini untuk membantu Anda mendapatkan pekerjaan impian.
        </p>
      </header>

      {articles.length > 0 ? (
        <>
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group block rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-600 hover:shadow-[0_8px_24px_-8px_rgba(5,150,105,0.3)]"
              >
                <h2 className="font-semibold text-zinc-900 group-hover:text-emerald-700 line-clamp-2">
                  {article.title}
                </h2>
                {article.meta_description && (
                  <p className="mt-3 text-sm text-zinc-600 line-clamp-3">
                    {article.meta_description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-700">
                    Baca selengkapnya →
                  </span>
                  <time className="text-xs text-zinc-400">
                    {new Date(article.published_at || article.updated_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>

          {articles.length > 3 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-800 mb-4">Artikel Lainnya</h2>
              <div className="space-y-3">
                {articles.slice(3).map((article) => (
                  <Link
                    key={article.id}
                    href={`/artikel/${article.slug}`}
                    className="group flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-emerald-600 hover:shadow-[0_8px_24px_-8px_rgba(5,150,105,0.3)]"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-900 group-hover:text-emerald-700 truncate">
                        {article.title}
                      </h3>
                      {article.meta_description && (
                        <p className="mt-1 text-sm text-zinc-500 line-clamp-1 truncate">
                          {article.meta_description}
                        </p>
                      )}
                    </div>
                    <time className="whitespace-nowrap text-sm text-zinc-400">
                      {new Date(article.published_at || article.updated_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="rounded-2xl bg-zinc-50 p-12 text-center border border-zinc-200">
          <svg
            className="mx-auto h-12 w-12 text-zinc-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">Belum Ada Artikel</h2>
          <p className="mt-2 text-zinc-500">
            Artikel blog akan tampil di sini setelah admin mempublikasikannya.
          </p>
        </div>
      )}
    </main>
  );
}