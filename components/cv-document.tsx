import type { ContohCV } from "@/lib/contoh-cv/data";

/**
 * Render CV body saja (no nav, no button, no tips).
 * Dipakai di /contoh-cv/[slug] (embedded) dan /contoh-cv/[slug]/full (full-page).
 */
export function CvDocument({ cv }: { cv: ContohCV }) {
  return (
    <div
      id={`cv-document-${cv.slug}`}
      className="rounded-2xl bg-white border border-zinc-200 p-8 shadow-sm font-sans"
    >
      <header className="border-b-2 border-zinc-900 pb-3 mb-4">
        <h3 className="text-2xl font-bold uppercase tracking-wide text-zinc-900">
          {cv.cv.nama}
        </h3>
        <p className="text-base text-zinc-700 mt-1">{cv.cv.jabatan}</p>
        <p className="text-sm text-zinc-500 mt-1">
          {cv.cv.email} · {cv.cv.telepon} · {cv.cv.kota}
        </p>
      </header>

      <div className="mb-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Ringkasan
        </h4>
        <p className="text-sm text-zinc-700 leading-relaxed">{cv.cv.ringkasan}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Pengalaman
        </h4>
        {cv.cv.pengalaman.map((p, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-zinc-900">
                {p.posisi} — {p.perusahaan}
              </p>
              <p className="text-xs text-zinc-500">
                {p.mulai} – {p.selesai}
              </p>
            </div>
            <ul className="list-disc list-outside ml-5 mt-1 text-sm text-zinc-700 space-y-0.5">
              {p.deskripsi.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Pendidikan
        </h4>
        {cv.cv.pendidikan.map((p, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-zinc-900">
                {p.jurusan} — {p.sekolah}
              </p>
              <p className="text-xs text-zinc-500">
                {p.mulai} – {p.selesai}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Keahlian
        </h4>
        <div className="flex flex-wrap gap-2">
          {cv.cv.skill.map((k, i) => (
            <span
              key={i}
              className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs text-zinc-700"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {cv.cv.tambahan && cv.cv.tambahan.length > 0 && (
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Informasi Tambahan
          </h4>
          <dl className="text-sm text-zinc-700 space-y-1">
            {cv.cv.tambahan.map((t, i) => (
              <div key={i} className="grid grid-cols-[10rem_1fr] gap-2">
                <dt className="font-semibold text-zinc-900">{t.judul}</dt>
                <dd>{t.isi}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
