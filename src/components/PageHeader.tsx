import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Glow from "./Glow";
import type { Locale } from "@/lib/i18n";

interface PageHeaderProps {
  lang: Locale;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Label of the site root, used as the first breadcrumb. */
  homeLabel: string;
  /** Accessible name for the breadcrumb nav. */
  breadcrumbLabel: string;
  /** Steps below the site root. The last one is the current page. */
  trail: Crumb[];
}

export default function PageHeader({
  lang,
  eyebrow,
  title,
  lead,
  homeLabel,
  breadcrumbLabel,
  trail,
}: PageHeaderProps) {
  return (
    <div className="relative isolate overflow-hidden pb-14 pt-14 md:pb-20 md:pt-20">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-50" />
      <Glow tone="iris" className="-left-40 -top-40 h-[520px] w-[520px] opacity-50" />

      <div className="container-page">
        <Breadcrumbs
          lang={lang}
          label={breadcrumbLabel}
          homeName={homeLabel}
          trail={trail}
        />

        <p className="label-accent mt-10">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-headline-md text-content md:text-display-sm">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-body-lg text-content-dim">{lead}</p>}
      </div>
    </div>
  );
}
