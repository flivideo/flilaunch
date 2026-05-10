---
purpose: Open the FliLaunch ALS co-design session with Nick Frith
session_date: 2026-05-10
session_phase: live (David + Nick co-driving, in person/screen-share)
prior_session: morning prep on M4 Mini, post-Roamy
---

# Handover — Live ALS Co-Design with Nick

## How to use this file

After `/clear`, paste **the prompt below** as the opening message. Everything Claude needs to land oriented is in `docs/INDEX.md`.

---

## Startup prompt to paste

> I'm in a live co-design session with Nick Frith (ALS creator) right now, building 3–4 ALS workflows from scratch in this repo. Read `docs/INDEX.md` first — it's the single landing page that orients you. Don't read everything it points at; load on demand as the conversation goes.
>
> **North Star for the session**: 3–4 workflows actually working today via ALS. Nick designs the Delamains; my job is to keep the substrate clean, surface gaps, fetch facts, and stop drift. We're not aiming for completeness or perfect prompts — once workflows run for real, prompts evolve. Today is the apprenticeship: I learn how to direct my team to build more workflows after.
>
> **Hard constraints**:
> - **AppyDave only.** v-aitldr / v-shared / Clauding Lab / other brands out of scope.
> - **ALS, not Baku.** Filesystem-backed structured data via `defineModule()`. No Supabase/JSONB/React.
> - **Stay in this repo** (`~/dev/ad/flivideo/flilaunch`). It's the canonical FliLaunch home.
> - **Source of truth for video data**: `~/dev/video-projects/v-appydave/` (live work-in-progress, ~80 projects) and `~/dev/video-projects/published/` (post-publication archive, ~556 videos across 3 brands). FliHub on `:5101` serves v-appydave with BI on top — health-check it before use.
> - **Memory doesn't travel.** This repo is the source of truth. If something matters, it lives in git.
>
> Then confirm in two sentences: what we're doing and the constraint frame. Wait for me to drive.

---

## What was done in the prep session today (so you don't re-discover)

All committed in this repo this morning. Don't re-do; reference and build on:

1. **Resolved repo divergence with `als-workflows`** — that repo had two stale narratives plus 168 uncommitted FliLaunch experiment files (May 3 Skills+Subagents attempt). Preserved on branch `archive/2026-05-03-flilaunch-skills-attempt` in `~/dev/als-workflows`. `als-workflows/main/CLAUDE.md` now correctly says "generic ALS sandbox, FliLaunch lives elsewhere." Don't re-investigate this — it's done.

2. **Built `docs/prompts-index.md`** — ~75 prompt assets across 8 source systems, grouped by 12 categories with ⭐ canonical sources marked. Richest source: AWB Gen 3 at `~/dev/ad/apps/awb/examples/gen3/youtube/prompts/` (31 Handlebars + JSON schemas). 5 explicit gaps listed.

3. **Built `docs/data-sources/`** — co-located indexes for FliHub (`:5101`, live API), v-appydave (local recording filesystem), published (YouTube archive). v-appydave and published describe different worlds — don't try to join them.

4. **Built 6 Mochaccino visual designs** at `.mochaccino/designs/`:
   - `index.html` — gallery
   - `01-als-learnings`, `02-als-runbook`, `03-als-module-state`, `04-als-primitives` — ALS comprehension visualisations from the Apr 29/30 sessions
   - `05-workflows` — interactive workflow + BI source map (the workshop surface for Nick)
   - `06-prompts` — interactive prompt index by category and source, cross-linked with workflows
   - All re-rendered with brand v1.10.0 (light hero default, dark accent only).

5. **Apr 30 ALS module at `.als/modules/fli-launch/v1` and `v2`** is from a solo session (David teaching himself the day after the Apr 29 Nick session). Nick has not reviewed it. Open to Nick reshaping or scrapping — everything is preserved in git history regardless.

## Source-of-truth references (all in this repo, all travel)

See `docs/INDEX.md` — it's the index of indexes. Don't re-list here.

## What this handover is NOT for

- Re-doing the audit. It's done. Read `als-workflows` CLAUDE.md if you need the boundary.
- Resolving the Apr 30 vs May 3 question. Both preserved. Decisions defer to the live session with Nick.
- Cleaning up the `.claude/scripts/.cache/pulse/sessionend.log` modification noise. Pulse cache, ignored intentionally.
