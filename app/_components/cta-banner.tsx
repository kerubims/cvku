import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="px-3 py-1 rounded-full bg-brand-900/80 text-brand-400 border border-brand-700/50 text-xs font-bold uppercase tracking-widest inline-block mb-4">
          Mulai Sekarang • 5 Menit Jadi
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight mb-6">
          CVKu sudah live. Bikin CV pertama kamu sekarang.
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
          Tanpa login, tanpa watermark, tanpa kartu kredit. AI bantu tulis dari bahasa sehari-hari. Kelar dalam lima menit.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 transition duration-150 ease-in-out"
            href="/buat"
          >
            <span>Bikin CV Gratis</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </Link>
          <Link
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base transition"
            href="/ats-checker"
          >
            Cek Skor CV Dulu
          </Link>
        </div>
      </div>
    </section>
  );
}