import type { Config } from "tailwindcss";

/**
 * Najikako Sathi Media Pvt. Ltd. — design tokens.
 *
 * Editorial media palette: near-black "ink" ground, a single red brand accent
 * carried over from Right Sanchar's news identity, and a warm gold used
 * sparingly for emphasis. Typography pairs a Latin display/body family with
 * Mukta for Devanagari so Nepali and English copy share a baseline.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1017",
          soft: "#141B25",
          muted: "#1E2733",
        },
        paper: "#FFFFFF",
        mist: "#F5F7FA",
        line: "#E3E8EF",
        "line-dark": "#2A3441",
        brand: {
          DEFAULT: "#D02233",
          dark: "#9E0F26",
          light: "#F5D3D7",
          wash: "#FDF2F3",
        },
        gold: {
          DEFAULT: "#E9A800",
          dark: "#B98600",
          wash: "#FFF8E6",
        },
        body: "#56617A",
        "body-invert": "#AEB8C8",
      },
      fontFamily: {
        display: ["var(--font-sora)", "var(--font-mukta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-mukta)", "system-ui", "sans-serif"],
        nepali: ["var(--font-mukta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        overline: ["12px", { lineHeight: "16px", letterSpacing: "0.14em", fontWeight: "600" }],
        caption: ["13px", { lineHeight: "20px", fontWeight: "500" }],
        "body-sm": ["15px", { lineHeight: "26px", fontWeight: "400" }],
        "body-md": ["17px", { lineHeight: "30px", fontWeight: "400" }],
        "body-lg": ["19px", { lineHeight: "34px", fontWeight: "400" }],
        "title-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "title-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-sm": ["30px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["38px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["44px", { lineHeight: "52px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["64px", { lineHeight: "70px", letterSpacing: "-0.03em", fontWeight: "700" }],
      },
      spacing: {
        gutter: "20px",
        section: "88px",
        "section-sm": "56px",
      },
      maxWidth: {
        container: "1200px",
        prose: "68ch",
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "10px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 16, 23, 0.04), 0 12px 32px -12px rgba(11, 16, 23, 0.12)",
        lift: "0 2px 4px rgba(11, 16, 23, 0.06), 0 24px 48px -20px rgba(11, 16, 23, 0.24)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        ticker: "ticker 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
