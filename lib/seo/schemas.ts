/**
 * Schema.org JSON-LD terpusat — dipakai di landing, /contoh-cv, dan /contoh-cv/[slug].
 * Fokus tipe: Article, FAQPage, BreadcrumbList, SoftwareApplication, Organization.
 * (HowTo sudah tidak memicu rich result di 2026 — kita skip sesuai referensi.)
 */

export const SITE_URL = "https://cv.ksm.web.id";
export const SITE_NAME = "CVKu";

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: [],
};

export const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}#software`,
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "CV maker gratis dengan bantuan AI untuk membuat CV yang lolos ATS. Tanpa login, tanpa watermark.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
};

export const FAQS = [
  {
    question: "Apa itu CV yang lolos ATS?",
    answer:
      "CV ATS-friendly adalah CV yang bisa dibaca dengan benar oleh sistem Applicant Tracking System (ATS) — software yang dipakai HRD untuk menyaring ratusan lamaran. Cirinya: format 1 kolom, font standar (Arial/Calibri/Helvetica), tidak ada tabel/kolom/image, dan pakai heading yang konsisten.",
  },
  {
    question: "Apakah CVKu benar-benar gratis?",
    answer:
      "Ya, 100% gratis. Tidak ada watermark, tidak ada batasan download, tidak perlu login. Anda cukup buka halaman Buat, isi data, pilih template, lalu download PDF.",
  },
  {
    question: "Apakah data CV saya aman?",
    answer:
      "Data Anda disimpan di server kami dan hanya bisa diakses oleh Anda sendiri melalui cookie anonim di browser. Kami tidak membagikan data ke pihak ketiga. Setelah 12 bulan tidak aktif, data otomatis dihapus.",
  },
  {
    question: "Bisa pakai bahasa Inggris?",
    answer:
      "Untuk saat ini template dan contoh berfokus pada bahasa Indonesia. Versi bahasa Inggris sedang dalam pengembangan.",
  },
];

/** Bikin Article schema untuk halaman /contoh-cv/[slug] */
export function articleSchema(opts: {
  slug: string;
  judul: string;
  metaDescription: string;
  publishedTime: string;
  modifiedTime: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/contoh-cv/${opts.slug}#article`,
    headline: opts.judul,
    description: opts.metaDescription,
    inLanguage: "id-ID",
    datePublished: opts.publishedTime,
    dateModified: opts.modifiedTime,
    author: { "@id": `${SITE_URL}#organization` },
    publisher: {
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/contoh-cv/${opts.slug}`,
    },
  };
}

/** Breadcrumb schema */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
