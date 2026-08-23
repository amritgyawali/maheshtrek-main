import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";

interface PageHeaderProps {
  lang: Locale;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Label of the site root, used in the breadcrumb. */
  homeLabel: string;
}

export default function PageHeader({ lang, eyebrow, title, lead, homeLabel }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-mist">
      <div className="container-page py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="text-caption text-body">
          <Link href={href(lang)} className="transition-colors hover:text-ink">
            {homeLabel}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-ink">{title}</span>
        </nav>

        <p className="mt-8 text-overline uppercase text-brand">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-headline-md md:text-display-sm">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-body-lg text-body">{lead}</p>}
      </div>
    </div>
  );
}
