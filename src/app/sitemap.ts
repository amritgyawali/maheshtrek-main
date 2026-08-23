import type { MetadataRoute } from "next";
import { allSectionSlugs } from "@/content";
import { href, locales, xDefaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

/**
 * Sitemap with per-URL language alternates, so both trees are discovered as
 * translations of each other rather than as duplicate content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...allSectionSlugs(), "contact"];
  const now = new Date();

  return locales.flatMap((lang) =>
    paths.map((path) => {
      const languages: Record<string, string> = {};
      for (const locale of locales) {
        languages[locale] = `${siteConfig.url}${href(locale, path)}`;
      }
      languages["x-default"] = `${siteConfig.url}${href(xDefaultLocale, path)}`;

      return {
        url: `${siteConfig.url}${href(lang, path)}`,
        lastModified: now,
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority: path === "" ? 1 : path === "contact" ? 0.7 : 0.8,
        alternates: { languages },
      };
    })
  );
}
