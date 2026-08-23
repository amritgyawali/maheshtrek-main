# najikkosathi.com — working instructions

Bilingual (Nepali / English) website for **Najikako Sathi Media Pvt. Ltd.**,
a Kathmandu media house: the Right Sanchar news portal, documentary and
biography production, advertising, and media training.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3.4 · no other
runtime dependencies.

```bash
npm run dev     # http://localhost:3000  -> redirects to /ne
npm run build
npm run lint
```

---

## 1. The one rule

**`Najik.docx` is the source of truth for what the company says about itself.**

Its full contents — Nepali decoded from the Preeti legacy font, English as
written — are transcribed in [`docs/source-of-truth.md`](docs/source-of-truth.md).
Read that before touching copy.

Every paragraph in `src/content/` carries a `status`:

| status | meaning | may I edit it? |
| --- | --- | --- |
| `doc` | verbatim from `Najik.docx` | **No.** Client sign-off only. |
| `translated` | our translation of a paragraph the document supplies in one language | Improve the translation; do not change the meaning. |
| `draft` | our copy for a service the document names but does not describe | Yes — it is unapproved anyway. |

`NEXT_PUBLIC_SHOW_CONTENT_STATUS=1 npm run dev` renders a badge on every
`draft` block, so a reviewer can see at a glance what still needs approval.

Never invent a fact about the company — a founding year, a client list, an
award, a headcount, a project name. If a section needs one, leave it out and
add it to the open-items list in `docs/source-of-truth.md`.

---

## 2. Where things live

```
src/
  app/
    [lang]/                 root layout (owns <html lang>), home, sections, contact
      [section]/page.tsx    one renderer for every content section
      contact/page.tsx      static route, wins over [section]
      opengraph-image.tsx   social card (Latin text only — see below)
    icon.tsx apple-icon.tsx robots.ts sitemap.ts
  content/
    types.ts                content shape + ContentStatus
    ne.ts  en.ts            the copy, one dictionary per locale
    index.ts                getDictionary / getSection / allSectionSlugs
  components/               presentational, no content literals
  lib/
    i18n.ts                 locales, href(), swapLocale()
    metadata.ts             buildMetadata() — canonical + hreflang
    site-config.ts          company facts (address, phones, VAT, portal, socials)
  proxy.ts                  "/" and unprefixed paths -> /ne or /en (Next 16 middleware)
docs/source-of-truth.md     the document, decoded and annotated
Najik.docx                  the original
```

**There is no `src/app/layout.tsx` on purpose.** `<html lang>` has to differ
per locale and Next allows exactly one `<html>`, so `src/app/[lang]/layout.tsx`
is the root layout. Adding a layout above it breaks the locale attribute.

---

## 3. Content changes

Adding or editing a page is a content change, not a code change.

1. Add a `Section` object to **both** `src/content/ne.ts` and `src/content/en.ts`.
2. Use the **same `slug` in both** — slugs are English and locale-independent,
   which is what makes the language switcher a pure segment swap and keeps the
   hreflang pairs valid. Never localise a slug.
3. Set `inPrimaryNav: true` only if it belongs in the header; everything shows
   in the footer regardless.
4. Set an honest `status` on every `Prose` block.

The route, the nav entry, the footer link, the sitemap entry, the hreflang
alternates, and `generateStaticParams` all follow automatically.

If the two dictionaries drift out of shape, TypeScript fails the build — both
are typed as `Dictionary`. Keep it that way.

---

## 4. Language rules

- Nepali is the default locale and `x-default`. `/` redirects by
  `Accept-Language`, falling back to `ne`.
- Both trees are complete translations. Do not ship a page that exists in one
  language only.
- Nepali copy is Unicode Devanagari. **Never paste Preeti-encoded text into the
  codebase** — decode it first (`npttf2utf`, recipe in `docs/source-of-truth.md`).
- Devanagari renders in Mukta, Latin in Inter/Sora; `[lang="ne"]` gets looser
  line-height in `globals.css`. Fonts are self-hosted through `next/font` in
  `src/lib/fonts.ts` and reach Tailwind as CSS variables — do not add a
  `<link>` to fonts.googleapis.com.
- Punctuation: the document uses a space before the danda (` ।`). The site
  drops that space — it is a typing habit from Preeti, not Nepali orthography.
  Wording is untouched.
- Anything rendered through `next/og` (`icon`, `apple-icon`,
  `opengraph-image`) has **no Devanagari font available**. Latin only there, or
  it renders as blank boxes.

---

## 5. Company facts

Address, phone numbers, email, VAT, and the Right Sanchar URL live in
`src/lib/site-config.ts` and are imported everywhere — footer, contact page,
schema.org. Never retype them into a component. `siteConfig.social` entries
with an empty string are skipped by the renderers, so an unknown handle is
safe to leave blank.

The contact form is a `mailto:` composer, not a submitting form — deliberately,
because there is no backend and a form that silently drops messages is worse
than no form. Replacing it with a real endpoint means changing the submit
handler in `src/components/ContactForm.tsx`; the markup stays.

---

## 6. SEO

`buildMetadata()` in `src/lib/metadata.ts` is the only place that builds
canonical URLs and hreflang alternates. Call it from every `generateMetadata`.
A page that hand-rolls its own `alternates` will quietly compete with its own
translation in search results.

`src/components/JsonLd.tsx` emits `NewsMediaOrganization` (with the VAT number,
address, both phone numbers, and Right Sanchar as a sub-organization),
`WebSite`, and a service `OfferCatalog`. Update it when the service list
changes.

---

## 7. Code conventions

- Server components by default. `"use client"` only where it is genuinely
  needed: `Header` (menu state), `LanguageSwitcher` (`usePathname`),
  `ContactForm` (inputs), `Reveal` (IntersectionObserver).
- Components take content as props. No content string is written inside a
  component — it belongs in a dictionary, or it is not translatable.
- Use `SiteLink` / `CtaButton` for links; they handle locale prefixing and the
  `target`/`rel` pair on outbound links.
- Tailwind tokens only (`bg-ink`, `text-brand`, `py-section`, `container-page`).
  No raw hex in JSX — extend `tailwind.config.ts` instead.
- Every interactive control needs an accessible name; every band that has no
  visible heading needs `ariaLabel`.

---

## 8. What this repo used to be

It was scaffolded from an unrelated "Mahesh Trek" site. Leftovers that are not
part of this project and can be deleted whenever the client confirms:
`alpine_expedition_*`, `trek_curator_*`, `image_from_https_www.trekcurator.com*`,
`extracted_text_from_https_www.trekcurator.com.md`, `public/images/`.
