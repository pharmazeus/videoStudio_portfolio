# bundles_prices

## Pricing position

This pricing is calibrated for a **solo creator entering the market**, not a large agency and not a bargain-basement freelancer.

Goal:
- stay credible for local business clients
- avoid underpricing the workload
- keep pricing simple on the website
- use **from / starting at** pricing publicly
- keep exact quotes custom based on scope, travel, shooting time, and revision load

## Market read that informed this update

The current market signal for Toronto / Canada suggests roughly this:

- **4 reels / month with filming + editing:** around **$750–$1,500 CAD**
- **6–8 reels / month:** around **$1,200–$2,300 CAD**
- **higher-output monthly retainers:** often **$2,500–$4,000+ CAD**
- **single filmed reel / social ad:** around **$250–$500 CAD**
- **half-day shoot + edit:** around **$700–$1,100 CAD**
- **full-day shoot + edit:** around **$1,300–$1,900 CAD**
- **promo / branded video:** often starts around **$1,300–$1,800 CAD** for lean solo production and goes much higher for agency-level work

## Decision

Your older baseline was too cheap for the workload.

The updated website pricing should sit in the **lower-middle of the real market**, which is the strongest position for you right now:
- not cheap enough to attract the worst-fit clients only
- not inflated beyond what your current proof level can support
- high enough to leave room for revisions, travel, planning, and real edit time

---

## Recommended public website pricing

## 1) Starter Content Pack
**From $900 CAD / month**

Best for small local businesses that need consistent presence without a heavy campaign setup.

### Includes
- 4 short-form videos / month
- 1 shoot session
- basic editing
- subtitles / on-screen text
- 1 light revision round
- delivery optimized for Reels / TikTok / Shorts

### Internal pricing note
- target close: **$1,000–$1,100**
- soft floor: **$850**
- do not go below this unless the shoot is extremely simple, local, and strategically useful for portfolio building

---

## 2) Growth Content Pack
**From $1,700 CAD / month**

Best default offer. This should be the package you want to sell most often.

### Includes
- 8 short-form videos / month
- 1–2 shoot sessions
- stronger edit polish
- better hooks / pacing / captions
- simple social cutdowns
- light story-content support
- priority over Starter clients

### Internal pricing note
- target close: **$1,850–$2,100**
- soft floor: **$1,600**
- this is the strongest value package for most local businesses

---

## 3) Brand Engine Pack
**From $2,900 CAD / month**

For businesses that want consistent output, better planning, and more content batching.

### Includes
- 12 short-form videos / month
- 15–20 story clips / supporting assets
- multiple shoot blocks
- stronger planning and batching
- higher creative polish
- faster turnaround
- priority scheduling

### Internal pricing note
- target close: **$3,100–$3,500**
- soft floor: **$2,700**
- if the client expects strategy, scripting, more locations, or campaign thinking, quote upward fast

---

## Recommended one-off pricing

## Single Reel / Social Ad
**From $300 CAD**

Use this when you both shoot and edit a short-form piece.

### Internal note
- simple edit-only reel can be quoted separately from **$150–$250**
- filmed + edited reel should usually land around **$300–$450**

---

## Half-day shoot + edit
**From $750 CAD**

### Good fit for
- one location
- content batching
- smaller businesses
- a few short-form deliverables from one efficient session

### Internal note
- target close: **$850–$1,000**
- if the client wants multiple deliverables, add extra edit pricing rather than absorbing it silently

---

## Full-day shoot + edit
**From $1,350 CAD**

### Good fit for
- construction coverage
- bigger content batching days
- real-estate / brand / founder content days
- multi-scene or multi-angle capture

### Internal note
- target close: **$1,500–$1,800**
- if multiple locations, drone, talent coordination, or fast turnaround are involved, quote higher

---

## Promo / Brand Film
**From $1,500 CAD**

### Good fit for
- cinematic business promo
- service showcase
- founder / brand introduction video
- campaign centerpiece video

### Internal note
- realistic working range: **$1,500–$3,000+**
- once scripting, moodboards, multiple shoot blocks, voiceover, lighting complexity, or more revisions appear, treat it as a custom quote

---

## Add-ons

## Drone footage
**+$200–$350 CAD** as an add-on  
**Standalone drone mini-shoot from $350 CAD**

## Extra revision round
**+$75–$125 CAD**

## Rush delivery
**+25% to +35%**

## Extra cut / version
**+$75–$150 CAD**

## Raw footage handoff
**+$200–$350 CAD**

## Thumbnail / cover design
**+$20–$40 each**

## Travel fee
**Custom**

Recommended logic:
- local nearby zone: included
- outside local zone: start adding fee
- longer distance / special commute / parking: custom quote

---

## Best pricing language for the website

Use:
- **From $900 CAD**
- **Starting at $750 CAD**
- **Custom quote for larger productions**

Avoid:
- exact rigid promises for every project
- pricing that looks too cheap to be credible
- too many package variations on the page

---

## Best structure for the pricing page

### Monthly Retainers
- Starter Content Pack — from $900
- Growth Content Pack — from $1,700
- Brand Engine Pack — from $2,900

### One-Off Projects
- Single Reel / Social Ad — from $300
- Half-day shoot + edit — from $750
- Full-day shoot + edit — from $1,350
- Promo / Brand Film — from $1,500

### Add-ons
- Drone footage — +$200–$350
- Extra revision — +$75–$125
- Rush delivery — +25% to +35%
- Extra cut / version — +$75–$150
- Raw footage handoff — +$200–$350
- Thumbnail / cover design — +$20–$40
- Travel — custom

---

## Agent-ready pricing constants

```ts
export const pricingPackages = [
  {
    slug: "starter-content-pack",
    name: "Starter Content Pack",
    billingType: "monthly",
    startingPrice: 900,
    priceRange: [900, 1200],
    featured: false,
  },
  {
    slug: "growth-content-pack",
    name: "Growth Content Pack",
    billingType: "monthly",
    startingPrice: 1700,
    priceRange: [1700, 2200],
    featured: true,
  },
  {
    slug: "brand-engine-pack",
    name: "Brand Engine Pack",
    billingType: "monthly",
    startingPrice: 2900,
    priceRange: [2900, 3600],
    featured: false,
  },
];

export const oneOffOffers = [
  {
    slug: "single-reel-social-ad",
    name: "Single Reel / Social Ad",
    billingType: "one-off",
    startingPrice: 300,
    priceRange: [300, 450],
  },
  {
    slug: "half-day-shoot-edit",
    name: "Half-day shoot + edit",
    billingType: "one-off",
    startingPrice: 750,
    priceRange: [750, 1000],
  },
  {
    slug: "full-day-shoot-edit",
    name: "Full-day shoot + edit",
    billingType: "one-off",
    startingPrice: 1350,
    priceRange: [1350, 1800],
  },
  {
    slug: "promo-brand-film",
    name: "Promo / Brand Film",
    billingType: "one-off",
    startingPrice: 1500,
    priceRange: [1500, 3000],
    customQuoteRequired: true,
  },
];

export const addOns = [
  { name: "Drone footage", startingPrice: 200, priceRange: [200, 350] },
  { name: "Extra revision round", startingPrice: 75, priceRange: [75, 125] },
  { name: "Rush delivery", label: "+25% to +35%" },
  { name: "Extra cut/version", startingPrice: 75, priceRange: [75, 150] },
  { name: "Raw footage handoff", startingPrice: 200, priceRange: [200, 350] },
  { name: "Thumbnail / cover design", startingPrice: 20, priceRange: [20, 40] },
  { name: "Travel fee", customQuoteRequired: true },
];
```

---

## Bottom line

If you want one clean public pricing set for launch, use exactly this:

- **Starter — from $900 CAD**
- **Growth — from $1,700 CAD**
- **Brand Engine — from $2,900 CAD**
- **Single Reel / Social Ad — from $300 CAD**
- **Half-day shoot + edit — from $750 CAD**
- **Full-day shoot + edit — from $1,350 CAD**
- **Promo / Brand Film — from $1,500 CAD**

This is the most realistic balance between:
- your current stage
- Canadian / Toronto market reality
- avoiding the underpricing trap
- still being sellable for small and mid-size local businesses


---

## Additional service lines

These offers should be presented as **secondary services**, not the main homepage focus.

Reason:
- the portfolio should still sell video/content services first
- web and automation strengthen your positioning as a digital systems creator
- they work best as upsells, cross-sells, or custom inquiries

---

## Website services — recommended public pricing

Website work can be packaged.

Unlike automation, websites are easier for clients to understand at a glance, so fixed starting-price bundles make sense.

The goal here is to stay **competitive**, not premium-agency expensive.

### 1) Landing Page Sprint
**From $650 CAD**

Best for:
- one-page business site
- offer page
- campaign / lead capture page
- creator or service intro page

### Includes
- 1 custom landing page
- mobile responsive build
- contact form
- basic SEO setup
- basic animation / polish
- 1 revision round

### Internal pricing note
- target close: **$750–$900**
- soft floor: **$600**
- if copywriting or advanced custom sections are needed, quote upward

---

### 2) Starter Website
**From $1,200 CAD**

Best for:
- small local businesses
- service providers
- personal brands
- clean online presence without complex logic

### Includes
- 3–5 pages
- responsive design
- contact form
- basic SEO structure
- simple CMS or editable content where practical
- 1–2 revision rounds

### Internal pricing note
- target close: **$1,350–$1,700**
- soft floor: **$1,100**
- this should be your entry-level website package

---

### 3) Business Website
**From $2,200 CAD**

Best for:
- growing businesses
- stronger service websites
- businesses that need more sections, better UX, and better content structure

### Includes
- 5–8 pages
- stronger visual polish
- service structure / content hierarchy
- forms and lead capture
- basic integrations
- on-page SEO setup
- 2 revision rounds

### Internal pricing note
- target close: **$2,400–$3,000**
- soft floor: **$2,000**
- use this when the client needs a real business website, not just a placeholder online presence

---

### 4) Custom Website / Advanced Build
**Custom quote**

Use custom pricing when the project includes:
- advanced animations
- custom CMS structure
- booking systems
- member areas
- dashboards
- ecommerce
- multilingual setup
- heavy integrations

Recommended public language:
**Custom quote for advanced websites, ecommerce, and platform-style builds.**

---

## Website add-ons

### Copy support
**+$100–$300 CAD**

### Additional page
**+$150–$300 CAD / page**

### Blog / CMS setup
**+$150–$400 CAD**

### Booking / calendar embed
**+$100–$250 CAD**

### Basic analytics setup
**+$75–$150 CAD**

### Maintenance / small updates
**From $75–$150 CAD / month**

---

## Automation services — recommended pricing logic

Automation should **not** be sold as rigid fixed bundles only.

Reason:
- even a “simple” automation can hide edge cases
- app permissions, APIs, auth, and data cleanup change scope fast
- support and debugging often matter as much as the setup itself

So the public site should use **starting at** pricing plus **custom quote** language.

---

### 1) Workflow Audit / Automation Planning
**From $150 CAD**

Best for:
- businesses that know they waste time but do not yet know what to automate
- discovery before implementation

### Includes
- workflow review
- bottleneck mapping
- recommendation of tools
- short implementation plan

### Internal pricing note
- target close: **$150–$250**
- this is a good low-friction entry offer

---

### 2) Simple Automation Setup
**From $450 CAD**

Best for:
- 1 simple workflow
- form to sheet / CRM
- email notifications
- simple lead routing
- task creation / reminder flow

### Includes
- 1 automation flow
- basic testing
- basic documentation
- short post-launch support window

### Internal pricing note
- target close: **$500–$800**
- soft floor: **$400**
- only use this when the workflow is truly simple and low-risk

---

### 3) Connected Automation System
**From $1,200 CAD**

Best for:
- 2–4 connected workflows
- CRM + forms + notifications
- admin reduction flows
- small ops systems for service businesses

### Includes
- workflow mapping
- implementation
- testing
- light documentation
- handoff walkthrough

### Internal pricing note
- target close: **$1,500–$2,500**
- soft floor: **$1,100**
- quote up quickly if data cleanup, conditional logic, or many third-party apps are involved

---

### 4) AI / Advanced Automation System
**Custom quote**

Use custom pricing when the project includes:
- AI classification or routing
- agent workflows
- dashboards
- databases
- multi-step approval systems
- internal tools
- custom API logic

Recommended public language:
**Custom quote for advanced automation systems, AI agents, and internal workflow tools.**

---

## Automation add-ons

### Extra workflow
**+$150–$500 CAD** depending on scope

### Documentation / SOP handoff
**+$75–$250 CAD**

### Training call
**+$75–$150 CAD**

### Monthly monitoring / support
**From $100–$300 CAD / month**

### Urgent fix / priority turnaround
**+25% to +40%**

---

## Best website structure for these offers

Do **not** make web and automation equal to video/content on the homepage.

Best structure:
- homepage: lead with video/content
- services page: include web and automation as secondary offers
- pricing page: add them under a section like **Digital Systems** or **Web & Automation**
- contact form: let users select **video**, **website**, **automation**, or **custom project**

---

## Clean public pricing set to actually use

### Websites
- **Landing Page Sprint — from $650 CAD**
- **Starter Website — from $1,200 CAD**
- **Business Website — from $2,200 CAD**
- **Advanced / Custom Website — custom quote**

### Automation
- **Workflow Audit — from $150 CAD**
- **Simple Automation Setup — from $450 CAD**
- **Connected Automation System — from $1,200 CAD**
- **Advanced AI / Automation System — custom quote**

---

## Positioning rule

Use this logic on the site:

**Primary offer:**
video/content production

**Secondary offer:**
websites, digital systems, and automations that help businesses present themselves better and run smoother

That keeps the brand focused while still letting you sell higher-value digital work.

