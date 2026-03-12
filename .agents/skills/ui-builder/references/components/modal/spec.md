# Modal / Dialog — Spec
# Source: custom / derived from design system

## Purpose
Interrupt flow for confirmations, forms, detail views.
Use sparingly — every modal is a context switch.

---

## When to use what

```
Dialog (centered modal):   confirmations, short forms, alerts
Sheet (slide-in):          longer forms, detail views, mobile-first flows
Popover:                   contextual info, inline actions (not a form)
Tooltip:                   single-line label for an icon/button — no interaction
AlertDialog:               destructive confirmations ONLY ("Delete project?")
```

---

## Dialog structure

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Backdrop */}
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
  
  {/* Panel */}
  <div className="
    relative z-50 w-full max-w-lg rounded-xl bg-background
    border border-border shadow-xl
    p-6
  ">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Title</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Description</p>
      </div>
      <button className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted -mr-1 -mt-1">
        <X className="size-4" />
      </button>
    </div>

    {/* Content */}
    <div className="space-y-4">
      ...
    </div>

    {/* Footer */}
    <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </div>
  </div>
</div>
```

---

## Sizes

```
sm:   max-w-sm    → Simple confirmations, 1-2 field forms
md:   max-w-lg    → DEFAULT — standard forms
lg:   max-w-2xl   → Multi-section forms, detail views
xl:   max-w-4xl   → Complex forms, preview modals
full: max-w-[90vw] max-h-[90vh] → Media viewers, rich editors
```

---

## Sheet (slide-in)

```tsx
<div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-border shadow-xl">
  {/* Header */}
  <div className="flex items-center justify-between p-6 border-b border-border">
    <h2 className="text-lg font-semibold">Title</h2>
    <button ...><X className="size-4" /></button>
  </div>
  
  {/* Scrollable content */}
  <div className="overflow-y-auto h-[calc(100vh-140px)] p-6">
    ...
  </div>

  {/* Sticky footer */}
  <div className="p-6 border-t border-border">
    <div className="flex gap-2">
      <Button variant="outline" className="flex-1">Cancel</Button>
      <Button className="flex-1">Save</Button>
    </div>
  </div>
</div>
```

---

## Destructive confirmation pattern

```tsx
// AlertDialog — always use this for destructive actions
<AlertDialog>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete "{name}" and all its data.
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
        Delete project
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Rules

- ALWAYS trap focus inside modal (use Radix Dialog or similar)
- ALWAYS close on Escape key
- ALWAYS close on backdrop click — EXCEPT for unsaved form data (warn first)
- NEVER open a modal from inside a modal — use multi-step within same modal
- Loading state: disable footer buttons + show spinner, don't close modal
- Error state: show error inline in modal, don't close modal
- Success: close modal, show toast notification
- Mobile: Dialog → becomes bottom Sheet on screens < md
