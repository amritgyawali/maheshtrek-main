/**
 * Locale plumbing for the bilingual (Nepali / English) site.
 *
 * Nepali is the default because the primary audience reads Devanagari; English
 * exists as a full parallel tree, not a partial fallback. Every route under
 * `src/app/[lang]` is rendered twice, once per locale.
 */
export const locales = ["ne", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ne";

/** Value used for the `hreflang="x-default"` alternate. */
export const xDefaultLocale: Locale = defaultLocale;

export function isLocale(value: string | undefined): value is Locale {
  return value === "ne" || value === "en";
}

/** BCP-47 tag for the `lang` attribute and Open Graph locale fields. */
export const htmlLang: Record<Locale, string> = {
  ne: "ne-NP",
  en: "en-NP",
};

export const openGraphLocale: Record<Locale, string> = {
  ne: "ne_NP",
  en: "en_US",
};

/** Human label for the language switcher, always written in its own language. */
export const localeLabel: Record<Locale, string> = {
  ne: "नेपाली",
  en: "English",
};

/**
 * Builds an absolute in-site path for a locale.
 * `href("ne")` -> `/ne`, `href("en", "production")` -> `/en/production`.
 */
export function href(lang: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}

/**
 * Swaps the locale segment of an already-resolved pathname, preserving the
 * rest of the route so the language switcher keeps the reader in place.
 */
export function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${next}`;
  if (isLocale(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  return `/${segments.join("/")}`;
}
