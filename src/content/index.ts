import type { Locale } from "@/lib/i18n";
import type { Dictionary, Section, ServicePage } from "./types";
import { ne } from "./ne";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { ne, en };

/** Slug of the `/[lang]/services` hub. Not a `Section`, so it needs a constant. */
export const SERVICES_HUB_SLUG = "services";

/** Full content dictionary for a locale. */
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** One routed section, or `undefined` if the slug is not part of the site. */
export function getSection(lang: Locale, slug: string): Section | undefined {
  return dictionaries[lang].sections.find((section) => section.slug === slug);
}

/**
 * Slugs are locale-independent on purpose: `/ne/production` and
 * `/en/production` are the same page in two languages, which keeps the
 * language switcher a pure segment swap and keeps hreflang pairs valid.
 */
export function allSectionSlugs(): string[] {
  return ne.sections.map((section) => section.slug);
}

/** The four service categories, in dictionary order. */
export function serviceCategories(lang: Locale): Section[] {
  return dictionaries[lang].sections.filter((section) => section.isServiceCategory);
}

/** One leaf service page. */
export function getService(lang: Locale, slug: string): ServicePage | undefined {
  return dictionaries[lang].services.find((service) => service.slug === slug);
}

/** Leaf pages belonging to one category, in dictionary order. */
export function servicesInCategory(lang: Locale, category: string): ServicePage[] {
  return dictionaries[lang].services.filter((service) => service.category === category);
}

/**
 * `[section]/[service]` route params. Built from the Nepali tree because the
 * two trees are required to share slugs — if they ever drift, the build fails
 * on the `Dictionary` type long before this runs.
 */
export function allServiceParams(): Array<{ section: string; service: string }> {
  return ne.services.map((service) => ({ section: service.category, service: service.slug }));
}

export function allServiceSlugs(): string[] {
  return ne.services.map((service) => service.slug);
}

export type { Dictionary, Section, ServicePage };
