import type { Faq } from "@/content/types";

/**
 * FAQ list.
 *
 * `<details>` rather than a scripted accordion: it opens without JavaScript,
 * it is keyboard-operable and announced correctly by screen readers for free,
 * and browser find-in-page reaches inside a closed one. The same questions are
 * published as `FAQPage` structured data by the page that renders this.
 */
export default function Faqs({ items, className = "" }: { items: Faq[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((faq) => (
        <details key={faq.question} className="panel panel-lip group px-6 py-1 md:px-8">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-title-sm text-content marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 font-mono text-body-md leading-none text-accent-text transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-prose pb-6 text-body-sm text-content-dim">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
