# Pricing Page Redesign

> Live plan: [plans/imperative-watching-key.md](/Users/vladislavmaydanskiy/.claude/plans/imperative-watching-key.md) — single source of truth for execution. This spec captures the durable WHY/WHAT/HOW for cold resume.

## Goal

Refresh `/pricing` so visitors can scan 16 tiers faster on mobile and feel the cinematic brand language on the seven highest-converting cards. Preserve roughly 70% of the current visual design — no regressions on cards that do not receive a poster.

## Context

The current page ([src/pages/PricingPage.jsx](../src/pages/PricingPage.jsx), data in [src/constants/index.js](../src/constants/index.js)) renders 16 tariffs across 3 categories with CSS hover only — no entrance animation, no visual anchors, and on mobile the long vertical list is hard to orient. The brand visual language (cinematic, copper accent, dark studio) calls for a light photographic layer on the most-clicked tiers.

## Scope

- IN scope:
  - Optional `poster` data field on 7 tiers (3 monthly retainers + 4 website tiers).
  - New `PricingPackagePoster` slot inside [src/components/PricingPackageCard.jsx](../src/components/PricingPackageCard.jsx).
  - GSAP ScrollTrigger entrance stagger and sticky mobile category tabs in [src/pages/PricingPage.jsx](../src/pages/PricingPage.jsx).
  - Poster, featured pulse, mobile-tabs, and reduced-motion CSS in [src/index.css](../src/index.css).
  - Image pipeline for posters generated through Higgsfield CLI (Soul Cinematic Character).
- OUT of scope:
  - Visual changes to the 9 cards that do not receive a poster (regression guard).
  - Tests (skipped per user decision).
  - Copy rewrites for tier names, prices, descriptions, or CTAs.
  - Global header, footer, or routing changes.
  - Updates to [src/App.jsx](../src/App.jsx), `vercel.json`, or `package.json`.

## Data model change

Add an optional `poster` field to 7 of the 16 pricing entries in [src/constants/index.js](../src/constants/index.js). Shape:

- `webp1440`, `webp960`, `jpg1440`, `jpg960` — strings under `/posters/pricing/<slug>-{960|1440}.{webp|jpg}`.
- `alt` — descriptive English alt text.

The 7 slugs that receive `poster`:

1. `starter-content-pack`
2. `growth-content-pack` (featured)
3. `brand-engine-pack`
4. `landing-page-sprint`
5. `starter-website`
6. `business-website` (featured)
7. `custom-website-advanced-build`

The 9 slugs that stay untouched (no `poster` key, rendered byte-identical to current production):

- All entries in the Video Editing category.
- Any monthly retainer or website tier not in the list above.

Cards without `poster` must continue to render exactly as today. This is the concrete guard for the "70% preservation" goal.

## Component changes

- [src/components/PricingPackageCard.jsx](../src/components/PricingPackageCard.jsx) — accept optional `eager` prop, render new local `PricingPackagePoster` sub-component as the first child inside `.pricing-package-card-inner`, add `has-poster` modifier on `<article>` when `item.poster` exists. Intrinsic `width="1440" height="810"` keeps CLS at zero.
- [src/pages/PricingPage.jsx](../src/pages/PricingPage.jsx) — add GSAP ScrollTrigger entrance mirroring [src/sections/Testimonials.jsx](../src/sections/Testimonials.jsx), pass `eager={index < 2 && categoryIndex === 0}`, render sticky `<nav class="pricing-mobile-tabs">` shown only below `md` with `IntersectionObserver` setting `aria-current`. Reuse the existing hash-jump effect and `scroll-mt-28` offset.
- [src/constants/index.js](../src/constants/index.js) — add the `poster` field to the 7 listed entries; leave all other fields unchanged.
- [src/index.css](../src/index.css) — append poster styles, featured ambient pulse keyframe, sticky mobile tab styles, and reduced-motion overrides under the existing pricing block.

## Animations

Motion budget per card type:

| Card type | Layers |
|-----------|--------|
| No poster | entrance fade-up + hover lift |
| With poster | entrance fade-up + hover lift + poster scale (1.04) |
| With poster + featured | entrance + hover lift + poster scale + copper glow pulse |

- Library: GSAP + ScrollTrigger (already installed; registered once in [src/sections/Testimonials.jsx](../src/sections/Testimonials.jsx)). Reuse, do not double-register.
- Ease: `power2.out` for entrance; `cubic-bezier(0.22, 1, 0.36, 1)` for poster scale.
- Durations: entrance `1.0s`, stagger `0.08s`; poster scale `480ms`; featured pulse `6s` infinite.
- Hard ceiling: no rotate, no skew, no page-level parallax, no shimmer sweep.
- Reduced motion: a `prefers-reduced-motion: reduce` check skips the GSAP `set/to` entirely so cards render at final state, and the CSS block disables poster transform and featured pulse via `!important`.

## Mobile UX

- Sticky category tabs (`md:hidden`, `sticky top-16 z-30`) under the header. `<nav>`, not `<section>`, to avoid the `section { width: 100dvw; }` overflow trap.
- Horizontal scroll-snap on the tab strip; backdrop blur over the dark surface.
- Touch targets: `min-height: 44px` on tabs; the existing card CTA gets a local min-height bump via `.pricing-package-card-cta`.
- Lazy loading: only the first 2 cards of the first category receive `loading="eager"` and `fetchPriority="high"`; the other 5 posters are `loading="lazy"`.
- Hash jump-to-category preserved via the existing `scroll-mt-28` offset on each anchor section.
- Horizontal overflow guard: keep the new `<nav>` outside any nested `<section>` and rely on standard block layout.

## Image pipeline (Higgsfield)

Posters are generated through Higgsfield CLI inside Claude Code. See Phase 0 of [plans/imperative-watching-key.md](/Users/vladislavmaydanskiy/.claude/plans/imperative-watching-key.md) for install and auth steps.

**Final approach: abstract, no people.** Earlier iterations explored a Soul Character ("VladM") face-driven path; we rejected it after seeing the first generations — abstract compositions match the cinematic brand language without the identity-drift risk. The reference selfies briefly staged at `/public/images/pricing/` were deleted; the trained Soul IDs are retained on the Higgsfield account but unused.

Approach:

1. Generate 7 stills with the `soul_location` model (text-only, no people, copper/teal cinematic palette). Cost: 0.12 credits/image × 7 = 0.84 credits. Pro plan concurrent-job limit is 4, so submit in two batches.
2. Higgsfield returns 2048×1152 PNG. Convert each to WebP (quality 78, effort 5) + progressive mozjpeg (quality 80) at two breakpoints (960w, 1440w) using `sharp`.
3. Write outputs to `/public/posters/pricing/<slug>-{960|1440}.{webp|jpg}` — 28 files, total ~660 KB. The PNG originals are discarded after conversion.

Shared style header for every prompt:

- Cinematic editorial abstract composition, dark moody studio palette.
- Warm copper rim light (`#d4865d`), cool teal ambient fill (`#1a2a35`).
- Anamorphic feel, subtle film grain, deep blacks.
- Composition 16:9, no people, no text, no logos, no branded clothing.

The 7 abstract prompts (paired with the slugs above):

| Slug | Scene |
|------|-------|
| `starter-content-pack` | Single matte-black mirrorless cinema camera on a tripod, silhouetted against a dark teal void. One hard copper light beam rakes the lens. Hands-on solo-operator energy. |
| `growth-content-pack` (featured) | Layered horizontal video editing timeline tracks floating in dark space — stacked rectangular blocks glowing in copper and teal with subtle particles. Mood: multiple projects in flight. |
| `brand-engine-pack` | Network of softly glowing copper nodes connected by thin teal filament lines forming an organic mesh — a content engine. |
| `landing-page-sprint` | A single glowing rectangular page panel floating in dark teal void, hinting at hero / feature rows / footer divisions. Subtle motion streaks. Surgical one-page sprint energy. |
| `starter-website` | Three rectangular page panels stacked in 3D depth, frontmost in sharpest focus, copper rim catches the leading edges. Small focused 3-page site energy. |
| `business-website` (featured) | Abstract analytics dashboard floating in dark space — rising copper bar columns, an ascending teal line graph, a faint grid behind. Real-business infrastructure energy. |
| `custom-website-advanced-build` | Architectural wall of layered translucent panels stacked at varying depths, lit from behind in copper and teal — each panel implies a different system module as abstract glowing graphs and node-line diagrams. |

## Performance budgets

Lighthouse mobile targets (from the live plan):

- LCP ≤ 2.5 s
- CLS = 0
- TBT ≤ 200 ms
- Performance score ≥ 90

## Verification

- `npm run lint` (required by [AGENTS.md](../AGENTS.md)).
- `npm run build` (asset paths change).
- Manual smoke on dev server:
  - Scroll on iPhone SE (375px) and iPad (768px) — stagger plays, no horizontal overflow.
  - macOS Reduce Motion → reload → instant render, no hover scale, no pulse.
  - DevTools Network "Fast 3G" → only the first 2 posters are eager, the rest lazy.
  - Temporarily remove `poster` on one entry → card renders identical to today.
  - Sticky-nav tabs scroll to the correct `#anchor` sections without being hidden behind the header.
- Lighthouse mobile run against the targets above.

## Acceptance criteria

1. `higgsfield --version` works and MCP tools are available in Claude Code.
2. 7 posters generated, optimized, and committed under `/public/posters/pricing/`.
3. `/pricing` renders 16 cards; 7 with posters and 9 without — no visual regression on the 9.
4. On scroll, cards stagger-fade in via GSAP; `prefers-reduced-motion` disables it.
5. Mobile sticky tabs appear only below 768px and jump to the right category.
6. `npm run lint` and `npm run build` pass.
7. Lighthouse mobile: LCP ≤ 2.5 s, CLS = 0, Performance ≥ 90.
8. This spec exists at [specs/pricing-page-redesign.md](./pricing-page-redesign.md) and matches the shipped code.

## Risks and guardrails

See the full risk table in [plans/imperative-watching-key.md](/Users/vladislavmaydanskiy/.claude/plans/imperative-watching-key.md). Key items:

- Higgsfield Pro plan caps concurrent jobs at 4 → submit 7 generations in two batches (4 + 3) to avoid `rate_limit_reached`.
- Double `registerPlugin(ScrollTrigger)` → grep before adding; Testimonials already registers it.
- Lazy posters hurting LCP on mobile → first 2 cards of the first category eager with `fetchPriority="high"`.
- Sticky tabs covering anchor targets → existing `scroll-mt-28` offset handles it; verify after wiring.
- "70% preservation" drift → cards without `poster` must render byte-identical DOM (no typography, color, divider, badge, list, or CTA changes).
- Image-source drift → if regenerating, reuse `soul_location` and the prompts above; do not re-introduce people without a quality test on at least one tier first.
