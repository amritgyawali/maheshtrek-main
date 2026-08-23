import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Band, { BandHeading } from "@/components/Band";
import BentoTile from "@/components/BentoTile";
import Prose from "@/components/Prose";
import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
import Glow from "@/components/Glow";
import SignalMeter from "@/components/SignalMeter";
import ContactDetails from "@/components/ContactDetails";
import { getDictionary } from "@/content";
import { href, isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    ...buildMetadata({
      lang,
      title: dict.metaTitle,
      description: dict.metaDescription,
      keywords: dict.keywords,
    }),
    // The home page keeps the full title rather than the "%s — site" template.
    title: { absolute: dict.metaTitle },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { home, ui, contact } = dict;

  const [portal, ...rest] = home.cards;
  const address = lang === "ne" ? siteConfig.address.fullNe : siteConfig.address.full;
  const days = lang === "ne" ? siteConfig.hours.daysNe : siteConfig.hours.days;

  // Each service gets a cell; the two smaller spans balance the feature tile.
  const spans = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];

  return (
    <>
      <Hero lang={lang} home={home} />

      <Band ariaLabel={home.whatWeDoHeading}>
        <BandHeading title={home.whatWeDoHeading} lead={home.whatWeDoLead} />

        <div className="mt-12 grid gap-4 lg:auto-rows-[minmax(190px,auto)] lg:grid-cols-6">
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <BentoTile
              featured
              href={href(lang, portal.slug)}
              label={ui.portalTagline}
              title={portal.title}
              text={portal.text}
              action={ui.readMore}
              className="h-full"
            >
              <p className="mt-6 inline-flex items-center gap-2.5 font-mono text-body-sm text-content">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 animate-pulse-dot rounded-full bg-mint"
                />
                {siteConfig.rightSanchar.display}
              </p>

              <SignalMeter className="mt-9 h-24 w-full max-w-sm opacity-80" />
            </BentoTile>
          </Reveal>

          {rest.map((card, index) => (
            <Reveal key={card.slug} delay={(index + 1) * 70} className={spans[index]}>
              <BentoTile
                href={href(lang, card.slug)}
                title={card.title}
                text={card.text}
                action={ui.readMore}
                className="h-full"
              />
            </Reveal>
          ))}

          <Reveal delay={280} className="lg:col-span-3">
            <BentoTile
              href={href(lang, "contact")}
              label={contact.labels.address}
              title={address}
              action={ui.contactHeading}
              className="h-full"
            >
              <p className="mt-3 font-mono text-body-sm text-content-dim">
                {days}, {siteConfig.hours.time}
              </p>
            </BentoTile>
          </Reveal>
        </div>
      </Band>

      <Band tone="raised" ariaLabel={home.introHeading}>
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          <div>
            <BandHeading title={home.introHeading} />
            <CtaButton
              lang={lang}
              cta={{ label: ui.readMore, href: "about" }}
              variant="outline"
              className="mt-9"
            />
          </div>
          <Reveal>
            <Prose block={home.intro} draftLabel={ui.draftBadge} size="lg" />
          </Reveal>
        </div>
      </Band>

      {/* The source document asks for a direct click-through to Right Sanchar. */}
      <Band ariaLabel={home.sancharHeading}>
        <Reveal>
          <div className="panel panel-lip relative isolate overflow-hidden px-7 py-14 md:px-14 md:py-20">
            <Glow tone="accent" className="-right-32 -top-32 h-[560px] w-[560px] opacity-55" />
            <Glow tone="iris" className="-bottom-40 -left-32 h-[520px] w-[520px] opacity-45" />

            <div className="relative grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="label-accent">{siteConfig.rightSanchar.display}</p>
                <h2 className="mt-4 font-display text-headline-sm text-content md:text-headline-md">
                  {home.sancharHeading}
                </h2>
                <p className="mt-5 max-w-xl text-body-md text-content-dim">{home.sancharLead}</p>
              </div>
              <div className="md:justify-self-end">
                <CtaButton lang={lang} cta={home.sancharCta} />
              </div>
            </div>
          </div>
        </Reveal>
      </Band>

      <Band tone="raised" id="contact-preview">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <BandHeading eyebrow={ui.contactHeading} title={home.contactHeading} lead={home.contactLead} />
            <CtaButton
              lang={lang}
              cta={{ label: ui.emailUs, href: `mailto:${siteConfig.email}` }}
              className="mt-9"
            />
          </div>
          <ContactDetails lang={lang} contact={contact} />
        </div>
      </Band>
    </>
  );
}
