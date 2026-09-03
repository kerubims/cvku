/**
 * LastUpdatedBadge — Badge "Diperbarui [tanggal]" untuk SEO freshness signal.
 *
 * Render: small pill dengan icon calendar + tanggal + "Diperbarui" label.
 * ISO 8601 string → "12 September 2026" (id-ID locale).
 */

interface LastUpdatedBadgeProps {
  /** ISO 8601 string, e.g. "2026-08-28T00:00:00+07:00" */
  date: string;
  className?: string;
}

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function LastUpdatedBadge({ date, className = "" }: LastUpdatedBadgeProps) {
  // Format ISO → "12 September 2026" dengan locale id-ID
  // Pakai Intl.DateTimeFormat untuk konsistensi lintas runtime
  let formatted = "";
  try {
    const d = new Date(date);
    if (!Number.isNaN(d.getTime())) {
      const day = d.getDate();
      const month = MONTHS_ID[d.getMonth()] ?? "";
      const year = d.getFullYear();
      formatted = `${day} ${month} ${year}`;
    }
  } catch {
    formatted = date;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 ${className}`}
      aria-label={`Terakhir diperbarui pada ${formatted}`}
    >
      <svg
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zM3.5 8.5v6.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V8.5h-13z"
          clipRule="evenodd"
        />
      </svg>
      Diperbarui {formatted}
    </span>
  );
}
