/**
 * Page metadata + SEO untuk ATS Score Checker.
 * Ditampilkan via Server Component di page.tsx.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Skor CV ATS Gratis — Lolos Screening dalam 30 Detik",
  description:
    "Cek skor ATS CV kamu secara gratis. Dapatkan analisis 8 aspek: format, kontak, action verbs, angka pencapaian, ejaan, dan lain-lain. Bonus: AI analysis untuk grammar & tone. Hasil instan, tanpa login.",
  keywords: [
    "cek cv ats",
    "ats score",
    "skor cv",
    "cv lolos ats",
    "contoh cv",
    "review cv",
    "ats checker indonesia",
  ],
  openGraph: {
    title: "Cek Skor CV ATS Gratis — Lolos Screening dalam 30 Detik",
    description:
      "Cek skor ATS CV kamu secara gratis. 8 sub-skor + AI analysis. Hasil instan, tanpa login.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cek Skor CV ATS Gratis",
    description: "Cek skor CV ATS kamu — 8 aspek + AI analysis. Instan, gratis, tanpa login.",
  },
  alternates: {
    canonical: "/ats-checker",
  },
  robots: {
    index: true,
    follow: true,
  },
};
