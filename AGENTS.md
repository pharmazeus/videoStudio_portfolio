# AGENTS.md

# Agent Instructions

Read this entire file before starting any task.

## Self-Correcting Rules Engine

This file contains a growing ruleset that improves over time. **At session start, read the entire "Learned Rules" section before doing anything.**

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section at the bottom of this file.
2. Rules are numbered sequentially and written as clear, imperative instructions.
3. Format: `N. [CATEGORY] Never/Always do X — because Y.`
4. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`
5. Before starting any task, scan all rules below for relevant constraints.
6. If two rules conflict, the higher-numbered (newer) rule wins.
7. Never delete rules. If a rule becomes obsolete, append a new rule that supersedes it.

### When to add a rule

- User explicitly corrects your output ("no, do it this way")
- User rejects a file, approach, or pattern
- You hit a bug caused by a wrong assumption about this codebase
- User states a preference ("always use X", "never do Y")

### Rule format example

```text
14. [CODE] Always use `bun` instead of `npm` — user preference, bun is installed globally.
15. [STYLE] Never add emojis to commit messages — project convention.
16. [ARCH] API routes live in `src/server/routes/`, not `src/api/` — existing codebase pattern.
```

---

## Project Mission

- Maintain and extend the React + Vite + Tailwind CSS 3D portfolio without regressions.
- Keep changes focused, testable, and easy to review.

## Workflow Structure

- `.agents/skills/` — local skills and operating docs.
- `plans/current.md` — active objective, constraints, blockers, next concrete step.
- `plans/backlog.md` — queued or deferred work.
- `specs/` — feature specs, design decisions, acceptance criteria.
- `logs/sessions/` — concise session logs.
- `decisions/` — durable decisions that should not be casually reopened.
- `PLAN.md` — high-level roadmap.

## Mandatory Design Reference

For any UI/layout/styling work, you must read and follow:
- `.agents/skills/ui-builder/design-system.md`

Treat that file as the design source of truth for:
- visual direction,
- tokens,
- typography,
- spacing/layout primitives,
- component and motion patterns.

## Start of Every Task

1. Check context with `git status --short --branch`.
2. Read only the files relevant to the requested change.
3. Do not modify unrelated local changes.

## Code Change Rules

- Keep to the existing stack and project patterns.
- Avoid broad refactors unless explicitly requested.
- Keep `public/` asset paths stable unless migration is requested.
- Add comments only when logic is non-obvious.
- Prefer data-driven structures in `src/constants/index.js` over hardcoded repeated JSX content.

## Verification Before Handoff

- Minimum: `npm run lint`
- If build/import/runtime paths may be affected: `npm run build`
- If verification cannot be executed, state that clearly.

## Documentation

- Record non-trivial decisions in `specs/`.
- Keep active execution state in `plans/current.md`.
- Keep queued work in `plans/backlog.md`.
- Add short completion notes in `logs/sessions/`.

## Logging Protocol

### Purpose

Use a structured continuity system so work resumes cleanly in a new session without relying on prior chat history.  
Continuity files are the primary source of truth.

### Session Start Protocol

At the start of each session:
1. Read `plans/current.md` if it exists.
2. Read the latest file in `logs/sessions/` if it exists.
3. Read only decision files/docs needed for the active task.
4. Do not scan the whole repo unless necessary.
5. Do not use prior chat history as primary project memory.

### Session End Protocol

Before ending any meaningful work session:
1. Update `plans/current.md`.
2. Write or append concise summary in `logs/sessions/YYYY-MM-DD.md`.
3. Record durable decisions in `decisions/` only when necessary.
4. Leave one explicit next step.
5. Keep updates concise and operational.

### `plans/current.md` Content Rules

Must include only live execution state:
- Current objective
- Success criteria
- Constraints
- Known blockers
- Next concrete step
- Relevant files

Do not turn it into a diary or long roadmap.

### Session Log Rules

Session logs must be short and high-signal. Include:
- objective
- what changed
- decisions made
- status
- next step

Avoid:
- diary-style narration
- repeated reasoning
- long raw tool output
- vague handoff notes

### Session Log Template

Use this format in `logs/sessions/YYYY-MM-DD.md`:

```markdown
# Session Summary

## Objective
[What this session aimed to accomplish]

## What changed
- ...
- ...

## Decisions made
- ...
- ...

## Status
[Done / Partial / Blocked]

## Next step
[One concrete next action]
```

### Decision File Rules

Create files in `decisions/` only for durable, expensive-to-revisit choices (architecture, API/storage shapes, workflow boundaries, broad naming conventions, long-term operational rules).

Use this format:

```markdown
# Decision Record

## Decision
[What was decided]

## Context
[Why this decision was needed]

## Alternatives considered
- ...
- ...

## Status
[Accepted / Temporary / Superseded]
```

### Emergency Recovery Protocol

If normal closeout was missed, create a recovery note with:

```markdown
# Emergency Session Recovery

## Last thing I was doing
...

## What changed
...

## Current blocker or risk
...

## Next exact step
...
```

### Closeout Trigger

When the user indicates wrap-up or stable stopping point, perform session closeout updates before ending work.

Suggested command phrase: `close this session properly`.

### Operational Principle

Optimize continuity for:
- clarity
- resumability
- low token cost
- minimal reversible updates
- explicit next-step handoff

## Safety and Git Discipline

- Never run destructive git commands without explicit user approval.
- Never revert user changes unrelated to the current task.
- If unexpected modifications appear mid-task, stop and ask how to proceed.

---

## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->
1. [STYLE] Always keep `AGENTS.md` and agent-governance docs in English — user explicitly requested English-only agent instructions.
2. [PROCESS] Always update `.agents/skills/ui-builder/design-system.md` to match real in-repo UI patterns before introducing new UI directions — prevents design drift.
3. [CODE] Never use custom project classes (for example `card-border`) inside `@apply` in `src/index.css` — Tailwind v4 build can fail with unknown utility errors.
4. [PROCESS] Always write planning/specification/instruction files in English when creating or editing them — user preference for all project documentation workflows.
5. [PROCESS] Always use continuity files (`plans/current.md`, latest `logs/sessions/*.md`, and relevant `decisions/*.md`) as primary session memory instead of prior chat history — logging protocol requirement.
