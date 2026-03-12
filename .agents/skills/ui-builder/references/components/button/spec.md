# Button — Spec
# Source: custom / derived from design system
# Last updated: [DATE]

## Purpose
Primary interactive trigger. Used for all user-initiated actions.
The most common component in the project — get this right first.

---

## Base prompt
"Build a button component using the project's design system tokens.
Include all variants (primary, secondary, ghost, destructive, outline, link)
and all sizes (xs, sm, md, lg, xl). All interactive states required."

---

## Variants

### primary
```
bg-primary text-primary-foreground hover:bg-primary/90
font-medium rounded-md transition-colors duration-150
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
```
Use for: Main CTA, the single most important action on a page.
Rule: Max ONE primary button per section/card.

### secondary
```
bg-secondary text-secondary-foreground hover:bg-secondary/80
font-medium rounded-md border border-border
```
Use for: Supporting actions alongside a primary button.

### outline
```
bg-transparent text-foreground border border-border
hover:bg-muted hover:text-foreground
```
Use for: Tertiary actions, less emphasis than secondary.

### ghost
```
bg-transparent text-foreground hover:bg-muted
```
Use for: Icon buttons, nav actions, table row actions. No visible border at rest.

### destructive
```
bg-destructive text-destructive-foreground hover:bg-destructive/90
```
Use for: Delete, remove, permanently destructive actions.
Rule: ALWAYS pair with a confirmation dialog. Never trigger destructive action directly.

### link
```
bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto
```
Use for: Inline text actions, "Learn more" type links.

---

## Sizes

```
xs:  h-6  text-xs  px-2   gap-1    → Compact tables, tags
sm:  h-8  text-sm  px-3   gap-1.5  → Secondary actions, filter bars
md:  h-9  text-sm  px-4   gap-2    → DEFAULT — use unless reason not to
lg:  h-10 text-base px-4  gap-2    → Primary CTAs, prominent actions
xl:  h-12 text-lg  px-6   gap-2.5  → Hero CTAs, landing pages
```

---

## States

### Hover
Defined per variant above. All transitions: `transition-colors duration-150`.

### Focus (keyboard)
```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-primary
focus-visible:ring-offset-2
```
NEVER remove focus ring. Accessibility requirement.

### Disabled
```
disabled:pointer-events-none disabled:opacity-50
```
DO NOT change shape, size, or text. Only reduce opacity.

### Loading
```
<Button disabled>
  <Loader2 className="size-4 animate-spin" />
  Saving...
</Button>
```
Rule: Replace icon (if any) with spinner. Keep button text. Keep button size.
Never remove the button while loading — replace it with the loading state.

### Icon-only
```
size-9 p-0  (md)
size-8 p-0  (sm)
```
Rule: Always include aria-label when no visible text.

---

## With Icon

```tsx
// Icon left (most common)
<Button>
  <Plus className="size-4" />
  Add item
</Button>

// Icon right (directional: "Next →")
<Button>
  Continue
  <ArrowRight className="size-4" />
</Button>

// Icon only
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="size-4" />
</Button>
```

---

## TypeScript Interface

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  loading?: boolean
  asChild?: boolean  // if using Radix Slot
}
```

---

## Notes & Edge Cases

- Never use `<div onClick>` instead of `<button>` — always semantic HTML
- In forms: `type="submit"` on submit button, `type="button"` on all others
- Button groups: use `gap-2` between buttons, never margin
- Full-width buttons: `w-full` — common in mobile modals and auth forms
- When a button navigates: use `<Link>` styled as button, not `<button onClick={router.push}>`
