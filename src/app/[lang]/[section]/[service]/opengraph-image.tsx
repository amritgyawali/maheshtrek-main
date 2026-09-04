import { allServiceParams, getService } from "@/content";
import { locales } from "@/lib/i18n";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = siteConfig.legalName;

/** One card per service page per locale. */
export function generateStaticParams() {
  return locales.flatMap((lang) => allServiceParams().map((entry) => ({ lang, ...entry })));
}

/** English tree only — `next/og` cannot set Devanagari. */
export default async function ServiceOgImage({
  params,
}: {
  params: Promise<{ lang: string; section: string; service: string }>;
}) {
  const { service: slug } = await params;
  const page = getService("en", slug);

  return ogCard({
    eyebrow: page?.eyebrow ?? "Services",
    title: page?.title ?? siteConfig.legalName,
    subtitle: page?.lead,
  });
}
