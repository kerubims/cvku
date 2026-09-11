export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Isi Data Pakai Bahasa Santai",
      body: "Tulis saja apa yang pernah kamu kerjakan dengan kata-kata sendiri. Fitur AI CVKu siap memolesnya jadi kalimat aksi formal, ringkas, dan persuasif standar HRD.",
      sampleInput: "Tiap hari balesin chat customer dan rekap orderan di excel",
      sampleOutput: "Menangani 80+ interaksi pelanggan per hari serta memelihara data transaksi inventaris secara akurat.",
    },
    {
      step: "02",
      title: "Pilih Template Ramah ATS",
      body: "Koleksi layout satu-kolom teruji tanpa elemen grafik yang membingungkan mesin screening. Font standar industri: Calibri, Arial, Garamond, dan Plus Jakarta Sans.",
      templates: [
        { name: "Classic Chronological", score: "100% Parsing" },
        { name: "Modern Executive", score: "100% Parsing" },
      ],
    },
    {
      step: "03",
      title: "Download PDF Murni (Teks Nyata)",
      body: "Unduh file PDF dengan text-layer utuh (bisa di-select & copy-paste oleh HRD). Ukuran file ringan di bawah 300KB, pas untuk kuota upload web rekrutmen.",
      guarantee: "Langsung unduh tanpa watermark & tanpa input nomor kartu!",
    },
  ];

  return (
    <section className="py-20 bg-surface-canvas border-b border-surface-border" id="bikin-cv">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className="text-center max-w-2xl mx-auto mb-16 reveal-init"
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
        >
          <span className="text-brand-700 font-bold uppercase tracking-wider text-xs block mb-2">Simpel &amp; Praktis</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tiga langkah, 5 menit, langsung jadi PDF.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Dari lembar kosong sampai siap disubmit ke portal karir impian kamu.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div 
            className="bg-white p-8 rounded-2xl border border-surface-border relative flex flex-col justify-between paper-shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 reveal-init group"
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 font-black text-xl flex items-center justify-center mb-6 border border-brand-100 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{steps[0].title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {steps[0].body}
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
              <span className="text-slate-400 block mb-1">Contoh input kamu:</span>
              &quot;{steps[0].sampleInput}&quot;
              <span className="text-brand-700 font-bold block mt-2">Hasil AI CVKu:</span>
              &quot;{steps[0].sampleOutput}&quot;
            </div>
          </div>

          {/* Step 2 */}
          <div 
            className="bg-white p-8 rounded-2xl border border-surface-border relative flex flex-col justify-between paper-shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 reveal-init group"
            style={{ "--reveal-delay": "350ms" } as React.CSSProperties}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 font-black text-xl flex items-center justify-center mb-6 border border-brand-100 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{steps[1].title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {steps[1].body}
              </p>
            </div>
            <div className="space-y-2 text-xs">
              {steps[1].templates?.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-medium text-slate-700">{t.name}</span>
                  <span className="text-brand-700 font-bold">{t.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div 
            className="bg-white p-8 rounded-2xl border border-surface-border relative flex flex-col justify-between paper-shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 reveal-init group"
            style={{ "--reveal-delay": "500ms" } as React.CSSProperties}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 font-black text-xl flex items-center justify-center mb-6 border border-brand-100 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{steps[2].title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {steps[2].body}
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
              </svg>
              <span>{steps[2].guarantee}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
