import BentoTile from "./BentoTile";
import Reveal from "./Reveal";
import { href, type Locale } from "@/lib/i18n";
import type { ServicePage } from "@/content/types";

/**
 * The set of leaf pages under a category, as bento tiles. Each tile is the
 * whole link target — a service is one page, and the tile is the way in.
 */
export default function ServiceGrid({
  lang,
  services,
  action,
  className = "",
}: {
  lang: Locale;
  services: ServicePage[];
  /** Affordance shown at the foot of every tile, e.g. "Read more". */
  action: string;
  className?: string;
}) {
  if (services.length === 0) return null;

  return (
    <ul className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {services.map((service, index) => (
        <li key={service.slug} className="h-full">
          <Reveal delay={index * 60} className="h-full">
            <BentoTile
              href={href(lang, `${service.category}/${service.slug}`)}
              label={service.eyebrow}
              title={service.title}
              text={service.lead}
              action={action}
              className="h-full"
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
