import Link from "next/link";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import Glow from "./Glow";
import { href, type Locale } from "@/lib/i18n";
import { activeSocialLinks, siteConfig } from "@/lib/site-config";
import { serviceCategories, servicesInCategory } from "@/content";
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

function LinkColumn({ heading, items, lang }: { heading: string; items: Section[]; lang: Locale }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={heading}>
      <h2 className="label">{heading}</h2>
      <ul className="mt-5 space-y-1">
        {items.map((section) => (
          <li key={section.slug}>
            <Link
              href={href(lang, section.slug)}
              className="-mx-2 inline-block rounded-lg px-2 py-1.5 text-body-sm text-content-dim transition-colors hover:bg-white/[0.05] hover:text-content"
            >
              {section.navLabel}
            </Link>
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
  const categories = serviceCategories(lang);

  return (
    <footer className="relative isolate mt-auto overflow-hidden border-t border-white/[0.07] bg-panel">
      <Glow tone="iris" className="-bottom-64 left-1/4 h-[560px] w-[560px] opacity-30" />

      {/* The document asks for a direct click-through to the news portal, so it
          gets the widest target on the page rather than a link in a list. */}
      <a
        href={siteConfig.rightSanchar.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-b border-white/[0.07] transition-colors hover:bg-white/[0.03]"
      >
        <div className="container-page flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-accent">{dict.ui.portalTagline}</p>
            <p className="mt-3 font-display text-headline-sm text-content md:text-headline-md">
              {portalName}
            </p>
          </div>
          <span className="font-mono text-body-sm text-content-faint transition-colors group-hover:text-accent-text">
            {siteConfig.rightSanchar.display}
          </span>
        </div>
      </a>

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:gap-10">
        <div>
          <Logo lang={lang} />
          <p className="mt-6 max-w-xs text-body-sm text-content-dim">{dict.ui.footerTagline}</p>

          {socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {socials.map(({ key, url }) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabel[key] ?? key}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-content-dim transition-colors hover:border-accent/50 hover:bg-accent hover:text-canvas"
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
          <h2 className="label">{dict.ui.contactHeading}</h2>
          <address className="mt-5 space-y-3.5 text-body-sm not-italic text-content-dim">
            <p>{address}</p>

            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-content"
              >
                {siteConfig.email}
              </a>
            </p>

            <p className="flex flex-col items-start gap-1.5 font-mono">
              {siteConfig.phones.map((phone, index) => (
                <a
                  key={phone}
                  href={`tel:${siteConfig.phonesE164[index]}`}
                  className="transition-colors hover:text-content"
                >
                  {phone}
                </a>
              ))}
            </p>

            <p className="font-mono text-caption text-content-faint">
              {days}, {siteConfig.hours.time}
            </p>
          </address>

          <Link
            href={href(lang, "contact")}
            className="mt-7 inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-body-sm font-medium text-content transition-colors hover:border-white/30 hover:bg-white/[0.08]"
          >
            {dict.ui.contactHeading}
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <nav key={category.slug} aria-label={category.navLabel}>
              <h2 className="label">
                <Link
                  href={href(lang, category.slug)}
                  className="transition-colors hover:text-content"
                >
                  {category.navLabel}
                </Link>
              </h2>
              <ul className="mt-5 space-y-1">
                {servicesInCategory(lang, category.slug).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={href(lang, `${category.slug}/${service.slug}`)}
                      className="-mx-2 inline-block rounded-lg px-2 py-1.5 text-body-sm text-content-dim transition-colors hover:bg-white/[0.05] hover:text-content"
                    >
                      {service.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="container-page flex flex-col gap-3 py-6 font-mono text-caption text-content-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {legalName}. {dict.ui.footerRights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              {dict.ui.footerVat} {siteConfig.vat}
            </span>
            <a href="#main" className="py-1 transition-colors hover:text-content">
              {dict.ui.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
