# Design System
Project: 3D Portfolio
Last updated: 2026-03-24
Stack: React 19 + Vite 7 + Tailwind CSS v4 (`@theme` in `src/index.css`) + GSAP

## Purpose
This file is the UI source of truth for this repository.
Any new UI must look native to the existing app, not like a separate template.

## Visual Direction
- Cinematic dark UI.
- High contrast: black surfaces + cool light text.
- 3D/creative portfolio tone with restrained, polished motion.
- Content-first hierarchy: strong section headers, compact supporting copy.
- Warm copper accent is now used sparingly to complement the cool palette, especially in hero depth, CTA hover states, and proof/client surfaces.
- The shared header now uses a restrained liquid-glass shell with a subtle copper sheen instead of a flat black bar.
- Homepage atmosphere now continues below the hero with low-opacity copper and cool-blue ambient glows instead of dropping immediately into flat black sections.

## Theme
- Dark-only.
- Root background is black (`html, body { background-color: black; color: white; }`).

## Design Tokens
Defined in `src/index.css` under `@theme`.

### Colors
- `--color-white-50: #d9ecff`
- `--color-black-50: #1c1c21`
- `--color-black-100: #0e0e10`
- `--color-black-200: #282732`
- `--color-blue-50: #839cb5`
- `--color-blue-100: #2d2d38`
- `--color-copper-50: #d4865d`
- `--color-copper-100: #8c5139`
- Name this accent `copper` in docs and implementation notes to avoid future naming drift.

### Typography
- Font family: `Mona Sans` only (`--font-sans`).
- Typical hierarchy in current app:
  - Hero lines: staged 3-line composition with gradient-filled text, restrained stacked shadows, and a highlighted middle line.
  - Section titles: `section-heading` shared class with subtle gradient fill, tighter tracking, and balanced wrapping.
  - Card titles: `text-xl` to `text-2xl`, `font-semibold`.
  - Body copy: `text-base` to `md:text-xl`, usually `text-white-50`.

## Layout Primitives
Use existing utility/component classes before inventing new ones.

### Spacing and wrappers
- `section-padding` for section spacing.
- `padding-x` and `padding-x-lg` for horizontal padding.
- `flex-center` and `flex-col-center` for common alignment.

### Grids
- `grid-2-cols`
- `grid-3-cols`
- `grid-3-cols-md-tight`
- `grid-4-cols`
- `grid-12-cols`

### Core shared UI classes
- `hero-badge` for pill labels.
- `section-eyebrow` for section-level pills.
- `section-heading` for major section headlines.
- `section-description` for supporting copy under shared headings.
- `card-border` for dark card surfaces.
- `navbar` for fixed top navigation behavior.
- `cta-wrapper` + `cta-button` for CTA pattern.

## Component Patterns

### Navigation
- Reuse `src/components/NavBar.jsx`.
- Keep nav links understated; hover uses subtle underline growth and the active page should be visually apparent.
- Primary action at right keeps light background / dark text style.
- The header shell should read as liquid glass: dark translucent base, soft blur, subtle white highlight, and a restrained copper tint rather than a strong orange gradient.
- On the homepage, content should begin directly under the floating header with no black spacer above the hero image; secondary pages can keep the shared top content offset.
- Keep the same full center navigation visible across pages, including `/work`; emphasize the current page instead of replacing the nav with a single fallback link.

### Section headers
- Reuse `src/components/TitleHeader.jsx` for section-level headings.
- Reuse `src/components/SectionTitle.jsx` for left-aligned page/section intros.
- Structure: badge (`sub` or `eyebrow`) + gradient heading + restrained supporting copy.

### Cards
- Default card shell: `card-border rounded-xl`.
- Common card rhythm: icon/media block first, then heading, then supporting text.
- Featured proof/client cards can use warmer surface gradients, larger radius, and centered logo framing as long as they stay within the dark cinematic palette.
- Transparent partner/client logos can use a wider framed shell instead of a forced square crop when the supplied mark is horizontal and needs more breathing room.

### Buttons/CTA
- Use `src/components/Button.jsx` for main CTA interactions.
- Keep existing animated arrow behavior and circular reveal motif.
- `src/components/CTAButton.jsx` is the shared page-level CTA primitive; hover/focus states should use the copper accent rather than unrelated bright colors.

## Motion System
- Primary animation library: GSAP + ScrollTrigger.
- Typical eases/durations in project:
  - `ease: "power2.inOut"` or `"power2.out"`
  - Duration near `0.8` to `1.4`.
- Motion should reveal content, not distract from readability.
- Prefer scroll-triggered fade/translate and stagger patterns already used.
- Above-the-fold hero media can use a one-time mount reveal with slow brightness/scale easing, but reduced-motion users should receive the settled state immediately.

## Imagery and Media
- Assets live under `public/`.
- Preserve image/video path stability once used.
- Prefer cinematic posters and high-contrast media overlays consistent with Hero.
- Hero overlays should use layered gradients and localized glow rather than flat black covers so the subject stays readable and visible.
- Hero copy should sit directly over the image without a dedicated glass panel when the subject's face needs to remain fully visible.
- Homepage hero media should keep its intentional fill/crop composition unless a longer-lived design decision explicitly replaces it.
- The `digital systems` accent line in the hero should keep a clean copper gradient and restrained shadowing; avoid muddy lower stops or heavy brown shadows that create grey artifacts in the letterforms.

## Homepage-Specific Patterns
- Use a shared homepage atmosphere shell to carry subtle ambient color below the hero.
- Keep atmosphere layers blurred, low-opacity, and behind content only; they should improve depth, not become visible blobs.
- The value strip below the hero should feel like a premium credibility row:
  - each card can use a darker layered surface
  - each card can use a subtle gradient edge treatment
  - hover states may add a soft glow border and light lift, but should stay restrained and elegant

## Responsive Rules
- Mobile-first Tailwind usage.
- Existing breakpoints in practice: `md`, `lg`, `xl`, `2xl`.
- Ensure each new section looks intentional on narrow screens, not just stacked defaults.

## Allowed Exceptions (Current Codebase Reality)
These patterns already exist and are acceptable when justified by layout/animation needs:
- Selected arbitrary Tailwind values (examples: `z-[100]`, `h-[80vh]`, `md:text-[50px]`).
- Occasional raw hex usage for one-off accents (examples: `bg-[#ffefdb]`, `text-[#839CB5]`).

Rule: prefer design tokens/classes first. Use exceptions only when tokenized utilities cannot reproduce the required visual result.

## Forbidden Drift
- Do not introduce a new visual language (new font families, unrelated gradients, glossy/neon palettes).
- Do not replace shared primitives with one-off style islands when existing classes/components can be reused.
- Do not introduce bright default Tailwind blues/purples as a new theme baseline.
- Do not mix radically different button/card styles within the same page.

## Implementation Checklist
Before finalizing UI work:
- Matches dark cinematic direction.
- Uses `Mona Sans` and existing heading/card hierarchy.
- Reuses project primitives (`TitleHeader`, `NavBar`, `card-border`, spacing/grid classes).
- Keeps motion restrained and consistent with GSAP patterns in current sections.
- Passes `npm run lint` and `npm run build`.
