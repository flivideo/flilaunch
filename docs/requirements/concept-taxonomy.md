# Concept Taxonomy

## Source
Extracted from `docs/discovery/raw-3.txt` (concept class proposal) and `docs/discovery/raw-4-spec-v1.txt` (section 7, initial taxonomy) on 2026-04-23.

## The idea
A **defined list of concept classes** that the system extracts across videos, so bulk processing produces durable structured metadata rather than a "junk drawer of semi-useful signals" (raw-2's warning).

Without a taxonomy, extraction produces noise. With one, extraction produces a queryable corpus.

## Provisional taxonomy (from raw-4-spec-v1 section 7)

### Audience Concepts
- audience signals
- identity tags
- tribe/community signals

### Brand Concepts
- brand terms
- brand promises
- signature narrative frames

### Strategy Concepts
- North Star alignment
- content pillar mapping
- campaign/time-window relevance

### Content Concepts
- topics
- themes
- tools/frameworks
- methods
- recurring entities

### Packaging Concepts
- hook type
- title framing
- thumbnail motif
- text/no-text patterns
- badge opportunities

### Description Concepts
- synopsis structure
- related-video placement
- CTA type
- link blocks
- legal patterns

### Discovery Concepts
- keyword classes
- search support terms
- identity keywords
- recommendation graph relationships

## Per-concept metadata shape
Each extracted concept carries:
- **concept class** — which of the above buckets
- **concept label** — the actual term
- **extraction method** — how it was identified (prompt-based, rule-based, human)
- **confidence** — how sure we are
- **source video(s)** — which videos produced it
- **frequency** — how often it appears across the corpus
- **compounding value** — is this concept getting more important over time?
- **current usefulness** — is it active or decaying?
- **where it gets used** — which app surfaces consume this concept

## Why this is out of v1
v1 doesn't run cross-video extraction. It classifies audience signals (Primary/Secondary/Hidden) for the *current* video only. A full taxonomy with extraction pipelines across the corpus is v2+.

Also — raw-4 flagged this correctly: **the taxonomy should NOT be finalized before the backfill tool has produced real data to observe**. The provisional list above is a starting point, not a schema.

## Design rule (from raw-3)
> Capture broadly, structure narrowly.

Ingest widely. Only promote to formal taxonomy what compounds across videos.

## Dependencies
- `docs/requirements/historical-video-backfill.md` — the data source for observation
- `docs/requirements/channel-brain-audience-memory.md` — consumes taxonomy
- `docs/requirements/cross-video-pattern-tracking.md` — analyzes taxonomy over time

## Related
- `docs/future/architecture-spec-v2.md` — section 7
- `docs/requirements/keyword-model.md` — adjacent classification scheme
