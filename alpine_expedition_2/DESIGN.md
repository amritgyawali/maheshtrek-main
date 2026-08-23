---
name: Alpine Expedition
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#404849'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#707979'
  outline-variant: '#c0c8c9'
  surface-tint: '#38656a'
  primary: '#002427'
  on-primary: '#ffffff'
  primary-container: '#043b3f'
  on-primary-container: '#77a5aa'
  inverse-primary: '#a0cfd3'
  secondary: '#006971'
  on-secondary: '#ffffff'
  secondary-container: '#8cf2fd'
  on-secondary-container: '#006f78'
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
  secondary-fixed: '#8cf2fd'
  secondary-fixed-dim: '#6fd6e0'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f55'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#f3bb99'
  on-tertiary-fixed: '#311401'
  on-tertiary-fixed-variant: '#643e24'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
  surface-mist: '#F0F7F8'
  white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

This design system embodies the spirit of professional adventure and high-altitude curation. The brand personality is authoritative yet welcoming, positioning itself as a knowledgeable guide rather than a mere service provider. The aesthetic balances the ruggedness of trekking with the precision of high-end logistics.

The design style follows a **Corporate / Modern** approach with a **Minimalist** lean. It utilizes expansive whitespace to evoke the openness of mountain landscapes, paired with high-quality imagery and a strictly controlled color palette. The UI is characterized by structural clarity, subtle tonal depth, and a focus on legibility to ensure reliability in various environmental contexts. It avoids unnecessary decoration, favoring functional elegance and a premium, editorial feel.

## Colors

The palette is anchored by a sophisticated duo of deep teals. The primary color is a dark, near-black teal used for core brand elements and high-contrast text. The secondary color is a vibrant turquoise-teal used for action items, highlights, and icons. 

The background strategy relies on "Surface Mist" (#F0F7F8) to provide a soft, low-strain alternative to pure white, which is reserved for content cards and elevated surfaces. Typography is primarily driven by the Neutral (#212529) to ensure optimal readability against the light backgrounds.

## Typography

The typographic strategy creates an editorial hierarchy by pairing a traditional serif for storytelling with a contemporary sans-serif for utility. 

**Source Serif 4** is used for headlines and display text to convey heritage, trust, and the "curated" nature of the treks. **Manrope** serves as the workhorse for body copy and UI labels, providing exceptional clarity and a modern, professional feel. 

Large displays should use tight letter-spacing to maintain impact, while labels use expanded tracking and uppercase styling to provide clear structural signposts.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to maintain editorial control over line lengths and content density. The layout centers on a 12-column grid with a maximum width of 1280px.

On mobile devices, the layout transitions to a fluid model with 16px side margins. Spacing is governed by an 8px rhythmic scale. Use "Large" (48px) and "Extra Large" (80px) vertical spacing between major sections to emphasize the "wide-open" brand feeling. Horizontal alignment should be strict, creating clean vertical lines that guide the eye through complex itineraries or data-heavy trek specs.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and extremely subtle **Ambient Shadows**. Instead of heavy dropshadows, the system uses "Surface Mist" (#F0F7F8) for the base background and pure white (#FFFFFF) for interactive or priority components.

When elevation is required (e.g., on hover or for modal content), use a single, ultra-diffused shadow: `0 8px 30px rgba(4, 59, 63, 0.05)`. The slight teal tint in the shadow maintains color harmony. For structural separation without shadows, use 1px borders in a lightened version of the secondary teal or a pale gray.

## Shapes

The shape language is disciplined and "Soft" (0.25rem / 4px). This minimal rounding removes the clinical harshness of sharp corners while maintaining a professional, structured appearance. 

Buttons and input fields should strictly adhere to this radius. Larger containers, such as cards or image galleries, may use a larger radius (8px) to feel more approachable, but the overall system should avoid pill-shapes or excessive rounding which would detract from the serious, expert-led nature of the brand.

## Components

### Buttons
Primary buttons use the Secondary Teal (#14919B) with white text, featuring a 4px corner radius and no border. Secondary buttons use a transparent background with a 1px border of the Primary Teal (#043B3F).

### Input Fields
Inputs are white with a subtle 1px border (#D1E5E7). On focus, the border shifts to the Secondary Teal. Labels are placed above the field using the `label-md` typographic style.

### Cards
Trek cards use a white background with a very subtle ambient shadow. Images within cards should have a top-only 4px radius. Typography within cards should prioritize the `title-lg` for names and `body-md` for descriptions.

### Chips & Badges
Used for trek difficulty levels or status. They should utilize low-saturation background tints derived from the brand colors with high-contrast text.

### Navigation
The top navigation should be clean and persistent, using the Primary Teal for the logo and `label-md` for links, ensuring high legibility against the light surface backgrounds.