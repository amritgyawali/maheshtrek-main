import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Band, { BandHeading } from "@/components/Band";
import Prose from "@/components/Prose";
import Bullets from "@/components/Bullets";
import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
import Glow from "@/components/Glow";
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

  const hasBullets = Boolean(section.bullets && section.bullets.length > 0);

  return (
    <>
      <PageHeader
        lang={lang}
        eyebrow={section.eyebrow}
        title={section.title}
        lead={section.lead}
        homeLabel={dict.siteName}
      />

      {/* The lead panel sits beside the capability grid when there is one, and
          narrows to a readable column when there is not — a full-bleed panel
          holding one 66ch paragraph leaves half a surface empty. */}
      <Band tone="raised" ariaLabel={section.title}>
        <div
          className={
            hasBullets ? "grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" : ""
          }
        >
          <Reveal>
            <div className={`panel panel-lip h-full p-7 md:p-12 ${hasBullets ? "" : "max-w-4xl"}`}>
              <Prose block={section.body} draftLabel={dict.ui.draftBadge} size="lg" />
            </div>
          </Reveal>

          {hasBullets && <Bullets items={section.bullets ?? []} className="sm:grid-cols-1" />}
        </div>
      </Band>

      {/* All subsections share one band: a band each would stack two full
          section paddings between every pair of them. */}
      {section.subsections && section.subsections.length > 0 && (
        <Band>
          <div className="space-y-20 md:space-y-28">
            {section.subsections.map((subsection) => (
              <div key={subsection.id} id={subsection.id} className="scroll-mt-28">
                {/* No counter: the parts of a service page are facets of it,
                    not stages, and numbering would claim an order it lacks. */}
                <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
                  <BandHeading title={subsection.title} lead={subsection.lead} />
                  <Reveal>
                    <Prose block={subsection.body} draftLabel={dict.ui.draftBadge} />
                    {subsection.bullets && subsection.bullets.length > 0 && (
                      <Bullets items={subsection.bullets} className="mt-8" />
                    )}
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </Band>
      )}

      {section.cta && (
        <Band tone="raised">
          <Reveal>
            <div className="panel panel-lip relative isolate overflow-hidden px-7 py-12 md:px-12 md:py-16">
              <Glow tone="accent" className="-right-28 -top-28 h-[460px] w-[460px] opacity-50" />
              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-xl">
                  <h2 className="font-display text-headline-sm text-content">
                    {dict.home.contactHeading}
                  </h2>
                  <p className="mt-4 text-body-md text-content-dim">{dict.home.contactLead}</p>
                </div>
                <CtaButton lang={lang} cta={section.cta} />
              </div>
            </div>
          </Reveal>
        </Band>
      )}
    </>
  );
}
