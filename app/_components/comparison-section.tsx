export function ComparisonSection() {
  return (
    <section className="py-20 bg-surface-canvas border-b border-surface-border" id="perbandingan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-700 font-bold uppercase tracking-wider text-xs block mb-2">Transparan &amp; Jujur</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kenapa Pelamar Indonesia Beralih ke CVKu?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Bandingkan sendiri sebelum kamu menghabiskan waktu berjam-jam mendesain.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden paper-shadow min-w-[640px]">
            <thead>
              <tr className="border-b border-surface-border bg-slate-50/70 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="py-5 px-6">Fitur &amp; Kebijakan</th>
                <th className="py-5 px-6 text-brand-800 bg-brand-50/50">CVKu (Indonesia)</th>
                <th className="py-5 px-6">Canva / Design Editor</th>
                <th className="py-5 px-6">Resume Builder Luar Negeri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-sm">
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Biaya Download PDF</td>
                <td className="py-4 px-6 font-bold text-brand-700 bg-brand-50/20">100% Gratis Selamanya</td>
                <td className="py-4 px-6 text-slate-600">Gratis (Perlu akun Pro jika ada aset)</td>
                <td className="py-4 px-6 text-red-600 font-medium">Bayar $15 - $29 / bulan</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Watermark di CV</td>
                <td className="py-4 px-6 font-bold text-brand-700 bg-brand-50/20">Tanpa Watermark</td>
                <td className="py-4 px-6 text-slate-600">Tanpa Watermark</td>
                <td className="py-4 px-6 text-red-600 font-medium">Ada logo tool jika versi gratis</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Struktur Ramah ATS</td>
                <td className="py-4 px-6 font-bold text-brand-700 bg-brand-50/20">99.8% Lolos Screening Bot</td>
                <td className="py-4 px-6 text-red-600 font-medium">Sering Gagal (Banyak 2-kolom &amp; grafik)</td>
                <td className="py-4 px-6 text-slate-600">Bagus (Format Global)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">AI Penulis Bahasa Indonesia</td>
                <td className="py-4 px-6 font-bold text-brand-700 bg-brand-50/20">Sangat Natural &amp; Kontekstual</td>
                <td className="py-4 px-6 text-slate-400">Tidak ada</td>
                <td className="py-4 px-6 text-slate-600">Terjemahan kaku / English only</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Kebutuhan Registrasi / Login</td>
                <td className="py-4 px-6 font-bold text-brand-700 bg-brand-50/20">Tanpa Login (Langsung Pakai)</td>
                <td className="py-4 px-6 text-slate-600">Wajib Login Akun</td>
                <td className="py-4 px-6 text-slate-600">Wajib Email &amp; Kartu Kredit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}