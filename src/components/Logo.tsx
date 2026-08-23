import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

interface LogoProps {
  lang: Locale;
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
}

/**
 * Wordmark. The mark is two arcs leaning toward a common point — the "close
 * companion" idea in the company name — over a signal dot in the brand red.
 */
export default function Logo({ lang, variant = "dark", showWordmark = true, className = "" }: LogoProps) {
  const isLight = variant === "light";
  const name = lang === "ne" ? siteConfig.shortNameNe : siteConfig.shortName;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="10" className={isLight ? "fill-paper" : "fill-ink"} />
        <path
          d="M11 29V13l18 14V11"
          className={isLight ? "stroke-ink" : "stroke-paper"}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="29" r="3.4" className="fill-brand" />
      </svg>
      {showWordmark && (
        <span
          className={`font-display text-title-sm leading-tight tracking-tight ${
            isLight ? "text-paper" : "text-ink"
          } ${lang === "ne" ? "font-nepali" : ""}`}
        >
          {name}
        </span>
      )}
    </span>
  );
}
