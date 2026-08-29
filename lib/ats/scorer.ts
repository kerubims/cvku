/**
 * ATS Scorer — 8 sub-skor deterministic (no AI).
 * Setiap sub-skor punya bobot, di-aggregate jadi total 0-100.
 *
 * 1. Format compatibility  (15%) - no tabel/image, font standar
 * 2. Contact info          (10%) - email valid, telp
 * 3. Section structure     (12%) - header section standar
 * 4. Action verbs          (10%) - kata kerja kuat
 * 5. Quantified achievements (13%) - angka (%, juta, target)
 * 6. Length                (10%) - 400-900 kata ideal
 * 7. Skill density         (10%) - skill keywords density
 * 8. Spelling              (20%) - typo + ejaan (weight paling tinggi)
 */

import { findTypos, typoRate, type TypoResult } from "./spellcheck";
import {
  ACTION_VERBS,
  TECH_WHITELIST,
  SECTION_PATTERNS,
  SOFT_SKILLS,
  INFORMAL_ABBREVIATIONS,
} from "./wordlists";
import type { SubScore, AtsResult, ScoringInput } from "./types";

// ===== Helpers =====

function classify(score: number): "excellent" | "good" | "fair" | "poor" {
  if (score >= 85) return "excellent";
  if (score >= 65) return "good";
  if (score >= 40) return "fair";
  return "poor";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ===== Sub-scorer 1: Format compatibility =====
function scoreFormat(text: string): SubScore {
  const suggestions: string[] = [];
  let score = 100;

  // Deteksi marker tabel/grid (markah umum)
  const tableMarkers = (text.match(/\|.*\|/g) || []).length;
  if (tableMarkers > 2) {
    score -= 20;
    suggestions.push(`Terdeteksi ${tableMarkers} baris berformat tabel (| ... |). Gunakan layout 1 kolom.`);
  }

  // Deteksi markup gambar (markdown, HTML)
  const imageMarkers = (text.match(/!\[|<img|!\[.*\]\(.*\.(png|jpg|jpeg|gif|webp)/gi) || []).length;
  if (imageMarkers > 0) {
    score -= 30;
    suggestions.push("Hindari gambar/foto di CV — ATS tidak bisa membacanya. Pakai teks saja.");
  }

  // Deteksi special chars yang bikin ATS bingung
  const specialChars = (text.match(/[│┤┌┐└┘├┬┴┼─]/g) || []).length;
  if (specialChars > 5) {
    score -= 15;
    suggestions.push("Terdeteksi karakter tabel ASCII yang menyulitkan ATS. Gunakan bullet • saja.");
  }

  // Positif: bullet points rapi
  const bullets = (text.match(/^[\s]*[•\-\*]\s+/gm) || []).length;
  if (bullets >= 3) {
    score = Math.min(100, score + 10);
  } else if (bullets === 0 && wordCount(text) > 200) {
    score -= 10;
    suggestions.push("Gunakan bullet points (• atau -) untuk merapikan daftar pengalaman & skill.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Format terlihat baik dan ATS-friendly.");
  }

  return {
    key: "format",
    label: "Format & Layout",
    score: Math.max(0, Math.min(100, Math.round(score))),
    weight: 0.15,
    status: classify(Math.max(0, Math.min(100, Math.round(score)))),
    suggestions,
  };
}

// ===== Sub-scorer 2: Contact info =====
function scoreContact(text: string): SubScore {
  const suggestions: string[] = [];
  let score = 0;

  // Email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const hasEmail = emailRegex.test(text);
  if (hasEmail) score += 50;
  else suggestions.push("Tambahkan alamat email profesional (hindari nickname).");

  // Phone (Indonesia: 08xx, +62, atau 02x untuk rumah)
  const phoneRegex = /(\+62|62|0)[\s-]?8\d{1,3}[\s-]?\d{3,4}[\s-]?\d{3,4}|0\d{2,3}[\s-]?\d{3,4}[\s-]?\d{3,4}/;
  const hasPhone = phoneRegex.test(text);
  if (hasPhone) score += 35;
  else suggestions.push("Tambahkan nomor telepon/HP yang aktif.");

  // LinkedIn atau portfolio (opsional, bonus 15)
  const hasLinkedIn = /linkedin\.com|linkedin:|linkedin /i.test(text);
  const hasPortfolio = /github\.com|gitlab\.com|behance\.net|dribbble\.com|portofolio|portfolio/i.test(text);
  if (hasLinkedIn || hasPortfolio) score += 15;
  else suggestions.push("(Opsional) Tambahkan LinkedIn / portfolio online untuk nilai tambah.");

  if (score === 100 && suggestions.length === 0) {
    suggestions.push("Kontak lengkap dan profesional.");
  }

  return {
    key: "contact",
    label: "Informasi Kontak",
    score: Math.min(100, score),
    weight: 0.10,
    status: classify(Math.min(100, score)),
    suggestions,
  };
}

// ===== Sub-scorer 3: Section structure =====
function scoreSection(text: string): SubScore {
  const suggestions: string[] = [];
  const lower = text.toLowerCase();
  let foundCount = 0;
  const found: string[] = [];
  const missing: string[] = [];

  // Required sections
  const checks: { name: string; patterns: string[] }[] = [
    { name: "Pengalaman", patterns: SECTION_PATTERNS.experience },
    { name: "Pendidikan", patterns: SECTION_PATTERNS.education },
    { name: "Keahlian", patterns: SECTION_PATTERNS.skills },
  ];

  for (const check of checks) {
    if (check.patterns.some((p) => lower.includes(p))) {
      foundCount++;
      found.push(check.name);
    } else {
      missing.push(check.name);
    }
  }

  // Bonus: Ringkasan/profil
  if (SECTION_PATTERNS.summary.some((p) => lower.includes(p))) {
    foundCount++;
    found.push("Ringkasan");
  }

  // Bonus: Pencapaian/Sertifikasi
  if (SECTION_PATTERNS.achievements.some((p) => lower.includes(p))) {
    foundCount++;
    found.push("Pencapaian");
  }

  if (missing.length > 0) {
    suggestions.push(`Tambahkan section: ${missing.join(", ")}.`);
  }

  // Hitung skor: 3 wajib = 80%, 2 = 60%, 1 = 40%, 0 = 0%
  let score = 0;
  if (foundCount >= 3) {
    const bonusCount = foundCount - 3; // ringkasan + pencapaian
    score = 80 + Math.min(20, bonusCount * 10);
  } else if (foundCount === 2) {
    score = 60;
  } else if (foundCount === 1) {
    score = 30;
  }

  if (score === 100 && suggestions.length === 0) {
    suggestions.push("Struktur section lengkap dan jelas.");
  } else if (found.length > 0) {
    suggestions.unshift(`Section terdeteksi: ${found.join(", ")}.`);
  }

  return {
    key: "section",
    label: "Struktur Section",
    score,
    weight: 0.12,
    status: classify(score),
    suggestions,
  };
}

// ===== Sub-scorer 4: Action verbs =====
function scoreActionVerbs(text: string): SubScore {
  const suggestions: string[] = [];
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);

  // Count action verb occurrences
  const verbCounts = new Map<string, number>();
  for (const verb of ACTION_VERBS) {
    // word boundary match
    const regex = new RegExp(`\\b${verb.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    const matches = lower.match(regex);
    if (matches) verbCounts.set(verb, matches.length);
  }

  const totalHits = Array.from(verbCounts.values()).reduce((a, b) => a + b, 0);
  const uniqueVerbs = verbCounts.size;

  // Skor: 5+ unique = 100, 3-4 = 75, 1-2 = 50, 0 = 20
  let score = 0;
  if (uniqueVerbs >= 5) score = 100;
  else if (uniqueVerbs >= 3) score = 75;
  else if (uniqueVerbs >= 1) score = 50;
  else score = 20;

  // Bonus: kalau ada banyak action verbs (total hits > 10)
  if (totalHits >= 10 && score < 100) score = Math.min(100, score + 10);

  if (uniqueVerbs === 0) {
    suggestions.push("Gunakan action verbs di awal bullet: mengelola, membangun, meningkatkan, merancang, dll.");
  } else if (uniqueVerbs < 3) {
    suggestions.push(`Tambah variasi action verbs (saat ini: ${uniqueVerbs}). Target minimal 3-5 variasi.`);
  } else {
    suggestions.push(`Bagus! ${uniqueVerbs} action verbs terdeteksi (${totalHits} total penggunaan).`);
  }

  return {
    key: "actionVerbs",
    label: "Action Verbs",
    score,
    weight: 0.10,
    status: classify(score),
    suggestions,
    details: { uniqueVerbs, totalHits, topVerbs: Array.from(verbCounts.entries()).slice(0, 5) },
  };
}

// ===== Sub-scorer 5: Quantified achievements =====
function scoreQuantified(text: string): SubScore {
  const suggestions: string[] = [];
  const totalWords = wordCount(text);

  // Pattern untuk angka dalam konteks: %, juta, ribu, tahun, target, x (multiplier), atau angka biasa
  const patterns = [
    /\d+\s?%/g, // persen: 25%, 30 %
    /(Rp|rp)\s?[\d.,]+\s?(jt|juta|ribu|rb|k|m|miliar)/gi, // rupiah: Rp 50 juta
    /\d+\s?(jt|juta|ribu|rb|k|m|miliar)/gi, // 50 juta, 100rb
    /\d+\s?(tahun|thn|th|year|years)/gi, // 5 tahun
    /\d+\s?(orang|org|person|people|user|customer|client)/gi, // 100 user
    /\d+\s?(project|proyek|produk|product|campaign|event)/gi, // 5 project
    /\d+x\b/gi, // 3x, 5x
    /\d+[%]/g, // 50% (redundant tapi aman)
    /\bnaik|turun|bertambah|berkurang|increase|decrease|reduce|boost/g, // trend words
  ];

  let totalHits = 0;
  for (const pattern of patterns) {
    const m = text.match(pattern);
    if (m) totalHits += m.length;
  }

  // Normalized: minimal 1 angka per 50 kata = baik
  const ratio = totalHits / Math.max(totalWords / 50, 1);
  let score = 0;
  if (ratio >= 3) score = 100;
  else if (ratio >= 2) score = 80;
  else if (ratio >= 1) score = 60;
  else if (ratio >= 0.5) score = 40;
  else if (totalHits > 0) score = 20;
  else score = 0;

  if (totalHits === 0) {
    suggestions.push('Tidak ada angka terukur. Tambahkan hasil: "meningkatkan penjualan 25%", "mengelola 5 proyek", "bertugas untuk 200 klien".');
  } else if (ratio < 1) {
    suggestions.push("Angka sudah ada, tapi masih jarang. Tambahkan lebih banyak hasil terukur.");
  } else {
    suggestions.push(`Bagus! ${totalHits} angka/konteks terukur terdeteksi.`);
  }

  return {
    key: "quantified",
    label: "Pencapaian Terukur",
    score,
    weight: 0.13,
    status: classify(score),
    suggestions,
    details: { totalHits, ratio: ratio.toFixed(2) },
  };
}

// ===== Sub-scorer 6: Length =====
function scoreLength(text: string): SubScore {
  const suggestions: string[] = [];
  const words = wordCount(text);
  // Estimasi halaman: 350 kata/halaman A4 single-spaced
  const pages = words / 350;

  let score = 0;
  if (words < 100) {
    score = 20;
    suggestions.push(`CV terlalu pendek (${words} kata). Tambahkan detail pengalaman & skill.`);
  } else if (words < 300) {
    score = 50;
    suggestions.push(`CV masih kurang detail (${words} kata). Tambahkan pengalaman dan skill.`);
  } else if (words <= 900) {
    score = 100; // ideal 1-2 halaman
    suggestions.push(`Panjang CV ideal (${words} kata, ~${pages.toFixed(1)} halaman).`);
  } else if (words <= 1500) {
    score = 80;
    suggestions.push(`CV agak panjang (${words} kata, ~${pages.toFixed(1)} halaman). Untuk fresh graduate, target 1-2 halaman.`);
  } else {
    score = 50;
    suggestions.push(`CV terlalu panjang (${words} kata, ~${pages.toFixed(1)} halaman). HRD malas baca > 2 halaman.`);
  }

  return {
    key: "length",
    label: "Panjang CV",
    score,
    weight: 0.10,
    status: classify(score),
    suggestions,
    details: { wordCount: words, estimatedPages: pages.toFixed(1) },
  };
}

// ===== Sub-scorer 7: Skill density =====
function scoreSkillDensity(text: string): SubScore {
  const suggestions: string[] = [];
  const lower = text.toLowerCase();
  const words = wordCount(text);

  // Count: tech + soft skill occurrences
  let techHits = 0;
  for (const tech of TECH_WHITELIST) {
    const regex = new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const m = lower.match(regex);
    if (m) techHits += m.length;
  }

  let softHits = 0;
  for (const skill of SOFT_SKILLS) {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const m = lower.match(regex);
    if (m) softHits += m.length;
  }

  // Normalized: per 100 kata
  const per100 = ((techHits + softHits) / Math.max(words, 1)) * 100;
  let score = 0;
  if (per100 >= 8) score = 100;
  else if (per100 >= 5) score = 80;
  else if (per100 >= 3) score = 60;
  else if (per100 >= 1) score = 40;
  else if (techHits + softHits > 0) score = 20;
  else score = 10;

  if (techHits + softHits === 0) {
    suggestions.push('Tidak ada skill terdeteksi. Tambahkan section "Keahlian" dengan tools/software spesifik.');
  } else if (per100 < 3) {
    suggestions.push(`Skill masih jarang (${techHits + softHits} total). Tambahkan lebih banyak tools & software spesifik.`);
  } else {
    suggestions.push(`Bagus! ${techHits} tech skill + ${softHits} soft skill terdeteksi.`);
  }

  return {
    key: "skillDensity",
    label: "Density Skill",
    score,
    weight: 0.10,
    status: classify(score),
    suggestions,
    details: { techHits, softHits, per100words: per100.toFixed(1) },
  };
}

// ===== Sub-scorer 8: Spelling (paling berat, 20%) =====
function scoreSpelling(typos: TypoResult[]): SubScore {
  const suggestions: string[] = [];
  const typoCount = typos.filter((t) => t.type !== "informal").length;
  const informalCount = typos.filter((t) => t.type === "informal").length;

  let score = 0;
  if (typoCount === 0 && informalCount === 0) {
    score = 100;
    suggestions.push("Ejaan sempurna! Tidak ada typo atau singkatan informal terdeteksi.");
  } else if (typoCount === 0 && informalCount > 0) {
    score = 85;
    suggestions.push(`Terdeteksi ${informalCount} singkatan informal (yg, dgn, dll). Ganti dengan kata lengkap.`);
  } else if (typoCount <= 2) {
    score = 75;
    suggestions.push(`Terdeteksi ${typoCount} typo. Cek ulang ejaan pada kata-kata kunci.`);
  } else if (typoCount <= 5) {
    score = 55;
    suggestions.push(`Terdeteksi ${typoCount} typo. Perbaiki sebelum submit.`);
  } else if (typoCount <= 10) {
    score = 30;
    suggestions.push(`Terdeteksi ${typoCount} typo. Cukup banyak — HRD & ATS sangat sensitif terhadap typo.`);
  } else {
    score = 10;
    suggestions.push(`Terdeteksi ${typoCount} typo — banyak sekali. CV perlu dicek ulang secara menyeluruh.`);
  }

  // Add specific suggestions for first 3 typos
  const top3 = typos.slice(0, 3);
  for (const t of top3) {
    if (t.suggestions.length > 0) {
      suggestions.push(`"${t.word}" → "${t.suggestions[0]}"`);
    }
  }

  return {
    key: "spelling",
    label: "Kualitas Penulisan",
    score,
    weight: 0.20, // weight tertinggi — typo sangat kritikal
    status: classify(score),
    suggestions,
    details: { typoCount, informalCount, totalIssues: typos.length },
  };
}

// ===== Main scorer =====
export async function scoreAts(input: ScoringInput): Promise<AtsResult> {
  const start = Date.now();
  const { text, aiEnabled = false } = input;

  // 1-7: deterministic scores
  const format = scoreFormat(text);
  const contact = scoreContact(text);
  const section = scoreSection(text);
  const actionVerbs = scoreActionVerbs(text);
  const quantified = scoreQuantified(text);
  const length = scoreLength(text);
  const skillDensity = scoreSkillDensity(text);

  // 8: spelling (async karena nspell lazy-load)
  const typos = await findTypos(text);
  const spelling = scoreSpelling(typos);

  // Aggregate weighted total
  const subScores = [format, contact, section, actionVerbs, quantified, length, skillDensity, spelling];
  const totalScore = Math.round(
    subScores.reduce((sum, s) => sum + s.score * s.weight, 0)
  );

  // Headline message
  let headline: string;
  if (totalScore >= 85) {
    headline = "CV ini sangat ATS-friendly — kemungkinan besar lolos screening!";
  } else if (totalScore >= 65) {
    headline = "CV ini lumayan, tapi ada beberapa hal yang bisa diperbaiki.";
  } else if (totalScore >= 40) {
    headline = "CV ini perlu perbaikan substansial sebelum dikirim.";
  } else {
    headline = "CV ini kemungkinan besar ditolak ATS. Perbaiki dulu sebelum apply.";
  }

  return {
    totalScore,
    status: classify(totalScore),
    subScores,
    aiEnabled,
    meta: {
      wordCount: wordCount(text),
      characterCount: text.length,
      scoringDurationMs: Date.now() - start,
      version: "1.0.0",
    },
    headline,
  };
}
