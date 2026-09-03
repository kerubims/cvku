/**
 * Indonesian spell checker pakai nspell + kamus KBBI (hunspell-id).
 *
 * Lazy-load: nspell instance baru dibuat saat pertama kali dipakai,
 * supaya tidak membebani startup. Kamus dibaca dari filesystem
 * (lib/dictionaries/id_ID.aff + id_ID.dic) — total 46.905 kata.
 *
 * Anti-false-positive: kata yang di-skip otomatis:
 * - Proper noun (diawali huruf besar di tengah kalimat)
 * - TECH_WHITELIST (bahasa pemrograman, tools, software)
 * - Angka & numeric
 * - Kata yang sangat pendek (<3 char, biasanya singkatan)
 * - Email/URL (di-ignore)
 */

import nspell from "nspell";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TECH_WHITELIST, COMMON_TYPOS } from "./wordlists";

let spellInstance: ReturnType<typeof nspell> | null = null;
let initPromise: Promise<ReturnType<typeof nspell>> | null = null;

/**
 * Inisialisasi nspell dengan kamus id_ID (lazy).
 * Concurrent-safe: jika dipanggil paralel, return promise yang sama.
 */
async function getSpell(): Promise<ReturnType<typeof nspell>> {
  if (spellInstance) return spellInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const dictDir = join(process.cwd(), "lib", "dictionaries");
    const aff = readFileSync(join(dictDir, "id_ID.aff"), "utf8");
    const dic = readFileSync(join(dictDir, "id_ID.dic"), "utf8");

    // nspell constructor expects { aff, dic } strings
    const sp = nspell({ aff, dic });

    // Add common informal abbreviations so they're NOT flagged
    // (kita flag sendiri via rule, bukan via nspell)
    spellInstance = sp;
    return sp;
  })();

  return initPromise;
}

export interface TypoResult {
  /** Word yang terdeteksi typo / informal */
  word: string;
  /** Saran koreksi (max 3) */
  suggestions: string[];
  /** Index posisi di text asli (untuk highlighting) */
  position: number;
  /** Tipe masalah: 'typo' (salah ejaan) | 'informal' (singkatan) | 'known_typo' (mapping pasti) */
  type: "typo" | "informal" | "known_typo";
}

/**
 * Tokenize text jadi words + positions.
 * Returns: [{ word, position }]
 * Skip: punctuation, pure digits, single chars.
 */
function tokenize(text: string): { word: string; position: number; original: string }[] {
  const result: { word: string; position: number; original: string }[] = [];
  // Match word characters (Unicode letters, numbers, hyphens, dots for emails)
  // Position = index in original text
  const regex = /[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9._-]*[A-Za-zÀ-ÿ0-9]/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const word = m[0];
    if (word.length < 3) continue; // skip 1-2 char (kode, singkatan)
    // Skip emails & URLs
    if (word.includes("@") || word.includes("://")) continue;
    // Skip pure numbers
    if (/^\d+$/.test(word)) continue;
    // Skip hex colors
    if (/^#[0-9a-f]+$/i.test(word)) continue;
    result.push({ word, position: m.index, original: word });
  }
  return result;
}

/**
 * Detect if word is likely a proper noun (heuristic).
 * Heuristics:
 * - Diawali huruf besar DAN diikuti kata lain yang juga kapital (nama orang)
 * - Diawali huruf besar DAN bukan di awal kalimat (sangat mungkin proper noun)
 */
function isLikelyProperNoun(word: string, allWords: string[], idx: number): boolean {
  if (word[0] !== word[0].toUpperCase()) return false; // bukan kapital
  if (word === word.toUpperCase() && word.length > 4) return true; // ALL CAPS = akronim
  // Heuristik: kalau word ini kapital DAN word sebelumnya lowercase, mungkin proper noun
  // (contoh: "... di PT. Google Indonesia ...")
  if (idx > 0) {
    const prev = allWords[idx - 1];
    // Common words yang biasanya mendahului proper noun
    if (/^(pt|cv|ud|pt\.|cv\.|tbk|inc|ltd|llc|co)\.?$/i.test(prev)) return true;
  }
  // Kalau diapit 2 kata yang juga kapital, kemungkinan besar proper noun
  if (idx > 0 && idx < allWords.length - 1) {
    const prev = allWords[idx - 1];
    const next = allWords[idx + 1];
    if (prev[0] === prev[0].toUpperCase() && next[0] === next[0].toUpperCase()) {
      return true;
    }
  }
  return false;
}

/**
 * Main function: detect typos & informal words in CV text.
 */
export async function findTypos(text: string, maxTypos = 20): Promise<TypoResult[]> {
  const tokens = tokenize(text);
  if (tokens.length === 0) return [];

  const sp = await getSpell();
  const allWords = tokens.map((t) => t.word);
  const results: TypoResult[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const { word, position } = tokens[i];
    const lower = word.toLowerCase();

    // Skip: tech whitelist
    if (TECH_WHITELIST.has(lower)) continue;
    // Skip: proper noun heuristic
    if (isLikelyProperNoun(word, allWords, i)) continue;
    // Skip: ALL CAPS (akronim: KPI, ATS, B2B, dll)
    if (word === word.toUpperCase() && word.length >= 2 && /^[A-Z]+$/.test(word)) continue;
    // Skip: mengandung angka (kode produk, versi)
    if (/\d/.test(word)) continue;
    // Skip: 1-2 char setelah strip
    if (word.replace(/[^A-Za-zÀ-ÿ]/g, "").length < 3) continue;

    // 1. Check known typos first (presisi 100%)
    if (COMMON_TYPOS[lower]) {
      results.push({
        word,
        suggestions: COMMON_TYPOS[lower],
        position,
        type: "known_typo",
      });
      continue;
    }

    // 2. Check informal abbreviations
    if (/^(yg|dgn|utk|sdh|udh|bgt|skrg|aja|gpp|trs|blm|bkn|krn|klo|emg|sm|tp|kpn)$/i.test(lower)) {
      results.push({
        word,
        suggestions: ["hindari singkatan informal di CV profesional"],
        position,
        type: "informal",
      });
      continue;
    }

    // 3. Check nspell (kamus KBBI)
    if (!sp.correct(lower)) {
      const suggestions = sp.suggest(lower).slice(0, 3);
      if (suggestions.length > 0) {
        results.push({
          word,
          suggestions,
          position,
          type: "typo",
        });
      }
    }

    if (results.length >= maxTypos) break;
  }

  return results;
}

/**
 * Quick stat: berapa persen kata yang typo.
 * 0% = perfect, >5% = banyak typo.
 */
export function typoRate(text: string, typos: TypoResult[]): number {
  const wordCount = tokenize(text).length;
  if (wordCount === 0) return 0;
  return typos.length / wordCount;
}
