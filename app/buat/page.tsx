import type { Metadata } from "next";
import { Builder } from "../_components/builder";

export const metadata: Metadata = {
  title: "Buat CV - CVKu",
  robots: { index: false },
};

export default function BuatPage() {
  return (
    <main className="min-h-[100dvh] bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
          <a href="/" className="text-lg font-bold tracking-tight">
            CV<span className="text-emerald-700">Ku</span>
          </a>
          <span className="text-xs text-zinc-400">Data tersimpan otomatis di perangkat sesi ini</span>
        </div>
      </header>
      <Builder />
    </main>
  );
}
