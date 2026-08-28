import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi CVKu — bagaimana kami menyimpan, melindungi, dan menggunakan data CV Anda.",
  alternates: {
    canonical: "/privasi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16 prose prose-zinc max-w-none">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-6 not-prose">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="hover:text-zinc-900">Beranda</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700">Kebijakan Privasi</li>
        </ol>
      </nav>

      <h1>Kebijakan Privasi CVKu</h1>
      <p className="text-sm text-zinc-500">
        Terakhir diperbarui: 28 Agustus 2026
      </p>

      <p>
        CVKu (selanjutnya "kami") menghargai privasi Anda. Halaman ini menjelaskan
        data apa yang kami kumpulkan, bagaimana kami menggunakannya, dan hak-hak
        Anda sebagai pengguna.
      </p>

      <h2>1. Data yang Kami Kumpulkan</h2>
      <p>Kami hanya mengumpulkan data yang Anda masukkan secara sukarela ke dalam CV:</p>
      <ul>
        <li>Data pribadi: nama lengkap, jabatan, email, nomor telepon, kota domisili</li>
        <li>Data profesional: pengalaman kerja, pendidikan, skill, sertifikasi, proyek, organisasi, bahasa</li>
        <li>Ringkasan profil yang Anda tulis sendiri</li>
      </ul>
      <p>
        <strong>Cookie anonim:</strong> Kami menyimpan satu cookie berisi token acak
        (UUID) di browser Anda untuk mengenali sesi Anda sehingga draft CV Anda
        tersimpan antar kunjungan. Kami tidak menggunakan cookie iklan atau
        pelacakan lintas-situs.
      </p>

      <h2>2. Bagaimana Kami Menggunakan Data</h2>
      <ul>
        <li>Menyimpan draft CV Anda agar bisa diedit lagi lain kali</li>
        <li>Menghasilkan file PDF ketika Anda meminta download</li>
        <li>(Opsional) Mengirimkan permintaan ke AI helper untuk merapikan deskripsi — hanya teks yang Anda pilih, bukan seluruh CV</li>
      </ul>
      <p>
        <strong>Kami tidak pernah:</strong> menjual data Anda, mengirimkannya ke
        pihak ketiga untuk pemasaran, atau menampilkan iklan bertarget.
      </p>

      <h2>3. AI Writing Assist</h2>
      <p>
        Saat Anda menekan tombol "Bantu tulis dengan AI", kami mengirim teks
        yang Anda pilih (misalnya deskripsi pengalaman) ke model AI (saat ini
        Novita AI Llama 3.1) untuk dirapikan. Kami tidak mengirim seluruh CV
        Anda. Teks yang dikirim digunakan hanya untuk menghasilkan saran dan
        tidak disimpan oleh penyedia AI untuk pelatihan.
      </p>
      <p className="rounded-lg bg-amber-50 border border-amber-200 p-4 not-prose text-sm">
        ⚠️ <strong>Disclaimer:</strong> Hasil dari AI dapat mengandung informasi
        yang tidak akurat. Mohon selalu tinjau ulang dan sesuaikan dengan
        pengalaman Anda yang sebenarnya sebelum menggunakan CV.
      </p>

      <h2>4. Penyimpanan & Retensi</h2>
      <ul>
        <li>Data disimpan di server kami (PostgreSQL) yang berlokasi di Indonesia</li>
        <li>
          Kami menghapus CV secara otomatis setelah <strong>12 bulan</strong>{" "}
          tidak ada aktivitas dari sesi Anda
        </li>
        <li>
          Anda bisa menghapus data kapan pun dengan menekan tombol "Hapus CV Saya"
          (akan kami sediakan) atau menghubungi kami via email
        </li>
      </ul>

      <h2>5. Keamanan</h2>
      <p>
        Kami menerapkan langkah-langkah keamanan standar industri: koneksi HTTPS
        terenkripsi, cookie httpOnly (tidak bisa diakses JavaScript berbahaya),
        dan akses database dibatasi ke server aplikasi saja.
      </p>

      <h2>6. Hak Anda</h2>
      <p>Anda berhak untuk:</p>
      <ul>
        <li>Mengakses seluruh data CV Anda (cukup buka halaman{" "}
          <Link href="/buat">Buat CV</Link>)</li>
        <li>Meminta penghapusan data — email ke <em>privacy@cvku.id</em></li>
        <li>Mengunduh CV Anda dalam format PDF kapan saja</li>
      </ul>

      <h2>7. Perubahan Kebijakan</h2>
      <p>
        Jika kami memperbarui kebijakan ini, kami akan menampilkan banner
        pemberitahuan di halaman Buat selama 14 hari dan mengubah tanggal
        pembaruan di atas.
      </p>

      <h2>8. Kontak</h2>
      <p>
        Pertanyaan soal privasi? Email: <em>privacy@cvku.id</em>
      </p>

      <hr className="not-prose" />
      <p className="text-sm text-zinc-500 not-prose">
        Lihat juga:{" "}
        <Link href="/contoh-cv">Contoh CV</Link> ·{" "}
        <Link href="/buat">Buat CV</Link>
      </p>
    </main>
  );
}
