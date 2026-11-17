// Cloudflare Pages build entry point (build command: `npm run build:cloudflare`).
//
// Cloudflare sets CF_PAGES_BRANCH during builds.
// - Production branch (main): runs the release check, which FAILS the build
//   while any [PLACEHOLDER] or draft banner remains — so a draft can never
//   reach production.
// - Any other branch: a normal preview build (noindex unless SITE_LIVE=true).
import { spawnSync } from "node:child_process";

const branch = process.env.CF_PAGES_BRANCH ?? "";
const production = branch === (process.env.PRODUCTION_BRANCH || "main");
const script = production ? "check:release" : "build";

console.log(`Cloudflare build — branch "${branch || "(local)"}" → npm run ${script}`);
if (production && process.env.SITE_LIVE !== "true") {
  console.log("Note: SITE_LIVE is not \"true\", so this production build will be noindex.");
}

const result = spawnSync("npm", ["run", script], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(result.status ?? 1);
