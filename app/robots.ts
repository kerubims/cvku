import type { MetadataRoute } from "next";

const BASE = "https://cvku.ksm.web.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/contoh-cv", "/contoh-cv/"],
        disallow: ["/buat", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
