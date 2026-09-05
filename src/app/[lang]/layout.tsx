import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getDictionary, serviceCategories, servicesInCategory } from "@/content";
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
  themeColor: "#08090C",
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
    // Anek Devanagari for display, Mukta for body in both scripts, JetBrains
    // Mono for labels and numerals. All three are Devanagari-capable or fall
    // back to Mukta, so the Nepali and English trees share one type system.
    <html lang={htmlLang[locale]} className={`scroll-smooth ${fontVariables}`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-content-dim antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-canvas"
        >
          {dict.ui.skipToContent}
        </a>
        {/* Scroll reveals start at opacity 0 and are un-hidden by an
            IntersectionObserver. Without scripting, nothing would ever un-hide
            them, so the content is shown outright instead. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}.hangs{opacity:1}.stroke-draw{transform:scaleX(1)}"}</style>
        </noscript>
        <Header
          lang={locale}
          siteName={dict.siteName}
          labels={{
            menu: dict.ui.menu,
            close: dict.ui.close,
            language: dict.ui.languageSwitcherLabel,
            nav: dict.ui.navHeading,
            contact: dict.ui.contactHeading,
            services: dict.ui.servicesHeading,
            allServices: dict.ui.allServicesLabel,
            overview: dict.ui.exploreLabel,
            startConversation: dict.ui.startConversation,
          }}
          // Every section, in dictionary order. The header decides what goes
          // in the bar (`primary`) and what the phone menu shows as a
          // department accordion instead of a flat link (`isCategory`).
          items={dict.sections.map((section) => ({
            slug: section.slug,
            label: section.navLabel,
            primary: section.inPrimaryNav,
            isCategory: Boolean(section.isServiceCategory),
          }))}
          serviceCategories={serviceCategories(locale).map((category) => ({
            slug: category.slug,
            label: category.navLabel,
            services: servicesInCategory(locale, category.slug).map((service) => ({
              slug: service.slug,
              label: service.navLabel,
            })),
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
