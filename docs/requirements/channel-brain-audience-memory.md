# Channel Brain: Cross-Video Intelligence Layer

## Source
Extracted from `docs/discovery/raw-2.txt` on 2026-04-23, refined by `raw-3.txt` on the same day.

## Important framing correction
**Persistence is in v1. Cross-video intelligence is v2+.** See `docs/decisions/audit-log.md` — the "Every launch persisted as structured record" decision.

What's deferred here is the **intelligence layer that reads the accumulated history** — not the history itself.

## The idea
Once many launches have been persisted, a reasoning layer sits on top of the stored records and surfaces patterns to the creator during new launches.

### Two brains (raw-2's framing)
- **Video Brain** — extracted from the current transcript (dynamic, per-launch) — **already v1**
- **Channel Brain** — reasons across stored launches to surface identity anchors, recurring concepts, and audience patterns — **v2+**

### What the intelligence layer does
- Detects when a known audience signal is present in the current transcript *and* historically important to this channel
- Suggests placement based on historical patterns ("this channel uses BMAD as a badge, not a title")
- Flags drift ("you haven't targeted founders in 5 videos")
- Surfaces recurring concepts the transcript touches even faintly
- Weighs primary vs secondary vs hidden classification using historical baseline, not just the current transcript

## Why the intelligence layer is out of v1
v1 constraint — no cross-video intelligence. Persistence is in; analysis over that persistence is out.

Also: this layer is useless without enough stored launches to reason over. Building it pre-data is premature.

## What is in v1
- Persistence of every launch (transcript, generated + selected titles, hooks, thumbnails, classifications, description, prompts run)
- Static audience config (hardcoded list of identity terms)
- Primary/Secondary/Hidden classification for the **current** transcript only
- Within-session feedback loops (selected hook → thumbnail, etc.)

## What's v2+
- Reading the stored history
- Frequency/placement analysis across past launches
- Suggesting signals based on historical baseline, not just current transcript
- Pattern flags ("you haven't used X in N videos")

## Dependencies
- v1 must store launches in a schema rich enough for future analysis — see the persistence decision in the audit log
- `docs/requirements/cross-video-pattern-tracking.md` — adjacent requirement, covers frequency/performance metrics specifically
- `docs/requirements/historical-video-backfill.md` — the backfill tool populates pre-FliLaunch videos into the same schema

## Related
- `docs/decisions/audit-log.md` — persistence decision + content-OS drift rejection
- `docs/requirements/cross-video-pattern-tracking.md`
