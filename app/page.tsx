import Link from "next/link";
import { RevealObserver } from "./_components/reveal-observer";
import { HeroSection } from "./_components/hero-section";
import { ProblemSection } from "./_components/problem-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { AuditSection } from "./_components/audit-section";
import { ComparisonSection } from "./_components/comparison-section";
import { FaqSection } from "./_components/faq-section";
import { CtaBanner } from "./_components/cta-banner";
import { LandingFooter } from "./_components/footer";

export const dynamic = "force-static";

const navLinks = [
  { href: "/buat", label: "Bikin CV" },
  { href: "/ats-checker", label: "Cek Skor ATS" },
  { href: "/contoh-cv", label: "Contoh CV" },
  { href: "/artikel", label: "Artikel Blog" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-emerald-500 selection:text-white">
      <RevealObserver />

      {/* Header / Navbar - Logo & Style Dipertahankan */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-surface-border">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-slate-900"
              aria-label="CVKu, ke beranda"
            >
              CV<span className="text-emerald-700">Ku</span>
            </Link>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              100% Gratis &amp; Terbuka
            </span>
          </div>

          <nav
            className="hidden items-center gap-6 md:flex text-sm font-semibold text-slate-700"
            aria-label="Menu utama"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition hover:text-emerald-700"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/ats-checker"
              className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-emerald-700 px-3 py-2 transition"
            >
              Cek Skor
            </Link>
            <Link
              href="/buat"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800 active:scale-[0.98] shadow-sm"
            >
              Bikin CV Gratis
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Strip */}
        <nav
          className="flex items-center gap-2 overflow-x-auto border-t border-surface-border bg-white/80 px-4 py-2 md:hidden text-xs font-medium text-slate-700"
          aria-label="Menu seluler"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Landing Sections */}
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <AuditSection />
        <ComparisonSection />
        <FaqSection />
        <CtaBanner />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}