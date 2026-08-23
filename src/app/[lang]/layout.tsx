import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/content";
import { htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

/**
 * This is the site's root layout. There is deliberately no `src/app/layout.tsx`
 * above it: `<html lang>` has to change per locale, and Next only allows one
 * html element, so the locale segment owns the document shell. `/` is sent
 * here by `src/proxy.ts`.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1017",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata({
      lang,
      title: dict.metaTitle,
      description: dict.metaDescription,
      keywords: dict.keywords,
    }),
    title: {
      default: dict.metaTitle,
      template: `%s — ${dict.siteName}`,
    },
    applicationName: siteConfig.legalName,
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    publisher: siteConfig.legalName,
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    // Sora for display, Inter for Latin body, Mukta for Devanagari.
    <html lang={htmlLang[locale]} className={`scroll-smooth ${fontVariables}`}>
      <body
        className={`flex min-h-screen flex-col bg-paper font-sans text-body antialiased ${
          locale === "ne" ? "font-nepali" : ""
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          {dict.ui.skipToContent}
        </a>
        <Header
          lang={locale}
          siteName={dict.siteName}
          labels={{
            menu: dict.ui.menu,
            close: dict.ui.close,
            language: dict.ui.languageSwitcherLabel,
            nav: dict.ui.navHeading,
            contact: dict.ui.contactHeading,
          }}
          items={dict.sections.map((section) => ({
            slug: section.slug,
            label: section.navLabel,
            primary: section.inPrimaryNav,
          }))}
        />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer lang={locale} dict={dict} />
        <JsonLd lang={locale} dict={dict} />
      </body>
    </html>
  );
}
