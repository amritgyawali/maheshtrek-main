import CtaButton from "./CtaButton";
import Glow from "./Glow";
import type { Locale } from "@/lib/i18n";
import type { Home } from "@/content/types";

/**
 * Home hero.
 *
 * The client has supplied no photography, so the visual layer is light: two
 * drifting radial sources behind a faint engineering grid, with the type
 * sitting in front of them. Nothing here is a placeholder waiting to be
 * swapped for a stock image — the glow is the image.
 */
export default function Hero({ lang, home }: { lang: Locale; home: Home }) {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-14 md:pb-16 md:pt-20">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-60" />
      <Glow tone="accent" drift className="-left-40 -top-32 h-[560px] w-[560px] opacity-55" />
      <Glow tone="iris" drift className="-right-52 top-6 h-[620px] w-[620px] opacity-45" />

      <div className="container-page">
        <p className="chip hangs" style={{ animationDelay: "120ms" }}>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint"
          />
          {home.heroEyebrow}
        </p>

        <h1
          className="hangs mt-8 max-w-[18ch] font-display text-display-sm text-gradient md:text-display-lg"
          style={{ animationDelay: "220ms" }}
        >
          {home.heroTitle}
        </h1>

        <p
          className="hangs mt-7 max-w-2xl text-body-lg text-content-dim"
          style={{ animationDelay: "340ms" }}
        >
          {home.heroLead}
        </p>

        <div className="hangs mt-10 flex flex-wrap gap-3" style={{ animationDelay: "440ms" }}>
          <CtaButton lang={lang} cta={home.heroPrimaryCta} />
          <CtaButton lang={lang} cta={home.heroSecondaryCta} variant="outline" />
        </div>

        <ul className="hangs mt-12 flex flex-wrap gap-2.5" style={{ animationDelay: "560ms" }}>
          {home.tickerItems.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
