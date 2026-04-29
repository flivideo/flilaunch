# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What This App Is

**FliLaunch** — a lightweight internal YouTube Launch Optimizer.

It accepts a video transcript and produces the core packaging needed to publish:
- title candidates → user selects
- thumbnail concepts + text suggestions
- description draft (above-the-fold, chapters, related-video suggestions)

Primary value: reduce friction from transcript to launch-ready assets.

---

## Spec

Full v1 product spec: `docs/youtube-launch-optimizer-spec-v1.md`

Read this before making structural decisions. Key constraints:
- Transcript is the only required input
- v1 is NOT a full insights platform, analytics dashboard, or multi-tenant system
- Prompt management UI is explicitly out of scope
- Keep audience signals and related-video support lightweight

---

## Core Workflow (domain model)

```
Transcript input
  → Analysis (core idea, hooks, audience hints)
  → Titles (10 candidates, user selects shortlist)
  → Thumbnails (1–2 concepts per selected title + optional text)
  → Description (synopsis + chapters + related-video suggestions)
  → Review / export
```

These stages are the primary domain concepts. UI structure (tabs, panels, pages) is a separate concern from this workflow.

---

## Scope Guardrails

If a proposed feature touches any of the following, check the spec first — they are explicitly out of scope for v1:

- backfill / channel history
- cross-video pattern tracking
- North Star strategy system
- prompt management UI
- multi-brand / multi-tenant support
- analytics dashboards

---

## Tech Stack

> To be defined as implementation begins. Update this section once the stack is decided.
