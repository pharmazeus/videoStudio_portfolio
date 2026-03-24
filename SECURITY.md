# Security Policy

## Repo posture

This repository is a public Vite + React frontend. Anything shipped to the browser should be treated as public.

The following areas must never contain secrets, private credentials, customer data, or prohibited material:

- `src/`
- `public/`
- `.agents/`
- any future `.claude/`

If a value must stay secret, it belongs in server-side infrastructure, not in this repository or the client bundle.

## Public agent folders

`.agents/` is intentionally visible on GitHub as part of the portfolio workflow. Keep it scrubbed:

- no API keys, tokens, private prompts, customer data, or internal credentials
- no files that would be unsafe or prohibited to publish
- no assumption that `.agents/` is private just because it is outside the app bundle

Apply the same rule to any future `.claude/` folder.

## Allowed public configuration

Public-safe values may live here when they are intentionally non-secret:

- static asset paths
- public social/profile URLs
- non-secret booking links
- public-facing email addresses

## GitHub protections to enable

Enable these repository settings:

- Dependabot alerts
- Dependabot security updates
- secret scanning with push protection
- branch protection requiring CI and CodeQL to pass before merge

## Reporting

If you discover a security issue in this repo, open a private report to the maintainer instead of publishing exploit details in a public issue.
