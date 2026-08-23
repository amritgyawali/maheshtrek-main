import SiteLink from "./SiteLink";
import type { Locale } from "@/lib/i18n";
import type { Cta } from "@/content/types";

type Variant = "solid" | "outline" | "ghost";

/**
 * Filled controls put the canvas colour on top of the accent — white on this
 * red only reaches 3.4:1, dark on it reaches 5.8:1.
 */
const variantClass: Record<Variant, string> = {
  solid: "bg-accent text-canvas hover:bg-[#FF5566] hover:shadow-glow-accent",
  outline: "border border-white/[0.14] bg-white/[0.04] text-content hover:border-white/30 hover:bg-white/[0.08]",
  ghost: "text-content-dim hover:text-content",
};

interface CtaButtonProps {
  lang: Locale;
  cta: Cta;
  variant?: Variant;
  className?: string;
}

export default function CtaButton({ lang, cta, variant = "solid", className = "" }: CtaButtonProps) {
  return (
    <SiteLink
      lang={lang}
      to={cta.href}
      external={cta.external}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-body-sm font-medium transition-all duration-300 ${variantClass[variant]} ${className}`}
    >
      {cta.label}
    </SiteLink>
  );
}
