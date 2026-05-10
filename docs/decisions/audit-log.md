# FliLaunch Decisions Audit Log

Captures decisions made during development — both kept and discarded — with rationale.
Read this before proposing changes that might reverse something already resolved.

Format: `## [date] Decision title` → **Outcome**: kept / discarded / deferred → **Why**

---

## 2026-04-23 Scope: v1 is a launch optimizer only

**Outcome**: Kept  
**Why**: The original ChatGPT conversation drifted toward a full channel intelligence platform, analytics dashboards, and North Star strategy systems. The spec explicitly pulls back to: transcript in → packaging out. This boundary exists to prevent the tool from becoming too large to ship.

---

## 2026-04-23 Transcript is the only required input

**Outcome**: Kept  
**Why**: Optional inputs (focal point note, audience keyword list, related video list) are supported but not required. Forcing more inputs creates friction at the exact moment the tool should reduce it.

---

## 2026-04-23 Prompt management UI is out of scope for v1

**Outcome**: Deferred to v2+  
**Why**: Prompts exist internally and will evolve during development, but building a UI to manage them adds complexity without directly improving the launch workflow. Can be added once core stages are stable.

### Design notes for the v2+ implementation (from raw-3.txt)
When this layer is built, it should include:
- **Central management** — all prompts in one place, browsable and editable
- **Local access from usage site** — from any stage in the app, open a modal showing the prompt used to produce the current output, with variables inspected and optionally interpolated
- **Variable/input visibility** — each prompt declares its input variables; modal shows current values
- **Output schema visibility** — each prompt declares its expected output structure (machine-readable, so downstream code can bind reliably)
- **Versioning** — prompt edits are history-preserving, not destructive
- **"Prompt fix" vs "app structure fix" split** — improvement suggestions come in two flavors:
  - *Prompt change* — reword the prompt; easy, self-contained, no app changes
  - *Structural change* — input or output shape changes; requires a coordinated app edit (this should generate a meta-prompt or coding-agent brief, not silently modify the prompt)
- **Improvement feedback loop** — when David disagrees with output, capture his opinion + show suggested prompt diffs; route structural changes to the coding agent path

This depth is preserved here so the v2+ build doesn't have to rediscover it.

---

## 2026-04-23 Audience signals stay lightweight

**Outcome**: Kept  
**Why**: The tool should surface useful targeting cues (e.g. BMAD badge on thumbnail) without becoming a strategy platform. Depth here risks scope creep into North Star territory.

---

## 2026-04-23 No multi-tenant / multi-brand support in v1

**Outcome**: Deferred to v2+  
**Why**: Single-user internal tool for now. Adding multi-tenant complicates auth, data isolation, and UI. Not needed to validate the core workflow.

---

## 2026-04-23 Tech stack: Baku (template-locked, tool decides)

**Outcome**: Kept — but not a decision we make  
**Why**: FliLaunch is built in Baku, a Lovable/Replit-style tool where the base stack is fixed. React 18 + Vite + shadcn/ui + Tailwind + Bun + optional Supabase. Cannot swap Vite or shadcn/ui. No server layer — use Supabase Realtime for real-time features. The ChatGPT session zip (b-youtube-launch-optimizer.zip) happened to align with this stack but was generated independently — do not treat it as authoritative for implementation details.

---

## 2026-04-23 Thumbnail derives from the hook, not from the title

**Outcome**: Kept — important pipeline correction  
**Why**: raw-1.txt makes clear that title and thumbnail should both be generated from the same hook angle, not thumbnail from title. If thumbnail is derived from title you get redundancy and weaker CTR. The spec currently says "for each selected title, generate thumbnail concepts" — this is a spec gap to address. The hook is the common ancestor of both.

---

## 2026-04-23 Hooks are an intermediate step between analysis and titles

**Outcome**: Kept — refines the pipeline  
**Why**: The correct order is Analysis → Hooks (10–20 angle options) → Titles (convert best hooks) → Thumbnails (from same hooks). The spec has "hook angles" as an analysis output but doesn't make hooks a distinct generation step. Worth preserving this distinction in prompt design even if UI collapses it visually.

---

## 2026-04-23 Audience signals = identity triggers, not SEO keywords

**Outcome**: Kept — sharpens how audience signals work  
**Why**: raw-1.txt frames this well: people don't just search identity keywords, they *recognise themselves* in them. BMAD on a thumbnail isn't SEO — it's a tribal signal. Four valid placement options: title (strongest targeting), thumbnail text (balanced), visual badge (subtle, underrated), description (weakest). This validates the spec's "small badge" approach and gives it more depth.

---

## 2026-04-23 Broad vs Targeted audience strategy toggle

**Outcome**: Deferred to v2+ (or late v1 if lightweight)  
**Why**: raw-1.txt suggests a decision toggle — Broad CTR vs Targeted CTR — that changes how identity keywords are injected. Valid idea but adds a decision layer that may complicate the v1 UI. Captured in requirements for now.

---

## 2026-04-23 Docs structure: separate folders by type

**Outcome**: Kept  
**Why**: The original ChatGPT conversation was one long continuous document. Separating concerns (spec, north star, decisions, requirements, discovery, prompts) makes individual files findable and prevents drift into a monolith doc again.

---

## 2026-04-23 Channel Brain intelligence layer — rejected for v1 (persistence accepted)

**Outcome**: Split — persistence accepted for v1, intelligence layer deferred to v2+  
**Why**: raw-2.txt and raw-3.txt together push toward a persistent audience memory + cross-video reasoning system. After discussion, the split became clear: **persistence is v1, analysis over persistence is v2+**. Every launch is persisted as a structured record (see the "Every launch persisted as structured record" decision below). The intelligence layer that reads that record to suggest signals based on historical baseline, flag drift, or detect patterns across videos is deferred. The lightweight static subset (hardcoded audience config) *is* in v1 and directly solves the motivating BMAD-badge problem. See `docs/requirements/channel-brain-audience-memory.md`.

---

## 2026-04-23 Static audience config — kept for v1

**Outcome**: Kept  
**Why**: A tiny static list of known audience terms (e.g. BMAD, AI Agents, Automation, Founders) that the classifier checks against each transcript. This is *config*, not *memory* — no history, no tracking, no evolution — so it stays inside the "audience signals stay lightweight" boundary. Directly solves the motivating problem from raw-2: the BMAD-badge on the agent-teams video that should have been surfaced automatically but wasn't.

---

## 2026-04-23 Audience signal intensity levels: Primary / Secondary / Hidden

**Outcome**: Kept  
**Why**: raw-2.txt introduces a three-tier intensity model for identity signals with placement rules — Primary drives the title, Secondary drives a badge or subtle inclusion, Hidden is ignored. This sharpens the existing "audience signals = identity triggers, not SEO keywords" decision by giving it a semantic model for *intensity* and *placement*. Added to the spec (section 11) so placement rules are testable rather than leaking into prompt design ad hoc.

---

## 2026-04-23 Cross-video pattern tracking — rejected for v1

**Outcome**: Rejected for v1, deferred to v2+  
**Why**: raw-2.txt proposes tracking frequency ("BMAD in 40% of videos"), performance ("BMAD-tagged videos have higher retention"), and pattern suggestions ("haven't used BMAD in 5 videos"). This is analytics + strategy + historical backfill — all explicitly out of scope for v1. Also depends on Channel Brain (also deferred). See `docs/requirements/cross-video-pattern-tracking.md`.

---

## 2026-04-23 Content OS drift rejected — v1 stays a launch optimizer

**Outcome**: Rejected (scope drift)  
**Why**: raw-3.txt explicitly reframes the project as a "content operating system" with six layers (workflow, prompt, knowledge/doc, channel memory, strategy, brand) and declares the backfill tool "mandatory." It calls out that this is no longer a "video helper." This is exactly the drift the North Star was created to prevent.

Rejected for v1 as a batched set (one entry rather than spamming ten). What's rejected:
- Channel Brain as a first-class *intelligence* system (persistence is still in v1 — see separate decision)
- Multi-tenant and multi-brand orchestration
- Prompt management UI as a native, central system
- Historical video backfill across all brands
- North Star compliance scoring and versioned strategy windows
- Cross-video concept taxonomy as a system feature
- Phased implementation plan (Phase 1–4) as a roadmap

What's **not** rejected (clarifying the boundary):
- **Persistence** of every launch as a structured record — accepted in v1 (see below)
- **Within-session feedback** where outputs feed subsequent stages — accepted as a design principle
- **Lightweight concept docs as prompt inputs** — accepted in v1 as files
- **Static audience config** — already accepted

Key distinction: the rejected layer is **analysis tooling over accumulated data**. The accepted layer is **record-keeping that seeds future intelligence without building it now**. Each v2+ idea has its own requirements file preserving the design thinking.

---

## 2026-04-23 Every launch persisted as structured record

**Outcome**: Kept — v1 foundational decision  
**Why**: The tool is not a stateless processor. Even in v1 it accumulates a record of every launch, and that record serves two purposes: (1) within-session feedback (e.g. selected hook informs thumbnail generation) and (2) preservation for future intelligence layers not yet built.

### Working shape of a persisted launch record (v1)
- `transcript` — the raw input
- `analysis` — core idea, hooks generated (with type category where known), audience hints
- `hooks` — all generated hook angles with categories, plus the selected subset
- `titles` — all generated title candidates, plus user-selected shortlist
- `thumbnails` — all generated thumbnail concepts, thumbnail text options, plus user-selected subset
- `audience_classifications` — each known audience term classified as primary / secondary / hidden, with the term's placement decision (title / badge / none)
- `description` — the final description draft, chapters, related-video selections, keyword tags
- `prompts_run` — which prompts produced which outputs, with variables used
- `brand` — brand identifier (single brand in v1, but the field exists for forward compatibility)
- `launched_at` — timestamp
- `session_id` — groups outputs produced in one launch session

### Design rule
Persistence schema should be rich enough to support future cross-video analysis without requiring a data migration. Adding new computed layers on top should be additive. This is the foothold that makes Channel Brain / cross-video pattern tracking possible later.

### What persistence does *not* do in v1
- No reading of past launches during a new launch (that's the v2+ intelligence layer)
- No cross-video stats or dashboards
- No compliance scoring
- No suggestions based on historical baseline
- Just: write the record, keep the record, trust that future tools will read it

---

## 2026-04-23 Lightweight concept docs folder — kept for v1

**Outcome**: Kept  
**Why**: raw-3.txt proposes a full "document concept library" system. The *system* (UI, versioning beyond git, per-brand routing) is v2+. But a **filesystem folder of focused, reusable concept docs that prompts can load as inputs** is already the project's pattern (spec, north-star, audit log are exactly this). Making it explicit for user-authored content (brand style guide, content pillars, audience definitions) is a lightweight v1 addition.

v1 includes:
- a folder for concept docs that prompts can reference (e.g. `docs/concepts/` or similar)
- no UI — docs are edited as files
- no per-brand namespacing (v1 is single-brand)
- no in-app version history (git is the history)

The UI/management layer is captured in `docs/requirements/document-concept-library.md`.

---

## 2026-04-23 Hook type categories — prompt design pattern

**Outcome**: Kept  
**Why**: raw-3.txt introduces a taxonomy of hook types — categories like "X vs Y," "Only 1 worked," "I tried X," "This changed everything." This is not a system architecture decision — it's a **prompt-design pattern** for the hooks generation stage.

### How this gets used
When the hooks prompt is written, it should:
- generate hooks across multiple type categories rather than variations of one angle
- tag each hook with its category
- let the taxonomy evolve over time in the prompt file, not in the spec

### Why not in the spec
Hook categories are implementation detail of one prompt. Putting them in the spec would couple the architecture to a specific creative framework. The spec stays about *what* hooks are (distinct generation step per decision above); the prompt file owns *how* they get generated and what categories exist.

### Where this lives
Eventually in `docs/prompts/hooks.md` when that file is written. Captured here so the insight isn't lost before then.

---

## 2026-04-23 raw-4-spec-v1 preserved as v2+ blueprint, rejected as v1 pivot

**Outcome**: Rejected as v1 path; preserved as v2+ architecture reference  
**Why**: ChatGPT produced a full "System Architecture Spec v1" (`docs/discovery/raw-4-spec-v1.txt`) proposing a six-layer content operating system with 10 entities, 6 flows, a concept taxonomy, and a keyword model. This is exactly the content-OS drift we rejected in the previous audit entry — but more thoroughly assembled than any prior discovery input.

### Rejection rationale (as v1)
Adopting this architecture for v1 would blow up the lean launch optimizer scope. The layered model, entity graph, and cross-video flows are all v2+ territory. v1 stays: transcript in → packaging out, with persistence as the foothold.

### Preservation rationale (as v2+)
The assembled architecture is **genuinely useful as a v2+ reference**. It takes the scattered v2+ requirements files (channel brain, multi-tenant, prompt management, related-videos, concept taxonomy, keyword model, tenant/brand/user model) and assembles them into a coherent layered model. When v2 begins, this is the starting point.

### Where it lives
`docs/future/architecture-spec-v2.md` — with a header marking it as future-state, not v1. All v2+ requirements files cross-reference it.

### Explicit non-decision
We are NOT committing to this architecture for v2. We are preserving it as a reference that future-us will evaluate when v1 is shipped and real data informs the next phase. The "flexible before backfill" principle in raw-4 applies to this document too.

---

## 2026-04-23 External backfill tool being built — v1 persistence schema anticipates its output

**Outcome**: Project context — informs v1 persistence schema design  
**Why**: David flagged in raw-4 that an external backfill tool is being built today (not part of FliLaunch) that will process all three brands (AppyDave, AITLDR, Clauding Lab) and produce at minimum:
- transcripts
- transcript timings
- possibly single thumbnails
- some metadata

### How this shapes v1
The v1 launch record schema should be compatible with this tool's output format. When the backfill tool finishes, its data should be loadable into the same persistence layer that v1 launches use — no schema migration, no transformation layer.

### Design rule
v1 persistence schema is NOT finalized until the backfill tool's output format is observed. Structural decisions (field names, nesting, timing representation) should stay flexible until we see real data from the tool. This aligns with raw-4's "flexible before backfill" principle.

### What to do concretely
- Draft the v1 launch record schema with provisional field names
- Mark schema as "pre-backfill" until the external tool produces sample data
- When the tool finishes, compare its output shape and adjust v1 schema for compatibility
- Only then lock the schema for v1 development

### Caveat
David noted: "this is only three brands and doesn't represent everyone in the world." The schema should not be over-fit to his three channels. It should be general enough to accept any YouTube channel's backfill output.

---

## 2026-04-23 "Capture broadly, structure narrowly" adopted as core principle

**Outcome**: Kept — promoted to spec Core Design Principles  
**Why**: raw-4's ChatGPT response offered this as a pushback against "capture as much as possible" thinking. The principle:
- ingest broadly — don't filter input at the door
- structure narrowly — only formalize what compounds over time

This prevents the "junk drawer" failure mode (raw-2's warning) where broad capture without structure produces noise instead of intelligence.

The principle also applies to methodology itself: the discovery folder captures broadly (every raw-N.txt is preserved), while the spec/audit/requirements structure narrowly (only what compounds ends up there).

Added to spec section "Core Design Principles" as principle 7.

---

## 2026-04-23 Prompt management eventual home: agent-workflow-builder app

**Outcome**: Refines existing "Prompt management UI deferred to v2+" entry  
**Why**: raw-4 clarifies that David already has prior work on prompt management in other systems, and the **eventual home for a full prompt management app is the agent-workflow-builder project** — not FliLaunch.

### Implication for FliLaunch
FliLaunch's v2+ prompt management layer should be designed to eventually **integrate with or migrate to** the agent-workflow-builder's prompt system, not duplicate it.

For v1: prompts live as files in `docs/prompts/`. This is consistent with the eventual agent-workflow-builder path — prompts-as-files is portable across apps.

### Design rule
When FliLaunch eventually needs programmatic prompt access, prefer a file-based or lightweight API approach over building a heavy prompt database that would later need to be migrated or discarded.

---

## 2026-04-23 Content DNA terminology — rejected

**Outcome**: Rejected (terminology change without substance)  
**Why**: raw-4's ChatGPT response used "Content DNA" as a synonym for the analysis stage ("Transcript → Content DNA"). David lightly affirmed the term ("we need a well-defined content DNA layer"). But renaming "analysis" to "Content DNA" adds no semantic value and introduces churn — every doc, prompt, and decision would need to catch up.

Keep the existing term: **analysis stage**. If someday a distinct concept emerges that deserves its own term (e.g. a specific structured extraction format), that concept can be named on its own merits — not as a rebrand.

---

## 2026-04-23 Six-artifact waterfall methodology stack — rejected

**Outcome**: Rejected (methodology scope drift)  
**Why**: raw-5.txt and raw-5-some-doc.txt together propose a sequential 6-artifact stack:
1. Architecture Spec
2. Workflow + State Spec
3. Semantic Model
4. Requirements Spec
5. UI Planning
6. Mock UI

ChatGPT framed this as the correct order ("will save you a lot of wasted redesign") and claimed that **only the Architecture Spec is ready for the repo** — everything else is transitional.

### Why this is rejected

This is a traditional waterfall artifact discipline wearing AI-era clothing. It:
- **Maps poorly onto our discovery-filter method** — we don't do sequential artifact phases; we process raw discovery through a filter into multiple parallel artifacts
- **Treats the spec as transitional** — our method treats the v1 spec as the canonical definition of what gets built, not a "sketch before requirements are written"
- **Uses "Requirements Spec" in the PRD sense** — features, capabilities, acceptance criteria as a single document. Our method has per-deferred-idea requirements files, which serve a different purpose
- **Inflates the artifact count** — we already cover Workflow (spec section 5), Entity/Schema (spec section 14a + requirements/tenant-brand-user-model), UI planning (David's separate system). Creating 4 new spec types duplicates what exists

### What's rejected concretely
- No "Workflow + State Spec v1" as a separate document — states get added inline to v1 spec section 14a (see separate decision)
- No "Semantic Model v1" as a standalone spec — schemas live in code types or `docs/schemas/` when they stabilize (post-backfill)
- No "Requirements Spec v1" in the PRD sense — our `requirements/` folder captures deferred ideas, not buildable acceptance criteria
- No "UI Planning Spec" in this repo — David does mockups in a separate system

### What's accepted (the one tidbit)
A **state model for launch records** is a real v1 gap. Extracting this as a minimal spec addition — see next decision.

### Meta-observation
ChatGPT's methodology drift mirrors its earlier scope drift (content-OS architecture). In both cases, the AI proposes *more structure* when pushed for clarity, rather than working within the existing lean method. The discovery filter caught the scope drift; the same filter catches this methodology drift. **Note for future discovery processing**: when an AI proposes a new spec artifact type, check whether it collapses into existing artifacts before creating a new type.

---

## 2026-04-23 Workflow doc + Semantic Model accepted as supporting artifacts

**Outcome**: Kept — two derivative documents added, but NOT a return to the 6-artifact waterfall  
**Why**: Revision of the earlier waterfall rejection. David's concrete downstream tools (Claude Design for UX; mockaccino-style machine-readable JSON for mockup generation) make two of the five ChatGPT-proposed artifacts genuinely useful:

- **Workflow doc** (`docs/workflows/launch-workflow.md`) — stage-by-stage description with states, revisions, dependencies, decisions. Extracted from spec sections 5–10 + 14a for UX handoff to Claude Design.
- **Semantic Model** (`docs/semantic/semantic-model.json` + `.md`) — machine-readable entity/attribute/relationship/state/event model. Feeds both mockup generation and eventual schema.

### What's still rejected
- Architecture Spec as separate v1 doc (spec v1 covers v1 arch; `future/architecture-spec-v2.md` covers v2+ arch)
- Requirements Spec in PRD sense (v1 spec IS this; `requirements/` is deferred-idea archive)
- UI Planning Spec in this repo (Claude Design owns UX)

### Why these two passed the filter
1. They have concrete downstream consumers already in David's workflow (Claude Design, mockaccino)
2. They're derivatives of existing artifacts (extracts from spec + workflow + state), not new sources of truth
3. They don't introduce new scope — they reformat what already exists for machine / UX consumption

### Why this isn't waterfall creep
The waterfall framing was: "do these in this order, each blocks the next." The accepted framing is: "these are useful derivatives; build them when the downstream consumer needs them." The spec remains authoritative. If spec changes, these regenerate.

### Methodology doc updated
`brains/brand-dave/methodology/project-bootstrap-method.md` — folder layout now includes `workflows/` and `semantic/` as optional derivative folders (not required for every project).

---

## 2026-04-23 AWB historical data — internal label adopted, rest deferred

**Outcome**: Split — one field adopted, extraction work deferred  
**Why**: Analysis of 10 AWB `awb.json` / `.awb.json` files from prior video projects (see `docs/reference-data/awb-historical-data.md`) surfaced several candidate findings. David's call: don't go deep into manual extraction now — audience seed list, hook taxonomy, and brandConfig content extraction belong to a future tool that scans all prior videos in one pass (already captured in `docs/requirements/historical-video-backfill.md`).

### Adopted in v1
- `LaunchRecord.internal_label` — short human-readable name distinct from published title (inspired by AWB's `projectInfo.shortTitle`). Added to spec section 14a and semantic model.
- `LaunchRecord.project_code` — optional cross-reference code (inspired by AWB's `projectInfo.projectCode`). Added to spec section 14a and semantic model.

### Deferred (do not extract manually now)
- **Audience seed list** — the 8 implicit tribes surfaced in the analysis are preserved in the reference doc but NOT populated into `AudienceConfig.audiences[]`. Reason: populating partially from this one analysis would create a divergent source of truth with the future cross-video extraction tool.
- **Hook type taxonomy** — the 6 observed patterns are preserved in the reference doc but NOT locked into the hooks prompt or semantic model. Reason: taxonomy should emerge from broader corpus analysis, not from 6 real runs.
- **brandConfig content extraction** — the *shape* (CTA slots, affiliates, legal, related-videos slot) is already reflected in `DescriptionSlot.slot_type`. The *content* (actual CTAs, actual affiliates, actual legal text) is a per-brand setup concern — set once per brand, not backfilled from old AWB runs.

### Rationale for deferral
David flagged that partial manual extraction now is anti-productive. The cross-video tooling is already a captured v2+ requirement; doing the work twice (manually now + automatically later) creates drift. The reference doc preserves the findings so future-us doesn't re-analyze the same files.

---

## 2026-04-23 State model for launch records — accepted

**Outcome**: Kept — minimal state field added to spec section 14a  
**Why**: raw-5 flagged that persisted launch records don't define **state transitions**. The record has shape (fields) but not lifecycle (where it is in its journey). For UI planning this is a real gap — without states, review/revise/finalize flows can't be designed cleanly.

### The v1 state model
Every launch record carries a `state` field with one of these values:

- `draft` — created but no generation has run yet (transcript ingested, nothing generated)
- `generated` — all stages produced initial outputs, no human review yet
- `reviewed` — user has opened the record post-generation and begun making selections
- `finalized` — user has completed selections across all stages and considers the launch ready to use externally

Two optional flags (independent of state):
- `stale` — the transcript or a prompt has changed since last generation; re-run may be appropriate
- `needs_re_run` — user has explicitly marked a stage for regeneration

### What's deliberately NOT in v1
raw-5 proposed a longer state list including `selected`, `approved`, `published`. These conflate:
- stage-level state (which hooks/titles/thumbnails the user selected)
- record-level state (where is this launch overall)
- external outcome state (was it actually published on YouTube)

v1 stays simple: the four record-level states above, plus two optional flags. Stage-level selection is captured in the record fields themselves, not in the state machine. YouTube-published state is tracked externally (YouTube itself), not by FliLaunch — it's a launch optimizer, not a publishing tracker.

### State transition rules
- `draft` → `generated` (automatic after generation runs)
- `generated` → `reviewed` (on first user interaction post-generation)
- `reviewed` → `finalized` (on user action)
- `finalized` → `reviewed` (on further edits)
- Any state → same state with `stale` or `needs_re_run` flag (orthogonal)

Keep it this simple until real usage reveals gaps.

---

## 2026-04-30 ALS session file naming — manual rename was architecturally wrong

**Outcome**: Documented as V2 gap — do not change current file  
**Why**: During the first live session run, the session file was created as `b65-20260430-001.md` by the orchestrator and later renamed manually (in conversation) to `001-b65-guy-monroe-marketing-plan.md`. This manual rename violated ALS conventions. File names for ALS session records should be generated and managed by the ALS system itself (via hooks, naming conventions enforced at create time, or programming-language-level generation) — not changed ad hoc during a conversation.

### V2 implication
ALS should enforce the naming convention at creation time. The `id` field in frontmatter and the filename should be co-generated by the same ALS hook, preventing divergence. The operator should never need to rename a session file manually.

### What to do now
Do not change the current filename. Leave `001-b65-guy-monroe-marketing-plan.md` as-is. Document the correct convention in the module so V2 implements it properly.

---

## 2026-04-30 Hooks presentation — top-4 ordered with AI recommendation first

**Outcome**: V2 recommendation — deferred  
**Why**: During the first operator gate (awaiting-hook-selection), the operator was presented with 15 hooks cold. This is cognitively overwhelming — no signal about which are strongest, no shortlist, no recommendation. The operator had to read all 15 to make a call.

### V2 recommendation
Change the hooks generation output to present a **ranked shortlist of 4**, with the AI's informed recommendation at position 1. The full list (10–20 hooks) is still generated internally and stored, but the operator gate presents the shortlist first. The operator can request the full list if they want more options.

This reduces cognitive load without removing operator agency. The "my take" pattern (orchestrator's informed recommendation) is the right framing: not overriding the operator, but giving them a signal to react to.

### Not a change to the current generation agent
`generating-hooks.md` generates 10–20 hooks correctly. The change is in how the output is presented at the operator gate — a V2 structural change to the `awaiting-hook-selection` state.

---

## 2026-04-30 FliHub API agent gap — fetching-transcript needs tool code, not just an agent file

**Outcome**: Documented as V2 gap  
**Why**: The `fetching-transcript.md` agent file documents the intent to fetch transcript data from FliHub (the video project hub at `localhost:5101`), but it contains only instructions — no actual tool code for making the API call. A regular skill would include both an agent file and executable tool code. As a result, the agent cannot actually call FliHub; it can only describe how to.

In the first live session, this meant the transcript had to be loaded from the filesystem directly, bypassing the intended API path. This is a stopgap that works but breaks the FliHub integration design.

### V2 implementation note
When implementing the tool code, read the current FliHub skill (`/Users/davidcruwys/dev/ad/flivideo/flilaunch/.als/modules/fli-launch/v1/skills/fli-launch-manage/SKILL.md` and the FliHub app itself) to extract the API contract and technique. The tool should call:
- `GET /api/projects/stats` to resolve a short code (e.g. `b65`) to its full slug
- `GET /api/projects/{full_slug}/transcript-text` (endpoint needs to be built in FliHub — currently missing)

The FliHub API gap (`transcript-text` endpoint) is a separate gap to file with the FliHub project.

---

## 2026-04-30 Hooks operator gate — show ranked top 4 first, full list below

**Outcome**: V2 recommendation — confirmed by live session observation  
**Why**: Generating 15 hooks is the right call — variety and coverage matter. The problem is presentation: the operator has to wade through all 15 cold to make a selection. After live use, David confirmed he likes having 15 but doesn't want to read 15 before he knows which ones matter.

### V2 approach
At the `awaiting-hook-selection` gate, present:
1. A ranked shortlist of 4, with the AI's top recommendation clearly marked (#1)
2. The full list of 15 below, collapsed or clearly separated

The operator reacts to the shortlist first. If they want to dig into the full list, it's there. This removes the cognitive load without removing the depth. The "my take" pattern applies: the AI picks #1 with a one-line rationale, the operator confirms or overrides.

Generation doesn't change — only the gate presentation changes.

---

## 2026-04-30 EXPORT should be a standalone handoff document, not a section in the session record

**Outcome**: V2 recommendation  
**Why**: The EXPORT section currently lives inside the session record alongside INPUTS, ANALYSIS, HOOKS, etc. That's fine for the operator, but the export is what gets handed off to other people — a thumbnail designer, a video editor, a publisher. Handing them the full session record gives them too much context and the wrong format.

### V2 approach
On `assembling-output`, write the EXPORT content to a separate file alongside the session record — e.g. `fli-launch/sessions/001-b65-guy-monroe-marketing-plan--export.md` (or a `exports/` subfolder). The session record retains an EXPORT section with a pointer to the file. The export file is clean, self-contained, and safe to share externally with no session internals exposed.

---

## 2026-04-30 Chapter placeholder in DESCRIPTION never gets automatically replaced — V2 bug

**Outcome**: V2 bug — document and defer  
**Why**: The generating-content agent writes the description with `[CHAPTERS — populated after chapters sub-Delamain completes]` as a placeholder, because chapters haven't run yet at that point. But nothing in the current delamain wires up the replacement: when chapters complete and `awaiting-chapter-review` advances, no agent reads the completed CHAPTERS section and patches the DESCRIPTION placeholder.

The result is a description that always reaches `assembling-output` with a stale placeholder unless the orchestrator manually swaps it. That's a silent failure — easy to miss, easy to publish with broken chapter links.

### V2 fix
The `assembling-output` agent (or a `refining-chapters` step) should explicitly: read CHAPTERS, find the placeholder in DESCRIPTION, replace it with the formatted chapter list. This should be automatic and verified before advancing to `completed`. The assembling-output agent is the right place — it already owns the "pull everything together" responsibility.

---

## 2026-04-30 FliHub INPUTS spec — fetching-transcript should pull 5 fields, not just transcript

**Outcome**: V2 gap — document and defer  
**Why**: The current fetching-transcript agent only retrieves transcript text. FliHub already has richer project data available, and the chapter generation stage demonstrated the gap: without SRT timings, chapter timestamps have to be estimated rather than precise.

### The five fields FliHub can provide

1. **project_code** — the full slug (e.g. `b65-guy-monroe-marketing-plan`)
2. **project_shortcode** — the short code (e.g. `b65`)
3. **label** — a human-readable label already computed by FliHub; no need to derive it in the session record
4. **transcript** — clean prose transcript; primary input for analysis, title/hook generation
5. **SRT** — segment-level timestamps; needed for chapter generation, but NOT loaded into context during analysis (it muddies the window)

### Design rule for SRT handling
SRT should be stored in INPUTS but only read by the generating-chapters agent. All other agents (running-analysis, generating-hooks, generating-content) read transcript only. This keeps the analysis context clean while making timing data available when it matters.

### V2 implementation note
When the fetching-transcript tool code is written (see earlier gap entry), extend it to fetch all five fields in one API call and write SRT to a clearly delimited sub-section in INPUTS so agents can selectively read it.

---

## 2026-04-30 Delamain visualisation — expose Delamain definitions as structured data in .als/

**Outcome**: ALS V2 suggestion — document for ghost-line  
**Why**: David wants to build a rendering engine that can visualise Delamain state machines (states, transitions, operator gates, agent assignments). This is possible today only by parsing TypeScript source in `.als/modules/*/delamains/*/delamain.ts`, which is fragile for a rendering engine.

### Proposed approach
The ALS compiler should emit a derived data artefact — e.g. `.als/compiled/<module>/delamains/<name>.json` — that exposes the Delamain graph in a stable, rendering-friendly format:
- states (name, type: agent/operator/terminal)
- transitions (from → to, trigger)
- agent assignments (state → agent file)
- operator gates (which states are human gates)

This artefact would be regenerated by `alsc` on every compile pass. The rendering engine reads the JSON, not the TypeScript source. David can build the rendering engine independently once the output format is stable.

### Why not now
This is an ALS compiler change, not a FliLaunch change. File as a ghost-line issue to nfrith/als when ready.

---
