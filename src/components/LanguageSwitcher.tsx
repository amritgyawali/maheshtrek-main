"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, swapLocale, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  current: Locale;
  label: string;
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Segment-swapping switcher: it keeps the reader on the same page instead of
 * dropping them on the localised home page, which is why it needs the live
 * pathname and therefore the client boundary.
 */
export default function LanguageSwitcher({
  current,
  label,
  variant = "dark",
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${current}`;
  const isLight = variant === "light";

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-full border p-0.5 ${
        isLight ? "border-line-dark bg-ink-soft" : "border-line bg-mist"
      } ${className}`}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1 text-caption transition-colors ${
              locale === "ne" ? "font-nepali" : ""
            } ${
              active
                ? "bg-brand text-paper"
                : isLight
                  ? "text-body-invert hover:text-paper"
                  : "text-body hover:text-ink"
            }`}
          >
            {localeLabel[locale]}
          </Link>
        );
      })}
    </div>
  );
}
