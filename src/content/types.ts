import type { Locale } from "@/lib/i18n";

/**
 * Where a piece of copy came from. This is enforced editorially, not visually:
 * anything not marked `doc` has not been approved by the client yet.
 *
 * - `doc`        verbatim from Najik.docx (Nepali decoded from Preeti, English as written)
 * - `translated` faithful translation of a `doc` paragraph that exists in only one language
 * - `draft`      written for a section the document names but does not fill in
 */
export type ContentStatus = "doc" | "translated" | "draft";

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
  body: Prose;
  subsections?: Subsection[];
  bullets?: Bullet[];
  cta?: Cta;
  /** Show in the primary header nav (everything shows in the footer). */
  inPrimaryNav: boolean;
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
  contact: ContactPage;
}
