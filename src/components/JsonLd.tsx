import { activeSocialLinks, siteConfig } from "@/lib/site-config";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";

/**
 * Structured data for the whole site, emitted once per page from the locale
 * layout. Organization carries the registered facts (address, VAT, phones) so
 * search engines and AI answer engines can attribute them to the company
 * rather than inferring them from the footer.
 */
export default function JsonLd({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const organizationId = `${siteConfig.url}/#organization`;
  const sameAs = [siteConfig.rightSanchar.url, ...activeSocialLinks().map(({ url }) => url)];

  const graph = [
    {
      "@type": "NewsMediaOrganization",
      "@id": organizationId,
      name: siteConfig.legalName,
      alternateName: [siteConfig.legalNameNe, siteConfig.shortName],
      url: siteConfig.url,
      email: siteConfig.email,
      vatID: siteConfig.vat,
      taxID: siteConfig.vat,
      description: dict.metaDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
      contactPoint: siteConfig.phonesE164.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: "NP",
        availableLanguage: ["ne", "en"],
      })),
      sameAs,
      subOrganization: {
        "@type": "NewsMediaOrganization",
        name: siteConfig.rightSanchar.name,
        alternateName: siteConfig.rightSanchar.nameNe,
        url: siteConfig.rightSanchar.url,
      },
      knowsAbout: [
        "News reporting",
        "Documentary production",
        "Biography films",
        "Advertising production",
        "Media training",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: dict.metaTitle,
      inLanguage: lang,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Service",
      name: dict.home.whatWeDoHeading,
      provider: { "@id": organizationId },
      areaServed: siteConfig.address.countryName,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: dict.home.whatWeDoHeading,
        itemListElement: dict.sections
          .filter((section) => ["production", "advertising", "training"].includes(section.slug))
          .map((section) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: section.title,
              description: section.lead,
              url: `${siteConfig.url}${href(lang, section.slug)}`,
            },
          })),
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Structured data is static, author-controlled content — no user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
