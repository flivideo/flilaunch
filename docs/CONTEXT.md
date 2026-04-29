# FliLaunch — Context & Knowledge Map

**Purpose**: Orient any agent or session to the YouTube Launch Optimizer — where the docs live, what each one is for, and the current implementation state.

**For Agents**: Read this before making any structural decisions. Follow the source-of-truth hierarchy below.

**Created**: 2026-04-29
**Last Updated**: 2026-04-29

---

## Source of Truth Hierarchy

```
flilaunch/docs/youtube-launch-optimizer-spec-v1.md   ← DESIGN SOURCE OF TRUTH
        ↓ implemented as
/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/  ← BUILT IMPLEMENTATION (Mac Mini M4 only)
        ↓ analysed in
/Users/davidcruwys/dev/baku/docs/per-app/b-youtube-launch-optimizer.md  ← SHIP-READINESS AUDIT
        ↓ early UX sketch (supplementary)
brains/brand-dave/app-requirements/app-02-youtube-launch-optimizer.md
```

---

## Document Roles

### 1. `docs/youtube-launch-optimizer-spec-v1.md` — Design source of truth
The definitive product spec. Written Apr 23. Read this before anything else.

Key things only in this doc:
- 7 core design principles (accumulating system, persistence ≠ analysis, tribal cues vs SEO keywords, lightweight by default, AI suggests/human decides)
- Audience signal intensity model: Primary / Secondary / Hidden
- Launch record state machine: `draft → generated → reviewed → finalized`
- Explicit v1/v2 scope boundaries — what is and isn't in scope
- Backfill compatibility rule (schema must not require migration when backfill tool ships)
- Static audience config model (`audiences: ["BMAD", "AI Agents", "Automation", "Founders"]`)

### 2. `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/` — Built implementation
**Mac Mini M4 only** — not synced to MacBook Pro by default (copy manually with rsync when needed).

A Baku (Anthropic no-code app builder) implementation of the 8-stage pipeline. As of 2026-04-29:
- All 8 stages functional: Ingest → Analysis → Titles → Thumbnails → Chapters → Chapter Editor → Description → Publish Review
- Tech: React + Supabase (JSONB per-stage, RLS), Claude via Edge Functions, shadcn UI
- Ship readiness: 6/10 — production-usable for single creator, not ready for paid SaaS
- **Stub**: Thumbnail image generation is "coming soon" placeholder
- **Gap**: Zero test coverage
- **Discrepancy**: Inbox API creates projects at stage 1, not stage 2 as CONTEXT.md inside baku says

### 3. `/Users/davidcruwys/dev/baku/docs/per-app/b-youtube-launch-optimizer.md` — Ship-readiness audit
Code review of the Baku implementation. Not a spec. Covers: security (LOW risk), testing gaps, code quality, data model, AI integration quality, spinoff ideas.

Useful for: understanding what's built, what's broken, what to fix before launch.

### 4. `brains/brand-dave/app-requirements/app-02-youtube-launch-optimizer.md` — Early UX sketch
Captured from OMI conversation 2026-04-11. Baku-targeted. 

Useful for: **UI mechanics detail** the spec left loose — 12 parallel analysis prompt cards, 6 thumbnail concepts → 3 picks → 2 variants each, KIE AI API endpoints, chapter editor panel layout.
Not useful for: design authority or scope decisions (use the spec instead).

---

## ALS Workflow Connection

The `als-workflows` repo at `/Users/davidcruwys/dev/als-workflows/` is where the YouTube Launch Optimizer workflow will be modelled as an ALS Delamain.

The general-purpose-factory (research → planning → impl) is already installed and running there. The next step is to create a job in that system to design the custom YouTube launch Delamain, using this spec as the brief.

---

## Key Constraints (from the spec)

- Transcript is the only required input
- Nothing auto-advances — human gate at every stage transition
- v1 writes records, does not read them across videos (cross-video intelligence is v2+)
- Audience signals are tribal recognition cues, not SEO keywords — do not force them into titles
- Prompt management UI is out of scope for v1
- Schema must be backfill-compatible before finalising

---

## Absolute Paths Quick Reference

| What | Path |
|------|------|
| Design spec (source of truth) | `/Users/davidcruwys/dev/ad/apps/flilaunch/docs/youtube-launch-optimizer-spec-v1.md` |
| Baku implementation | `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/` *(Mac Mini M4 only)* |
| Baku ship-readiness audit | `/Users/davidcruwys/dev/baku/docs/per-app/b-youtube-launch-optimizer.md` *(Mac Mini M4 only)* |
| Early UX sketch | `/Users/davidcruwys/dev/ad/brains/brand-dave/app-requirements/app-02-youtube-launch-optimizer.md` |
| ALS workflows workspace | `/Users/davidcruwys/dev/als-workflows/` |
| FliLaunch app root | `/Users/davidcruwys/dev/ad/apps/flilaunch/` |
