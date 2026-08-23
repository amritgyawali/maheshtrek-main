import Link from "next/link";
import Glow from "./Glow";
import type { ReactNode } from "react";

interface BentoTileProps {
  /** Where the whole tile navigates. Omit for a tile that is not a link. */
  href?: string;
  /** External links get the target/rel pair and open in a new tab. */
  external?: boolean;
  /** Tailwind column/row span classes for the grid. */
  span?: string;
  /** Lights the tile from behind and warms its edge. */
  featured?: boolean;
  label?: string;
  title: string;
  text?: string;
  /** Rendered under the copy — a readout, a list, a status line. */
  children?: ReactNode;
  /** Shown at the bottom edge; the tile's own affordance. */
  action?: string;
  className?: string;
}

/**
 * One cell of the bento grid. Every service, and every standing fact worth a
 * surface of its own, is a tile; the grid is what gives the page density
 * without a single photograph in the project.
 */
export default function BentoTile({
  href,
  external,
  span = "",
  featured = false,
  label,
  title,
  text,
  children,
  action,
  className = "",
}: BentoTileProps) {
  const body = (
    <>
      {featured && (
        <Glow tone="accent" className="-right-24 -top-24 h-[380px] w-[380px] opacity-45" />
      )}

      <div className="relative flex h-full flex-col p-7 md:p-8">
        {label && <p className={featured ? "label-accent" : "label"}>{label}</p>}

        <h3
          className={`font-display text-content ${label ? "mt-4" : ""} ${
            featured ? "text-headline-sm md:text-headline-md" : "text-title-md"
          }`}
        >
          {title}
        </h3>

        {text && (
          <p className={`mt-3 max-w-lg text-content-dim ${featured ? "text-body-md" : "text-body-sm"}`}>
            {text}
          </p>
        )}

        {children}

        {action && (
          <span className="mt-auto flex items-center pt-6 font-mono text-caption uppercase tracking-widest text-content-faint transition-colors group-hover:text-accent-text">
            {action}
          </span>
        )}
      </div>
    </>
  );

  const shell = `group ${href ? "panel-interactive" : "panel"} panel-lip h-full ${
    featured ? "bg-white/[0.05]" : ""
  } ${span} ${className}`;

  if (!href) {
    return <div className={shell}>{body}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={shell}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={shell}>
      {body}
    </Link>
  );
}
