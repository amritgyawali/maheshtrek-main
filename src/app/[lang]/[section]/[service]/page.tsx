import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Band, { BandHeading } from "@/components/Band";
import Prose, { DraftBadge } from "@/components/Prose";
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
import {
  allServiceParams,
  getDictionary,
  getSection,
  getService,
  servicesInCategory,
} from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbList,
  faqPage,
  graph,
  service as serviceNode,
  videoObject,
  webPage,
  type Crumb,
} from "@/lib/schema";

/**
 * A single service, at `/[lang]/[category]/[slug]` — `/ne/production/biography`.
 *
 * The URL is hierarchical rather than flat so the department is in the path:
 * the category page is the parent every leaf links back to, and search engines
 * read the two as one cluster instead of sixteen unrelated pages.
 */
export function generateStaticParams() {
  return locales.flatMap((lang) => allServiceParams().map((entry) => ({ lang, ...entry })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string; service: string }>;
}): Promise<Metadata> {
  const { lang, section, service: slug } = await params;
  if (!isLocale(lang)) return {};

  const page = getService(lang, slug);
  if (!page || page.category !== section) return {};

  return buildMetadata({
    lang,
    title: page.metaTitle,
    description: page.metaDescription,
    path: `${page.category}/${page.slug}`,
    keywords: page.keywords,
    titleAbsolute: true,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; section: string; service: string }>;
}) {
  const { lang, section: categorySlug, service: slug } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const page = getService(lang, slug);
  // The category has to match the URL, or the same page would be reachable at
  // `/training/biography` as well as `/production/biography`.
  if (!page || page.category !== categorySlug) notFound();

  const category = getSection(lang, page.category);
  if (!category) notFound();

  const { ui } = dict;
  const path = `${page.category}/${page.slug}`;
  const siblings = servicesInCategory(lang, page.category).filter(
    (item) => item.slug !== page.slug
  );

  const trail: Crumb[] = [
    { name: dict.servicesHub.title, path: "services" },
    { name: category.navLabel, path: category.slug },
    { name: page.navLabel, path },
  ];

  const nodes = graph([
    webPage({
      lang,
      path,
      title: page.metaTitle,
      description: page.metaDescription,
      image: page.media.image,
      trail,
    }),
    breadcrumbList(lang, dict.siteName, trail),
    serviceNode({
      lang,
      path,
      name: page.title,
      description: page.metaDescription,
      serviceType: category.navLabel,
      image: page.media.image,
      offers: page.deliverables.map((item) => ({ name: item.title, description: item.text })),
    }),
    faqPage(lang, path, page.faqs),
    videoObject(page.media.video),
  ]);

  return (
    <>
      <PageHeader
        lang={lang}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        homeLabel={dict.siteName}
        breadcrumbLabel={ui.breadcrumbLabel}
        trail={trail}
      />

      <Band tone="raised" ariaLabel={page.title}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="panel panel-lip h-full p-7 md:p-10">
              <Prose block={page.body} draftLabel={ui.draftBadge} size="lg" />
              <CtaButton lang={lang} cta={page.cta} className="mt-9" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <MediaFigure image={page.media.image} priority />
          </Reveal>
        </div>

        {page.media.video && (
          <Reveal className="mt-4">
            <VideoBlock video={page.media.video} label={ui.watchLabel} />
          </Reveal>
        )}
      </Band>

      <Band ariaLabel={ui.deliverablesHeading}>
        <BandHeading eyebrow={category.navLabel} title={ui.deliverablesHeading} />
        <DraftBadge status={page.supportStatus} label={ui.draftBadge} />
        <Bullets items={page.deliverables} className="mt-12 lg:grid-cols-4" />
      </Band>

      {page.process && page.process.length > 0 && (
        <Band tone="raised" ariaLabel={ui.processHeading}>
          <BandHeading title={ui.processHeading} />
          <ProcessList steps={page.process} className="mt-12" />
        </Band>
      )}

      <Band ariaLabel={ui.faqHeading}>
        <BandHeading title={ui.faqHeading} />
        <Faqs items={page.faqs} className="mt-10 max-w-3xl" />
      </Band>

      {siblings.length > 0 && (
        <Band tone="raised" ariaLabel={ui.relatedHeading}>
          <BandHeading title={ui.relatedHeading} lead={ui.relatedLead} />
          <ServiceGrid lang={lang} services={siblings} action={ui.readMore} className="mt-12" />
        </Band>
      )}

      <Band>
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
              <CtaButton lang={lang} cta={page.cta} />
            </div>
          </div>
        </Reveal>
      </Band>

      <PageJsonLd nodes={nodes} />
    </>
  );
}
