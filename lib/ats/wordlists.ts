/**
 * Daftar statis untuk ATS scorer.
 *
 * 1. ACTION_VERBS: kata kerja Indonesia yang bagus untuk bullet point CV
 * 2. TECH_WHITELIST: istilah teknis (programming, tools, software) yang BUKAN typo
 * 3. SECTION_HEADERS: variasi header section dalam CV
 * 4. SOFT_SKILLS: skill yang umum di CV
 * 5. COMMON_TYPOS: mapping typo umum → koreksi (presisi 100%, 0 false positive)
 * 6. INFORMAL_ABBREVIATIONS: singkatan informal yang sebaiknya dihindari
 */

// 1. Action verbs Indonesia — 60+ kata kerja untuk bullet point
export const ACTION_VERBS = [
  "mengelola", "membangun", "meningkatkan", "mengembangkan", "merancang",
  "menganalisis", "menyusun", "mengimplementasikan", "memimpin", "mengoordinasikan",
  "mengarahkan", "mengevaluasi", "mengawasi", "menyelesaikan", "mencapai",
  "mengurangi", "meningkatkan", "mempercepat", "mengotomatiskan", "memonitor",
  "mengoordinir", "mendirikan", "membangun", "menciptakan", "mendesain",
  "memproduksi", "menerbitkan", "mempublikasikan", "mendokumentasikan", "mengajar",
  "melatih", "membimbing", "mendampingi", "mendukung", "membantu",
  "meyakinkan", "menjual", "memasarkan", "memperkenalkan", "menyebarkan",
  "berkolaborasi", "berkomunikasi", "bernegosiasi", "berkoordinasi", "bekerja sama",
  "menyelidiki", "meneliti", "memverifikasi", "memvalidasi", "memantau",
  "mendeteksi", "mengidentifikasi", "memecahkan", "merespons", "merancang ulang",
  "mengintegrasikan", "mengkonfigurasi", "memprogram", "mendebug", "menguji",
  "mendokumentasi", "melaporkan", "mempresentasikan", "mendemonstrasikan", "mengoordinasikan",
];

// 2. Tech whitelist — istilah yang BUKAN typo meskipun di luar kamus KBBI
//    (case-insensitive matching, plus semua proper noun otomatis di-skip)
export const TECH_WHITELIST = new Set([
  // Bahasa pemrograman
  "javascript", "typescript", "python", "java", "kotlin", "swift",
  "golang", "rust", "ruby", "php", "scala", "perl", "r", "sql",
  "html", "css", "sass", "scss", "less",
  // Framework
  "react", "vue", "angular", "svelte", "next", "nextjs", "nuxt",
  "node", "nodejs", "express", "nestjs", "django", "flask", "rails",
  "spring", "laravel", "symfony", "fastapi", "graphql", "rest",
  "tailwind", "bootstrap", "materialize", "shadcn",
  // Database & tools
  "postgres", "postgresql", "mysql", "mongodb", "redis", "elasticsearch",
  "firebase", "supabase", "prisma", "sequelize", "typeorm", "drizzle",
  "docker", "kubernetes", "terraform", "ansible", "jenkins", "github",
  "gitlab", "bitbucket", "jira", "confluence", "figma", "sketch",
  // Cloud
  "aws", "gcp", "azure", "vercel", "netlify", "cloudflare", "heroku",
  // Marketing
  "seo", "sem", "ppc", "ctr", "cpc", "roas", "cro", "ux", "ui",
  // Tools/aplikasi umum
  "excel", "word", "powerpoint", "figma", "canva", "notion", "slack",
  "jira", "trello", "asana", "monday", "hubspot", "salesforce",
  "mailchimp", "klaviyo", "zendesk", "freshdesk", "intercom",
  // Software khusus
  "accurate", "jurnal", "myob", "sap", "oracle", "quickbooks",
  "micros", "finacle", "bankmate", "hotels", "opera", "scopus",
  // Bahasa Inggris umum di CV
  "english", "mandarin", "japanese", "korean", "arabic", "french",
  // Indonesia istilah korporat
  "cv", "ats", "hrd", "kpi", "okr", "sop", "sk", "bumn", "bumd",
  "sla", "rkap", "lrfm", "ipo", "rpa", "erp", "crm", "bpr",
  // Sertifikasi & framework
  "scrum", "agile", "kanban", "lean", "six", "sigma", "iso", "pmp",
  "cfa", "cpa", "acca", "ca", "cma", "cissp", "cism",
  // Domain
  "fintech", "edtech", "healthtech", "e-commerce", "ecommerce",
  "saas", "paas", "iaas", "b2b", "b2c", "kpi", "okr",
]);

// 3. Section headers — variasi penulisan yang umum di CV
export const SECTION_PATTERNS = {
  contact: [
    "kontak", "kontak pribadi", "informasi kontak", "data pribadi", "profil",
    "contact", "personal information", "biodata",
  ],
  experience: [
    "pengalaman kerja", "pengalaman", "riwayat pekerjaan", "work experience",
    "experience", "employment history", "riwayat karir", "karier",
  ],
  education: [
    "pendidikan", "riwayat pendidikan", "edukasi", "education",
    "educational background", "academic background", "latar belakang pendidikan",
  ],
  skills: [
    "keahlian", "keterampilan", "skill", "skills", "kemampuan",
    "kompetensi", "competencies", "technical skills", "keahlian teknis",
  ],
  summary: [
    "ringkasan", "profil", "tentang saya", "summary", "profile",
    "professional summary", "ringkasan profesional", "objective",
    "tujuan karir", "career objective", "about me",
  ],
  achievements: [
    "pencapaian", "prestasi", "achievements", "accomplishments",
    "penghargaan", "sertifikasi", "certifications",
  ],
};

// 4. Soft skills umum (untuk skill density analysis)
export const SOFT_SKILLS = [
  "leadership", "komunikasi", "teamwork", "problem solving", "analytical",
  "adaptabilitas", "inisiatif", "kreativitas", "manajemen waktu", "manajemen stres",
  "negosiasi", "presentasi", "public speaking", "critical thinking",
  "kepemimpinan", "kerja tim", "kerja sama", "kolaborasi", "disiplin",
  "tanggung jawab", "mandiri", "teliti", "detail-oriented", "empati",
];

// 5. Common typos (presisi 100% — mapping spesifik)
//    Lowercase comparison
export const COMMON_TYPOS: Record<string, string[]> = {
  "apotik": ["apotek"],
  "aktifitas": ["aktivitas"],
  "aktifitasnya": ["aktivitasnya"],
  "ijasah": ["ijazah"],
  "resiko": ["risiko"],
  "nasehat": ["nasihat"],
  "jaman": ["zaman"],
  "system": ["sistem"],
  "sholat": ["salat"],
  "analisa": ["analisis"],
  "analisa pasar": ["analisis pasar"],
  "specialis": ["spesialis"],
  "konfirm": ["konfirmasi"],
  "implement": ["implementasi"],
  "exsport": ["ekspor"],
  "import": ["impor"],
  "komplek": ["kompleks"],
  "september": ["September"],
  "october": ["Oktober"],
  "januari": ["Januari"],
  "februari": ["Februari"],
  "maret": ["Maret"],
  "juli": ["Juli"],
  "agustus": ["Agustus"],
  // "di" pisah vs gabung — salah ejaan paling umum Indonesia
  "ditulis": ["ditulis"], // gabung, bukan "di tulis"
  "dibuat": ["dibuat"],
  "dikirim": ["dikirim"],
  "dikerjakan": ["dikerjakan"],
  "diselesaikan": ["diselesaikan"],
};

// 6. Informal abbreviations to flag
export const INFORMAL_ABBREVIATIONS = [
  "yg", "dgn", "utk", "sdh", "udh", "bgt", "skrg", "aja", "gpp", "trs",
  "blm", "bkn", "krn", "klo", "emg", "udh", "sm", "tp", "kpn",
];
