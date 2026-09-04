import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Band, { BandHeading } from "@/components/Band";
import BentoTile from "@/components/BentoTile";
import Prose from "@/components/Prose";
import Faqs from "@/components/Faqs";
import ServiceGrid from "@/components/ServiceGrid";
import MediaFigure from "@/components/MediaFigure";
import VideoBlock from "@/components/VideoBlock";
import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
import Glow from "@/components/Glow";
import PageJsonLd from "@/components/PageJsonLd";
import {
  SERVICES_HUB_SLUG,
  getDictionary,
  serviceCategories,
  servicesInCategory,
} from "@/content";
import { href, isLocale, locales } from "@/lib/i18n";
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
 * The services hub: the one page that shows the whole scope of work.
 *
 * It is a static route, so it wins over `[section]` — `services` is not a
 * `Section` and has no entry in the dictionaries' section list. Every category
 * and every leaf page is linked from here, which is what makes this the page
 * search engines are meant to land on for a broad query.
 */
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

  const { servicesHub } = getDictionary(lang);

  return buildMetadata({
    lang,
    title: servicesHub.metaTitle,
    description: servicesHub.metaDescription,
    path: SERVICES_HUB_SLUG,
    keywords: servicesHub.keywords,
    titleAbsolute: true,
  });
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { ui, servicesHub } = dict;
  const categories = serviceCategories(lang);
  const everyService = dict.services;

  const trail: Crumb[] = [{ name: servicesHub.title, path: SERVICES_HUB_SLUG }];

  const nodes = graph([
    webPage({
      lang,
      path: SERVICES_HUB_SLUG,
      title: servicesHub.metaTitle,
      description: servicesHub.metaDescription,
      image: servicesHub.media.image,
      trail,
    }),
    breadcrumbList(lang, dict.siteName, trail),
    serviceNode({
      lang,
      path: SERVICES_HUB_SLUG,
      name: servicesHub.title,
      description: servicesHub.metaDescription,
      serviceType: servicesHub.eyebrow,
      image: servicesHub.media.image,
      offers: everyService.map((item) => ({ name: item.title, description: item.lead })),
    }),
    itemList(
      lang,
      SERVICES_HUB_SLUG,
      servicesHub.allServicesHeading,
      everyService.map((item) => ({
        name: item.title,
        path: `${item.category}/${item.slug}`,
        description: item.lead,
      }))
    ),
    faqPage(lang, SERVICES_HUB_SLUG, servicesHub.faqs),
    videoObject(servicesHub.media.video),
  ]);

  return (
    <>
      <PageHeader
        lang={lang}
        eyebrow={servicesHub.eyebrow}
        title={servicesHub.title}
        lead={servicesHub.lead}
        homeLabel={dict.siteName}
        breadcrumbLabel={ui.breadcrumbLabel}
        trail={trail}
      />

      <Band tone="raised" ariaLabel={servicesHub.title}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="panel panel-lip h-full p-7 md:p-10">
              <Prose block={servicesHub.body} draftLabel={ui.draftBadge} size="lg" />
              <CtaButton lang={lang} cta={servicesHub.cta} className="mt-9" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <MediaFigure image={servicesHub.media.image} priority />
          </Reveal>
        </div>

        {servicesHub.media.video && (
          <Reveal className="mt-4">
            <VideoBlock video={servicesHub.media.video} label={ui.watchLabel} />
          </Reveal>
        )}
      </Band>

      {/* The four departments, each its own page. */}
      <Band ariaLabel={ui.servicesHeading}>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={category.slug} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <BentoTile
                  href={href(lang, category.slug)}
                  label={`${servicesInCategory(lang, category.slug).length} ${ui.servicesHeading}`}
                  title={category.navLabel}
                  text={category.lead}
                  action={ui.exploreLabel}
                  className="h-full"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Band>

      {/* Then every leaf page, grouped under the department it belongs to. */}
      <Band tone="raised" ariaLabel={servicesHub.allServicesHeading}>
        <BandHeading
          eyebrow={ui.allServicesLabel}
          title={servicesHub.allServicesHeading}
          lead={servicesHub.allServicesLead}
        />

        <div className="mt-14 space-y-16">
          {categories.map((category) => (
            <div key={category.slug} id={category.slug} className="scroll-mt-28">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-headline-sm text-content">
                  {category.navLabel}
                </h3>
                <CtaButton
                  lang={lang}
                  cta={{ label: ui.exploreLabel, href: category.slug }}
                  variant="ghost"
                />
              </div>
              <ServiceGrid
                lang={lang}
                services={servicesInCategory(lang, category.slug)}
                action={ui.readMore}
                className="mt-7"
              />
            </div>
          ))}
        </div>
      </Band>

      <Band ariaLabel={ui.faqHeading}>
        <BandHeading title={ui.faqHeading} />
        <Faqs items={servicesHub.faqs} className="mt-10 max-w-3xl" />
      </Band>

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
              <CtaButton lang={lang} cta={servicesHub.cta} />
            </div>
          </div>
        </Reveal>
      </Band>

      <PageJsonLd nodes={nodes} />
    </>
  );
}
