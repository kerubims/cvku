import Link from "next/link";
import { WaitlistForm } from "./_components/waitlist-form";
import { RevealObserver } from "./_components/reveal-observer";
import { FaqAccordion } from "@/components/faq-accordion";
import { FAQS } from "@/lib/seo/schemas";

// No more `Pool` import + count query on this page (CVKu is already live,
// bottom CTA is no longer a waitlist). Pure static render now.
export const dynamic = "force-static";

const problems = [
  {
    title: "CV ditolak ATS sebelum dibaca HRD",
    body: "Template cantik dari Canva atau Word sering gagal dibaca mesin screening. 75% CV fresh graduate ditolak di tahap ini. CVKu dirancang ATS-friendly sejak baris pertama.",
  },
  {
    title: "Bingung mulai nulis dari mana",
    body: "Tulis pengalamanmu dengan bahasa seadanya, kasih contoh seadanya. AI kami yang rapihin jadi bullet point profesional yang menjual. Cocok untuk fresh graduate dan yang baru pindah karir.",
  },
  {
    title: "Tool lain mahal & banyak jebakan",
    body: "Layanan luar pakai langganan tersembunyi, watermark, dan login wajib. CVKu 100% gratis, tanpa login, tanpa watermark. Dibuat dan di-host di Indonesia.",
  },
];

const navLinks = [
  { href: "/buat", label: "Bikin CV" },
  { href: "/ats-checker", label: "Cek Skor ATS" },
  { href: "/contoh-cv", label: "Contoh CV" },
];

export default function LandingPage() {
  return (
    <main className="flex-1">
      <RevealObserver />

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-zinc-900"
            aria-label="CVKu, ke beranda"
          >
            CV<span className="text-emerald-700">Ku</span>
          </Link>
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Menu utama"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/ats-checker"
              className="hidden rounded-md px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 sm:inline-flex"
            >
              Cek Skor
            </Link>
            <Link
              href="/buat"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98]"
            >
              Bikin CV Gratis
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        {/* Mobile nav strip — solid bg + border so it never blends with hero text */}
        <nav
          className="flex items-center gap-2 overflow-x-auto border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 md:hidden"
          aria-label="Menu seluler"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero - asymmetric split */}
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 pt-12 md:min-h-[70dvh] md:grid-cols-[7fr_5fr] md:items-center md:pt-20">
        <div
          className="reveal-init"
          style={{ "--reveal-delay": 0 } as React.CSSProperties}
        >
          <h1 className="max-w-[18ch] text-[2.25rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-6xl">
            Bikin CV Lolos ATS, Gratis.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-zinc-600 md:text-lg">
            Bingung mulai CV dari nol? Ga tau format yang ATS-friendly? Tulis aja
            seadanya, AI CVKu yang rapihin kalimat dan pilih template-nya. Cocok
            buat fresh graduate dan yang baru pindah karir.
          </p>

          {/* Primary CTA */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/buat"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.99]"
            >
              Bikin CV Sekarang
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/ats-checker"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a4 4 0 00-4 4v1H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-1V5a4 4 0 00-4-4zm2 5V5a2 2 0 10-4 0v1h4zm-6 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              Cek Skor CV ATS Gratis
            </Link>
          </div>
          <p className="mt-4 pl-1 text-xs text-zinc-500">
            Tanpa login. Tanpa kartu kredit. CV kamu tidak disimpan ke server.
          </p>
        </div>

        {/* Hero visual: real rendered CV preview */}
        <div
          className="reveal-init hidden justify-self-end md:block"
          style={{ "--reveal-delay": 2 } as React.CSSProperties}
        >
          <div className="w-[320px] rotate-[2deg] rounded-xl border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(5,150,105,0.25)] transition-transform duration-500 hover:rotate-0">
            <div className="border-b border-zinc-200 pb-3">
              <p className="text-base font-bold text-zinc-900">Sari Ramadhani</p>
              <p className="text-xs text-zinc-500">
                Admin Staff · sari@email.com · 0812-3456-7890
              </p>
            </div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
              Pengalaman
            </p>
            <div className="mt-2 space-y-2.5">
              <div>
                <p className="text-xs font-semibold text-zinc-800">
                  Admin Intern, PT Nusantara Logistik
                </p>
                <p className="text-[11px] leading-relaxed text-zinc-600">
                  Mengelola arsip 300+ dokumen dan memangkas waktu pelaporan
                  mingguan dari 4 jam menjadi 90 menit.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-800">
                  Panitia Acara, BEM FEB 2023
                </p>
                <p className="text-[11px] leading-relaxed text-zinc-600">
                  Mengoordinasikan tim 12 orang untuk seminar nasional dengan
                  400+ peserta.
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-3">
              {["Excel", "Input Data", "Arsip Digital", "Google Workspace"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-zinc-400">
            Contoh hasil CVKu, template Classic ATS
          </p>
        </div>
      </section>

      {/* Problems - vertical stack rows */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16">
          <h2 className="max-w-[36ch] text-2xl font-bold tracking-tight md:text-3xl">
            Kenapa CV yang udah dibuat capek-capek, ga dipanggil-panggil HRD?
          </h2>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-zinc-600">
            Tujuh dari sepuluh pelamar di Indonesia gagal di screening pertama, padahal
            pengalaman dan skill-nya relevan. Ini tiga penyebab paling umum.
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className="reveal-init hidden justify-self-end md:block"
                style={{ "--reveal-delay": i } as React.CSSProperties}
              >
                <h3 className="font-semibold text-zinc-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Tiga langkah, lima menit, langsung jadi.
        </h2>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-zinc-600">
          Dari halaman kosong sampai file PDF siap kirim ke HRD. Tidak perlu sign up,
          tidak perlu kartu kredit.
        </p>
        <ol className="mt-10 space-y-8">
          {[
            [
              "Isi data, pakai bahasa sendiri",
              "Form santai berbahasa Indonesia, ada contoh yang sudah terisi. AI CVKu yang rapihin kalimatmu jadi bullet point profesional. Autosave otomatis, ga bakal hilang.",
            ],
            [
              "Pilih template ATS-friendly",
              "Delapan desain, semua dijamin terbaca mesin ATS perusahaan. Mau yang simpel, yang ada sidebar, atau yang kreatif, pilih sesuai style.",
            ],
            [
              "Download PDF, langsung kirim",
              "Gratis selamanya. Tidak ada watermark, tidak ada logo CVKu di CV kamu. File PDF text-selectable, jadi HRD bisa copy-paste saat screening.",
            ],
          ].map(([title, body], i) => (
            <li
              key={title}
              className="reveal-init flex items-start gap-5"
              style={{ "--reveal-delay": i } as React.CSSProperties}
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-mono text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-zinc-600">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-20">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Pertanyaan yang sering ditanya
          </h2>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-zinc-600">
            Belum menemukan jawabannya? Kirim feedback lewat tombol di pojok
            kanan bawah, kami baca semua.
          </p>
          <div className="mt-8">
            <FaqAccordion items={FAQS} groupId="landing-faq" />
          </div>
        </div>
      </section>

      {/* Bottom CTA band (no longer "coming soon", CVKu is live) */}
      <section className="bg-zinc-900">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
            CVKu sudah live. Bikin CV pertama kamu sekarang.
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-zinc-400">
            Tanpa login, tanpa watermark, tanpa kartu kredit. AI bantu nulis dari
            bahasa sehari-hari. Kelar dalam lima menit.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/buat"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-base font-bold text-white transition hover:bg-emerald-500 active:scale-[0.99]"
            >
              Bikin CV Gratis
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/ats-checker"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-transparent px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800/50"
            >
              Cek Skor CV dulu
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-6 px-4 py-8 text-xs text-zinc-500">
        <div>
          <p className="font-bold text-zinc-900">
            CV<span className="text-emerald-700">Ku</span>
          </p>
          <p className="mt-1">CV maker gratis, dibuat di Indonesia.</p>
        </div>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2"
          aria-label="Menu footer"
        >
          <Link href="/buat" className="hover:text-zinc-900">Bikin CV</Link>
          <Link href="/ats-checker" className="hover:text-zinc-900">Cek Skor ATS</Link>
          <Link href="/contoh-cv" className="hover:text-zinc-900">Contoh CV</Link>
          <Link href="/privasi" className="hover:text-zinc-900">Privasi</Link>
          <span>Rilis 2026</span>
        </nav>
      </footer>
    </main>
  );
}
