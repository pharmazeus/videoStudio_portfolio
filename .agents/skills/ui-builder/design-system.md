# Design System
Project: 3D Portfolio
Last updated: 2026-03-12
Stack: React 19 + Vite 7 + Tailwind CSS v4 (`@theme` in `src/index.css`) + GSAP

## Purpose
This file is the UI source of truth for this repository.
Any new UI must look native to the existing app, not like a separate template.

## Visual Direction
- Cinematic dark UI.
- High contrast: black surfaces + cool light text.
- 3D/creative portfolio tone with restrained, polished motion.
- Content-first hierarchy: strong section headers, compact supporting copy.

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

### Typography
- Font family: `Mona Sans` only (`--font-sans`).
- Typical hierarchy in current app:
  - Hero lines: `text-[30px]` mobile, `md:text-[50px]`, `font-semibold`.
  - Section titles: `text-3xl` to `md:text-5xl`, `font-semibold`.
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
- `card-border` for dark card surfaces.
- `navbar` for fixed top navigation behavior.
- `cta-wrapper` + `cta-button` for CTA pattern.

## Component Patterns

### Navigation
- Reuse `src/components/NavBar.jsx`.
- Keep nav links understated; hover uses subtle underline growth.
- Primary action at right keeps light background / dark text style.

### Section headers
- Reuse `src/components/TitleHeader.jsx` for section-level headings.
- Structure: badge (`sub`) + centered title (`title`).

### Cards
- Default card shell: `card-border rounded-xl`.
- Common card rhythm: icon/media block first, then heading, then supporting text.

### Buttons/CTA
- Use `src/components/Button.jsx` for main CTA interactions.
- Keep existing animated arrow behavior and circular reveal motif.

## Motion System
- Primary animation library: GSAP + ScrollTrigger.
- Typical eases/durations in project:
  - `ease: "power2.inOut"` or `"power2.out"`
  - Duration near `0.8` to `1.4`.
- Motion should reveal content, not distract from readability.
- Prefer scroll-triggered fade/translate and stagger patterns already used.

## Imagery and Media
- Assets live under `public/`.
- Preserve image/video path stability once used.
- Prefer cinematic posters and high-contrast media overlays consistent with Hero.

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
