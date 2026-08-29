import type { ContohCV } from "./data";

/**
 * 30 entry contoh CV tambahan (batch #2, 2026-08-28).
 * Strategi: long-tail spesifik per industri/role, low-competition high-relevance.
 * Tulisan natural Indonesia, bukan AI-slop template.
 *
 * Personae sengaja divariasikan: kota, usia, jenis kelamin, pengalaman.
 * Data 100% fiktif — tidak ada nama/email asli orang Indonesia.
 */
export const CONTOH_CV_BATCH_30: ContohCV[] = [
  // ===== Kategori: IT & Tech (5 entry) =====
  {
    slug: "programmer-fresh-graduate",
    judul: "Contoh CV Programmer Fresh Graduate yang Lolos HRD Tech 2026",
    h1: "Contoh CV Programmer Fresh Graduate — Lolos Screening Tech Indonesia",
    metaDescription:
      "Contoh CV programmer fresh graduate yang dipakai hire programmer Indonesia. Lengkap dengan cara menulis project pribadi, magang, dan stack teknologi yang relevan.",
    kategori: "IT & Tech",
    relatedSlugs: ["fresh-graduate-s1", "magang", "data-analyst"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV programmer fresh graduate yang menarik HRD tech Indonesia itu bukan yang paling panjang — tapi yang paling relevan. Kalau kamu melamar backend, jangan taruh design portfolio di halaman pertama.",
      "Yang HRD tech cari: stack teknologi yang dikuasai, project nyata (bisa project pribadi/magang), link GitHub, dan kemampuan menjelaskan masalah yang kamu selesaikan dengan kode.",
      "Contoh di bawah ini untuk pelamar backend developer full-time, tapi pattern-nya bisa kamu pakai untuk frontend, mobile, atau DevOps.",
    ],
    tips: [
      {
        judul: "Tulis stack dengan level (dasar/menengah/mahir)",
        isi:
          "'Node.js (mahir), React (menengah), PostgreSQL (dasar)' — itu lebih jujur dan mudah di-screen daripada 'menguasai JavaScript, React, Node, Vue, Angular, dll'.",
      },
      {
        judul: "Sertakan link GitHub & portfolio",
        isi:
          "HRD tech Indonesia akan cek GitHub kamu. Pastikan repo utama rapi (README, struktur folder, commit history). Kalau malu, ikut kontribusi open source dulu.",
      },
      {
        judul: "Project pribadi tetap masuk pengalaman",
        isi:
          "Bikin REST API untuk to-do list = boleh masuk 'Side Project: Todo API dengan Express & PostgreSQL'. Lebih baik dari kosong.",
      },
      {
        judul: "Magang singkat tetap punya nilai",
        isi:
          "Magang 2 bulan di startup? Tulis sebagai 'Frontend Developer Intern — 2 bulan' dengan bullet point apa yang kamu kontribusi. Jangan digabung jadi 'freelance web developer'.",
      },
      {
        judul: "Sertifikasi hanya yang relevan",
        isi:
          "AWS Certified Cloud Practitioner, Google IT Automation, Dicoding — yang begini nilainya. Hindari 'Sertifikasi Microsoft Office' untuk posisi tech.",
      },
    ],
    cv: {
      nama: "Rizky Ananda Pratama",
      jabatan: "Backend Developer — Fresh Graduate",
      kota: "Yogyakarta, DIY",
      email: "rizky.ananda@email.com",
      telepon: "0857-1122-3344",
      ringkasan:
        "Backend developer fresh graduate Universitas Gadjah Mada, fokus Node.js & PostgreSQL. Pernah magang 3 bulan di startup fintech Yogyakarta, build payment notification service.",
      pengalaman: [
        {
          posisi: "Backend Developer Intern",
          perusahaan: "Fintech Startup (Yogyakarta)",
          mulai: "Feb 2026",
          selesai: "Apr 2026",
          deskripsi: [
            "Build notification service pakai Node.js & BullMQ, handle 5.000 notifikasi/hari",
            "Refactor query PostgreSQL, turunkan response time dari 800ms ke 150ms",
            "Tulis unit test pakai Jest, coverage 70% untuk module payment",
            "Code review dengan 3 senior engineer, belajar conventional commits",
          ],
        },
        {
          posisi: "Open Source Contributor",
          perusahaan: "Express.js (GitHub)",
          mulai: "Jan 2026",
          selesai: "Sekarang",
          deskripsi: [
            "Fix bug #5231: memory leak di middleware compression",
            "PR merged ke release 4.19.2",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Gadjah Mada",
          jurusan: "S1 Ilmu Komputer",
          mulai: "2022",
          selesai: "2026",
        },
      ],
      skill: [
        "Node.js (mahir)",
        "TypeScript (menengah)",
        "PostgreSQL (menengah)",
        "Redis (dasar)",
        "Docker (dasar)",
        "Jest (menengah)",
        "Git (mahir)",
        "REST API",
      ],
      tambahan: [
        {
          judul: "Project Pribadi",
          isi: "API Shortener (Node.js + Redis + PostgreSQL) — 120 stars di GitHub, deployed di Railway",
        },
        {
          judul: "Sertifikasi",
          isi: "Dicoding — Backend Developer Expert (2025)",
        },
      ],
    },
  },
  {
    slug: "data-analyst",
    judul: "Contoh CV Data Analyst yang Dilirik HRD 2026 (+ Formula SQL & Python)",
    h1: "Contoh CV Data Analyst — Cara Tulis Pengalaman & Tools yang HRD Cari",
    metaDescription:
      "Contoh CV data analyst yang dipakai hire di Indonesia. Lengkap dengan cara menulis project dashboard, query SQL, dan skill Python/SQL/Tableau yang relevan.",
    kategori: "IT & Tech",
    relatedSlugs: ["programmer-fresh-graduate", "fresh-graduate-s1", "accounting"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV data analyst itu harus 'bicara angka'. Kalau kamu cuma tulis 'membuat laporan', HRD langsung skip — mereka ingin tahu: laporan apa, untuk siapa, dampaknya apa.",
      "Yang membedakan CV data analyst yang dilirik vs yang tidak: portfolio dashboard (Looker Studio / Tableau), query SQL yang ditulis, dan business impact dari insight yang ditemukan.",
    ],
    tips: [
      {
        judul: "Tulis SQL dengan level spesifik",
        isi:
          "Bukan 'SQL' tapi 'SQL (PostgreSQL — advanced, BigQuery — intermediate)'. HRD data analyst bisa langsung lihat cocok atau tidak.",
      },
      {
        judul: "Cantumkan link dashboard publik",
        isi:
          "Punya portfolio dashboard Looker Studio / Tableau Public? Taruh link. Lebih kuat dari sertifikat.",
      },
      {
        judul: "Insight > tools",
        isi:
          "'Menemukan bahwa 23% customer churn di Q1 disebabkan payment failure' — itu yang bikin HRD pause. Bukan 'menguasai Looker Studio'.",
      },
      {
        judul: "Project pribadi tetap valid",
        isi:
          "Analisis dataset COVID Indonesia, bikin dashboard di Looker, publish di LinkedIn = boleh masuk CV kalau ngga ada pengalaman kerja.",
      },
    ],
    cv: {
      nama: "Annisa Rahmadhani",
      jabatan: "Data Analyst — 2 Tahun Pengalaman",
      kota: "Jakarta Selatan, DKI Jakarta",
      email: "annisa.rahmadhani@email.com",
      telepon: "0813-7788-9900",
      ringkasan:
        "Data analyst 2 tahun di e-commerce & SaaS, fokus business intelligence & growth analytics. Pernah save 1.2 M/bulan lewat cohort analysis customer retention.",
      pengalaman: [
        {
          posisi: "Data Analyst",
          perusahaan: "PT. E-commerce Indonesia (Jakarta)",
          mulai: "Apr 2025",
          selesai: "Sekarang",
          deskripsi: [
            "Bangun dashboard Looker Studio untuk tim marketing (15 metrics, auto-refresh harian)",
            "Cohort analysis customer retention, identify 12% drop di M3, propose program re-engagement yang naikkan retention 8%",
            "Otomatisasi 5 laporan mingguan pakai Python + Airflow, hemat 12 jam kerja tim marketing per minggu",
            "Kolaborasi dengan product team untuk A/B testing, analisis hasil pakai t-test & Bayesian",
          ],
        },
        {
          posisi: "Junior Data Analyst",
          perusahaan: "Startup SaaS HR (Bandung)",
          mulai: "Jul 2024",
          selesai: "Mar 2025",
          deskripsi: [
            "Query SQL untuk analisis churn, identifikasi 3 root cause utama",
            "Bangun dashboard weekly active user (WAU) di Metabase",
            "Training 2 marketing intern soal SQL dasar",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Institut Teknologi Bandung",
          jurusan: "S1 Statistika",
          mulai: "2020",
          selesai: "2024",
        },
      ],
      skill: [
        "SQL (PostgreSQL — advanced, BigQuery — intermediate)",
        "Python (pandas, matplotlib, scikit-learn)",
        "Looker Studio (advanced)",
        "Tableau (intermediate)",
        "Google Analytics 4",
        "A/B Testing",
        "Excel/Google Sheets (advanced)",
      ],
      tambahan: [
        {
          judul: "Portfolio",
          isi: "lookerstudio.google.com/reporting/annisa-rahmadhani",
        },
        {
          judul: "Sertifikasi",
          isi: "Google Data Analytics Professional Certificate (Coursera, 2024)",
        },
      ],
    },
  },
  {
    slug: "designer-grafis",
    judul: "Contoh CV Designer Grafis yang Hire Studio Indonesia Cari 2026",
    h1: "Contoh CV Designer Grafis — Portofolio > Sertifikat untuk HRD Kreatif",
    metaDescription:
      "Contoh CV designer grafis yang dipakai hire di studio Indonesia. Lengkap dengan cara taruh portofolio, software, dan pengalaman freelance yang relevan.",
    kategori: "IT & Tech",
    relatedSlugs: ["programmer-fresh-graduate", "marketing", "magang"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Designer grafis itu unik — CV-nya hampir jadi 'lampiran' dari portofolio. HRD studio Indonesia biasanya scan portofolio dulu, baru baca CV. Tapi CV tetap penting buat screening awal.",
      "Yang perlu: link portfolio online (Behance/website pribadi), software yang dikuasai, dan pengalaman proyek — entah klien, freelance, atau tugas kuliah.",
    ],
    tips: [
      {
        judul: "Portfolio link wajib di paling atas",
        isi:
          "Jangan tulis ringkasan panjang — langsung taruh link Behance/Dribbble/website di bagian kontak. HRD designer biasanya 80% putuskan dari portfolio.",
      },
      {
        judul: "Software dengan level penggunaan",
        isi:
          "Figma (mahir), Adobe Illustrator (mahir), After Effects (dasar) — bukan cuma daftar tool, tapi level.",
      },
      {
        judul: "Freelance tetap dihitung",
        isi:
          "10 project freelance desainer logo untuk UMKM = boleh masuk. Tulis 'Freelance Brand Designer — 15 klien UMKM (2023-2025)'.",
      },
      {
        judul: "Tugas kuliah boleh di-skip",
        isi:
          "Kecuali karyanya benar-benar bagus, tugas kuliah jarang nge-hire. Lebih baik fokus ke project nyata (kompetisi, freelance, magang).",
      },
    ],
    cv: {
      nama: "Bagas Wicaksono",
      jabatan: "Graphic Designer — 3 Tahun Pengalaman",
      kota: "Surabaya, Jawa Timur",
      email: "bagas.wicaksono@email.com",
      telepon: "0812-3344-5566",
      ringkasan:
        "Graphic designer 3 tahun di agency & freelance, fokus brand identity & social media design. Pernah handle branding 12 UMKM lokal di Jawa Timur.",
      pengalaman: [
        {
          posisi: "Senior Graphic Designer",
          perusahaan: "Kreasi Studio (Surabaya)",
          mulai: "Mar 2025",
          selesai: "Sekarang",
          deskripsi: [
            "Lead desainer untuk 5 klien F&B (brand identity, packaging, social media template)",
            "Bekerja sama dengan copywriter & strategist, deliver rata-rata 30 desain/minggu",
            "Mentoring 2 junior designer, buat style guide internal studio",
          ],
        },
        {
          posisi: "Freelance Brand Designer",
          perusahaan: "Self-employed",
          mulai: "2023",
          selesai: "Sekarang",
          deskripsi: [
            "12 UMKM klien (kopi, fashion, jasa) — logo, business card, social media template",
            "Average rating 4.9/5 di Sribulancer",
          ],
        },
        {
          posisi: "Junior Designer",
          perusahaan: "Digital Agency (Malang)",
          mulai: "Aug 2023",
          selesai: "Feb 2025",
          deskripsi: [
            "Desain feed Instagram untuk 4 brand fashion lokal",
            "Ikut handle produksi event materials (banner, name tag, sertifikat)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Ciputra Surabaya",
          jurusan: "S1 Desain Komunikasi Visual",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Figma (advanced)",
        "Adobe Illustrator (advanced)",
        "Adobe Photoshop (advanced)",
        "Adobe InDesign (intermediate)",
        "After Effects (dasar)",
        "Canva Pro",
        "Typography",
      ],
      tambahan: [
        {
          judul: "Portfolio",
          isi: "behance.net/bagaswicaksono + bagaswicaksono.my.id",
        },
        {
          judul: "Penghargaan",
          isi: "Top 10 Design Grafis Tingkat Nasional — Adobe Student Awards 2022",
        },
      ],
    },
  },
  {
    slug: "digital-marketing",
    judul: "Contoh CV Digital Marketing Specialist Berpengalaman 2026",
    h1: "Contoh CV Digital Marketing — Cara Tulis ROAS & Conversion yang Nge-hire",
    metaDescription:
      "Contoh CV digital marketing specialist yang menarik HRD agency & brand. Lengkap dengan cara menulis campaign ROAS, conversion rate, dan tools marketing.",
    kategori: "IT & Tech",
    relatedSlugs: ["marketing", "data-analyst", "designer-grafis"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV digital marketing yang kuat penuh angka — bukan 'mengelola campaign' tapi 'mengelola budget Rp 100 juta dengan ROAS 3.5x selama 6 bulan'.",
      "Yang HRD marketing cari: track record campaign, tools yang dikuasai (Meta Ads, Google Ads, TikTok Ads, GA4), dan kemampuan analisis data. Portfolio campaign juga penting.",
    ],
    tips: [
      {
        judul: "Tiap bullet harus ada angka",
        isi:
          "Reach, CTR, conversion rate, ROAS, CPA, jumlah leads — minimal 1 angka per bullet point. Kalau ngga ada angka, bullet-nya ngga punya nilai.",
      },
      {
        judul: "Tools spesifik, bukan generic",
        isi:
          "'Meta Ads Manager, Google Ads, TikTok Ads, GA4, Mailchimp, Klaviyo' — bukan 'social media tools'.",
      },
      {
        judul: "Industri relevan disebut",
        isi:
          "Pernah handle F&B? Tulis 'F&B industry, 5 brand'. Pernah handle fashion? Tulis 'fashion e-commerce, 8 brand'. Ini bikin kamu stand out.",
      },
      {
        judul: "Sertifikasi Meta/Google wajib",
        isi:
          "Meta Blueprint Certification, Google Ads Certification, TikTok Academy — gratis dan cepat, wajib punya minimal 1.",
      },
    ],
    cv: {
      nama: "Maharani Putri Salsabila",
      jabatan: "Digital Marketing Specialist — 4 Tahun Pengalaman",
      kota: "Jakarta Pusat, DKI Jakarta",
      email: "maharani.putri@email.com",
      telepon: "0811-2233-4455",
      ringkasan:
        "Digital marketing specialist 4 tahun, specialize paid ads (Meta, Google, TikTok). Pernah handle total budget Rp 2.5 M/tahun dengan average ROAS 3.2x untuk 12 brand.",
      pengalaman: [
        {
          posisi: "Performance Marketing Lead",
          perusahaan: "D2C Brand House (Jakarta)",
          mulai: "Sep 2025",
          selesai: "Sekarang",
          deskripsi: [
            "Lead paid ads strategy untuk 4 brand fashion & beauty (total budget Rp 800 juta/bulan)",
            "Average ROAS 3.5x, turunkan CPA 22% lewat creative testing",
            "Setup Meta CAPI, improve event match quality dari 4.2 ke 8.7",
          ],
        },
        {
          posisi: "Digital Marketing Specialist",
          perusahaan: "Tech Startup (Tangerang)",
          mulai: "Mar 2024",
          selesai: "Aug 2025",
          deskripsi: [
            "Kelola Google Ads + Meta Ads, scale dari Rp 50 juta/bulan ke Rp 400 juta/bulan dalam 12 bulan",
            "Implement GA4 + server-side tracking, improve attribution accuracy 40%",
            "Bikin SEO content strategy, organic traffic naik 180% dalam 6 bulan",
          ],
        },
        {
          posisi: "Performance Marketing Executive",
          perusahaan: "Agency (Jakarta)",
          mulai: "Jun 2023",
          selesai: "Feb 2024",
          deskripsi: [
            "Handle 6 klien (F&B, edutech, fashion) — total budget Rp 1.2 M/bulan",
            "Average ROAS 2.8x, ROAS tertinggi 5.1x untuk klien skincare lokal",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Ilmu Komunikasi",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Meta Ads Manager (advanced)",
        "Google Ads (advanced)",
        "TikTok Ads (intermediate)",
        "Google Analytics 4 (advanced)",
        "Meta CAPI",
        "Klaviyo",
        "Mailchimp",
        "Looker Studio",
        "SEO (intermediate)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Meta Blueprint Certified, Google Ads Certified, TikTok Academy Certificate",
        },
      ],
    },
  },
  {
    slug: "ui-ux-designer",
    judul: "Contoh CV UI/UX Designer — Portfolio Case Study 2026",
    h1: "Contoh CV UI/UX Designer — Cara Tulis Pengalaman Design & Riset",
    metaDescription:
      "Contoh CV UI/UX designer yang dipakai hire di Indonesia. Lengkap dengan cara menulis case study, portofolio, dan skill riset + design system.",
    kategori: "IT & Tech",
    relatedSlugs: ["designer-grafis", "programmer-fresh-graduate", "data-analyst"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV UI/UX designer wajib portfolio — tanpa portfolio, CV-mu cuma jadi 'kertas yang ngga bisa diklik'. HRD UX Indonesia akan cek portfolio web/Behance sebelum baca CV.",
      "Yang perlu: 3-5 case study lengkap (problem → research → design → impact), tools (Figma/Sketch/Adobe), pengalaman riset (user interview, usability testing).",
    ],
    tips: [
      {
        judul: "Case study > sertifikat",
        isi:
          "2-3 case study lengkap (problem, research, design, impact) lebih bernilai dari 5 sertifikat online course.",
      },
      {
        judul: "Riset user experience wajib disebut",
        isi:
          "'Melakukan 8 user interview + 30 kuesioner' atau 'Usability testing dengan 6 partisipan' — itu yang nunjukin kamu bukan cuma 'yang bisa design bagus'.",
      },
      {
        judul: "Design system & kolaborasi",
        isi:
          "Pernah bikin/manage design system? Tulis. Pernah kolaborasi dengan engineer pakai Figma library? Tulis. HRD tech Indonesia sangat menghargai ini.",
      },
    ],
    cv: {
      nama: "Dinda Larasati",
      jabatan: "UI/UX Designer — 3 Tahun Pengalaman",
      kota: "Bandung, Jawa Barat",
      email: "dinda.larasati@email.com",
      telepon: "0822-9988-7766",
      ringkasan:
        "UI/UX designer 3 tahun di startup & agency, fokus fintech & health tech. Pernah lead redesign yang naikkan conversion 28% untuk payment flow.",
      pengalaman: [
        {
          posisi: "Senior Product Designer",
          perusahaan: "Health Tech Startup (Bandung)",
          mulai: "Apr 2025",
          selesai: "Sekarang",
          deskripsi: [
            "Lead end-to-end design untuk 4 fitur baru (booking, telemed, lab result, payment)",
            "Redesign checkout flow, user testing dengan 12 partisipan, naikkan conversion 28%",
            "Maintain design system 80+ komponen, kolaborasi dengan 6 engineer pakai Figma library",
          ],
        },
        {
          posisi: "UI/UX Designer",
          perusahaan: "Fintech (Jakarta)",
          mulai: "Aug 2023",
          selesai: "Mar 2025",
          deskripsi: [
            "Desain 12 screen untuk app Pinjaman UMKM, design system dari 0",
            "User research mingguan (8 user interview/bulan), synthesis jadi actionable insight",
            "A/B testing 6 design alternatif untuk hero section, pilih winner dengan +18% CTR",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Telkom Bandung",
          jurusan: "S1 Desain Komunikasi Visual",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Figma (advanced)",
        "Sketch (intermediate)",
        "Adobe XD (intermediate)",
        "Principle (basic)",
        "User Research",
        "Usability Testing",
        "Design System",
        "Wireframing",
      ],
      tambahan: [
        {
          judul: "Portfolio",
          isi: "dindalarasati.my.id (5 case study lengkap)",
        },
      ],
    },
  },

  // ===== Kategori: Sales & Customer Service (4 entry) =====
  {
    slug: "sales-executive",
    judul: "Contoh CV Sales Executive yang Tembus Target 2026",
    h1: "Contoh CV Sales Executive — Cara Tulis Pencapaian Target & Closing",
    metaDescription:
      "Contoh CV sales executive yang menarik HRD Indonesia. Lengkap dengan cara menulis pencapaian target (revenue, jumlah closing, new client) yang bikin stand out.",
    kategori: "Sales & Customer Service",
    relatedSlugs: ["marketing", "customer-service", "admin"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Sales CV yang nge-hire itu yang penuh sama angka — bukan 'mencari klien baru' tapi 'acquire 35 new klien B2B dengan total kontrak Rp 1.8 M di Q1'.",
      "HRD sales Indonesia sangat nge-rating track record. Kalau kamu punya angka, tulis prominently. Kalau ngga, mulai bikin portofolio hasil sekarang juga.",
    ],
    tips: [
      {
        judul: "Revenue / closing wajib ada",
        isi:
          "Tiap bullet pengalaman: 'Closing X new klien', 'Revenue Y juta per bulan', 'Maintain retention Z%'. Jangan cuma 'menjual produk'.",
      },
      {
        judul: "Industri & produk spesifik",
        isi:
          "'Menjual SaaS HR ke UMKM' lebih menarik dari 'menjual produk teknologi'. Industri niche = nilai jual lebih tinggi.",
      },
      {
        judul: "Tools CRM & sales wajib",
        isi:
          "HubSpot, Salesforce, Pipedrive, Freshsales — HRD sales modern cari yang familiar dengan tools digital.",
      },
    ],
    cv: {
      nama: "Andi Kurniawan Saputra",
      jabatan: "Senior Sales Executive — 4 Tahun Pengalaman B2B",
      kota: "Surabaya, Jawa Timur",
      email: "andi.kurniawan@email.com",
      telepon: "0811-5544-3322",
      ringkasan:
        "Senior sales executive 4 tahun specialize B2B SaaS, track record konsisten tembus 110-130% target. Pernah handle 80+ klien korporat dengan total revenue Rp 8.5 M.",
      pengalaman: [
        {
          posisi: "Senior Sales Executive",
          perusahaan: "SaaS HR Tech (Jakarta)",
          mulai: "Mei 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Tembus 130% target Q1 2026 (revenue Rp 1.8 M dari 35 new klien B2B)",
            "Maintain retention 92% untuk klien existing (avg 8 tahun)",
            "Onboard 3 junior sales, 2 di antaranya tembus 100% target tahun pertama",
          ],
        },
        {
          posisi: "Sales Executive",
          perusahaan: "IT Solutions (Surabaya)",
          mulai: "Jul 2022",
          selesai: "Apr 2024",
          deskripsi: [
            "Acquire 45 new klien UMKM & korporat di Jawa Timur (avg deal Rp 25 juta)",
            "Top performer 2023, 125% dari target (revenue Rp 2.1 M)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Airlangga",
          jurusan: "S1 Manajemen",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "B2B Sales",
        "CRM (HubSpot, Salesforce)",
        "Negotiation",
        "Cold Calling",
        "Product Demo",
        "Account Management",
        "English (business)",
      ],
    },
  },
  {
    slug: "customer-service",
    judul: "Contoh CV Customer Service yang Lolos HRD Indonesia 2026",
    h1: "Contoh CV Customer Service — Cara Tulis Skill Komunikasi & Problem-Solving",
    metaDescription:
      "Contoh CV customer service yang dipakai hire di Indonesia. Lengkap dengan cara menulis pengalaman handle komplain, ticketing system, dan customer satisfaction.",
    kategori: "Sales & Customer Service",
    relatedSlugs: ["admin", "sales-executive", "fresh-graduate-sma"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV customer service itu sering dianggap 'CV yang gampang' — sehingga kalau kamu buat lebih detail dari yang lain, langsung stand out. Yang HRD cari: komunikasi, empati, problem-solving, dan track record kepuasan pelanggan.",
      "Yang bikin CV CS strong: angka (jumlah customer yang dihandle per hari, CSAT score, response time), tools (Zendesk, Freshdesk, LiveChat), dan contoh konkret komplain yang berhasil diselesaikan.",
    ],
    tips: [
      {
        judul: "CSAT score & response time",
        isi:
          "'Maintain CSAT 4.7/5 selama 8 bulan' atau 'Average response time <2 menit' — itu yang bikin kamu beda dari pelamar lain.",
      },
      {
        judul: "Tools customer service wajib",
        isi:
          "Zendesk, Freshdesk, Intercom, LiveChat, WhatsApp Business API, Shopify — minimal 2-3 tools.",
      },
      {
        judul: "Contoh komplain yang selesai",
        isi:
          "'Berhasil resolve 95% komplain dalam first contact, escalate 5% ke tim teknis' — itu nunjukin problem-solving skill kamu.",
      },
    ],
    cv: {
      nama: "Sari Indah Permata",
      jabatan: "Customer Service Specialist — 3 Tahun Pengalaman",
      kota: "Tangerang, Banten",
      email: "sari.indah@email.com",
      telepon: "0856-7788-1122",
      ringkasan:
        "Customer service specialist 3 tahun di e-commerce & fintech, handle 80+ customer/hari. Track record CSAT 4.8/5 dan first-contact resolution 92%.",
      pengalaman: [
        {
          posisi: "Customer Service Lead",
          perusahaan: "E-commerce Platform (Tangerang)",
          mulai: "Mar 2025",
          selesai: "Sekarang",
          deskripsi: [
            "Lead 6 customer service, maintain CSAT tim 4.7/5 selama 6 bulan",
            "Setup SOP baru untuk handle komplain high-value customer (VIP segment)",
            "Bikin knowledge base internal, turunkan escalation rate 18%",
          ],
        },
        {
          posisi: "Customer Service",
          perusahaan: "Fintech Lending (Jakarta)",
          mulai: "Sep 2023",
          selesai: "Feb 2025",
          deskripsi: [
            "Handle 80-100 customer/hari via WhatsApp & telepon",
            "Maintain first-contact resolution 92%, CSAT 4.8/5",
            "Top performer 2024 (rank 2 dari 25 CS se-tim)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Sastra Inggris",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Zendesk (advanced)",
        "Freshdesk (intermediate)",
        "WhatsApp Business API",
        "LiveChat",
        "Komunikasi (verbal & tulisan)",
        "Problem Solving",
        "English (fluent)",
        "Mandarin (dasar)",
      ],
    },
  },
  {
    slug: "teller-bank",
    judul: "Contoh CV Teller Bank yang Lolos Screening BCA/Mandiri/BNI 2026",
    h1: "Contoh CV Teller Bank — Cara Tulis Pengalaman Transaksi & Akurasi",
    metaDescription:
      "Contoh CV teller bank yang dipakai hire di bank Indonesia. Lengkap dengan cara menulis pengalaman transaksi, akurasi, dan skill layanan perbankan.",
    kategori: "Sales & Customer Service",
    relatedSlugs: ["customer-service", "admin", "fresh-graduate-d3"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Teller bank itu posisi entry-level dengan turnover tinggi — artinya setiap batch recruitment bisa dapat 50-100 pelamar. CV kamu harus langsung menunjukkan: akurasi, kecepatan, keramahan, dan familiar dengan sistem bank.",
      "Yang HRD bank Indonesia cari: pengalaman transaksi (jumlah per hari, akurasi 99.5%+), skill service excellence, familiarity dengan core banking system, dan sertifikasi (Sertifikasi OJK, AAJI).",
    ],
    tips: [
      {
        judul: "Akurasi & jumlah transaksi",
        isi:
          "'Handle rata-rata 120 transaksi/hari dengan akurasi 99.8%' — itu angka emas untuk teller bank.",
      },
      {
        judul: "Sertifikasi terkait",
        isi:
          "Sertifikasi OJK, AAJI (Asosiasi Asuransi Jiwa Indonesia), WPPE (Wakil Pialang Pasar Modal) — ngga wajib, tapi sangat membedakan.",
      },
      {
        judul: "Service excellence examples",
        isi:
          "Pernah dapat penghargaan internal? Tulis. Pernah handle customer VIP / komplain besar? Tulis dengan outcome.",
      },
    ],
    cv: {
      nama: "Naufal Pratama Wirajaya",
      jabatan: "Teller — 2 Tahun Pengalaman",
      kota: "Bandung, Jawa Barat",
      email: "naufal.pratama@email.com",
      telepon: "0821-3344-5566",
      ringkasan:
        "Teller 2 tahun di bank swasta nasional, handle rata-rata 110 transaksi/hari dengan akurasi 99.7%. Aktif jadi service excellence champion tim.",
      pengalaman: [
        {
          posisi: "Teller",
          perusahaan: "Bank Swasta Nasional (Cabang Bandung)",
          mulai: "Mei 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Handle 100-120 transaksi/hari (setor, tarik, transfer, payment)",
            "Akurasi 99.7% selama 18 bulan (target bank 99%)",
            "Service excellence champion Q3 2025 (penghargaan internal bank)",
            "Cross-selling produk bank (tabungan, deposito, KPR) — 8 closing/bulan",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Padjadjaran",
          jurusan: "D3 Akuntansi",
          mulai: "2021",
          selesai: "2024",
        },
      ],
      skill: [
        "Core Banking System (Finacle, Bankmate)",
        "Akurasi tinggi",
        "Service excellence",
        "Cross-selling",
        "Komunikasi customer",
        "Microsoft Excel (intermediate)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Sertifikasi OJK Level 1 (Otoritas Jasa Keuangan, 2024)",
        },
      ],
    },
  },
  {
    slug: "agen-asuransi",
    judul: "Contoh CV Agen Asuransi Profesional Berpengalaman 2026",
    h1: "Contoh CV Agen Asuransi — Cara Tulis Klien & Polis Berhasil",
    metaDescription:
      "Contoh CV agen asuransi profesional yang dipakai hire di Indonesia. Lengkap dengan cara menulis jumlah polis berhasil, sertifikat AAJI, dan track record klien.",
    kategori: "Sales & Customer Service",
    relatedSlugs: ["sales-executive", "customer-service", "marketing"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV agen asuransi di Indonesia itu unik — banyak orang awam mengira agen asuransi ngga butuh CV formal. Padahal kalau kamu apply ke agency top (Prudential, Allianz, AXA) atau naik ke managerial, CV formal wajib.",
      "Yang HRD agency cari: track record (jumlah polis, total premi, MDRT status), sertifikasi (AAJI, WAPERD), dan spesialisasi (jiwa, kesehatan, umum).",
    ],
    tips: [
      {
        judul: "Angka premi & polis",
        isi:
          "'Mendapatkan 80 polis baru per tahun, total premi Rp 1.2 M' — itu angka yang bikin kamu beda.",
      },
      {
        judul: "MDRT & sertifikasi",
        isi:
          "Kalau kamu MDRT (Million Dollar Round Table) — wajib tulis! Itu standar emas agen asuransi Asia.",
      },
      {
        judul: "Spesialisasi produk",
        isi:
          "Spesialisasi unit link? Jiwa murni? Kesehatan? Tulis — itu nunjukin expertise kamu.",
      },
    ],
    cv: {
      nama: "Liana Chandra Devi",
      jabatan: "Agen Asuransi Senior — 5 Tahun Pengalaman",
      kota: "Jakarta Selatan, DKI Jakarta",
      email: "liana.chandra@email.com",
      telepon: "0813-1122-7788",
      ringkasan:
        "Agen asuransi senior 5 tahun specialize unit link & jiwa, MDRT qualifier 2 tahun berturut-turut. Total kelola 350+ polis aktif dengan total premi Rp 4.2 M.",
      pengalaman: [
        {
          posisi: "Senior Agen Asuransi",
          perusahaan: "Allianz Life Indonesia",
          mulai: "Jan 2023",
          selesai: "Sekarang",
          deskripsi: [
            "MDRT qualifier 2024 & 2025 (top 1% agen Asia)",
            "Closing 80-100 polis baru per tahun, avg premi Rp 18 juta/polis",
            "Mentoring 5 junior agen, 3 di antaranya tembus target tahun pertama",
            "Spesialisasi: unit link, jiwa murni, kesehatan eksekutif",
          ],
        },
        {
          posisi: "Agen Asuransi",
          perusahaan: "Prudential Indonesia",
          mulai: "Aug 2021",
          selesai: "Dec 2022",
          deskripsi: [
            "Closing 50-60 polis baru per tahun",
            "Mencapai 100% target premi 2 tahun berturut-turut",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Bina Nusantara",
          jurusan: "S1 Manajemen",
          mulai: "2016",
          selesai: "2020",
        },
      ],
      skill: [
        "Konsultasi keuangan",
        "Financial planning",
        "Komunikasi persuasif",
        "CRM (Salesforce)",
        "English (business)",
        "Mandarin (dasar)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "AAJI (Asosiasi Asuransi Jiwa Indonesia), WAPERD, MDRT 2024 & 2025",
        },
      ],
    },
  },

  // ===== Kategori: Hospitality & F&B (3 entry) =====
  {
    slug: "chef-koki",
    judul: "Contoh CV Chef / Koki Profesional Hotel & Resto Indonesia 2026",
    h1: "Contoh CV Chef Profesional — Cara Tulis Spesialisasi Masakan & Pengalaman",
    metaDescription:
      "Contoh CV chef / koki profesional yang menarik HRD hotel & restoran Indonesia. Lengkap dengan cara menulis spesialisasi masakan, pengalaman dapur, dan portofolio menu.",
    kategori: "Hospitality & F&B",
    relatedSlugs: ["pramugari", "barista", "hotel-staff"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Chef CV yang bagus ngga cuma daftar restoran tempat kamu kerja — tapi tunjukin spesialisasi, gaya masak, dan menu signature. HRD hotel & resto Indonesia biasanya bandingin chef berdasarkan gaya masak & pengalaman dapur (hot kitchen, pastry, cold kitchen).",
      "Yang perlu: spesialisasi jelas (Western, Asian, Pastry, dll), pengalaman di dapur profesional (bukan warung), dan skill teknis (food cost, HACCP, menu engineering).",
    ],
    tips: [
      {
        judul: "Spesialisasi & gaya masak",
        isi:
          "'Specialize modern Indonesian cuisine dengan teknik French' — itu positioning yang jelas. Bukan 'bisa masak apa aja'.",
      },
      {
        judul: "Foto plating / portofolio",
        isi:
          "Taruh link Instagram portfolio plating / foto hidangan. HRD chef sangat visual — foto yang cantik sangat membantu.",
      },
      {
        judul: "Sertifikasi kuliner",
        isi:
          "HACCP, Food Safety, Sertifikasi BNSP Chef — semua sangat bernilai di industri horeka profesional.",
      },
    ],
    cv: {
      nama: "Reynaldi Saputra",
      jabatan: "Sous Chef — 5 Tahun Pengalaman",
      kota: "Denpasar, Bali",
      email: "reynaldi.saputra@email.com",
      telepon: "0812-9988-7766",
      ringkasan:
        "Sous chef 5 tahun specialize modern Indonesian & Western cuisine, berpengalaman di hotel bintang 4 & fine dining. Pernah develop 30+ menu signature.",
      pengalaman: [
        {
          posisi: "Sous Chef",
          perusahaan: "Hotel Bintang 4 (Bali)",
          mulai: "Mar 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Lead 8 cook di hot kitchen, handle 150 cover/night untuk fine dining restaurant",
            "Develop 25 menu signature modern Indonesian (food cost rata-rata 32%)",
            "Train 3 commis chef, supervise prep & service quality",
          ],
        },
        {
          posisi: "Chef de Partie",
          perusahaan: "Hotel Bintang 5 (Jakarta)",
          mulai: "Jul 2022",
          selesai: "Feb 2024",
          deskripsi: [
            "Handle grill section, maintain standar plating Michelin-guide",
            "Pernah masak untuk tamu diplomatik (presiden, duta besar) — 8 event",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Politeknik Negeri Bandung",
          jurusan: "D3 Perhotelan & Tata Boga",
          mulai: "2017",
          selesai: "2020",
        },
      ],
      skill: [
        "Western cuisine (advanced)",
        "Indonesian cuisine (advanced)",
        "Pastry & dessert (intermediate)",
        "Menu engineering",
        "Food cost control",
        "HACCP",
        "Kitchen management",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "HACCP Certification (2023), BNSP Chef Certification (2022)",
        },
        {
          judul: "Portofolio",
          isi: "instagram.com/chef.reynaldi (40+ plating foto)",
        },
      ],
    },
  },
  {
    slug: "pramugari",
    judul: "Contoh CV Pramugari Maskapai Indonesia 2026 (Lolos Garuda/Lion/Citilink)",
    h1: "Contoh CV Pramugari — Cara Lolos Screening Maskapai Indonesia",
    metaDescription:
      "Contoh CV pramugari yang dipakai hire di Garuda, Lion Air, Citilink, AirAsia. Lengkap dengan cara tulis tinggi badan, bahasa asing, dan pengalaman service.",
    kategori: "Hospitality & F&B",
    relatedSlugs: ["customer-service", "hotel-staff", "barista"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV pramugari itu ada 2 'lapis' — formal CV buat screening awal, dan personal branding buat interview. Yang penting: tinggi badan (sesuai standar maskapai), bahasa asing (English wajib, Mandarin nilai plus), dan pengalaman service.",
      "Maskapai Indonesia punya standar ketat: tinggi min 160cm (wanita) / 170cm (pria) untuk Garuda, usia max 25-27 tahun, penampilan rapi. Tapi CV tetap jadi alat screening pertama.",
    ],
    tips: [
      {
        judul: "Tinggi & bahasa wajib di paling atas",
        isi:
          "Taruh tinggi badan & bahasa yang dikuasai di ringkasan. Maskapai gak akan baca CV kamu kalau tinggi ngga sesuai.",
      },
      {
        judul: "Pengalaman service & customer",
        isi:
          "Hotel, resto, retail — semua nge-hitung sebagai 'service experience'. Tulis dengan jelas ya.",
      },
      {
        judul: "Foto profesional (recent)",
        isi:
          "Taruh foto formal (background putih, rapi, profesional) di pojok kanan atas CV. Pramugari CV tanpa foto = 80% langsung disortir.",
      },
    ],
    cv: {
      nama: "Kayla Anindya Putri",
      jabatan: "Pramugari — Garuda Indonesia",
      kota: "Jakarta, DKI Jakarta",
      email: "kayla.anindya@email.com",
      telepon: "0812-3344-9988",
      ringkasan:
        "Pramugari Garuda Indonesia 2 tahun (Cabin Crew), terbang domestik & internasional. English fluent, Mandarin intermediate. Tinggi 168cm, usia 24 tahun.",
      pengalaman: [
        {
          posisi: "Cabin Crew",
          perusahaan: "Garuda Indonesia",
          mulai: "Mar 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Terbang 70+ flight per bulan (Jakarta-Singapore, Jakarta-Tokyo, Jakarta-Sydney)",
            "Maintain service rating 4.8/5 dari 8.000+ passenger feedback",
            "Train 5 junior cabin crew, jadi mentor untuk international route",
          ],
        },
        {
          posisi: "Hotel Front Office",
          perusahaan: "Hotel Bintang 4 (Jakarta)",
          mulai: "Aug 2022",
          selesai: "Feb 2024",
          deskripsi: [
            "Handle check-in/check-out 80+ tamu/hari",
            "Resolve komplain, dapat 'Best Service' award Q4 2023",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Gadjah Mada",
          jurusan: "S1 Sastra Inggris (IPK 3.72)",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "English (fluent — TOEFL iBT 105)",
        "Mandarin (HSK 4)",
        "Bahasa Indonesia (native)",
        "First Aid Certified",
        "Safety & Emergency Procedure",
        "Service Excellence",
      ],
      tambahan: [
        {
          judul: "Tinggi Badan",
          isi: "168 cm (memenuhi standar Garuda minimum 160cm)",
        },
        {
          judul: "Sertifikasi",
          isi: "Garuda Indonesia Cabin Crew Initial Training (2024), First Aid & CPR Certified",
        },
      ],
    } as any,
  },
  {
    slug: "hotel-staff",
    judul: "Contoh CV Hotel Staff (Front Office, Housekeeping, F&B) 2026",
    h1: "Contoh CV Hotel Staff — Front Office & Housekeeping Profesional",
    metaDescription:
      "Contoh CV hotel staff (front office, housekeeping, F&B) yang dipakai hire hotel Indonesia. Lengkap dengan cara tulis pengalaman bintang 4/5 dan skill service.",
    kategori: "Hospitality & F&B",
    relatedSlugs: ["pramugari", "customer-service", "chef-koki"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Hotel staff CV di Indonesia sangat terbantu kalau kamu tunjukkan pengalaman di hotel berbintang (3 ke atas) — itu sinyal kualitas training & service. HRD hotel sangat nge-respect track record bintang 4/5.",
      "Yang perlu: posisi spesifik (front office, housekeeping, F&B service, Bellboy), bahasa asing (English wajib), dan skill software hotel (Opera PMS, RoomKey).",
    ],
    tips: [
      {
        judul: "Bintang hotel wajib disebut",
        isi:
          "'Hotel Bintang 4 International Chain (Marriott, Hilton, Accor)' — itu nunjukin training standar internasional, bukan hotel lokal non-bintang.",
      },
      {
        judul: "Software hotel & POS",
        isi:
          "Opera PMS, Micros, RoomKey, HotSOS — nama software ini di CV langsung bikin HRD hotel tertarik.",
      },
      {
        judul: "Service excellence metric",
        isi:
          "Guest satisfaction score, review TripAdvisor, repeat guest percentage — angka-angka ini bicara.",
      },
    ],
    cv: {
      nama: "Yoga Pratama Wijaya",
      jabatan: "Front Office Supervisor — 3 Tahun Pengalaman",
      kota: "Yogyakarta, DIY",
      email: "yoga.pratama@email.com",
      telepon: "0813-5566-7788",
      ringkasan:
        "Front office supervisor 3 tahun di hotel bintang 4 international chain, handle 80+ tamu/hari. Track record guest satisfaction 4.7/5 dan team leadership 8 staff.",
      pengalaman: [
        {
          posisi: "Front Office Supervisor",
          perusahaan: "Hotel Bintang 4 — Accor Brand (Yogyakarta)",
          mulai: "Jul 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Supervise 8 front office staff, maintain guest satisfaction 4.7/5 selama 12 bulan",
            "Handle 80+ check-in/out per hari, zero error untuk billing 6 bulan berturut-turut",
            "Training tim baru pakai SOP Accor standard, reduce training time 20%",
          ],
        },
        {
          posisi: "Front Office Agent",
          perusahaan: "Hotel Bintang 4 (Bali)",
          mulai: "Mar 2023",
          selesai: "Jun 2024",
          deskripsi: [
            "Handle check-in/out, complaint resolution, concierge service untuk international guest",
            "Top performer 2023 (best guest review di TripAdvisor)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Sekolah Tinggi Pariwisata Bandung",
          jurusan: "D3 Perhotelan",
          mulai: "2019",
          selesai: "2022",
        },
      ],
      skill: [
        "Opera PMS (advanced)",
        "Micros POS (intermediate)",
        "English (fluent)",
        "Bahasa Jepang (dasar)",
        "Guest service",
        "Complaint handling",
        "Team leadership",
      ],
    },
  },

  // ===== Kategori: Healthcare (3 entry) =====
  {
    slug: "perawat",
    judul: "Contoh CV Perawat / Ners yang Lolos RS Indonesia 2026",
    h1: "Contoh CV Perawat Profesional — Cara Tulis STR & Pengalaman RS",
    metaDescription:
      "Contoh CV perawat (NERS) yang dipakai hire di RS Indonesia. Lengkap dengan cara tulis STR, pengalaman RS tipe A/B/C, dan skill klinis.",
    kategori: "Healthcare",
    relatedSlugs: ["bidan", "dokter", "apoteker"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV perawat Indonesia wajib menonjolkan STR (Surat Tanda Registrasi) — itu wajib hukumnya untuk praktik. HRD RS Indonesia gak akan interview kalau STR ngga valid/aktif.",
      "Yang perlu: STR aktif, pengalaman RS (tipe A/B/C, swasta/negeri), spesialisasi (ICU, NICU, OK, IGD, rawat inap), dan sertifikasi klinis (BLS, ACLS, BTLS).",
    ],
    tips: [
      {
        judul: "STR wajib di ringkasan",
        isi:
          "Taruh 'STR Aktif (nomor STR, masa berlaku)' di paling atas ringkasan. Tanpa STR aktif, CV kamu ngga akan diproses.",
      },
      {
        judul: "Tipe RS & spesialisasi",
        isi:
          "'ICU RS Tipe A Cipto Mangunkusumo' — itu beda nilai dibanding 'perawat di rumah sakit'. Tipe & nama RS sangat penting.",
      },
      {
        judul: "Sertifikasi klinis",
        isi:
          "BLS (Basic Life Support), ACLS (Advanced Cardiac Life Support), BTCLS, ICU Nursing — semakin banyak, semakin stand out.",
      },
    ],
    cv: {
      nama: "Maria Ulfah S.Kep., Ners",
      jabatan: "Perawat ICU — 3 Tahun Pengalaman",
      kota: "Jakarta Timur, DKI Jakarta",
      email: "maria.ulfah@email.com",
      telepon: "0857-1122-3344",
      ringkasan:
        "Perawat ICU 3 tahun di RS tipe A, STR aktif (berlaku s/d 2028), sertifikasi ACLS & BLS. Pengalaman handle pasien kritis ventilator & monitoring hemodinamik.",
      pengalaman: [
        {
          posisi: "Perawat ICU",
          perusahaan: "RS Tipe A Cipto Mangunkusumo (Jakarta)",
          mulai: "Apr 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Handle 4-6 pasien kritis per shift, ventilator & monitoring hemodinamik",
            "Kolaborasi dengan dokter spesialis anestesi & jantung untuk patient care plan",
            "Train 4 perawat baru prosedur ICU & penggunaan alat critical care",
          ],
        },
        {
          posisi: "Perawat IGD",
          perusahaan: "RS Swasta Tipe B (Jakarta)",
          mulai: "Jul 2023",
          selesai: "Mar 2024",
          deskripsi: [
            "Triase pasien IGD, handle trauma & emergency case 30+/shift",
            "Implementasi SOP triase primer sesuai standar Kemenkes",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "Profesi Ners",
          mulai: "2022",
          selesai: "2023",
        },
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Ilmu Keperawatan",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "Patient assessment",
        "Ventilator management",
        "Hemodinamik monitoring",
        "Code blue response",
        "BLS, ACLS",
        "Komunikasi pasien & keluarga",
        "Electronic Medical Record (EMR)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "STR Aktif (no: XXXXXXX, berlaku s/d 2028), ACLS (2024), BLS (2024)",
        },
      ],
    },
  },
  {
    slug: "bidan",
    judul: "Contoh CV Bidan Profesional Indonesia 2026",
    h1: "Contoh CV Bidan — Pengalaman Klinik, RS, & Praktik Mandiri",
    metaDescription:
      "Contoh CV bidan yang dipakai hire di klinik & RS Indonesia. Lengkap dengan cara tulis STR Bidan, pengalaman persalinan, dan skill neonatus.",
    kategori: "Healthcare",
    relatedSlugs: ["perawat", "dokter", "apoteker"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV bidan wajib cantumkan STR Bidan — itu wajib hukumnya. HRD klinik/RS akan skip CV yang STR-nya ngga aktif atau ngga ada.",
      "Yang perlu: STR aktif, pengalaman (klinik, RS, praktik mandiri), spesialisasi (KB, kehamilan risiko tinggi, neonatus), dan jumlah persalinan yang pernah ditangani (estimasi).",
    ],
    tips: [
      {
        judul: "STR Bidan wajib",
        isi:
          "'STR Bidan Aktif (no: XXX, masa berlaku s/d 2027)' — taruh di ringkasan atas.",
      },
      {
        judul: "Estimasi jumlah persalinan",
        isi:
          "'Membantu 100+ persalinan normal & 30+ persalinan dengan penyulit' — itu angka yang nunjukin pengalaman klinis.",
      },
      {
        judul: "Sertifikasi terkait",
        isi:
          "APN (Asuhan Persalinan Normal), KB (Keluarga Berencana), MTBM (Manajemen Terpadu Balita Muda) — semuanya nilai plus.",
      },
    ],
    cv: {
      nama: "Wahyu Ningsih S.Tr.Keb.",
      jabatan: "Bidan — 4 Tahun Pengalaman",
      kota: "Semarang, Jawa Tengah",
      email: "wahyu.ningsih@email.com",
      telepon: "0812-7788-3344",
      ringkasan:
        "Bidan 4 tahun di klinik bersalin & RS tipe B, STR Bidan aktif. Pernah assist 150+ persalinan normal & 40+ persalinan dengan penyulit. Aktif di program KB & KIA puskesmas.",
      pengalaman: [
        {
          posisi: "Bidan",
          perusahaan: "Klinik Bersalin Bunda (Semarang)",
          mulai: "Mar 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Asuhan persalinan normal 8-10/bulan, track record APN-compliant 100%",
            "Konseling KB untuk 30+ akseptor/bulan (IUD, implan, suntik)",
            "Bekerja sama dengan dokter Sp.OG untuk kasus rujukan",
          ],
        },
        {
          posisi: "Bidan Desa / Pustu",
          perusahaan: "Puskesmas Gunungpati (Semarang)",
          mulai: "Aug 2022",
          selesai: "Feb 2024",
          deskripsi: [
            "Asuhan ibu hamil K1-K4, kelas ibu hamil, kunjungan neonatal",
            "Bantu 20+ persalinan normal di pustu & rumah pasien",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Politeknik Kesehatan Kemenkes Semarang",
          jurusan: "D4 Kebidanan",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "Asuhan persalinan normal (APN)",
        "Pemeriksaan kehamilan",
        "KB (IUD, implan, suntik)",
        "Neonatal care",
        "Kelas ibu hamil",
        "MTBM (Manajemen Terpadu Balita Muda)",
        "Komunikasi edukatif",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "STR Bidan Aktif (no: XXX, s/d 2027), APN (2022), Konseling KB (2023)",
        },
      ],
    },
  },
  {
    slug: "dokter",
    judul: "Contoh CV Dokter yang Lolos RS & Klinik Indonesia 2026",
    h1: "Contoh CV Dokter — STR, Pengalaman Klinik, & Spesialisasi",
    metaDescription:
      "Contoh CV dokter (umum & spesialis) yang dipakai hire di RS & klinik Indonesia. Lengkap dengan cara tulis STR, pengalaman klinik, dan riset/publikasi.",
    kategori: "Healthcare",
    relatedSlugs: ["perawat", "bidan", "apoteker"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV dokter Indonesia wajib menonjolkan STR (Surat Tanda Registrasi) yang aktif. HRD RS/klinik akan skip CV tanpa STR aktif — itu screening paling pertama.",
      "Yang perlu: STR aktif, gelar (dr., Sp.X untuk spesialis), pengalaman klinik (koasistensi, internship, residensi, praktik), riset/publikasi (kalau ada), dan kemampuan klinis spesifik.",
    ],
    tips: [
      {
        judul: "STR & gelar wajib",
        isi:
          "'dr. (nama), Sp.PD' atau 'dr. (nama)' untuk umum, plus 'STR Aktif no: XXX, masa berlaku s/d 2028' — itu format standar dokter Indonesia.",
      },
      {
        judul: "Pengalaman klinis (stase)",
        isi:
          "Sebutkan nama RS koasistensi, stase (bedah, anak, dalam, dll), dan jumlah pasien yang ditangani. HRD klinik baca ini detail.",
      },
      {
        judul: "Publikasi & riset (nilai plus)",
        isi:
          "Punya publikasi jurnal, presentasi poster, atau ikut penelitian? Tulis. Untuk spesialis, ini wajib banget.",
      },
    ],
    cv: {
      nama: "dr. Bramantya Surya Nugraha",
      jabatan: "Dokter Umum — 1 Tahun Pengalaman",
      kota: "Yogyakarta, DIY",
      email: "bramantya.surya@email.com",
      telepon: "0813-9988-1122",
      ringkasan:
        "Dokter umum fresh graduate, STR aktif (s/d 2031), internship di RS Sardjito. Aktif di program skrining penyakit tidak menular puskesmas.",
      pengalaman: [
        {
          posisi: "Dokter Internship",
          perusahaan: "RSUP Dr. Sardjito (Yogyakarta)",
          mulai: "Mei 2025",
          selesai: "Sekarang",
          deskripsi: [
            "Rotasi 6 stase: IGD, Penyakit Dalam, Bedah, Anak, Obgyn, Anestesi",
            "Handle 20-30 pasien/hari di IGD, lakukan primary assessment & triage",
            "Ikut operasi appendectomy & caesar sebagai assisten (10+ kasus)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Gadjah Mada",
          jurusan: "Profesi Dokter",
          mulai: "2021",
          selesai: "2025",
        },
        {
          sekolah: "Universitas Gadjah Mada",
          jurusan: "S1 Kedokteran",
          mulai: "2017",
          selesai: "2021",
        },
      ],
      skill: [
        "Primary assessment & triage",
        "Diagnosis klinis",
        "Bedah minor (jahit luka, sirkumsisi)",
        "ATLS, ACLS, BLS",
        "Medical record (EMR)",
        "Komunikasi pasien",
        "English (academic)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "STR Dokter Umum Aktif (no: XXXXX, s/d 2031), ATLS (2025), ACLS (2025)",
        },
        {
          judul: "Volunteer",
          isi: "Medical team respons COVID-19 DIY (2021-2022)",
        },
      ],
    },
  },

  // ===== Kategori: Bahasa Inggris (2 entry) =====
  {
    slug: "cv-bahasa-inggris",
    judul: "Contoh CV Bahasa Inggris yang Lolos Job Application Global 2026",
    h1: "Contoh CV Bahasa Inggris — Format ATS-Friendly untuk Job Global",
    metaDescription:
      "Contoh CV bahasa Inggris profesional yang dipakai apply kerja global. Lengkap dengan format ATS-friendly, kalimat achievement-based, dan standar internasional.",
    kategori: "Bahasa Inggris",
    relatedSlugs: ["fresh-graduate-s1", "data-analyst", "ui-ux-designer"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV bahasa Inggris untuk job application global sangat berbeda dengan CV bahasa Indonesia — fokus ke action verbs, quantified achievements, dan format ATS-friendly (tanpa tabel, tanpa kolom, simple layout).",
      "Yang HRD global cari: bullet points dengan action verbs (Led, Managed, Developed, Increased), angka konkret (percentages, dollar amounts, time periods), dan skill section yang terstruktur (technical skills, soft skills, languages).",
    ],
    tips: [
      {
        judul: "Action verbs & quantified results",
        isi:
          "Bukan 'responsible for marketing' tapi 'Led marketing campaigns generating $500K annual revenue'. Setiap bullet = action verb + angka.",
      },
      {
        judul: "ATS-friendly format",
        isi:
          "Tanpa tabel, tanpa kolom, tanpa header/footer (ATS gak baca). Pakai font standar (Calibri, Arial), section headers standard (Experience, Education, Skills).",
      },
      {
        judul: "No foto, no tanggal lahir",
        isi:
          "CV untuk pasar global (US, EU, SG) JANGAN cantumkan foto, tanggal lahir, status pernikahan, atau gender. Itu diskriminasi di sana.",
      },
    ],
    cv: {
      nama: "Rafi Aditya Pratama",
      jabatan: "Business Analyst — 3 Years Experience",
      kota: "Jakarta, Indonesia (Open to relocate)",
      email: "rafi.aditya@email.com",
      telepon: "+62 812-3456-7890",
      ringkasan:
        "Business analyst with 3 years experience in fintech and e-commerce, specializing in data-driven decision making and process optimization. Proven track record of delivering projects that reduced costs by 22% and increased revenue by 15%.",
      pengalaman: [
        {
          posisi: "Senior Business Analyst",
          perusahaan: "Fintech Startup (Singapore/Jakarta)",
          mulai: "Jan 2025",
          selesai: "Present",
          deskripsi: [
            "Led cross-functional team of 8 to redesign onboarding flow, reducing drop-off by 35%",
            "Developed predictive churn model with 87% accuracy, saving $1.2M annual revenue",
            "Automated 5 weekly reports using Python + Airflow, saving 20 hours/week of analyst time",
            "Presented quarterly business reviews to C-level executives",
          ],
        },
        {
          posisi: "Business Analyst",
          perusahaan: "E-commerce Company (Jakarta)",
          mulai: "Mar 2023",
          selesai: "Dec 2024",
          deskripsi: [
            "Analyzed customer segmentation data, identified high-value segment contributing 45% of revenue",
            "Built dashboard in Looker Studio for marketing team (12 KPIs, auto-refresh daily)",
            "Conducted A/B tests for 8 product features, top winner increased conversion by 18%",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "University of Indonesia",
          jurusan: "Bachelor of Economics (GPA 3.78/4.00)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "SQL (PostgreSQL, BigQuery) — advanced",
        "Python (pandas, scikit-learn) — intermediate",
        "Looker Studio, Tableau",
        "A/B Testing & Statistics",
        "Project Management",
        "Stakeholder Management",
      ],
      tambahan: [
        {
          judul: "Languages",
          isi: "Indonesian (native), English (fluent — TOEFL iBT 110), Mandarin (basic)",
        },
      ],
    },
  },
  {
    slug: "english-teacher",
    judul: "Contoh CV English Teacher / Guru Bahasa Inggris 2026",
    h1: "Contoh CV English Teacher — TEFL, TOEFL, dan Pengalaman Mengajar",
    metaDescription:
      "Contoh CV guru bahasa Inggris (English teacher) yang dipakai hire di Indonesia & online. Lengkap dengan sertifikasi TEFL/TOEFL/IELTS dan pengalaman mengajar.",
    kategori: "Bahasa Inggris",
    relatedSlugs: ["guru", "translator", "fresh-graduate-s1"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV guru bahasa Inggris wajib menonjolkan sertifikasi internasional (TEFL, TESOL, IELTS, TOEFL iBT) — itu yang membedakan kamu dari guru bahasa Inggris tanpa sertifikasi. HRD sekolah bilingual & online English platform sangat nge-respect sertifikasi ini.",
      "Yang perlu: sertifikasi (TEFL/TESOL minimal 120 jam), skor TOEFL/IELTS, pengalaman mengajar (usia siswa, level, format), dan metode pengajaran.",
    ],
    tips: [
      {
        judul: "Sertifikasi TEFL/TESOL wajib",
        isi:
          "TEFL/TESOL 120-hour online course (US$200-500) sangat membantu. HRD English school Indonesia sangat menghargai ini.",
      },
      {
        judul: "Skor TOEFL/IELTS",
        isi:
          "Cantumkan skor: 'TOEFL iBT 105' atau 'IELTS 7.5' — itu nilai plus, apalagi kalau apply ke sekolah international.",
      },
      {
        judul: "Usia siswa & level",
        isi:
          "'Mengajar 30 anak usia 6-12 tahun level beginner' — itu spesifik. Bukan 'mengajar bahasa Inggris'.",
      },
    ],
    cv: {
      nama: "Putu Maharani Pradnyaswari",
      jabatan: "English Teacher — 4 Tahun Pengalaman",
      kota: "Denpasar, Bali",
      email: "putu.maharani@email.com",
      telepon: "0813-1122-9988",
      ringkasan:
        "English teacher 4 tahun untuk anak & remaja (usia 5-17 tahun), TEFL certified. Aktif ngajar online ke murid Taiwan, Korea, dan Japan.",
      pengalaman: [
        {
          posisi: "English Teacher (Online)",
          perusahaan: "Cambly, iTalki (Freelance)",
          mulai: "Mar 2023",
          selesai: "Sekarang",
          deskripsi: [
            "Ngajar 25+ murid online dari Taiwan, Korea, Japan (usia 7-40 tahun)",
            "Maintain rating 4.95/5, top 5% tutor di platform",
            "Specialize conversation & business English",
          ],
        },
        {
          posisi: "English Teacher",
          perusahaan: "EF English First (Bali)",
          mulai: "Aug 2022",
          selesai: "Feb 2024",
          deskripsi: [
            "Ngajar 5 kelas (total 60 anak usia 7-12 tahun, level beginner-intermediate)",
            "Develop modul tambahan untuk siswa yang kesulitan pronouncing",
            "Koordinator program summer camp 2023 (40 peserta)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Udayana",
          jurusan: "S1 Sastra Inggris",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "TEFL Certified (120-hour, 2022)",
        "TOEFL iBT 108",
        "IELTS 7.5",
        "Cambridge TKT (Modules 1, 2, 3)",
        "Classroom management",
        "Curriculum development",
        "Online teaching tools (Zoom, Google Classroom)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "TEFL 120-hour (2022), Cambridge TKT (2023), TOEFL iBT 108 (berlaku s/d 2027)",
        },
      ],
    },
  },

  // ===== Kategori: Public Sector & Profesional (5 entry) =====
  {
    slug: "pns-cpns",
    judul: "Contoh CV PNS / Pelamar ASN / ASN Indonesia 2026",
    h1: "Contoh CV PNS / Pelamar ASN — Format Standar Indonesia",
    metaDescription:
      "Contoh CV pelamar PNS/ASN/CPNS Indonesia yang rapi dan profesional. Lengkap dengan format standar, pengalaman organisasi, dan soft skill.",
    kategori: "Public Sector",
    relatedSlugs: ["fresh-graduate-s1", "guru", "dokter"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV pelamar ASN/PNS/CPNS Indonesia sangat berbeda dengan CV profesional korporat — lebih formal, urut kronologis, dan menonjolkan pengalaman organisasi & pengabdian masyarakat. HRD BKN & pansel sangat perhatikan track record pengabdian.",
      "Yang perlu: IPK tinggi, pengalaman organisasi kampus (BEM, himpunan, komunitas), pengalaman volunteering, dan skill bahasa Inggris/komputer (sesuai formasi).",
    ],
    tips: [
      {
        judul: "IPK minimal 3.00",
        isi:
          "Untuk pelamar formasi S1, IPK <3.00 biasanya langsung tidak lolos verifikasi. Kalau IPK kamu rendah, fokus ke pengalaman organisasi & skill spesifik.",
      },
      {
        judul: "Pengalaman organisasi kampus",
        isi:
          "BEM, himpunan jurusan, komunitas, kepanitiaan — semua nge-hitung. HRD ASN sangat perhatikan leadership & organizational skill.",
      },
      {
        judul: "Volunteer & pengabdian",
        isi:
          "KKN, volunteer bencana, pengabdian masyarakat — tunjukkan dengan jelas. Itu nunjukin kamu 'punya jiwa sosial' yang ASN butuhkan.",
      },
    ],
    cv: {
      nama: "Bayu Pamungkas",
      jabatan: "Pelamar Formasi Analis Kebijakan — Fresh Graduate S1",
      kota: "Surakarta, Jawa Tengah",
      email: "bayu.pamungkas@email.com",
      telepon: "0812-5566-9988",
      ringkasan:
        "Fresh graduate S1 Ilmu Pemerintahan UNS, IPK 3.78. Aktif di BEM & kepanitiaan kampus, berpengalaman KKN tematik di desa wisata. Siap berkarir sebagai ASN analis kebijakan.",
      pengalaman: [
        {
          posisi: "Staff Departemen Kebijakan Publik",
          perusahaan: "BEM Universitas Sebelas Maret",
          mulai: "2022",
          selesai: "2023",
          deskripsi: [
            "Menyusun 3 paper kebijakan publik (tema: pendidikan inklusif, ekonomi kreatif, kesehatan mental)",
            "Koordinator riset & data untuk BEM tingkat universitas",
            "Mediasi 5 hearing dialog antara mahasiswa & rektorat",
          ],
        },
        {
          posisi: "Koordinator KKN Tematik Desa Wisata",
          perusahaan: "KKN UNS — Desa Ponggok, Klaten",
          mulai: "Jul 2024",
          selesai: "Des 2024",
          deskripsi: [
            "Lead 25 mahasiswa KKN, develop program branding desa wisata",
            "Bikin website profil desa & content marketing, naikkan kunjungan wisata 30%",
            "Membuat sistem data UMKM desa (database 40 UMKM)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Sebelas Maret",
          jurusan: "S1 Ilmu Pemerintahan (IPK 3.78/4.00)",
          mulai: "2020",
          selesai: "2024",
        },
      ],
      skill: [
        "Analisis kebijakan publik",
        "Microsoft Office (advanced)",
        "Riset & data analysis",
        "Komunikasi publik",
        "English (TOEFL 540)",
        "Kepemimpinan",
        "Bahasa Jawa (native)",
      ],
      tambahan: [
        {
          judul: "Pengalaman Volunteer",
          isi: "Relawan COVID-19 Solo Raya (2021), Volunteer Pendidikan Anak Jalanan (2022)",
        },
      ],
    },
  },
  {
    slug: "kurikulum-vitae-mahasiswa",
    judul: "Contoh CV Mahasiswa / Curiculum Vitae untuk Magang 2026",
    h1: "Contoh CV Mahasiswa untuk Magang — Fresh Graduate & Aktif Organisasi",
    metaDescription:
      "Contoh CV mahasiswa / curriculum vitae untuk apply magang. Lengkap dengan cara tulis IPK, pengalaman organisasi, dan skill yang relevan untuk first job.",
    kategori: "Public Sector",
    relatedSlugs: ["fresh-graduate-s1", "magang", "pns-cpns"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV mahasiswa / curriculum vitae untuk apply magang atau first job harus menonjolkan: IPK, organisasi kampus, dan skill — bukan pengalaman kerja (karena belum punya). HRD magang Indonesia sangat perhatikan keseimbangan akademik + organisasi + skill teknis.",
      "Yang perlu: IPK (min 3.00 ideal), pengalaman organisasi (BEM, himpunan, komunitas), kepanitiaan event, project kuliah / tugas akhir, dan skill teknis yang relevan.",
    ],
    tips: [
      {
        judul: "IPK 3.00+",
        isi:
          "IPK di bawah 3.00 bikin kamu susah dapet magang kompetitif. Kalau IPK ngga ideal, tonjolkan project & skill.",
      },
      {
        judul: "Organisasi & kepanitiaan",
        isi:
          "BEM, himpunan, komunitas profesional, panitia event kampus — itu bukti leadership & teamwork yang HRD cari.",
      },
      {
        judul: "Project kuliah & tugas akhir",
        isi:
          "Skripsi, project mata kuliah, lomba — bisa jadi 'pengalaman' kalau ngga ada kerja formal. Tulis dengan outcome.",
      },
    ],
    cv: {
      nama: "Salsabila Nur Azizah",
      jabatan: "Mahasiswa S1 Sistem Informasi — Semester 7",
      kota: "Malang, Jawa Timur",
      email: "salsabila.nur@email.com",
      telepon: "0813-7788-3344",
      ringkasan:
        "Mahasiswi S1 Sistem Informasi UB semester 7, IPK 3.72. Aktif di organisasi & kepanitiaan. Familiar dengan web development, data analysis, dan design. Tertarik magang di tech startup atau data analyst.",
      pengalaman: [
        {
          posisi: "Koordinator Divisi IT",
          perusahaan: "BEM Fakultas Ilmu Komputer UB",
          mulai: "2024",
          selesai: "Sekarang",
          deskripsi: [
            "Maintain website BEM & social media (IG 2.000+ followers)",
            "Bikin sistem absensi anggota pakai Google Apps Script",
            "Training 8 staff baru soal content creation & basic coding",
          ],
        },
        {
          posisi: "Staff Divisi Acara",
          perusahaan: "GEMASTIK XVII — Pagelaran Mahasiswa Nasional Bidang TIK",
          mulai: "Mar 2024",
          selesai: "Sep 2024",
          deskripsi: [
            "Koordinator sponsorship, close deal Rp 35 juta dari 5 sponsor",
            "Handle 500+ peserta dari 60 universitas se-Indonesia",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Brawijaya",
          jurusan: "S1 Sistem Informasi (IPK 3.72/4.00)",
          mulai: "2022",
          selesai: "2026 (expected)",
        },
      ],
      skill: [
        "HTML, CSS, JavaScript (dasar)",
        "Python (menengah)",
        "SQL (dasar)",
        "Figma (menengah)",
        "Canva",
        "Google Analytics",
        "Public speaking",
        "English (TOEFL 530)",
      ],
      tambahan: [
        {
          judul: "Project",
          isi: "Website directory UMKM Malang (HTML/CSS/JS), Sistem rekomendasi film pakai Python",
        },
      ],
    },
  },
  {
    slug: "kurikulum-vitae-bahasa-indonesia",
    judul: "Contoh CV Bahasa Indonesia yang Rapi & Profesional 2026",
    h1: "Contoh CV Bahasa Indonesia — Format Standar Profesional",
    metaDescription:
      "Contoh CV bahasa Indonesia yang rapi dan profesional. Lengkap dengan format standar, pengalaman kerja, dan skill yang HRD Indonesia cari.",
    kategori: "Public Sector",
    relatedSlugs: ["fresh-graduate-s1", "admin", "magang"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV bahasa Indonesia untuk apply kerja di perusahaan Indonesia — berbeda dengan CV bahasa Inggris, biasanya boleh pakai foto, status, dan penomoran referensi. Tapi tetap harus rapi, konsisten, dan terstruktur.",
      "Yang perlu: data diri (lengkap dengan foto), ringkasan profil, pengalaman kerja (kronologis mundur), pendidikan, skill, dan referensi (kalau diminta).",
    ],
    tips: [
      {
        judul: "Foto formal (opsional)",
        isi:
          "Pasar Indonesia masih menerima foto di CV — pakai foto formal (background putih, rapi, profesional). Untuk pasar global, foto ngga perlu.",
      },
      {
        judul: "Ringkasan profil 2-3 kalimat",
        isi:
          "Profil yang baik: 2-3 kalimat tentang dirimu — siapa, expertise, dan value yang kamu bawa. Bukan paragraf panjang.",
      },
      {
        judul: "Pengalaman kronologis mundur",
        isi:
          "Mulai dari pekerjaan TERAKHIR, lalu mundur ke sebelumnya. Setiap pengalaman = posisi, perusahaan, durasi, dan 3-5 bullet deskripsi.",
      },
    ],
    cv: {
      nama: "Adi Wijaya Kusuma",
      jabatan: "Staff Administrasi — 3 Tahun Pengalaman",
      kota: "Bekasi, Jawa Barat",
      email: "adi.wijaya@email.com",
      telepon: "0857-3344-1122",
      ringkasan:
        "Staff administrasi 3 tahun di perusahaan manufaktur & distributor, handle dokumen, invoice, dan cash opname. Teliti, rapi, dan familiar dengan accurate & Excel.",
      pengalaman: [
        {
          posisi: "Staff Administrasi & Finance",
          perusahaan: "PT Distribusi Jaya (Bekasi)",
          mulai: "Mar 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Handle invoice 100+/bulan, cash opname harian dengan selisih <Rp 50.000",
            "Input data Accurate, rekonsiliasi bank 2× sebulan",
            "Filing dokumen perpajakan (PPh 21, PPh 23, PPN) tepat waktu",
          ],
        },
        {
          posisi: "Staff Administrasi",
          perusahaan: "PT Manufaktur ABC (Cikarang)",
          mulai: "Aug 2022",
          selesai: "Feb 2024",
          deskripsi: [
            "Input data produksi harian (3.000+ record/hari), maintain akurasi 99.5%",
            "Handle surat jalan & delivery order untuk 20 truk/hari",
            "Koordinasi dengan bagian gudang untuk stock opname",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Gunadarma",
          jurusan: "D3 Manajemen Informatika",
          mulai: "2019",
          selesai: "2022",
        },
      ],
      skill: [
        "Microsoft Excel (menengah — VLOOKUP, pivot table)",
        "Accurate (software akuntansi)",
        "MYOB (dasar)",
        "Administrasi perkantoran",
        "Filing dokumen",
        "Teliti & rapi",
      ],
    },
  },
  {
    slug: "fresh-graduate-tanpa-pengalaman",
    judul: "Contoh CV Fresh Graduate Tanpa Pengalaman yang Tetap Dilirik HRD 2026",
    h1: "Contoh CV Fresh Graduate Tanpa Pengalaman — Cara Isi yang Konkret",
    metaDescription:
      "Contoh CV fresh graduate tanpa pengalaman kerja formal. Lengkap dengan cara isi magang, organisasi, project, dan skill supaya tetap dilirik HRD.",
    kategori: "Public Sector",
    relatedSlugs: ["fresh-graduate-s1", "magang", "kurikulum-vitae-mahasiswa"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Fresh graduate tanpa pengalaman kerja formal BUKAN berarti CV kamu kosong. Yang kamu punya: magang, organisasi, kepanitiaan, project kuliah, lomba, sertifikasi, dan skill — itu semua valid buat ditulis.",
      "Yang HRD fresh graduate Indonesia cari: IPK (min 3.00 ideal), pengalaman magang/organisasi yang relevan, dan kemauan belajar tinggi. Sertifikasi & project pribadi juga nilai plus.",
    ],
    tips: [
      {
        judul: "Jangan tulis 'tidak ada pengalaman'",
        isi:
          "Semua orang punya 'pengalaman' — magang, kepanitiaan, organisasi, project, volunteer. Tulis itu semua, bukan kosong.",
      },
      {
        judul: "Magang singkat tetap punya nilai",
        isi:
          "Magang 1-2 bulan di perusahaan = boleh masuk. Tulis sebagai 'Magang (durasi) — apa yang kamu kontribusi'. Jangan digabung.",
      },
      {
        judul: "Sertifikasi & kursus pendek",
        isi:
          "Coursera, Udemy, Dicoding, Google Certificate — yang 2-6 bulan sangat dihargai HRD. Tulis dengan platform & tahun.",
      },
    ],
    cv: {
      nama: "Hanifah Rahmadani Putri",
      jabatan: "Fresh Graduate S1 Komunikasi — Aktif di Organisasi & Magang",
      kota: "Depok, Jawa Barat",
      email: "hanifah.rahmadani@email.com",
      telepon: "0812-9988-3344",
      ringkasan:
        "Fresh graduate S1 Komunikasi UI, IPK 3.65. Magang 2 tempat (PR agency & korporat), aktif di organisasi & kepanitiaan. Familiar dengan content creation & social media management.",
      pengalaman: [
        {
          posisi: "Magang Content Creator",
          perusahaan: "PR Agency (Jakarta)",
          mulai: "Feb 2024",
          selesai: "Jun 2024",
          deskripsi: [
            "Bikin 30+ konten Instagram untuk 5 klien (caption, desain feed pakai Canva)",
            "Riset trending topic & hashtag untuk engagement optimization",
            "Engagement rate rata-rata 4.5% (di atas rata-rata industri 3%)",
          ],
        },
        {
          posisi: "Magang Corporate Communication",
          perusahaan: "PT Multifinance (Jakarta)",
          mulai: "Jul 2023",
          selesai: "Des 2023",
          deskripsi: [
            "Bantu drafting press release 8 buah (rilis produk baru, CSR, partnership)",
            "Koordinasi media coverage untuk 3 event korporat",
            "Maintain database media (150+ jurnalis nasional)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Ilmu Komunikasi (IPK 3.65/4.00)",
          mulai: "2020",
          selesai: "2024",
        },
      ],
      skill: [
        "Content creation",
        "Canva (advanced)",
        "Capcut (menengah)",
        "Social media management",
        "Public speaking",
        "Microsoft Office",
        "English (TOEFL 540)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Google Digital Marketing Certificate (Coursera, 2024), Social Media Marketing (HubSpot, 2024)",
        },
        {
          judul: "Organisasi",
          isi: "Sie Acara COMMFEST UI 2023, Staff Muda BEM UI 2021-2022",
        },
      ],
    },
  },

  // ===== Kategori: Bahasa Inggris (CV Creative + Cover Letter) =====
  {
    slug: "cv-creative",
    judul: "Contoh CV Creative yang Lolos Industri Kreatif 2026",
    h1: "Contoh CV Creative — Designer, Videographer, Content Creator",
    metaDescription:
      "Contoh CV creative yang dipakai hire di industri kreatif Indonesia. Lengkap dengan format visual, portofolio, dan skill teknis yang relevan.",
    kategori: "Bahasa Inggris",
    relatedSlugs: ["designer-grafis", "marketing", "ui-ux-designer"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV creative itu kebalikannya CV formal — boleh pakai warna, layout asimetris, dan portofolio embedded. Tapi tetap harus ATS-friendly untuk screening software. Solusinya: kirim PDF visual + CV plain text terpisah.",
      "Yang industri kreatif Indonesia cari: portofolio (WAJIB), software yang dikuasai, dan spesialisasi (designer, videographer, illustrator, animator).",
    ],
    tips: [
      {
        judul: "Portfolio link > CV visual",
        isi:
          "HRD creative Indonesia akan cek portofolio dulu, baru CV. Taruh link Behance/website pribadi di paling atas, prominent.",
      },
      {
        judul: "CV plain text + CV visual",
        isi:
          "Kirim 2 versi: (1) CV plain text untuk ATS, (2) CV visual PDF untuk impresi pertama. Yang dipakai untuk interview: visual.",
      },
      {
        judul: "Software spesifik + level",
        isi:
          "Adobe Suite (Photoshop, Illustrator, After Effects, Premiere Pro), Figma, Blender, Cinema 4D — tulis level (advanced, intermediate).",
      },
    ],
    cv: {
      nama: "Aulia Rachma Diva",
      jabatan: "Videographer & Editor — 3 Tahun Pengalaman",
      kota: "Jakarta Selatan, DKI Jakarta",
      email: "aulia.rachma@email.com",
      telepon: "0813-5566-1122",
      ringkasan:
        "Videographer & video editor 3 tahun, specialize short-form content (TikTok, Reels, Shorts). Pernah produce 200+ video untuk brand fashion, F&B, dan tech.",
      pengalaman: [
        {
          posisi: "Senior Videographer",
          perusahaan: "Creative Agency (Jakarta)",
          mulai: "Apr 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Lead production 60+ short-form video per bulan (TikTok, IG Reels, YouTube Shorts)",
            "Average view 500K per video, top 1 view 8 juta (campaign brand fashion)",
            "Mentoring 3 junior editor, develop style guide untuk brand consistency",
          ],
        },
        {
          posisi: "Videographer",
          perusahaan: "Startup E-commerce (Jakarta)",
          mulai: "Mei 2023",
          selesai: "Mar 2024",
          deskripsi: [
            "Produce 30+ product video & unboxing per bulan",
            "Editing pakai Premiere Pro & After Effects, rata-rata 2-3 video/hari",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Bina Nusantara",
          jurusan: "S1 Broadcasting (IPK 3.62)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Adobe Premiere Pro (advanced)",
        "After Effects (advanced)",
        "DaVinci Resolve (intermediate)",
        "Adobe Photoshop (menengah)",
        "Capcut (advanced)",
        "Storytelling & script writing",
        "Camera operation (Sony A7, Canon R5)",
      ],
      tambahan: [
        {
          judul: "Portfolio",
          isi: "auliarachma.my.id (50+ video case study)",
        },
      ],
    },
  },

  // ===== Kategori: Lain-lain (6 entry) =====
  {
    slug: "apoteker",
    judul: "Contoh CV Apoteker Profesional yang Lolos RS & Apotek Indonesia 2026",
    h1: "Contoh CV Apoteker — STRA, Pengalaman Klinik, & Industri Farmasi",
    metaDescription:
      "Contoh CV apoteker yang dipakai hire di RS, apotek, dan industri farmasi Indonesia. Lengkap dengan cara tulis STRA, pengalaman, dan sertifikasi.",
    kategori: "Healthcare",
    relatedSlugs: ["perawat", "bidan", "dokter"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV apoteker Indonesia wajib menonjolkan STRA (Surat Tanda Registrasi Apoteker) yang aktif — itu wajib hukumnya. HRD RS/apotek/industri farmasi akan skip CV tanpa STRA aktif.",
      "Yang perlu: STRA aktif, gelar (S.Farm., Apt.), pengalaman (RS, apotek, PBF, industri), spesialisasi (klinis, komunitas, regulasi), dan sertifikasi (CPKB, ISO, GCP untuk uji klinis).",
    ],
    tips: [
      {
        judul: "STRA wajib",
        isi:
          "'STRA Aktif (no: XXX, s/d 2027), S.Farm., Apt.' — taruh di paling atas ringkasan. Tanpa STRA aktif, CV ngga akan diproses.",
      },
      {
        judul: "Pengalaman spesifik",
        isi:
          "'Apoteker RS tipe B selama 2 tahun — handle 200 resep/hari' — itu yang bikin kamu beda. Bukan 'bekerja di apotek'.",
      },
      {
        judul: "Sertifikasi klinis",
        isi:
          "CPKB (Cara Pembuatan Kosmetika yang Baik), ISO 9001, GCP (Good Clinical Practice) untuk uji klinis — nunjukin kamu serius di industri.",
      },
    ],
    cv: {
      nama: "Dewi Anggraini S.Farm., Apt.",
      jabatan: "Apoteker — 3 Tahun Pengalaman",
      kota: "Surabaya, Jawa Timur",
      email: "dewi.anggraini@email.com",
      telepon: "0812-3344-9988",
      ringkasan:
        "Apoteker 3 tahun, STRA aktif, berpengalaman di RS tipe B & apotek jaringan. Pernah lead program MTBS & konseling obat untuk 1.000+ pasien.",
      pengalaman: [
        {
          posisi: "Apoteker",
          perusahaan: "RS Tipe B Islam Surabaya",
          mulai: "Mei 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Handle 200+ resep/hari (rawat inap & jalan), double check interaksi obat",
            "Konseling obat untuk 30+ pasien/hari, edukasi penggunaan antibiotik rasional",
            "Koordinator program MTBS (Manajemen Terpadu Balita Sakit) puskesmas",
          ],
        },
        {
          posisi: "Apoteker",
          perusahaan: "Apotek Jaringan Kimia Farma",
          mulai: "Jul 2023",
          selesai: "Apr 2024",
          deskripsi: [
            "Pelayanan resep 80-100/hari, konseling obat & OTC",
            "Maintain stok opname dengan selisih <0.1%",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Airlangga",
          jurusan: "Profesi Apoteker",
          mulai: "2022",
          selesai: "2023",
        },
        {
          sekolah: "Universitas Airlangga",
          jurusan: "S1 Farmasi (IPK 3.78)",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "Drug utilization review",
        "Patient counseling",
        "Hospital pharmacy management",
        "Farmakoterapi",
        "CPKB",
        "English (TOEFL 550)",
        "Komunikasi edukatif",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "STRA Aktif (no: XXX, s/d 2027), CPKB (2024)",
        },
      ],
    },
  },
  {
    slug: "supir-driver",
    judul: "Contoh CV Sopir / Driver Profesional (Pribadi & Online) 2026",
    h1: "Contoh CV Sopir Profesional — SIM, Pengalaman, & Track Record Aman",
    metaDescription:
      "Contoh CV sopir / driver profesional (pribadi, perusahaan, atau online). Lengkap dengan SIM, pengalaman, dan track record safety record.",
    kategori: "Lain-lain",
    relatedSlugs: ["fresh-graduate-sma", "kurikulum-vitae-bahasa-indonesia", "logistik"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV sopir/driver sering dianggap 'ngga perlu formal' — padahal kalau kamu apply ke perusahaan bonafid (Perusahaan Tambang, Ekspedisi, atau untuk bos profesional), CV formal sangat membedakan. Yang HRD perusahaan cari: SIM aktif, pengalaman mengemudi, track record zero accident, dan熟悉 area kerja.",
      "Yang perlu: SIM aktif (sesuai jenis kendaraan), pengalaman (kendaraan pribadi, box, truk, bus), track record safety (jika ada), dan熟悉 area (Jabodetabek, Jawa, Sumatera, dll).",
    ],
    tips: [
      {
        judul: "SIM aktif sesuai jenis",
        isi:
          "SIM A (mobil), SIM B1/B2 (truk), SIM C (motor) — tulis yang aktif dan masa berlakunya. HRD ngga mau SIM yang mati.",
      },
      {
        judul: "Track record safety",
        isi:
          "'3 tahun tanpa kecelakaan' atau 'zero accident selama bekerja' — itu nilai jual paling tinggi untuk sopir profesional.",
      },
      {
        judul: "Penguasaan area & jenis kendaraan",
        isi:
          "'Menguasai jalur Sumatera (Medan-Pekanbaru-Padang)' atau 'Bisa setir Innova, Avanza, Hiace' — spesifik, bukan 'bisa nyetir'.",
      },
    ],
    cv: {
      nama: "Bambang Setiawan",
      jabatan: "Sopir Profesional — 8 Tahun Pengalaman",
      kota: "Jakarta, DKI Jakarta",
      email: "bambang.setiawan@email.com",
      telepon: "0812-1122-3344",
      ringkasan:
        "Sopir profesional 8 tahun (perusahaan & pribadi bos eksekutif), SIM A & B1 aktif, track record 5 tahun tanpa kecelakaan. Menguasai jalur Jabodetabek, Jawa, dan Sumatera.",
      pengalaman: [
        {
          posisi: "Sopir Pribadi Direksi",
          perusahaan: "PT Konstruksi Nasional (Jakarta)",
          mulai: "Mar 2022",
          selesai: "Sekarang",
          deskripsi: [
            "Antar-jemput direksi & keluarga, termasuk perjalanan dinas luar kota",
            "Maintain kendaraan Innova Reborn 2022, zero accident 4 tahun berturut-turut",
            "Handle dokumen perjalanan & cash advance, rapi & terpercaya",
          ],
        },
        {
          posisi: "Sopir Ekspedisi",
          perusahaan: "PT Cargo Indonesia",
          mulai: "Jun 2018",
          selesai: "Feb 2022",
          deskripsi: [
            "Setir truk Box CDD untuk pengiriman Jabodetabek-Bandung-Cirebon",
            "Rata-rata 4 trip/minggu, maintain ketepatan waktu 96%",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "SMA Negeri 1 Jakarta",
          jurusan: "IPA",
          mulai: "2010",
          selesai: "2013",
        },
      ],
      skill: [
        "SIM A (aktif s/d 2028)",
        "SIM B1 (aktif s/d 2028)",
        "Mengemudi Innova, Avanza, Hiace, Fortuner",
        "Mengemudi truk box CDD & CDE",
        "Penguasaan jalur Jabodetabek, Jawa, Sumatera",
        "Defensive driving",
        "Pemeliharaan kendaraan dasar",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Defensive Driving Training (2021), First Aid (2022)",
        },
      ],
    },
  },
  {
    slug: "logistik",
    judul: "Contoh CV Staff Logistik / Supply Chain Indonesia 2026",
    h1: "Contoh CV Logistik & Supply Chain — Pengalaman Gudang & Distribusi",
    metaDescription:
      "Contoh CV staff logistik / supply chain yang dipakai hire di Indonesia. Lengkap dengan cara tulis pengalaman gudang, WMS, dan distribusi.",
    kategori: "Lain-lain",
    relatedSlugs: ["admin", "supir-driver", "accounting"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV logistik / supply chain Indonesia menonjolkan pengalaman gudang, sistem WMS (Warehouse Management System), dan distribusi. HRD industri FMCG & e-commerce sangat perhatikan track record akurasi stok & efisiensi distribusi.",
      "Yang perlu: pengalaman (gudang, distribusi, inventory, procurement), software (WMS, SAP, Microsoft Navision), dan angka (akurasi stok 99.5%+, jumlah SKU yang dihandle).",
    ],
    tips: [
      {
        judul: "Akurasi & jumlah SKU",
        isi:
          "'Maintain akurasi stok 99.7% untuk 5.000 SKU' — itu angka emas untuk staff logistik. Tiap hari handle berapa SKU = beda level.",
      },
      {
        judul: "Software WMS & ERP",
        isi:
          "SAP, Oracle WMS, Microsoft Navision, JDA, Manhattan — nama software ini di CV langsung bikin HRD tertarik.",
      },
      {
        judul: "Sertifikasi logistik",
        isi:
          "Sertifikasi BNSP Logistik, CILT (Chartered Institute of Logistics and Transport), APICS — semua nilai plus.",
      },
    ],
    cv: {
      nama: "Wahyu Pratama",
      jabatan: "Staff Logistik — 3 Tahun Pengalaman",
      kota: "Cikarang, Jawa Barat",
      email: "wahyu.pratama@email.com",
      telepon: "0813-5566-3344",
      ringkasan:
        "Staff logistik 3 tahun di perusahaan FMCG, handle 5.000+ SKU dengan akurasi 99.7%. Familiar dengan WMS & SAP, berpengalaman lead tim 8 picker & packer.",
      pengalaman: [
        {
          posisi: "Warehouse Supervisor",
          perusahaan: "PT FMCG Indonesia (Cikarang)",
          mulai: "Apr 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Supervise 8 staff gudang (picker, packer, loader), handle 200+ order/hari",
            "Maintain akurasi stok 99.7% untuk 5.000+ SKU (target 99.5%)",
            "Implementasi WMS baru, turunkan picking time 18%",
          ],
        },
        {
          posisi: "Staff Gudang",
          perusahaan: "PT E-commerce (Jakarta)",
          mulai: "Jul 2022",
          selesai: "Mar 2024",
          deskripsi: [
            "Inbound & outbound 800+ paket/hari, akurasi scan 99.9%",
            "Cycle count mingguan, bantu annual stock opname",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Teknik Industri (IPK 3.42)",
          mulai: "2018",
          selesai: "2022",
        },
      ],
      skill: [
        "SAP WM (intermediate)",
        "Oracle WMS (dasar)",
        "Microsoft Excel (advanced)",
        "Inventory management",
        "Lean / 5S",
        "FIFO / FEFO",
        "Leadership",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Sertifikasi BNSP Logistik (2023), Forklift Operator License (2022)",
        },
      ],
    },
  },
  {
    slug: "translator",
    judul: "Contoh CV Translator / Penerjemah Profesional 2026",
    h1: "Contoh CV Translator — Bahasa, Spesialisasi, & Portofolio",
    metaDescription:
      "Contoh CV translator / penerjemah profesional yang dipakai hire di Indonesia. Lengkap dengan cara tulis bahasa, spesialisasi, dan portofolio.",
    kategori: "Lain-lain",
    relatedSlugs: ["english-teacher", "cv-bahasa-inggris", "fresh-graduate-s1"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV translator profesional menonjolkan pasangan bahasa (English-Indonesian, Mandarin-Indonesian, dll), spesialisasi (legal, medis, teknis, sastra), dan portofolio (jumlah kata yang pernah diterjemahkan). HRD agency & korporat sangat perhatikan spesialisasi karena translator generalis susah dapat klien premium.",
      "Yang perlu: pasangan bahasa (idealnya 2-3), spesialisasi (legal/medis/teknis), portofolio (jumlah kata, klien), dan sertifikasi (HPI — Himpunan Penerjemah Indonesia, ATA — American Translators Association).",
    ],
    tips: [
      {
        judul: "Pasangan bahasa & spesialisasi",
        isi:
          "'English-Indonesian, specialize medical & legal translation' — spesifik, bukan 'bisa bahasa Inggris'.",
      },
      {
        judul: "Jumlah kata yang pernah diterjemahkan",
        isi:
          "'Total 500.000+ kata diterjemahkan (2018-2025)' — itu angka yang nunjukin kamu translator serius, bukan newbie.",
      },
      {
        judul: "Sertifikasi HPI / ATA",
        isi:
          "HPI (Himpunan Penerjemah Indonesia), ATA (American Translators Association), atau ISO 17100 — sertifikasi internasional sangat dihargai.",
      },
    ],
    cv: {
      nama: "I Putu Surya Dharma",
      jabatan: "Translator EN-ID — 5 Tahun Pengalaman",
      kota: "Denpasar, Bali",
      email: "iputusurya@email.com",
      telepon: "0813-1122-7766",
      ringkasan:
        "Translator English-Indonesian 5 tahun, specialize legal & medical translation. Total 600.000+ kata diterjemahkan, anggota HPI.",
      pengalaman: [
        {
          posisi: "Freelance Translator",
          perusahaan: "Self-employed + ProZ.com",
          mulai: "2021",
          selesai: "Sekarang",
          deskripsi: [
            "Terjemahkan 150.000+ kata per tahun (legal contract, medical journal, technical manual)",
            "Klien: 8 agency internasional (US, UK, AU), 12 klien langsung Indonesia & Singapura",
            "Average rating 4.9/5 di ProZ.com, top 5% translator EN-ID",
          ],
        },
        {
          posisi: "In-house Translator",
          perusahaan: "Law Firm Multinasional (Jakarta)",
          mulai: "Jul 2020",
          selesai: "Des 2022",
          deskripsi: [
            "Terjemahkan legal dokumen: kontrak, MOU, perjanjian kerja, akta notaris",
            "Volume 80.000 kata/tahun, akurasi 99.5%",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Udayana",
          jurusan: "S1 Sastra Inggris (IPK 3.78)",
          mulai: "2016",
          selesai: "2020",
        },
      ],
      skill: [
        "EN-ID translation (advanced)",
        "Legal translation",
        "Medical translation",
        "Technical manual translation",
        "SDL Trados Studio (intermediate)",
        "MemoQ (dasar)",
        "Localization",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Anggota HPI (Himpunan Penerjemah Indonesia, 2021), ATA Certified Translator (2023)",
        },
      ],
    },
  },
  {
    slug: "guru-sd",
    judul: "Contoh CV Guru SD (Sekolah Dasar) Honorer & PNS 2026",
    h1: "Contoh CV Guru SD — Pengalaman Mengajar & Sertifikasi",
    metaDescription:
      "Contoh CV guru SD (sekolah dasar) yang dipakai hire di Indonesia. Lengkap dengan cara tulis pengalaman mengajar, sertifikasi, dan skill.",
    kategori: "Lain-lain",
    relatedSlugs: ["guru", "english-teacher", "pns-cpns"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV guru SD Indonesia menonjolkan pengalaman mengajar (kelas berapa, mapel apa), sertifikasi (serdik guru, PPG), dan kemampuan mengelola kelas anak usia 6-12 tahun. HRD sekolah swasta & dinas pendidikan sangat perhatikan track record & pendekatan pedagogi.",
      "Yang perlu: pengalaman mengajar (lama, kelas, mapel), sertifikasi (Serdik, PPG Prajabatan), skill pedagogi (media, metode), dan usia mengajar.",
    ],
    tips: [
      {
        judul: "Pengalaman mengajar spesifik",
        isi:
          "'Mengajar kelas 4-6 SDN Sukamaju selama 5 tahun' — itu spesifik. Bukan 'guru SD'.",
      },
      {
        judul: "Sertifikasi guru (Serdik)",
        isi:
          "Sertifikasi Pendidik (Serdik) dari Kemendikbud = WAJIB untuk PNS. PPG Prajabatan juga nilai plus untuk fresh graduate S1 PGSD/PGMI.",
      },
      {
        judul: "Media & metode mengajar",
        isi:
          "Pakai media apa? Metode apa? (misal: Montessori, Kurikulum Merdeka, PJBL). Itu yang bedain guru modern dari guru konvensional.",
      },
    ],
    cv: {
      nama: "Sri Wahyuni S.Pd.",
      jabatan: "Guru SD — 6 Tahun Pengalaman",
      kota: "Bandung, Jawa Barat",
      email: "sri.wahyuni@email.com",
      telepon: "0857-3344-1122",
      ringkasan:
        "Guru SD 6 tahun, mengajar kelas 4-6, Serdik aktif. Familiar dengan Kurikulum Merdeka & metode PJBL. Aktif di komunitas guru penggerak.",
      pengalaman: [
        {
          posisi: "Guru Kelas 4-6",
          perusahaan: "SDN Sukamaju 1 (Bandung)",
          mulai: "Jul 2020",
          selesai: "Sekarang",
          deskripsi: [
            "Mengajar 6 mata pelajaran (MTK, IPA, IPS, B.Indonesia, PKN, SBdP) untuk 30 siswa",
            "Implementasi Kurikulum Merdeka, develop modul ajar P5 (Projek Penguatan Profil Pelajar Pancasila)",
            "Wali kelas 4, konseling orang tua 15-20 murid per semester",
          ],
        },
        {
          posisi: "Guru Honorer",
          perusahaan: "SDN Sukamaju 2 (Bandung)",
          mulai: "Jul 2018",
          selesai: "Jun 2020",
          deskripsi: [
            "Mengajar kelas 1-3, bantu program literasi & numerasi",
            "Koordinator ekstrakurikuler pramuka (40 siswa)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Pendidikan Indonesia",
          jurusan: "S1 PGSD (IPK 3.78, Cumlaude)",
          mulai: "2014",
          selesai: "2018",
        },
      ],
      skill: [
        "Kurikulum Merdeka",
        "PJBL (Project-Based Learning)",
        "Classroom management",
        "Media pembelajaran (Canva, Quizizz)",
        "Microsoft Office",
        "Komunikasi orang tua",
        "Bahasa Sunda (native)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Sertifikasi Pendidik (Serdik, 2022), PPG Prajabatan (2020)",
        },
        {
          judul: "Pelatihan",
          isi: "Kurikulum Merdeka Training (Kemendikbud, 2022), Guru Penggerak Lokakarya 1 (2024)",
        },
      ],
    },
  },
  {
    slug: "fresh-graduate-smp",
    judul: "Contoh CV Lulusan SMP / SMA yang Pertama Kali Cari Kerja 2026",
    h1: "Contoh CV Lulusan SMA/SMK — Kerja Pertama Tanpa Pengalaman",
    metaDescription:
      "Contoh CV lulusan SMA/SMK/SMP yang pertama kali cari kerja di Indonesia. Lengkap dengan cara tulis pengalaman magang, organisasi, dan skill.",
    kategori: "Lain-lain",
    relatedSlugs: ["fresh-graduate-sma", "supir-driver", "kurikulum-vitae-bahasa-indonesia"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV lulusan SMA/SMK/SMP yang pertama kali cari kerja di Indonesia sering dianggap 'ngga ada yang bisa ditulis' — padahal itu salah. Yang kamu punya: PKL (Praktek Kerja Lapangan) untuk SMK, organisasi sekolah, dan skill teknis (untuk SMK).",
      "Yang HRD entry-level Indonesia cari: kemauan belajar, skill teknis (untuk SMK), kepribadian yang bisa di-train, dan usia produktif (max 22-25 tahun biasanya).",
    ],
    tips: [
      {
        judul: "PKL wajib ditulis (untuk SMK)",
        isi:
          "Praktek Kerja Lapangan 3-6 bulan = pengalaman kerja pertama kamu. Tulis seperti kerja profesional, dengan kontribusi yang jelas.",
      },
      {
        judul: "Skill teknis sesuai jurusan SMK",
        isi:
          "TKJ: install jaringan, hardware. RPL: coding bahasa tertentu. Akuntansi: Accurate, MYOB. Tulis yang kamu bisa, dengan level.",
      },
      {
        judul: "Organisasi & kepanitiaan",
        isi:
          "OSIS, Pramuka, Rohis, kepanitiaan event sekolah — semua valid. Tulis seperti di CV fresh graduate S1.",
      },
    ],
    cv: {
      nama: "Dimas Prayoga",
      jabatan: "Lulusan SMK TKJ — Fresh Graduate",
      kota: "Surakarta, Jawa Tengah",
      email: "dimas.prayoga@email.com",
      telepon: "0856-7788-3344",
      ringkasan:
        "Lulusan SMK Teknik Komputer & Jaringan (TKJ) tahun 2024, nilai rata-rata rapor 85. PKL 6 bulan di warnet & ISP lokal. Familiar dengan install Windows, troubleshooting jaringan, dan kabel UTP.",
      pengalaman: [
        {
          posisi: "Praktek Kerja Lapangan (PKL)",
          perusahaan: "Warnet & ISP Lokal (Solo)",
          mulai: "Jul 2023",
          selesai: "Des 2023",
          deskripsi: [
            "Install Windows 7, 10, 11 untuk 30+ komputer klien warnet",
            "Troubleshooting hardware (ganti RAM, hardisk, PSU) untuk 50+ kasus",
            "Pasang kabel UTP straight & cross untuk 5 klien rumahan",
            "Maintain 3 access point WiFi untuk coverage area 100m²",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "SMK Negeri 2 Surakarta",
          jurusan: "Teknik Komputer & Jaringan (Nilai 85/100)",
          mulai: "2021",
          selesai: "2024",
        },
      ],
      skill: [
        "Install Windows 7/10/11",
        "Troubleshooting hardware PC",
        "Kabel UTP (straight & cross)",
        "Mikrotik dasar (MTCNA baru mulai)",
        "Microsoft Office",
        "Hardware maintenance",
        "Komunikasi teknis ke klien awam",
      ],
      tambahan: [
        {
          judul: "Organisasi",
          isi: "Anggota OSIS (Sie IT, 2022-2023), Juara 2 Lomba Web Design Tingkat Kota Solo (2023)",
        },
      ],
    },
  },
  // ===== Entry #30: long-tail unik "fresh graduate bank" (menggantikan duplikat 'bumn') =====
  {
    slug: "fresh-graduate-bank",
    judul: "Contoh CV Fresh Graduate Bank — BNI, BRI, Mandiri, BCA 2026",
    h1: "Contoh CV Fresh Graduate Bank — Lolos Screening Bank Swasta & BUMN",
    metaDescription:
      "Contoh CV fresh graduate yang dipakai apply ke bank (BNI, BRI, Mandiri, BCA, CIMB). Lengkap dengan skill, pengalaman organisasi, dan sertifikasi perbankan.",
    kategori: "Public Sector",
    relatedSlugs: ["bumn", "fresh-graduate-s1", "fresh-graduate-tanpa-pengalaman"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Apply ke bank Indonesia (BNI, BRI, Mandiri, BCA, CIMB) butuh CV yang menonjolkan IPK, pengalaman organisasi, dan kemampuan bahasa Inggris. HRD bank sangat kompetitif — ribuan pelamar per posisi, jadi CV harus langsung nge-hire di screening pertama.",
      "Yang HRD bank cari: IPK min 3.00, pengalaman organisasi kampus, English proficiency, dan kepribadian yang bisa di-train. Sertifikasi perbankan (OJK, AAJI) nilai plus besar.",
    ],
    tips: [
      {
        judul: "IPK 3.00+ wajib",
        isi:
          "IPK di bawah 3.00 bikin kamu susah dapet panggilan. Kalau IPK <3.00, tonjolkan pengalaman organisasi & skill teknis.",
      },
      {
        judul: "Pengalaman organisasi & kepanitiaan",
        isi:
          "BEM, himpunan, komunitas, kepanitiaan event kampus — semua nge-hitung. HRD bank cari leader & team player.",
      },
      {
        judul: "English proficiency",
        isi:
          "TOEFL min 500, atau IELTS 6.0+. Bank Indonesia sekarang banyak exposure ke global banking — English skill sangat dihargai.",
      },
    ],
    cv: {
      nama: "Reyna Anindya Pramesti",
      jabatan: "Pelamar Officer Development Program — PT Bank Central Asia",
      kota: "Jakarta, DKI Jakarta",
      email: "reyna.anindya@email.com",
      telepon: "0813-9988-3344",
      ringkasan:
        "Fresh graduate S1 Manajemen UI (IPK 3.82), aktif di BEM & komunitas investasi. TOEFL 580, magang di bank digital YUKK. Tertarik di bidang corporate banking & wealth management.",
      pengalaman: [
        {
          posisi: "Magang Customer Service Bank Digital",
          perusahaan: "YUKK — Bank Digital (Jakarta)",
          mulai: "Jul 2024",
          selesai: "Des 2024",
          deskripsi: [
            "Handle 50+ customer/hari via live chat & email (open account, transaksi, komplain)",
            "Resolve 95% komplain dalam first contact, CSAT 4.7/5",
            "Bantu tim marketing bikin content edukasi financial literacy (4 artikel blog)",
          ],
        },
        {
          posisi: "Ketua Divisi Riset Pasar Modal",
          perusahaan: "Komunitas Investasi UI",
          mulai: "2022",
          selesai: "2023",
          deskripsi: [
            "Lead 8 tim analis, publish 12 working paper tentang saham LQ45",
            "Selenggarakan 4 workshop 'Belajar Saham Pemula' untuk 200+ peserta",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Manajemen (IPK 3.82, Cumlaude)",
          mulai: "2020",
          selesai: "2024",
        },
      ],
      skill: [
        "Microsoft Excel (advanced — VLOOKUP, pivot, financial modeling)",
        "Bahasa Inggris (TOEFL 580)",
        "Riset pasar modal",
        "Komunikasi customer",
        "Public speaking",
        "Leadership",
        "Bahasa Mandarin (dasar)",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Sertifikasi OJK Level 1 (2024), Microsoft Office Specialist Excel (2023)",
        },
      ],
    },
  },
];
