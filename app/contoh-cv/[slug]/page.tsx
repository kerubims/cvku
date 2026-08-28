import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTOH_CV_LIST,
  getContohBySlug,
  getRelated,
} from "@/lib/contoh-cv/data";
import {
  SITE_URL,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo/schemas";
import { JsonLd } from "@/components/json-ld";

export const dynamicParams = false;

/** Pre-render semua slug saat build (SSG) */
export function generateStaticParams() {
  return CONTOH_CV_LIST.map((c) => ({ slug: c.slug }));
}

/** Metadata unik per halaman (title + description) — anti-duplicate-content */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const cv = getContohBySlug(slug);
    if (!cv) return { title: "Contoh CV Tidak Ditemukan" };
    return {
      title: cv.judul,
      description: cv.metaDescription,
      alternates: { canonical: `/contoh-cv/${cv.slug}` },
      openGraph: {
        title: cv.judul,
        description: cv.metaDescription,
        type: "article",
        url: `${SITE_URL}/contoh-cv/${cv.slug}`,
        publishedTime: cv.publishedTime,
        modifiedTime: cv.modifiedTime,
        locale: "id_ID",
      },
    };
  });
}

export default async function ContohCVDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cv = getContohBySlug(slug);
  if (!cv) notFound();

  const related = getRelated(cv);
  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Contoh CV", url: `${SITE_URL}/contoh-cv` },
    { name: cv.judul, url: `${SITE_URL}/contoh-cv/${cv.slug}` },
  ]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <JsonLd
        data={[
          breadcrumb,
          articleSchema({
            slug: cv.slug,
            judul: cv.judul,
            metaDescription: cv.metaDescription,
            publishedTime: cv.publishedTime,
            modifiedTime: cv.modifiedTime,
          }),
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-6">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-zinc-900">Beranda</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/contoh-cv" className="hover:text-zinc-900">Contoh CV</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700 line-clamp-1">{cv.kategori}</li>
        </ol>
      </nav>

      <article>
        <header className="mb-8">
          <p className="text-sm font-medium text-emerald-700 mb-2">
            {cv.kategori}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            {cv.h1}
          </h1>
          <div className="mt-4 text-zinc-600 space-y-3">
            {cv.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </header>

        {/* Tips section */}
        <section className="mb-10 rounded-2xl bg-emerald-50/50 border border-emerald-100 p-6">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            Tips Khusus untuk {cv.kategori}
          </h2>
          <ul className="space-y-3">
            {cv.tips.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-zinc-900">{t.judul}</p>
                  <p className="text-zinc-700 mt-1">{t.isi}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CV display — text-selectable, ATS-pure */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            Contoh CV Lengkap
          </h2>
          <div className="rounded-2xl bg-white border border-zinc-200 p-8 shadow-sm font-sans">
            <header className="border-b-2 border-zinc-900 pb-3 mb-4">
              <h3 className="text-2xl font-bold uppercase tracking-wide text-zinc-900">
                {cv.cv.nama}
              </h3>
              <p className="text-base text-zinc-700 mt-1">{cv.cv.jabatan}</p>
              <p className="text-sm text-zinc-500 mt-1">
                {cv.cv.email} · {cv.cv.telepon} · {cv.cv.kota}
              </p>
            </header>

            <div className="mb-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Ringkasan
              </h4>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {cv.cv.ringkasan}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Pengalaman
              </h4>
              {cv.cv.pengalaman.map((p, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-zinc-900">
                      {p.posisi} — {p.perusahaan}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {p.mulai} – {p.selesai}
                    </p>
                  </div>
                  <ul className="list-disc list-outside ml-5 mt-1 text-sm text-zinc-700 space-y-0.5">
                    {p.deskripsi.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Pendidikan
              </h4>
              {cv.cv.pendidikan.map((p, i) => (
                <div key={i} className="flex justify-between items-baseline mb-1">
                  <p className="font-semibold text-zinc-900">
                    {p.sekolah} — {p.jurusan}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {p.mulai} – {p.selesai}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Skill
              </h4>
              <p className="text-sm text-zinc-700">{cv.cv.skill.join(" · ")}</p>
            </div>

            {cv.cv.tambahan?.map((t, i) => (
              <div key={i} className="mb-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                  {t.judul}
                </h4>
                <p className="text-sm text-zinc-700">{t.isi}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            *CV di atas adalah teks selectable, sama dengan format PDF ATS yang bisa
            di-scan sistem. Klik{' '}
            <Link href="/buat" className="text-emerald-700 underline">
              Buat CV
            </Link>{' '}
            untuk hasil versi Anda.
          </p>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-zinc-200 pt-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Contoh CV Terkait
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/contoh-cv/${r.slug}`}
                  className="block rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-600 hover:shadow"
                >
                  <p className="font-semibold text-zinc-900">{r.judul}</p>
                  <p className="text-sm text-zinc-600 mt-1">
                    {r.cv.nama} — {r.cv.jabatan}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 text-center">
          <Link
            href="/buat"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow hover:bg-emerald-700"
          >
            Buat CV Seperti Ini (Gratis)
          </Link>
        </section>
      </article>
    </main>
  );
}
