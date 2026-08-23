import Link from "next/link";
import { defaultLocale, href } from "@/lib/i18n";
import { getDictionary } from "@/content";

/**
 * Locale-scoped 404. `params` is not available to not-found boundaries, so it
 * falls back to the default locale's strings.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-start justify-center py-section">
      <p className="text-overline uppercase text-brand">404</p>
      <h1 className="mt-4 font-display text-headline-md text-ink">
        {defaultLocale === "ne" ? "पृष्ठ भेटिएन" : "Page not found"}
      </h1>
      <Link
        href={href(defaultLocale)}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-body-sm font-medium text-paper transition-colors hover:bg-brand"
      >
        {dict.siteName}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
