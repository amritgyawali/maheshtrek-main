import Link from "next/link";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import { href, type Locale } from "@/lib/i18n";
import { activeSocialLinks, siteConfig } from "@/lib/site-config";
import type { Dictionary, Section } from "@/content/types";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

const socialLabel: Record<string, string> = {
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
};

/** Nav link with a brand rule that draws itself in on hover. */
function FooterLink({ href: to, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={to}
      className="relative inline-block py-0.5 transition-colors hover:text-paper after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}

function LinkColumn({
  heading,
  items,
  lang,
}: {
  heading: string;
  items: Section[];
  lang: Locale;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={heading}>
      <h2 className="text-overline uppercase text-paper">{heading}</h2>
      <ul className="mt-6 space-y-3.5 text-body-sm">
        {items.map((section) => (
          <li key={section.slug}>
            <FooterLink href={href(lang, section.slug)}>{section.navLabel}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const socials = activeSocialLinks();
  const legalName = lang === "ne" ? siteConfig.legalNameNe : siteConfig.legalName;
  const address = lang === "ne" ? siteConfig.address.fullNe : siteConfig.address.full;
  const days = lang === "ne" ? siteConfig.hours.daysNe : siteConfig.hours.days;
  const portalName = lang === "ne" ? siteConfig.rightSanchar.nameNe : siteConfig.rightSanchar.name;

  const company = dict.sections.filter((section) => section.group === "company");
  const services = dict.sections.filter((section) => section.group === "services");

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-body-invert">
      {/* Brand hairline: the only warm line on an otherwise cold surface. */}
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-brand via-brand/30 to-transparent" />

      {/* The document asks for a direct click-through to the news portal, so it
          gets the widest target on the page rather than a link in a list. */}
      <a
        href={siteConfig.rightSanchar.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-b border-line-dark transition-colors hover:bg-ink-soft"
      >
        <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-overline uppercase text-brand">{dict.ui.portalTagline}</p>
            <p className="mt-3 font-display text-headline-sm text-paper md:text-headline-md">{portalName}</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-body-sm">{siteConfig.rightSanchar.display}</span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-dark text-paper transition-all group-hover:border-brand group-hover:bg-brand">
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </span>
          </div>
        </div>
      </a>

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:gap-10">
        <div>
          <Logo lang={lang} variant="light" />
          <p className="mt-6 max-w-xs text-body-sm">{dict.ui.footerTagline}</p>

          {socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ key, url }) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabel[key] ?? key}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-body-invert transition-colors hover:border-brand hover:bg-brand hover:text-paper"
                  >
                    <SocialIcon network={key} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <LinkColumn heading={dict.ui.companyHeading} items={company} lang={lang} />
        <LinkColumn heading={dict.ui.servicesHeading} items={services} lang={lang} />

        <div>
          <h2 className="text-overline uppercase text-paper">{dict.ui.contactHeading}</h2>
          <address className="mt-6 space-y-4 text-body-sm not-italic">
            <p>{address}</p>

            <p>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-paper">
                {siteConfig.email}
              </a>
            </p>

            <p className="flex flex-col gap-1">
              {siteConfig.phones.map((phone, index) => (
                <a
                  key={phone}
                  href={`tel:${siteConfig.phonesE164[index]}`}
                  className="transition-colors hover:text-paper"
                >
                  {phone}
                </a>
              ))}
            </p>

            <p className="text-caption">
              {days} · {siteConfig.hours.time}
            </p>
          </address>

          <Link
            href={href(lang, "contact")}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-body-sm font-medium text-ink transition-colors hover:bg-brand hover:text-paper"
          >
            {dict.ui.contactHeading}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the footer. Decorative only. */}
      <div aria-hidden="true" className="pointer-events-none select-none px-gutter md:px-8">
        <p className="-mb-[0.18em] whitespace-nowrap font-display text-[clamp(3rem,13vw,11rem)] leading-none tracking-tight text-paper/[0.05]">
          {dict.siteName}
        </p>
      </div>

      <div className="relative border-t border-line-dark">
        <div className="container-page flex flex-col gap-3 py-6 text-caption md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {legalName}. {dict.ui.footerRights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              {dict.ui.footerVat}: {siteConfig.vat}
            </span>
            <a href="#main" className="transition-colors hover:text-paper">
              {dict.ui.backToTop} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
