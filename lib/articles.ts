import { Pool } from "pg";
import { calculateSeoScore } from "./seo-calculator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

export type ArticleType = "cv_example" | "article";

export interface Article {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  content_markdown: string;
  status: "draft" | "published" | "archived";
  type: ArticleType;
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
  type?: ArticleType;
  target_keyword?: string;
  author_id?: string;
};

export { calculateSeoScore } from "./seo-calculator";

export async function getAllArticles(options?: {
  status?: string;
  type?: ArticleType;
  limit?: number;
}): Promise<Article[]> {
  try {
    let query = "SELECT * FROM articles";
    const conditions: string[] = [];
    const values: any[] = [];

    if (options?.status && options.status !== "all") {
      conditions.push(`status = $${values.length + 1}`);
      values.push(options.status);
    }

    if (options?.type) {
      conditions.push(`type = $${values.length + 1}`);
      values.push(options.type);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY updated_at DESC";

    if (options?.limit) {
      query += ` LIMIT $${values.length + 1}`;
      values.push(options.limit);
    }

    const res = await pool.query(query, values);
    return res.rows;
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string,
  type?: ArticleType
): Promise<Article | null> {
  try {
    let query = "SELECT * FROM articles WHERE slug = $1";
    const values: any[] = [slug];

    if (type) {
      query += " AND type = $2";
      values.push(type);
    }

    query += " LIMIT 1";

    const res = await pool.query(query, values);
    return res.rows[0] || null;
  } catch (err) {
    console.error("Failed to fetch article by slug:", err);
    return null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const res = await pool.query(
      "SELECT * FROM articles WHERE id = $1 LIMIT 1",
      [id]
    );
    return res.rows[0] || null;
  } catch (err) {
    console.error("Failed to fetch article by ID:", err);
    return null;
  }
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const seoScore = calculateSeoScore({
    title: input.title,
    slug: input.slug,
    target_keyword: input.target_keyword,
    meta_description: input.meta_description,
    content_markdown: input.content_markdown,
  });

  const status = input.status || "draft";
  const type = input.type || "cv_example";
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  const res = await pool.query(
    `INSERT INTO articles (
      slug, title, meta_description, content_markdown, status, type,
      target_keyword, seo_score, author_id, published_at, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
    RETURNING *`,
    [
      input.slug,
      input.title,
      input.meta_description || null,
      input.content_markdown,
      status,
      type,
      input.target_keyword || null,
      seoScore,
      input.author_id || null,
      publishedAt,
    ]
  );

  return res.rows[0];
}

export async function updateArticle(
  id: string,
  input: Partial<ArticleInput>
): Promise<Article | null> {
  const current = await getArticleById(id);
  if (!current) return null;

  const updatedInput = {
    title: input.title !== undefined ? input.title : current.title,
    slug: input.slug !== undefined ? input.slug : current.slug,
    target_keyword:
      input.target_keyword !== undefined
        ? input.target_keyword
        : current.target_keyword || undefined,
    meta_description:
      input.meta_description !== undefined
        ? input.meta_description
        : current.meta_description || undefined,
    content_markdown:
      input.content_markdown !== undefined
        ? input.content_markdown
        : current.content_markdown,
  };

  const seoScore = calculateSeoScore(updatedInput);
  const status = input.status || current.status;
  const type = input.type || current.type;
  let publishedAt = current.published_at;

  if (status === "published" && current.status !== "published") {
    publishedAt = new Date().toISOString();
  }

  const res = await pool.query(
    `UPDATE articles SET
      slug = $1,
      title = $2,
      meta_description = $3,
      content_markdown = $4,
      status = $5,
      type = $6,
      target_keyword = $7,
      seo_score = $8,
      published_at = $9,
      updated_at = NOW()
    WHERE id = $10
    RETURNING *`,
    [
      updatedInput.slug,
      updatedInput.title,
      updatedInput.meta_description || null,
      updatedInput.content_markdown,
      status,
      type,
      updatedInput.target_keyword || null,
      seoScore,
      publishedAt,
      id,
    ]
  );

  return res.rows[0] || null;
}

export async function deleteArticle(id: string): Promise<boolean> {
  try {
    const res = await pool.query("DELETE FROM articles WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0;
  } catch (err) {
    console.error("Failed to delete article:", err);
    return false;
  }
}
