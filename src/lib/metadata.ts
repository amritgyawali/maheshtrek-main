import type { Metadata } from "next";
import { href, locales, openGraphLocale, xDefaultLocale, type Locale } from "./i18n";
import { siteConfig } from "./site-config";

interface PageMetaInput {
  lang: Locale;
  title: string;
  description: string;
  /**
   * Site-relative path without the locale prefix. Nested paths are fine:
   * `"production/biography"` becomes `/ne/production/biography`.
   */
  path?: string;
  keywords?: string[];
  /** Open Graph object type. Service pages are still `website`. */
  ogType?: "website" | "article" | "profile";
  /** Set on a page that must stay out of the index (none, currently). */
  noIndex?: boolean;
  /**
   * Use the title exactly as given, without the layout's
   * `"%s — <site name>"` suffix. Set on pages whose `metaTitle` is already
   * written to fill a search result on its own; appending the site name to one
   * of those pushes it past the ~60 characters Google will show.
   */
  titleAbsolute?: boolean;
}

/**
 * Builds per-page metadata with a complete hreflang set.
 *
 * Both locales are full translations of the same route, so every page declares
 * an alternate for each locale plus an `x-default` pointing at Nepali. Getting
 * this wrong is the usual way a bilingual site ends up competing with itself
 * in search results.
 *
 * Open Graph images are deliberately not set here: every route segment ships
 * its own `opengraph-image.tsx`, and Next wires the generated file into the
 * tags for that route. Declaring an image in both places is how a page ends up
 * advertising the wrong card.
 */
export function buildMetadata({
  lang,
  title,
  description,
  path = "",
  keywords,
  ogType = "website",
  noIndex = false,
  titleAbsolute = false,
}: PageMetaInput): Metadata {
  const canonical = `${siteConfig.url}${href(lang, path)}`;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteConfig.url}${href(locale, path)}`;
  }
  languages["x-default"] = `${siteConfig.url}${href(xDefaultLocale, path)}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical, languages },
    // Large image previews and untruncated snippets have to be opted into;
    // without this a service page shows a thumbnail and two lines.
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.legalName,
      locale: openGraphLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => openGraphLocale[l]),
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
