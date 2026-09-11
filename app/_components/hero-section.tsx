import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-surface-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div 
            className="lg:col-span-7 flex flex-col items-start reveal-init"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
            {/* Contextual Notification Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-surface-border text-xs font-medium text-slate-700 mb-6 shadow-sm hover:border-emerald-300 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Diperbarui sesuai standar screening BUMN &amp; Tech 2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.15] mb-6">
              Bikin CV Lolos ATS, <br className="hidden sm:inline" />
              <span className="underline decoration-brand-500/40 decoration-wavy decoration-2">100% Gratis.</span> Tanpa Ribet.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Bingung mulai CV dari nol? Nggak tahu format ramah sistem ATS? Tulis seadanya dalam bahasa santai sehari-hari, AI CVKu yang rapihin kalimatnya jadi berbobot. Siap kirim ke HRD dalam 5 menit.
            </p>

            {/* Dual Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <Link
                href="/buat"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-base shadow-lg shadow-brand-800/20 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                <span>Bikin CV Sekarang</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </Link>
              <Link
                href="/ats-checker"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-base transition-all hover:border-slate-400 hover:-translate-y-0.5 shadow-sm active:scale-[0.98]"
              >
                <svg className="w-5 h-5 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Cek Skor CV ATS Gratis</span>
              </Link>
            </div>

            {/* Frictionless Guarantee Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                Tanpa Login &amp; Password
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                Tanpa Watermark CVKu
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                Data Aman (Lokal di Browser)
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Resume & ATS Scanner Card */}
          <div 
            className="lg:col-span-5 relative reveal-init"
            style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
          >
            {/* Live ATS Score Tag floating with subtle animation */}
            <div className="absolute -top-6 -right-2 sm:-right-4 z-20 bg-white/95 border border-emerald-200 shadow-xl rounded-2xl p-4 flex items-center gap-3.5 backdrop-blur-md animate-float">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-mono font-bold text-emerald-700 text-lg shadow-inner">
                98%
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                  ATS Score HRD
                </p>
                <p className="text-xs font-semibold text-slate-800">Format Sangat Terbaca (A+)</p>
              </div>
            </div>

            {/* Realistic Resume Document Preview */}
            <div className="relative bg-white rounded-2xl border border-surface-border paper-shadow p-6 sm:p-8 max-w-md mx-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden group">
              {/* Subtle ATS Scanline effect overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
                <div className="w-full h-12 ats-scanline animate-scanline"></div>
              </div>

              {/* Header */}
              <div className="border-b border-slate-200 pb-5 mb-5 relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Sari Ramadhani, S.E.</h3>
                <p className="text-sm font-semibold text-brand-700 mb-2">Staff Operasional &amp; Administrasi Logistik</p>
                <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-500 font-mono">
                  <span>sari.ramadhani@email.com</span>
                  <span>•</span>
                  <span>0812-3456-7890</span>
                  <span>•</span>
                  <span>Jakarta, ID</span>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4 mb-6 relative z-10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">PENGALAMAN KERJA</span>
                    <span className="text-[11px] font-mono text-slate-400">2023 - 2024</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">Admin Operations Intern — PT Nusantara Logistik</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    <li>Mengelola arsip 300+ invoice dan dokumen manifest bulanan dengan akurasi data 99.4%.</li>
                    <li>Memangkas waktu pelaporan mingguan dari 4 jam menjadi 90 menit menggunakan formula Google Sheets &amp; Pivot.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ORGANISASI</span>
                    <span className="text-[11px] font-mono text-slate-400">2022 - 2023</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">Panitia Acara &amp; Sponsorship — BEM FEB</p>
                  <p className="text-xs text-slate-600 mt-1">Mengkoordinasikan tim 12 staf operasional dan mendampingi 400+ peserta seminar karir nasional.</p>
                </div>
              </div>

              {/* Skills */}
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">KEAHLIAN RELEVAN (ATS KEYWORDS)</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded">Microsoft Excel</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded">Data Reconciliation</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded">ERP System</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded">Google Workspace</span>
                  <span className="px-2 py-1 bg-brand-50 text-brand-800 border border-brand-200 text-[11px] font-semibold rounded">+ 6 Skills</span>
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between text-[11px] text-slate-500 relative z-10">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Format 1-Kolom Standar HRD
                </span>
                <span className="font-mono text-slate-400">A4 PDF • 42 KB</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4 font-mono">Contoh riil hasil CVKu • Template ATS Classic Clean</p>
          </div>
        </div>

        {/* Supported ATS Ecosystem Proof Bar */}
        <div 
          className="mt-20 pt-10 border-t border-surface-border reveal-init"
          style={{ "--reveal-delay": "350ms" } as React.CSSProperties}
        >
          <p className="text-center text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
            Didesain lolos sistem ATS &amp; portal karir terkemuka di Indonesia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition duration-300">
            <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-600 hover:text-slate-900 transition-colors">JOBSTREET</span>
            <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-600 hover:text-slate-900 transition-colors">KALIBRR</span>
            <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-600 hover:text-slate-900 transition-colors">GLINTS</span>
            <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-600 hover:text-slate-900 transition-colors">LINKEDIN JOBS</span>
            <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-600 hover:text-slate-900 transition-colors">TALEBRIX / WORKDAY</span>
            <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-600 hover:text-slate-900 transition-colors">REKRUTMEN BUMN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
