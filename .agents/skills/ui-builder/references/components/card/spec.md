# Card — Spec
# Source: custom / derived from design system
# Last updated: [DATE]

## Purpose
Container for grouped related content. The primary surface-level component.
Cards define the visual rhythm of the page — get spacing and radius right.

---

## Base structure

```tsx
<div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
  <div className="p-6">           {/* CardContent */}
    ...
  </div>
</div>
```

---

## Variants

### default
```
rounded-lg border border-border bg-card shadow-sm
```
Use for: Content cards, stat cards, settings sections.

### flat
```
rounded-lg bg-muted/50
```
No border, no shadow. Use for: Secondary info, nested cards inside a card.

### outlined
```
rounded-lg border-2 border-primary/20 bg-card
```
Use for: Highlighted or selected cards (e.g. selected plan in pricing).

### interactive (clickable card)
```
rounded-lg border border-border bg-card shadow-sm
cursor-pointer transition-all duration-200
hover:shadow-md hover:border-border/80
```
Use for: Navigation cards, project tiles, list items that link somewhere.
Rule: Must have a single `<a>` or `<Link>` as the interactive target.
Never make the entire div a click target without a proper anchor.

### elevated
```
rounded-lg bg-card shadow-md
```
No border. Use for: Floating panels, popovers that aren't dropdowns.

---

## Structure & Spacing

### Standard sections
```tsx
// Header: title + optional action
<div className="flex items-center justify-between p-6 pb-4">
  <div>
    <h3 className="text-lg font-semibold text-foreground">Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
  <Button variant="outline" size="sm">Action</Button>
</div>

// Divider between header and content
<div className="border-t border-border" />

// Content
<div className="p-6 pt-4">
  ...
</div>

// Footer: actions
<div className="flex items-center justify-end gap-2 p-6 pt-0 border-t border-border">
  <Button variant="ghost">Cancel</Button>
  <Button>Save</Button>
</div>
```

### Padding rules
```
Standard card:        p-6
Compact card:         p-4
Dense card (tables):  p-0 (let table handle its own padding)
Card with sections:   each section gets p-6, dividers between them
```

---

## Common Layouts

### Stat card
```tsx
<div className="rounded-lg border border-border bg-card p-6">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium text-muted-foreground">Label</span>
    <Icon className="size-4 text-muted-foreground" />
  </div>
  <div className="text-2xl font-bold text-foreground">Value</div>
  <p className="text-xs text-muted-foreground mt-1">Trend / context</p>
</div>
```

### List card
```tsx
<div className="rounded-lg border border-border bg-card divide-y divide-border">
  {items.map(item => (
    <div key={item.id} className="flex items-center gap-3 p-4">
      ...
    </div>
  ))}
</div>
```

---

## States

### Loading (skeleton)
```tsx
<div className="rounded-lg border border-border bg-card p-6 space-y-3">
  <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
  <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
  <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
</div>
```

### Empty state
```tsx
<div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
  <Icon className="size-8 text-muted-foreground mx-auto mb-3" />
  <p className="text-sm font-medium text-foreground">No items yet</p>
  <p className="text-sm text-muted-foreground mb-4">Description of what goes here</p>
  <Button size="sm">Add first item</Button>
</div>
```

---

## Notes

- Max width in content area: typically `max-w-2xl` for forms, none for dashboards
- Cards in a grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Never nest interactive cards inside interactive cards
- Card shadow only on default + interactive variants — flat and outlined have no shadow
