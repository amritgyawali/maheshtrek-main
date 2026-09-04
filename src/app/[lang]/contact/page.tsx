import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Band from "@/components/Band";
import ContactDetails from "@/components/ContactDetails";
import ContactForm from "@/components/ContactForm";
import PageJsonLd from "@/components/PageJsonLd";
import { getDictionary } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbList, graph, webPage, type Crumb } from "@/lib/schema";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return buildMetadata({
    lang,
    title: dict.contact.title,
    description: dict.contact.lead,
    path: "contact",
  });
}

export default async function ContactPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { contact, ui } = dict;

  const trail: Crumb[] = [{ name: contact.title, path: "contact" }];
  const nodes = graph([
    {
      ...webPage({
        lang,
        path: "contact",
        title: contact.title,
        description: contact.lead,
        trail,
      }),
      "@type": "ContactPage",
    },
    breadcrumbList(lang, dict.siteName, trail),
  ]);

  return (
    <>
      <PageHeader
        lang={lang}
        eyebrow={contact.eyebrow}
        title={contact.title}
        lead={contact.lead}
        homeLabel={dict.siteName}
        breadcrumbLabel={ui.breadcrumbLabel}
        trail={trail}
      />

      <Band tone="raised">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <ContactDetails lang={lang} contact={contact} />
            <p className="mt-8 max-w-prose text-body-sm text-content-faint">{contact.note}</p>
          </div>
          <ContactForm contact={contact} />
        </div>
      </Band>

      <PageJsonLd nodes={nodes} />
    </>
  );
}
