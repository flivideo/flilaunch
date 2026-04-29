# Related Videos Subsystem

## Source
Extracted from `docs/discovery/raw-3.txt` and sharpened by `docs/discovery/raw-4.txt` on 2026-04-23.

## The core insight
Related videos are not a feature of the description stage. They are a **graph problem** that many features consume.

Currently David handles related videos "from memory, laziness, or whatever was linked last time" (raw-3's framing). That's a garbage system. Done properly, it becomes infrastructure that serves many use cases.

## Use cases that consume the related-video graph
From raw-4, the graph feeds:

1. **Playlists** — you can't build meaningful playlists without understanding video relationships
2. **End cards** — YouTube end cards surface 1–2 related videos and/or a playlist
3. **Description links** — the current pain point; clickable links with synopsis in the description body
4. **Intro transitions** — "as I mentioned in [prior video]..." with smooth reference
5. **Outro transitions** — "next video coming up is..." with forward reference
6. **Series threading** — multi-part content needs explicit previous/next links
7. **Blog post threading** — when blog content is derived from videos, related videos thread across posts too
8. **Pre-recording planning** — "what video should I make next?" is answered by looking at the graph of what exists and what connects

## Graph shape
- **Nodes**: videos
- **Edges**: typed relationships (continuation, prerequisite, alternative, topical-sibling, implementation-of, demonstration-of, etc. — taxonomy TBD after backfill)
- **Edge attributes**: confidence, use cases the edge supports, rationale

## Why this is out of v1
- Requires the historical video corpus (depends on backfill tool)
- Requires cross-video analysis infrastructure (depends on Channel Brain intelligence layer)
- A useful graph needs ~20+ videos to be meaningful, not 2–3
- Graph scoring and ranking is a non-trivial ML/retrieval problem

## v1 foothold
v1 accepts a manual related-video list as optional input and surfaces it in the description output. That's the lightweight version. The graph subsystem replaces the manual list when v2+ ships.

## Pre-recording vs post-recording
David flagged an important expansion: the related-video subsystem is useful **before recording**, not just after. Pre-recording: "I'm planning video X — what existing videos does it connect to? What playlists should it join?" This is a planning tool.

v1 is strictly post-recording (transcript-in). Pre-recording use of the related-video graph is v2+ and opens the door to a planning-mode surface.

## Dependencies
- `docs/requirements/historical-video-backfill.md` — seeds the graph
- `docs/requirements/channel-brain-audience-memory.md` — powers scoring
- `docs/requirements/concept-taxonomy.md` — edge typing draws on concepts

## Related
- `docs/future/architecture-spec-v2.md` — section 6.6 (Related-Video Graph Flow)
