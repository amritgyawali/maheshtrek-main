---
name: Alpine Expedition
colors:
  surface: '#f9f9f9'
  surface-dim: '#d9dada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#edeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#404849'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#f0f1f0'
  outline: '#707979'
  outline-variant: '#c0c8c9'
  surface-tint: '#38656a'
  primary: '#002427'
  on-primary: '#ffffff'
  primary-container: '#043b3f'
  on-primary-container: '#77a5aa'
  inverse-primary: '#a0cfd3'
  secondary: '#006a62'
  on-secondary: '#ffffff'
  secondary-container: '#78f7e9'
  on-secondary-container: '#007169'
  tertiary: '#351703'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f2c14'
  on-tertiary-container: '#c59273'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbebf0'
  primary-fixed-dim: '#a0cfd3'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#1e4d51'
  secondary-fixed: '#78f7e9'
  secondary-fixed-dim: '#59dacd'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#f3bb99'
  on-tertiary-fixed: '#311401'
  on-tertiary-fixed-variant: '#643e24'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  deep-forest: '#043B3F'
  vibrant-teal: '#00A99D'
  slate-gray: '#333333'
  surface-ice: '#F8F9FA'
  easy-green: '#00A99D'
  moderate-teal: '#007A7E'
  challenging-blue: '#005662'
typography:
  headline-xl:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  section-gap: 80px
  card-padding: 24px
  element-gap: 16px
---

## Brand & Style

The design system embodies the "Alpine Expedition" theme—a blend of rugged outdoor adventure and high-end curation. It is designed to feel authoritative yet welcoming, reflecting the expertise required for high-altitude trekking. 

The aesthetic is **Corporate / Modern** with a focus on editorial clarity. It utilizes a sophisticated balance of deep, "forest" tones against expansive white space to evoke the clarity of mountain air. Visual interest is maintained through high-quality imagery, subtle depth through layering, and a precise typographic hierarchy that establishes trust and inspires wanderlust.

## Colors

The palette is anchored by **Deep Forest (#043B3F)**, which serves as the primary brand anchor for headers, footers, and primary buttons. **Vibrant Teal (#00A99D)** is used as a secondary accent for interactive highlights and status badges.

The background uses **White (#FFFFFF)** for primary content surfaces to ensure maximum legibility and a "crisp" feel, while **Surface Ice (#F8F9FA)** is used for section banding and subtle card containers. Text is primarily **Slate Gray (#333333)** to maintain high contrast without the harshness of pure black. Status colors (Easy, Moderate, Challenging) are derived from varying shades of the teal and forest spectrum to maintain a monochromatic mountain-inspired harmony.

## Typography

This design system uses a dual-font strategy to balance editorial sophistication with modern utility. 

**Source Serif 4** is the signature typeface for headlines. Its sturdy, traditional serifs evoke the feeling of a travel journal or a high-end publication. It should be used for all page titles and section headers to establish the brand's authoritative voice.

**Manrope** is used for all UI elements, body text, and labels. Its clean, geometric sans-serif construction ensures excellent legibility at smaller sizes and provides a functional contrast to the serif headings. Labels and navigation items often use an increased font weight (600+) and subtle letter spacing for better scanning.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop, centered within a 1280px container to maintain readability and focus. 

- **Grid:** A 12-column grid is used for desktop layouts. Gutters are fixed at 24px to provide enough breathing room for photography-heavy cards.
- **Sectioning:** Generous vertical spacing (80px to 100px) is used between major content sections to prevent the UI from feeling cluttered.
- **Responsive Behavior:** On mobile, margins reduce to 16px, and the 12-column grid collapses into a single column. Cards and featured packages transition from multi-column rows to vertically stacked or horizontally scrollable carousels.

## Elevation & Depth

Visual hierarchy is primarily achieved through **Tonal Layers** and **Ambient Shadows**.

- **Surfaces:** Cards and interactive containers use a pure white background set against a very light gray (#F8F9FA) section background. 
- **Shadows:** Shadows are used sparingly and are extremely soft. They utilize a low-opacity (4-8%) Deep Forest tint rather than pure black to keep the "Alpine" feel. For example, a standard card uses a `0px 4px 20px rgba(4, 59, 63, 0.08)` shadow.
- **Interactions:** Hover states on cards should involve a slight vertical lift (-4px) and a subtle increase in shadow density to signify interactivity.
- **Overlays:** Dark overlays (30-50% opacity) are used on background images behind text to ensure the Source Serif headlines remain legible.

## Shapes

The shape language is characterized by "Soft Professionalism." 

The design system uses a consistent **0.5rem (8px)** base radius for most UI elements including cards, input fields, and buttons. This avoids the harshness of sharp corners while maintaining a more structured feel than a full pill-shape. 

- **Cards:** Use `rounded-lg` (16px) for large content containers like "Featured Packages" to create a modern, friendly frame.
- **Badges:** Difficulty badges (e.g., "Easy", "Moderate") use a smaller `rounded-sm` or `rounded-md` to remain distinct from larger structural elements.
- **Buttons:** Standard buttons follow the base 8px radius, though secondary "Quick Action" buttons may occasionally use a pill-shape (full radius) for high visibility.

## Components

### Buttons
- **Primary:** Deep Forest (#043B3F) background with White text. Used for "Book Now" or "Explore."
- **Secondary:** White background with a 1px border of Deep Forest or Vibrant Teal.
- **Ghost:** No background, Vibrant Teal text with a trailing arrow icon (e.g., "Learn More →").

### Cards
- **Package Cards:** Feature a top-aligned image with a difficulty badge overlay. The content area uses 24px padding, clear Manrope labels for metadata (duration, price), and a dual-button row at the bottom.
- **Destination Cards:** Minimalist styling with a full-bleed background image and an "Explore Trip" link using an icon.

### Input Fields
- **Search/Finder:** Large, clean fields with 12px padding, Manrope text, and light gray borders. Icons (e.g., location marker) are used to provide visual cues without cluttering the space.

### Chips & Badges
- Used for difficulty levels. These should have high-contrast background colors (Teal, Forest) with small, bold Manrope text. They are typically positioned in the top-right corner of card images.

### Lists & Navigation
- The navigation bar uses a clean Manrope font at 14px weight 600, with subtle dropdown indicators. The "WhatsApp" link is a specialized high-priority button using the brand's secondary teal.