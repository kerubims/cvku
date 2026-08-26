"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CVData } from "@/lib/cv-data";
import { initialCV } from "@/lib/cv-data";

const STEPS = ["Data Diri", "Pengalaman", "Pendidikan & Skill", "Ringkasan", "Template"];
const TEMPLATES = [
  { id: "T1", name: "Classic ATS", desc: "1 kolom · paling aman" },
  { id: "T2", name: "Minimal ATS", desc: "1 kolom · garis tipis" },
  { id: "T3", name: "Clean Serif", desc: "1 kolom · serif elegan" },
  { id: "T4", name: "Modern Bar", desc: "Header berwarna" },
  { id: "T5", name: "Two-Safe", desc: "2 kolom · tetap terbaca ATS" },
  { id: "T6", name: "Fresh Grad", desc: "Pendidikan di atas" },
  { id: "T7", name: "Compact", desc: "Padat 1 halaman" },
  { id: "T8", name: "Bold Header", desc: "Nama besar tegas" },
];

export function Builder() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [cv, setCv] = useState<CVData>(initialCV);
  const [templateId, setTemplateId] = useState("T1");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [aiBusy, setAiBusy] = useState<string | null>(null);
  const dirty = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing draft once
  useEffect(() => {
    fetch("/api/resume")
      .then((r) => r.json())
      .then((d) => {
        if (d.resume?.data?.fullName) {
          setCv(d.resume.data);
          if (d.resume.templateId) setTemplateId(d.resume.templateId);
        }
      })
      .catch(() => {});
  }, []);

  const save = useCallback(
    (data: CVData, tpl: string) => {
      setSaveState("saving");
      fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, templateId: tpl }),
      })
        .then((r) => (r.ok ? setSaveState("saved") : setSaveState("error")))
        .catch(() => setSaveState("error"));
    },
    []
  );

  function update(patch: Partial<CVData>) {
    const next = { ...cv, ...patch };
    setCv(next);
    dirty.current = true;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(next, templateId), 900);
  }

  async function aiAssist(field: string, text: string, apply: (lines: string[]) => void) {
    if (!text || text.length < 10) return;
    setAiBusy(field);
    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, field }),
      });
      const d = await res.json();
      if (!res.ok || d.error) {
        alert(d.error ?? "AI gagal.");
      } else if (Array.isArray(d.result)) {
        apply(d.result.join("\n"));
      }
    } catch {
      alert("Koneksi bermasalah.");
    } finally {
      setAiBusy(null);
    }
  }

  async function downloadPdf() {
    setSaveState("saving");
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: cv, templateId }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv-${(cv.fullName || "saya").toLowerCase().replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setSaveState("saved");
    } catch {
      setSaveState("error");
      alert("Gagal membuat PDF. Coba lagi.");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-zinc-400 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";
  const labelCls = "block text-xs font-semibold text-zinc-700 mb-1.5";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
          <span>
            Langkah {step + 1} dari {STEPS.length}: {STEPS[step]}
          </span>
          <span
            className={
              saveState === "saved"
                ? "text-emerald-700"
                : saveState === "error"
                  ? "text-red-600"
                  : "text-zinc-400"
            }
          >
            {saveState === "saving"
              ? "Menyimpan..."
              : saveState === "saved"
                ? "Tersimpan otomatis"
                : saveState === "error"
                  ? "Gagal menyimpan"
                  : ""}
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-zinc-200">
          <div
            className="h-1.5 rounded-full bg-emerald-700 transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 0: Data diri */}
      {step === 0 && (
        <section className="space-y-4">
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-800">
            Ini contoh yang sudah terisi. Ganti dengan datamu sendiri, atau hapus
            bagian yang tidak perlu.
          </p>
          <div>
            <label htmlFor="fullName" className={labelCls}>Nama lengkap</label>
            <input id="fullName" className={inputCls} value={cv.fullName}
              onChange={(e) => update({ fullName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="jobTitle" className={labelCls}>Posisi yang dilamar</label>
            <input id="jobTitle" className={inputCls} value={cv.jobTitle}
              onChange={(e) => update({ jobTitle: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="email" className={labelCls}>Email</label>
              <input id="email" type="email" className={inputCls} value={cv.email}
                onChange={(e) => update({ email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>No. HP</label>
              <input id="phone" className={inputCls} value={cv.phone}
                onChange={(e) => update({ phone: e.target.value })} />
            </div>
            <div>
              <label htmlFor="city" className={labelCls}>Kota</label>
              <input id="city" className={inputCls} value={cv.city}
                onChange={(e) => update({ city: e.target.value })} />
            </div>
          </div>
        </section>
      )}

      {/* STEP 1: Pengalaman */}
      {step === 1 && (
        <section className="space-y-6">
          {cv.experiences.map((exp, i) => (
            <div key={i} className="rounded-xl border border-zinc-300 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Posisi</label>
                  <input className={inputCls} value={exp.position}
                    onChange={(e) => {
                      const next = [...cv.experiences];
                      next[i] = { ...exp, position: e.target.value };
                      update({ experiences: next });
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Perusahaan</label>
                  <input className={inputCls} value={exp.company}
                    onChange={(e) => {
                      const next = [...cv.experiences];
                      next[i] = { ...exp, company: e.target.value };
                      update({ experiences: next });
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Mulai</label>
                  <input className={inputCls} placeholder="2023-01" value={exp.start}
                    onChange={(e) => {
                      const next = [...cv.experiences];
                      next[i] = { ...exp, start: e.target.value };
                      update({ experiences: next });
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Selesai</label>
                  <input className={inputCls} placeholder="2023-06 atau sekarang" value={exp.end}
                    onChange={(e) => {
                      const next = [...cv.experiences];
                      next[i] = { ...exp, end: e.target.value };
                      update({ experiences: next });
                    }} />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <label className={labelCls}>Deskripsi pekerjaan</label>
                  <button
                    type="button"
                    disabled={aiBusy !== null}
                    onClick={() =>
                      aiAssist("pengalaman kerja", exp.description, (lines) => {
                        setCv((prev) => {
                          const next = [...prev.experiences];
                          next[i] = { ...next[i], description: String(lines) };
                          return { ...prev, experiences: next };
                        });
                        dirty.current = true;
                        if (timer.current) clearTimeout(timer.current);
                        timer.current = setTimeout(() => {
                          setCv((latest) => { save(latest, templateId); return latest; });
                        }, 900);
                      })
                    }
                    className="mb-1.5 rounded-full border border-emerald-700 px-3 py-1 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
                  >
                    {aiBusy === `pengalaman kerja` ? "AI menulis..." : "Bantu tulis dengan AI"}
                  </button>
                </div>
                <textarea
                  className={`${inputCls} min-h-24`}
                  value={exp.description}
                  onChange={(e) => {
                    const next = [...cv.experiences];
                    next[i] = { ...exp, description: e.target.value };
                    update({ experiences: next });
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => update({ experiences: cv.experiences.filter((_, j) => j !== i) })}
                className="mt-3 text-xs text-red-600 hover:underline"
              >
                Hapus pengalaman ini
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              update({
                experiences: [
                  ...cv.experiences,
                  { position: "", company: "", start: "", end: "", description: "" },
                ],
              })
            }
            className="w-full rounded-full border border-dashed border-zinc-400 py-3 text-sm font-semibold text-zinc-600 transition hover:border-emerald-700 hover:text-emerald-700"
          >
            + Tambah pengalaman
          </button>
        </section>
      )}

      {/* STEP 2: Pendidikan & skill */}
      {step === 2 && (
        <section className="space-y-6">
          {cv.education.map((ed, i) => (
            <div key={i} className="rounded-xl border border-zinc-300 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Sekolah / Kampus</label>
                  <input className={inputCls} value={ed.school}
                    onChange={(e) => {
                      const next = [...cv.education];
                      next[i] = { ...ed, school: e.target.value };
                      update({ education: next });
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Jurusan / Gelar</label>
                  <input className={inputCls} value={ed.degree}
                    onChange={(e) => {
                      const next = [...cv.education];
                      next[i] = { ...ed, degree: e.target.value };
                      update({ education: next });
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Tahun mulai</label>
                  <input className={inputCls} value={ed.start}
                    onChange={(e) => {
                      const next = [...cv.education];
                      next[i] = { ...ed, start: e.target.value };
                      update({ education: next });
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Tahun selesai</label>
                  <input className={inputCls} value={ed.end}
                    onChange={(e) => {
                      const next = [...cv.education];
                      next[i] = { ...ed, end: e.target.value };
                      update({ education: next });
                    }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => update({ education: cv.education.filter((_, j) => j !== i) })}
                className="mt-3 text-xs text-red-600 hover:underline"
              >
                Hapus pendidikan ini
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              update({
                education: [...cv.education, { school: "", degree: "", start: "", end: "" }],
              })
            }
            className="w-full rounded-full border border-dashed border-zinc-400 py-3 text-sm font-semibold text-zinc-600 transition hover:border-emerald-700 hover:text-emerald-700"
          >
            + Tambah pendidikan
          </button>

          <div>
            <label htmlFor="skills" className={labelCls}>
              Skill (pisahkan dengan koma)
            </label>
            <input
              id="skills"
              className={inputCls}
              value={cv.skills.join(", ")}
              onChange={(e) =>
                update({
                  skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
            />
          </div>
        </section>
      )}

      {/* STEP 3: Ringkasan */}
      {step === 3 && (
        <section>
          <div className="flex items-center justify-between">
            <label htmlFor="summary" className={labelCls}>
              Ringkasan profil (2-3 kalimat di atas CV)
            </label>
            <button
              type="button"
              disabled={aiBusy !== null}
              onClick={() =>
                            aiAssist("ringkasan profil", cv.summary, (lines) => {
                              setCv((prev) => ({ ...prev, summary: String(lines) }));
                              dirty.current = true;
                              if (timer.current) clearTimeout(timer.current);
                              timer.current = setTimeout(() => {
                                setCv((latest) => { save(latest, templateId); return latest; });
                              }, 900);
                            })
                          }
              className="mb-1.5 rounded-full border border-emerald-700 px-3 py-1 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              {aiBusy ? "AI menulis..." : "Bantu tulis dengan AI"}
            </button>
          </div>
          <textarea
            id="summary"
            className={`${inputCls} min-h-28`}
            value={cv.summary}
            onChange={(e) => update({ summary: e.target.value })}
          />
          <p className="mt-2 text-xs text-zinc-500">
            Tulis kasar saja, AI yang merapikan. Hasil AI tetap perlu kamu tinjau.
          </p>
        </section>
      )}

      {/* STEP 4: Template */}
      {step === 4 && (
        <section>
          <p className={labelCls}>Pilih desain CV</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplateId(t.id);
                  save(cv, t.id);
                }}
                className={`rounded-xl border-2 p-3 text-left transition active:scale-[0.98] ${
                  templateId === t.id
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-zinc-300 bg-white hover:border-zinc-500"
                }`}
              >
                <span className="block text-sm font-bold">{t.id}</span>
                <span className="block text-xs font-semibold mt-0.5">{t.name}</span>
                <span className="block text-[10px] text-zinc-500 mt-0.5">{t.desc}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Nav buttons - sticky bottom so always reachable on short screens */}
      <div className="sticky bottom-0 -mx-4 mt-10 flex items-center justify-between border-t border-zinc-200 bg-zinc-50/95 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-600 transition enabled:hover:bg-zinc-200 disabled:opacity-40"
        >
          Kembali
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98]"
          >
            Lanjut
          </button>
        ) : (
          <button
            type="button"
            onClick={downloadPdf}
            disabled={saveState === "saving"}
            className="rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-60"
          >
            {saveState === "saving" ? "Membuat PDF..." : "Download PDF"}
          </button>
        )}
      </div>
    </div>
  );
}
