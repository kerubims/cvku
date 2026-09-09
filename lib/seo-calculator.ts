/**
 * Auto-calculate SEO score (0-100) based on title, keyword, meta desc, and content structure.
 * Pure JS function — safe for both Server & Client Components (no Node.js/pg dependencies).
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
