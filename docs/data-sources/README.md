---
purpose: Index of all video data sources FliLaunch reads from. Every workflow that touches video data should pull from one of these — never invent a new path.
created: 2026-05-10
---

# Video Data Sources

Three sources of truth for video data. Co-located here so any workflow can find them without hunting.

| Source | What it gives you | Index file |
|---|---|---|
| **FliHub** (live API) | Real-time project list, transcripts, chapters, missing-X queries | [`flihub.md`](flihub.md) |
| **v-appydave** (local files) | The actual recording files behind every FliHub project — same data, raw filesystem access | [`v-appydave.md`](v-appydave.md) |
| **published** (YouTube archive) | Every video that's actually been published on YouTube — pulled from the channel, keyed by YouTube video ID | [`published.md`](published.md) |

## Which to use when

- **"What projects do I have / which are missing X?"** → FliHub API. It already encodes the BI.
- **"What are the actual SRT timings / file contents?"** → v-appydave directly (FliHub serves these too, but local read is faster for batch ops).
- **"What did I actually publish? Title, description, thumbnail YouTube currently shows?"** → published archive. This is the only source for *post-publication* truth.

## Cross-source relationships

- `v-appydave/<code>/` is the **same data** FliHub serves from `/api/projects/<code>/...` — FliHub is a thin wrapper over the filesystem
- `published/<brand>/videos/<youtube-id>/` is **derived from** YouTube directly — no FliHub involvement, no v-appydave linkage. A v-appydave project might have been published, but the link between `b65-guy-monroe-marketing-plan` and a YouTube video ID is not currently captured anywhere
- The `archived/` subfolder under v-appydave is for projects no longer in active rotation — usually safe to skip in workflows
