"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** Nothing stays hidden longer than this, whatever the observer does. */
const FAILSAFE_MS = 1600;

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The reveal starts at opacity 0, so a missed observer callback would hide
    // real content for good. Anything the observer has not claimed by then is
    // shown regardless — an un-animated paragraph beats an invisible one.
    const failsafe = window.setTimeout(() => setVisible(true), FAILSAFE_MS);

    // No observer available: the failsafe above is the only path, so let it
    // run rather than calling setState synchronously in the effect body.
    if (typeof IntersectionObserver === "undefined") {
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
