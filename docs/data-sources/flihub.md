---
source: FliHub local server
url: http://localhost:5101
serves: ~/dev/video-projects/v-appydave/
canonical_skill: brand-dave:flihub-integration
---

# FliHub — Live API

FliHub is a local Node/Express server that exposes the v-appydave filesystem as a queryable API with built-in BI (chapter/segment naming convention parsing, missing-transcript detection, project state).

## Status check (run first, every session)

```bash
curl -sS --max-time 3 http://localhost:5101/api/projects/stats | head -1
```

Returns JSON `{"projects": [...]}` if up. Anything else (HTML error, timeout, "Cannot GET") = down.

## Start FliHub

```bash
cd ~/dev/ad/flivideo/flihub && npm run dev
```

Runs on port **5101**. Keep the terminal open or background it.

## Canonical skill reference

For full endpoint details and conventions, the canonical skill is **`brand-dave:flihub-integration`**:
`~/.claude/plugins/cache/appydave-plugins/brand-dave/1.10.0/skills/flihub-integration/SKILL.md`

This file is a quick-reference companion — for anything not covered here, defer to the skill.

## Endpoints that matter for FliLaunch workflows

| Endpoint | What it gives you | Notes |
|---|---|---|
| `GET /api/projects/stats` | All projects with metadata: `code`, `path`, `transcriptCount`, `chapterCount`, `transcriptPercent`, `transcriptSync`, `stage`, `createdAt`, `lastModified`, `imageCount`, `thumbCount`, `hasInbox`, `hasFinal`, `shadowCount` | This is the BI surface — `transcriptSync.missingCount`, `chapterCount`, `stage` already encode triage state |
| `GET /api/projects/{full-code}/transcript-sync` | Per-project transcript sync detail | Used by `fetching-transcript` agent |
| `GET /api/projects/{full-code}/transcripts?include=content` | Full transcript content per recording | Use for ingestion |
| `GET /api/projects/{full-code}/chapters?format=text` | YouTube-ready chapter list with timestamps | Already-formatted output |
| `GET /api/projects/{full-code}/recordings?missing-transcripts=true` | Missing-transcript filter | First-class missing-thing primitive — the triage workflow consumes this |
| `GET /api/projects/{full-code}/recordings?chapter=N` | Per-chapter recording group | For chapter-scoped operations |
| `GET /api/projects/{full-code}/export?format=text` | LLM-ready bundle | Use for one-shot ingestion of whole project |
| `POST /api/projects/{full-code}/inbox/write` | Write outputs back into the project's inbox | Workflow output destination |

## Resolving short codes (e.g. `b65`)

Some workflows refer to projects by their short code (`b65`). FliHub keys by full code (`b65-guy-monroe-marketing-plan`). To resolve:

```bash
curl -sS http://localhost:5101/api/projects/stats | jq -r '.projects[] | select(.code | startswith("b65")) | .code'
```

## What FliHub does NOT serve

- **Published YouTube data** — see `published.md`. FliHub knows nothing about post-publication state, YouTube IDs, or what's actually on the channel.
- **Cross-channel data** — FliHub is currently rooted at `~/dev/video-projects/v-appydave/`. Other brand folders (`v-aitldr/`, `v-shared/`, etc.) exist but FliHub doesn't currently serve them.
