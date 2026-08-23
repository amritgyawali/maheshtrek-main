import type { Metadata } from "next";
import { href, locales, openGraphLocale, xDefaultLocale, type Locale } from "./i18n";
import { siteConfig } from "./site-config";

interface PageMetaInput {
  lang: Locale;
  title: string;
  description: string;
  /** Site-relative slug without the locale prefix, e.g. "production". */
  path?: string;
  keywords?: string[];
}

/**
 * Builds per-page metadata with a complete hreflang set.
 *
 * Both locales are full translations of the same route, so every page declares
 * an alternate for each locale plus an `x-default` pointing at Nepali. Getting
 * this wrong is the usual way a bilingual site ends up competing with itself
 * in search results.
 */
export function buildMetadata({ lang, title, description, path = "", keywords }: PageMetaInput): Metadata {
  const canonical = `${siteConfig.url}${href(lang, path)}`;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteConfig.url}${href(locale, path)}`;
  }
  languages["x-default"] = `${siteConfig.url}${href(xDefaultLocale, path)}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.legalName,
      locale: openGraphLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => openGraphLocale[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
