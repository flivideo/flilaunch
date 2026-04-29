# AWB Historical Data — Reference

> **Purpose**: Preserve the locations and findings from the AWB (Agent Workflow Builder) `awb.json` / `.awb.json` files — prior YouTube Launch Optimizer workflow artifacts from David's video projects. Analyzed 2026-04-23 to inform FliLaunch v1 persistence schema, semantic model, and prompt design.
>
> **Data is read-only**: These files live in the v-appydave brand's video project folders. FliLaunch does NOT copy them in. This doc preserves enough context to re-access and re-analyze without rediscovery.

---

## File locations

### Older convention — visible `awb.json` (empty stubs, no useful signal)
| Project | Absolute path | Notes |
|---|---|---|
| b65-guy-monroe-marketing-plan | `/Users/davidcruwys/dev/video-projects/v-appydave/b65-guy-monroe-marketing-plan/awb.json` | Empty `{}` |
| b66-context-engineered-html-art | `/Users/davidcruwys/dev/video-projects/v-appydave/b66-context-engineered-html-art/awb.json` | Empty `{}` |
| b67-vam-s3-staging | `/Users/davidcruwys/dev/video-projects/v-appydave/b67-vam-s3-staging/awb.json` | Empty `{}` |

### Newer convention — hidden `.awb.json` (workflow schema, real runs)
| Project | Absolute path | Schema version | Notes |
|---|---|---|---|
| b85-clauding-lab-intro | `/Users/davidcruwys/dev/video-projects/v-appydave/b85-clauding-lab-intro/.awb.json` | stub | Scaffold / fixture — has planned fields (generatedTitles, thumbnailText, etc.) but never populated. Don't use for empirical decisions. |
| c15-opus-4.6-appystack | `/Users/davidcruwys/dev/video-projects/v-appydave/c15-opus-4.6-appystack/.awb.json` | 2.3.0 | Most-progressed real run — reached `create-chapters` step |
| c25-ecamm-skill | `/Users/davidcruwys/dev/video-projects/v-appydave/c25-ecamm-skill/.awb.json` | 2.2.0 | Only v2.2.0 file; shows `srt` → `srtContent` rename between versions |
| c27-angeleye | `/Users/davidcruwys/dev/video-projects/v-appydave/c27-angeleye/.awb.json` | 2.3.0 | Largest real file; richest `transcriptAbridgement` |
| c28-bmad-v6-project-setup | `/Users/davidcruwys/dev/video-projects/v-appydave/c28-bmad-v6-project-setup/.awb.json` | 2.3.0 | Real run, stopped before launch-packaging |
| c30-bmad-v6-architecture | `/Users/davidcruwys/dev/video-projects/v-appydave/c30-bmad-v6-architecture/.awb.json` | 2.3.0 | Real run, stopped before launch-packaging |
| c35-appydave-refresh | `/Users/davidcruwys/dev/video-projects/v-appydave/c35-appydave-refresh/.awb.json` | 2.3.0 | Real run, stopped before launch-packaging |

### How to re-access
```
ls /Users/davidcruwys/dev/video-projects/v-appydave/*/awb.json 2>/dev/null
ls /Users/davidcruwys/dev/video-projects/v-appydave/*/.awb.json 2>/dev/null
```

---

## Schema shape (populated in real .awb.json runs)

Top-level:
```
{
  "savedAt":         ISO timestamp
  "sessionId":       UUID
  "workflowId":      "youtube-launch-optimizer"     // name collision with FliLaunch
  "workflowVersion": "2.2.0" | "2.3.0"
  "currentStepId":   "create-chapters" | "video-prep-parallel" | "gather-inputs" | etc.
  "store":           { flat bag of workflow variables }
}
```

Populated `store` keys in real runs:
- `projectFolder`, `transcript`, `srtContent` (or `srt` in 2.2.0)
- `fliHubChapters` — array of `{folderNumber, chapterName, firstWords}` (pre-existing from recording pipeline, NOT an AWB output)
- `brandConfig` — see structure below
- `projectInfo` — `{projectCode, projectName, shortTitle}`
- `transcriptSummary` — tight markdown summary (~1.5k chars)
- `transcriptAbridgement` — denser narrative markdown with bolded entities (~3.5k chars)
- `transcriptAbridgementDiscrepancies` — accuracy QA comparing abridgement to original
- `chapters.chapters[]` — `{number, title, chars}` (YouTube-ready chapter list — c15 only)
- `createChapters` — formatted string `"0:00 Title\n1:39 Title\n..."` (c15 only)

Scaffolded but **never populated in any real run**:
- `generatedTitles`, `thumbnailText`, `videoSimpleDescription`, `videoDescription`
- `keywords`, `searchTerms`, `catchyPhrases`, `ctaPhrases`, `questionsPosedOrAnswered`
- `audienceInsights`, `usp`, `emotionalTriggers`, `overallTone`, `mainTopic`
- `keyTakeaways`, `statistics`

### Critical observation
**No real AWB run ever reached the launch-packaging stages.** Max progress: `create-chapters` (c15) and `video-prep-parallel` (others). This validates the FliLaunch premise — the packaging workflow is exactly where prior tooling failed to deliver.

### brandConfig structure (directly reusable — but normalize on import)
```
brandConfig: {
  primaryCta:       string (stringified JSON — normalize)
  foldCta:          string (stringified JSON — normalize)
  affiliates:       string (newline-delimited JSON objects with `active` flag — normalize)
  socialLinks:      string (stringified JSON — normalize)
  legalDisclosure:  string (plain — reused verbatim across all c-series files)
  relatedVideos:    string (empty in every file)
}
```

**Gotcha**: `primaryCta`, `foldCta`, `socialLinks`, `affiliates` are stringified JSON inside the JSON blob (double-serialized). If FliLaunch consumes AWB data, normalize on import.

---

## Per-entity observations (AWB vs FliLaunch v1 semantic model)

| FliLaunch v1 entity | AWB equivalent | Status |
|---|---|---|
| `Transcript` | `store.transcript` + `store.srtContent` | ✅ Direct match |
| `Analysis` | `transcriptSummary` + `transcriptAbridgement` + `transcriptAbridgementDiscrepancies` | ⚠️ Richer in AWB — three tiers. FliLaunch analysis is single-tier. |
| `HookAngle` | none | ❌ Missing in AWB |
| `Title` (with candidates + selection) | `projectInfo.shortTitle` only | ⚠️ Partial — AWB has one human-written short title, no candidate pool, no selection state. `generatedTitles` scaffolded but never used. |
| `ThumbnailConcept` / `ThumbnailText` | none (scaffolded only) | ❌ Missing |
| `Description` / slots | none populated (`brandConfig` implies the slot structure) | ⚠️ Scaffold only; brandConfig hints at slots |
| `ChapterEntry` | `chapters.chapters[]` (c15 only) | ✅ Shape: `{number, title, chars}` |
| `RelatedVideoLink` | `brandConfig.relatedVideos` (empty string) | ❌ Structure missing |
| `AudienceSignalClassification` | none | ❌ No audience modeling in AWB at all |
| `KeywordTag` | none populated | ❌ Missing |
| `PromptRun` | none | ❌ No prompt provenance captured in AWB |
| `LaunchRecord.state` | `currentStepId` (global, not per-entity) | ⚠️ FliLaunch's per-record state model is richer |
| record metadata | `savedAt`, `sessionId`, `workflowId`, `workflowVersion`, `projectFolder`, `projectInfo.projectCode` | ✅ Matches FliLaunch pattern |

---

## Recurring patterns observed

### Audience tribes (implicit in transcripts; AWB doesn't store)
These are the audiences David actually speaks to across the real AWB transcripts. **Nothing in AWB captures them** — pulled from reading the prose:

- Vibe coders / solo developers
- Claude Code / Codex / OpenClaw users
- BMAD-method practitioners
- Agent-OS / multi-agent workflow builders
- Indie SaaS / B2B founders
- AI-tooling early adopters
- NDIS / disability-sector builders (SupportSignal context)
- Ecamm Live / Stream Deck / livestreamer-developer hybrids

**Actionable**: these seed FliLaunch's static audience config (`AudienceConfig.audiences[]`).

### Hook types (observed in real transcripts)
Candidate starter taxonomy for FliLaunch's hooks prompt:
- **Problem-desire** — "have you ever wanted…"
- **Capability demo** — "in this video we'll use X to build Y"
- **Pain → solution** — "the problem with X is… here's how I fixed it"
- **Qualifying question** — "are you interested in X?"
- **Context + motivation** — "I'm doing Y, and the reason is…"
- **Scope statement** — "this video is about setting up X"

### Description slot types (implied by brandConfig)
- Primary CTA (opt-in / value trade)
- Fold CTA (community / low-friction click)
- Chapters
- Related videos
- Affiliates (list, each with `active` toggle)
- Social links (platform → URL map)
- Legal disclosure (affiliate boilerplate, reused verbatim across files)

---

## Red flags / contradictions to preserve

- **Workflow name collision.** AWB's workflow is also called `youtube-launch-optimizer`. Expect conflation. Worth deciding whether FliLaunch replaces AWB or consumes its outputs. Consider renaming FliLaunch workflow internally to avoid confusion.
- **`shortTitle` vs generated titles.** AWB's `shortTitle` is an internal human label (one per project), NOT a candidate title. FliLaunch should preserve both concepts — an internal label plus the candidate pool with selections.
- **fliHubChapters vs YouTube chapters.** `fliHubChapters` is a recording-pipeline input (folder metadata); `chapters.chapters[]` is the AWB-generated YouTube chapter list. Two different things. FliLaunch spec should distinguish `recording_chapters` (input) from `youtube_chapters` (output).
- **Thumbnail-from-title assumption leak in AWB scaffold.** `generatedTitles` and `thumbnailText` are peer siblings with no linkage field — shape implies thumbnails-from-titles. FliLaunch's hook-is-ancestor model requires explicit linkage (already in semantic model).
- **b85 fixture contamination.** b85 stub contains boilerplate about "a participant who experienced escalating distress" — SupportSignal sample leaking into AppyDave workflow scaffold. Don't trust b85 for empirical decisions; it's a fixture.
- **Double-serialized JSON in brandConfig.** UI-form carelessness leak. Normalize on import; don't propagate.

---

## Actionable extractions — status

Decision (2026-04-23): David flagged that deep extraction of audience / hooks / brandConfig from this historical data is anti-productive now. These belong to a future tool that scans all prior videos — already captured in `docs/requirements/historical-video-backfill.md` and `docs/requirements/channel-brain-audience-memory.md`. Only the immediately-useful finding (internal label) was applied now.

| Finding | Priority | Destination | Status |
|---|---|---|---|
| Audience seed list (8 tribes) | **DEFERRED** | Future cross-video extraction tool (see `docs/requirements/historical-video-backfill.md`) | Note preserved here; do not populate AudienceConfig from this analysis alone |
| Hook type taxonomy (6 patterns) | **DEFERRED** | Future cross-video extraction tool; will also inform `docs/prompts/hooks.md` at prompt-design time | Note preserved here; do not lock taxonomy now |
| `brandConfig` structure → description slots | ✅ Already reflected in `DescriptionSlot.slot_type` | Already in semantic model | Done at structural level; actual CTAs/affiliates/legal content is per-brand setup, NOT backfilled |
| `shortTitle` → internal label | ✅ **Applied** | `LaunchRecord.internal_label` in semantic model and spec section 14a | Done |
| `projectCode` cross-reference | ✅ **Applied** | `LaunchRecord.project_code` in semantic model and spec section 14a | Done |
| Recording-chapters vs YouTube-chapters distinction | **LOW** | Semantic model refinement at schema-lock time | Minor; revisit when persistence is finalized |
| Double-JSON normalization on import | **LOW** | Baku import logic when implemented | Defer to build time |
| Workflow name collision | **LOW** | Internal naming decision | Consider at build time |

### Why most extractions are deferred
David's reasoning (2026-04-23): audience, hook, and brand-config extraction belong to a tool that reads all prior videos in one pass — not to manual curation from this single analysis. That tool is already captured as a v2+ requirement. Doing partial extraction now would create two sources of truth (this manual extract + the future tool's output) and risk diverging.

The brand config is a per-brand setup, not a per-launch artifact — set it up once per brand, rarely changes. FliLaunch v1 treats it as a configuration concern, not a data-extraction concern.

---

## Analysis provenance

- Conducted 2026-04-23 by background research subagent
- Full analysis preserved in conversation transcript (reference at session level)
- Source spec at time of analysis: v1 spec with Core Design Principles 1–7, persistence model (14a), state model
- No files were modified during analysis; read-only pass
