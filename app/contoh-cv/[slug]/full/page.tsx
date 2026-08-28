import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTOH_CV_LIST, getContohBySlug } from "@/lib/contoh-cv/data";
import { CvDocument } from "@/components/cv-document";
import { FullscreenButton } from "@/components/fullscreen-button";
import { PrintButton } from "@/components/print-button";

export const dynamicParams = false;

/** Pre-render semua slug saat build (SSG) */
export function generateStaticParams() {
  return CONTOH_CV_LIST.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cv = getContohBySlug(slug);
  if (!cv) return { title: "Contoh CV Tidak Ditemukan" };
  return {
    title: `${cv.judul} — Full View`,
    robots: { index: false, follow: false },
  };
}

export default async function ContohCVFull({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cv = getContohBySlug(slug);
  if (!cv) notFound();

  return (
    <main className="min-h-[100dvh] bg-zinc-100 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-semibold text-zinc-900">
              {cv.judul}
            </h1>
            <p className="text-xs text-zinc-500">
              Tampilan bersih — tanpa navigasi. Cocok untuk print atau screenshot.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FullscreenButton targetId={`cv-document-${cv.slug}`} />
            <PrintButton />
          </div>
        </div>
        <CvDocument cv={cv} />
        <p className="mt-6 text-center text-xs text-zinc-500">
          Ingin CV seperti ini?{" "}
          <a
            href="/buat"
            className="text-emerald-700 underline underline-offset-2"
          >
            Buat CV gratis
          </a>
        </p>
      </div>
    </main>
  );
}
