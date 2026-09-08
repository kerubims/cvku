import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

export interface Article {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  content_markdown: string;
  status: "draft" | "published" | "archived";
  author_id: string | null;
  target_keyword: string | null;
  seo_score: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ArticleInput = {
  slug: string;
  title: string;
  meta_description?: string;
  content_markdown: string;
  status?: "draft" | "published" | "archived";
  target_keyword?: string;
  author_id?: string;
};

/**
 * Auto-calculate SEO score (0-100) based on title, keyword, meta desc, and content structure
 */
export function calculateSeoScore(input: {
  title: string;
  slug: string;
  target_keyword?: string;
  meta_description?: string;
  content_markdown: string;
}): number {
  let score = 0;
  const kw = (input.target_keyword || "").toLowerCase().trim();
  const title = input.title.toLowerCase().trim();
  const slug = input.slug.toLowerCase().trim();
  const meta = (input.meta_description || "").toLowerCase().trim();
  const content = input.content_markdown.toLowerCase().trim();

  // 1. Title Checks (25 pts)
  if (input.title.length >= 30 && input.title.length <= 70) score += 10;
  else if (input.title.length > 0) score += 5;

  if (kw && title.includes(kw)) score += 15;

  // 2. Slug Checks (15 pts)
  if (kw && slug.includes(kw.replace(/\s+/g, "-"))) score += 15;
  else if (slug.length > 3) score += 5;

  // 3. Meta Description Checks (20 pts)
  if (meta.length >= 100 && meta.length <= 160) score += 10;
  else if (meta.length > 0) score += 5;

  if (kw && meta.includes(kw)) score += 10;

  // 4. Content Structure & Word Count (40 pts)
  const words = content.split(/\s+/).filter(Boolean).length;
  if (words >= 800) score += 20;
  else if (words >= 400) score += 15;
  else if (words >= 200) score += 10;
  else if (words > 0) score += 5;

  // Check for headings (H2 / H3)
  if (/^#{2,3}\s+/m.test(input.content_markdown)) score += 10;

  // Keyword density in content (0.5% - 2.5%)
  if (kw && words > 50) {
    const kwMatches = (content.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
    const density = (kwMatches / words) * 100;
    if (density >= 0.3 && density <= 3.0) score += 10;
    else if (kwMatches > 0) score += 5;
  }

  return Math.min(100, Math.max(0, score));
}

export async function getAllArticles(options?: { status?: string; limit?: number }): Promise<Article[]> {
  try {
    let query = "SELECT * FROM articles";
    const values: any[] = [];

    if (options?.status && options.status !== "all") {
      query += " WHERE status = $1";
      values.push(options.status);
    }

    query += " ORDER BY updated_at DESC";

    if (options?.limit) {
      query += ` LIMIT $${values.length + 1}`;
      values.push(options.limit);
    }

    const res = await pool.query(query, values);
    return res.rows;
  } catch (err) {
    console.error("[getAllArticles] Error:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await pool.query("SELECT * FROM articles WHERE slug = $1 LIMIT 1", [slug]);
    return res.rows[0] || null;
  } catch (err) {
    console.error("[getArticleBySlug] Error:", err);
    return null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const res = await pool.query("SELECT * FROM articles WHERE id = $1 LIMIT 1", [id]);
    return res.rows[0] || null;
  } catch (err) {
    console.error("[getArticleById] Error:", err);
    return null;
  }
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const seo_score = calculateSeoScore({
    title: input.title,
    slug: input.slug,
    target_keyword: input.target_keyword,
    meta_description: input.meta_description,
    content_markdown: input.content_markdown,
  });

  const published_at = input.status === "published" ? new Date().toISOString() : null;

  const query = `
    INSERT INTO articles (slug, title, meta_description, content_markdown, status, author_id, target_keyword, seo_score, published_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    input.slug,
    input.title,
    input.meta_description || null,
    input.content_markdown,
    input.status || "draft",
    input.author_id || null,
    input.target_keyword || null,
    seo_score,
    published_at,
  ];

  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateArticle(id: string, input: Partial<ArticleInput>): Promise<Article | null> {
  const existing = await getArticleById(id);
  if (!existing) return null;

  const title = input.title ?? existing.title;
  const slug = input.slug ?? existing.slug;
  const target_keyword = input.target_keyword ?? existing.target_keyword ?? undefined;
  const meta_description = input.meta_description ?? existing.meta_description ?? undefined;
  const content_markdown = input.content_markdown ?? existing.content_markdown;
  const status = input.status ?? existing.status;

  const seo_score = calculateSeoScore({
    title,
    slug,
    target_keyword,
    meta_description,
    content_markdown,
  });

  let published_at = existing.published_at;
  if (status === "published" && !published_at) {
    published_at = new Date().toISOString();
  }

  const query = `
    UPDATE articles
    SET slug = $1, title = $2, meta_description = $3, content_markdown = $4, status = $5,
        target_keyword = $6, seo_score = $7, published_at = $8, updated_at = NOW()
    WHERE id = $9
    RETURNING *
  `;

  const values = [
    slug,
    title,
    meta_description || null,
    content_markdown,
    status,
    target_keyword || null,
    seo_score,
    published_at,
    id,
  ];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

export async function deleteArticle(id: string): Promise<boolean> {
  try {
    const res = await pool.query("DELETE FROM articles WHERE id = $1", [id]);
    return (res.rowCount || 0) > 0;
  } catch (err) {
    console.error("[deleteArticle] Error:", err);
    return false;
  }
}
