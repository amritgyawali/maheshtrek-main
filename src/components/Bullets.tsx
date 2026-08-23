import Reveal from "./Reveal";
import type { Bullet } from "@/content/types";

interface BulletsProps {
  items: Bullet[];
  className?: string;
}

/**
 * Capability grid, rendered as small bento cells. No counters: these are a set
 * of things the house does, not a sequence, and a number would claim an order
 * the content does not have.
 */
export default function Bullets({ items, className = "" }: BulletsProps) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 70} className="h-full">
            <div className="panel panel-lip h-full p-6 md:p-7">
              <h3 className="font-display text-title-sm text-content">{item.title}</h3>
              <p className="mt-2.5 text-body-sm text-content-dim">{item.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
