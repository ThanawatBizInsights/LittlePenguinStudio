# Testing the website on Cloudflare

The site is deployed as a **Cloudflare Worker with static assets**, built from GitHub by **Workers Builds**. Cloudflare's dashboard now creates a Worker (not a classic Pages project) when you import a Git repository; `wrangler.toml` is set up for that.

How it behaves:

- **Production (`main`)**: the build runs the release check and **fails on purpose while any placeholder remains**, so a draft can never be deployed to production. This happens inside `wrangler deploy` (via `[build]` in `wrangler.toml`), whatever build command the dashboard has.
- **Every other branch**: builds a **preview** with its own link that you can open on any device.
- Every build is hidden from search engines (`noindex`, `robots.txt: Disallow`) until `SITE_LIVE=true` is set on launch day.

## 1. Settings in the Cloudflare dashboard (one time)

Open **dash.cloudflare.com → Workers & Pages → `littlepenguinstudio`** (the Worker created when you imported the repo).

**Settings → Build:**

| Setting | Value |
|---|---|
| Git repository | `ThanawatBizInsights/LittlePenguinStudio` |
| Production branch (Branch control) | `main` |
| Builds for non-production branches | **Enabled** |
| Build command | *(leave empty — `wrangler.toml` runs the build)* |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Root directory | `/` *(default)* |

The Worker's name in the dashboard must be **`littlepenguinstudio`**, matching `name` in `wrangler.toml`.

**Settings → Domains & Routes:** make sure **workers.dev** and **Preview URLs** are enabled. Preview links only exist when Preview URLs are on.

**Recommended while placeholders are visible:** preview links are public by default. Where Cloudflare offers it next to *Preview URLs*, turn on **Cloudflare Access** so that only your email can open them.

## 2. Build a preview

Builds start when a branch is pushed. After changing the settings above, either:

- open **Deployments / Builds**, find the latest build for branch `claude/lucid-clarke-ief7bj` and choose **Retry**, or
- ask Claude to push the next change.

When the build finishes, the build log (and the GitHub commit check) shows the **preview URL**. It usually looks like
`https://claude-lucid-clarke-ief7bj-littlepenguinstudio.<your-subdomain>.workers.dev`
(each build also has its own version URL).

A failed build for `main` that says **“Not ready to publish”** is expected until every placeholder in `src/content/site.ts` is filled in.

## 3. What to check on the preview link

On **iPhone, iPad and a computer**:

- [ ] Home page: hero, the games section, and the mini matching game (play to the end, then tap *Play again*).
- [ ] Menu: on a phone, tap **Menu** and open each link.
- [ ] Animal Pairs pages: open each one directly by typing the address:
  - `/games/animal-pairs/`
  - `/games/animal-pairs/support/`
  - `/games/animal-pairs/privacy/`
- [ ] Screenshots gallery: swipe through the iPhone and iPad rows on a phone.
- [ ] A made-up address such as `/hello` shows the “This page waddled away” page.
- [ ] Footer links all work.
- [ ] Optional: in Chrome DevTools → **Lighthouse**, run Performance and Accessibility.

## 4. Going live (later)

1. Fill in every placeholder in `src/content/site.ts`, so that `npm run check:release` passes.
2. Merge the work into `main`. The production build now deploys to `https://littlepenguinstudio.<your-subdomain>.workers.dev`, still noindex.
3. **Settings → Domains & Routes → Add → Custom domain:** `littlepenguinstudio.com` (and `www`).
4. Set the policy's effective date and `privacy.status: "published"`. Add the build variable `SITE_LIVE` = `true` (**Settings → Build → Variables**, production only), and redeploy. The site is now indexable.

## Testing locally in Cloudflare's runtime

```bash
npm run preview:cloudflare
```

This builds the site and serves it at `http://localhost:8788` with Wrangler's local Workers runtime, so `_headers`, trailing-slash redirects and the 404 page behave as they will online.

### Deploying from the command line instead of Git
With `CLOUDFLARE_API_TOKEN` (Account → Workers Scripts → Edit) and `CLOUDFLARE_ACCOUNT_ID` set:

```bash
npm run deploy:preview      # uploads a preview version with the alias "preview"
```
```bash
npm run deploy:production   # refuses unless npm run check:release passes
```
