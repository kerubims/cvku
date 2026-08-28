import { Pool } from "pg";
import Link from "next/link";
import { WaitlistForm } from "./_components/waitlist-form";
import { RevealObserver } from "./_components/reveal-observer";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

async function getWaitlistCount(): Promise<number> {
  try {
    const r = await pool.query("SELECT count(*)::int AS n FROM waitlist");
    return r.rows[0].n;
  } catch {
    return 0;
  }
}

export const dynamic = "force-dynamic";

const problems = [
  {
    title: "Ditolak ATS",
    body: "Template cantik dari desain grafis sering gagal dibaca mesin screening perusahaan. CVKu dirancang sejak awal untuk lolos ATS.",
  },
  {
    title: "Bingung mau nulis apa",
    body: "Tulis pengalamanmu dengan bahasa seadanya, AI kami merapikannya jadi bullet points profesional yang menjual.",
  },
  {
    title: "Tool luar mahal & jebakan",
    body: "Layanan luar memakai langganan tersembunyi. CVKu dibuat di Indonesia dan MVP ini gratis sepenuhnya.",
  },
];

export default async function LandingPage() {
  const count = await getWaitlistCount();

  return (
    <main className="flex-1">
      <RevealObserver />
      {/* Nav */}
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <span className="text-lg font-bold tracking-tight">
          CV<span className="text-emerald-700">Ku</span>
        </span>
        <a
          href="#waitlist"
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98]"
        >
          Gabung waitlist
        </a>
      </header>

      {/* Hero - asymmetric split */}
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 pt-12 md:min-h-[70dvh] md:grid-cols-[7fr_5fr] md:items-center md:pt-16">
        <div className="reveal-init" style={{ "--reveal-delay": 0 } as React.CSSProperties}>
          <h1 className="max-w-[20ch] text-4xl font-extrabold leading-[1.12] tracking-tight md:text-6xl">
            CV kamu layak dibaca manusia, bukan cuma mesin.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-zinc-600 md:text-lg">
            CVKu menyusun CV profesional yang lolos screening ATS, dengan AI
            yang merapikan tulisanmu. Dibuat untuk pencari kerja Indonesia.
          </p>

          {/* Waitlist CTA */}
          <div id="waitlist" className="mt-8 scroll-mt-24">
            <WaitlistForm />
            <p className="mt-3 pl-5 text-xs text-zinc-500">
              {count >= 25
                ? `${count} orang sudah mendaftar.`
                : "Gratis selamanya saat rilis. Tanpa kartu kredit."}
            </p>
          </div>
          <div className="mt-6 border-t border-zinc-200 pt-5">
            <a
              href="/buat"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              Atau langsung coba buat CV sekarang
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Hero visual: real rendered CV preview (component, not fake screenshot) */}
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
          <h2 className="max-w-[30ch] text-2xl font-bold tracking-tight md:text-3xl">
            Kenapa banyak CV ditolak sebelum dibaca HRD?
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {problems.map((p, i) => (
              <div
                className="reveal-init hidden justify-self-end md:block"
                style={{ "--reveal-delay": 2 } as React.CSSProperties}
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
          Tiga langkah, lima menit.
        </h2>
        <ol className="mt-10 space-y-8">
          {[
            ["Isi data", "Form santai berbahasa Indonesia, ada contoh terisi. Autosave otomatis."],
            ["Pilih template", "Delapan desain. Semua dijamin terbaca mesin ATS."],
            ["Download PDF", "Gratis, tanpa watermark, langsung kirim ke perusahaan."],
          ].map(([title, body], i) => (
            <li key={title} className="reveal-init flex items-start gap-5"
                style={{ "--reveal-delay": i } as React.CSSProperties}>
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

      {/* Bottom CTA band */}
      <section className="bg-zinc-900">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
            Rilis perdana sebentar lagi.
          </h2>
          <p className="mx-auto mt-3 max-w-[50ch] text-sm leading-relaxed text-zinc-400">
            Daftar untuk jadi yang pertama mencoba, dan bantu bentuk CVKu
            sesuai kebutuhan pencari kerja Indonesia.
          </p>
          <div className="mt-7 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-zinc-500">
        <span>CVKu. Dibuat di Indonesia.</span>
        <nav className="flex gap-4">
          <Link href="/contoh-cv" className="hover:text-zinc-900">Contoh CV</Link>
          <Link href="/privasi" className="hover:text-zinc-900">Privasi</Link>
          <span>Rilis 2026</span>
        </nav>
      </footer>
    </main>
  );
}
