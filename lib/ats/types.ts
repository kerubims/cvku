/**
 * Type definitions untuk ATS Score Checker.
 * Data flow: user paste CV / upload file → parsed text → scored → result JSON.
 */

export interface SubScore {
  /** Key unik: 'format' | 'contact' | 'section' | 'actionVerbs' | 'quantified' | 'length' | 'skillDensity' | 'spelling' */
  key: string;
  /** Label Bahasa Indonesia untuk UI */
  label: string;
  /** Skor 0-100 untuk sub-aspek ini */
  score: number;
  /** Bobot sub-aspek dalam skor total (0-1, total semua sub = 1) */
  weight: number;
  /** Status klasifikasi (untuk warna UI) */
  status: "excellent" | "good" | "fair" | "poor";
  /** Saran konkret (Bahasa Indonesia) — 1-3 item, tampil di UI */
  suggestions: string[];
  /** Detail tambahan (opsional, untuk tooltip / debug) */
  details?: Record<string, unknown>;
}

export interface AtsResult {
  /** Skor total 0-100 */
  totalScore: number;
  /** Status klasifikasi skor total */
  status: "excellent" | "good" | "fair" | "poor";
  /** Semua sub-skor */
  subScores: SubScore[];
  /** Apakah AI layer diaktifkan */
  aiEnabled: boolean;
  /** Skor dari AI (jika diaktifkan), 0-100 */
  aiScore?: number;
  /** Analisis AI per kalimat (jika diaktifkan) */
  aiAnalysis?: {
    grammarScore: number;
    toneScore: number;
    impactScore: number;
    issues: { text: string; suggestion: string; reason: string }[];
    hiringImpression: string;
    suggestions: string[];
  };
  /** Metadata: word count, character count, waktu scoring */
  meta: {
    wordCount: number;
    characterCount: number;
    scoringDurationMs: number;
    version: string;
  };
  /** Pesan keseluruhan (1-2 kalimat, untuk headline di UI) */
  headline: string;
}

export interface ScoringInput {
  /** Plain text CV (sudah di-parse dari PDF/DOCX atau paste langsung) */
  text: string;
  /** Apakah user mengaktifkan AI analysis (opt-in) */
  aiEnabled?: boolean;
  /** Job description (opsional, untuk AI matching di Fase 2) */
  jobDescription?: string;
}
