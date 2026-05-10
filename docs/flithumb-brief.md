# FliThumb — Baku Build Brief

Build a Thumbnail Design & Build tool. Single-user internal tool. Title + thumbnail pairs in → design briefs and generated images out.

**Stack**: React 18 + Vite + shadcn/ui + Tailwind + Bun + Supabase. AI calls via Supabase Edge Function (never expose API key to client). Auth via Supabase magic link. Image generation via KIE.AI (Nano Banana 2) and/or GPT Image 2.

**Look and feel**: AppyDave brand — warm cream default, dark sections as contrast beats. See AppyDave DESIGN.md appended below.

---

## The one rule everything flows from

**The title and thumbnail are a compositional pair.**

A title does not appear in the thumbnail. It informs the thumbnail's design direction — what the image shows, what text (if any) overlays it, what subliminal signals are embedded. They are designed together to tell a coherent story side by side in a YouTube feed.

Each thumbnail concept is paired to exactly one title. The pairing is established early and held throughout the pipeline.

---

## Relationship to FliLaunch

FliThumb is a standalone app but accepts FliLaunch outputs as inputs:

| FliLaunch output | FliThumb input |
|---|---|
| Selected hooks | Design direction seeds |
| Shortlisted titles (typically 3) | Title partners for thumbnail pairs |
| Audience signal classifications | Determines primary vs subliminal text layers |
| Core idea + emotional tone | Informs image concept and palette mood |
| Analysis outputs | Supporting context for design conversation |

All FliLaunch inputs are optional. FliThumb can be used standalone.

---

## Text typology

Three text layers. Not mutually exclusive — any combination is valid.

| Layer | Description | Driven by |
|---|---|---|
| **None** | Image carries the story alone | Design choice |
| **Primary text** | Foregrounded overlay — tells its own story, distinct from the title | Design conversation |
| **Subliminal/ambient text** | Embedded in the scene — in the image, not on top of it. Like a logo on a billboard in a movie background. Absorbed without being read. | Secondary audience signals |

**Key rule**: Primary and subliminal can coexist. Subliminal text is the natural layer for secondary audience signals (e.g. BMAD badge embedded in scene when BMAD is a secondary signal, not the primary topic).

---

## Title contrast model

The thumbnail complements the title — it does not duplicate it. The nature of the complement is a design lever, not a fixed rule.

Possible contrast modes (selectable per project):
- **Explain / Intrigue** — title explains what, thumbnail makes you feel why
- **Abstract / Concrete** — title is conceptual, thumbnail is visceral and specific
- **Calm / Dramatic** — title is measured, thumbnail is high-energy
- **Parallel** — title and thumbnail reinforce the same single idea from different angles

The contrast mode is set during the design conversation phase and informs concept generation.

---

## Design language vs brand palette

Two distinct concerns:

| Layer | Purpose | Character |
|---|---|---|
| **Brand palette** | Identity, trust, consistency across all touchpoints | Subtle, reliable |
| **Thumbnail advertising palette** | Scroll-stopping, emotional, competitive in a feed | High contrast, more aggressive |
| **Derived aesthetic** | A design language seeded by the brand but amplified for advertising | e.g. Golden Age comics, cinematic noir, studio pop — derived from brand, not identical to it |

The app loads a brand doc as context. It does not bake any brand in. Any brand doc can be injected.

---

## Brand inputs

### Personal brands
Loaded as context per project. Each has its own DESIGN.md:
- AppyDave (`references/appydave/DESIGN.md`)
- AITLDR (`references/aitldr/DESIGN.md`)
- Others as added

### Third-party brands
When the thumbnail features another brand (Anthropic, Google Gemini, etc.):
- Loaded from the brand repository (`brand-index.md` + `getdesign` pattern)
- Their logos, colours, and style rules become inputs to the design conversation
- The repository grows over time — new brands added as needed

The app treats all brand docs as external inputs, never hardcoded.

---

## Pipeline — 4 phases

```
Design Conversation → Exploration Builds → Selection → Final Builds
```

### Phase 1 — Design Conversation

Per title-thumbnail pair, a short iterative dialogue to establish:
- Image concept (what the scene shows)
- Contrast mode (how it complements the title)
- Text layers (none / primary / subliminal / both)
- Palette mood (brand-derived vs advertising-amplified vs derived aesthetic)
- Third-party brand presence (logos, colours to incorporate)
- Audience signal placement (primary → image direction, secondary → subliminal layer)

Different context docs are pulled in as the conversation needs them (brand docs, audience classifications, hook angles). This is per-pair, not per-video.

Output: a structured design brief per pair.

---

### Phase 2 — Exploration Builds

**Goal**: test directions cheaply across many pairs.

- Generate 10–20 images from the design briefs
- Low cost strategy: reduced resolution/size, not reduced model quality
- Each image is already paired to its title — pairings were set in Phase 1
- View as a palette: scan for directions, not finals
- Text experimentation at this stage: thumbnail text and subliminal text shown as overlays where possible, so they can be switched without full regeneration
- Annotate or flag favourites; discard weak directions

---

### Phase 3 — Selection

From the exploration palette, select a shortlist:
- Typically 5–8 pairs selected for final build
- Each selected pair has its brief confirmed (may be refined based on what the exploration image revealed)
- Title pairing locked at this point

---

### Phase 4 — Final Builds

**Goal**: production-quality images for publishing.

- Higher resolution, production models: KIE.AI (Nano Banana 2), GPT Image 2
- Same brief as exploration — no redesign, just quality uplift
- Target: 3 finals + 1–2 backups
- Each final image is the high-resolution realisation of the paired brief — no surprises
- Model choice is a lever per project (KIE.AI vs GPT Image 2 depending on aesthetic need)

**KIE.AI API:**
- Bearer token: `KIE_AI_API_KEY` (from `~/.secrets`)
- POST `https://api.kie.ai/api/v1/jobs/createTask` → poll `GET /api/v1/jobs/recordInfo?taskId={id}`
- Default params: `aspect_ratio: 16:9`, `resolution: 2K`, `output_format: jpg`

---

## Project model

Each FliThumb project represents one video's thumbnail work:

```typescript
interface ThumbProject {
  id: string
  title: string                    // project label (often the video internal label)
  state: ProjectState
  flilaunch_ref?: string           // optional reference to FliLaunch record
  brand_id: string                 // which personal brand
  third_party_brands?: string[]    // e.g. ["anthropic", "google-gemini"]
  contrast_mode?: ContrastMode
  created_at: string
  updated_at: string
}

type ProjectState = "briefing" | "exploring" | "selecting" | "building" | "complete"
type ContrastMode = "explain_intrigue" | "abstract_concrete" | "calm_dramatic" | "parallel"
```

---

## Entity model

```
ThumbProject
  → has many: TitleThumbPair

TitleThumbPair
  title_text: string
  hook_ref?: string               // FK to source hook if from FliLaunch
  contrast_mode: ContrastMode
  state: "briefing" | "exploring" | "selected" | "building" | "final"
  → has one: DesignBrief
  → has many: ExplorationImage, FinalImage

DesignBrief
  image_concept: string           // prose description of the scene
  palette_mood: string            // brand-derived / advertising / derived aesthetic + notes
  text_layers: TextLayerConfig
  subliminal_signals: string[]    // terms to embed (from secondary audience signals)
  third_party_brand_notes: string
  generation_prompt: string       // assembled prompt for image generation

TextLayerConfig
  primary_text?: string           // the overlay text, if any
  subliminal_text?: string[]      // text embedded in scene
  none: boolean

ExplorationImage
  pair_id: FK
  image_url: string
  model: string
  resolution: string
  cost_estimate?: number
  flagged: boolean                // user flagged as interesting

FinalImage
  pair_id: FK
  image_url: string
  model: string
  resolution: string
  is_backup: boolean
  output_path?: string            // local file path for Finder drag to YouTube
```

---

## State machine

```
briefing → exploring → selecting → building → complete
                                ↑               ↓
                                └── (on revision) ──┘
```

- `briefing`: design conversation in progress, no images yet
- `exploring`: exploration images generated, user reviewing palette
- `selecting`: user shortlisting pairs for final build
- `building`: final builds in progress
- `complete`: finals ready, project done

---

## Out of scope for v1

- Thumbnail Strategy (brand-level strategy across videos — separate concern)
- Direct publish to YouTube
- Video playback
- Multi-user / sharing
- Automated text compositing (overlays are shown conceptually — actual text baking is manual or v2)
- Brand repository management UI (brand docs are loaded manually)

---

## Key constraints

- Every title-thumbnail pair is established before any image is generated
- Exploration images are cheap by design — resolution/size lever, not model compromise
- Final builds are the same brief at higher quality — no redesign at final stage
- Brand docs are inputs, never hardcoded
- The app is brand-agnostic — works for AppyDave, AITLDR, or any other brand
- FliLaunch integration is additive — all FliLaunch inputs are optional
