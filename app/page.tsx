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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-5 w-5 text-rose-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Bingung mulai nulis dari mana",
    body: "Tulis pengalamanmu dengan bahasa seadanya, kasih contoh seadanya. AI kami yang rapihin jadi bullet point profesional yang menjual. Cocok untuk fresh graduate dan yang baru pindah karir.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-5 w-5 text-amber-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    title: "Tool lain mahal \u0026 banyak jebakan",
    body: "Layanan luar pakai langganan tersembunyi, watermark, dan login wajib. CVKu 100% gratis, tanpa login, tanpa watermark. Dibuat dan di-host di Indonesia.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-5 w-5 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5a1.5 1.5 0 0 1 1.5 1.5v9.75a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5Zm13.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6 10.5h.008v.008H6V10.5Z" />
      </svg>
    ),
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

      {/* Problems - horizontal scroll / swipe on mobile, 3-col grid on desktop */}
      <section className="border-y border-zinc-200 bg-white overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16">
          <div className="flex items-end justify-between gap-2">
            <div>
              <h2 className="max-w-[36ch] text-2xl font-bold tracking-tight md:text-3xl">
                Kenapa CV yang udah dibuat capek-capek, ga dipanggil-panggil HRD?
              </h2>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-zinc-600">
                Tujuh dari sepuluh pelamar di Indonesia gagal di screening pertama, padahal
                pengalaman dan skill-nya relevan. Ini tiga penyebab paling umum.
              </p>
            </div>
            <p className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 md:hidden">
              Geser <span aria-hidden="true">→</span>
            </p>
          </div>

          <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-8 md:overflow-visible md:p-0">
            {problems.map((p) => (
              <div
                key={p.title}
                className="problem-card-mobile flex shrink-0 snap-start flex-col justify-between rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-5 shadow-2xs transition-all hover:border-emerald-200 hover:bg-emerald-50/30 md:w-full md:shrink md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:hover:bg-transparent"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/60 bg-white shadow-2xs md:border-emerald-100/60 md:bg-emerald-50">
                    {p.icon}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-zinc-900 md:mt-3 md:text-base">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 md:text-sm">
                    {p.body}
                  </p>
                </div>
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
