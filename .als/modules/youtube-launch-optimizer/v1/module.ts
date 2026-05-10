import { defineModule } from "als:authoring";

export const module = defineModule({
  dependencies: [],
  delamains: {
    "bulk-analysis": {
      path: "delamains/bulk-analysis/delamain.ts",
    },
  },
  entities: {
    "video-analysis": {
      source_format: "markdown",
      path: "video-analysis/{id}.md",
      identity: { id_field: "id" },
      fields: {
        id: { type: "id", allow_null: false },
        project_code: { type: "string", allow_null: false },
        title: { type: "string", allow_null: false },
        state: {
          type: "delamain",
          allow_null: false,
          delamain: "bulk-analysis",
        },
        created_at: { type: "date", allow_null: false },
        updated_at: { type: "date", allow_null: false },
        transcript_source: { type: "string", allow_null: false },
        transcript_hash: { type: "string", allow_null: false },
        transcript_word_count: { type: "number", allow_null: false },
        transcript_attached_at: { type: "date", allow_null: false },
      },
      body: {
        title: {
          source: { kind: "field", field: "title" },
        },
        sections: [
          {
            name: "P01_CORE_IDEA",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {} } },
            guidance: { include: "One sentence — what is this video about?" },
          },
          {
            name: "P02_KEY_VALUE",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {}, bullet_list: {} } },
            guidance: { include: "Concrete value/promise + outcomes" },
          },
          {
            name: "P03_HOOK_ANGLES",
            allow_null: true,
            content: { mode: "freeform", blocks: { table: { syntax: "gfm" }, bullet_list: {} } },
            guidance: { include: "12–18 hook angles with hook_type classification" },
          },
          {
            name: "P04_AUDIENCE_HINTS",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {}, bullet_list: {} } },
            guidance: { include: "Explicit + implicit audience signals, technical level" },
          },
          {
            name: "P05_IDENTITY_KEYWORDS",
            allow_null: true,
            content: { mode: "freeform", blocks: { bullet_list: {} } },
            guidance: { include: "Tribal/identity terms (BMAD, vibe coding, etc.)" },
          },
          {
            name: "P06_AUDIENCE_CLASSIFICATION",
            allow_null: true,
            content: { mode: "freeform", blocks: { table: { syntax: "gfm" }, paragraph: {} } },
            guidance: { include: "Per-term strength (primary|secondary|hidden) + placement (title|badge|none)" },
          },
          {
            name: "P07_EMOTIONAL_TONE",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {}, bullet_list: {} } },
            guidance: { include: "Primary tone, secondary tones, viewer feeling" },
          },
          {
            name: "P08_TOPIC_KEYWORDS",
            allow_null: true,
            content: { mode: "freeform", blocks: { bullet_list: {} } },
            guidance: { include: "5–10 SEO topic keywords (search-intent terms)" },
          },
          {
            name: "P09_TAKEAWAYS",
            allow_null: true,
            content: { mode: "freeform", blocks: { bullet_list: {} } },
            guidance: { include: "3–5 tweetable takeaway bullets" },
          },
          {
            name: "P10_QUESTIONS",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {}, bullet_list: {} } },
            guidance: { include: "Questions posed (rhetorical) + questions answered" },
          },
          {
            name: "P11_UNIQUE_ANGLE",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {}, bullet_list: {} } },
            guidance: { include: "Unique angle + differentiators vs other videos on the topic" },
          },
          {
            name: "P12_RELATED_SIGNALS",
            allow_null: true,
            content: { mode: "freeform", blocks: { paragraph: {}, bullet_list: {} } },
            guidance: { include: "Prior topics, follow-up topics, companion topics" },
          },
        ],
      },
    },
  },
} as const);

export default module;
