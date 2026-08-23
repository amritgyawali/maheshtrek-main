import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

interface LogoProps {
  lang: Locale;
  showWordmark?: boolean;
  className?: string;
}

/**
 * Wordmark. The mark is a transmission: a solid point with two arcs opening
 * away from it — सञ्चार, signal leaving a source — set in a tile that carries
 * the site's accent-to-iris gradient so the identity and the interface are
 * lit by the same light.
 */
export default function Logo({ lang, showWordmark = true, className = "" }: LogoProps) {
  const name = lang === "ne" ? siteConfig.shortNameNe : siteConfig.shortName;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3B4F" />
            <stop offset="1" stopColor="#7A6BFF" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#logo-grad)" />
        <circle cx="14" cy="20" r="3.2" fill="#08090C" />
        <path
          d="M21 13.5a9 9 0 0 1 0 13"
          stroke="#08090C"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M26.5 9.5a15 15 0 0 1 0 21"
          stroke="#08090C"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-title-sm font-semibold leading-none text-content">
          {name}
        </span>
      )}
    </span>
  );
}
