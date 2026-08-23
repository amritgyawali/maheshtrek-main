import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/Hero";
import Band, { BandHeading } from "@/components/Band";
import Prose from "@/components/Prose";
import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
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
  const { home, ui } = dict;

  return (
    <>
      <Hero lang={lang} home={home} />

      <Band tone="paper">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <BandHeading eyebrow={ui.navHeading} title={home.introHeading} />
          <Reveal>
            <Prose block={home.intro} draftLabel={ui.draftBadge} size="lg" />
            <CtaButton
              lang={lang}
              cta={{ label: ui.readMore, href: "about" }}
              variant="outline"
              className="mt-8"
            />
          </Reveal>
        </div>
      </Band>

      <Band tone="mist">
        <BandHeading eyebrow={home.heroEyebrow} title={home.whatWeDoHeading} lead={home.whatWeDoLead} />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {home.cards.map((card, index) => (
            <li key={card.slug}>
              <Reveal delay={index * 70} className="h-full">
                <Link
                  href={href(lang, card.slug)}
                  className="group flex h-full flex-col rounded-xl border border-line bg-paper p-8 shadow-card transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lift"
                >
                  <span className="text-overline uppercase text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-title-md text-ink">{card.title}</h3>
                  <p className="mt-3 text-body-sm text-body">{card.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-brand">
                    {ui.readMore}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Band>

      {/* The source document asks for a direct click-through to Right Sanchar. */}
      <Band tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <BandHeading
            tone="ink"
            eyebrow={siteConfig.rightSanchar.display}
            title={home.sancharHeading}
            lead={home.sancharLead}
          />
          <div className="md:justify-self-end">
            <CtaButton lang={lang} cta={home.sancharCta} />
          </div>
        </div>
      </Band>

      <Band tone="paper" id="contact-preview">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <BandHeading eyebrow={ui.contactHeading} title={home.contactHeading} lead={home.contactLead} />
            <CtaButton
              lang={lang}
              cta={{ label: ui.emailUs, href: `mailto:${siteConfig.email}` }}
              className="mt-8"
            />
          </div>
          <ContactDetails lang={lang} contact={dict.contact} />
        </div>
      </Band>
    </>
  );
}
