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

## Data sources (READ FIRST when any workflow needs video data)

Index: **`docs/data-sources/README.md`** — co-located reference for the three sources of truth.

| Source | Purpose | Index |
|---|---|---|
| FliHub (live API on :5101) | Project list, transcripts, chapters, missing-X queries — BI-enriched | `docs/data-sources/flihub.md` |
| v-appydave (local files) | Raw recording filesystem at `~/dev/video-projects/v-appydave/` | `docs/data-sources/v-appydave.md` |
| published (YouTube archive) | Post-publication truth at `~/dev/video-projects/published/` (3 brands, ~556 videos) | `docs/data-sources/published.md` |

**Health check before using FliHub**: `curl -sS --max-time 3 http://localhost:5101/api/projects/stats | head -1` — JSON = up, anything else = run `cd ~/dev/ad/flivideo/flihub && npm run dev`.

---

## Prompts (READ FIRST when any workflow needs a prompt)

Index: **`docs/prompts-index.md`** — ~75 prompt assets across 8 source systems, grouped by category, with canonical sources marked. Use this to assemble per-workflow bundles in minutes. Don't aim for perfect prompts pre-workflow — they evolve once workflows run for real.

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
