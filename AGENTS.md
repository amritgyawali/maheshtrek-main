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

**Two client documents are the source of truth for what the company says about
itself:** `Najik.docx` (the company profile) and
`Service_Portfolio_Overview.pdf` (the scope of work — the sixteen services).

Both are transcribed in full — Nepali decoded from the Preeti legacy font,
English as written — in [`docs/source-of-truth.md`](docs/source-of-truth.md).
Read that before touching copy.

Every paragraph in `src/content/` carries a `status`:

| status | meaning | may I edit it? |
| --- | --- | --- |
| `doc` | verbatim from `Najik.docx` | **No.** Client sign-off only. |
| `portfolio` | verbatim from `Service_Portfolio_Overview.pdf` | **No.** Client sign-off only. |
| `translated` | our translation of a paragraph a source supplies in one language | Improve the translation; do not change the meaning. |
| `draft` | our copy for a service the sources name but do not describe | Yes — it is unapproved anyway. |

A `ServicePage` carries a second status, `supportStatus`, covering everything
that is not the body: the deliverables, the process stages, and the FAQ
answers. All sixteen are `draft` — the PDF describes each service but states no
turnaround, no price, and no terms, so nothing in those blocks is approved.

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
    [lang]/                    root layout (owns <html lang>), home, sections, contact
      [section]/page.tsx       one renderer for every content section and category
        [service]/page.tsx     one renderer for every leaf service page
      services/page.tsx        the hub listing all four departments and 16 services
      contact/page.tsx         static route, wins over [section]
      opengraph-image.tsx      social card (Latin text only — see below)
      **/opengraph-image.tsx   one card per section, service, hub, and contact page
    icon.tsx apple-icon.tsx robots.ts sitemap.ts
  content/
    types.ts                   content shape, ContentStatus, ServicePage, media
    ne.ts  en.ts               the copy, one dictionary per locale
    services.ne.ts  .en.ts     the sixteen leaf pages + the hub, per locale
    index.ts                   getDictionary / getSection / getService / params
  components/                  presentational, no content literals
  lib/
    i18n.ts                    locales, href(), swapLocale()
    metadata.ts                buildMetadata() — canonical + hreflang + robots
    schema.ts                  per-page JSON-LD builders (WebPage, Service, FAQ…)
    og-card.tsx                the shared social-card renderer
    site-config.ts             company facts (address, phones, VAT, portal, socials)
  proxy.ts                     "/" and unprefixed paths -> /ne or /en (Next 16 proxy)
scripts/generate-media.mjs     draws every page plate into public/media/
public/media/README.md         how to swap in real photography and video
docs/source-of-truth.md        both documents, decoded and annotated
Najik.docx                     the original profile
```

### The URL shape

```
/[lang]                                  home
/[lang]/services                         hub — every department, every service
/[lang]/production                       department  (isServiceCategory: true)
/[lang]/production/biography             leaf service page
/[lang]/about  /right-sanchar  /team …   company pages
/[lang]/contact
```

A leaf's URL is `category/slug`, so the department is in the path and the two
read as one cluster rather than sixteen unrelated pages. The category segment
is checked against the page's own `category` field, so `/training/biography`
404s instead of serving the same page at a second address.

`advertising` used to be a top-level section and is now a leaf under
Production, where the scope-of-work document puts it; `next.config.ts` keeps a
permanent redirect from the old URL.

**There is no `src/app/layout.tsx` on purpose.** `<html lang>` has to differ
per locale and Next allows exactly one `<html>`, so `src/app/[lang]/layout.tsx`
is the root layout. Adding a layout above it breaks the locale attribute.

---

## 3. Content changes

Adding or editing a page is a content change, not a code change.

**A new service** is a `ServicePage` object added to **both**
`src/content/services.ne.ts` and `src/content/services.en.ts`, with a
`category` matching an existing section's slug. The route, the mega menu, the
footer index, the parent department's grid, the sibling grid on every related
page, the sitemap entry, the hreflang pair, the social card, and the
`Service` + `FAQPage` structured data all follow. Add a plate for it to
`scripts/generate-media.mjs` and re-run `npm run media`.

**A new section:**

1. Add a `Section` object to **both** `src/content/ne.ts` and `src/content/en.ts`.
2. Use the **same `slug` in both** — slugs are English and locale-independent,
   which is what makes the language switcher a pure segment swap and keeps the
   hreflang pairs valid. Never localise a slug.
3. Set `inPrimaryNav: true` only if it belongs in the header; everything shows
   in the footer regardless. A section with `isServiceCategory: true` is
   reached through the services menu instead and should stay out of the flat
   nav list.
4. Set an honest `status` on every `Prose` block, and an honest
   `supportStatus` on every `ServicePage`.

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
translation in search results. It also sets the `max-image-preview:large` /
`max-snippet:-1` robots directives, which have to be opted into.

Pass `titleAbsolute: true` on any page whose `metaTitle` is already written to
fill a result on its own — the layout otherwise appends `" — <site name>"`,
which pushes a service title past the ~60 characters Google will show.

**Never set `openGraph.images` in `buildMetadata`.** Every route segment ships
its own `opengraph-image.tsx` and Next wires the generated card into that
route's tags; declaring an image in both places is how a page ends up
advertising the wrong card.

Structured data comes from two places and they do not overlap:

- `src/components/JsonLd.tsx`, once per page from the locale layout:
  `NewsMediaOrganization` (VAT number, address, both phone numbers, Right
  Sanchar as a sub-organization), `WebSite`, and the full service
  `OfferCatalog`. It reads the dictionaries, so it follows the service list on
  its own.
- `src/lib/schema.ts` + `src/components/PageJsonLd.tsx`, per page: `WebPage`,
  `BreadcrumbList`, `Service`, `ItemList`, `FAQPage`, and `VideoObject`.
  Everything here references the Organization by `@id` rather than repeating
  the company facts, so the registered details are asserted exactly once.

The visible breadcrumb and the `BreadcrumbList` are built from the same `trail`
array on each page. Keep it that way — a trail that disagrees with its markup
is worse than no markup.

FAQ answers are published as `FAQPage`. Do not add a question whose answer the
client has not approved: a rich result is the company speaking.

---

## 7. Design language — dark broadcast console

The site is **dark only**. There is no light theme and no `prefers-color-scheme`
branch; `color-scheme: dark` is set on the root and `themeColor` is the canvas.
Do not add a light variant without redoing the token layer.

The canvas is near-black and lit from behind: radial `Glow` sources sit under
glass panels, so surfaces pick colour up from the light rather than from a
border drawn on top of them. Content is laid out as a **bento grid** — tiles of
different spans in one grid — which is what gives the pages density, because the
client has supplied no photography and none is faked.

**Surfaces.** Everything raised is a `.panel` (see `globals.css`): a
`bg-panel-raised/90` base, a top-lit white gradient, an `11%` white hairline and
a blur. `.panel-interactive` adds the hover lift used by linked tiles.
`.panel-lip` adds the highlight along the top edge. Do not invent a fourth
surface treatment — extend these.

**Colour, and the contrast rule that constrains it.** Small text on a
translucent panel is measured against the panel *composited over the canvas*,
not against the canvas, and that costs about 1.5:1. Two tokens exist only
because of it:

| token | value | rule |
| --- | --- | --- |
| `accent` | `#FF3B4F` | fills, glows, large text. Filled controls put `text-canvas` on top — white on this red is 3.4:1. |
| `accent-text` | `#FF6B7B` | **any red text under 24px.** `accent` on a panel is 3.8:1 and fails. |
| `content` / `content-dim` / `content-faint` | `#F2F5F9` / `#9AA5B4` / `#949FAE` | `content-faint` is already at the floor — do not darken it. |
| `iris` | `#7A6BFF` | gradients and glows only, never body text. |
| `mint` | `#2FE3A6` | live/status indicators only. |

Every string on the site currently clears WCAG AA under a composite-aware
check. Re-run one after changing any colour.

Type, in `src/lib/fonts.ts`, is chosen Devanagari-first — Nepali is the default
locale, so no face is used that cannot set it:

| role | face | why |
| --- | --- | --- |
| `font-display` | Anek Devanagari 500/600/700 | contemporary Indic superfamily with a matching Latin |
| `font-sans` | Mukta 400/500/600 | body in **both** scripts, so the two trees read as one publication |
| `font-mono` | JetBrains Mono 400/500 | labels, counters, phone numbers, VAT; Latin only, falls through to Mukta |

Two things Devanagari needs that Latin does not, both handled in `globals.css`
— do not undo them: running Nepali text gets `line-height: 1.9` and Nepali
headings `1.32`, because vowel marks sit above the headstroke and conjuncts
below it; and `.label` tracking relaxes to `0.03em` for `[lang="ne"]`, because
Latin-sized letterspacing visually breaks Devanagari conjuncts apart.

**No counters, with one exception.** `01 / 02 / 03` markers are deliberately
absent from the services and from the parts of a service page: those are sets,
not sequences. `ProcessList` is the exception and the reason the rule is worth
stating — research happens before the shoot, so its numbers describe the
content instead of decorating it.

**Imagery.** There is still no photography. Every page carries a generated
plate from `public/media/`, drawn by `scripts/generate-media.mjs` in the site's
own canvas, glows, and grid; a page's `media.image` points at one, with `alt`,
`width`, and `height` declared so nothing shifts on load. `MediaFigure` uses a
plain `<img>` on purpose: the sources are vector, so `next/image` has nothing
to optimise and would need `dangerouslyAllowSVG` enabled project-wide.
`VideoBlock` renders nothing at all until a page is given a `video` object —
see `public/media/README.md`.

**Motion.** The hero runs one staggered load sequence (`.hangs` + a per-element
`animationDelay`). `.hangs` must use the `animate-rise` **utility** — naming the
keyframes by hand in raw CSS silently does nothing, because Tailwind only emits
`@keyframes` for animations whose utility class appears in the build, and the
elements then stay at `opacity: 0` forever. The only looping motion is the
`SignalMeter` on the home feature tile and the status dots; all of it freezes
under `prefers-reduced-motion`.

**`Reveal` must never be able to hide content.** It starts at `opacity: 0`, so
it carries a 1.6s failsafe that shows the element whatever the
IntersectionObserver does, and `layout.tsx` ships a `<noscript>` rule that
un-hides every reveal. Keep both if you touch that component.

---

## 8. Code conventions

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

## 9. What this repo used to be

It was scaffolded from an unrelated "Mahesh Trek" site. Leftovers that are not
part of this project and can be deleted whenever the client confirms:
`alpine_expedition_*`, `trek_curator_*`, `image_from_https_www.trekcurator.com*`,
`extracted_text_from_https_www.trekcurator.com.md`, `public/images/`.
