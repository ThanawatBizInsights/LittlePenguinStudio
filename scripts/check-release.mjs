// Fails if any built page still contains an unresolved placeholder.
// Usage: npm run check:release   (builds first)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../out", import.meta.url).pathname;
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})(root);

let problems = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const found = new Set();
  for (const m of html.matchAll(/<mark data-placeholder=""[^>]*>([^<]*)<\/mark>/g)) found.add(m[1]);
  for (const m of html.matchAll(/Draft for review — not ready to publish/g)) found.add("draft banner");
  if (found.size) {
    problems += found.size;
    console.log(`✗ /${relative(root, f).replace(/index\.html$/, "")}: ${[...found].join(", ")}`);
  }
}
if (problems) {
  console.log(`\nNot ready to publish: ${problems} unresolved item(s). Fill them in src/content/site.ts.`);
  process.exit(1);
}
console.log(`✓ ${files.length} pages checked — no placeholders remain.`);
