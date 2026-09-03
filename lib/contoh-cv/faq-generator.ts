/**
 * FAQ Generator untuk /contoh-cv/[slug]
 *
 * Tujuan: menghasilkan 3 FAQ unik per slug tanpa harus tulis manual 40x.
 *
 * Strategi:
 * 1. Keyword dari slug/judul → cocokkan dengan INDUSTRY_RULES (Dokter, IT, dll)
 * 2. Kalau ga ada match → pakai GENERIC_TEMPLATES dengan variasinya
 * 3. Hasil: 3 FAQ dengan question + answer yang BERBEDA per industri
 *
 * FAQ untuk 11 slug "not indexed" (dari GSC Coverage) akan di-override manual
 * via field `cv.faqs` di data.ts / data-batch-30.ts.
 *
 * CATATAN PENTING:
 * - Generator ini menghasilkan teks dalam bahasa Indonesia, natural.
 * - Setiap FAQ punya question unik + answer 2-4 kalimat.
 * - Jawaban JANGAN pakai placeholder seperti "{industri}" — harus sudah ter-resolve.
 */

import type { ContohCV } from "./data";

interface FAQ {
  question: string;
  answer: string;
}

/** Rules spesifik industri: 3 FAQ per industri */
const INDUSTRY_RULES: Record<string, FAQ[]> = {
  // ===== KESEHATAN =====
  dokter: [
    {
      question: "Apakah CV dokter perlu cantumkan STR dan SIP?",
      answer:
        "Ya, sangat disarankan. STR (Surat Tanda Registrasi) wajib dicantumkan di bagian paling atas, sebelum pengalaman kerja. Untuk dokter yang sudah punya SIP, cantumkan nomor dan masa berlakunya. Recruiter RS dan klinik biasanya filter pelamar berdasarkan status STR aktif — kalau tidak ada di CV, lamaran langsung lewat.",
    },
    {
      question: "Pengalaman apa yang paling dicari recruiter untuk dokter?",
      answer:
        "Pengalaman klinik (co-assistant, internship, residensi) lebih diutamakan daripada pengalaman non-medis. Cantumkan nama RS, departemen, dan durasi dengan jelas. Kalau punya publikasi jurnal atau pengalaman riset, tambahkan di section terpisah. Pengalaman volunteer medis (bakti sosial, bencana) juga nilai plus.",
    },
    {
      question: "Bagaimana menulis spesialisasi di CV dokter?",
      answer:
        "Cantumkan spesialisasi di header, tepat di bawah nama. Contoh: 'dr. Nama Lengkap, Sp.PD' (spesialis penyakit dalam). Kalau sedang PPDS atau fellowship, tulis statusnya: 'Dokter Umum — PPDS Anestesi (On Progress)'. Jangan tulis 'Sp.PD' kalau belum lulus, cukup 'Dokter Umum' dulu.",
    },
  ],
  perawat: [
    {
      question: "STR perawat wajib dicantumkan di CV?",
      answer:
        "Wajib, sama seperti dokter. Cantumkan nomor STR, masa berlaku, dan jenjang (D3/S1 Ners). Recruiter RS dan klinik selalu cek status STR aktif. Kalau STR baru diurus, tulis 'STR dalam proses' supaya recruiter tau kamu serius tapi belum keluar nomor resminya.",
    },
    {
      question: "Skill apa yang perlu ditulis di CV perawat?",
      answer:
        "Skill klinis wajib: tindakan medis (injeksi, infus, NGT, kateter, EKG), penggunaan alat medis, dokumentasi asuhan keperawatan. Tambahkan juga soft skill: komunikasi dengan keluarga pasien, kemampuan kerja shift, dan penanganan emergency. Cantumkan pengalaman di unit spesifik (ICU, IGD, NICU, dll) supaya recruiter tau kecocokanmu.",
    },
    {
      question: "Apakah pengalaman magang di RS cukup untuk CV perawat fresh graduate?",
      answer:
        "Cukup, tapi perlu ditulis detail. Cantumkan RS, departemen, durasi magang, dan apa yang kamu lakukan. Jangan cuma tulis 'Magang di RS X' — tambahkan 'Melakukan pengkajian awal pasien, dokumentasi asuhan, dan pendampingan visite dokter'. Itu menunjukkan kamu paham workflow klinik.",
    },
  ],
  bidan: [
    {
      question: "STR Bidan wajib dicantumkan di CV?",
      answer:
        "Wajib, sama seperti perawat dan dokter. Cantumkan nomor STR, masa berlaku, dan pendidikan (D3 Kebidanan atau D4/S1 Kebidanan). Klinik bersalin dan puskesmas selalu verifikasi STR aktif ke PDGI atau PPNI. Tanpa STR, lamaran langsung gugur di tahap administrasi.",
    },
    {
      question: "Pengalaman apa yang harus ditonjolkan di CV bidan?",
      answer:
        "Pengalaman persalinan (normal, penyulit, tindakan), ANC (Ante Natal Care), PNC (Post Natal Care), dan KB. Kalau punya pengalaman di klinik bersalin, BPM, atau puskesmas, cantumkan spesifik. Pengalaman menangani ibu hamil risiko tinggi sangat dicari recruiter.",
    },
    {
      question: "Apakah bidan fresh graduate perlu tulis pengalaman praktik klinik?",
      answer:
        "Sangat perlu. Praktik klinik saat pendidikan (rumah sakit pendidikan, BPM preceptor) adalah pengalaman kerja nyata. Tulis RS atau klinik, durasi, dan jumlah persalinan yang kamu tangani (kalau ada data). Ini membedakan kamu dari kandidat lain yang cuma menulis nama kampus.",
    },
  ],
  apoteker: [
    {
      question: "STRA apoteker wajib dicantumkan di CV?",
      answer:
        "Wajib, cantumkan nomor STRA dan masa berlakunya di bagian paling atas CV. Industri farmasi, apotek, dan RS selalu cek STRA aktif ke PDPAI. Calon apoteker yang STRA-nya masih proses tetap boleh melamar, tapi tulis 'STRA dalam proses pengurusan' supaya jelas.",
    },
    {
      question: "Skill apa yang perlu ditulis di CV apoteker?",
      answer:
        "Skill wajib: dispensing, compounding, pelayanan resep, drug information, manajemen obat. Tambahkan: penguasaan software apotek (e-prescription, SIM RS), bahasa Inggris untuk baca jurnal, dan pemahaman regulasi BPOM. Pengalaman KKN atau praktik di apotek komunitas sangat bernilai.",
    },
    {
      question: "Apakah perlu pisahkan pengalaman RS dan industri farmasi di CV apoteker?",
      answer:
        "Sebaiknya pisahkan, karena skill dan konteksnya beda. Pengalaman RS fokus ke dispensing dan clinical pharmacy, sedangkan industri farmasi ke QA/QC, regulatory, atau produksi. Kalau campur, recruiter bingung apakah kamu lebih cocok untuk klinik atau untuk pabrik farmasi.",
    },
  ],

  // ===== IT & DATA =====
  programmer: [
    {
      question: "Apakah CV programmer perlu cantumkan link GitHub?",
      answer:
        "Sangat disarankan. Link GitHub atau portfolio online (GitLab, Bitbucket) di bagian header CV. Recruiter tech akan cek repository kamu — kualitas kode, kontribusi open source, dan bahasa pemrograman yang dikuasai. Kalau repo private, tulis 'Available upon request' supaya tetap ada profesionalitas.",
    },
    {
      question: "Skill teknis apa yang harus ditulis di CV programmer fresh graduate?",
      answer:
        "Tulis bahasa pemrograman, framework, dan database yang kamu kuasai (bukan cuma 'Java' tapi 'Java Spring Boot, PostgreSQL, Redis'). Tambahkan juga tools: Git, Docker, CI/CD. Jangan tulis skill yang belum pernah kamu pakai di project — recruiter akan tanya detail di interview.",
    },
    {
      question: "Bagaimana cara menulis project pribadi di CV programmer?",
      answer:
        "Cantumkan 2-3 project terbaik dengan deskripsi singkat: nama project, tech stack, dan problem yang diselesaikan. Tambahkan link demo atau repository. Jangan cuma tulis 'Web App' — lebih baik 'Web App untuk tracking inventori gudang, React + Node.js, 500+ users aktif'. Spesifik lebih kuat dari generic.",
    },
  ],
  "data-analyst": [
    {
      question: "Tool apa yang wajib ditulis di CV data analyst?",
      answer:
        "Wajib: SQL, Python (pandas/numpy), dan tools visualisasi (Tableau, Power BI, atau Looker Studio). Tambahkan: Excel/Google Sheets advanced, bahasa R (kalau dipakai), dan tools big data (Spark, BigQuery) kalau ada. Cantumkan juga level kemahiran (basic/intermediate/advanced) supaya realistis.",
    },
    {
      question: "Apakah portfolio project penting di CV data analyst?",
      answer:
        "Penting, apalagi untuk fresh graduate. Cantumkan 2-3 project analisis data (public dataset, Kaggle, atau studi kasus) dengan link ke GitHub atau Tableau Public. Recruiter lebih tertarik ke project yang menunjukkan business impact ('mengurangi churn 12% lewat segmentasi') daripada cuma tool yang dikuasai.",
    },
    {
      question: "Bagaimana menulis pengalaman magang data analyst yang singkat?",
      answer:
        "Fokus ke impact dan angka, bukan deskripsi tugas. Contoh: 'Menganalisis data penjualan 10.000+ transaksi, menemukan pola churn customer di Q3 yang digunakan untuk strategi retensi'. Lebih baik daripada 'Membuat laporan penjualan mingguan dan dashboard monitoring'.",
    },
  ],
  "digital-marketing": [
    {
      question: "Metric apa yang harus ditulis di CV digital marketing?",
      answer:
        "Tulis angka spesifik: ROAS (Return on Ad Spend), CTR, conversion rate, CPL (Cost per Lead), dan revenue impact. Contoh: 'Meningkatkan ROAS 3.2x menjadi 5.8x lewat optimasi Meta Ads'. Recruiter marketing sangat suka angka karena menunjukkan kamu paham business outcome, bukan cuma 'jalanin iklan'.",
    },
    {
      question: "Platform apa yang perlu dicantumkan di CV digital marketing?",
      answer:
        "Cantumkan platform yang kamu kuasai beserta level pengalaman. Wajib: Google Ads, Meta Ads (Facebook & Instagram), dan SEO/SEM. Tambahkan: TikTok Ads, LinkedIn Ads, email marketing tools (Mailchimp, Brevo), dan analytics (GA4, Meta Pixel). Bedakan paid, organic, dan owned media.",
    },
    {
      question: "Apakah perlu tulis sertifikasi Google atau Meta di CV?",
      answer:
        "Ya, cantumkan sertifikasi resmi seperti Google Ads Certification, Meta Blueprint, atau HubSpot. Letakkan di section terpisah 'Sertifikasi' atau 'Certifications'. Masa berlaku juga perlu ditulis supaya recruiter tau sertifikasi masih aktif. Ini pembeda kuat dari kandidat yang cuma klaim pengalaman tanpa bukti.",
    },
  ],
  designer: [
    {
      question: "CV designer grafis perlu cantumkan link portfolio?",
      answer:
        "Wajib. Letakkan link portfolio online (Behance, Dribbble, website pribadi) di header CV, tepat di bawah email. Recruiter designer akan buka portfolio sebelum baca pengalaman kerja. Kalau portfolio masih kosong, build 3-5 project desain (bisa redesign produk yang ada) sebelum apply.",
    },
    {
      question: "Software apa yang harus ditulis di CV designer?",
      answer:
        "Tulis software yang kamu kuasai: Adobe Creative Suite (Photoshop, Illustrator, InDesign), Figma, Sketch, atau Canva (kalau relevan). Tambahkan juga: motion graphics (After Effects, Premiere), 3D (Blender, Cinema 4D), atau web design (HTML/CSS dasar). Tapi jangan tulis software yang cuma kamu buka sekali.",
    },
    {
      question: "Apakah perlu tampilkan hasil desain di CV PDF?",
      answer:
        "Tidak disarankan. CV PDF untuk designer biasanya plain text dengan link portfolio. Kalau perlu visual, sisipkan 1-2 thumbnail terbaik di section 'Featured Work' dengan link ke portfolio lengkap. Jangan embed banyak gambar karena bikin file berat dan ATS susah baca.",
    },
  ],
  "ui-ux": [
    {
      question: "Bedanya CV UI/UX designer dengan designer grafis?",
      answer:
        "UI/UX fokus ke product design (web/app), butuh skill riset, wireframing, prototyping, dan usability testing. Designer grafis fokus ke visual communication (branding, ilustrasi, layout). Tulis di CV: 'UI/UX Designer' atau 'Product Designer' untuk UI/UX, dan 'Graphic Designer' untuk visual murni.",
    },
    {
      question: "Case study penting di CV UI/UX designer?",
      answer:
        "Sangat penting. Cantumkan 2-3 case study lengkap: problem, riset, ide solusi, dan hasil. Format singkat di CV dengan link ke portfolio detail. Recruiter UI/UX lebih tertarik ke proses berpikir ('mengapa pilih ini', 'user testing dengan 5 orang') daripada hasil akhir visual saja.",
    },
  ],

  // ===== FRESH GRADUATE =====
  fresh: [
    {
      question: "Fresh graduate tanpa pengalaman kerja, mau tulis apa di CV?",
      answer:
        "Tonjolkan: pengalaman organisasi, kepanitiaan, project akademik, magang, dan volunteer. Tulis dengan metode STAR (Situation, Task, Action, Result) — fokus ke impact dan angka, bukan deskripsi tugas. Contoh: 'Ketua panitia seminar nasional 2023 dengan 400+ peserta' lebih kuat dari 'Mengikuti kepanitiaan seminar'.",
    },
    {
      question: "IPK rendah, perlu cantumkan di CV?",
      answer:
        "Tergantung. Kalau IPK di atas 3.0, cantumkan. Di bawah 3.0, lebih baik tidak cantumkan dan tonjolkan skill atau project lain. Recruiter fresh graduate biasanya lebih lihat pengalaman organisasi, magang, dan skill teknis daripada IPK. Kecuali apply ke posisi yang spesifik butuh IPK tinggi (konsultan, bank).",
    },
    {
      question: "Berapa panjang CV yang ideal untuk fresh graduate?",
      answer:
        "Maksimal 1 halaman. Fresh graduate belum punya banyak pengalaman, jadi CV terlalu panjang malah terlihat 'mengisi'. Prioritaskan: header dengan kontak, ringkasan singkat (3 baris), pendidikan, pengalaman organisasi/magang, skill, dan sertifikasi. Hindari section yang kosong.",
    },
  ],

  // ===== BANK & FINANCE =====
  bank: [
    {
      question: "CV untuk apply kerja di bank, perlu format khusus?",
      answer:
        "Format standar ATS-friendly sudah cukup. Bank Indonesia dan bank besar (BCA, Mandiri, BRI) biasanya pakai sistem ATS untuk screening, jadi format 1 kolom, font standar, dan heading jelas itu wajib. Yang membedakan: tambahkan pengalaman magang di bank atau finance, dan cantumkan sertifikasi OJK/riset kalau ada.",
    },
    {
      question: "Pengalaman organisasi apa yang relevan untuk apply bank?",
      answer:
        "Organisasi yang menunjukkan leadership dan analytical skill: BEM, himpunan jurusan ekonomi/akuntansi, komunitas investasi, atau panitia acara skala besar. Kegiatan finance club, tax volunteer, atau event terkait perbankan juga nilai plus. Recruiter bank cari kandidat dengan kemampuan kerja tim dan komunikasi yang baik.",
    },
  ],

  // ===== ENGLISH / INTERNATIONAL =====
  english: [
    {
      question: "Apakah CV bahasa Inggris berbeda formatnya dengan bahasa Indonesia?",
      answer:
        "Secara struktur mirip, tapi ada perbedaan: tidak perlu foto, no tanggal lahir, no jenis kelamin, dan no status pernikahan. Recruiter global fokus ke experience, skills, dan impact. Gunakan strong action verbs ('Spearheaded', 'Optimized') dan hindari kalimat pasif. Cantumkan juga level English proficiency (TOEFL/IELTS score) kalau ada.",
    },
    {
      question: "Apakah perlu cantumkan foto di CV bahasa Inggris?",
      answer:
        "Tidak. Di banyak negara (US, UK, Australia), foto di CV malah bisa jadi alasan diskriminasi. Kecuali apply ke negara yang biasa pakai foto (kebanyakan Asia, beberapa negara Eropa Timur), lebih baik skip foto. Cantumkan nama, email, LinkedIn, dan phone number di header.",
    },
  ],
};

/** Generic templates untuk industri yang ga ada di INDUSTRY_RULES */
function generateGenericFAQs(cv: ContohCV): FAQ[] {
  const cleanTitle = cv.judul.replace(/^Contoh CV\s+/i, "").trim();
  const isFresh = /fresh|graduate|magang|sma|d3|s1|baru lulus/i.test(cv.slug);

  const faqs: FAQ[] = [
    {
      question: `Apakah contoh CV ${cleanTitle} ini bisa langsung dipakai?`,
      answer: `Bisa, tapi sebaiknya kamu sesuaikan dengan pengalaman dan data dirimu sendiri. Contoh ini adalah template yang bisa kamu adaptasi — ganti nama, email, telepon, dan pengalaman kerja dengan data pribadimu. Struktur dan formatnya sudah teroptimasi untuk ATS (Applicant Tracking System) dan HRD Indonesia.`,
    },
    {
      question: `Format file apa yang sebaiknya dipakai untuk kirim CV ${cleanTitle.toLowerCase()}?`,
      answer:
        "Format yang paling aman dan ATS-friendly adalah PDF. Microsoft Word (.docx) juga bisa, tapi PDF lebih konsisten — tampilan tidak berubah di perangkat manapun dan ATS modern sudah bisa membaca PDF dengan baik. Hindari format gambar (JPG/PNG) karena ATS tidak bisa membaca teksnya.",
    },
  ];

  // Tambah FAQ ke-3 yang beda untuk fresh grad vs experienced
  if (isFresh) {
    faqs.push({
      question: `Saya fresh graduate tanpa pengalaman relevan, bagaimana cara adaptasi CV ${cleanTitle.toLowerCase()} ini?`,
      answer: `Fokus ke pengalaman non-kerja yang relevan: organisasi kampus, kepanitiaan, project pribadi, magang, atau volunteer. Tulis pakai metode STAR (Situation, Task, Action, Result) dan tambahkan angka kalau bisa. Recruiter tau fresh graduate belum punya pengalaman kerja formal, jadi yang dilihat adalah potensi dan inisiatifmu.`,
    });
  } else {
    faqs.push({
      question: `Berapa tahun pengalaman yang ideal untuk posisi ${cleanTitle.toLowerCase()}?`,
      answer:
        "Tergantung level posisi. Entry-level biasanya butuh 0-2 tahun pengalaman, mid-level 3-5 tahun, dan senior 5+ tahun. Cantumkan di CV pengalaman yang relevan dengan posisi yang dilamar, bukan semua pengalaman kerja. Kalau ada gap year atau transisi karir, jelaskan singkat di summary atau cover letter.",
    });
  }

  return faqs;
}

/**
 * Generate FAQ untuk sebuah entry ContohCV.
 *
 * Logic:
 * 1. Kalau cv.faqs sudah ada (manual override), pakai itu.
 * 2. Kalau ga ada, cocokkan slug dengan INDUSTRY_RULES keywords.
 * 3. Kalau ga ada match, pakai GENERIC_TEMPLATES dengan variasi.
 *
 * @returns 3 FAQ unik per slug (atau sesuai override)
 */
export function generateFAQs(cv: ContohCV): FAQ[] {
  // Override: kalau ada manual faqs, pakai itu
  if (cv.faqs && cv.faqs.length > 0) {
    return cv.faqs;
  }

  const slug = cv.slug.toLowerCase();
  const title = cv.judul.toLowerCase();

  // Cek INDUSTRY_RULES keywords
  for (const [keyword, faqs] of Object.entries(INDUSTRY_RULES)) {
    if (slug.includes(keyword) || title.includes(keyword)) {
      return faqs;
    }
  }

  // Fallback: generic templates dengan variasi
  return generateGenericFAQs(cv);
}
