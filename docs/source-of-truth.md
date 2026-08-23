# Source of truth — Najikako Sathi Media Pvt. Ltd.

Everything the site says about the company comes from two places:

1. **`Najik.docx`** (repo root) — the client's company profile.
2. **The contact block supplied with it** (address, phone, email, VAT).

This file records both, in full, so nobody has to re-open the `.docx` or
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

- `doc` — in the document, reproduced faithfully
- `translated` — the document has it in one language only; the other side is our translation
- `draft` — the document *names* the service but does not describe it; copy is ours and unapproved

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

### Advertising, Training, Social initiatives — `draft`

Named in the introduction, never described. The pages exist with our copy and
are marked `draft`. Run the site with `NEXT_PUBLIC_SHOW_CONTENT_STATUS=1` to
see the badge on every unapproved block.

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
2. **Legal name spelling** — see §1.
3. **English production copy** — approve or replace our translation.
4. **Advertising / Training / Social-impact copy** — approve or replace the drafts.
5. **Team page** — names, roles, photographs.
6. **Photography and showreel** — the design is text-first because no imagery
   was supplied. Hero and section bands have room for stills or video.
7. **Contact form delivery** — currently a `mailto:` composer. Needs a real
   endpoint if the client wants messages to land in an inbox automatically.
8. **Office hours** — `siteConfig.hours` is an assumption (Sun–Fri, 10:00–18:00).
   Confirm.
