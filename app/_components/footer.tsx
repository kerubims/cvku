import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-surface-border text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5"
                aria-label="CVKu Beranda"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center font-bold text-base">
                  C
                </div>
                <span>
                  CV<span className="text-brand-600">Ku</span>
                </span>
              </Link>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm mb-4">
              Platform CV ATS builder nomor satu di Indonesia. Membantu talenta lokal lolos screening HRD perusahaan terkemuka tanpa hambatan biaya atau privasi.
            </p>
            <div className="text-xs text-slate-400 font-mono">
              Dibuat dengan ❤️ di Indonesia.
            </div>
          </div>

          {/* Directory 1: Template Populer */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Contoh CV &amp; Template</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link className="hover:text-brand-700 transition-colors" href="/contoh-cv">CV Fresh Graduate</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/contoh-cv">CV Magang Kampus Merdeka</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/contoh-cv">CV Staff Administrasi</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/contoh-cv">CV Customer Service</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/contoh-cv">CV Software Engineer</Link></li>
            </ul>
          </div>

          {/* Directory 2: Panduan Karir */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Artikel &amp; Panduan</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link className="hover:text-brand-700 transition-colors" href="/artikel">Cara Kerja Sistem ATS</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/artikel">Contoh Action Verbs CV</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/artikel">Format CV Rekrutmen BUMN</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/artikel">Tips Interview HRD</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/artikel">Kamus Keyword Karir</Link></li>
            </ul>
          </div>

          {/* Directory 3: Navigasi Utama */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Navigasi</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link className="hover:text-brand-700 transition-colors" href="/buat">Bikin CV Gratis</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/ats-checker">Cek Skor ATS</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/contoh-cv">Katalog Contoh CV</Link></li>
              <li><Link className="hover:text-brand-700 transition-colors" href="/artikel">Artikel Karir</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CVKu. Hak cipta dilindungi. CV maker gratis untuk seluruh anak muda Indonesia.</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-slate-800" href="/contoh-cv">Contoh CV</Link>
            <Link className="hover:text-slate-800" href="/artikel">Artikel</Link>
            <Link className="hover:text-slate-800" href="/ats-checker">Cek ATS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}