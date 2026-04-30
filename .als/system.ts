import { defineSystem } from "./authoring.ts";

export const system = defineSystem({
  als_version: 1,
  system_id: "flilaunch",
  modules: {
    "fli-launch": {
      path: "fli-launch",
      version: 1,
      description: "YouTube Launch Optimizer — transcript to launch-ready packaging.",
      skills: ["fli-launch-manage", "fli-launch-pipeline"],
    },
  },
} as const);

export default system;
