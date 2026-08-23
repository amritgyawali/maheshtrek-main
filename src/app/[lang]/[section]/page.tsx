import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Band, { BandHeading } from "@/components/Band";
import Prose from "@/components/Prose";
import Bullets from "@/components/Bullets";
import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
import { allSectionSlugs, getDictionary, getSection } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * One renderer for every content section. Pages differ by data, not by code —
 * adding a service page means adding an entry to `src/content/{ne,en}.ts`.
 * `/[lang]/contact` has its own static route and takes precedence over this
 * dynamic segment.
 */
export function generateStaticParams() {
  return locales.flatMap((lang) => allSectionSlugs().map((section) => ({ lang, section })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}): Promise<Metadata> {
  const { lang, section: slug } = await params;
  if (!isLocale(lang)) return {};

  const section = getSection(lang, slug);
  if (!section) return {};

  return buildMetadata({
    lang,
    title: section.title,
    description: section.lead,
    path: section.slug,
  });
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang, section: slug } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const section = getSection(lang, slug);
  if (!section) notFound();

  return (
    <>
      <PageHeader
        lang={lang}
        eyebrow={section.eyebrow}
        title={section.title}
        lead={section.lead}
        homeLabel={dict.siteName}
      />

      <Band tone="paper">
        <Reveal>
          <Prose block={section.body} draftLabel={dict.ui.draftBadge} size="lg" />
        </Reveal>

        {section.bullets && section.bullets.length > 0 && (
          <Bullets items={section.bullets} className="mt-14" />
        )}
      </Band>

      {section.subsections?.map((subsection, index) => (
        <Band
          key={subsection.id}
          id={subsection.id}
          tone={index % 2 === 0 ? "mist" : "paper"}
          className="scroll-mt-24"
        >
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <BandHeading
              eyebrow={String(index + 1).padStart(2, "0")}
              title={subsection.title}
              lead={subsection.lead}
              tone={index % 2 === 0 ? "mist" : "paper"}
            />
            <Reveal>
              <Prose block={subsection.body} draftLabel={dict.ui.draftBadge} />
              {subsection.bullets && subsection.bullets.length > 0 && (
                <Bullets items={subsection.bullets} className="mt-10" />
              )}
            </Reveal>
          </div>
        </Band>
      ))}

      {section.cta && (
        <Band tone="ink">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <BandHeading tone="ink" title={dict.home.contactHeading} lead={dict.home.contactLead} />
            <CtaButton lang={lang} cta={section.cta} />
          </div>
        </Band>
      )}
    </>
  );
}
