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
 * Social preview card, lit like the site: dark canvas, one accent source in
 * the corner.
 *
 * Text is Latin in both locales on purpose — the image renderer ships no
 * Devanagari font, so Nepali copy here would render as empty boxes.
 */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ne";

  const tagline =
    locale === "ne" ? "Sanchar, Production, Training" : "News, Production, Training";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#08090C",
          padding: 72,
          color: "#F2F5F9",
          fontSize: 32,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: 350,
            background: "radial-gradient(closest-side, rgba(255,59,79,0.55), rgba(8,9,12,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -280,
            left: -180,
            width: 640,
            height: 640,
            borderRadius: 320,
            background: "radial-gradient(closest-side, rgba(122,107,255,0.45), rgba(8,9,12,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 17,
              background: "linear-gradient(135deg, #FF3B4F 0%, #7A6BFF 100%)",
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#9AA5B4" }}>
            {siteConfig.domain.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            Najikako Sathi Media Pvt. Ltd.
          </div>
          <div style={{ fontSize: 32, color: "#9AA5B4", marginTop: 20 }}>{tagline}</div>
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 24, color: "#7D8797" }}>
          <span>{siteConfig.rightSanchar.display}</span>
          <span>{siteConfig.address.full}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
