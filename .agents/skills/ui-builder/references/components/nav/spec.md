# Navigation — Spec
# Source: custom / derived from design system

## Purpose
Primary app navigation. Defines the shell — get this right before building any pages.
All page layouts depend on the nav structure.

---

## Layout type (choose one for project)

```
[ ] Sidebar — fixed left, app-style (dashboards, SaaS)
[ ] Top nav — horizontal, site-style (marketing, docs)
[ ] Hybrid — top bar + sidebar (complex apps)
```

---

## Sidebar nav item

```tsx
// Active state
<Link className="
  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
  bg-primary/10 text-primary
">

// Default state  
<Link className="
  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
  text-muted-foreground
  hover:bg-muted hover:text-foreground
  transition-colors duration-150
">
```

### Nav item anatomy
```
[icon 16px]  [label]  [badge/count optional]  [chevron if expandable]
gap-3        flex-1   ml-auto
```

### Sidebar dimensions
```
Width:         240px (w-60) — [CONFIRM FOR PROJECT]
Item height:   36px (h-9)
Item padding:  px-3 py-2
Section gap:   space-y-1 within section, mt-6 between sections
Icon size:     size-4 (16px)
```

### Section headers
```tsx
<p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
  Section Title
</p>
```

---

## Top nav

```tsx
<header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-sm">
  <div className="flex h-full items-center gap-4 px-6">
    {/* Logo */}
    {/* Nav links */}
    {/* Right: search + notifications + avatar */}
  </div>
</header>
```

### Top nav link
```tsx
// Active
<Link className="text-sm font-medium text-foreground border-b-2 border-primary pb-0.5">

// Default
<Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
```

---

## Mobile nav

```
Mobile (< lg): sidebar hidden, hamburger menu OR bottom nav
Desktop (lg+): sidebar always visible
Transition: slide-in from left, backdrop overlay
```

---

## Avatar / User menu

```tsx
<button className="flex items-center gap-2 rounded-md p-1.5 hover:bg-muted transition-colors">
  <Avatar className="size-7">
    <AvatarImage src={user.avatarUrl} />
    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
  </Avatar>
  <span className="text-sm font-medium text-foreground">{user.name}</span>
  <ChevronDown className="size-3.5 text-muted-foreground" />
</button>
```

---

## Rules

- Active state: determined by route match — use `usePathname()` in Next.js
- NEVER use active state on parent when child route is active (unless expandable)
- Focus ring: always visible on keyboard navigation through nav items
- ARIA: `aria-current="page"` on active nav item
- Logo link: always goes to `/` or `/dashboard` — never a dead link
