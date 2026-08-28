/**
 * 10 contoh CV Indonesia untuk programmatic SEO.
 * Tulisan asli (bukan AI-slop) — disesuaikan persona Indonesia.
 * Slug mengikuti keyword long-tail PRD §7.
 */

export interface ContohCV {
  slug: string;
  /** Keyword target (long-tail) — dipakai H1 + title */
  judul: string;
  /** H1 alternatif yang lebih human-friendly */
  h1: string;
  metaDescription: string;
  kategori: string;
  relatedSlugs: string[];
  publishedTime: string; // ISO
  modifiedTime: string; // ISO
  /** Pendahuluan 2-3 paragraf yang natural, bukan generic */
  intro: string[];
  /** Tips spesifik niche — 4-5 poin */
  tips: { judul: string; isi: string }[];
  /** CV lengkap sebagai teks (bukan gambar — text-selectable, PDF ATS) */
  cv: {
    nama: string;
    jabatan: string;
    kota: string;
    email: string;
    telepon: string;
    ringkasan: string;
    pengalaman: {
      posisi: string;
      perusahaan: string;
      mulai: string;
      selesai: string;
      deskripsi: string[];
    }[];
    pendidikan: { sekolah: string; jurusan: string; mulai: string; selesai: string }[];
    skill: string[];
    tambahan?: { judul: string; isi: string }[];
  };
}

export const CONTOH_CV_LIST: ContohCV[] = [
  {
    slug: "fresh-graduate-sma",
    judul: "Contoh CV Fresh Graduate SMA yang Lolos ATS 2026",
    h1: "Contoh CV Fresh Graduate SMA — Siap Kerja Tanpa Pengalaman",
    metaDescription:
      "Contoh CV fresh graduate SMA yang lolos ATS. Lengkap dengan tips menulis pengalaman organisasi & magang singkat agar HRD tertarik melirik.",
    kategori: "Fresh Graduate",
    relatedSlugs: ["fresh-graduate-d3", "fresh-graduate-s1", "magang"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Fresh graduate SMA sering bingung karena merasa 'nggak punya pengalaman'. Padahal CV yang bagus untuk lulusan SMA tidak melulu soal pengalaman kerja formal — magang 1–2 bulan, organisasi sekolah, atau proyek kecil juga bisa jadi nilai jual, asal ditulis dengan kalimat yang tepat.",
      "Contoh CV di bawah ini bisa langsung kamu tiru formatnya. Bagian terpenting adalah ringkasan di atas dan pengalaman — di situlah pelamar fresh graduate SMA biasanya kalah dari yang lebih senior.",
    ],
    tips: [
      {
        judul: "Tulis pengalaman magang singkat dengan hasil, bukan tugas",
        isi:
          "Jangan tulis 'membantu admin gudang'. Lebih baik 'Input data stok 200+ SKU ke Excel mingguan, akurasi 99%' — HRD langsung paham kontribusimu.",
      },
      {
        judul: "Jangan kosongkan bagian organisasi sekolah",
        isi:
          "OSIS, pramuka, rohis, club basket — semuanya relevan selama kamu sebutkan jabatan dan kegiatan spesifik (mis. 'ketua sie acara').",
      },
      {
        judul: "Pakai 1 halaman saja",
        isi:
          "CV fresh graduate SMA lebih dari 1 halaman = HRD malas baca. Prioritaskan ringkasan + pengalaman + skill teknis.",
      },
      {
        judul: "Skill bahasa Inggris, tulis sesuai level",
        isi:
          "Jangan tulis 'fluent English' kalau lulus SMA. Tulis 'bahasa Inggris pasif (TOEFL Prediction 450)' — lebih kredibel.",
      },
    ],
    cv: {
      nama: "Andika Pratama",
      jabatan: "Staf Gudang / Operator Produksi",
      kota: "Bekasi, Jawa Barat",
      email: "andika.pratama@gmail.com",
      telepon: "0812-3344-5566",
      ringkasan:
        "Lulusan SMA 2024 dengan pengalaman magang 2 bulan di gudang retail. Terbiasa input data stok, rapi, dan terbiasa shift pagi/malam.",
      pengalaman: [
        {
          posisi: "Magang Staf Gudang",
          perusahaan: "PT Sumber Rezeki Mart",
          mulai: "Juni 2024",
          selesai: "Agustus 2024",
          deskripsi: [
            "Input data stok masuk/keluar ke sistem WMS, rata-rata 150 SKU/hari",
            "Cek kesesuaian fisik barang dengan dokumen delivery order",
            "Bantu penyusunan laporan stok mingguan untuk supervisor",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "SMA Negeri 5 Bekasi",
          jurusan: "IPA",
          mulai: "2021",
          selesai: "2024",
        },
      ],
      skill: [
        "Microsoft Excel (dasar, VLOOKUP)",
        "Teliti input data",
        "Bisa shift",
        "Surat izin mengemudi C",
      ],
    },
  },
  {
    slug: "fresh-graduate-d3",
    judul: "Contoh CV Fresh Graduate D3 yang Lolos ATS",
    h1: "Contoh CV D3 Fresh Graduate — Menonjolkan Magang & Proyek",
    metaDescription:
      "Contoh CV fresh graduate D3 lengkap. Cocok untuk admin, akuntansi, IT, dan sekretaris. Tips menulis magang 6 bulan agar menonjol.",
    kategori: "Fresh Graduate",
    relatedSlugs: ["fresh-graduate-sma", "fresh-graduate-s1", "admin", "accounting"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Lulusan D3 punya keuntungan dibanding SMA: ada pengalaman magang 3–6 bulan dan biasanya ada proyek akhir / tugas akhir. Kuncinya adalah menuliskan itu dengan hasil, bukan deskripsi tugas.",
      "Di bawah ini contoh CV D3 Administrasi Bisnis. Formatnya bisa kamu pakai untuk D3 Akuntansi, Manajemen, atau TI — yang penting ringkasan dan bagian pengalaman tetap menonjol.",
    ],
    tips: [
      {
        judul: "Magang 6 bulan harus ada angka dampak",
        isi:
          "Misal: 'Mengelola arsip 800+ dokumen, menurunkan waktu pencarian dari 15 menit ke 3 menit'. HRD baca angka lebih cepat.",
      },
      {
        judul: "Proyek akhir / TA boleh masuk di section 'Proyek'",
        isi:
          "Jangan dipaksakan, tapi kalau relevan dengan lowongan — mis. aplikasi kasir untuk TA D3 TI — tulis di sini.",
      },
      {
        judul: "Cantumkan nilai IPK kalau di atas 3.50",
        isi:
          "Di bawah 3.50, lebih baik tidak usah — lebih banyak employer yang tidak pedulikan IPK setelah 2 tahun kerja.",
      },
      {
        judul: "Hindari kalimat 'saya orang yang bertanggung jawab'",
        isi:
          "Itu soft skill yang nggak bisa dibuktikan di CV. Lebih baik: 'Bertanggung jawab atas input data penjualan 3 cabang selama 6 bulan'.",
      },
    ],
    cv: {
      nama: "Sari Ramadhani",
      jabatan: "Admin Staff / Administrasi",
      kota: "Bandung, Jawa Barat",
      email: "sari.ramadhani@email.com",
      telepon: "0812-3456-7890",
      ringkasan:
        "Lulusan D3 Administrasi Bisnis dengan pengalaman magang 6 bulan di perusahaan logistik. Terbiasa mengelola dokumen dan data dengan teliti.",
      pengalaman: [
        {
          posisi: "Admin Intern",
          perusahaan: "PT Nusantara Logistik",
          mulai: "Januari 2023",
          selesai: "Juni 2023",
          deskripsi: [
            "Mengelola arsip 300+ dokumen dan memangkas waktu pelaporan mingguan dari 4 jam menjadi 90 menit",
            "Input data pengiriman 50+ DO/hari ke sistem ERP dengan akurasi 99%",
            "Menyusun laporan stok mingguan untuk supervisor operasional",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Politeknik Negeri Bandung",
          jurusan: "D3 Administrasi Bisnis",
          mulai: "2020",
          selesai: "2023",
        },
      ],
      skill: [
        "Microsoft Excel (VLOOKUP, Pivot Table)",
        "Administrasi perkantoran",
        "Input data rapi",
        "Google Workspace",
        "Bisa pakai Accurate (dasar)",
      ],
    },
  },
  {
    slug: "fresh-graduate-s1",
    judul: "Contoh CV Fresh Graduate S1 yang Lolos ATS",
    h1: "Contoh CV S1 Fresh Graduate — Profesional Sejak Hari Pertama",
    metaDescription:
      "Contoh CV fresh graduate S1 untuk fresh graduate universitas. Tips menonjolkan skripsi, organisasi, dan magang kampus.",
    kategori: "Fresh Graduate",
    relatedSlugs: ["fresh-graduate-d3", "magang", "bumn"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Lulusan S1 punya 2 keuntungan utama: soft skill organisasi (BEM, himpunan, kepanitiaan) dan waktu lebih banyak untuk magang. Tapi banyak yang gagal pakai keduanya — pengalaman ditulis dengan nada pasif: 'ikut serta dalam kepanitiaan'.",
      "Contoh CV di bawah ini menunjukkan cara menulis pengalaman organisasi dengan hasil yang konkret, plus soft skill yang terbukti.",
    ],
    tips: [
      {
        judul: "Hapus kata 'aktif berorganisasi' — ganti dengan hasil",
        isi:
          "Bukan 'aktif di BEM', tapi 'Koor divisi acara BEM Fakultas 2022, memimpin 12 panitia untuk orientasi mahasiswa baru 500+ peserta'.",
      },
      {
        judul: "Skripsi boleh masuk di section 'Proyek Akademik'",
        isi:
          "Tapi hanya kalau relevan dengan lowongan. 'Analisis sentiment review Shopee dengan Naive Bayes' akan menarik untuk lowongan data analyst.",
      },
      {
        judul: "Magang 3 bulan cukup 3 bullet points kuat",
        isi:
          "Jangan tulis 7 bullet — pilih 3 yang paling menunjukkan hasil / impact.",
      },
      {
        judul: "Pakai 1 halaman, font standar, A4",
        isi:
          "Fresh graduate S1 yang CV-nya 2 halaman biasanya menulis hal yang tidak perlu. 1 halaman > CV panjang lebar.",
      },
    ],
    cv: {
      nama: "Rizky Maulana",
      jabatan: "Marketing Staff / Business Development",
      kota: "Jakarta Selatan",
      email: "rizky.maulana@email.com",
      telepon: "0813-2233-4455",
      ringkasan:
        "Lulusan S1 Manajemen Bisnis dengan fokus marketing digital. Pernah memimpin tim 12 orang untuk acara orientasi 500+ mahasiswa, terbiasa target-driven.",
      pengalaman: [
        {
          posisi: "Koordinator Divisi Acara",
          perusahaan: "BEM Fakultas Ekonomi — Univ. Negeri Jakarta",
          mulai: "Februari 2022",
          selesai: "Januari 2023",
          deskripsi: [
            "Memimpin 12 panitia dalam penyusunan acara orientasi 500+ mahasiswa baru",
            "Mengelola budget Rp 80 juta dan sponsor 6 perusahaan lokal",
            "Mengurangi waktu persiapan acara dari 3 bulan menjadi 6 minggu lewat sistem timeline digital",
          ],
        },
        {
          posisi: "Magang Marketing",
          perusahaan: "PT Kreasi Anak Bangsa",
          mulai: "Juli 2022",
          selesai: "September 2022",
          deskripsi: [
            "Membuat 30 konten Instagram (reels + carousel) selama 3 bulan, rata-rata reach 5.000+ per konten",
            "Riset kompetitor 10 brand sejenis, ringkasan dipakai untuk strategi Q4",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Negeri Jakarta",
          jurusan: "S1 Manajemen (IPK 3.72)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Canva, CapCut (dasar)",
        "Google Analytics (dasar)",
        "Public speaking",
        "Manajemen proyek",
        "Microsoft Excel",
      ],
    },
  },
  {
    slug: "magang",
    judul: "Contoh CV Magang Mahasiswa yang Lolos ATS",
    h1: "Contoh CV Magang Mahasiswa — Supaya Diterima Internship",
    metaDescription:
      "Contoh CV magang untuk mahasiswa yang sedang cari internship. Fokus ke skill, kampus, dan ekspektasi yang relevan dengan posisi magang.",
    kategori: "Mahasiswa",
    relatedSlugs: ["fresh-graduate-s1", "fresh-graduate-d3", "admin"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Mencari magang pertama lebih sulit daripada yang dibayangkan, karena HRD tahu kamu 'belum bisa apa-apa'. Tapi CV magang yang bagus justru harus menuliskan hal kecil dengan nada besar.",
      "Yang penting dari CV magang adalah: jelaskan semester berapa, kampus mana, dan skill apa yang kamu bawa — bukan 'mau belajar'. HRD butuh tahu apa yang bisa kamu kontribusikan hari pertama.",
    ],
    tips: [
      {
        judul: "Tulis semester sekarang & prediksi lulus",
        isi:
          "Mis. 'Mahasiswa Aktif Semester 6, lulus Desember 2026'. HRD magang butuh ini untuk estimasi durasi.",
      },
      {
        judul: "Tulis project kampus / tugas kelompok",
        isi:
          "Project mata kuliah boleh masuk, kalau relevan. 'Studi kasus strategi marketing GoFood untuk tugas Brand Management'.",
      },
      {
        judul: "Sebutkan software yang sudah dipakai, bukan 'paham komputer'",
        isi:
          "'SPSS, Excel Pivot, Canva' jauh lebih kuat dari 'melek digital'.",
      },
      {
        judul: "Jangan tulis 'tertarik belajar banyak'",
        isi:
          "HRD butuh kontributor, bukan murid. Tulis 'siap mendukung tim X dalam hal Y'.",
      },
    ],
    cv: {
      nama: "Anindya Kirani",
      jabatan: "Mahasiswa Aktif — Penulis Konten / Magang Marketing",
      kota: "Yogyakarta",
      email: "anindya.kirani@email.com",
      telepon: "0857-1122-3344",
      ringkasan:
        "Mahasiswa semester 6 Komunikasi UGM dengan fokus content writing & digital marketing. Aktif menulis 2 blog pribadi 6 bulan terakhir.",
      pengalaman: [
        {
          posisi: "Penulis Lepas",
          perusahaan: "Blog Pribadi (anindyawrites.wordpress.com)",
          mulai: "Maret 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Menulis 2 artikel/minggu tentang productivity tools & career untuk fresh graduate",
            "Mencapai 4.000 monthly visitors dalam 6 bulan tanpa paid ads",
          ],
        },
        {
          posisi: "Staf Divisi Media",
          perusahaan: "BEM KM UGM",
          mulai: "Maret 2023",
          selesai: "Februari 2024",
          deskripsi: [
            "Membuat desain poster & caption untuk 15+ event kampus",
            "Kelola akun Instagram BEM, pertambahan 2.500 followers dalam 1 periode",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Gadjah Mada",
          jurusan: "S1 Ilmu Komunikasi (semester 6, IPK 3.65)",
          mulai: "2022",
          selesai: "2026 (prediksi)",
        },
      ],
      skill: [
        "Canva, CapCut, Notion",
        "Copywriting (headline, body)",
        "Riset kata kunci dasar (Ubersuggest)",
        "Bahasa Inggris pasif",
      ],
    },
  },
  {
    slug: "admin",
    judul: "Contoh CV Admin / Administrasi yang Lolos ATS",
    h1: "Contoh CV Admin — Untuk yang Punya atau Belum Punya Pengalaman",
    metaDescription:
      "Contoh CV administrasi / admin staff yang lolos ATS. Cocok untuk admin gudang, admin kantor, admin sekolah, dan admin marketing.",
    kategori: "Profesional",
    relatedSlugs: ["fresh-graduate-d3", "kasir", "accounting"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "Posisi admin adalah entry-level paling laris di Indonesia, dan juga paling kompetitif. HRD menerima 100–300 lamaran per lowongan admin, jadi CV yang lolos ATS benar-benar membedakan kamu dari yang lain.",
      "Yang penting: tulis software yang kamu kuasai (Excel, Accurate, MYOB, SAP), dan hasil yang sudah kamu capai di posisi sebelumnya — bukan sekadar 'bertanggung jawab atas administrasi'.",
    ],
    tips: [
      {
        judul: "Cantumkan level Excel secara spesifik",
        isi:
          "'Excel (VLOOKUP, Pivot Table, IF)' lebih kuat dari 'Microsoft Office'. Kalau bisa bikin dashboard, tulis.",
      },
      {
        judul: "Tulis software ERP / akunting yang pernah dipakai",
        isi:
          "Accurate, MYOB, Jurnal, SAP, Oracle — semua ini 'kata kunci' di CV admin. Kalau tidak pernah pakai, jangan tulis.",
      },
      {
        judul: "Beri angka pada setiap pengalaman",
        isi:
          "'Mengelola 500+ invoice per bulan' lebih kuat dari 'mengelola invoice'.",
      },
      {
        judul: "Section 'Skill' di bawah, bukan di atas",
        isi:
          "HRD admin biasanya baca dari atas ke bawah: ringkasan → pengalaman → skill. Jangan terbalik.",
      },
    ],
    cv: {
      nama: "Dewi Lestari",
      jabatan: "Admin Staff — 2 Tahun Pengalaman",
      kota: "Surabaya, Jawa Timur",
      email: "dewi.lestari@email.com",
      telepon: "0812-9988-7766",
      ringkasan:
        "Admin staff dengan 2 tahun pengalaman mengelola invoice, purchase order, dan arsip kantor. Familiar Accurate & Excel advanced.",
      pengalaman: [
        {
          posisi: "Admin Purchasing",
          perusahaan: "PT Sinar Jaya Logistik",
          mulai: "Maret 2023",
          selesai: "Sekarang",
          deskripsi: [
            "Mengelola 500+ purchase order per bulan dengan akurasi 98%",
            "Input invoice ke Accurate, rekonsiliasi dengan PO setiap akhir bulan",
            "Menurunkan waktu approval PO dari 3 hari menjadi 1 hari lewat template baru",
          ],
        },
        {
          posisi: "Admin Magang",
          perusahaan: "PT Sinar Jaya Logistik",
          mulai: "Agustus 2022",
          selesai: "Februari 2023",
          deskripsi: [
            "Rekap data absensi 40 karyawan ke Excel, buat laporan bulanan untuk HRD",
            "Arsip dokumen kontrak kerja ke Google Drive dengan struktur folder rapi",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "SMK Negeri 1 Surabaya",
          jurusan: "Akuntansi",
          mulai: "2019",
          selesai: "2022",
        },
      ],
      skill: [
        "Accurate (input invoice, laporan)",
        "Microsoft Excel (VLOOKUP, Pivot, IF)",
        "Google Workspace",
        "Administrasi dokumen",
        "Bahasa Inggris pasif",
      ],
    },
  },
  {
    slug: "kasir",
    judul: "Contoh CV Kasir / Customer Service yang Lolos ATS",
    h1: "Contoh CV Kasir — Profesional, Bukan Sekadar 'Jaga Kasir'",
    metaDescription:
      "Contoh CV kasir untuk supermarket, minimarket, cafe, atau resto. Tips menonjolkan target penjualan dan kecepatan transaksi.",
    kategori: "Profesional",
    relatedSlugs: ["admin", "fresh-graduate-sma"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV kasir sering ditulis dengan nada 'saya cuma jaga kasir'. Padahal kerja kasir itu ada target transaksi, target penjualan, dan akurasi — semua itu layak ditulis.",
      "Kalau kamu pernah handle shift malam, proses ratusan transaksi per hari, atau cross-selling produk — itu semua materi CV. Contoh di bawah ini menggunakan persona retail supermarket.",
    ],
    tips: [
      {
        judul: "Tulis jumlah transaksi / shift",
        isi:
          "'Melayani rata-rata 200 transaksi per shift' jauh lebih kuat dari 'melayani pelanggan'.",
      },
      {
        judul: "Sebutkan software POS yang pernah dipakai",
        isi:
          "Moka, Pawoon, iReap, OpenKasir, Kasir Pintar — ini kata kunci yang dicari HRD retail.",
      },
      {
        judul: "Tambahkan angka selisih kas",
        isi:
          "'Selisih kas < Rp 5.000 / shift' menunjukkan kamu teliti. Ini detail kecil yang HRD suka.",
      },
      {
        judul: "Tambahkan pengalaman upselling kalau ada",
        isi:
          "'Meningkatkan rata-rata nilai transaksi dari Rp 35.000 ke Rp 42.000 lewat teknik upsell' — ini bukti kontribusi nyata.",
      },
    ],
    cv: {
      nama: "Yusuf Hidayat",
      jabatan: "Kasir — 1,5 Tahun Pengalaman Retail",
      kota: "Depok, Jawa Barat",
      email: "yusuf.hidayat@gmail.com",
      telepon: "0813-4477-8855",
      ringkasan:
        "Kasir retail 1,5 tahun di Alfamart, terbiasa dengan shift pagi/malam, target transaksi, dan handling selisih kas < Rp 5.000 per shift.",
      pengalaman: [
        {
          posisi: "Kasir",
          perusahaan: "Alfamart Cabang Margonda",
          mulai: "April 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Melayani rata-rata 200 transaksi per shift dengan akurasi 99%",
            "Bertanggung jawab atas tutup kas setiap shift, selisih rata-rata < Rp 5.000",
            "Mencapai target upsell 110% selama 3 bulan berturut-turut (Q1 2025)",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "SMA Negeri 12 Depok",
          jurusan: "IPA",
          mulai: "2021",
          selesai: "2024",
        },
      ],
      skill: [
        "Software Moka, Kasir Pintar",
        "Hitung cepat (tanpa kalkulator)",
        "Pelayanan pelanggan",
        "Shift pagi/malam, weekend",
      ],
    },
  },
  {
    slug: "guru",
    judul: "Contoh CV Guru / Pengajar yang Lolos ATS",
    h1: "Contoh CV Guru SD, SMP, SMA, dan Lulusan PPG",
    metaDescription:
      "Contoh CV guru untuk SD, SMP, dan SMA. Cocok untuk fresh graduate PPG, guru honorer, dan yang pindah sekolah swasta.",
    kategori: "Profesional",
    relatedSlugs: ["fresh-graduate-s1", "magang"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV guru biasanya ditulis terlalu fokus ke nama sekolah, tanpa menonjolkan hasil pengajaran. Padahal yang dicari sekolah itu kemampuan mengelola kelas dan metode — bukan sekadar 'mengajar Matematika'.",
      "Kalau kamu baru lulus PPG, magang, atau pindah sekolah — contoh di bawah ini bisa kamu pakai. Fokus ke strategi mengajar dan hasil siswa.",
    ],
    tips: [
      {
        judul: "Tulis mata pelajaran + jenjang secara spesifik",
        isi:
          "'Guru Matematika SMP kelas 7–9' lebih jelas dari 'Guru Matematika'.",
      },
      {
        judul: "Sertakan metode / pendekatan mengajar",
        isi:
          "'Pendekatan PBL untuk kelas 9 menghasilkan kenaikan rata-rata nilai UAS 12 poin' — ini bukti.",
      },
      {
        judul: "Cantumkan sertifikat (PPG, UKMPPG, diklat)",
        isi:
          "HRD sekolah sangat peduli sertifikasi. PPG, diklat, dan workshop harus masuk section 'Sertifikasi'.",
      },
      {
        judul: "Pengalaman les privat / bimbel boleh masuk",
        isi:
          "Selama itu mengajar langsung, itu relevan. Bimbel terkenal seperti Ganesha Operation, Kumon, atau Neutron layak ditulis.",
      },
    ],
    cv: {
      nama: "Nurul Fadilah, S.Pd.",
      jabatan: "Guru Bahasa Indonesia — SMP/MTs",
      kota: "Malang, Jawa Timur",
      email: "nurul.fadilah@email.com",
      telepon: "0852-3344-1122",
      ringkasan:
        "Lulusan S1 Pendidikan Bahasa Indonesia, lulus PPG 2024, terbiasa mengajar kelas 7–9 dengan metode aktif dan teknologi sederhana.",
      pengalaman: [
        {
          posisi: "Guru Magang Bahasa Indonesia",
          perusahaan: "SMPN 3 Malang",
          mulai: "September 2023",
          selesai: "Juni 2024",
          deskripsi: [
            "Mengajar kelas 7–9 (total 120 siswa) dengan metode diskusi kelompok dan games",
            "Membuat modul ajar berdiferensiasi untuk 3 level kemampuan siswa",
            "Meningkatkan rata-rata nilai ulangan harian kelas 9 dari 68 ke 78 dalam 4 bulan",
          ],
        },
        {
          posisi: "Tutor Bahasa Indonesia",
          perusahaan: "Bimbel Cendekia",
          mulai: "Maret 2023",
          selesai: "Agustus 2023",
          deskripsi: [
            "Mengajar kelompok kecil 5–8 siswa untuk persiapan UN",
            "Membuat bank soal 200+ untuk latihan siswa",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Negeri Malang",
          jurusan: "S1 Pendidikan Bahasa Indonesia (IPK 3.78)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Microsoft Word, PowerPoint, Canva",
        "Metode PBL, CTL, diferensiasi",
        "Bahasa Inggris pasif",
        "Google Classroom",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "PPG Bahasa Indonesia 2024 (lulus); Workshop Asesmen Nasional 2023",
        },
      ],
    },
  },
  {
    slug: "bumn",
    judul: "Contoh CV Melamar BUMN (Tes & Wawancara)",
    h1: "Contoh CV BUMN — Lolos Tahap Administrasi dan Interview HRD",
    metaDescription:
      "Contoh CV untuk melamar BUMN. Tips menonjolkan organisasi, IPK, dan bahasa Inggris agar lolos tahap screening HRD.",
    kategori: "Profesional",
    relatedSlugs: ["fresh-graduate-s1", "accounting", "admin"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "BUMN punya dua tantangan CV: harus lolos screening administratif (IPK minimal, format rapi) dan harus menonjol di interview HRD. Kuncinya adalah menonjolkan organisasi, English proficiency, dan leadership.",
      "Contoh di bawah ini menunjukkan struktur yang biasa disukai HRD BUMN — padat, jelas, dan ada angka. Bisa kamu adaptasi untuk bank, telekomunikasi, atau energi.",
    ],
    tips: [
      {
        judul: "Cantumkan IPK kalau di atas 3.25",
        isi:
          "BUMN umumnya minta IPK minimal 3.00. Tulis jelas, jangan disensor.",
      },
      {
        judul: "Pisahkan section 'Pengalaman Organisasi'",
        isi:
          "BUMN sangat suka aktivis organisasi. Jangan campur dengan pengalaman kerja.",
      },
      {
        judul: "Tulis sertifikat bahasa Inggris (TOEFL/IELTS)",
        isi:
          "'TOEFL ITP 550' lebih kuat dari 'English proficiency intermediate'.",
      },
      {
        judul: "Hindari 'fresh graduate yang siap belajar'",
        isi:
          "HRD BUMN sudah bosan. Tulis 'memimpin divisi X untuk event Y, hasil Z'.",
      },
    ],
    cv: {
      nama: "Bayu Setiawan",
      jabatan: "Fresh Graduate S1 — Target BUMN Perbankan",
      kota: "Jakarta Pusat",
      email: "bayu.setiawan@email.com",
      telepon: "0812-1111-2222",
      ringkasan:
        "Lulusan S1 Akuntansi IPK 3.65, TOEFL 567, pengalaman organisasi BEM & kepanitiaan besar. Tertarik di bidang finance / credit analyst.",
      pengalaman: [
        {
          posisi: "Ketua Divisi Acara",
          perusahaan: "BEM Fakultas Ekonomi UI",
          mulai: "Maret 2022",
          selesai: "Februari 2023",
          deskripsi: [
            "Memimpin 18 panitia dalam festival akuntansi nasional 800+ peserta",
            "Mencari sponsorship Rp 250 juta dari 12 sponsor korporat",
            "Koordinasi 3 lintas departemen untuk kelancaran acara 2 hari",
          ],
        },
        {
          posisi: "Magang Finance",
          perusahaan: "Bank XYZ KCP Tangerang",
          mulai: "Juli 2023",
          selesai: "September 2023",
          deskripsi: [
            "Rekap data kredit UMKM 200+ debitur ke Excel",
            "Membantu penyusunan laporan bulanan cabang",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Indonesia",
          jurusan: "S1 Akuntansi (IPK 3.65)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Microsoft Excel (Pivot, VLOOKUP, Macro dasar)",
        "Bahasa Inggris (TOEFL ITP 567)",
        "SAP FICO (dasar)",
        "Public speaking",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "TOEFL ITP 567; Brevet A & B (Pajak); Workshop Financial Modeling 2023",
        },
      ],
    },
  },
  {
    slug: "marketing",
    judul: "Contoh CV Marketing & Digital Marketing yang Lolos ATS",
    h1: "Contoh CV Marketing — Menonjolkan Campaign & Angka",
    metaDescription:
      "Contoh CV marketing, digital marketing, dan social media specialist. Tips menulis campaign dengan angka reach, conversion, dan ROI.",
    kategori: "Profesional",
    relatedSlugs: ["fresh-graduate-s1", "magang", "fresh-graduate-d3"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV marketing yang bagus adalah yang penuh angka: reach, conversion, ROAS, jumlah konten. HRD marketing baca angka dalam 5 detik — kalau tidak ada, kamu langsung disortir ke tumpukan 'bukan yang mereka cari'.",
      "Contoh di bawah ini menggunakan persona social media specialist. Bisa kamu adaptasi untuk performance marketing, content marketing, atau brand marketing.",
    ],
    tips: [
      {
        judul: "Cantumkan tools marketing yang spesifik",
        isi:
          "Meta Business Suite, Google Ads, TikTok Ads, GA4, Mailchimp, Buffer — bukan 'social media tools'.",
      },
      {
        judul: "Tulis campaign dengan hasil (reach/engagement/ROAS)",
        isi:
          "'Campaign launching product: 5 juta reach, 2% CTR, ROAS 3.2x' — itu kalimat emas.",
      },
      {
        judul: "Boleh taruh portofolio link",
        isi:
          "Link Google Drive, Behance, atau website pribadi. Tapi tetap tulis konteksnya di CV.",
      },
      {
        judul: "Hindari 'ahli digital marketing' tanpa bukti",
        isi:
          "Menulis 'ahli' di CV tanpa angka = CV marketing yang ditolak. Lebih baik: 'mengelola 4 akun Instagram brand'.",
      },
    ],
    cv: {
      nama: "Citra Anggraini",
      jabatan: "Digital Marketing Specialist — 2 Tahun Pengalaman",
      kota: "Bandung, Jawa Barat",
      email: "citra.anggraini@email.com",
      telepon: "0812-5566-7788",
      ringkasan:
        "Digital marketing specialist 2 tahun di agency & in-house, fokus Meta & TikTok Ads. Pernah kelola budget Rp 100 juta/bulan dengan ROAS 3.5x.",
      pengalaman: [
        {
          posisi: "Social Media Specialist",
          perusahaan: "PT Kreasi Anak Bangsa",
          mulai: "April 2024",
          selesai: "Sekarang",
          deskripsi: [
            "Mengelola 4 akun Instagram brand fashion, total 250K followers",
            "Campaign launching produk baru: 5 juta reach, 2.1% CTR, ROAS 3.5x",
            "Membuat 60 konten/bulan (reels, carousel, story), efisiensi produksi naik 40%",
          ],
        },
        {
          posisi: "Magang Performance Marketing",
          perusahaan: "Agency ABC",
          mulai: "Juni 2023",
          selesai: "Maret 2024",
          deskripsi: [
            "Setup Meta Ads untuk 5 klien F&B, rata-rata ROAS 2.8x",
            "Bantu buat laporan mingguan via Google Data Studio",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Padjadjaran",
          jurusan: "S1 Ilmu Komunikasi (IPK 3.55)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Meta Ads, TikTok Ads, Google Ads",
        "GA4, Google Data Studio",
        "Canva, CapCut",
        "Copywriting Indonesia & Inggris",
      ],
    },
  },
  {
    slug: "accounting",
    judul: "Contoh CV Accounting & Finance yang Lolos ATS",
    h1: "Contoh CV Accounting — Dari Junior sampai Senior",
    metaDescription:
      "Contoh CV accounting, finance, dan tax. Cocok untuk fresh graduate, junior accountant, dan yang sudah punya pengalaman 2+ tahun.",
    kategori: "Profesional",
    relatedSlugs: ["admin", "fresh-graduate-s1", "fresh-graduate-d3"],
    publishedTime: "2026-08-28T00:00:00+07:00",
    modifiedTime: "2026-08-28T00:00:00+07:00",
    intro: [
      "CV accounting butuh nuansa 'teliti dan angka'. HRD finance sangat sensitif pada typo dan pembulatan angka — kalau CV-nya asal, langsung terlihat kamu tidak teliti. Setiap angka yang ada di CV harus spesifik.",
      "Contoh di bawah ini menggunakan persona junior accountant 2 tahun. Untuk senior, tambahkan sertifikasi CPA/CSP/CA dan leadership di section pengalaman.",
    ],
    tips: [
      {
        judul: "Cantumkan software akunting (bukan 'bisa komputer')",
        isi:
          "Accurate, MYOB, Jurnal, SAP, Xero, QuickBooks — ini wajib untuk accounting.",
      },
      {
        judul: "Tulis 'rekonsiliasi', 'jurnal umum', 'closing bulanan'",
        isi:
          "Ini kata kunci ATS untuk lowongan accounting. Kalau pernah lakukan, tulis.",
      },
      {
        judul: "Sertifikasi Brevet A/B/C, CPA, CA",
        isi:
          "Masuk section 'Sertifikasi'. HRD akunting sangat menyukainya — bahkan lebih dari IPK.",
      },
      {
        judul: "Hindari angka bulat tanpa konteks",
        isi:
          "'Mengelola invoice 500 per bulan' lebih kuat dari 'membantu departemen finance'.",
      },
    ],
    cv: {
      nama: "Hendra Wijaya, S.E.",
      jabatan: "Junior Accountant — 2 Tahun Pengalaman",
      kota: "Semarang, Jawa Tengah",
      email: "hendra.wijaya@email.com",
      telepon: "0813-6655-4433",
      ringkasan:
        "Junior accountant dengan 2 tahun pengalaman di perusahaan distribusi. Familiar Accurate, Jurnal, dan rekonsiliasi bank bulanan.",
      pengalaman: [
        {
          posisi: "Junior Accountant",
          perusahaan: "PT Distribusi Nusantara",
          mulai: "Juni 2023",
          selesai: "Sekarang",
          deskripsi: [
            "Input jurnal umum 150+ transaksi/bulan ke Accurate dengan akurasi 99%",
            "Rekonsiliasi bank 3 rekening perusahaan setiap akhir bulan",
            "Menyusun laporan keuangan bulanan (neraca, laba rugi) untuk direktur",
          ],
        },
      ],
      pendidikan: [
        {
          sekolah: "Universitas Diponegoro",
          jurusan: "S1 Akuntansi (IPK 3.60)",
          mulai: "2019",
          selesai: "2023",
        },
      ],
      skill: [
        "Accurate, Jurnal.id, MYOB",
        "Microsoft Excel (VLOOKUP, Pivot)",
        "Rekonsiliasi bank",
        "Paham PSAK dasar",
      ],
      tambahan: [
        {
          judul: "Sertifikasi",
          isi: "Brevet A & B (Pajak); Workshop PSAK 2024",
        },
      ],
    },
  },
];

export function getContohBySlug(slug: string): ContohCV | undefined {
  return CONTOH_CV_LIST.find((c) => c.slug === slug);
}

export function getRelated(cv: ContohCV): ContohCV[] {
  return cv.relatedSlugs
    .map((s) => CONTOH_CV_LIST.find((c) => c.slug === s))
    .filter((c): c is ContohCV => Boolean(c));
}
