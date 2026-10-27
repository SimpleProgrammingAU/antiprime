import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  exports: true,
  publint: true,
  attw: { profile: "strict", level: "error" },
});
