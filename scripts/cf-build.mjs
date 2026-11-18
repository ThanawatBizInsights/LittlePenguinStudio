// Cloudflare build entry point. Runs from wrangler.toml's [build] command
// (and can also be a Pages build command: `npm run build:cloudflare`).
//
// A build counts as PRODUCTION when either:
//   - the branch is `main` (Workers Builds sets WORKERS_CI_BRANCH; Pages sets
//     CF_PAGES_BRANCH), or
//   - it was started by `wrangler deploy` (Workers Builds runs that only for
//     whatever branch the dashboard calls production — even if that is not
//     `main`). Previews use `wrangler versions upload` instead.
// Production builds run the release check, which FAILS while any
// [PLACEHOLDER] or draft banner remains, so a draft can never be deployed to
// production. Every other build is a normal preview (noindex unless SITE_LIVE=true).
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const branch = process.env.WORKERS_CI_BRANCH || process.env.CF_PAGES_BRANCH || "";

/** Find the wrangler command that started this build by walking up the process tree (Linux /proc). */
function wranglerCommand() {
  let pid = process.ppid;
  for (let depth = 0; pid > 1 && depth < 12; depth++) {
    let args;
    try {
      args = readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0").filter(Boolean);
    } catch {
      return null; // not Linux, or no permission: fall back to the branch rule
    }
    const i = args.findIndex((a) => /(^|[\\/])wrangler(\.js|\.mjs)?$/.test(a) || /wrangler-dist[\\/]cli\.js$/.test(a));
    if (i !== -1) {
      const rest = args.slice(i + 1).filter((a) => !a.startsWith("-"));
      if (!rest.length) return null;
      // e.g. "deploy", "dev", or "versions upload"
      return rest[0] === "versions" && rest[1] ? `versions ${rest[1]}` : rest[0];
    }
    try {
      const status = readFileSync(`/proc/${pid}/status`, "utf8");
      pid = Number(/^PPid:\s+(\d+)/m.exec(status)?.[1] ?? 0);
    } catch {
      return null;
    }
  }
  return null;
}

const command = wranglerCommand();
const isDeploy = command === "deploy" || command?.startsWith("deploy ");
const production = branch === (process.env.PRODUCTION_BRANCH || "main") || isDeploy;
const script = production ? "check:release" : "build";

console.log(
  `Cloudflare build — branch "${branch || "(local)"}", wrangler "${command ?? "unknown"}" → ${
    production ? "PRODUCTION" : "preview"
  } → npm run ${script}`,
);
if (production && process.env.SITE_LIVE !== "true") {
  console.log("Note: SITE_LIVE is not \"true\", so this production build will be noindex.");
}

const result = spawnSync("npm", ["run", script], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(result.status ?? 1);
