import { Anek_Devanagari, JetBrains_Mono, Mukta } from "next/font/google";

/**
 * Three faces, all Devanagari-capable or deliberately falling back to one that
 * is. Nepali is the default locale, so no face is chosen that cannot set it.
 */

/** Display. Contemporary Indic superfamily — tight, geometric, and drawn with
 *  a matching Latin, so headlines look like one design in both locales. */
export const anek = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-anek",
  display: "swap",
});

/** Body, both scripts. */
export const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mukta",
  display: "swap",
});

/** Utility: labels, counters, phone numbers, VAT, status readouts. Latin only
 *  — Devanagari falls through to Mukta, which is the intended behaviour. */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${anek.variable} ${mukta.variable} ${mono.variable}`;
