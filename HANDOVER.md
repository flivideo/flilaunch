---
purpose: Resume the FliLaunch / ALS prep conversation on a different machine
session_origin: Roamy (MacBook Pro M4 Pro)
session_date: 2026-05-10
next_machine: M4 Mini (Tailscale 100.82.235.39)
next_event: ALS workflow design conversation with Nick Frith (today)
---

# Handover — Continue ALS Prep on M4 Mini

## How to use this file

On the next machine, after `git pull`, paste **exactly the prompt below** as your opening message to Claude. Everything Claude needs is in this repo.

---

## Startup prompt to paste

> Pick up where I left off on Roamy. We just spent a session preparing for an ALS workflow design conversation with Nick Frith today (2026-05-10). The output of that prep is `docs/workflow-surface-mapping.md` — read it first. Treat this as continuation, not introduction.
>
> Context to hold while we work:
>
> - **Scope today is AppyDave only.** v-aitldr, v-shared, Clauding Lab, and other brands are explicitly out. Don't propose generalising across channels.
> - **We're working in ALS** — filesystem-backed structured records via `defineModule()`. **Not Baku.** Don't propose Supabase JSONB schemas, React UI, or any web-app architecture. Where the existing Baku impls use a database column, ALS uses a record file or a structured-prose section in a record body.
> - **The Baku impls are reference, not target.** `~/dev/baku/b-youtube-launch-optimizer/` (8 stages, title-centric) and `~/dev/baku/b-flilaunch/` (7 stages, hook-centric) are read-only references for what was tried. Extract intelligence — prompt content, output shapes, failure modes — not architecture.
> - **FliHub is BI, not just an API.** The `<chapter>-<segment>-<label>.srt` filename pattern in `recording-transcripts/` already encodes chapter labels and boundaries. The `?missing-transcripts=true` filter is a first-class signal-detection primitive. Workflows should consume that intelligence, not re-derive it. Skill at `~/.claude/skills/flihub/SKILL.md`. Server: `cd ~/dev/ad/flivideo/flihub && npm run dev` (port 5101).
> - **ALS scaffold already exists** in `.als/` from the 2026-04-29/30 sessions — 3 operator gates, hook-centric fan-out. `docs/als-learnings/` captures what was learned authoring it.
> - **I'm not asking you to design Delamains.** Nick does that with me. Your job: keep the substrate clean, surface gaps, refine open questions, fetch facts from FliHub or filesystem when I ask, and stop me if I drift back into Baku/database framing.
> - **Memory doesn't travel between machines.** This repo is the source of truth. If something matters, it lives in git.
>
> Read these in order before responding:
> 1. `HANDOVER.md` (this file)
> 2. `docs/workflow-surface-mapping.md` — the prep brief, primary artefact
> 3. `docs/CONTEXT.md` — knowledge map and source-of-truth hierarchy
> 4. `docs/youtube-launch-optimizer-spec-v1.md` (skim §1–6, §11; the rest as needed)
> 5. `docs/flithumb-brief.md` — thumbnail design rules (separate composable app)
>
> Then confirm in two sentences: what we're doing, and the constraint frame. Wait for me before doing anything else.

---

## What was done in the Roamy session (so the next Claude doesn't re-discover)

1. Surveyed every FliLaunch variant across Roamy and M4 Mini — `b-youtube-launch-optimizer`, `b-flilaunch`, `flivideo/flilaunch` (this repo), `.als/` scaffold, app-ideas screentours, als-workflows skill. Confirmed evolution: spec → 8-stage Baku build → ALS Delamain redesign (hook-centric) → 7-stage Baku rebuild.

2. Confirmed substrate: 81 AppyDave projects, ~64 with transcripts; `<chapter>-<segment>-<label>` naming convention encodes chapter labels and boundaries before any AI runs (verified against `c27-angeleye`).

3. Confirmed FliHub as the BI layer — including the `missing-transcripts=true` primitive and `chapter` filtering, which directly serves "is something missing" workflow signals.

4. Mapped 7 workflow categories David described (triage, bulk-analysis, titles, thumbnails, thumbnail-text, chapters, description) to ALS-native framing — what records, what shapes, what's already structured vs net-new.

5. Held open: missing-thing sub-workflows (no SRT → generate / investigate / manual), prompt centralisation as future ALS module, Mochaccino as visualisation seam.

6. Wrote `docs/workflow-surface-mapping.md` (commit `8feba10` on `main`) as the primary artefact for the Nick conversation.

## Source-of-truth references (all in this repo, all travel)

| What | Path |
|---|---|
| **Primary prep brief** | `docs/workflow-surface-mapping.md` |
| Spec (design source of truth) | `docs/youtube-launch-optimizer-spec-v1.md` |
| Knowledge map | `docs/CONTEXT.md` |
| Thumbnail rules (FliThumb) | `docs/flithumb-brief.md` |
| ALS implementation learnings | `docs/als-learnings/` |
| Workflow diagrams | `docs/workflows/` |
| Deferred requirements | `docs/requirements/` |
| Decisions log | `docs/decisions/audit-log.md` |
| Existing ALS scaffold | `.als/` |
| Prior session handover (M4) | `SESSION.md` (on M4 Mini only) |

## External references (not in repo)

| What | Where |
|---|---|
| Baku impl A — 8-stage, title-centric | `~/dev/baku/b-youtube-launch-optimizer/` (M4 only) |
| Baku impl B — 7-stage, hook-centric | `~/dev/baku/b-flilaunch/` (M4 only) |
| AppyDave video projects | `~/dev/video-projects/v-appydave/` (M4 has full set) |
| FliHub server + skill | `~/dev/ad/flivideo/flihub/`, `~/.claude/skills/flihub/SKILL.md` |
| ALS brain docs | `~/dev/ad/brains/als/` |
| AppySentinel (data-collection parallel) | `~/dev/ad/apps/appysentinal/` |
| Mochaccino skill (visualisation seam) | `~/.claude/plugins/cache/appydave-plugins/appydave/*/skills/mochaccino/` |
