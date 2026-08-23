import type { Locale } from "@/lib/i18n";
import type { Dictionary, Section } from "./types";
import { ne } from "./ne";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { ne, en };

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

export type { Dictionary, Section };
