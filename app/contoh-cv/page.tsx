import type { MetadataRoute } from "next";
import Link from "next/link";
import { CONTOH_CV_LIST } from "@/lib/contoh-cv/data";
import { FAQS, SITE_URL, SOFTWARE_SCHEMA, ORG_SCHEMA } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/json-ld";
import { FaqAccordion } from "@/components/faq-accordion";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Contoh CV per Lowongan — Template Lolos ATS 2026",
  description:
    "Kumpulan contoh CV Indonesia yang lolos ATS: fresh graduate, magang, admin, kasir, guru, marketing, dan lainnya. Lihat, tiru format, buat CV serupa gratis.",
  alternates: {
    canonical: "/contoh-cv",
  },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function ContohCVIndex() {
  // Group static data by category
  const byKategori = CONTOH_CV_LIST.reduce<Record<string, typeof CONTOH_CV_LIST>>(
    (acc, c) => {
      (acc[c.kategori] ||= []).push(c);
      return acc;
    },
    {}
  );

  // Fetch dynamic articles from DB (published only)
  let dynamicArticles: Awaited<ReturnType<typeof getAllArticles>> = [];
  try {
    dynamicArticles = await getAllArticles({ status: "published" });
  } catch (e) {
    // If DB is unavailable, gracefully fallback to static only
    console.error("Failed to fetch dynamic articles:", e);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <JsonLd
        data={[
          SOFTWARE_SCHEMA,
          ORG_SCHEMA,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]}
      />

      <header className="mb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-4">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-zinc-900">Beranda</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-700">Contoh CV</li>
          </ol>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          Contoh CV yang Lolos ATS — 10 Niche Teratas
        </h1>
        <p className="mt-4 text-lg text-zinc-600 max-w-3xl">
          Pilih niche pekerjaan di bawah. Tiap contoh CV ditulis dengan struktur ATS-pure,
          lengkap dengan tips spesifik supaya HRD tertarik melirik. Bebas tiru formatnya
          atau buat CV serupa langsung dari{" "}
          <Link href="/buat" className="text-emerald-700 underline underline-offset-4">
            builder gratis
          </Link>
          .
        </p>
      </header>

      {/* Dynamic CMS Articles Section - blended as regular CV examples */}
      {dynamicArticles.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-zinc-800 mb-4">
            Contoh CV Terbaru{" "}
            <span className="text-sm font-normal text-zinc-500">({dynamicArticles.length} contoh)</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dynamicArticles.map((article) => (
              <Link
                key={article.id}
                href={`/contoh-cv/${article.slug}`}
                className="group block rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-emerald-600 hover:shadow-[0_8px_24px_-8px_rgba(5,150,105,0.3)]"
              >
                <h3 className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                  {article.title}
                </h3>
                {article.meta_description && (
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
                    {article.meta_description}
                  </p>
                )}
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Lihat contoh →
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Static CV Examples */}
      {Object.entries(byKategori).map(([kategori, items]) => (
        <section key={kategori} className="mb-10">
          <h2 className="text-xl font-semibold text-zinc-800 mb-4">
            {kategori}{" "}
            <span className="text-sm font-normal text-zinc-500">({items.length} contoh)</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <Link
                key={c.slug}
                href={`/contoh-cv/${c.slug}`}
                className="group block rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-emerald-600 hover:shadow-[0_8px_24px_-8px_rgba(5,150,105,0.3)]"
              >
                <h3 className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                  {c.judul}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
                  {c.cv.nama} — {c.cv.jabatan}
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Lihat contoh →
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16 rounded-2xl bg-zinc-50 p-8 border border-zinc-200">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Pertanyaan Umum</h2>
        <FaqAccordion items={FAQS} groupId="contoh-faq" />
      </section>

      <section className="mt-12 text-center">
        <Link
          href="/buat"
          className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow hover:bg-emerald-700"
        >
          Buat CV Saya Sekarang (Gratis)
        </Link>
      </section>
    </main>
  );
}