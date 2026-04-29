# North Star Versioning and Compliance

## Source
Extracted from `docs/discovery/raw-3.txt` on 2026-04-23.

## The idea
A brand's North Star is **not permanent**. It's an active strategy window with:
- versioned snapshots over time
- rolling compliance measurement
- explicit "strategy window" framing (30/90 days, not multi-year)

### Why raw-3 flagged this
A multi-year North Star pretends to explain a 3-year channel arc. It can't — content shifts, audiences shift, platforms shift. Pretending otherwise makes "compliance" meaningless.

### Proposed structure
- **Active North Star** — current 30–90 day strategy window
- **Historical snapshots** — each past window preserved as a frozen version
- **Compliance metrics** — how well the channel's output aligns with the active North Star, measured over:
  - all-time (will be noisy for long-running channels — expected)
  - 90 days (meaningful)
  - 30 days (sharpest)

### Semantic versioning model (from raw-4.txt)
North Stars should be versioned like software — but **two levels of granularity, not three**.

- **Major version** (e.g. 1 → 2) — **new strategic direction**. The North Star has genuinely shifted. This is a new chapter. Start a new historical snapshot.
- **Minor version** (e.g. 1.3 → 1.4) — **wording tweak or refinement**. Same strategic direction, just sharpened language. Do NOT start a new snapshot.

### Alignment measurement rule
**Compliance is measured against Major versions only.** Minor tweaks don't trigger recompliance analysis — that would be noise. A brand's alignment story is told across its Major North Star chapters, not its wording revisions.

### Why this matters
Without the Major/Minor distinction, every small North Star edit would fragment the historical narrative. With it, a brand's 3-year arc reads as (e.g.) "Major 1 → Major 2 → Major 3" — three coherent chapters — instead of 47 micro-versions that obscure the story.

### Historical bonus
When running backfill (see separate requirement), analyze the corpus in three-month chunks and assign a "detected North Star" to each window. The multi-year corpus then reads as a sequence of coherent 3-month arcs instead of a blur.

## Why it's out of v1
North Star compliance scoring is analytics — specifically, *strategy* analytics. v1 explicitly rejects the North Star strategy system.

The **single North Star** for the app itself (`docs/north-star.md`) is a development guardrail — different thing. That's staying.

What's rejected for v1 is the *per-brand, versioned, compliance-measured* North Star system for users' channels.

## Dependencies
- Needs `multi-tenant-multi-brand.md` (each brand has its own North Star)
- Needs `historical-video-backfill.md` (compliance needs historical data)
- Needs the `channel-brain` persistence layer (windowed analysis needs stored records)

## When to build this
After the backfill tool populates enough data to score compliance meaningfully. Scoring a North Star against 3 launches is useless; against 30 it starts to matter.

## Related
- `docs/requirements/historical-video-backfill.md`
- `docs/requirements/multi-tenant-multi-brand.md`
- `docs/requirements/channel-brain-audience-memory.md`
- `docs/requirements/cross-video-pattern-tracking.md`
