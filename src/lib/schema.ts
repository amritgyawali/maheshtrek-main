import { href, type Locale } from "./i18n";
import { siteConfig } from "./site-config";
import type { Faq, ImageAsset, VideoAsset } from "@/content/types";

/**
 * Page-level structured data.
 *
 * The site-wide Organization / WebSite graph is emitted once from the locale
 * layout (`components/JsonLd.tsx`). Everything here is per-page and references
 * that Organization by `@id` rather than repeating the company facts, so the
 * registered details are asserted in exactly one place.
 */

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

export type SchemaNode = Record<string, unknown>;

/** Absolute URL for a locale-prefixed path. */
export function absoluteUrl(lang: Locale, path = ""): string {
  return `${siteConfig.url}${href(lang, path)}`;
}

export interface Crumb {
  name: string;
  /** Site-relative path without the locale prefix. Omit for the current page. */
  path?: string;
}

/**
 * BreadcrumbList. Every trail starts at the site root, so callers pass only
 * the steps below it.
 */
export function breadcrumbList(lang: Locale, homeName: string, trail: Crumb[]): SchemaNode {
  const items = [{ name: homeName, path: "" }, ...trail];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(lang, trail[trail.length - 1]?.path ?? "")}#breadcrumb`,
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(lang, crumb.path ?? ""),
    })),
  };
}

export function imageObject(image: ImageAsset): SchemaNode {
  return {
    "@type": "ImageObject",
    url: `${siteConfig.url}${image.src}`,
    contentUrl: `${siteConfig.url}${image.src}`,
    width: image.width,
    height: image.height,
    caption: image.caption ?? image.alt,
  };
}

/**
 * VideoObject. Returns `undefined` when no footage is configured, so a page
 * never claims a video it does not have — see `public/media/README.md`.
 */
export function videoObject(video: VideoAsset | undefined): SchemaNode | undefined {
  if (!video) return undefined;

  return {
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail.startsWith("http")
      ? video.thumbnail
      : `${siteConfig.url}${video.thumbnail}`,
    contentUrl: video.url,
    embedUrl: video.embedUrl ?? video.url,
    uploadDate: video.uploadDate,
    duration: video.duration,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function faqPage(lang: Locale, path: string, faqs: Faq[]): SchemaNode | undefined {
  if (faqs.length === 0) return undefined;

  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(lang, path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

interface WebPageInput {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  image?: ImageAsset;
  /** Ordered breadcrumb trail below the site root. */
  trail: Crumb[];
}

export function webPage({
  lang,
  path,
  title,
  description,
  image,
  trail,
}: WebPageInput): SchemaNode {
  const url = absoluteUrl(lang, path);

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    breadcrumb: { "@id": `${absoluteUrl(lang, trail[trail.length - 1]?.path ?? path)}#breadcrumb` },
    ...(image ? { primaryImageOfPage: imageObject(image) } : {}),
  };
}

interface ServiceInput {
  lang: Locale;
  path: string;
  name: string;
  description: string;
  /** Category name, used as `Service.serviceType`. */
  serviceType: string;
  image?: ImageAsset;
  /** Named deliverables, published as the service's offer catalogue. */
  offers?: Array<{ name: string; description: string }>;
}

export function service({
  lang,
  path,
  name,
  description,
  serviceType,
  image,
  offers = [],
}: ServiceInput): SchemaNode {
  const url = absoluteUrl(lang, path);

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType,
    url,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "Country",
      name: siteConfig.address.countryName,
    },
    availableLanguage: ["ne", "en"],
    ...(image ? { image: imageObject(image) } : {}),
    ...(offers.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name,
            itemListElement: offers.map((offer) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: offer.name,
                description: offer.description,
              },
            })),
          },
        }
      : {}),
  };
}

/** ItemList for a hub page that links out to a set of pages. */
export function itemList(
  lang: Locale,
  path: string,
  name: string,
  items: Array<{ name: string; path: string; description?: string }>
): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(lang, path)}#list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(lang, item.path),
    })),
  };
}

/** Drops the `undefined` slots so optional nodes can be listed inline. */
export function graph(nodes: Array<SchemaNode | undefined>): SchemaNode[] {
  return nodes.filter((node): node is SchemaNode => node !== undefined);
}
