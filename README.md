# Little Penguin Studio website

Studio website for **littlepenguinstudio.com**, built with Next.js, TypeScript and Tailwind CSS. It is exported as a fully static site (`out/`) for Cloudflare Pages. It has no server, analytics, cookies, trackers or accounts.

## Run and preview

```bash
npm install
```
```bash
npm run dev          # live-reloading dev server at http://localhost:3000
```
```bash
npm run build        # static export to ./out
```
```bash
npm run preview      # serve ./out at http://localhost:3000 (what will be deployed)
```
```bash
npm run check        # typecheck + lint + build
```
```bash
npm run check:release   # build, then FAIL if any [PLACEHOLDER] or draft banner remains
```

**Do not deploy until `npm run check:release` passes.**

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, featured game, mini matching game, story, parent info |
| `/games/animal-pairs/` | Animal Pairs overview (App Store **Marketing URL**) |
| `/games/animal-pairs/support/` | Animal Pairs support (App Store **Support URL**) |
| `/games/animal-pairs/privacy/` | Animal Pairs privacy policy (App Store **Privacy Policy URL**) |
| `/about/` | Our Story |
| `/parents/` | For Parents: app details, privacy and support |
| `/support/` | Support hub (links to each game's support page) |
| `/privacy/` | Website privacy notice + links to each app's policy |

## Update studio and app details: `src/content/site.ts`

This is the single source of truth: studio name, publisher name, support/privacy email, site URL, game descriptions, App Store URL, app details table, screenshots, privacy status and verified claims.

- Empty values stay hidden. With no `supportEmail`, no mailto button is rendered. With no `appStoreUrl`, the game shows a status pill instead of a download link.
- App details set to `null` display **"Details to be confirmed"**.
- When the App Store link exists, set `status: "available"` and `appStoreUrl`. Optionally add Apple's official "Download on the App Store" badge from Apple's marketing resources.
- Support and privacy text for each game lives in `src/content/games/<slug>.tsx` (registered in `src/content/games/index.ts`). The Animal Pairs policy is based on a source audit (`docs/animal-pairs-privacy-audit.md`). Update both together whenever the app's data handling changes.
- When everything is confirmed, set `privacy.effectiveDate` and `privacy.status: "published"`. This removes the draft banner and allows search indexing.

## Replace artwork: `src/content/art.ts`

Drop transparent PNG/WebP files at the paths listed in `src/content/art.ts`, under `public/art/…`. Examples: `public/art/penguin-wave.webp` or `public/art/tiles/fox.webp`. Then rebuild. Each file automatically replaces its built-in SVG fallback, and the animal tiles are also used by the mini-game. Keep the original proportions; about 1200 px on the long side is plenty.

App screenshots, the app icon, the wordmark and character pictures live in `public/games/<slug>/`. They are listed in the game's entry in `site.ts`. Only use real captures from the working app as screenshots; concept mockups are design references only.

To regenerate the favicon PNG and social image after design changes, run `npm run build`, then `npm run preview`, then `node scripts/make-images.cjs`.

## Add another game

1. Append a new object to `games` in `src/content/site.ts`, with a new `slug`, and add its images under `public/games/<slug>/`.
2. Create `src/content/games/<slug>.tsx` with its support and privacy content (copy the Animal Pairs file as a template, then audit the new app), and register it in `src/content/games/index.ts`.
3. Rebuild. The home games grid, support hub, parents page, privacy overview, footer, sitemap and `/games/<slug>/`, `/games/<slug>/support/` and `/games/<slug>/privacy/` are all generated.

## Deploy to Cloudflare (Workers static assets)

The site is a Cloudflare **Worker with static assets** named `littlepenguinstudio`, built from GitHub by Workers Builds (production branch `main`). Everything is in `wrangler.toml`:
- `[assets]` serves `out/`, with a real 404 page and automatic trailing-slash redirects.
- `[build]` runs `npm run build:cloudflare` on every `wrangler deploy` and `wrangler versions upload`.

Node 22 is pinned in `.node-version`, and `public/_headers` sets the security headers.

**Git setup and test checklist:** [`docs/cloudflare-testing.md`](docs/cloudflare-testing.md).
- Leave the dashboard build command empty.
- Deploy command: `npx wrangler deploy`.
- Non-production branch deploy command: `npx wrangler versions upload`.
- Every non-`main` branch gets a preview URL.
- Builds of `main` run the release check and **fail on purpose while any placeholder remains**.

**From this machine:** set `CLOUDFLARE_API_TOKEN` (*Account → Workers Scripts → Edit*) and `CLOUDFLARE_ACCOUNT_ID`, then run:

```bash
npm run deploy:preview      # preview version with alias "preview" (not production)
```
```bash
npm run deploy:production   # refuses unless npm run check:release passes
```

**Indexing:** every build is `noindex` with `Disallow: /` in robots.txt unless the build variable `SITE_LIVE=true` is set. Set it only for production, on launch day.

**Test locally in Cloudflare's runtime** (applies `_headers`, redirects and the 404 page as Cloudflare will):

```bash
npm run preview:cloudflare   # http://localhost:8788
```

Do not attach the custom domain or set `SITE_LIVE` until `npm run check:release` passes. See `docs/setup-guide.md` for domain and email, and `TODO.md` for open items.
