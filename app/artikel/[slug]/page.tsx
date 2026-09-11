import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ArticleType } from "@/lib/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, "article" as ArticleType);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan | CVKu" };
  }

  return {
    title: `${article.title} | CVKu`,
    description: article.meta_description || undefined,
    openGraph: {
      title: article.title,
      description: article.meta_description || undefined,
      type: "article",
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at,
    },
  };
}

export default async function ArtikelDetail({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, "article" as ArticleType);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="hover:text-zinc-900">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/artikel" className="hover:text-zinc-900">
              Artikel
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700 truncate max-w-[200px]">{article.title}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <time dateTime={article.published_at || article.updated_at}>
            {new Date(article.published_at || article.updated_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {article.target_keyword && (
            <>
              <span aria-hidden="true">·</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                {article.target_keyword}
              </span>
            </>
          )}
        </div>
      </header>

      {article.meta_description && (
        <div className="mb-8 p-4 rounded-lg bg-emerald-50 border border-emerald-100">
          <p className="text-zinc-800 leading-relaxed">{article.meta_description}</p>
        </div>
      )}

      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <MarkdownRenderer content={article.content_markdown} />
      </div>

      <footer className="mt-12 pt-8 border-t border-zinc-200">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Daftar Artikel
        </Link>
      </footer>
    </article>
  );
}