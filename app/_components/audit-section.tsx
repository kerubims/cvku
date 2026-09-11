import Link from "next/link";

export function AuditSection() {
  return (
    <section className="py-20 bg-white border-b border-surface-border" id="ats-scanner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Feature Description */}
          <div className="lg:col-span-6">
            <span className="text-brand-700 font-bold uppercase tracking-wider text-xs block mb-3">Audit Otomatis</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Cek kelemahan CV kamu sebelum dilihat HRD.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Algoritma CVKu memeriksa apakah susunan file kamu sudah memenuhi parameter standar rekruter: hierarki heading, rasio action verbs, kontak profesional, dan kepadatan kata kunci spesifik lowongan.
            </p>

            {/* Diagnostic Checklist */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Heading &amp; Urutan Standar Internasional</h4>
                  <p className="text-xs text-slate-500">Struktur baku: Summary, Pengalaman, Pendidikan, Organisasi, dan Skills teridentifikasi rapi.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Bebas Elemen Grafis Membingungkan</h4>
                  <p className="text-xs text-slate-500">Bebas progress bar persentase kemampuan dan tabel berlapis yang sering membuat bot hang.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Format Tanggal Konsisten (MM/YYYY)</h4>
                  <p className="text-xs text-slate-500">Mencegah kesalahan perhitungan masa kerja dan gap tahun pengalaman kerja.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800" href="/ats-checker">
                <span>Coba scan CV kamu sekarang</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Interactive Diagnostic Widget Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-surface-canvas rounded-2xl border border-surface-border p-6 sm:p-8 paper-shadow">
              <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Audit ATS</span>
                  <p className="text-base font-bold text-slate-900">Resume_Sari_Ramadhani.pdf</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Kategori: Siap Apply</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-surface-border">
                  <p className="text-xs text-slate-500">Tingkat Kemudahan Baca (Readability)</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">96<span className="text-xs font-normal text-slate-400">/100</span></p>
                  <span className="text-[11px] text-emerald-600 font-semibold">Teks layer 100% terdeteksi</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-surface-border">
                  <p className="text-xs text-slate-500">Kerapatan Kata Kerja Kuat</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">14<span className="text-xs font-normal text-slate-400"> Verbs</span></p>
                  <span className="text-[11px] text-emerald-600 font-semibold">Memimpin, Mengelola, Memangkas</span>
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-surface-border">
                  <span className="text-slate-700">Heading Standar (Work Experience, Education)</span>
                  <span className="text-emerald-700 font-bold">Lolos</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-surface-border">
                  <span className="text-slate-700">Informasi Kontak (Email &amp; No. WhatsApp Valid)</span>
                  <span className="text-emerald-700 font-bold">Lolos</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-surface-border">
                  <span className="text-slate-700">Penggunaan Tabel Berkolom Rumit</span>
                  <span className="text-emerald-700 font-bold">Aman (Nol Tabel)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}