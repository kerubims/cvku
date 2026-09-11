import { FaqAccordion } from "@/components/faq-accordion";
import { FAQS } from "@/lib/seo/schemas";

export function FaqSection() {
  return (
    <section className="py-20 bg-white border-b border-surface-border" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="text-center mb-16 reveal-init"
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
        >
          <span className="text-brand-700 font-bold uppercase tracking-wider text-xs block mb-2">Punya Pertanyaan?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Semua hal yang perlu kamu ketahui tentang format ATS dan layanan CVKu.
          </p>
        </div>

        <div 
          className="reveal-init"
          style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
        >
          <FaqAccordion items={FAQS} groupId="landing-faq" />
        </div>
      </div>
    </section>
  );
}
