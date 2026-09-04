import Reveal from "./Reveal";
import type { ProcessStep } from "@/content/types";

/**
 * Delivery stages.
 *
 * This is the one place on the site that numbers anything. The services and
 * the parts of a service page are sets and stay unnumbered; a process is a
 * sequence — the research happens before the shoot — so the counter is
 * describing the content rather than decorating it.
 */
export default function ProcessList({
  steps,
  className = "",
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  if (steps.length === 0) return null;

  return (
    <ol className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <Reveal delay={index * 70} className="h-full">
            <div className="panel panel-lip h-full p-6 md:p-7">
              <span className="font-mono text-overline text-accent-text" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-title-sm text-content">{step.title}</h3>
              <p className="mt-2.5 text-body-sm text-content-dim">{step.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
