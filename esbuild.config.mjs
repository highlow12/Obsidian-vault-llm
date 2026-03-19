import esbuild from "esbuild";
import process from "node:process";

const isWatch = process.argv.includes("--watch");
const isProd = process.argv.includes("--prod");

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
  // 프로덕션 빌드 시 소스맵 제거, 개발 시 인라인 소스맵 포함
  sourcemap: isProd ? false : "inline",
  minify: isProd,
});

if (isWatch) {
  await ctx.watch();
  console.log("[ovl] esbuild watch 시작");
} else {
  await ctx.rebuild();
  await ctx.dispose();
  console.log(`[ovl] ${isProd ? "프로덕션" : "개발"} 빌드 완료`);
}
