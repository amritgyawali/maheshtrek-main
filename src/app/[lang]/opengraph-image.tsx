import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Najikako Sathi Media Pvt. Ltd.";

/** Prerender one card per locale instead of rendering on demand. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Social preview card.
 *
 * Text is Latin in both locales on purpose: the image renderer ships no
 * Devanagari font, so Nepali copy here would render as empty boxes. Replace
 * this with an exported design once brand artwork exists.
 */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ne";

  const tagline =
    locale === "ne"
      ? "Sanchar · Production · Training"
      : "News · Production · Training";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#0B1017",
          padding: 72,
          color: "#FFFFFF",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#D02233",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 26, letterSpacing: 2, color: "#AEB8C8" }}>
            {siteConfig.domain.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            Najikako Sathi Media Pvt. Ltd.
          </div>
          <div style={{ fontSize: 32, color: "#AEB8C8" }}>{tagline}</div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#AEB8C8" }}>
          <span>{siteConfig.rightSanchar.display}</span>
          <span>·</span>
          <span>{siteConfig.address.full}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
