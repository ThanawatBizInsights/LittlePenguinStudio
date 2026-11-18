// Regenerates public/og-image.png (social-sharing image) from the homepage hero.
// Favicons and the Apple touch icon come from scripts/build-brand-art.py.
// Usage: npm run build && (serve out on :3000) && node scripts/make-images.cjs
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const o = await b.newPage({ viewport: { width: 1500, height: 788 }, deviceScaleFactor: 0.8, reducedMotion: "reduce" });
  await o.goto(process.env.SITE || "http://localhost:3000/", { waitUntil: "networkidle" });
  await o.screenshot({ path: path.join(__dirname, "../public/og-image.png") });
  await b.close();
})();
