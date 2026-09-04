import { getDictionary } from "@/content";
import { locales } from "@/lib/i18n";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.legalName} — services`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** English tree only — `next/og` cannot set Devanagari. */
export default function ServicesOgImage() {
  const { servicesHub } = getDictionary("en");

  return ogCard({
    eyebrow: servicesHub.eyebrow,
    title: "Production · Social media · Training · Research",
    subtitle: "Sixteen services across four departments",
  });
}
