# najikkosathi.com

Bilingual (Nepali / English) website for **Najikako Sathi Media Pvt. Ltd.** —
Right Sanchar news portal, documentary and biography production, advertising,
and media training. Anamnagar, Kathmandu.

## Run

```bash
npm install
npm run dev     # http://localhost:3000 -> /ne
npm run build
npm run lint
```

Show the content-status badges while reviewing copy:

```bash
NEXT_PUBLIC_SHOW_CONTENT_STATUS=1 npm run dev
```

## Where to edit

| I want to change | File |
| --- | --- |
| Page copy | `src/content/ne.ts` and `src/content/en.ts` (same `slug` in both) |
| Address, phone, email, VAT, social links | `src/lib/site-config.ts` |
| Colours, type scale, spacing | `tailwind.config.ts` |

## Docs

- [`CLAUDE.md`](CLAUDE.md) — working instructions and conventions
- [`docs/source-of-truth.md`](docs/source-of-truth.md) — `Najik.docx` decoded,
  annotated, with the open items still needed from the client
