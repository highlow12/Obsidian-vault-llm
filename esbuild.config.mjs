import esbuild from "esbuild";
import process from "node:process";

const isWatch = process.argv.includes("--watch");

const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "main.js",
  format: "cjs",
  target: "es2018",
  platform: "node",
  external: [
    "obsidian",
    "*.node",
    "@xenova/transformers",
    "sharp",
    "onnxruntime-node"
  ],
  sourcemap: "inline"
});

if (isWatch) {
  await ctx.watch();
  console.log("[ovl] esbuild watch 시작");
} else {
  await ctx.rebuild();
  await ctx.dispose();
  console.log("[ovl] 빌드 완료");
}
