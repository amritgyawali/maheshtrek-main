import { allSectionSlugs, getSection } from "@/content";
import { locales } from "@/lib/i18n";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = siteConfig.legalName;

/** One card per section per locale, prerendered rather than made on demand. */
export function generateStaticParams() {
  return locales.flatMap((lang) => allSectionSlugs().map((section) => ({ lang, section })));
}

/**
 * The card is always built from the English tree: `next/og` has no Devanagari
 * font, so a Nepali title would render as empty boxes.
 */
export default async function SectionOgImage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { section: slug } = await params;
  const section = getSection("en", slug);

  return ogCard({
    eyebrow: section?.eyebrow ?? "Najikako Sathi Media",
    title: section?.title ?? siteConfig.legalName,
    subtitle: section?.lead,
  });
}
