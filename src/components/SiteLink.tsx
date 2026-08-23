import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { href as localeHref, type Locale } from "@/lib/i18n";

type SiteLinkProps = {
  lang: Locale;
  /** Either a site-relative slug (`"production"`) or an absolute URL. */
  to: string;
  external?: boolean;
  children: React.ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

function isAbsolute(value: string): boolean {
  return /^(https?:)?\/\//.test(value) || value.startsWith("mailto:") || value.startsWith("tel:");
}

/**
 * One link component for the whole site so locale prefixing and the
 * `rel`/`target` pair on outbound links are never forgotten at a call site.
 */
export default function SiteLink({ lang, to, external, children, ...rest }: SiteLinkProps) {
  const absolute = external ?? isAbsolute(to);

  if (absolute) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  // In-page anchors stay on the current route.
  const target = to.startsWith("#") ? to : localeHref(lang, to);

  return (
    <Link href={target} {...rest}>
      {children}
    </Link>
  );
}
