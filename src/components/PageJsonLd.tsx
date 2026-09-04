import type { SchemaNode } from "@/lib/schema";

/**
 * Per-page structured data. The site-wide Organization and WebSite nodes are
 * emitted once from the locale layout; this adds the nodes that describe the
 * page itself — WebPage, BreadcrumbList, Service, FAQPage, VideoObject.
 *
 * Rendered inside `<main>` rather than in the head, which is equally valid for
 * JSON-LD and keeps the page's own data next to the page that owns it.
 */
export default function PageJsonLd({ nodes }: { nodes: SchemaNode[] }) {
  if (nodes.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      // Author-controlled content from the content dictionaries; no user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }),
      }}
    />
  );
}
