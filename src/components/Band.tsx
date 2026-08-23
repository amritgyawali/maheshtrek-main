import type { ReactNode } from "react";

type Tone = "paper" | "mist" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-paper",
};

interface BandProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Renders as <section>; pass a label when the band has no visible heading. */
  ariaLabel?: string;
}

/** A full-width horizontal band with the standard vertical rhythm. */
export default function Band({ children, tone = "paper", id, className = "", ariaLabel }: BandProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={`${toneClass[tone]} py-section-sm md:py-section ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface BandHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: Tone;
  className?: string;
}

export function BandHeading({ eyebrow, title, lead, tone = "paper", className = "" }: BandHeadingProps) {
  const invert = tone === "ink";

  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`text-overline uppercase ${invert ? "text-brand-light" : "text-brand"}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-3 font-display text-headline-sm md:text-headline-md ${
          invert ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-4 text-body-md ${invert ? "text-body-invert" : "text-body"}`}>{lead}</p>}
    </header>
  );
}
