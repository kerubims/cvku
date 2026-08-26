/**
 * Mini live previews for the 8 templates.
 * Each renders a scaled-down CV mock matching its template's real style
 * (same fonts/colors/structure as lib/render-cv.tsx).
 */

const DEMO = {
  name: "Sari Ramadhani",
  title: "Admin Staff",
  contact: "sari@email.com | 0812 | Bandung",
};

function Lines() {
  return (
    <>
      <div className="mt-1 h-1 w-full rounded bg-zinc-300" />
      <div className="h-1 w-5/6 rounded bg-zinc-200" />
      <div className="h-1 w-4/6 rounded bg-zinc-200" />
    </>
  );
}

export function TemplatePreview({ id }: { id: string }) {
  switch (id) {
    case "T2": // Minimal ATS - sans, left accent headings
      return (
        <div className="flex h-full flex-col bg-white p-3 font-sans">
          <p className="text-[11px] font-normal tracking-widest text-zinc-900">{DEMO.name.toUpperCase()}</p>
          <p className="text-[7px] text-zinc-500">{DEMO.contact}</p>
          <div className="mt-2 border-l-2 border-zinc-400 pl-1.5 text-[7px] font-bold uppercase tracking-wide text-zinc-700">Pengalaman</div>
          <div className="mt-1 space-y-0.5"><Lines /></div>
          <div className="mt-2 border-l-2 border-zinc-400 pl-1.5 text-[7px] font-bold uppercase tracking-wide text-zinc-700">Skill</div>
          <div className="mt-1 space-y-0.5"><Lines /></div>
        </div>
      );
    case "T3": // Clean Serif - centered, italic headings
      return (
        <div className="flex h-full flex-col items-center bg-white p-3 font-serif">
          <p className="text-[11px] font-bold text-zinc-900">{DEMO.name}</p>
          <p className="text-[6px] text-zinc-500">{DEMO.contact}</p>
          <p className="mt-2 w-full border-b border-zinc-300 pb-0.5 text-center text-[7px] italic text-zinc-700">Pengalaman Kerja</p>
          <div className="w-full space-y-0.5 pt-1"><Lines /></div>
          <p className="mt-2 w-full border-b border-zinc-300 pb-0.5 text-center text-[7px] italic text-zinc-700">Skill</p>
          <div className="w-full space-y-0.5 pt-1"><Lines /></div>
        </div>
      );
    case "T4": // Modern Bar - green header band
      return (
        <div className="flex h-full flex-col bg-white">
          <div className="bg-emerald-800 px-3 py-2.5">
            <p className="text-[11px] font-bold text-white">{DEMO.name}</p>
            <p className="text-[6px] text-emerald-200">{DEMO.title} · {DEMO.contact}</p>
          </div>
          <div className="flex-1 p-3">
            <p className="border-b-2 border-emerald-800 text-[7px] font-bold uppercase text-emerald-900">Ringkasan</p>
            <div className="mt-1 space-y-0.5"><Lines /></div>
            <p className="mt-2 border-b-2 border-emerald-800 text-[7px] font-bold uppercase text-emerald-900">Pengalaman</p>
            <div className="mt-1 space-y-0.5"><Lines /></div>
          </div>
        </div>
      );
    case "T5": // Two-Safe: gray rail + main
      return (
        <div className="flex h-full gap-1.5 bg-white p-2">
          <div className="w-1/3 rounded-sm bg-zinc-100 p-1.5">
            <p className="text-[8px] font-bold leading-tight text-zinc-900">{DEMO.name}</p>
            <div className="mt-1 space-y-0.5">
              <div className="h-1 rounded bg-zinc-300" />
              <div className="h-1 rounded bg-zinc-200" />
            </div>
            <div className="mt-2 h-1 w-8 rounded bg-emerald-800" />
            <div className="mt-1 space-y-0.5">
              <div className="h-1 rounded bg-zinc-200" />
              <div className="h-1 rounded bg-zinc-200" />
              <div className="h-1 rounded bg-zinc-200" />
            </div>
          </div>
          <div className="flex-1 p-0.5">
            <div className="h-1.5 w-10 rounded bg-emerald-800" />
            <div className="mt-1 space-y-0.5"><Lines /></div>
            <div className="mt-2 h-1.5 w-12 rounded bg-emerald-800" />
            <div className="mt-1 space-y-0.5"><Lines /></div>
          </div>
        </div>
      );
    case "T6": // Fresh Grad - education first
      return (
        <div className="flex h-full flex-col bg-white p-3">
          <p className="text-[10px] font-bold text-emerald-900">{DEMO.name}</p>
          <p className="text-[6px] text-zinc-500">{DEMO.contact}</p>
          <p className="mt-2 border-b border-emerald-700 pb-0.5 text-[7px] font-bold uppercase text-emerald-800">Pendidikan</p>
          <div className="mt-1 space-y-0.5"><Lines /></div>
          <p className="mt-2 border-b border-emerald-700 pb-0.5 text-[7px] font-bold uppercase text-emerald-800">Pengalaman</p>
          <div className="mt-1 space-y-0.5"><Lines /></div>
        </div>
      );
    case "T7": // Compact - tight
      return (
        <div className="flex h-full flex-col justify-between bg-white px-3 py-2">
          <div>
            <p className="text-[10px] font-bold text-zinc-900">{DEMO.name}</p>
            <p className="text-[5.5px] text-zinc-500">{DEMO.title} · {DEMO.contact}</p>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-1 w-14 rounded bg-zinc-400" />
              <div className="mt-0.5 space-y-0.5">
                <div className="h-1 w-full rounded bg-zinc-200" />
                <div className="h-1 w-4/5 rounded bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>
      );
    case "T8": // Bold Header - huge name + green rule
      return (
        <div className="flex h-full flex-col bg-white p-3">
          <p className="text-[13px] font-extrabold leading-none tracking-tight text-emerald-950">{DEMO.name}</p>
          <div className="my-1.5 h-[3px] w-full rounded bg-emerald-600" />
          <p className="text-[6px] text-zinc-500">{DEMO.title} · {DEMO.contact}</p>
          <div className="mt-2 space-y-0.5"><Lines /></div>
          <div className="mt-2 h-1.5 w-12 rounded bg-zinc-400" />
          <div className="mt-1 space-y-0.5"><Lines /></div>
        </div>
      );
    case "T1": // Classic ATS
    default:
      return (
        <div className="flex h-full flex-col bg-white p-3 font-sans">
          <p className="text-[11px] font-bold text-zinc-900">{DEMO.name}</p>
          <p className="text-[6px] text-zinc-500">{DEMO.title} · {DEMO.contact}</p>
          <p className="mt-2 border-b border-zinc-400 pb-0.5 text-[7px] font-bold uppercase tracking-wide text-zinc-700">Ringkasan</p>
          <div className="mt-1 space-y-0.5"><Lines /></div>
          <p className="mt-2 border-b border-zinc-400 pb-0.5 text-[7px] font-bold uppercase tracking-wide text-zinc-700">Pengalaman Kerja</p>
          <div className="mt-1 space-y-0.5"><Lines /></div>
        </div>
      );
  }
}
