/**
 * Render satu atau beberapa JSON-LD schema ke <script type="application/ld+json">.
 * Dipakai di layout-level (Organization) dan page-level (Article, FAQPage, dsb).
 *
 * Pakai @graph agar semua schema dalam satu entity graph — sinyal konsistensi ke Google.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const graph = Array.isArray(data) ? data : [data];
  // Bungkus ke @graph kalau lebih dari satu schema
  const payload =
    graph.length === 1
      ? graph[0]
      : { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
