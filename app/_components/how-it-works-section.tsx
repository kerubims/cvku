export function HowItWorksSection() {
  return (
    <section className="py-20 bg-surface-canvas border-b border-surface-border" id="bikin-cv">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-700 font-bold uppercase tracking-wider text-xs block mb-2">Simpel &amp; Praktis</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tiga langkah, 5 menit, langsung jadi PDF.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Dari lembar kosong sampai siap disubmit ke portal karir impian kamu.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl border border-surface-border relative flex flex-col justify-between paper-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 font-black text-xl flex items-center justify-center mb-6 border border-brand-100">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Isi Data Pakai Bahasa Santai</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Tulis saja apa yang pernah kamu kerjakan dengan kata-kata sendiri. Fitur AI CVKu siap memolesnya jadi kalimat aksi formal, ringkas, dan persuasif standar HRD.
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
              <span className="text-slate-400 block mb-1">Contoh input kamu:</span>
              &quot;Tiap hari balesin chat customer dan rekap orderan di excel&quot;
              <span className="text-brand-700 font-bold block mt-2">Hasil AI CVKu:</span>
              &quot;Menangani 80+ interaksi pelanggan per hari serta memelihara data transaksi inventaris secara akurat.&quot;
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl border border-surface-border relative flex flex-col justify-between paper-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 font-black text-xl flex items-center justify-center mb-6 border border-brand-100">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pilih Template Ramah ATS</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Koleksi layout satu-kolom teruji tanpa elemen grafik yang membingungkan mesin screening. Font standar industri: Calibri, Arial, Garamond, dan Plus Jakarta Sans.
              </p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-medium text-slate-700">Classic Chronological</span>
                <span className="text-brand-700 font-bold">100% Parsing</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-medium text-slate-700">Modern Executive</span>
                <span className="text-brand-700 font-bold">100% Parsing</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl border border-surface-border relative flex flex-col justify-between paper-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 font-black text-xl flex items-center justify-center mb-6 border border-brand-100">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Download PDF Murni (Teks Nyata)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Unduh file PDF dengan text-layer utuh (bisa di-select &amp; copy-paste oleh HRD). Ukuran file ringan di bawah 300KB, pas untuk kuota upload web rekrutmen.
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
              </svg>
              <span>Langsung unduh tanpa watermark &amp; tanpa input nomor kartu!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}