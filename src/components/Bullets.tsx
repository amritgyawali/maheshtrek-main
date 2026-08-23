import Reveal from "./Reveal";
import type { Bullet } from "@/content/types";

interface BulletsProps {
  items: Bullet[];
  tone?: "paper" | "ink";
  className?: string;
}

/** Small numbered capability grid used on section pages. */
export default function Bullets({ items, tone = "paper", className = "" }: BulletsProps) {
  const invert = tone === "ink";

  return (
    <ul className={`grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 ${
      invert ? "border-line-dark bg-line-dark" : "border-line bg-line"
    } ${className}`}>
      {items.map((item, index) => (
        <li key={item.title} className={invert ? "bg-ink-soft" : "bg-paper"}>
          <Reveal delay={index * 60} className="h-full p-6 md:p-8">
            <p className={`text-overline ${invert ? "text-body-invert" : "text-body"}`}>
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className={`mt-3 font-display text-title-sm ${invert ? "text-paper" : "text-ink"}`}>
              {item.title}
            </h3>
            <p className={`mt-2 text-body-sm ${invert ? "text-body-invert" : "text-body"}`}>{item.text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
