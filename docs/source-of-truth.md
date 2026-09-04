# Source of truth — Najikako Sathi Media Pvt. Ltd.

Everything the site says about the company comes from three places:

1. **`Najik.docx`** (repo root) — the client's company profile.
2. **The contact block supplied with it** (address, phone, email, VAT).
3. **`Service_Portfolio_Overview.pdf`** — the client's scope-of-work document,
   which names and describes all sixteen services. Recorded in section 6 below.

This file records all three, in full, so nobody has to re-open the `.docx` or
re-run the Preeti decoding to check a sentence.

---

## 1. Company facts

| Field | Value |
| --- | --- |
| Legal name (doc) | Najikako Sathi Media Pvt. Ltd. |
| Legal name (Nepali) | नजिकको साथी मिडिया प्रा. लि. |
| Domain | `najikkosathi.com` |
| Address | Anamnagar, Kathmandu, Nepal |
| Email | najikkosathi@gmail.com |
| Phone | 9851336187 / 9867117411 |
| VAT | 609765694 |
| News portal | Right Sanchar — `www.rightsanchar.com` |

These live in [`src/lib/site-config.ts`](../src/lib/site-config.ts). Nothing
else in the codebase should hardcode them.

**Name discrepancy, unresolved:** the message accompanying the document spells
the company *"Najikko sathi media pvt. ltd"*, the document itself writes
*"Najikako Sathi Media Pvt. Ltd."*, and the domain is `najikkosathi.com`. The
site uses the document's spelling. Confirm which is the registered form before
launch — it appears in the footer, in schema.org, and in the legal line.

---

## 2. How the Nepali text was recovered

The `.docx` was typed in **Preeti**, a legacy Nepali TTF that maps Devanagari
glyphs onto ASCII code points. Reading the file as text yields
`glhssf] ;fyL ldl8of`, not `नजिकको साथी मिडिया` — 773 of the document's 775
runs carry `w:ascii="Preeti"`.

Decoding was done with [`npttf2utf`](https://github.com/casualsnek/npttf2utf)
(`FontMapper.map_to_unicode(text, "Preeti")`), paragraph by paragraph, on the
paragraphs whose punctuation profile marks them as Preeti rather than English.

Two known artefacts of that process, both corrected by hand in the content
files:

- English words typed inside a Preeti run decode to Devanagari nonsense —
  `-Advertisement_` became `ब्मखभचतष्कझभलत`. Restored as `(Advertisement)`,
  `(Storytelling)`, `(Biography Videos)`, `(Documentaries)`.
- `(www.rightsanchar.com)` in the media heading decoded the same way and was
  restored from the English paragraph.

To re-run the decode:

```bash
pip install npttf2utf
python -c "from npttf2utf import FontMapper; import npttf2utf, os; \
  fm = FontMapper(os.path.join(os.path.dirname(npttf2utf.__file__), 'map.json')); \
  print(fm.map_to_unicode(open('preeti.txt', encoding='utf-8').read(), 'Preeti'))"
```

---

## 3. The document, section by section

Status keys match `ContentStatus` in [`src/content/types.ts`](../src/content/types.ts):

- `doc` — in `Najik.docx`, reproduced faithfully
- `portfolio` — in `Service_Portfolio_Overview.pdf`, reproduced faithfully
- `translated` — a source has it in one language only; the other side is our translation
- `draft` — the sources *name* the service but do not describe it; copy is ours and unapproved

### Introduction — `doc` (both languages)

**Nepali** (decoded):

> नजिकको साथी मिडिया प्रा. लि. एक गतिशील र बहुआयामिक मिडिया संस्था हो, जसले सूचना, मनोरञ्जन र सामाजिक उत्तरदायित्वलाई एकसाथ अगाडि बढाउँदै आएको छ। हामी राईट सञ्चारमार्फत सत्य, तथ्य र निष्पक्ष समाचार सम्प्रेषण गर्नुका साथै उच्च स्तरीय डकुमेन्ट्री तथा भिडियो निर्माण, प्रभावकारी विज्ञापन सिर्जना, र मिडिया तथा सीप विकाससम्बन्धी विभिन्न तालिमजन्य कार्यक्रमहरू सञ्चालन गर्दै आएका छौँ। व्यावसायिक मिडिया सेवाका साथसाथै समाज रूपान्तरणका लागि विभिन्न सामाजिक कार्यहरूमा समेत सक्रिय रहँदै, नाम जस्तै हरेक पाइलामा तपाईँको भरपर्दो र नजिकको साथी बनेर सञ्चार जगतमा नयाँ आयाम थप्नु नै हाम्रो मुख्य उद्देश्य हो।

**English** (as written by the client):

> Najikako Sathi Media Pvt. Ltd. is a dynamic, multi-dimensional media house committed to advancing information, entertainment, and social responsibility together. Through Right Sanchar, we bring you honest, fact based, and unbiased news, alongside high quality documentary and video production, impactful advertising campaigns, and a range of training programs focused on media and skill development. Beyond our core media services, we remain actively engaged in social initiatives aimed at transforming communities. True to our name, our goal is to walk alongside you at every step as your trusted, close companion while adding new dimensions to the world of communication.

This paragraph is the site's contract: it names **four** services — news,
documentary/video production, advertising, and media & skill training — plus
social initiatives.

### Media: Right Sanchar — `doc` (both languages)

Heading in the document: `मिडिया : राईट सञ्चार (www.rightsanchar.com)`.
Two Nepali paragraphs and two English paragraphs, all reproduced in
`src/content/{ne,en}.ts` under the `right-sanchar` section.

### Production — Nepali `doc`, English `translated`

Two Nepali paragraphs (overview + focus on research, storytelling, and picture
and sound editing). **The document has no English translation of these two
paragraphs** — the English on `/en/production` is ours, marked `translated`.

The document then writes `Production भित्रै` ("inside Production") and lists:

- **Biography** — English `doc`, Nepali `doc`
- **Documentary** — Nepali `doc` (2 paragraphs), English `doc` (2 paragraphs)

The Biography and Documentary paragraphs are no longer rendered as
subsections of `/production`: each is now a page of its own under
`/production/biography` and `/production/documentary`, carrying the same text.
Keeping both would have put identical paragraphs on two URLs.

### Advertising, Training, Social initiatives — described in the PDF

Named in the introduction of `Najik.docx` and never described there, these were
`draft` until `Service_Portfolio_Overview.pdf` arrived. Their body copy is now
`portfolio` (English) / `translated` (Nepali); see section 6. The material around the
body — deliverables, process stages, FAQ answers — is still ours and still
`draft`, carried on each page's `supportStatus`. Run the site with
`NEXT_PUBLIC_SHOW_CONTENT_STATUS=1` to see the badge on every unapproved
block.

### Team, Careers — `draft`

Not in the document at all; added because the site needs them. Placeholder
copy, explicitly says details are pending.

---

## 4. Author instructions found in the document

Two lines in the `.docx` are notes to the web team, not copy. Both are
implemented:

| Note (decoded) | Meaning | Where it landed |
| --- | --- | --- |
| अब यसैमा एउटा क्लिक बटन राख्ने जसमा क्लिक गरेपछि सिधै राइट संचारको वेभसाइटमा जान सकियास् | Put a click button here that goes straight to the Right Sanchar website | Hero CTA, the ink Right Sanchar band on the home page, the `right-sanchar` page CTA, and the footer |
| यसमा नै हाम्रो वेभसाईट, युट्युब, फेसबुकको लिंक राख्ने जहाँ क्लिक गरेर जान मिलोस् | Put our website, YouTube, and Facebook links here, clickable | `siteConfig.social` — **URLs not supplied**; the footer and contact page render only the entries that have one |

---

## 5. Open items before launch

1. **Social URLs** — Facebook, YouTube (and TikTok/Instagram if they exist).
   Fill `siteConfig.social`; empty entries are skipped, not broken.
2. **Legal name spelling** — see section 1.
3. **English production copy** — approve or replace our translation.
4. **Service-page support copy** — the deliverables, process stages, and FAQ
   answers on all sixteen service pages are ours (`supportStatus: "draft"`).
   The PDF supplies the description of each service, not its terms of
   engagement, so every claim in these blocks needs confirming: turnaround
   times, what is handed over, ownership of footage and data, the minimum ad
   budget on `/social-media/facebook-boosting`, and the certificate wording on
   `/training/journalism-basics`.
5. **Team page** — names, roles, photographs.
6. **Photography and showreel** — no imagery was supplied, so every page shows
   a generated plate from `public/media/` instead. Replacing one with a real
   photograph is a one-line content change; adding a film is a `video` object
   beside the image. Both are documented in
   [`public/media/README.md`](../public/media/README.md).
7. **Contact form delivery** — currently a `mailto:` composer. Needs a real
   endpoint if the client wants messages to land in an inbox automatically.
8. **Office hours** — `siteConfig.hours` is an assumption (Sun–Fri, 10:00–18:00).
   Confirm.

---

## 6. `Service_Portfolio_Overview.pdf` — the scope of work

A three-page PDF, "SERVICE PORTFOLIO & SCOPE OF WORK", subtitled
"Comprehensive Overview of Production, Social Media Management, Training, and
R&D Services". English throughout, with the department headings also given in
Devanagari. It is the source for every page under the four service categories.

Its own footer notes that it was "generated based on service outlines
provided" — so it is the client's summary of their scope, not a legal
document. Nothing in it states a price, a turnaround, or a guarantee, which is
why none of ours claim to come from it.

### Structure

| # | Department (PDF) | Nepali heading (PDF) | Site page |
| --- | --- | --- | --- |
| I | Production Work | प्रोडक्सनको काम — भिडियो, फोटो | `/production` |
| II | Social Media Handling | सोसल मिडिया ह्याण्डलिंग | `/social-media` |
| III | Training Programs | तालिम तथा क्षमता विकास | `/training` |
| IV | Research & Development | अनुसन्धान तथा विकास | `/research-development` |

### The sixteen services

| PDF entry | Nepali (PDF) | URL |
| --- | --- | --- |
| I.1 Biography | जीवनी | `/production/biography` |
| I.2 Documentary Film Production | वृत्तचित्र | `/production/documentary` |
| I.3 Advertisements & Commercials | विज्ञापन | `/production/advertising` |
| I.4 Profile Making | प्रोफाइल मेकिङ | `/production/profile-making` |
| II.1 Biography & Profile Creation | — | `/social-media/digital-profile` |
| II.2 Media Consulting | — | `/social-media/media-consulting` |
| II.3 Facebook Boosting & Digital Campaigns | — | `/social-media/facebook-boosting` |
| II.4 Social Media Advertisements | — | `/social-media/social-media-ads` |
| II.5 Event Coverage & Management | — | `/social-media/event-coverage` |
| III.1 Social Media Handling & Strategy | — | `/training/social-media-training` |
| III.2 Content Creation | — | `/training/content-creation` |
| III.3 Journalism Basics | — | `/training/journalism-basics` |
| III.4 Creativity & Technical Production | — | `/training/creative-technical` |
| III.5 Idea Monetization | — | `/training/idea-monetization` |
| IV.1 Source Research | — | `/research-development/source-research` |
| IV.2 Government & Non-Government Collaboration | — | `/research-development/government-collaboration` |

Two slugs deliberately do not echo the PDF's wording. `II.1 Biography &
Profile Creation` became `digital-profile`, because a slug named `biography`
already exists under Production and describes a different service; and
`III.1 Social Media Handling & Strategy` became `social-media-training`, to
keep it distinct from the department of nearly the same name. The page titles
still read as the PDF writes them.

### Department descriptions, verbatim

> **I. Production Work.** Full-service media production focusing on
> high-quality visual storytelling, corporate branding, and public messaging
> through professional photography and videography.

> **II. Social Media Handling.** Strategic digital presence management,
> branding, audience engagement, and performance marketing across major
> digital media platforms.

> **III. Training Programs.** Comprehensive capacity building and practical
> technical training designed for individuals, corporate teams, journalists,
> and creative professionals.

> **IV. Research & Development (R&D).** In-depth field research, media
> monitoring, data collection, and multi-sectoral development initiatives in
> collaboration with key stakeholders.

### Service descriptions, verbatim

Each of these is the first paragraph of the matching page's `body`, in English
as `portfolio`, and in Nepali as `translated`.

1. **Biography.** In-depth video and photo biographical storytelling for key
   figures, leaders, dynamic personalities, and historical personal archives.
   Captures lifetime achievements, personal narratives, and legacy.
2. **Documentary Film Production.** End-to-end thematic storytelling and
   documentary film creation covering social issues, cultural heritage,
   institutional milestones, and development projects.
3. **Advertisements & Commercials.** High-impact promotional videos, TV
   commercials (TVCs), digital ad campaigns, and commercial photo shoots
   tailored for brand awareness and market reach.
4. **Profile Making.** Professional corporate and organizational profile
   creation using structured video summaries, photographic showcases, and
   audio-visual presentations to showcase company identity and capacity.
5. **Biography & Profile Creation.** Crafting and optimizing personal and
   organizational digital profiles across channels (Facebook, YouTube,
   Instagram, LinkedIn), establishing brand identity and authority.
6. **Media Consulting.** Strategic advice on communication channels, public
   relations, crisis management, digital positioning, and targeted public
   outreach strategies.
7. **Facebook Boosting & Digital Campaigns.** Targeted ad placement, audience
   demographic segmentation, post boosting, ROI analysis, and paid performance
   marketing to maximize reach and conversion.
8. **Social Media Advertisements.** Designing and publishing bespoke visual
   ads, banner graphics, short promotional reels, and engaging copywriting
   tailored specifically for digital feeds.
9. **Event Coverage & Management.** Live digital streaming, real-time social
   media updates, multimedia publishing, and complete media coordination
   during public events, conferences, and celebrations.
10. **Social Media Handling & Strategy.** Practical guidance on page
    administration, algorithmic optimization, analytics interpretation,
    content scheduling, and community engagement tactics.
11. **Content Creation.** Hands-on training in developing compelling visual,
    written, and video content tailored to modern digital audiences.
12. **Journalism Basics.** Core fundamentals of news gathering, interviewing
    techniques, ethical reporting, press release writing, and investigative
    storytelling.
13. **Creativity & Technical Production.** Advanced practical skill modules in
    visual arts and production technology: Videography, Photography, Video
    Editing, Graphic Design, Motion Graphics.
14. **Idea Monetization.** Strategies to transform creative projects, YouTube
    channels, digital content, and media skills into sustainable revenue
    streams through ad revenue, sponsorships, and affiliate channels.
15. **Source Research.** In-depth background investigation, primary/secondary
    data gathering, field study, stakeholder mapping, and policy review for
    media and development projects.
16. **Government & Non-Government Collaboration.** Partnering with
    federal/local government bodies, NGOs, INGOs, and civil society
    organizations for baseline studies, impact assessment reports, awareness
    campaigns, and community development initiatives.

### What the PDF does *not* supply

No prices, no timelines, no client list, no past-project names, no team names,
no photographs, no video. Everything on the service pages beyond the sixteen
paragraphs above is ours and marked accordingly — see open item 4 in section 5.
