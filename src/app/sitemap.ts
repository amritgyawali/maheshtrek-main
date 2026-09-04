import type { MetadataRoute } from "next";
import { SERVICES_HUB_SLUG, allSectionSlugs, allServiceParams } from "@/content";
import { href, locales, xDefaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

/**
 * Sitemap with per-URL language alternates, so both trees are discovered as
 * translations of each other rather than as duplicate content.
 *
 * Priorities describe the site's own shape, not a promise to a crawler: the
 * home page, then the services hub and the four departments, then the leaf
 * service pages, then everything else.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = allServiceParams().map((entry) => `${entry.section}/${entry.service}`);
  const paths = [
    "",
    SERVICES_HUB_SLUG,
    ...allSectionSlugs(),
    ...servicePaths,
    "contact",
  ];
  const now = new Date();

  function priorityFor(path: string): number {
    if (path === "") return 1;
    if (path === SERVICES_HUB_SLUG) return 0.9;
    if (path === "contact") return 0.7;
    // A leaf service page carries a slash; a department does not.
    return path.includes("/") ? 0.75 : 0.8;
  }

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
        priority: priorityFor(path),
        alternates: { languages },
      };
    })
  );
}
