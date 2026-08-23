import { activeSocialLinks, siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n";
import type { ContactPage } from "@/content/types";

interface ContactDetailsProps {
  lang: Locale;
  contact: ContactPage;
  className?: string;
}

/** One fact per cell, laid out as a compact readout. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
      <dt className="label">{label}</dt>
      <dd className="mt-2.5 text-body-md text-content">{children}</dd>
    </div>
  );
}

/** Company facts rendered from `siteConfig`, with labels from the dictionary. */
export default function ContactDetails({ lang, contact, className = "" }: ContactDetailsProps) {
  const address = lang === "ne" ? siteConfig.address.fullNe : siteConfig.address.full;
  const days = lang === "ne" ? siteConfig.hours.daysNe : siteConfig.hours.days;
  const socials = activeSocialLinks();

  return (
    <dl className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <Row label={contact.labels.address}>{address}</Row>

      <Row label={contact.labels.email}>
        <a href={`mailto:${siteConfig.email}`} className="link-underline">
          {siteConfig.email}
        </a>
      </Row>

      <Row label={contact.labels.phone}>
        <span className="flex flex-wrap gap-x-6 gap-y-1 font-mono">
          {siteConfig.phones.map((phone, index) => (
            <a key={phone} href={`tel:${siteConfig.phonesE164[index]}`} className="link-underline">
              {phone}
            </a>
          ))}
        </span>
      </Row>

      <Row label={contact.labels.portal}>
        <a
          href={siteConfig.rightSanchar.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono"
        >
          {siteConfig.rightSanchar.display}
        </a>
      </Row>

      <Row label={contact.labels.hours}>
        <span className="font-mono">
          {days}, {siteConfig.hours.time}
        </span>
      </Row>

      <Row label={contact.labels.vat}>
        <span className="font-mono">{siteConfig.vat}</span>
      </Row>

      {socials.length > 0 && (
        <Row label={contact.labels.follow}>
          <span className="flex flex-wrap gap-x-6 gap-y-1">
            {socials.map(({ key, url }) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="link-underline">
                {key}
              </a>
            ))}
          </span>
        </Row>
      )}
    </dl>
  );
}
