# Master Brief — Digital Systems Creator Website

Use this file as the single source of truth for rebuilding the portfolio website.

## Core positioning

**Digital Systems Creator**

I help modern brands build stronger digital presence through:

- content
- websites
- automation

This website must not position me as only:

- a video editor
- a web developer
- an automation builder
- a generic freelancer who does everything

It must position me as:

**One operator who builds modern digital presence through content, web, and automation.**

---

## Brand promise

I build digital systems for modern brands.

Expanded version:
I turn rough ideas into polished digital systems — from visual content and landing pages to lightweight apps and AI-assisted workflows.

---

## Target clients

- local service businesses
- construction and trades businesses
- real estate / property / architecture-adjacent businesses
- founders and personal brands
- small teams that need sharper digital presence without hiring a full agency

---

## Service pillars

### 1. Content & Creative

- short-form content
- promo videos
- editing
- drone/location visuals
- creative direction
- social-first visual packages

### 2. Web & Launch Assets

- landing pages
- portfolio websites
- small business websites
- presentation-style websites
- lightweight web apps
- conversion-focused web experiences

### 3. AI & Automation Systems

- workflow automations
- internal digital systems
- content operations systems
- agent-assisted task flows
- AI-enhanced creative workflows
- lightweight automation for repetitive tasks

Do not present these as separate careers.
Present them as three connected layers of one digital system.

---

## Business logic

The website must do 3 things:

1. Make the positioning instantly understandable
2. Show selected proof of capability
3. Convert visitors into inquiries

Primary CTAs:

- Start a Project
- Request a Quote
- Book a Call

The site is conversion-first, not resume-first.

---

## Messaging rules

1. Lead with outcome, not identity
2. Use plain business language
3. Show one clear promise with three service mechanisms
4. Do not oversell proof that does not yet exist
5. Keep the site focused and commercially readable

Do not write like this:

- multi-modal orchestration
- agentic infrastructure layer
- AI-native system architecture

Prefer this language:

- websites
- content systems
- automations
- launch assets
- digital workflows

---

## Homepage direction

### Hero headline

**I build digital systems for modern brands.**

### Hero subheadline

From content and websites to AI-assisted workflows, I help businesses present better, move faster, and operate smarter.

### Hero CTAs

- Start a Project
- See My Work

### Mobile hero and menu behavior

- The homepage hero should fill the first mobile viewport so the next section seam is not visible on entry.
- Mobile hero copy should breathe vertically, with the headline tucked close to the floating header and CTA area lower.
- The mobile hero play figure should stay warm copper, fully clickable, and visually behind the text — sized as an accent in the right-side gap rather than a dominant shape.
- On mobile, the hero headline splits into two visible clusters with a clear vertical gap between them: the top cluster reads "I help businesses / look clear online" and the bottom cluster reads "and turn attention into action."
- On mobile, the play figure sits as a smaller accent in the right-side gap between the two headline clusters and never overlaps the bottom cluster.
- On mobile, the hero subheadline copy is hidden so the headline and CTAs carry the message; desktop continues to show the subheadline.
- The mobile navigation active card should stay compact and centered behind only the focused item.

### Homepage section order

1. Hero
2. Value strip / trust bar
3. Featured work
4. Services overview
5. Why work with me
6. Process
7. Pricing preview
8. Testimonials / proof
9. FAQ
10. Final CTA

---

## Routes

### Core MVP routes

- `/` — Home
- `/work` — Selected Work
- `/work/:slug` — Case Study
- `/services` — Services
- `/pricing` — Pricing
- `/about` — About
- `/contact` — Contact

### Optional later routes

- `/lab`
- `/results`
- `/blog`

### Navigation labels

- Home
- Work
- Services
- Pricing
- About
- Contact

Navbar CTA:
**Start a Project**

---

## Services page

### Page heading

**Services built around one digital system.**

### Intro

I help businesses improve how they present, launch, and operate by combining content, websites, and automation into one execution layer.

### Cards

#### Content & Creative

Short-form content, brand visuals, editing, drone work, and creative direction for businesses that need stronger attention and presentation.

#### Web & Launch Assets

Landing pages, portfolio websites, business sites, and lightweight web experiences designed to clarify the offer and improve conversion.

#### AI & Automation Systems

Workflow automations, AI-assisted content systems, and lightweight internal tools that reduce repetitive work and make execution more efficient.

---

## Pricing architecture

Look at bundles_prices.md

---

## About page

### Heading

**I build digital presence that makes businesses easier to understand and easier to choose.**

### Opening paragraph

Vlad Maidanskyi is positioned as a digital systems creator working across websites, video, content, and practical automation. The page should feel personal, visual, premium, and client-facing: sharper pages, better proof, and assets a business can actually use.

### Positioning line

I do not treat websites, videos, and workflows as separate islands. They should point in the same direction, support the same sales story, and make the next move obvious.

### Visual direction

Use a dark editorial layout with copper accents, a portrait-led hero, liquid-glass photo treatment, concise expertise cards, and subtle motion that respects reduced-motion preferences.

---

## Work page

### Heading

**Selected Work**

### Intro

A curated set of projects across content, web, and systems — chosen to show how digital execution can improve both presentation and operations.

### Categories

- Content
- Web
- Systems

Curate hard. Do not fill the page with weak projects.

---

## Contact page

### Heading

**Let’s build the right digital system for your business.**

### Intro

Tell me what you are trying to improve — content, website, workflow, or a combination — and I will help shape the right scope.

Suggested project types:

- content
- website
- automation
- mixed scope

---

## Data/content model required

Create reusable constants/data objects for:

- navLinks
- heroContent
- homeSections
- services
- pricingCategories
- pricingPackages
- addOns
- caseStudies
- testimonials
- faqs
- processSteps
- socialLinks
- contactFormOptions

---

## UX / design direction

- dark
- cinematic
- polished
- modern
- premium but not overdesigned
- easy to scan
- mobile-first clarity
- strong CTA repetition
- proof near decision points

Motion should support hierarchy, not show off.
3D is optional enhancement, not the core value proposition.

---

## Accessibility / performance rules

- support reduced motion
- keep contrast strong
- do not rely on motion for meaning
- ensure form accessibility
- optimize heavy visuals
- lazy-load non-critical assets
- treat mobile as first-class

---

## Build priorities

### Phase 1

1. Update site-wide positioning copy
2. Replace video-only hero messaging
3. Define data models and constants
4. Align route structure

### Phase 2

1. Home
2. Services
3. Pricing
4. Work
5. About
6. Contact

### Phase 3

1. Case study schema
2. FAQ data
3. Pricing data
4. Service pillar data

### Phase 4

1. Motion polish
2. Work filtering
3. Quote flow refinement
4. Optional lab page

---

## Non-negotiables

1. Do not turn the site into a generic personal portfolio
2. Do not present random skills without business framing
3. Keep one umbrella positioning: Digital Systems Creator
4. Keep three service pillars: Content, Web, Automation
5. Keep the site conversion-first
6. Use plain English, not technical ego language
7. Use composable sections and data-driven content
8. Keep design dark, cinematic, modern, and clean
9. Keep 3D optional
10. Preserve performance and mobile usability

---

## Instruction to the AI agent

Read this file first.
Treat it as the authoritative strategic brief.

Then:

1. Audit the current site structure against this brief
2. Propose the updated page architecture
3. Define the required constants/data objects
4. Rebuild the homepage messaging and section hierarchy
5. Rework Services, Pricing, About, Work, and Contact around this model
6. Keep the implementation aligned with existing project structure and styling direction

Do not improvise a different positioning direction.
Do not revert to a video-only portfolio.
Do not split the site into unrelated identities.

Build the website around this promise:

**A Digital Systems Creator who helps modern brands improve digital presence through content, web, and automation.**
