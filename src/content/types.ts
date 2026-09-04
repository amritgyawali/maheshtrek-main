import type { Locale } from "@/lib/i18n";

/**
 * Where a piece of copy came from. This is enforced editorially, not visually:
 * anything not marked `doc` or `portfolio` has not been approved by the client
 * yet.
 *
 * - `doc`        verbatim from Najik.docx (Nepali decoded from Preeti, English as written)
 * - `portfolio`  verbatim / lightly edited from Service_Portfolio_Overview.pdf
 * - `translated` faithful translation of a `doc` or `portfolio` paragraph that
 *                exists in only one language
 * - `draft`      written for a service the sources name but do not describe
 */
export type ContentStatus = "doc" | "portfolio" | "translated" | "draft";

export interface Prose {
  status: ContentStatus;
  paragraphs: string[];
}

export interface Bullet {
  title: string;
  text: string;
}

/** A named block inside a section page, e.g. Biography inside Production. */
export interface Subsection {
  id: string;
  title: string;
  lead?: string;
  body: Prose;
  bullets?: Bullet[];
}

export interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

/** One ordered stage of a delivery process. Numbered, because it is a sequence. */
export interface ProcessStep {
  title: string;
  text: string;
}

/** A question and its answer. Rendered as `<details>` and as FAQPage schema. */
export interface Faq {
  question: string;
  answer: string;
}

/**
 * A still image shipped with the repo. `src` is a site-absolute path under
 * `public/`; every dimension is declared so the browser reserves the box and
 * the page does not shift while the file loads.
 */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/**
 * A video for a page. The client has supplied no footage yet, so every entry
 * is currently `undefined` and the player renders nothing — see
 * `public/media/README.md`. When a URL arrives the page gains a player and a
 * `VideoObject` node in its structured data with no further code change.
 */
export interface VideoAsset {
  /** Watch URL (YouTube) or a file under `public/media/video/`. */
  url: string;
  /** Embed URL for the iframe; derived for YouTube when omitted. */
  embedUrl?: string;
  title: string;
  description: string;
  /** Poster frame. Required, so the facade never renders an empty box. */
  thumbnail: string;
  /** ISO 8601, e.g. "2026-02-01". Used by VideoObject.uploadDate. */
  uploadDate?: string;
  /** ISO 8601 duration, e.g. "PT2M14S". */
  duration?: string;
}

export interface PageMedia {
  image: ImageAsset;
  video?: VideoAsset;
}

/**
 * A routed leaf page: one service, one URL, at
 * `/[lang]/[category]/[slug]` — e.g. `/ne/production/biography`.
 */
export interface ServicePage {
  slug: string;
  /** Slug of the `Section` this page hangs under. */
  category: string;
  /** Short label used in the mega menu and the footer. */
  navLabel: string;
  /** Page H1. */
  title: string;
  /** Eyebrow above the H1. */
  eyebrow: string;
  /** One-sentence summary, used on the parent grid and as the OG description. */
  lead: string;
  /** `<title>` for this page, without the site-name suffix. */
  metaTitle: string;
  /** `<meta name="description">`. Longer and more specific than `lead`. */
  metaDescription: string;
  keywords: string[];
  body: Prose;
  /** What the client actually receives. */
  deliverables: Bullet[];
  /** How the work runs, in order. */
  process?: ProcessStep[];
  faqs: Faq[];
  /**
   * Status of everything on the page that is not `body` — the deliverables,
   * the process, and the FAQ answers. These are ours until the client signs
   * them off, so they carry their own status rather than borrowing the body's.
   */
  supportStatus: ContentStatus;
  media: PageMedia;
  cta: Cta;
}

/** A routed page under /[lang]/[section]. */
export interface Section {
  slug: string;
  /** Short label used in navigation. */
  navLabel: string;
  /** Page H1. */
  title: string;
  /** Eyebrow above the H1. */
  eyebrow: string;
  /** One-sentence summary; also used as the meta description. */
  lead: string;
  /** `<title>` override. Falls back to `title` when absent. */
  metaTitle?: string;
  /** `<meta name="description">` override. Falls back to `lead` when absent. */
  metaDescription?: string;
  keywords?: string[];
  body: Prose;
  subsections?: Subsection[];
  bullets?: Bullet[];
  /** Ordered delivery stages, when the section describes a way of working. */
  process?: ProcessStep[];
  faqs?: Faq[];
  media?: PageMedia;
  cta?: Cta;
  /** Show in the primary header nav (everything shows in the footer). */
  inPrimaryNav: boolean;
  /** Which footer column the page is listed under. */
  group: "company" | "services";
  /**
   * Set on the four service categories. Marks the section as a hub whose leaf
   * pages are the `ServicePage` entries pointing back at this slug, and puts
   * it in the header's services menu.
   */
  isServiceCategory?: boolean;
}

export interface HomeCard {
  slug: string;
  title: string;
  text: string;
}

export interface Home {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroPrimaryCta: Cta;
  heroSecondaryCta: Cta;
  tickerItems: string[];
  introHeading: string;
  intro: Prose;
  whatWeDoHeading: string;
  whatWeDoLead: string;
  cards: HomeCard[];
  sancharHeading: string;
  sancharLead: string;
  sancharCta: Cta;
  contactHeading: string;
  contactLead: string;
}

/** The `/services` hub: one page listing every category and every leaf. */
export interface ServicesHub {
  eyebrow: string;
  title: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  body: Prose;
  /** Heading above the full A–Z list of leaf services. */
  allServicesHeading: string;
  allServicesLead: string;
  faqs: Faq[];
  media: PageMedia;
  cta: Cta;
}

export interface ContactPage {
  eyebrow: string;
  title: string;
  lead: string;
  labels: {
    address: string;
    email: string;
    phone: string;
    vat: string;
    hours: string;
    portal: string;
    follow: string;
  };
  note: string;
  form: {
    heading: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    hint: string;
  };
}

export interface Ui {
  skipToContent: string;
  menu: string;
  close: string;
  languageSwitcherLabel: string;
  readMore: string;
  visitPortal: string;
  callUs: string;
  emailUs: string;
  backToTop: string;
  footerRights: string;
  footerVat: string;
  footerTagline: string;
  draftBadge: string;
  navHeading: string;
  contactHeading: string;
  companyHeading: string;
  servicesHeading: string;
  portalTagline: string;
  /** Headings introduced by the service pages. */
  breadcrumbLabel: string;
  deliverablesHeading: string;
  processHeading: string;
  faqHeading: string;
  relatedHeading: string;
  relatedLead: string;
  allServicesLabel: string;
  watchLabel: string;
  exploreLabel: string;
}

export interface Dictionary {
  locale: Locale;
  /** Site name as used in <title> suffixes and the wordmark. */
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ui: Ui;
  home: Home;
  sections: Section[];
  /** Every leaf service page, in menu order. */
  services: ServicePage[];
  servicesHub: ServicesHub;
  contact: ContactPage;
}
