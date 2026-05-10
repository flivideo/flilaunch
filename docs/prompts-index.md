---
purpose: Index of every prompt of value across the AppyDave ecosystem related to YouTube launch / video packaging. Source-of-truth pointers, not extracted content.
created: 2026-05-10
audience: David + Nick (ALS workflow design session)
---

# Prompts Index — YouTube Launch / Packaging

## How to use this index

This is a **map of where good prompts live**, not the prompts themselves. The frame:

- **Don't aim for perfect prompts today.** Once workflows run for real, prompts will change in ways we can't predict from the desk. Today's job is to know *where* the good material lives so we can pull a set quickly when a workflow needs it.
- **Source of truth matters more than copy quality.** If a prompt lives in two places, the index notes which is canonical so we don't accidentally improve the dead twin.
- **Assemble per problem, not per pipeline.** Each ALS workflow we design today will need its own small bundle of prompts. The categories below let us grab the bundle in minutes.

## Headline numbers

- **~75 prompt assets** across 8 source systems
- Richest single source: **AWB Gen 3** at `~/dev/ad/apps/awb/examples/gen3/youtube/prompts/` — 31 production `.hbs` Handlebars prompts with paired `.json` schemas
- Second richest: **Baku FliLaunch** at `~/dev/baku/b-flilaunch/src/lib/prompts.ts` — 12 analysis + 4 packaging prompts in one TypeScript file
- The unique IP: **Baku FliLaunch p06 audience classification** — the only prompt that decides badge-vs-title placement of identity terms

| Category | Count |
|---|---|
| analysis | 24 |
| chapters | 7 |
| titles | 5 |
| description | 5 |
| thumbnails (visual concept) | 4 |
| hooks | 4 |
| audience-signal | 3 |
| system-role | 3 |
| social/related | 3 |
| thumbnail-text | 2 |
| keyword-tags | 2 |
| video-preparation (meta) | 4 |

---

## Category: analysis

- **FliLaunch v2 — 12-prompt analysis bank**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 19–128)
  - Notes: p01 core idea, p02 key value, p03 hook angles, p04 audience hints, p05 identity keywords, p06 audience classification, p07 emotional tone, p08 topic keywords, p09 takeaways, p10 questions, p11 unique angle, p12 related signals. Has placeholders + JSON shapes + focal_note + known_audiences footer.

- **B-YouTube-Launch-Optimizer — 12 default analysis prompts (DEFAULT_ANALYSIS_PROMPTS)**
  - Source: `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/src/types/project.ts` (lines 205–278)
  - Notes: Predecessor of Baku FliLaunch. Worth comparing for prompts the new set dropped — Memorable Quotes, Visual Themes, Controversial Claims, CTA opportunities.

- **AWB Gen 3 — 11 content-analysis Handlebars prompts** ⭐
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/content-analysis/`
  - Files: analyze-audience-insights, analyze-catchy-phrases, analyze-cta-phrases, analyze-emotional-triggers, analyze-key-takeaways, analyze-keywords, analyze-main-topic, analyze-overall-tone, analyze-questions-posed, analyze-search-terms, analyze-statistics, analyze-usp
  - Notes: Each `.hbs` paired with `.json` schema. Most polished analysis set in the ecosystem.

- **ALS-Workflows phase2 procedure (12-dim grid)**
  - Source: `/Users/davidcruwys/dev/als-workflows/.claude/skills/flilaunch/references/phase2-analysis.md`
  - Notes: Procedure doc not extractable templates. Differs from Baku — has p10 = Call to Action (instead of Questions), p12 = Engagement Hooks (instead of Related signals).

## Category: hooks

- **FliLaunch v2 — generating-hooks delamain agent** ⭐
  - Source: `/Users/davidcruwys/dev/ad/flivideo/flilaunch/.als/modules/fli-launch/v2/delamains/launch/agents/generating-hooks.md`
  - Notes: Generates 10–20 hook angles spanning 7 hook types (x_vs_y, only_one_worked, i_tried_x, problem_solution, contrarian_take, capability_demo, qualifying_question). Ranks top-4, marks AI #1 pick. Effectively a meta-hook prompt.

- **AWB Gen 3 — analyze-catchy-phrases**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/content-analysis/analyze-catchy-phrases.hbs`
  - Notes: Pulls quotable hook-able phrases from transcript.

- **ALS-workflows phase2 — p03 hook angles (⭐ in source)**
  - Source: `/Users/davidcruwys/dev/als-workflows/.claude/skills/flilaunch/references/phase2-analysis.md` (line 25)
  - Notes: Declares hook angles as gating output; 5 distinct framings.

## Category: titles

- **FliLaunch — TITLES_PER_HOOK_PROMPT** ⭐
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 138–166)
  - Notes: Generates N titles anchored to a specific hook angle, with audience placement rules and existing-title de-duplication. Strongest title prompt — ties hooks → titles directly.

- **AWB Gen 3 — generate-title.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/title-thumbnail/generate-title.hbs`
  - Notes: Three Emotions Framework (Curiosity / Desire / Fear), character-limit guidance, power words table, anti-clickbait rules.

- **AWB Gen 3 — select-title-shortlist.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/title-thumbnail/select-title-shortlist.hbs`
  - Notes: Interactive curation prompt — present, ask clarifying questions, then shortlist (NOT auto-select).

- **B-YouTube-Launch-Optimizer — titles_generate / titles_refine**
  - Source: `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/src/types/project.ts` (lines 164–171)
  - Notes: 15-title generation with style mix; refine variant takes "direction" feedback.

- **ALS-Workflows phase3-titles procedure**
  - Source: `/Users/davidcruwys/dev/als-workflows/.claude/skills/flilaunch/references/phase3-titles.md`
  - Notes: 5 variants per hook (problem-led, outcome-led, numeric, curiosity-gap, audience-named).

## Category: thumbnails (visual concept)

- **FliLaunch — THUMBNAIL_CONCEPTS_PER_HOOK_PROMPT**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 168–185)
  - Notes: 2 concepts per hook, prose visual direction + 2 text overlay options + secondary-audience badge suggestion.

- **B-YouTube-Launch-Optimizer — thumbnails_generate**
  - Source: `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/src/types/project.ts` (lines 173–175)
  - Notes: 6 unique concepts. CONCEPT/DESCRIPTION/VISUAL BRIEF format suitable for downstream image gen.

- **ALS-Workflows phase4-thumbnails procedure**
  - Source: `/Users/davidcruwys/dev/als-workflows/.claude/skills/flilaunch/references/phase4-thumbnails.md`
  - Notes: Concept structure: Title/Hook/Text/Visual concept/Design style/Mood per hook.

- **AppyDave-thumbnail skill — concept generation (brand baked in)**
  - Source: `/Users/davidcruwys/.claude/plugins/cache/appydave-plugins/appydave/3.37.0/skills/appydave-thumbnail/SKILL.md` (Phase 1, lines 18–69)
  - Notes: AppyDave-brand specific. Typography-first concepts, 5 composition patterns, ghost watermark, hook text composed at gen time.

## Category: thumbnail-text (overlay text — primary + subliminal)

- **FliThumb — design-conversation system prompt**
  - Source: `/Users/davidcruwys/dev/baku/b-fli-thumb/supabase/functions/design-conversation/index.ts` (lines 27–64, SYSTEM_PROMPT constant)
  - Notes: Closest thing to an explicit thumbnail-text prompt — but it's *conversational*, not a one-shot generator. Defines the model: primary text (overlay) vs subliminal text (embedded in scene). Framework you want; prompt itself needs reshaping for batch generation.

- **AWB Gen 3 — generate-thumbnail-text.hbs** ⭐
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/title-thumbnail/generate-thumbnail-text.hbs`
  - Notes: This IS the missing thumbnail-text prompt. Different framing from FliThumb (no primary/subliminal split — just punchy overlay text). Part 1 / Part 2 / Part 3 segments tied to title ideas (table format).

## Category: description

- **FliLaunch — DESCRIPTION_PROMPT**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 187–199)
  - Notes: 2-3 sentence synopsis + 10–15 SEO keyword tags, hook-aligned.

- **B-YouTube-Launch-Optimizer — description_narrative**
  - Source: `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/src/types/project.ts` (lines 188–191)
  - Notes: Engaging SEO-optimised description from analysis output.

- **AWB Gen 3 — yt-write-description.hbs** ⭐
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/youtube-metadata/yt-write-description.hbs`
  - Notes: Pure assembly prompt — full YouTube formatting rules baked in (`*bold*`, headings, auto-links). Best for final stage.

- **AWB Gen 3 — yt-simple-description.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/youtube-metadata/yt-simple-description.hbs`
  - Notes: Lighter-weight description variant.

- **ALS-Workflows phase6-describe procedure**
  - Source: `/Users/davidcruwys/dev/als-workflows/.claude/skills/flilaunch/references/phase5-describe.md`
  - Notes: 8-slot composition structure (Synopsis, Chapters, CTA primary, Affiliate, Related, CTA fold, Social, Legal). Procedure not a prompt, but defines the slot model.

## Category: chapters

- **FliLaunch — CHAPTERS_PROMPT**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 201–216)
  - Notes: Generates "M:SS title" markers, anchored to SRT if provided, else inferred at 150 wpm.

- **AWB Gen 3 — identify-chapters.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/chapter-processing/identify-chapters.hbs`
  - Notes: Extracts chapter-worthy boundaries from transcript.

- **AWB Gen 3 — refine-chapters.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/chapter-processing/refine-chapters.hbs`
  - Notes: Refines chapter titles for clarity / engagement.

- **AWB Gen 3 — create-chapters.hbs** ⭐
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/chapter-processing/create-chapters.hbs`
  - Notes: Semantic-search match of chapter hints to edited SRT timestamps. Handles raw vs edited transcript mismatch. Best chapter-timestamping prompt in the ecosystem.

- **B-YouTube-Launch-Optimizer — chapters_generate / chapters_refine / chapter_editor_refine**
  - Source: `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/src/types/project.ts` (lines 176–186)

- **FliLaunch v2 — generating-chapters agent**
  - Source: `/Users/davidcruwys/dev/ad/flivideo/flilaunch/.als/modules/fli-launch/v2/delamains/launch/agents/generating-chapters.md`
  - Notes: SRT-first extraction with fallback estimation, segment-name dedup, ≤100 char rule.

## Category: audience-signal

- **FliLaunch — p06_audience_classification** ⭐ unique IP
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 66–73)
  - Notes: Classify each known audience term as primary/secondary/hidden + placement (title/badge/none). Not present elsewhere in the ecosystem. Drives the badge-vs-title decision.

- **AWB Gen 3 — analyze-audience-insights.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/content-analysis/analyze-audience-insights.hbs`
  - Notes: Extract audience signals from transcript.

- **FliLaunch — p05_identity_keywords**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 57–64)
  - Notes: Extracts tribal/identity terms (BMAD, vibe coding, etc.).

## Category: keyword-tags

- **FliLaunch — DESCRIPTION_PROMPT keyword_tags portion**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 189–199)
  - Notes: 10–15 SEO tags, search-intent only (NOT identity signals). Embedded in description prompt; consider extracting standalone.

- **AWB Gen 3 — analyze-keywords.hbs / analyze-search-terms.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/content-analysis/`
  - Notes: Separate keyword and search-intent extraction.

## Category: system-role (system prompts)

- **SYSTEM_PROMPT_ANALYST + SYSTEM_PROMPT_PACKAGER**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 130, 132)
  - Notes: Dual-role system prompts for analysis vs packaging stages.

- **FliThumb design partner system prompt**
  - Source: `/Users/davidcruwys/dev/baku/b-fli-thumb/supabase/functions/design-conversation/index.ts` (lines 27–64)
  - Notes: JSON-output design conversation contract.

- **B-YouTube-Launch-Optimizer per-stage system prompts**
  - Source: `/Users/davidcruwys/dev/baku/b-youtube-launch-optimizer/src/types/project.ts` (DEFAULT_STAGE_PROMPTS, lines 163–192)
  - Notes: System text embedded in each stage_prompt entry.

## Category: social / related

- **AWB Gen 3 — create-tweet.hbs / create-linkedin-post.hbs / add-to-video-list.hbs**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/social-media/`
  - Notes: Social cross-post and related-video registration.

- **FliLaunch — p12_related_signals**
  - Source: `/Users/davidcruwys/dev/baku/b-flilaunch/src/lib/prompts.ts` (lines 119–127)
  - Notes: Prior/follow-up/companion topic detection.

## Category: video-preparation (meta / pre-pipeline)

- **AWB Gen 3 — video-preparation prompts**
  - Source: `/Users/davidcruwys/dev/ad/apps/awb/examples/gen3/youtube/prompts/video-preparation/`
  - Files: abridge.hbs, abridge-qa.hbs, configure.hbs, summarize-video.hbs
  - Notes: New territory not in FliLaunch — abridging long transcripts before main pipeline.

---

## Other prompt-adjacent assets

- **AWB Gen 1 youtube workflow .rbx files** — `~/dev/ad/agent-workflow-builder/awb-workflows/winningprompts/{transcript_analyzer,youtube_intro_outro_booster,youtube_launch_optimizer,youtube_livestream_podcast_brief,youtube_storyboard_builder,youtube_video_planner}.rbx` — Ruby-DSL workflow definitions; prompts likely embedded inline. Worth a one-pass scan if a transcript-analyzer or storyboard need surfaces.
- **AWB Gen 2 youtube prompts mirror** — `~/dev/ad/apps/awb/examples/gen2/youtube/prompts/` — same structure as Gen 3, likely earlier versions of the same prompts. Compare for regressions.
- **AWB Gen 3 incident & supportsignal prompt sets** — `~/dev/ad/apps/awb/examples/gen3/incident/prompts/` and `~/dev/ad/apps/awb/examples/supportsignal/prompts/` — different domain, but same prompt-structure conventions to copy.
- **POEM OS** (`~/dev/poem-os`) — empty. No prompts despite the name.
- **brand-aitldr** (`~/dev/ad/brains/brand-aitldr/`) — content strategy / philosophy / design docs. Useful as *inputs* to prompts, not as prompts themselves.
- **FliLaunch v1 vs v2 agent files** at `.als/modules/fli-launch/v{1,2}/delamains/launch/agents/*.md` — procedural agent contracts, not extractable prompt templates. v2 is current.

---

## Gaps — workflow areas with no canonical prompt to pull from

These are the prompts the ecosystem doesn't have yet. Write fresh as the workflows that need them get designed.

1. **Standalone primary-vs-subliminal thumbnail-text prompt** — FliThumb framework exists (primary overlay vs subliminal embedded) but only inside an interactive system prompt. No one-shot version: "given title + contrast mode + secondary audiences, output 3 primary + 3 subliminal text candidates."
2. **Cross-video triage / health-check prompt** — nothing in the ecosystem. The "is this video missing X" pattern doesn't exist as a cross-video prompt. The whole TRIAGE workflow column has no prompt corpus to draw from.
3. **Contrast-mode selector** — FliThumb defines 4 contrast modes (explain_intrigue, abstract_concrete, calm_dramatic, parallel) but no prompt picks the right mode for a given title × hook. Currently manual.
4. **Related-video ranker** — every prompt *mentions* related videos; none rank/pick from a candidate list.
5. **North Star / channel-strategy injection** — explicitly v2+ in spec; no prompt yet.

---

## Working note for the Nick session

When we settle a workflow shape with Nick, the assembly job is:
1. Pick the category from the index
2. Pull the ⭐ source for that category as the starting prompt
3. Cross-reference the older Baku version for anything that got dropped that we want back
4. If the workflow needs a prompt in a "gap" area, scope a fresh write — but only after we know the workflow shape, not before
