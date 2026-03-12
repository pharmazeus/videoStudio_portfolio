# Continuity Protocol

## Goal
Keep project state resumable with minimal context and low token cost.

## Source-of-truth files
- `plans/current.md` — active objective and next step
- `plans/backlog.md` — queued/deferred work
- `logs/sessions/YYYY-MM-DD.md` — concise session summaries
- `decisions/*.md` — durable accepted decisions
- `PLAN.md` — broad roadmap

## Session start
1. Read `plans/current.md`
2. Read latest file in `logs/sessions/`
3. Read only decision/docs needed for the active task
4. Avoid whole-repo scans unless required

## Session end
1. Update `plans/current.md`
2. Add/append session log in `logs/sessions/YYYY-MM-DD.md`
3. Record durable decision in `decisions/` only when needed
4. Leave one explicit next step

## Current migration note
Legacy `plans/current/now.md` was migrated to:
- `plans/archive/2026-03-12-hybrid-video-delivery.md`

Canonical active plan file is now:
- `plans/current.md`
