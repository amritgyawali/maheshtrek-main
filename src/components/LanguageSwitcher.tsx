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
 *
 * Rendered as two plain links marked by the same rule-above device the rest of
 * the navigation uses — a bordered toggle would be the only chip-shaped object
 * on the page.
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
    <div role="group" aria-label={label} className={`inline-flex items-center gap-3 ${className}`}>
      {locales.map((locale, index) => {
        const active = locale === current;
        return (
          <span key={locale} className="inline-flex items-center gap-3">
            {index > 0 && (
              <span aria-hidden="true" className="text-brass">
                /
              </span>
            )}
            <Link
              href={swapLocale(pathname, locale)}
              hrefLang={locale}
              aria-current={active ? "true" : undefined}
              className={`hang-link py-1 text-caption transition-colors ${
                active
                  ? `before:w-full ${isLight ? "text-paper" : "text-ink"}`
                  : isLight
                    ? "text-body-invert hover:text-paper"
                    : "text-body hover:text-ink"
              }`}
            >
              {localeLabel[locale]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
