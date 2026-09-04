import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Band, { BandHeading } from "@/components/Band";
import Prose from "@/components/Prose";
import Bullets from "@/components/Bullets";
import ProcessList from "@/components/ProcessList";
import Faqs from "@/components/Faqs";
import ServiceGrid from "@/components/ServiceGrid";
import MediaFigure from "@/components/MediaFigure";
import VideoBlock from "@/components/VideoBlock";
import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
import Glow from "@/components/Glow";
import PageJsonLd from "@/components/PageJsonLd";
import { allSectionSlugs, getDictionary, getSection, servicesInCategory } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbList,
  faqPage,
  graph,
  itemList,
  service as serviceNode,
  videoObject,
  webPage,
  type Crumb,
} from "@/lib/schema";

/**
 * One renderer for every content section, including the four service
 * categories. Pages differ by data, not by code — adding a section means
 * adding an entry to `src/content/{ne,en}.ts`, and adding a service under a
 * category means adding one to `src/content/services.{ne,en}.ts`.
 *
 * `/[lang]/contact` and `/[lang]/services` have their own static routes and
 * take precedence over this dynamic segment.
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
    title: section.metaTitle ?? section.title,
    description: section.metaDescription ?? section.lead,
    path: section.slug,
    keywords: section.keywords,
    titleAbsolute: true,
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

  const { ui } = dict;
  const leaves = section.isServiceCategory ? servicesInCategory(lang, section.slug) : [];
  const hasBullets = Boolean(section.bullets && section.bullets.length > 0);

  // A category hangs under the services hub; a company page hangs off the root.
  const trail: Crumb[] = section.isServiceCategory
    ? [
        { name: dict.servicesHub.title, path: "services" },
        { name: section.navLabel, path: section.slug },
      ]
    : [{ name: section.navLabel, path: section.slug }];

  const nodes = graph([
    webPage({
      lang,
      path: section.slug,
      title: section.metaTitle ?? section.title,
      description: section.metaDescription ?? section.lead,
      image: section.media?.image,
      trail,
    }),
    breadcrumbList(lang, dict.siteName, trail),
    section.isServiceCategory
      ? serviceNode({
          lang,
          path: section.slug,
          name: section.title,
          description: section.metaDescription ?? section.lead,
          serviceType: section.navLabel,
          image: section.media?.image,
          offers: leaves.map((leaf) => ({ name: leaf.title, description: leaf.lead })),
        })
      : undefined,
    leaves.length > 0
      ? itemList(
          lang,
          section.slug,
          section.title,
          leaves.map((leaf) => ({
            name: leaf.title,
            path: `${leaf.category}/${leaf.slug}`,
            description: leaf.lead,
          }))
        )
      : undefined,
    section.faqs ? faqPage(lang, section.slug, section.faqs) : undefined,
    videoObject(section.media?.video),
  ]);

  return (
    <>
      <PageHeader
        lang={lang}
        eyebrow={section.eyebrow}
        title={section.title}
        lead={section.lead}
        homeLabel={dict.siteName}
        breadcrumbLabel={ui.breadcrumbLabel}
        trail={trail}
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
              <Prose block={section.body} draftLabel={ui.draftBadge} size="lg" />
            </div>
          </Reveal>

          {hasBullets && <Bullets items={section.bullets ?? []} className="sm:grid-cols-1" />}
        </div>

        {section.media && (
          <Reveal className="mt-4">
            <MediaFigure image={section.media.image} />
          </Reveal>
        )}

        {section.media?.video && (
          <Reveal className="mt-4">
            <VideoBlock video={section.media.video} label={ui.watchLabel} />
          </Reveal>
        )}
      </Band>

      {/* Every leaf page in the department, each its own URL. */}
      {leaves.length > 0 && (
        <Band ariaLabel={ui.servicesHeading}>
          <BandHeading
            eyebrow={ui.servicesHeading}
            title={section.navLabel}
            lead={ui.relatedLead}
          />
          <ServiceGrid lang={lang} services={leaves} action={ui.readMore} className="mt-12" />
        </Band>
      )}

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
                    <Prose block={subsection.body} draftLabel={ui.draftBadge} />
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

      {section.process && section.process.length > 0 && (
        <Band tone="raised" ariaLabel={ui.processHeading}>
          <BandHeading title={ui.processHeading} />
          <ProcessList steps={section.process} className="mt-12" />
        </Band>
      )}

      {section.faqs && section.faqs.length > 0 && (
        <Band ariaLabel={ui.faqHeading}>
          <BandHeading title={ui.faqHeading} />
          <Faqs items={section.faqs} className="mt-10 max-w-3xl" />
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

      <PageJsonLd nodes={nodes} />
    </>
  );
}
