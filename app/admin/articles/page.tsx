/**
 * /admin/articles — coming soon.
 *
 * Schema sudah ada di db/schema.sql (tabel `articles`).
 * Roadmap: MDX editor, SEO scoring, draft/publish workflow,
 * integrasi dengan programmatic /contoh-cv/[slug] pages.
 */

export const metadata = {
  title: "Artikel SEO — Admin CVKu",
};

const ROADMAP = [
  {
    title: "MDX editor",
    desc: "Edit artikel dengan rich text + komponen kustom (CTA, FAQ accordion, link ke /builder).",
    status: "planned",
  },
  {
    title: "Auto slug & SEO score",
    desc: "Auto-generate slug dari judul, hitung SEO score (panjang meta, jumlah keyword, struktur heading).",
    status: "planned",
  },
  {
    title: "Draft → publish workflow",
    desc: "Draft, scheduled publish, archived. Review mode sebelum live.",
    status: "planned",
  },
  {
    title: "Tipe artikel",
    desc: "Template sesuai niche: fresh graduate, admin, BUMN, kasir, IT, dll. 40+ halaman programmatic.",
    status: "planned",
  },
  {
    title: "Internal linking",
    desc: "Saran link otomatis antar artikel + ke /contoh-cv/[slug] dan /builder.",
    status: "planned",
  },
  {
    title: "Export ke static pages",
    desc: "Generate /artikel/[slug] static route dari draft published + sitemap.xml entry.",
    status: "planned",
  },
];

export default function AdminArticlesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Artikel SEO
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Konten untuk ranking long-tail keywords.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 6.04 17.96 10 14 13.96" />
          <path d="M17.96 6.04 14 10l3.96 3.96" />
          <path d="M3 12h11" />
          <path d="m3 18 6-6-6-6" />
          <path d="M21 3v18" />
        </svg>
        <h2 className="mt-3 text-lg font-semibold text-zinc-900">
          Coming soon
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Editor artikel &amp; SEO tools sedang dalam perencanaan.
          Skema database (tabel <code>articles</code>) sudah siap.
        </p>
        <p className="mt-3 text-xs text-zinc-500">
          Ingin fitur ini diprioritaskan?{" "}
          <a
            href="https://cvku.ksm.web.id#feedback"
            className="text-emerald-700 underline underline-offset-2"
          >
            Kasih tahu lewat feedback
          </a>
          .
        </p>
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Roadmap
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {ROADMAP.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-4"
          >
            <h3 className="font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
            <span className="mt-2 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
