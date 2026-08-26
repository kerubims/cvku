import type { CVData } from "./cv-data";

/**
 * Server-side HTML renderers for each template.
 * All templates: A4, 15mm margins, text-selectable (no images for content).
 * Rendered inside Puppeteer to PDF.
 */

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(" – ").replace(/–/, "-");
}

interface Section {
  heading?: string;
}

function bullets(text: string): string {
  if (!text) return "";
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) {
    // split on sentence boundaries if single line
    const sentences = text.split(/(?<=\.)\s+/).filter(Boolean);
    if (sentences.length > 1) lines.push(...sentences);
  }
  return `<ul>${lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`;
}

const BASE_CSS = `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Helvetica Neue', Arial, sans-serif; color:#1a1a1a; }
@page { size:A4; margin:15mm; }
ul { list-style:none; }
li { margin-bottom:3px; }
h2.sec { font-size:11pt; letter-spacing:1.5px; text-transform:uppercase;
         border-bottom:1px solid #ccc; padding-bottom:3px; margin:16px 0 8px; }
.item-head { display:flex; justify-content:space-between; align-items:baseline; }
.item-title { font-weight:bold; }
.meta { color:#555; font-size:9.5pt; white-space:nowrap; }
p, li { font-size:10pt; line-height:1.45; }
`;

export function renderCV(data: CVData, templateId: string): string {
  const d = data;

  const contact = [d.email, d.phone, d.city].filter(Boolean).map(esc).join(" | ");
  const expHtml =
    d.experiences.length > 0
      ? `<h2 class="sec">Pengalaman Kerja</h2>` +
        d.experiences
          .map(
            (e) => `
      <div class="item" style="margin-bottom:10px;">
        <div class="item-head">
          <span class="item-title">${esc(e.position)}${e.company ? `, ${esc(e.company)}` : ""}</span>
          <span class="meta">${esc(fmtRange(e.start, e.end))}</span>
        </div>
        ${bullets(e.description)}
      </div>`
          )
          .join("")
      : "";

  const eduHtml =
    d.education.length > 0
      ? `<h2 class="sec">Pendidikan</h2>` +
        d.education
          .map(
            (e) => `
      <div class="item" style="margin-bottom:8px;">
        <div class="item-head">
          <span class="item-title">${esc(e.school)}</span>
          <span class="meta">${esc(fmtRange(e.start, e.end))}</span>
        </div>
        ${e.degree ? `<p>${esc(e.degree)}</p>` : ""}
      </div>`
          )
          .join("")
      : "";

  const skillsHtml =
    d.skills.length > 0
      ? `<h2 class="sec">Skill</h2><p>${d.skills.map(esc).join(" · ")}</p>`
      : "";

  const summaryHtml = d.summary
    ? `<h2 class="sec">Ringkasan</h2><p>${esc(d.summary)}</p>`
    : "";

  switch (templateId) {
    case "T2": // Minimal ATS - thin dividers, Calibri-ish
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        body { font-family:Calibri, 'Segoe UI', Arial, sans-serif; }
        h1 { font-size:20pt; font-weight:normal; letter-spacing:2px; }
        h2.sec { border-bottom:none; border-left:3px solid #999; padding-left:8px; }
        </style></head><body>
        <header style="margin-bottom:6px;"><h1>${esc(d.fullName)}</h1>
        ${d.jobTitle ? `<p style="font-size:11pt;color:#444;">${esc(d.jobTitle)}</p>` : ""}
        <p style="font-size:9.5pt;color:#555;">${contact}</p></header>
        ${summaryHtml}${expHtml}${eduHtml}${skillsHtml}
        </body></html>`;

    case "T3": // Clean Serif
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        body { font-family:Georgia, 'Times New Roman', serif; }
        h1 { font-size:19pt; }
        h2.sec { font-style:italic; border-bottom-color:#bbb; }
        </style></head><body>
        <header style="text-align:center;margin-bottom:8px;"><h1>${esc(d.fullName)}</h1>
        ${d.jobTitle ? `<p style="font-size:11pt;">${esc(d.jobTitle)}</p>` : ""}
        <p style="font-size:9.5pt;color:#555;">${contact}</p></header>
        ${summaryHtml}${expHtml}${eduHtml}${skillsHtml}
        </body></html>`;

    case "T4": // Modern Bar - colored header band
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        header { background:#065f46; color:#fff; margin:-15mm -15mm 12mm; padding:14mm 15mm 8mm; }
        h1 { font-size:21pt; color:#fff; }
        .jobtitle { font-size:11pt; color:#a7f3d0; }
        .contact { font-size:9.5pt; color:#d1fae5; }
        h2.sec { color:#065f46; border-bottom:2px solid #065f46; }
        </style></head><body>
        <header><h1>${esc(d.fullName)}</h1>
        ${d.jobTitle ? `<p class="jobtitle">${esc(d.jobTitle)}</p>` : ""}
        <p class="contact">${contact}</p></header>
        ${summaryHtml}${expHtml}${eduHtml}${skillsHtml}
        </body></html>`;

    case "T5": // Two-Safe: narrow left rail (skills/contact), wide right (linear)
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        body { display:flex; gap:24px; }
        .rail { width:30%; background:#f4f4f4; padding:12px; border-radius:4px; height:fit-content;}
        .main { flex:1; }
        h2.sec { font-size:10pt; }
        @page { size:A4; margin:12mm; }
        </style></head><body>
        <div class="rail">
          <h1 style="font-size:15pt;">${esc(d.fullName)}</h1>
          <p style="font-size:9pt;color:#555;margin-top:4px;">${contact}</p>
          ${d.skills.length > 0 ? `<h2 class="sec" style="margin-top:14px;">Skill</h2><ul>${d.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
        </div>
        <div class="main">
          ${d.summary ? `<h2 class="sec">Ringkasan</h2><p>${esc(d.summary)}</p>` : ""}
          ${expHtml}${eduHtml}
        </div>
        </body></html>`;

    case "T6": { // Fresh Grad: education first
      const freshOrder = `${eduHtml}${expHtml}${summaryHtml}${skillsHtml}`;
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        h1 { font-size:18pt; }
        h2.sec { color:#065f46; }
        </style></head><body>
        <header style="margin-bottom:6px;"><h1>${esc(d.fullName)}</h1>
        ${d.jobTitle ? `<p style="font-size:11pt;color:#444;">${esc(d.jobTitle)}</p>` : ""}
        <p style="font-size:9.5pt;color:#555;">${contact}</p></header>
        ${freshOrder}
        </body></html>`;
    }

    case "T7": // Compact: tight spacing
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        p, li { font-size:9.5pt; line-height:1.35; }
        h2.sec { margin:10px 0 5px; font-size:10.5pt; }
        .item { margin-bottom:6px !important; }
        </style></head><body>
        <header style="margin-bottom:4px;"><h1 style="font-size:17pt;">${esc(d.fullName)}</h1>
        <p style="font-size:9.5pt;color:#555;">${[d.jobTitle, contact].filter(Boolean).map(esc).join(" | ")}</p></header>
        ${summaryHtml}${expHtml}${eduHtml}${skillsHtml}
        </body></html>`;

    case "T8": // Bold Header: huge name + accent rule
      return `<!DOCTYPE html><html><head><style>
        ${BASE_CSS}
        h1 { font-size:26pt; letter-spacing:-0.5px; color:#064e3b; }
        .rule { height:4px; background:#059669; width:100%; margin:6px 0 10px; border-radius:2px; }
        </style></head><body>
        <header><h1>${esc(d.fullName)}</h1>
        <div class="rule"></div>
        <p style="font-size:10pt;color:#555;">${[d.jobTitle, contact].filter(Boolean).join(" | ")}</p></header>
        ${summaryHtml}${expHtml}${eduHtml}${skillsHtml}
        </body></html>`;

    case "T1":
    default: // Classic ATS
      return `<!DOCTYPE html><html><head><style>${BASE_CSS}</style></head><body>
        <header style="margin-bottom:6px;"><h1 style="font-size:18pt;">${esc(d.fullName)}</h1>
        ${d.jobTitle ? `<p style="font-size:11pt;color:#444;">${esc(d.jobTitle)}</p>` : ""}
        <p style="font-size:9.5pt;color:#555;">${contact}</p></header>
        ${summaryHtml}${expHtml}${eduHtml}${skillsHtml}
        </body></html>`;
  }
}
