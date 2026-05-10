import { defineSystem } from "als:authoring";

export const system = defineSystem({
  als_version: 3,
  system_id: "flilaunch",
  modules: {
    "youtube-launch-optimizer": {
      path: "workspace/youtube-launch-optimizer",
      version: 1,
      description: "YouTube launch packaging — bulk analysis today, launch + thumbnail later.",
      skills: [
        "youtube-launch-optimizer-inspect",
        "youtube-launch-optimizer-bulk-analysis",
      ],
    },
  },
} as const);

export default system;
