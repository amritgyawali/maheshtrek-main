import { locales } from "@/lib/i18n";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.legalName} — contact`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** English tree only — `next/og` cannot set Devanagari. */
export default function ContactOgImage() {
  return ogCard({
    eyebrow: "Contact",
    title: "Let's talk",
    subtitle: `${siteConfig.address.full} · ${siteConfig.phones.join(" / ")}`,
  });
}
