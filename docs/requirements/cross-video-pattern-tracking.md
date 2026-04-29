# Cross-Video Pattern Tracking

## Source
Extracted from `docs/discovery/raw-2.txt` on 2026-04-23.

## The idea
Track how identity signals, audiences, and concepts recur across the channel's videos over time. Surface patterns back to the creator as signals for future packaging.

### Example tracking dimensions
- **Frequency**: "BMAD appears in 40% of videos"
- **Performance**: "BMAD-tagged videos have higher retention"
- **Pattern suggestions**: "You haven't used BMAD in 5 videos"

### Framing from raw-2
> Your channel is defined by repeated patterns, not individual videos.

## Why it's out of v1
This is analytics + strategy territory, explicitly excluded from v1:
- No analytics dashboards
- No cross-video intelligence
- No strategic analytics
- No historical backfill

Tracking frequency and performance across videos also requires a persistent store of past video metadata — i.e. depends on Channel Brain being in place first.

## Dependencies
- Needs `channel-brain-audience-memory.md` implemented first
- Needs some form of performance data ingestion (likely YouTube Analytics API) — another v2+ concern

## What would elevate this to v2+
A dedicated analytics view over stored video history with tag-level aggregation. Likely a separate surface from the launch flow itself — the launch tool consumes insights, it doesn't generate analytics.

## Related
- `docs/requirements/channel-brain-audience-memory.md` — prerequisite
