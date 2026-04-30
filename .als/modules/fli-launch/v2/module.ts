import { defineModule } from "../../../authoring.ts";

export const module = defineModule({
  "dependencies": [],
  "delamains": {
    "launch": {
      "path": "delamains/launch/delamain.ts"
    }
  },
  "entities": {
    "launch-session": {
      "source_format": "markdown",
      "path": "sessions/{id}.md",
      "identity": {
        "id_field": "id"
      },
      "fields": {
        "id": {
          "type": "id",
          "allow_null": false
        },
        "project_code": {
          "type": "string",
          "allow_null": false
        },
        "internal_label": {
          "type": "string",
          "allow_null": true
        },
        "status": {
          "type": "delamain",
          "allow_null": false,
          "delamain": "launch"
        },
        "created": {
          "type": "date",
          "allow_null": false
        },
        "updated": {
          "type": "date",
          "allow_null": false
        }
      },
      "body": {
        "title": {
          "source": {
            "kind": "field",
            "field": "project_code"
          }
        },
        "sections": [
          {
            "name": "INPUTS",
            "allow_null": false,
            "content": { "mode": "freeform", "blocks": { "bullet_list": {}, "paragraph": {} } },
            "guidance": {
              "include": "FliHub shortcode (e.g. b65), resolved full project code (e.g. b65-guy-monroe-marketing-plan), combined transcript text, per-recording SRT timings, optional focal point note, optional audience keyword overrides, optional related video list — all fetched from FliHub API (localhost:5101) by the fetching-transcript agent; SRT is stored here but only read by the generating-chapters agent",
              "exclude": "generated outputs"
            }
          },
          {
            "name": "ANALYSIS",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "paragraph": {}, "bullet_list": {}, "heading": { "min_depth": 3, "max_depth": 4 } } },
            "guidance": {
              "include": "outputs from the 12 parallel analysis prompts: core idea, key value, audience hints, identity keyword hints, hook angles",
              "exclude": "selected titles and thumbnail choices"
            }
          },
          {
            "name": "HOOKS",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "bullet_list": {}, "ordered_list": {} } },
            "guidance": {
              "include": "AI-ranked top-4 shortlist with #1 marked as recommendation (presented first for operator), then full generated hook list (10-20) with hook_type tags; operator-selected subset marked clearly",
              "exclude": "title candidates"
            }
          },
          {
            "name": "TITLES",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "bullet_list": {}, "ordered_list": {} } },
            "guidance": {
              "include": "all generated title candidates per hook, the 3 final A/B selections marked, audience signal classifications",
              "exclude": "thumbnail concepts"
            }
          },
          {
            "name": "THUMBNAILS",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "bullet_list": {}, "paragraph": {} } },
            "guidance": {
              "include": "thumbnail concept descriptions per hook, selected concepts, thumbnail text options, badge suggestions and operator decisions",
              "exclude": "actual image files (those are in the output folder)"
            }
          },
          {
            "name": "CHAPTERS",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "ordered_list": {}, "bullet_list": {} } },
            "guidance": {
              "include": "approved chapter list with timestamps and labels in YouTube format (0:00 Intro, 1:23 Topic, etc.) — timestamps derived from SRT when available, estimated otherwise",
              "exclude": "draft labels that were rejected"
            }
          },
          {
            "name": "DESCRIPTION",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "paragraph": {}, "bullet_list": {}, "heading": { "min_depth": 3, "max_depth": 4 } } },
            "guidance": {
              "include": "synopsis (above-fold), assembled chapter block (populated from CHAPTERS by assembling-output — never left as placeholder), related-video links, affiliate placeholders, legal disclosure, CTA, brand block, YouTube keyword tags",
              "exclude": "analysis notes"
            }
          },
          {
            "name": "EXPORT",
            "allow_null": true,
            "content": { "mode": "freeform", "blocks": { "paragraph": {}, "bullet_list": {}, "ordered_list": {} } },
            "guidance": {
              "include": "pointer to sibling JSON export file ({id}-export.json) plus human-readable summary: 3 title candidates, selected thumbnail direction, keyword tags, chapter list",
              "exclude": "working notes"
            }
          },
          {
            "name": "ACTIVITY_LOG",
            "allow_null": false,
            "content": { "mode": "freeform", "blocks": { "bullet_list": {}, "ordered_list": {} } },
            "guidance": {
              "include": "dated append-only state changes and handoff notes",
              "exclude": "generated content"
            }
          }
        ]
      }
    }
  }
} as const);

export default module;
