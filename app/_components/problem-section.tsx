export function ProblemSection() {
  const problems = [
    {
      title: "CV Canva Ditolak Sebelum Dilihat Mata HRD",
      body: "Format 2 kolom, tabel warna-warni, icon rating bintang untuk skill, dan teks yang diekspor jadi vector/gambar bikin software ATS mendeteksi CV-mu sebagai lembar kosong.",
      effect: "Efek: 75% CV fresh grad langsung masuk trash bin",
      badgeColor: "bg-red-100 text-red-700",
      effectColor: "text-red-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Bingung Nulis Deskripsi Pekerjaan",
      body: "Cuma nulis 'Bertanggung jawab atas laporan harian' tanpa angka dan metrik dampak. HRD butuh bukti pencapaian konkret dengan formula aksi: [Kata Kerja Kuat] + [Tugas Spesifik] + [Dampak Terukur].",
      effect: "Efek: Terlihat pasif dan tidak kompetitif",
      badgeColor: "bg-amber-100 text-amber-700",
      effectColor: "text-amber-700",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Tool Luar Banyak Jebakan Berbayar",
      body: "Udah capek-capek ngetik data 1 jam di website builder luar negeri, pas mau unduh tiba-tiba disuruh langganan $19/bulan atau ada cap watermark raksasa yang bikin malu saat dikirim ke HRD.",
      effect: "Solusi CVKu: 100% Free, selamanya tanpa kartu kredit",
      badgeColor: "bg-blue-100 text-blue-700",
      effectColor: "text-blue-700",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-brand-700 font-bold uppercase tracking-wider text-xs block mb-3">Fakta Pahit Rekrutmen</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kenapa CV yang dibuat capek-capek berhari-hari nggak dipanggil HRD?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            7 dari 10 pelamar di Indonesia gugur di detik pertama karena sistem bot ATS (Applicant Tracking System) gagal mengekstrak tulisan di CV kamu. Ini 3 biang kerok utamanya:
          </p>
        </div>

        {/* 3 Root Causes Cards (with CSS scroll-snap for pure CSS smooth mobile swipe) */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {problems.map((item, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[85vw] max-w-[320px] md:w-auto md:max-w-none p-8 rounded-2xl bg-surface-canvas border border-surface-border hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl ${item.badgeColor} flex items-center justify-center font-bold mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {item.body}
                </p>
              </div>
              <div className={`text-xs font-semibold ${item.effectColor} flex items-center gap-1 mt-auto pt-2`}>
                <span>{item.effect}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}