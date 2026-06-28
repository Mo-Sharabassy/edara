---
name: Edara
description: Events-as-a-Service — professional events department without the overhead
colors:
  primary: "#005bbf"
  primary-bright: "#1a73e8"
  primary-light: "#d8e2ff"
  background: "#fbf9f8"
  surface: "#fbf9f8"
  surface-low: "#f5f3f3"
  surface-container: "#f0eded"
  hero-dark: "#0a0a0a"
  dark-section: "#1b1c1c"
  ink-primary: "#1b1c1c"
  ink-secondary: "#414754"
  ink-muted: "#5e5e64"
  border-subtle: "#dadce0"
  outline: "#727785"
  error: "#ba1a1a"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.33
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.56
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  default: "2px"
  lg: "4px"
  xl: "8px"
  2xl: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
  button-primary-hover:
    backgroundColor: "{colors.primary-bright}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
  button-glass:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.xl}"
    padding: "40px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
---

# Design System: Edara

## 1. Overview

**Creative North Star: "The Briefed Operator"**

Edara's design system is the visual vocabulary of a team that has run high-stakes events for two hundred companies and doesn't need to prove it. The system carries quiet operational confidence — not luxury, not startup-flashy — the energy of a senior department you didn't have to hire. Every layout decision, spacing choice, and typographic call is a demonstration of the core claim: we have done this before, we will do it again, you don't need to think about it.

The palette is a single saturated blue deployed with restraint against a near-neutral off-white and a stark near-black. Nothing competes. The typeface pairing — Hanken Grotesk headings, Inter body, JetBrains Mono operational labels — builds a three-tier hierarchy that reads as precision instrument, not design portfolio.

The system explicitly rejects: AI-generated-looking layouts (generic structure, disconnected sections, no visual through-line); SaaS metric-grid heroes; 01/02/03 scaffolding; corporate event company clutter (logo soup, low hierarchy, dated); decorative complexity that doesn't communicate anything.

**Key Characteristics:**
- Single brand accent (#005bbf), deployed sparingly — its rarity is the authority
- Two-world palette: near-black hero zones (#0a0a0a) versus warm off-white content zones (#fbf9f8)
- Three-font stack with strict role segregation (display / body / mono-label)
- Flat-by-default elevation with earned hover lift
- Near-zero border radius on default elements; components use 4–8px max

## 2. Colors

A two-world palette: the brand speaks once in blue, the content breathes in near-white, and the brand moments live in near-black.

### Primary
- **Signal Blue** (#005bbf): The one true accent. CTAs, links, active states, focus rings, pricing accents, checked list marks. Never used decoratively. If it shows up somewhere that isn't interactive or a status signal, remove it.
- **Brand Blue Bright** (#1a73e8): Brighter fill for logo marks and badge fills. Not for body interactive elements — that's Signal Blue's role.
- **Brand Blue Light** (#d8e2ff): Icon-tile backgrounds on light cards; low-saturation blue surface for bento icon wells.

### Neutral
- **Off-White Canvas** (#fbf9f8): Primary page background and surface. Warm but barely so — one step from pure white. Content sits here by default.
- **Surface Low** (#f5f3f3): Slightly deeper surface for sunken or secondary containers.
- **Surface Container** (#f0eded): Card backgrounds, section alternates.
- **Near-Black Hero** (#0a0a0a): Home hero and globe section background. The brand's headline statement. Near-black rather than pure black — has depth without being harsh.
- **Dark Section** (#1b1c1c): Dark testimonial sections, dark callout blocks. The primary text ink also lives here — same value serves both roles.
- **Ink Primary** (#1b1c1c): All primary text. High contrast against off-white canvas.
- **Ink Secondary** (#414754): Supporting text, descriptors, secondary body copy.
- **Ink Muted** (#5e5e64): Muted labels, placeholder text, metadata.
- **Border Subtle** (#dadce0): Default borders and dividers. Light enough to read as structure without calling attention.
- **Outline** (#727785): Outlined button borders, stronger dividers.

### Semantic
- **Error** (#ba1a1a): Validation errors, destructive state signals only.

### Named Rules
**The One Accent Rule.** Signal Blue (#005bbf) is the only saturated accent. It never appears as a surface fill except on the primary button and the CTA band. Its scarcity is the authority — if blue appears everywhere, it stops meaning anything.

**The Two Worlds Rule.** Every section is either a Near-Black Hero zone (#0a0a0a, #1b1c1c) or an Off-White Content zone (#fbf9f8). Mixed-temperature sections are prohibited. The alternation is the rhythm.

## 3. Typography

**Display Font:** Hanken Grotesk (system-ui, sans-serif)
**Body Font:** Inter (system-ui, sans-serif)
**Label / Mono Font:** JetBrains Mono (ui-monospace, monospace)

**Character:** Hanken Grotesk is broad-shouldered and slightly condensed — it reads as institutional confidence rather than startup-friendly approachability. Inter handles clarity at body scale. JetBrains Mono carries all operational metadata — prices, specs, counters, uppercase labels — reinforcing the sense of a department that runs on numbers and specs, not marketing language.

### Hierarchy
- **Display** (700 weight, 56px / line-height 1.14, tracking −0.02em): Hero headlines, pricing amounts, section-leading statements. Max one per viewport.
- **Headline** (600 weight, 32px / line-height 1.25): Section headings, testimonial quotes, CTA band title. Hanken Grotesk.
- **Title** (600 weight, 24px / line-height 1.33): Card titles, sub-section headings, bento titles. Hanken Grotesk.
- **Body Large** (400 weight, 18px / line-height 1.56): Lead paragraphs, hero sub-copy, section introductions. Inter. Max 65ch.
- **Body** (400 weight, 16px / line-height 1.5): Standard body text, card descriptions, pricing descriptions. Inter. Max 65ch.
- **Label** (500 weight, 12px, tracking 0.05em, uppercase): Section kickers, trust-bar labels, bento foot items, field labels. JetBrains Mono exclusively. The mono + uppercase + tracked combination signals "operational spec", not decoration.

### Named Rules
**The Mono Label Rule.** JetBrains Mono is reserved for operational metadata: labels, specs, counters, kickers used as deliberate brand system. It never appears in running prose. Its presence signals "this is a number / category / spec" without the word "LABEL" above it.

**The Single Kicker Rule.** The mono-label eyebrow ("EVENTS AS A SERVICE", "TRUSTED BY") is a deliberate brand system, not section scaffolding. Maximum one per page section. If every section has one, it has become AI grammar — remove until one remains.

## 4. Elevation

The system is flat by default. Surfaces at rest have no shadow. Depth is conveyed through color — the alternation between near-black hero zones and off-white content zones is the primary spatial signal, not shadow depth.

Shadows appear only in two cases: (1) as a response to hover state (cards lift, buttons lift 2px); (2) as a featured-card accent (blue glow shadow on the pricing featured card). Shadow values are deliberately small and low-opacity — they communicate "active" or "elevated state," not "depth."

### Shadow Vocabulary
- **Ambient Card** (`0 1px 3px rgba(0,0,0,0.08)`): Cards at rest. Barely visible — just enough to separate from page ground on hover intent.
- **Hover Lift** (`0 20px 25px -5px rgba(0,0,0,0.10), 0 10px 10px -5px rgba(0,0,0,0.04)`): Cards and bento items on hover. A proper lift — decisive, not tentative.
- **Featured Blue Glow** (`0 25px 50px -12px rgba(0,91,191,0.30)`): Pricing featured card on hover only. The one place the brand color bleeds into elevation.
- **Button Lift** (`translateY(-2px)`): All buttons hover via transform, not shadow. Motion conveys the lift; shadow is not added.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only resting shadow is `0 1px 3px rgba(0,0,0,0.08)` on cards — the minimum needed to separate on a white/near-white surface. Any shadow larger than this at rest is excessive decoration.

## 5. Components

### Buttons
Flat edges with a 4px radius — nearly rectilinear, not pill-shaped. Confidence reads as geometry.

- **Primary:** Signal Blue (#005bbf) fill, white text, 14px Inter 600, 16px × 40px padding, 4px radius. Hover: `brightness(1.08)` filter + `translateY(-2px)`. Active: `translateY(1px) scale(0.97)`.
- **Outline:** Transparent fill, ink-primary text, outline-color (#727785) border. Hover: surface-container fill.
- **Glass:** White 10% fill, white text, white 20% border, `backdrop-filter: blur(12px)`. Used exclusively on dark backgrounds (hero, globe section).
- **Inverse:** Off-white fill, brand blue text. Used inside dark sections for secondary CTAs.
- **Focus:** 2px Signal Blue outline, 2px offset. Visible keyboard indicator; consistent across all variants.
- **Disabled:** 50% opacity, `cursor: not-allowed`, no hover transform.

### Cards / Bento
- **Corner style:** 8px radius (rounded.xl). Not rounded-enough to read as soft; not rectilinear enough to read as harsh.
- **Background:** Surface (#fbf9f8) default; Surface Raised (white) for raised variant.
- **Border:** 1px Border Subtle (#dadce0) at rest. Shifts to Signal Blue on interactive hover.
- **Internal Padding:** 40px on all sides — generous, consistent, never nested.
- **Interactive Hover:** `translateY(-8px) scale(1.02)` + bento-hover shadow. The bento icon rotates 5deg and scales 1.1 — the one micro-interaction allowed.

### Inputs / Fields
- **Style:** Off-white fill, 1px border-subtle border, 4px radius, 12px × 16px padding.
- **Label:** JetBrains Mono, 12px, 500 weight, 0.05em tracking, uppercase. Always above the control.
- **Focus:** 2px Signal Blue border + `0 0 0 2px #005bbf` ring + inset shadow. Unambiguous.
- **Error:** Border shifts to #ba1a1a. Error message in 12px Inter below the control.
- **Placeholder:** Ink Muted (#5e5e64). Must pass 4.5:1 contrast against surface.

### Navigation
- **Desktop:** Sticky top bar, 80px height, border-bottom: 1px border-subtle. Nav links: 16px Inter, ink-secondary at rest, Signal Blue on hover/active, 700 weight when active. Logo + "EVENTS AS A SERVICE" mono label at left.
- **Mobile:** Slide-in drawer. Full-height, white fill, primary CTA at bottom. Burger → X animation via CSS transforms.

### Pricing Card
- **Default:** 8px radius, 1px border-subtle, 40px padding, white fill, 56px/700 display amount.
- **Featured:** 2px Signal Blue border, `shadow-featured-hover` on hover. Badge positioned with a negative top offset to break the card's upper edge. The one layout element allowed to break the grid boundary.

### CTA Band
- **Surface:** Signal Blue full fill. The brand's only drenched surface moment.
- **Skew accent:** White 6% opacity parallelogram, `skewX(-12deg)`, shifts on hover — the band's single animated decoration.
- **Copy:** White headline (Hanken Grotesk 32px/700), Primary Fixed (#d8e2ff) subtitle.

### Trust Bar
- **Surface:** Off-white (#f8f9fa), border-bottom.
- **Label:** JetBrains Mono, 13px, 0.18em tracking, uppercase, Signal Blue.
- **Logos:** 700 weight, 24px, uppercase, 68% opacity at rest → 100% + brand blue on hover.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Blue (#005bbf) only for interactive elements, active states, and the CTA band surface. Its scarcity earns its authority.
- **Do** alternate between Near-Black zones (#0a0a0a, #1b1c1c) and Off-White zones (#fbf9f8) to create page rhythm. The contrast is the layout.
- **Do** use JetBrains Mono exclusively for labels, specs, counters, and mono kickers. Never in prose.
- **Do** keep body text at ≤65ch line length. Wide measure kills the precision register.
- **Do** apply `prefers-reduced-motion` fallbacks to every transition and animation — currently in the codebase for all interactive components.
- **Do** verify 4.5:1 contrast for all body text, including placeholder text.
- **Do** keep border radius at or below 8px (rounded.xl) for components. The near-rectilinear edges are the system's visual register.

### Don't:
- **Don't** build AI-generated-looking layouts: generic structure, disconnected sections, no visual through-line. Each section must feel like it belongs to the same voice.
- **Don't** use the SaaS metric-grid hero pattern (big number + small label + supporting stats + gradient accent). Prohibited.
- **Don't** use 01 / 02 / 03 section scaffolding. Prohibited.
- **Don't** create corporate event company clutter: logo soup, low hierarchy, dated visual language.
- **Don't** introduce decorative complexity with no substance — heavy animation that doesn't communicate anything.
- **Don't** build desktop-first decisions that collapse on mobile. One voice, every viewport.
- **Don't** add a second saturated accent color. The system uses exactly one.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on any card, list item, or callout. Rewrite with a full border, background tint, or icon instead.
- **Don't** use gradient text (`background-clip: text`). Decorative, never meaningful.
- **Don't** add rounded corners above 16px (rounded.2xl) anywhere in the system. Pill shapes are reserved for pill badges and the pill radius token only.
- **Don't** place the mono uppercase eyebrow above every section heading — it is a brand kicker system, not section scaffolding. One per page section, maximum.
