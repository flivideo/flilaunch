# YouTube Launch Optimizer Spec v1

## Purpose
This document defines the lean v1 scope for the application.

The application is a **YouTube Launch Optimizer**.
It is not a full insights platform, not a full channel intelligence system, and not a general content operating system.

Its purpose is to help the user go from **transcript to launch-ready packaging** quickly and consistently.

---

## Core Design Principles

These principles shape how the tool behaves at every layer. They sit alongside the North Star as the design spine of v1.

### 1. The tool is an accumulating system, not a stateless processor
Outputs are **signal**, not just product. Selections made in one stage feed later stages (e.g. a selected hook feeds thumbnail generation; an audience classification influences description keyword tags). The tool holds knowledge — it does not just pass data through.

### 2. Every launch is persisted as a structured record
Each launch session produces a record that captures inputs, intermediate outputs, selections, and the prompts that ran. This record serves two purposes:
- **Within-session**: feeding back into subsequent stages during the current launch
- **Across sessions**: preserving substrate that future intelligence layers (not yet built) will read

Persistence is foundational in v1 even though the intelligence layers that read it are not.

### 3. Persistence is not analysis
v1 writes records. v1 does not analyze those records across videos. Cross-video analysis, compliance scoring, frequency tracking, and pattern suggestions are all v2+. This separation keeps v1 shippable while preserving the substrate those layers need.

### 4. Identity signals are tribal cues, surfaced at the right intensity
Audience signals are not SEO keywords. People *recognise themselves* in identity terms. The tool detects when such signals exist (Primary / Secondary / Hidden) and surfaces them at the right intensity (title / badge / ignore). It does not force keywords into content.

### 5. Lightweight by default
When in doubt: prefer a file over a system, a config over a schema, a prompt input over a new feature. Static config that lives in git beats a UI-managed store every time in v1.

### 6. AI suggests, human decides
The tool surfaces options and patterns. It does not make final positioning decisions for the creator. Generation is assisted, selection is explicit.

### 7. Capture broadly, structure narrowly
Ingest widely; don't filter at the door. But only formalize what compounds. Raw discovery input is preserved verbatim in `docs/discovery/`; the spec, audit log, and requirements only capture what demonstrably earns its place. This prevents the "junk drawer" failure mode where broad capture without structure produces noise instead of intelligence.

---

## 1. Product Definition

### Working definition
A lightweight internal tool that takes a video transcript and helps generate the core packaging needed to launch the video.

### Core outputs
- title options
- thumbnail concepts
- thumbnail text options
- description draft (with slots for affiliate links, legal, CTA)
- chapter suggestions
- simple related-video suggestions
- YouTube keyword tag suggestions (for the keywords field)
- persisted launch record (internal — substrate for future tools)

### Primary value
Reduce friction, reduce forgetting, and improve launch decisions.

---

## 2. Scope of v1

### In scope
- transcript input
- structured transcript analysis
- title generation
- title selection
- thumbnail concept generation
- thumbnail text generation
- description generation
- chapter generation
- lightweight related-video suggestion support
- lightweight audience signal suggestions

### Out of scope
- full backfill system
- deep cross-video intelligence
- North Star strategy system
- prompt management UI
- multi-tenant support
- multi-brand support
- analytics dashboards
- advanced historical pattern tracking
- full workflow orchestration engine

---

## 3. Core User Problem
The user currently struggles with:
- forgetting the essence of the video after recording
- losing useful context when creating thumbnails later
- generating titles and thumbnail ideas inconsistently
- missing useful audience signals like BMAD-style identity cues
- assembling descriptions and related links from memory

The tool should solve these problems at launch time.

---

## 4. Core Input

### Required input
- transcript

### Optional inputs
- focal point or angle note
- known audience keyword list
- related video list provided manually

The transcript is the only required input for v1.

---

## 5. Core Workflow

### Step 1: Input
User pastes or uploads transcript.

### Step 2: Analysis
System extracts a compact structured summary of the transcript.

### Step 3: Titles
System generates title candidates.
User reviews and selects the strongest options.

### Step 4: Thumbnails
System generates thumbnail concepts for selected titles.
System may also generate thumbnail text suggestions.

### Step 5: Description
System generates a structured description draft, including chapters and simple related-video suggestions.

### Step 6: Review
User reviews outputs. What they copy or export is for use outside the system — YouTube, social, etc. But the launch record itself persists regardless. Outputs leave the system as *text for consumption elsewhere*; the record stays as *substrate for future runs and future tools*.

---

## 6. Analysis Stage
The analysis stage exists to preserve the essence of the video before packaging work begins.

### Required analysis outputs
- core idea summary
- key value or promise
- 3 to 5 hook angles
- optional audience hints
- optional identity/tribal keyword hints

### Design rule
The analysis should be compact and useful.
It should not become a bloated insights report.

---

## 7. Titles Stage

### Goal
Generate multiple title options from the transcript analysis.

### v1 behavior
- generate 10 title options
- allow user to review and select preferred options
- focus on clarity, curiosity, and packaging strength

### Output
- list of title candidates
- user-selected shortlist

---

## 8. Thumbnails Stage

### Goal
Generate practical thumbnail directions from selected titles and analysis.

### v1 behavior
For each selected title, generate:
- 1 to 2 thumbnail concepts
- optional thumbnail text suggestions

### Thumbnail text rules
- short
- complementary to the title
- not just title repetition
- optional, not mandatory

### Audience-signal rule
If a known audience keyword appears relevant but secondary, the system may suggest a small badge or subtle inclusion.

Example:
- BMAD as a small badge

This should remain lightweight and optional.

---

## 9. Description Stage

### Goal
Generate a usable launch description draft — and the YouTube metadata that sits around it.

### v1 description structure
The description is a **composite artifact** made of distinct slots. Each slot is independently editable.

- **Above-the-fold synopsis** — short, dense, hook-aligned. This is the visible-before-click portion.
- **Chapter list** — generated from transcript timing + analysis.
- **Related-video suggestions** — lightweight (see section 10).
- **Affiliate link slots** — structured placeholders. The tool does not generate affiliate links; it reserves slots so the creator can paste them consistently.
- **Legal / disclosure slots** — structured placeholders for disclaimers, compliance language, sponsorship disclosures. Same pattern as affiliate links.
- **CTA placeholders** — optional slots for subscribe prompts, channel promotion, community links.

### YouTube keyword tags
Distinct from identity signals (see section 11) and from description text. YouTube has a dedicated keywords/tags field on the video settings page.

v1 generates 10–15 keyword tag suggestions for that field, drawing from:
- transcript concepts
- the core idea and hook angle
- identity signals (tribal terms that may also function as search terms)

Keyword tags are a *separate output* from the description text. They populate a different field in the YouTube UI.

### Design rule
Keep the description structured and editable.
Do not overbuild the logic in v1.
Slots (affiliate, legal, CTA) are placeholders — the tool does not try to write them.

---

## 10. Related Video Support

### v1 goal
Help the user stop relying entirely on memory.

### v1 behavior
Related-video suggestions may come from:
- a user-provided list
- simple manual context
- simple future extension hooks

### v1 note
This is not yet a full recommendation engine.
It is lightweight support only.

---

## 11. Audience Signal Support

### v1 goal
Surface useful targeting cues without turning the app into a strategy platform.

### Core principle
Identity signals are **tribal recognition cues**, not SEO keywords. People don't search an identity word — they *recognise themselves* in it. The tool should detect when identity signals exist and surface them at the right intensity, not fit keywords into content.

### Static audience config (v1)
The app carries a small, hardcoded list of known audience/identity terms for the channel.

Example:
```
audiences: ["BMAD", "AI Agents", "Automation", "Founders"]
```

This is **config, not memory** — no history, no tracking, no evolution. Persistent audience memory and cross-video pattern tracking are explicitly deferred (see `docs/requirements/`).

### Intensity classification
For each transcript, the system classifies each known audience term into one of three levels:

| Level | Meaning | Placement rule |
|-------|---------|----------------|
| **Primary** | The audience term is the core topic of the video | May drive the title and thumbnail hook directly |
| **Secondary** | The term is present but not the main subject | Suggest a badge, subtle visual cue, or secondary keyword — do not force into title |
| **Hidden** | Barely relevant or absent | Ignore — do not surface |

### Example
The creator records a video about Claude Code agent teams using tmux. The team is made up of BMAD agents, but BMAD is not the subject.

- Primary: agent teams, Claude Code, tmux
- Secondary: BMAD → surface as a small badge on the thumbnail
- Hidden: any audience term not present

### Design rules
- This should improve packaging decisions, not dominate them.
- Do not force Secondary signals into titles — their placement is the badge/subtle layer.
- Do not invent relevance. If no known audience applies, surface nothing.

---

## 12. User Interface Direction

### v1 UI principle
The UI should be simple and focused on getting from transcript to launch assets fast.

### Likely areas
- Input
- Analysis
- Titles
- Thumbnails
- Description
- Final review

### Important note
These do not need to map one-to-one to separate pages.
The workflow is important, but the final UX can be tabbed, panel-based, or otherwise optimized.

---

## 13. Prompt Usage
Prompting is important to the system, but v1 does not require a full prompt management product area.

### v1 rule
Prompts may exist internally and evolve during development, but prompt management UI is out of scope.

This can be added later.

---

## 14. Data and Memory

### v1 approach
The tool is an accumulating system (see Core Design Principles). Two kinds of state exist in v1:

1. **Persistent launch records** — every launch session is saved as a structured record. This is foundational, not optional. See section 14a.
2. **Lightweight config** — static files used as prompt inputs. See section 14b.

What v1 does NOT do: read past launch records to influence new launches, run analytics on the record store, or build dashboards over it. That's the v2+ intelligence layer.

### 14a. Persistent launch records
Each launch session creates a record containing:
- transcript, analysis, generated hooks (with categories), generated titles, thumbnail concepts, thumbnail text options
- user selections at each stage (selected hooks, titles, thumbnails)
- audience classifications (primary/secondary/hidden) per known audience term
- final description draft with all slots
- YouTube keyword tag suggestions
- the prompts that were run and the variables passed to them
- brand identifier (single brand in v1, field present for forward compatibility)
- **internal label** (short human-readable name set at project inception, often BEFORE recording — a best-guess of project content used as seed context for prompts. Distinct from the published YouTube title. Creator-defined format; FliLaunch does not enforce one.)
- optional **project code** (short cross-reference code — e.g. a structured alphanumeric like "c15" for users with coding systems, or free-form. Typically locked at project inception.)
- session metadata (timestamps, session ID)
- **state** (see state model below)

### Launch record state model
Each record carries a `state` field reflecting its lifecycle position:

- `draft` — transcript ingested, no generation run yet
- `generated` — all stages produced initial outputs, no human review yet
- `reviewed` — user has begun making selections post-generation
- `finalized` — user considers the launch ready for external use

Two optional flags (orthogonal to state):
- `stale` — transcript or a prompt changed since last generation; re-run advisable
- `needs_re_run` — user explicitly marked a stage for regeneration

### State transition rules
- `draft` → `generated` — automatic after generation runs
- `generated` → `reviewed` — on first user interaction post-generation
- `reviewed` → `finalized` — on user action
- `finalized` → `reviewed` — on further edits
- Any state + `stale` / `needs_re_run` flag — orthogonal, doesn't change the base state

### What's NOT in the v1 state model
Deliberately excluded:
- `published` — FliLaunch is a launch optimizer, not a publishing tracker. YouTube owns published-state.
- `approved` — redundant with `finalized` for single-user v1.
- Per-stage state machines (each stage having its own draft/generated/reviewed/selected) — stage-level selection is captured in record fields, not in the state machine. Keep it simple.

**Design rule**: the schema must be rich enough to feed v2+ intelligence layers without migration. Persistence is the foothold; analysis comes later.

**Backfill compatibility rule**: An external backfill tool is being built that will produce transcripts, timings, thumbnails, and metadata across David's three brands. The v1 persistence schema should be compatible with that tool's output format — no migration, no transformation layer. The schema is NOT finalized until the backfill tool's output is observed. Stay flexible until real data is in hand.

### 14b. Allowed lightweight config
- small **static** list of known audience terms (config, not evolving memory)
- small list of related videos
- concept docs (style guide, content pillars, audience definition) as files that prompts can load
- reusable prompt templates

### Not allowed in v1
- reading past launch records during a new launch
- cross-video stats or dashboards
- advanced concept tracking across launches
- compliance scoring against North Stars
- multi-brand data routing
- persistent strategic intelligence systems

The distinction is: **v1 writes the record, v1 does not yet read the record across videos.**

---

## 15. Success Criteria
The application is successful if it helps the user:
- move faster from transcript to publish-ready packaging
- stop forgetting key video angles
- generate better titles more consistently
- create better thumbnail directions with less friction
- produce usable descriptions faster

---

## 16. Constraints

### Constraint 1
Do not let the product expand into a full insights platform in v1.

### Constraint 2
Do not build infrastructure that is not directly needed for transcript-to-launch workflow.

### Constraint 3
Do not overcomplicate audience signals, related videos, or memory.

### Constraint 4
Keep the transcript as the primary source of truth.

---

## 17. Future Extensions (Not v1)
These may matter later, but they are explicitly outside the current build scope:
- historical backfill
- prompt management UI
- multi-brand support
- North Star alignment
- deeper related-video graphing
- cross-video pattern tracking
- strategic analytics
- document system

---

## 18. Working Summary
This application is a lean internal **YouTube Launch Optimizer**.

It should:
- accept a transcript
- preserve the essence of the video
- generate titles, thumbnail concepts, thumbnail text, chapters, and description drafts
- lightly support audience cues and related-video suggestions
- help the user package and launch faster

It should not become a broad intelligence or analytics platform in v1.
