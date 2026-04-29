# Future Architecture Spec (v2+ Reference)

> **Status**: Future-state architectural blueprint. NOT v1.
>
> **Source**: Extracted from `docs/discovery/raw-4-spec-v1.txt` on 2026-04-23. That document was produced by ChatGPT as a proposed "System Architecture Spec v1" during the FliLaunch discovery phase. It describes a layered content-operating-system architecture that is explicitly out of scope for v1 (see audit log: "Content OS drift rejected").
>
> **Why it's preserved**: The assembled architecture is genuinely useful as a v2+ reference — it takes the scattered v2+ requirements (channel brain, multi-tenant, prompt management, related-video subsystem, concept taxonomy, etc.) and assembles them into a coherent layered model. When v2 begins, this document is the starting point.
>
> **What to do with it now**: Read as context when making v2+ requirements decisions. Do NOT use it as a v1 target. Do NOT adopt its layer model as the v1 architecture. Individual v1 decisions are in the audit log; individual deferred ideas are in `docs/requirements/`.
>
> **Cross-references**: The v2+ requirement files that this document assembles:
> - `docs/requirements/channel-brain-audience-memory.md`
> - `docs/requirements/cross-video-pattern-tracking.md`
> - `docs/requirements/historical-video-backfill.md`
> - `docs/requirements/multi-tenant-multi-brand.md`
> - `docs/requirements/document-concept-library.md`
> - `docs/requirements/north-star-versioning.md`
> - `docs/requirements/related-videos-subsystem.md`
> - `docs/requirements/concept-taxonomy.md`
> - `docs/requirements/keyword-model.md`
> - `docs/requirements/tenant-brand-user-model.md`

---

## 1. System Intent

The system evolves from a per-video launch optimizer into a broader content operating system.

It is intended to:

- process individual videos well
- accumulate reusable intelligence across videos
- support multiple brands and users
- improve content packaging over time
- provide strategic consistency through brand-level guidance
- eventually support richer planning, recommendation, and visualization workflows

---

## 2. Architecture Principles

### 2.1 Separate levels cleanly

The system should separate:
- per-video workflow
- cross-video memory
- brand strategy
- reusable documents
- prompt infrastructure
- operational infrastructure

These should not be mixed into a single linear pipeline model.

### 2.2 Capture broadly, structure narrowly

The system may ingest a broad set of historical data. But it should only formalize and promote concepts that compound over time.

### 2.3 Human-directed, AI-assisted

The system should suggest, infer, classify, and recommend. The human should remain responsible for final positioning and editorial judgment.

### 2.4 Flexible before backfill

The architecture should not be treated as fully finalized until the historical backfill tool has run and the real data shape is understood.

### 2.5 Semantic structure before UX structure

The semantic model of entities, relationships, and flows should exist before final UX/UI design. UX may change significantly without invalidating the core system model.

---

## 3. Major System Layers

### 3.1 Video Workflow Layer
Per-video processing. Ingest transcript and assets → analyze → generate titles, thumbnails, chapters, descriptions, publish outputs. This is a **consumer** of intelligence from other layers, not the whole system.

### 3.2 Cross-Video Intelligence Layer
Persistent channel-memory. Stores reusable concepts across videos, detects recurring patterns, surfaces suggestions, powers related-video logic. This is the "Channel Brain."

### 3.3 Strategy Layer
Brand-level. North Star definitions and versions, content pillars, audience definitions, positioning guidance, long-term alignment analysis. Influences workflow and cross-video logic.

### 3.4 Documentation Layer
Reusable knowledge. Focused documents usable as prompt context: style guides, branding rules, thumbnail guidance, description structures, legal/affiliate policies. Compact second brains for specific concepts.

### 3.5 Prompt Management Layer
Horizontal layer. Prompt templates, variable placeholders, output schema expectations, versioning, editing and inspection, distinguishing prompt-only changes from structural changes.

### 3.6 Operational Infrastructure Layer
Multi-tenant support, multi-brand support, historical backfill ingestion, storage, integration surfaces for future tooling.

---

## 4. Core Entities

### 4.1 Video
video id / external url, brand / channel association, title, transcript, transcript timings / SRT, description, chapters, thumbnail assets, selected thumbnail, alternate thumbnails, publish date, playlist placement, tags / keywords / metadata, derived analysis outputs.

### 4.2 Brand
Examples: AppyDave, AI TLDR, Clauding Lab. Attributes: active North Star, North Star history, audience definitions, content pillars, prompt defaults, thumbnail style guide, description conventions, related-video conventions.

### 4.3 Tenant / Workspace
Top-level owner. users, brands, shared documents, shared prompt systems, permissions and operational settings.

### 4.4 User
Examples: AppyDave, Mary, Jan. Attributes: roles, brand access, review responsibilities, prompt editing permissions.

### 4.5 Prompt
prompt name, purpose, template body, variables, output schema, examples, version history, owner / scope, prompt-only revision notes, structural revision notes.

### 4.6 Document
Examples: brand North Star doc, thumbnail style guide, audience profile, affiliate/legal block, content pillar definitions. Attributes: document type, scope (tenant / brand / global), content, version, allowed prompt use, freshness / review status.

### 4.7 Concept
Examples: audience signal, recurring theme, tool/framework mention, hook type, packaging motif, keyword class. Attributes: concept class, concept label, confidence, source video(s), frequency, compounding value, current usefulness.

### 4.8 Audience Signal
Specialized concept. Examples: BMAD, founders, AI builders, automation engineers. Attributes: signal label, primary / secondary / hidden strength per video, identity type, brand association, historical frequency.

### 4.9 North Star
Versioned strategic object. Attributes: brand scope, version (Major.Minor — see `docs/requirements/north-star-versioning.md`), active period, summary statement, supporting bullets, review notes, compliance windows.

Major version shifts represent new strategic direction. Minor shifts represent wording/refinement changes. Alignment is measured against Major versions only.

### 4.10 Related Video Link
source video, target video, relationship type, confidence, use cases (description, playlist, end card, intro, outro, planning), rationale.

---

## 5. Core Relationships

- Brand owns many Videos
- Tenant owns many Brands and Users
- Brand owns many Documents
- Brand owns North Star history
- Video references many Concepts
- Video references many Audience Signals
- Video relates to many other Videos (graph-like, not one-to-one)
- Prompts are used across multiple stages
- Documents may be passed into Prompts
- Strategy influences Workflow

---

## 6. Main Flows

### 6.1 Historical Backfill Flow
Seed the cross-video intelligence layer. Ingest channel history → capture minimum viable metadata → store source assets and transcript data → run extraction jobs → populate cross-video memory → refine schemas after observing real data.

Minimum: url, brand/channel, title, transcript.
High-value: timings, thumbnails, description, playlist, chapters, tags/keywords, publish date.

### 6.2 Per-Video Workflow Flow
Ingest transcript → derive Content DNA → classify concepts and audience signals → generate title angles → generate titles → generate thumbnails → generate chapters → generate description structure → assemble publish-ready outputs.

May later be represented in many UX forms; does not need to remain page-per-step.

### 6.3 Prompt Execution Flow
Select template → inject variables and optional documents → run prompt → validate output against schema → store result and revision context → allow inspection and refinement.

Prompt revisions support two classes: prompt-only and structural (requiring app/schema changes).

### 6.4 Cross-Video Suggestion Flow
Current video produces transcript-derived concepts → compare against historical patterns → check brand docs and strategy → surface signals and recommendations → human decides.

Examples: suggest BMAD as secondary badge, suggest related videos, suggest recurring keyword opportunities, suggest underused audience targeting.

### 6.5 North Star Compliance Flow
Select brand and North Star version window → analyze videos against active strategic framing → summarize alignment over time windows → detect drift → surface strategic recommendations.

Windows: all history, 12 months, 90 days, 30 days, optional 3-month historical slices.

### 6.6 Related-Video Graph Flow
Analyze current video concepts → compare against historical corpus → score possible related videos by relationship type → expose recommendations for description links, playlists, end cards, intro/outro references, series planning, future relay planning.

This is a reusable subsystem, not a one-off description helper.

---

## 7. Concept Taxonomy (Initial)

Provisional. Refine after backfill.

- **Audience Concepts**: audience signals, identity tags, tribe/community signals
- **Brand Concepts**: brand terms, brand promises, signature narrative frames
- **Strategy Concepts**: North Star alignment, content pillar mapping, campaign/time-window relevance
- **Content Concepts**: topics, themes, tools/frameworks, methods, recurring entities
- **Packaging Concepts**: hook type, title framing, thumbnail motif, text/no-text patterns, badge opportunities
- **Description Concepts**: synopsis structure, related-video placement, CTA type, link blocks, legal patterns
- **Discovery Concepts**: keyword classes, search support terms, identity keywords, recommendation graph relationships

---

## 8. Keyword Model (Initial)

Keywords are not a single flat concept.

- **Audience Keywords** — who the content is for
- **Brand Keywords** — strongly associated with a brand/channel
- **Topic Keywords** — directly related to the video subject
- **Identity / Tribal Keywords** — help the right viewer self-identify (e.g. BMAD)
- **Description / SEO Support Keywords** — useful in descriptions, metadata, search support
- **Related-Video Discovery Keywords** — connecting videos to each other

---

## 9. Description System (Initial Structure)

Structured composition:
- above-the-fold synopsis
- chapter timestamps
- related videos
- affiliate/resource links
- legal/disclaimer block
- brand block
- optional CTA

Later informed by: cross-video history, related-video graph, brand documents, prompt templates.

---

## 10. Stable vs Evolving Areas

### Relatively stable
- multi-layer architecture idea
- need for prompt management
- need for cross-video intelligence
- need for reusable documents
- need for brand strategy support
- need for historical backfill

### Still evolving
- exact schemas
- exact prompt interfaces
- exact concept taxonomy
- exact keyword taxonomy
- exact UX/page model
- exact North Star version windows
- exact related-video scoring logic

---

## 11. Near-Term Priorities (for v2 kickoff)

1. **Backfill readiness** — ingest real historical data from the external tool
2. **Concept and schema flexibility** — keep definitions provisional until real data is observed
3. **Prompt management definition** — define prompt objects, scopes, variables, schemas, revision modes
4. **Documentation model** — focused reusable documents for brands and strategy
5. **Cross-video intelligence foundation** — enough structured history to begin audience, keyword, and related-video suggestions

---

## 12. What This Document Is Not

- not a v1 target
- not a final UX spec
- not a final database schema
- not a final requirements freeze
- not a final prompt library

A durable architectural framing document that will guide v2+ design.

---

## 13. Working Summary

A layered content operating system:
- per-video workflow
- cross-video intelligence
- brand strategy
- reusable documentation
- prompt infrastructure
- multi-brand operational support

The linear pipeline is no longer sufficient as the primary v2+ model. The correct v2+ model is layered, relational, and historically aware.

**For v1**, the linear pipeline framing is retained deliberately — see `docs/youtube-launch-optimizer-spec-v1.md`. v1 builds persistence and the single-video workflow; v2+ builds the layers on top.
