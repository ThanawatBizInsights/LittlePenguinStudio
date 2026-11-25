# Little Snowy Owl Studio (formerly Little Penguin Studio) — website, email & App Store readiness plan

> **Rebrand note (19 Nov 2026):** the studio is now **Little Snowy Owl Studio**, with Snowy the owl as mascot, and the intended domain is **littlesnowyowl.com**. References below to littlepenguinstudio.com and to @littlepenguinstudio.com addresses are from the original plan. The confirmed support email is still littlesnowysupport@icloud.com, and the Cloudflare Worker keeps the name `littlepenguinstudio`. Current setup: README.md and docs/cloudflare-testing.md.

> Note: the site has since been rebuilt with Next.js (see README.md). Phase B's file list is historical; URLs and deploy settings below are current.

## Context
You want www.LittlePenguinStudio.com as the studio home for Animal Pairs and future apps. App Store Connect needs a public **Support URL**, **Privacy Policy URL** (mandatory for a kids app), optional **Marketing URL**, and working contact emails. The launch pack (`Animal_Pairs_App_Store_Launch_Pack.md`) already drafts the support page, privacy policy and review notes; they need a home on the web and real email addresses.

Decisions made: **Individual** Apple enrollment, **send + receive** email on the domain, domain **not yet purchased**. The repo `LittlePenguinStudio` is empty (no commits), so the site starts from scratch.

## Answer: should you use Cloudflare?
Yes, for the **domain, DNS and website**. Not for the mailbox itself.
- **Cloudflare Registrar**: buy `littlepenguinstudio.com` at cost (~US$10/yr), free WHOIS privacy.
- **Cloudflare Pages**: free static hosting with HTTPS, auto-deploys from this GitHub repo.
- **Email**: Cloudflare Email Routing only *receives and forwards*; it can't send. Since you want to send as `support@`, use a real mailbox provider and put its MX/SPF/DKIM records in Cloudflare DNS:
  - **iCloud+ Custom Email Domain** — best if you already pay for iCloud+ (works in Apple Mail on iPhone/Mac, no extra cost).
  - **Zoho Mail Forever Free** — free, up to 5 users, web + mobile app.
  - **Google Workspace** (~US$7/user/mo) — if you want Gmail-style tooling.
  - Pick one; only one provider can own the domain's MX records.

**Important:** keep your **Apple Account (Apple ID) for the Developer Program on a personal address you'll always control** (e.g. your Gmail), not on the new domain. If the domain or mail plan ever lapses you'd otherwise lose account recovery and 2FA. Use the domain addresses for the *public-facing* roles below.

## Email addresses to create
| Address | Used for |
|---|---|
| `support@littlepenguinstudio.com` | App Store Support URL page, customer help |
| `privacy@littlepenguinstudio.com` | Privacy policy contact (alias of support is fine) |
| `appreview@littlepenguinstudio.com` | App Review contact in App Store Connect (alias) |
| `hello@littlepenguinstudio.com` | General / press (alias) |
One real mailbox + aliases is enough.

## Step-by-step plan

### Phase A — Accounts & domain (you do these; ~1 day)
1. Create a Cloudflare account (use personal email + 2FA).
2. Buy `littlepenguinstudio.com` in Cloudflare Registrar. Turn on auto-renew.
3. Set up the mailbox provider, add its DNS records in Cloudflare (MX, SPF `TXT`, DKIM, and a DMARC `TXT` starting with `p=none`, tightening to `p=quarantine` after a few weeks). Create the aliases above. Send/receive a test mail.
4. Enroll in Apple Developer Program as **Individual** (US$99/yr) with your personal Apple ID. Note: the App Store will show your **legal name** as the seller; "Little Penguin Studio" appears on your website and in the app. You can ask Apple to convert to an Organization later once you register a company and get a D-U-N-S number.
5. In App Store Connect: accept agreements; to sell the one-time Full Game Unlock in-app purchase, complete the **Paid Apps agreement, tax and banking**. Apple's standard EULA applies as the Terms of Use.

### Phase B — Website (I build this in the repo after approval)
Plain static HTML + one shared CSS file, no build step (simple to maintain; easy to add an app by copying a folder). Structure:
```
index.html                         Studio home: who we are, app grid
apps/animal-pairs/index.html       Marketing URL: description, screenshots, App Store badge (added after approval)
apps/animal-pairs/support/index.html   Support URL  ← launch pack §4
apps/animal-pairs/privacy/index.html   Privacy URL  ← launch pack §5 (placeholders kept visibly marked until audited)
privacy/index.html                 Studio-wide website privacy note
contact/index.html                 Contact emails
404.html
assets/css/site.css, assets/img/   Logo, Animal Pairs icon, favicon
_headers                           Cloudflare Pages security headers
robots.txt, sitemap.xml
```
Rules for the site: no third-party trackers, cookies or ad scripts (keeps the kids-app privacy story clean; optional Cloudflare Web Analytics is cookieless). Mobile-friendly. Accessible text sizes. Placeholders like `[PUBLISHER NAME]` kept and listed in a `TODO.md` so nothing unverified goes live by accident.

Work on branch `claude/lucid-clarke-ief7bj`, commit and push. Later merge to `main` (via PR when you ask) — `main` becomes the Cloudflare production branch.

### Phase C — Deploy (you connect, ~15 min)
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → `ThanawatBizInsights/LittlePenguinStudio`. Framework preset: Next.js (Static HTML Export). Build command: `npm run build`. Build output directory: `out`. Environment variable `NODE_VERSION=22`. Production branch: `main`.
2. Custom domains: add `littlepenguinstudio.com` and `www.littlepenguinstudio.com`; add a redirect rule www → apex (or the reverse — pick one canonical).
3. Every push to `main` redeploys; other branches get preview URLs for checking before going live.

### Phase D — Fill the App Store fields
| App Store Connect field | Value |
|---|---|
| Support URL | `https://littlepenguinstudio.com/games/animal-pairs/support/` |
| Privacy Policy URL | `https://littlepenguinstudio.com/games/animal-pairs/privacy/` |
| Marketing URL | `https://littlepenguinstudio.com/games/animal-pairs/` |
| Review contact email | `appreview@littlepenguinstudio.com` |
| Copyright | `2026 [Your legal name]` (Individual) |
Also link the privacy policy from the app's Parents area (behind the parental gate), as the launch pack requires.

### Phase E — Remaining launch-pack work (unchanged, from your pack)
Audit the release build/SDKs → finalize privacy policy & App Privacy answers; capture real iPhone (Dynamic Island) + 13" iPad screenshots; decide Kids category/age band; configure IAP + restore if shipping; complete review notes; upload build; manual release.

### Future apps
Copy `apps/animal-pairs/` to `apps/<new-app>/`, add a card on the home page, reuse the same support/privacy emails. Each app gets its own support + privacy URLs.

## Verification
- Locally: serve the folder (`python3 -m http.server`) and check every page with Playwright at phone and desktop widths; check all internal links resolve (no 404s).
- After deploy: open the three App Store URLs over HTTPS, confirm `www` redirects, confirm a test email to `support@` arrives and a reply sent *from* `support@` lands in Gmail without spam (check SPF/DKIM/DMARC pass in the headers).
- Grep the site for remaining `[` placeholders before submitting to Apple.

## Costs (approx.)
Domain ~US$10/yr · Cloudflare Pages free · email free (Zoho) or included in iCloud+ · Apple Developer US$99/yr.
