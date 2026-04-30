# FliLaunch — Baku Build Brief

Build a YouTube Launch Optimizer. Single-user internal tool. Transcript in → launch-ready YouTube packaging out.

**Stack**: React 18 + Vite + shadcn/ui + Tailwind + Bun + Supabase. AI calls via Supabase Edge Function (never expose API key to client). Auth via Supabase magic link.

---

## The one rule everything flows from

**Hook is the ancestor of both titles and thumbnails.**

- Titles are generated from selected hooks
- Thumbnails are generated from the same selected hooks — NOT from titles
- Titles and thumbnails are siblings, both children of the hook

Do not derive thumbnails from titles. This is the core architectural decision.

---

## Pipeline — 7 stages

Each stage has an explicit human gate. Never auto-advance. User clicks to proceed.

```
Input → Analysis → Hooks → Titles → Thumbnails → Description → Review/Finalize
```

The launch record exists from the moment a transcript is submitted. It persists across all stages. Closing the app and returning should resume exactly where the user left off.

---

## Stage detail

### Stage 1 — Input

User provides:
- **transcript** (paste or file upload) — required
- **srt_content** (paste) — optional, used for chapter timing
- **recording_chapters** — optional, pre-existing rough chapters from the recording pipeline (label + first_words pairs, not YouTube chapters)
- **project_code** — optional short cross-reference (e.g. "c27")
- **internal_label** — optional working title set before recording (distinct from the published YouTube title)
- **focal_note** — optional angle hint ("focus on the tmux multi-agent angle")
- **related_videos** — optional list of `{ title, url, relevance_hint? }` to suggest in description

On submit: create a LaunchRecord in state `draft`. Do not run any AI.

---

### Stage 2 — Analysis

Run 12 AI prompts against the transcript. Each prompt is individually re-runnable. Show a card per prompt with status (pending / running / done / failed) and output when done. Provide a "Run All" button that batches them (run 2–3 at a time to avoid rate limits).

The 12 prompts:
1. Core idea — one sentence: what is this video actually about?
2. Key value / promise — what does the viewer get from watching?
3. Hook angles — 10–20 framings of this content as compelling entry points
4. Audience hints — who is this video for? implicit and explicit signals
5. Identity / tribal keywords — terms that signal community membership (e.g. BMAD, vibe coding)
6. Audience classification — classify each known audience term as Primary / Secondary / Hidden (see Audience Signals section)
7. Emotional tone — what feeling does this video leave the viewer with?
8. Main topic keywords — 5–10 topic terms for SEO support
9. Key takeaways — 3–5 bullet points a viewer could tweet
10. Questions posed or answered — what questions does this video address?
11. Unique angle — what makes this video different from others on the same topic?
12. Related content signals — what prior or future videos does this content connect to?

All 12 outputs are stored on the LaunchRecord and fed to downstream stages.

State transition: `draft` → `generated` after first successful run.

---

### Stage 3 — Hooks

Display the hook angles from Analysis prompt #3. Each hook is a card with the hook text and an optional hook type label (e.g. "Problem–desire", "Capability demo", "Pain → solution", "Qualifying question", "Scope statement").

User selects 1–3 hooks. Selection is explicit — tap/click to select. Selected hooks are the input to both Stage 4 (Titles) and Stage 5 (Thumbnails).

User can:
- Edit a hook text before selecting
- Regenerate the full set
- Return to Analysis and re-run if the hooks are weak

State transition: first selection → `reviewed`.

---

### Stage 4 — Titles

For each selected hook, generate ~10 title candidates. Group candidates by source hook.

Apply audience signal placement rules (from Analysis prompt #6):
- **Primary** signal: term may appear directly in the title
- **Secondary** signal: do NOT force into title — badge layer only
- **Hidden**: ignore

Show the audience classification table alongside title generation so the user can see why certain terms are or aren't in the titles.

User selects a shortlist (or single final title). Can edit any title manually. Can override audience signal placement per title.

Regenerate re-runs for all selected hooks.

---

### Stage 5 — Thumbnails

Input: the **selected hooks** (not the selected titles).

For each selected hook, generate 1–2 thumbnail concepts. Each concept is a visual direction described in prose (not an image — we are not generating images).

For each concept, generate 1–2 thumbnail text overlay options. Text should:
- Be short (2–5 words)
- Complement the title without repeating it

For Secondary audience signals (from classification): suggest a badge placement (small overlay, e.g. "BMAD" badge in corner). User can accept or reject the badge suggestion.

User selects their preferred concept and text option per hook. Can edit concept descriptions. Can regenerate.

---

### Stage 6 — Description

Input: analysis outputs, selected title, audience classifications, related_videos (if provided at input), brand config.

Generate a structured description as distinct editable slots:

| Slot | Content | Generated? |
|---|---|---|
| synopsis | 2–3 sentence above-the-fold summary, hook-aligned | Yes |
| chapters | YouTube-formatted chapter list (see below) | Yes |
| related_videos | Links to related videos | Yes (from input list) or placeholder |
| affiliates | Affiliate links | Placeholder (from brand config) |
| legal_disclosure | Affiliate/sponsorship boilerplate | From brand config verbatim |
| cta_primary | Primary call to action | From brand config |
| cta_fold | Secondary/fold call to action | From brand config |
| social_links | Platform links | From brand config |

Each slot is independently editable. Individual slots can be regenerated without regenerating the whole description.

**Chapters**: generated from transcript + SRT timing (if srt_content was provided). Format: `0:00 Intro\n1:23 Topic One\n...`. If no SRT, generate from transcript structure with approximate timing.

**YouTube keyword tags**: generate 10–15 keyword tags for the YouTube keywords field (separate from description text). Draw from transcript concepts, core idea, hook angle. These are SEO terms, not identity signals.

---

### Stage 7 — Review / Finalize

Single screen assembling all outputs:
- Selected title
- Thumbnail concept description + text overlay (for the designer)
- Badge suggestions (for Secondary audience signals)
- Full assembled description (all slots in order, copyable as one block)
- Chapter list (copyable)
- YouTube keyword tags (copyable)

Each section has a copy-to-clipboard button. One "Copy All" button for the full description block.

User clicks "Finalize" to mark the record as `finalized`. Can return to any earlier stage — doing so transitions back to `reviewed`.

---

## Input schema

```typescript
interface LaunchInput {
  transcript: string           // required
  srt_content?: string         // optional — for chapter timing
  recording_chapters?: Array<{ label: string; first_words: string }>  // from recording pipeline
  project_code?: string        // e.g. "c27"
  internal_label?: string      // working title, set before recording
  focal_note?: string          // angle hint for this video
  related_videos?: Array<{ title: string; url: string; relevance_hint?: string }>
}
```

---

## Brand config

Loaded once per brand. Single brand in v1. Stored in user settings (Supabase).

```typescript
interface BrandConfig {
  // Identity
  name: string                 // "David Cruwys" / "AppyDave"
  tagline: string
  
  // Social presence
  channels: {
    youtube?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    skool?: string
    website?: string
  }
  
  // CTAs
  primary_cta: { text: string; url: string }
  fold_cta: { text: string; url: string }
  
  // Affiliates
  affiliates: Array<{ name: string; url: string; active: boolean }>
  
  // Legal
  legal_disclosure: string     // boilerplate, reused verbatim in every description
  
  // Audience config
  known_audiences: string[]    // ["BMAD", "AI Agents", "Automation", "Founders"]
}
```

---

## Audience signal model

For each term in `BrandConfig.known_audiences`, classify per transcript:

| Level | Meaning | Placement rule |
|---|---|---|
| **Primary** | This video is primarily about this audience/topic | May drive the title and thumbnail hook directly |
| **Secondary** | Term is present but not the main subject | Suggest a badge on the thumbnail — do NOT force into title |
| **Hidden** | Barely relevant or absent | Ignore — surface nothing |

Example: a video about Claude Code agent teams using tmux, where the team uses BMAD agents but BMAD is not the subject:
- Primary: agent teams, Claude Code, tmux
- Secondary: BMAD → suggest as a small badge on thumbnail
- Hidden: everything else

---

## Entity model

```
LaunchRecord
  id, state, created_at, updated_at
  brand_id (string, v1 = single brand)
  project_code, internal_label
  stale (bool), needs_re_run (bool)
  → has one: Transcript, Analysis
  → has many: HookAngle, Title, ThumbnailConcept, DescriptionSlot, ChapterEntry, KeywordTag, RelatedVideoLink, AudienceSignalClassification, PromptRun

Transcript
  raw_text, srt_content, recording_chapters (JSON), focal_note, related_videos_input (JSON)

Analysis
  prompt_outputs (JSON — keyed by prompt number 1–12)

HookAngle
  text, hook_type?, selected (bool), source: "generated" | "edited"

Title
  text, hook_angle_id (FK), selected (bool), source: "generated" | "edited"

AudienceSignalClassification
  term, strength: "primary" | "secondary" | "hidden", placement: "title" | "badge" | "none"

ThumbnailConcept
  hook_angle_id (FK), description (prose), selected (bool)
  → has many: ThumbnailText

ThumbnailText
  thumbnail_concept_id (FK), text, selected (bool)

BadgeSuggestion
  thumbnail_concept_id (FK), audience_term, accepted (bool)

Description
  launch_record_id (FK)
  → has many: DescriptionSlot

DescriptionSlot
  slot_type: "synopsis" | "chapters" | "related_videos" | "affiliates" | "legal_disclosure" | "cta_primary" | "cta_fold" | "social_links"
  content (text), source: "generated" | "brand_config" | "placeholder" | "edited"

ChapterEntry
  timestamp, title, order

KeywordTag
  text, selected (bool)

RelatedVideoLink
  title, url, relevance_hint?

PromptRun
  prompt_id, stage, inputs_snapshot (JSON), output (text), ran_at
```

---

## LaunchRecord state machine

```
draft → generated → reviewed → finalized
                  ↑           ↓
                  └── (on further edit) ──┘
```

- `draft`: transcript ingested, no generation run
- `generated`: at least one AI stage has run, no human interaction yet
- `reviewed`: user has made at least one selection or edit post-generation
- `finalized`: user marked the launch ready

Orthogonal flags (independent of state):
- `stale`: transcript or a prompt changed since last generation — re-run advisable
- `needs_re_run`: user explicitly flagged a stage for regeneration

---

## Settings page

One-time setup. User fills in BrandConfig fields. Save stores to Supabase `user_settings`. Description stage reads this on generation.

Also allow customising the 12 analysis prompt templates (text only — no structural changes). Keep prompt editing simple: textarea per prompt, save button.

---

## Out of scope for v1

Do not build any of the following:

- Thumbnail image generation (show "image generation coming soon" placeholder)
- Multi-user or sharing
- Multi-brand support
- Cross-video analytics or pattern tracking
- North Star strategy system
- Historical backfill
- Prompt management UI beyond simple textarea editing in Settings
- Publishing to YouTube (produce copy-paste text only)
- Transcription (transcript must be supplied manually)

---

## Key constraints

- Transcript is the only required input — everything else is optional
- Never auto-advance between stages — explicit human gate at every transition
- Hook is ancestor of both titles and thumbnails — never derive thumbnails from titles
- Audience signals are tribal recognition cues, not SEO keywords — never force Secondary signals into titles
- Every launch record persists from transcript submission, regardless of how far the user gets
- Brand config is loaded as static config — it is not per-video data
