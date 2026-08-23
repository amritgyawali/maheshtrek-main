import { Inter, Mukta, Sora } from "next/font/google";

/**
 * Self-hosted via `next/font` rather than a `<link>` to fonts.googleapis.com:
 * no render-blocking external stylesheet, no third-party request on first
 * paint, and the CSS variables below are what `tailwind.config.ts` resolves
 * `font-sans` / `font-display` / `font-nepali` to.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${sora.variable} ${mukta.variable}`;
