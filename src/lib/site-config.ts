/**
 * Company facts. Single source of truth for anything that appears in more than
 * one place (footer, contact page, schema.org, metadata).
 *
 * Values come from Najik.docx and the company details supplied with it. Do not
 * hardcode a phone number, address, or VAT number anywhere else — import it.
 */
export const siteConfig = {
  /** Legal name exactly as written in the source document. */
  legalName: "Najikako Sathi Media Pvt. Ltd.",
  legalNameNe: "नजिकको साथी मिडिया प्रा. लि.",
  shortName: "Najikako Sathi Media",
  shortNameNe: "नजिकको साथी मिडिया",

  domain: "najikkosathi.com",
  url: "https://najikkosathi.com",

  vat: "609765694",

  email: "najikkosathi@gmail.com",
  phones: ["9851336187", "9867117411"],
  /** E.164 form for `tel:` links and schema.org. Nepal country code is +977. */
  phonesE164: ["+9779851336187", "+9779867117411"],

  address: {
    street: "Anamnagar",
    city: "Kathmandu",
    region: "Bagmati",
    country: "NP",
    countryName: "Nepal",
    countryNameNe: "नेपाल",
    full: "Anamnagar, Kathmandu, Nepal",
    fullNe: "अनामनगर, काठमाडौँ, नेपाल",
  },

  /**
   * Right Sanchar is the company's news portal and lives on its own domain.
   * The source document asks for a click-through button to it from the site.
   */
  rightSanchar: {
    name: "Right Sanchar",
    nameNe: "राईट सञ्चार",
    url: "https://www.rightsanchar.com",
    display: "www.rightsanchar.com",
  },

  /**
   * Social profiles. The source document asks for website / YouTube / Facebook
   * links but does not supply the handles — TODO: replace the placeholders
   * before launch. Links with an empty `url` are not rendered.
   */
  social: {
    facebook: "",
    youtube: "",
    tiktok: "",
    instagram: "",
  } as Record<string, string>,

  /** Business hours used in the contact block and LocalBusiness schema. */
  hours: {
    days: "Sunday – Friday",
    daysNe: "आइतबार – शुक्रबार",
    time: "10:00 – 18:00",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Social entries that actually have a URL configured. */
export function activeSocialLinks(): Array<{ key: string; url: string }> {
  return Object.entries(siteConfig.social)
    .filter(([, url]) => url.length > 0)
    .map(([key, url]) => ({ key, url }));
}
