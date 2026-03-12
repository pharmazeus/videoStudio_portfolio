---
name: ui-builder
description: Use this skill whenever building, editing, reviewing, or making any
decision about UI components, pages, layouts, or visual styling in any web project.
Triggers on any request involving components, Tailwind classes, CSS, color choices,
spacing, typography, responsive design, or visual structure — even casual requests
like "make a quick button", "update this card", "style this form", "build a
dashboard", or "make it look like this screenshot". Design drift compounds silently
— this skill prevents it by anchoring every build to the project's actual design
system and visual references. Works with React, Next.js, Vue, HTML/CSS, any stack.
Always use this skill when the user shares a screenshot, image, or says "it should
look like X".
---

# UI Builder

Build UI that belongs to *this* project — anchored to its design system,
its visual history, and the user's stated intent.

This skill uses two types of reference material:
- **Text specs** (`.md` files) — ground truth for tokens, variants, implementation rules
- **Visual assets** (`.png`, `.jpg`, `.webp`) — ground truth for layout, feel, composition

When both exist for a component, read both. They answer different questions.

---

## Reference library structure

```
.agents/skills/ui-builder/
├── SKILL.md
└── references/
    ├── components/              ← per-component specs + visuals
    │   ├── button/
    │   │   ├── spec.md          ← token spec, variants, prompts
    │   │   ├── reference.png    ← target visual (what it should look like)
    │   │   └── states.png       ← all states/variants in one image (optional)
    │   ├── card/
    │   │   ├── spec.md
    │   │   └── reference.png
    │   └── [component-name]/    ← one folder per component type
    │       ├── spec.md
    │       └── *.png / *.jpg
    ├── screens/                 ← full page references
    │   └── [page-name]/
    │       ├── notes.md         ← what matters on this page, layout rules
    │       └── reference.png    ← full page screenshot or mockup
    └── inspiration/             ← external visual references
        ├── index.md             ← for each image: what to extract, what to ignore
        └── *.png / *.jpg
```

**Flat `.md` files are also valid** for components that don't have a visual yet:
`references/components/badge.md` (no folder needed until you have an image to add).
Upgrade to a folder when you add a visual asset.

---

## Step 1 — Discover the project context

Before writing any code, run this discovery sequence:

### 1a. Find the design system
Search in this order:
```
.agents/skills/ui-builder/design-system.md  ← preferred
docs/design-system.md
docs/design.md
DESIGN.md
tailwind.config.ts or .js        ← extract color/spacing tokens
src/styles/globals.css           ← scan for CSS custom properties / @theme block
```
Read the first one found. If none exists → see **Step 1d**.

### 1b. Scan the reference library
```
.agents/skills/ui-builder/references/
```
List all folders and files. Build a mental index of what visual and text
references already exist. This tells you what's been established vs what
needs to be derived fresh.

### 1c. Identify the tech stack
Check `package.json` for framework, styling approach, icon library, component
primitives. Key distinctions:
- Tailwind v3 (config in JS) vs v4 (config in CSS `@theme {}`)
- shadcn/ui projects → use semantic CSS var classes (`bg-primary`) not raw colors
- Next.js App Router → Server Components by default, `'use client'` only when needed

### 1d. No design system found?
Before building anything, do this:
1. Scan existing components and config for implicit tokens
2. Ask the user 3 questions only:
   - "Primary accent color and its hover state?"
   - "Light, dark, or both?"
   - "Any site or app you want this to feel like?"
3. Draft a minimal `design-system.md`, confirm with user, save to `.agents/skills/ui-builder/`
4. Then proceed

Never invent a design direction. Ground everything in something real.

---

## Step 2 — Internalize the design system

Read it fully. Extract and hold in mind:

| What to extract         | Why                                         |
|-------------------------|---------------------------------------------|
| Color palette + tokens  | Every class you write must reference these  |
| Typography scale        | Sizes, weights, tracking                    |
| Spacing system          | Only allowed values — no arbitrary px       |
| Border radius rules     | Which radius for which component type       |
| Shadow / elevation      | Cards vs modals vs dropdowns                |
| Forbidden patterns      | What NOT to use — read twice                |
| Accent color rules      | When the primary color can/cannot appear    |
| Theme                   | Light / dark / both                         |

The forbidden patterns section is the most important. Read it twice.

---

## Step 3 — Load the visual and text references

This is the upgraded core of this skill. For the component you're about to build:

### If a component folder exists (`references/components/[name]/`)

**Read `spec.md` first** — get the token rules, variants, implementation constraints.

**Then read all images in the folder:**
- `reference.png` — this is the **target state**. Your output should match
  this visual closely. Layout, proportions, spacing rhythm, visual weight.
- `states.png` / `variants.png` — shows all states at once. Use for checking
  your implementation covers everything.
- `screenshot.png` — an **existing implementation**. Either match it exactly
  (if good) or improve it while staying visually consistent.

**When text spec and image conflict:**
- Image wins for: layout, composition, spacing feel, visual weight, hierarchy
- Text spec wins for: exact color tokens, border radius values, font size scale,
  any rule explicitly stated in the design system

### If only `spec.md` exists (no image yet)
Use the text spec as your complete reference. After building, suggest to the user:
*"Want to screenshot the result and drop it in as `references/components/[name]/reference.png`?
That'll lock in the visual for future sessions."*

### If only an image exists (no spec yet)
Read the image carefully. Extract:
- Layout structure and proportions
- Spacing rhythm (tight, loose, balanced?)
- Visual hierarchy (what draws the eye first?)
- Color roles (which element uses the accent? where is neutral used?)

Then apply the project's design tokens to implement what you see.
After building, create the `spec.md` to capture what you derived.

### If a `screens/[page-name]/` folder exists for the page you're building on
Read it before building any component that lives on that page. Understanding
the full page context prevents components that are technically correct but
visually wrong in their actual environment.

### Inspiration references (`references/inspiration/`)
Read `index.md` first — it tells you what to extract from each image and what
to ignore. Inspiration images are not targets; they are starting points.
Extract the structural idea, discard the visual identity, apply project tokens.

---

## Step 4 — Build

### Universal rules
- Design tokens only — no hardcoded hex, no arbitrary Tailwind values (`[17px]`)
- Hover, focus, active, disabled states for all interactive elements
- Mobile-first — 375px minimum, enhance upward
- Semantic HTML throughout
- TypeScript: all props explicitly typed, no `any`
- No inline styles (unless CSS-in-JS is the project standard)

### Using images during build
Keep the reference image in mind throughout. Ask yourself at each decision:
- Does this spacing match the rhythm in the reference?
- Is the visual hierarchy preserved?
- Does the overall weight feel right — light/heavy/balanced as intended?

The image tells you what it should *feel* like. The spec tells you *how* to
get there with the project's tokens.

### Framework specifics
- **Next.js App Router**: Server Components default; `'use client'` for hooks/events
- **React + React Router**: pages in `src/pages/`, primitives in `src/components/ui/`
- **Vue**: Composition API (`<script setup>`) unless project uses Options API
- **shadcn/ui**: semantic class names (`bg-primary`, `text-muted-foreground`), not raw colors

---

## Step 5 — Save references after building

### New component type (no folder existed)
Create `.agents/skills/ui-builder/references/components/[name]/spec.md`:

```markdown
# [Component Name] — Spec
# Source: [21st.dev link / derived from design system / custom]

## Base prompt
[The prompt used, already adapted to this project's tokens]

## Variants
### [variant-name]
\`\`\`
[Tailwind classes or CSS spec]
\`\`\`
Use for: [when]

## States
Hover: [spec]
Focus: [spec]
Disabled: [spec]
Loading: [spec if applicable]

## Notes
[Edge cases, a11y notes, things to avoid]
```

Then tell the user:
*"Spec saved. If you screenshot the component and drop it in as
`references/components/[name]/reference.png`, future sessions will have
a visual target to match."*

### Adding a visual to an existing flat spec
If `references/components/button.md` exists and the user drops in a screenshot:
1. Create the folder `references/components/button/`
2. Move `button.md` → `references/components/button/spec.md`
3. Save the image as `references/components/button/reference.png`
4. Update `spec.md` to note that a visual reference now exists

### New full-page reference
Save to `references/screens/[page-name]/`:
- `reference.png` — the screenshot or mockup
- `notes.md` — layout rules, component placement, what matters on this page

### New inspiration image
Save to `references/inspiration/[descriptive-name].png` and add an entry to
`references/inspiration/index.md`:
```markdown
## [descriptive-name].png
Source: [URL or "provided by user"]
Extract: [what structural ideas to take from this]
Ignore: [their colors, fonts, brand — use project tokens instead]
```

---

## Step 6 — External sources (21st.dev, Dribbble, screenshots)

### 21st.dev
1. Read the component structure and prompt
2. Strip their design choices completely
3. Re-apply the project's design tokens
4. Save adapted spec + note source URL in spec.md

### Screenshots from other websites / apps
Treat as inspiration, not targets:
1. Read `references/inspiration/index.md` for guidance if the image is already filed there
2. Extract: structural layout, spacing rhythm, hierarchy pattern
3. Discard: colors, fonts, shadows, any visual identity
4. Implement using project tokens
5. Save to `references/inspiration/` with an `index.md` entry

### User-provided mockups / Figma exports
These are closer to targets than inspiration:
1. Match the layout and proportions as closely as possible
2. Replace any colors with the closest design system token
3. Flag any elements that don't have a matching token:
   *"The mockup uses a color not in the design system. Closest match is X.
   Want to add this to design-system.md?"*

---

## Quality checklist

**Visual fidelity** (when a reference image exists)
- [ ] Layout and proportions match the reference
- [ ] Spacing rhythm feels consistent with the reference
- [ ] Visual hierarchy is preserved
- [ ] Nothing obviously clashes with adjacent components on the same page

**Design system compliance**
- [ ] All colors from the design system palette
- [ ] All spacing on the defined scale
- [ ] Border radius matches the rule for this component type
- [ ] Accent color used only where allowed
- [ ] No forbidden patterns

**Interaction completeness**
- [ ] Hover, focus, disabled, loading states defined
- [ ] Focus ring uses the project's defined style

**Technical**
- [ ] No hardcoded or arbitrary values
- [ ] TypeScript props typed
- [ ] Mobile-responsive at 375px
- [ ] Semantic HTML

**Library maintenance**
- [ ] `spec.md` created or updated
- [ ] Visual asset saved if provided by user or recommended to add

---

## When references are missing or ambiguous

Design system gap → flag it, apply the closest rule, offer to close the gap.
No component reference → derive from design system, build, create spec after.
No visual reference → build from spec, suggest screenshotting the result.
Conflicting signals → image wins for feel, text spec wins for token values.

Never silently invent. Always flag and offer to document the decision.
