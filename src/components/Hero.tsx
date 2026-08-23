import CtaButton from "./CtaButton";
import type { Locale } from "@/lib/i18n";
import type { Home } from "@/content/types";

/**
 * Home hero. Text-first on purpose: the client has supplied no photography
 * yet, so the composition leans on type, the ink ground, and a marquee of the
 * company's own service words instead of a placeholder stock image.
 */
export default function Hero({ lang, home }: { lang: Locale; home: Home }) {
  const marquee = [...home.tickerItems, ...home.tickerItems];

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Soft brand glow, purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container-page relative py-20 md:py-28">
        <p className="text-overline uppercase text-brand-light">{home.heroEyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-display text-display-sm md:text-display-lg">{home.heroTitle}</h1>
        <p className="mt-6 max-w-2xl text-body-lg text-body-invert">{home.heroLead}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <CtaButton lang={lang} cta={home.heroPrimaryCta} />
          <CtaButton lang={lang} cta={home.heroSecondaryCta} variant="ghost" />
        </div>
      </div>

      <div className="relative border-t border-line-dark py-4" aria-hidden="true">
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap pr-10 text-body-sm text-body-invert">
          {marquee.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10">
              {item}
              <span className="h-1 w-1 rounded-full bg-brand" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
