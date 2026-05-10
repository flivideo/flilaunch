---
source: YouTube-pulled archive (post-publication)
root: ~/dev/video-projects/published/
brands: aitldr (324 videos), appydave (183 videos), claudinglab (49 videos)
last_sync: 2026-05-09
---

# published — YouTube Archive

Every video that's actually been published on YouTube, pulled from the channel API and stored locally. This is the **only source for post-publication truth** — what title, description, thumbnail, view count, etc. is actually live on YouTube right now.

## Root path

```
~/dev/video-projects/published/
```

## Per-brand layout

```
~/dev/video-projects/published/<brand>/
├── channel.json        channel metadata (id, handle, title, description, subscriberCount, videoCount, etc.)
├── last-sync.json      timestamps + per-video etag map for incremental sync
└── videos/<youtube-id>/
    ├── metadata.json   full YouTube metadata (title, description, tags, duration, viewCount, likeCount, etc.)
    ├── transcript.txt  YouTube auto-caption transcript
    └── thumbnail.jpg   the published thumbnail
```

## Brands and counts (as of 2026-05-09 sync)

| Brand | Videos | Notes |
|---|---|---|
| `aitldr/` | 324 | Mary runs, David + Daniel own |
| `appydave/` | 183 | Primary brand |
| `claudinglab/` | 49 | Research / Clauding Lab |

Future brands: extend `published/<brand>/` as they come online.

## What `metadata.json` contains

Useful fields for FliLaunch workflows:
- `title` — the actual published title
- `description` — full description (with affiliate links, CTAs, etc.)
- `tags[]` — YouTube keyword tags
- `publishedAt` — ISO timestamp
- `duration` — ISO 8601 duration (e.g. `PT30M56S`)
- `viewCount`, `likeCount`, `commentCount` — performance signals
- `thumbnailUrl` — YouTube CDN URL for the thumbnail
- `categoryId` — YouTube category code

## What `last-sync.json` gives you

- `lastSyncAt` — when the channel was last pulled
- `videoEtags` — map of `youtubeId → "duration:likes:comments"` snapshot. Lets you detect changes incrementally.

## Quick recipes

```bash
# Count published videos per brand
for d in ~/dev/video-projects/published/*/videos/; do
  echo "$d: $(ls "$d" | wc -l | xargs) videos"
done

# Find all titles for a brand
jq -r '.title' ~/dev/video-projects/published/appydave/videos/*/metadata.json | head -20

# Find videos by view count (top 10 for AppyDave)
for f in ~/dev/video-projects/published/appydave/videos/*/metadata.json; do
  jq -r '"\(.viewCount)\t\(.title)"' "$f"
done | sort -rn | head -10

# Get the YouTube ID for a video by title fragment
grep -l "marketing-plan" ~/dev/video-projects/published/appydave/videos/*/metadata.json
```

## What this archive does NOT have

- **Linkage to v-appydave project codes** — no field connects `b65-guy-monroe-marketing-plan` to a YouTube ID. **Don't treat this as a gap to close.** Most v-appydave projects haven't been published, and the published set largely predates this filesystem. The two folders describe different worlds: v-appydave = pre-publication WIP, published = what actually shipped. Use one or the other for a given workflow; don't try to join them.
- **Original recording files** — only the YouTube-baked output (downscaled video lives upstream on YouTube; only transcript + thumbnail + metadata are pulled).
- **Pre-publication state** — once a video is on YouTube, its evolution is captured in `videoEtags` snapshots, but earlier draft versions are not here.

## Refresh / sync

(How to refresh — TBD. Currently last-synced 2026-05-09. Likely a CLI in one of the AppyDave tools — check `appydave-tools` if you need a fresh pull.)

## Why this matters for FliLaunch

- **Triage workflow** can compare "what we have in v-appydave (recorded)" vs "what's published" to find gaps
- **Description workflow** can mine actual successful descriptions from `metadata.json` for patterns
- **Title development** can sanity-check "is this title close to one I've already published?"
- **Thumbnail design** can pull `thumbnail.jpg` history to see what the brand has converged on visually
