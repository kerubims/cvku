import type { Metadata } from "next";
import { FeedbackAdminClient } from "./client";

export const metadata: Metadata = {
  title: "Admin — Feedback",
  robots: { index: false, follow: false },
};

export default function AdminFeedbackPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Feedback masuk
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Masukan dari user CVKu. Diperbarui otomatis setiap 30 detik.
        </p>
      </header>
      <FeedbackAdminClient />
    </main>
  );
}
