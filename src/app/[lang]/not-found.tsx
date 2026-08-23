import Link from "next/link";
import Glow from "@/components/Glow";
import { defaultLocale, href } from "@/lib/i18n";
import { getDictionary } from "@/content";

/**
 * Locale-scoped 404. `params` is not available to not-found boundaries, so it
 * falls back to the default locale's strings.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="relative isolate flex min-h-[60vh] flex-col items-start justify-center overflow-hidden py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-50" />
      <Glow tone="accent" className="-left-32 top-0 h-[480px] w-[480px] opacity-45" />

      <div className="container-page">
        <p className="label-accent">404</p>
        <h1 className="mt-4 font-display text-headline-md text-content">
          {defaultLocale === "ne" ? "पृष्ठ भेटिएन" : "Page not found"}
        </h1>
        <Link
          href={href(defaultLocale)}
          className="mt-9 inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-body-sm font-medium text-canvas transition-all duration-300 hover:bg-[#FF5566] hover:shadow-glow-accent"
        >
          {dict.siteName}
        </Link>
      </div>
    </div>
  );
}
