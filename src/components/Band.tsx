import type { ReactNode } from "react";

type Tone = "canvas" | "raised";

interface BandProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Renders as <section>; pass a label when the band has no visible heading. */
  ariaLabel?: string;
}

/** A full-width horizontal band with the standard vertical rhythm. */
export default function Band({ children, tone = "canvas", id, className = "", ariaLabel }: BandProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative isolate py-section-sm md:py-section ${
        tone === "raised" ? "bg-panel" : "bg-canvas"
      } ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

interface BandHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}

export function BandHeading({ eyebrow, title, lead, className = "" }: BandHeadingProps) {
  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="label-accent">{eyebrow}</p>}
      <h2
        className={`font-display text-headline-sm text-content md:text-headline-md ${
          eyebrow ? "mt-4" : ""
        }`}
      >
        {title}
      </h2>
      {lead && <p className="mt-5 text-body-md text-content-dim">{lead}</p>}
    </header>
  );
}
