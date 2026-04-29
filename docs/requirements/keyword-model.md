# Keyword Model

## Source
Extracted from `docs/discovery/raw-3.txt` (keyword class insight) and `docs/discovery/raw-4-spec-v1.txt` (section 8) on 2026-04-23.

## The core insight
Keywords are not a flat concept. The same word can mean different things depending on which slot it occupies. Until keywords are classified by their role, they'll be mis-placed (identity terms used as SEO, SEO terms used as titles, etc.).

## The six keyword classes

### 1. Audience Keywords
Who the content is for.
Example: "founders," "developers," "content creators"
Role: shapes targeting language; may appear in titles or thumbnail text depending on intensity classification.

### 2. Brand Keywords
Terms strongly associated with a brand/channel.
Example (AppyDave): "AppyDave," "agent workflow builder"
Role: reinforces brand recognition; may appear in description brand block.

### 3. Topic Keywords
Directly related to this specific video's subject.
Example: "tmux," "Claude Code agents," "React Server Components"
Role: anchors the video in SEO discoverability.

### 4. Identity / Tribal Keywords
Signals that help the right viewer self-identify. Distinct from audience keywords because these are *tribe markers*, not demographics.
Example: "BMAD," "vibe coding," "context engineering"
Role: placement depends on Primary/Secondary/Hidden classification (see spec section 11) — title, thumbnail badge, or ignore.

### 5. Description / SEO Support Keywords
Terms useful in description body and metadata for search support.
Example: synonyms, adjacent tools, common search phrases
Role: density in description text; not usually in title.

### 6. Related-Video Discovery Keywords
Terms useful for connecting this video to others in the corpus.
Example: shared concept labels, series markers, prerequisite flags
Role: powers related-video graph edges (see `related-videos-subsystem.md`).

## Why distinction matters
YouTube has a dedicated **keywords/tags field** on the video settings page. That field is for SEO Support (class 5), not identity signals (class 4). Stuffing identity terms into the YouTube keywords field is a category error that weakens both targeting and SEO.

Current v1 spec (section 9) treats YouTube keyword tags as SEO Support output (class 5) — distinct from identity signals (section 11). That alignment is correct.

## Why this is out of v1
v1 doesn't build a keyword classification engine. It produces:
- identity signals via static audience config (class 4 — via Primary/Secondary/Hidden)
- topic keywords implicit in description output (class 3)
- YouTube keyword tag suggestions (class 5)

It does NOT:
- explicitly classify each keyword by class
- track keyword classes across videos
- separate brand keywords as a distinct managed list
- build a related-video discovery keyword index

## Dependencies
- `docs/requirements/concept-taxonomy.md` — keywords are a subset of concepts
- `docs/requirements/channel-brain-audience-memory.md` — stores keyword history per class
- `docs/requirements/related-videos-subsystem.md` — consumes class 6

## Related
- `docs/future/architecture-spec-v2.md` — section 8
- `docs/youtube-launch-optimizer-spec-v1.md` — section 9 (YouTube keyword tags) and section 11 (identity signals)
