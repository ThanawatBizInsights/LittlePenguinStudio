# Testing the website on Cloudflare

The repo is connected to Cloudflare Pages through GitHub. Each branch other than `main` gets its own **preview link** that you can open on any device. `main` is production, and it will not build until every placeholder is filled in.

## 1. Connect the repo (one time, ~5 minutes)

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** tab → **Import an existing Git repository**.
   (If Cloudflare offers to create a Worker instead, choose the **Pages** tab.)
2. **Connect GitHub.** When GitHub asks which repositories the Cloudflare Pages app may access, choose **Only select repositories** → `ThanawatBizInsights/LittlePenguinStudio`.
3. Select the repository and set:

   | Setting | Value |
   |---|---|
   | Project name | `littlepenguinstudio` |
   | Production branch | `main` |
   | Framework preset | None |
   | Build command | `npm run build:cloudflare` |
   | Build output directory | `out` |
   | Root directory | *(leave empty)* |
   | Environment variable | `NODE_VERSION` = `22` |

   Do **not** add `SITE_LIVE` yet.
4. Click **Save and Deploy**. The first build is for `main` (production) and **will fail** with “Not ready to publish”, listing the missing facts. That's the safety check doing its job: nothing is published to production.
5. Open the project → **Deployments**. If the work branch hasn't been built yet, trigger it: choose **Create deployment** or **Retry deployment** for branch `claude/lucid-clarke-ief7bj`, or push any change to that branch.
6. When it finishes, Cloudflare shows the preview link. It usually looks like
   `https://claude-lucid-clarke-ief7bj.littlepenguinstudio.pages.dev`
   (each individual build also gets a unique `https://<id>.littlepenguinstudio.pages.dev` link).

### Recommended: keep previews private
Previews still show yellow placeholders. In the project, go to **Settings** → **General** → **Access policy** → **Enable** (for preview deployments). Then only people you allow, e.g. your own email, can open preview links. Cloudflare emails you a one-time code when you open one.

## 2. What to check on the preview link

On **iPhone, iPad and a computer**:

- [ ] Home page: hero, the games section, and the mini matching game (play it to the end, then tap *Play again*).
- [ ] Menu: on a phone, tap **Menu**, open each link, and use the back button.
- [ ] Animal Pairs pages: open each one directly by typing the address:
  - `/games/animal-pairs/`
  - `/games/animal-pairs/support/`
  - `/games/animal-pairs/privacy/`
- [ ] Screenshots gallery: swipe through the iPhone and iPad rows on a phone.
- [ ] A made-up address such as `/hello` shows the “This page waddled away” page.
- [ ] Footer links all work.
- [ ] Optional: in Chrome on a computer, open DevTools → **Lighthouse** and run Performance and Accessibility.

Every preview is hidden from search engines (`noindex` and `robots.txt: Disallow`).

## 3. Going live (later)

1. Fill in every placeholder in `src/content/site.ts`, so that `npm run check:release` passes locally.
2. Merge the work into `main`. The production build now succeeds at `https://littlepenguinstudio.pages.dev`, still noindex.
3. Add the custom domain: **Custom domains** → `littlepenguinstudio.com` (and `www`).
4. Set the policy's effective date and `privacy.status: "published"`, add `SITE_LIVE` = `true` under **Settings → Variables and Secrets → Production**, and redeploy. The site is now indexable.

## Testing locally in Cloudflare's runtime

```bash
npm run preview:cloudflare
```

This builds the site and serves it at `http://localhost:8788` with Cloudflare's own Pages server, so `_headers`, trailing-slash redirects and the 404 page behave exactly as they will online.
