import Link from "next/link";
import Glow from "./Glow";
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
    <div className="relative isolate overflow-hidden pb-14 pt-14 md:pb-20 md:pt-20">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-50" />
      <Glow tone="iris" className="-left-40 -top-40 h-[520px] w-[520px] opacity-50" />

      <div className="container-page">
        <nav aria-label="Breadcrumb" className="font-mono text-caption text-content-faint">
          <Link href={href(lang)} className="transition-colors hover:text-content">
            {homeLabel}
          </Link>
          <span className="mx-2.5 text-content-faint/50" aria-hidden="true">
            /
          </span>
          <span className="text-content-dim">{title}</span>
        </nav>

        <p className="label-accent mt-10">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-headline-md text-content md:text-display-sm">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-body-lg text-content-dim">{lead}</p>}
      </div>
    </div>
  );
}
