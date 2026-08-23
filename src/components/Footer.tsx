import Link from "next/link";
import Logo from "./Logo";
import { href, type Locale } from "@/lib/i18n";
import { activeSocialLinks, siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/content/types";

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

export default function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const socials = activeSocialLinks();
  const legalName = lang === "ne" ? siteConfig.legalNameNe : siteConfig.legalName;
  const address = lang === "ne" ? siteConfig.address.fullNe : siteConfig.address.full;

  return (
    <footer className="mt-auto bg-ink text-body-invert">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo lang={lang} variant="light" />
          <p className="mt-5 max-w-sm text-body-sm">{dict.ui.footerTagline}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ key, url }) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line-dark px-4 py-1.5 text-caption transition-colors hover:border-brand hover:text-paper"
                  >
                    {socialLabel[key] ?? key}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={dict.ui.navHeading}>
          <h2 className="text-overline uppercase text-paper">{dict.ui.navHeading}</h2>
          <ul className="mt-5 space-y-3 text-body-sm">
            {dict.sections.map((section) => (
              <li key={section.slug}>
                <Link href={href(lang, section.slug)} className="transition-colors hover:text-paper">
                  {section.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href(lang, "contact")} className="transition-colors hover:text-paper">
                {dict.ui.contactHeading}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-overline uppercase text-paper">{dict.ui.contactHeading}</h2>
          <address className="mt-5 space-y-3 text-body-sm not-italic">
            <p>{address}</p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-paper">
                {siteConfig.email}
              </a>
            </p>
            <p className="flex flex-wrap gap-x-3">
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
            <p>
              <a
                href={siteConfig.rightSanchar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                {siteConfig.rightSanchar.display}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col gap-2 py-6 text-caption md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {legalName}. {dict.ui.footerRights}
          </p>
          <p>
            {dict.ui.footerVat}: {siteConfig.vat}
          </p>
        </div>
      </div>
    </footer>
  );
}
