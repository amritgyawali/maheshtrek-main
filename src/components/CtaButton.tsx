import SiteLink from "./SiteLink";
import type { Locale } from "@/lib/i18n";
import type { Cta } from "@/content/types";

type Variant = "solid" | "outline" | "ghost";

const variantClass: Record<Variant, string> = {
  solid: "bg-brand text-paper hover:bg-brand-dark",
  outline: "border border-line text-ink hover:border-ink",
  ghost: "border border-line-dark text-paper hover:border-paper",
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
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-body-sm font-medium transition-colors ${variantClass[variant]} ${className}`}
    >
      {cta.label}
      <span aria-hidden="true">{cta.external ? "↗" : "→"}</span>
    </SiteLink>
  );
}
