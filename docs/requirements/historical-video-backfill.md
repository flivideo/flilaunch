# Historical Video Backfill

## Source
Extracted from `docs/discovery/raw-3.txt` on 2026-04-23.

## The idea
An internal tool that scans every video across every brand and captures baseline data into the FliLaunch persistence layer.

### Minimum capture
- video URL
- video title
- transcript

### Bonus capture
- YouTube description
- thumbnail(s) — including the fact that 1, 2, or 3 were tested
- selected vs tested thumbnail distinction
- YouTube keyword tags
- playlist memberships
- audience insights metadata from YouTube

## Why it's out of v1
Backfill is infrastructure, not launch optimization. It doesn't help the creator get from transcript to launch-ready this session — it seeds future intelligence for the *next* session.

v1 builds the persistence schema for *new* launches as they happen. Backfilling historical videos into that schema is a separate one-off tool.

## When to build this
After v1 ships and a few launches have been persisted. That tells us whether the schema is right. Backfill is expensive if the schema changes underneath it.

## Operational scope (when built)
- Single-operator tool (David runs it, not multi-user)
- Three brands initially: AppyDave, AITLDR, Clauding Lab
- Output: populated persistence layer that later tools (cross-video analysis, North Star compliance, audience stats) read from

## Related
- `docs/requirements/multi-tenant-multi-brand.md` — backfill implies multi-brand data
- `docs/requirements/channel-brain-audience-memory.md` — what the backfilled data feeds
- `docs/requirements/cross-video-pattern-tracking.md` — what the backfilled data enables
