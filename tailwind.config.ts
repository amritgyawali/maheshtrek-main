import type { Config } from "tailwindcss";

/**
 * Najikako Sathi Media Pvt. Ltd. — design tokens.
 *
 * Direction: a dark broadcast console. Near-black canvas, glass panels laid
 * out as a bento grid, and light used as the material — radial glows behind
 * the surfaces rather than borders drawn on top of them. Right Sanchar's red
 * survives as the action colour, brightened so it holds up on black, with a
 * violet used only in gradients and a mint reserved for live/status.
 *
 * The site is dark-only by design; there is no light theme to fall back to.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#08090C",
        panel: {
          DEFAULT: "#0E1116",
          raised: "#141922",
          high: "#1A212B",
        },
        hairline: {
          DEFAULT: "#1E242E",
          bright: "#2C3542",
        },
        /** Right Sanchar red, brightened for a black ground. Filled controls
         *  put `canvas` on top of it — white would only reach 3.4:1. */
        accent: {
          DEFAULT: "#FF3B4F",
          /** Small red text sits on translucent panels, where the base red
           *  only reaches 3.8:1. This tint clears 4.5:1 on every surface. */
          text: "#FF6B7B",
          deep: "#D91B33",
          dim: "#7A1622",
        },
        /** Gradient partner. Never used for body text. */
        iris: {
          DEFAULT: "#7A6BFF",
          deep: "#4B3FD1",
        },
        /** Live / status only. */
        mint: "#2FE3A6",
        content: {
          DEFAULT: "#F2F5F9",
          dim: "#9AA5B4",
          faint: "#949FAE",
        },
      },
      fontFamily: {
        display: ["var(--font-anek)", "var(--font-mukta)", "system-ui", "sans-serif"],
        sans: ["var(--font-mukta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "var(--font-mukta)", "ui-monospace", "monospace"],
      },
      fontSize: {
        overline: ["12px", { lineHeight: "16px", letterSpacing: "0.16em", fontWeight: "500" }],
        caption: ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["15px", { lineHeight: "26px", fontWeight: "400" }],
        "body-md": ["17px", { lineHeight: "30px", fontWeight: "400" }],
        "body-lg": ["19px", { lineHeight: "34px", fontWeight: "400" }],
        "title-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "title-md": ["25px", { lineHeight: "34px", fontWeight: "600" }],
        "headline-sm": ["33px", { lineHeight: "42px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-md": ["44px", { lineHeight: "54px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["54px", { lineHeight: "62px", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-lg": ["82px", { lineHeight: "90px", letterSpacing: "-0.035em", fontWeight: "600" }],
      },
      spacing: {
        gutter: "20px",
        section: "112px",
        "section-sm": "72px",
      },
      maxWidth: {
        container: "1280px",
        prose: "66ch",
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        "3xl": "36px",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 60px -30px rgba(0,0,0,0.9)",
        lift: "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 40px 80px -32px rgba(0,0,0,0.95)",
        "glow-accent": "0 0 0 1px rgba(255,59,79,0.35), 0 24px 70px -28px rgba(255,59,79,0.55)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.82)" },
        },
        bar: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        bar: "bar 2.2s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
