import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  // TSDoc ships in the .d.ts files, where editors read it, so the JavaScript doesn't need a second copy.
  outputOptions: { comments: { jsdoc: false } },
  exports: true,
  publint: true,
  attw: { profile: "strict", level: "error" },
});
