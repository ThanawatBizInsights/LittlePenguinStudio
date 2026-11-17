# Little Penguin Studio website

Static site for littlepenguinstudio.com, hosted on Cloudflare Pages. Plain HTML + one CSS file, no build step.

## App Store URLs
| Field | URL |
|---|---|
| Support URL | https://littlepenguinstudio.com/apps/animal-pairs/support/ |
| Privacy Policy URL | https://littlepenguinstudio.com/apps/animal-pairs/privacy/ |
| Marketing URL | https://littlepenguinstudio.com/apps/animal-pairs/ |

## Preview locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy
Cloudflare Pages → Connect to Git → this repo. Framework preset: None. Build command: (empty). Build output directory: `/`. Production branch: `main`. Full steps: `docs/setup-guide.md`.

## Add a new app
1. Copy `apps/animal-pairs/` to `apps/<new-app>/` and edit the text.
2. Add a card to the "Our apps" grid in `index.html`.
3. Add its URLs to `sitemap.xml`.

## Rules
- No cookies, trackers or third-party scripts (kids-app privacy).
- No inline `style=` or `<script>`: the Content-Security-Policy in `_headers` blocks them.
- Open items: `TODO.md`.
