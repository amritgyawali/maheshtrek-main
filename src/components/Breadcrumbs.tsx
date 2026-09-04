import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";

export interface Crumb {
  name: string;
  /** Site-relative path without the locale prefix. Omit on the current page. */
  path?: string;
}

/**
 * Visible breadcrumb trail. The machine-readable BreadcrumbList is built
 * separately in `lib/schema.ts` from the same array, so the two can never
 * describe different paths.
 */
export default function Breadcrumbs({
  lang,
  label,
  homeName,
  trail,
}: {
  lang: Locale;
  label: string;
  homeName: string;
  trail: Crumb[];
}) {
  return (
    <nav aria-label={label} className="font-mono text-caption text-content-faint">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <li>
          <Link href={href(lang)} className="transition-colors hover:text-content">
            {homeName}
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.name} className="flex items-center gap-x-2.5">
              <span className="text-content-faint/50" aria-hidden="true">
                /
              </span>
              {crumb.path && !last ? (
                <Link
                  href={href(lang, crumb.path)}
                  className="transition-colors hover:text-content"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-content-dim" aria-current={last ? "page" : undefined}>
                  {crumb.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
