import type { MetadataRoute } from "next";
import { CONTOH_CV_LIST } from "@/lib/contoh-cv/data";

const BASE = "https://cv.ksm.web.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const landing = {
    url: `${BASE}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };
  const privasi = {
    url: `${BASE}/privasi`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  };
  const contohHub = {
    url: `${BASE}/contoh-cv`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };
  const contoh = CONTOH_CV_LIST.map((c) => ({
    url: `${BASE}/contoh-cv/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [landing, contohHub, privasi, ...contoh];
}
