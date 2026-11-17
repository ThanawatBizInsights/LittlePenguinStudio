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

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, featured game, mini matching game, story, parent info |
| `/games/animal-pairs/` | Game page (App Store **Marketing URL**) |
| `/about/` | Our Story |
| `/parents/` | For Parents: app details, privacy and support |
| `/support/` | Support (App Store **Support URL**) |
| `/privacy/` | Privacy overview (website practices + app policies) |
| `/privacy/animal-pairs/` | Animal Pairs privacy policy (App Store **Privacy Policy URL**), still a draft |

## Update studio and app details: `src/content/site.ts`

This is the single source of truth: studio name, publisher name, support/privacy email, site URL, game descriptions, App Store URL, app details table, screenshots, privacy status and verified claims.

- Empty values stay hidden. With no `supportEmail`, no mailto button is rendered. With no `appStoreUrl`, the game shows a status pill instead of a download link.
- App details set to `null` display **"Details to be confirmed"**.
- `claims` (ad-free, no purchases, offline, no data collected) stay `false` until verified in the release build.
- When the App Store link exists, set `status: "available"` and `appStoreUrl`. Optionally add Apple's official "Download on the App Store" badge from Apple's marketing resources.
- When the privacy policy is final, fill in its text in `src/app/privacy/[slug]/page.tsx`, then set `privacy.status: "published"` and `privacy.lastUpdated`.

## Replace artwork: `src/content/art.ts`

Drop transparent PNG/WebP files at the paths listed in `src/content/art.ts`, under `public/art/…`. Examples: `public/art/penguin-wave.webp` or `public/art/tiles/fox.webp`. Then rebuild. Each file automatically replaces its built-in SVG fallback, and the animal tiles are also used by the mini-game. Keep the original proportions; about 1200 px on the long side is plenty.

App screenshots go in `public/screenshots/<game>/` and are listed in the game's `screenshots` array. Only use real app captures.

To regenerate the favicon PNG and social image after design changes, run `npm run build`, then `npm run preview`, then `node scripts/make-images.cjs`.

## Add another game

1. Append a new object to `games` in `src/content/site.ts`, with a new `slug`.
2. Rebuild. The home "growing world" grid, support app selector, parents page, privacy overview, sitemap, and `/games/<slug>/` and `/privacy/<slug>/` pages are all generated from that list.
3. Optional: add key art for the game card in `src/components/GameParts.tsx` (`GameCard`).

## Deploy (when ready; not done yet)

In Cloudflare, go to Workers & Pages → Pages → Connect to Git and choose this repo, with these settings:
- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Output: `out`
- Environment variable: `NODE_VERSION=22`

`public/_headers` sets the security headers. See `docs/setup-guide.md` for the domain, email and App Store steps, and `TODO.md` for open items.
