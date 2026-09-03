/**
 * Standalone test untuk ATS scorer.
 * Run: node --experimental-strip-types scripts/test-ats-scorer.mts
 *        atau: npx tsx scripts/test-ats-scorer.ts
 */

import { scoreAts } from "../lib/ats/scorer";

// ===== 3 sample CV =====

const CV_JELEK = `CV
nama: budi
ttl: 2000
email:budi@xxx
ngalamar krja di warung makan 2 bln
bantu2 masak
sklh sma
bisa msak
bhs ingris sdkit`;

const CV_SEDANG = `Andi Pratama
Email: andi.pratama@gmail.com
Telepon: 0812-1234-5678
Kota: Jakarta

Ringkasan
Fresh graduate S1 Sistem Informasi dengan pengalaman magang 3 bulan di startup fintech.

Pengalaman Kerja
- Magang Web Developer di Startup XYZ, Jakarta (Juni 2024 - Agustus 2024)
  * Membuat landing page dengan React dan Tailwind
  * Bantu tim backend untuk setup API
- Staff Gudang di Toko ABC (Januari 2023 - Mei 2023)
  * Input data barang
  * Bantu tata letak gudang

Pendidikan
- Universitas Indonesia, S1 Sistem Informasi (2020-2024)

Keahlian
- JavaScript, React, Node.js
- HTML, CSS
- Git
- Bahasa Inggris (pasif)`;

const CV_BAGUS = `Annisa Rahmadhani — Senior Data Analyst
Email: annisa.rahmadhani@email.com | LinkedIn: linkedin.com/in/annisa-rahmadhani
Telepon: 0813-7788-9900 | Kota: Jakarta Selatan

Ringkasan
Senior data analyst 4 tahun di e-commerce & fintech, fokus business intelligence & growth analytics. Track record: hemat Rp 1.2M/tahun lewat analisis churn, naikkan retention 8% lewat program re-engagement.

Pengalaman Kerja
- Data Analyst di PT E-commerce Indonesia (April 2024 - Sekarang)
  * Membangun dashboard Looker Studio untuk tim marketing (15 metrics, auto-refresh harian) — efisiensi waktu 8 jam/minggu
  * Melakukan cohort analysis customer retention — mengidentifikasi 12% drop di M3, propose program re-engagement yang naikkan retention 8%
  * Mengotomatisasi 5 laporan mingguan pakai Python + Airflow — hemat 20 jam kerja tim marketing per minggu
  * Berkolaborasi dengan product team untuk 12 A/B testing, meningkatkan konversi 18% pada top winner
- Junior Data Analyst di Startup SaaS HR (Juli 2022 - Maret 2024)
  * Menulis query SQL untuk analisis churn pada 50.000+ user — identifikasi 3 root cause utama
  * Membangun dashboard weekly active user (WAU) di Metabase
  * Melatih 2 marketing intern soal SQL fundamental (50 jam mentoring)

Pendidikan
- Institut Teknologi Bandung, S1 Statistika, IPK 3.78/4.00 (2020-2024)

Keahlian
- SQL (PostgreSQL — advanced, BigQuery — intermediate)
- Python (pandas, matplotlib, scikit-learn) — intermediate
- Looker Studio (advanced), Tableau (intermediate)
- Google Analytics 4
- A/B Testing & Statistika Inferensial
- Bahasa Inggris (TOEFL iBT 110)

Sertifikasi
- Google Data Analytics Professional Certificate (Coursera, 2024)
- SQL for Data Analysis (UC Davis, 2023)

Proyek Penting
- Analisis Churn 2024: Python + SQL + Looker Studio, impact: retention +8%`;

// ===== Test runner =====

async function test(name: string, cv: string, expectedMin: number, expectedMax: number) {
  const start = Date.now();
  const result = await scoreAts({ text: cv });
  const elapsed = Date.now() - start;

  const passed = result.totalScore >= expectedMin && result.totalScore <= expectedMax;
  const status = passed ? "✅ PASS" : "❌ FAIL";

  console.log(`\n${status}  ${name}`);
  console.log(`   Total Score: ${result.totalScore}/100 (${result.status})`);
  console.log(`   Expected: ${expectedMin}-${expectedMax}`);
  console.log(`   Time: ${elapsed}ms | Words: ${result.meta.wordCount}`);
  console.log(`   Sub-scores:`);
  for (const s of result.subScores) {
    console.log(`     - ${s.label.padEnd(25)} ${String(s.score).padStart(3)}/100  (${s.status})`);
  }
  console.log(`   Headline: ${result.headline}`);
  return passed;
}

async function main() {
  console.log("=== ATS Scorer Test Suite ===\n");
  const results: boolean[] = [];

  results.push(await test("CV JELEK (should be low: 0-45)", CV_JELEK, 0, 45));
  results.push(await test("CV SEDANG (should be mid: 45-75)", CV_SEDANG, 45, 75));
  results.push(await test("CV BAGUS (should be high: 70-95)", CV_BAGUS, 70, 95));

  const passed = results.filter(Boolean).length;
  const total = results.length;
  console.log(`\n=== Result: ${passed}/${total} passed ===`);

  if (passed === total) {
    console.log("🎉 All tests passed!");
    process.exit(0);
  } else {
    console.log("⚠️  Some tests failed. Adjust scoring weights/thresholds.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(2);
});
