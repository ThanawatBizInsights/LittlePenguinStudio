// Regenerates public/apple-touch-icon.png and public/og-image.png.
// Usage: npm run build && (serve out on :3000) && node scripts/make-images.cjs
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const svg = fs.readFileSync(path.join(__dirname, "../public/favicon.svg"), "utf8");
  const p = await b.newPage({ viewport: { width: 180, height: 180 } });
  await p.setContent(`<body style="margin:0;background:#fbf4e8;display:grid;place-items:center;height:180px">${svg.replace("<svg ", '<svg width="150" height="150" ')}</body>`);
  await p.screenshot({ path: path.join(__dirname, "../public/apple-touch-icon.png") });
  const o = await b.newPage({ viewport: { width: 1500, height: 788 }, deviceScaleFactor: 0.8, reducedMotion: "reduce" });
  await o.goto(process.env.SITE || "http://localhost:3000/");
  await o.screenshot({ path: path.join(__dirname, "../public/og-image.png") });
  await b.close();
})();
