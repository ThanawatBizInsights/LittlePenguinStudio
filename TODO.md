# Before launch

Run `npm run check:release`. It must pass before anything is deployed.

## Facts to supply (`src/content/site.ts`)
The draft banner stays until **all** of these are filled: publisher name, effective date, age rating and availability.
- [ ] `studio.publisherName`: [LEGAL PUBLISHER NAME]. Must match the App Store seller (Individual enrollment: your legal name)
- [x] Support and privacy email: littlepenguinsupport@icloud.com (set 18 Nov 2026)
- [x] Support email retention: "12 months after the last reply". Only true if you actually delete emails on that schedule
- [ ] Animal Pairs `privacy.effectiveDate`: [EFFECTIVE DATE], then `privacy.status: "published"`
- [ ] Animal Pairs `details.ageRating`: [AGE RATING], from App Store Connect's age-rating questionnaire (and Kids age band if used)
- [ ] Animal Pairs `details.availability`: [COUNTRIES OR REGIONS] from App Store Connect
- [x] App checked on iPhone (screenshots supplied 17 Nov 2026 and added to the game page)
- [ ] After approval: `appStoreUrl` ([APP STORE URL]) and `status: "available"`. The App Store button then appears.

## iOS app (see docs/animal-pairs-privacy-audit.md)
- [ ] Set `AP_SUPPORT_URL` and `AP_PRIVACY_POLICY_URL` to the website URLs
- [ ] Add the System Boot Time required-reason API (35F9.1) to `PrivacyInfo.xcprivacy`
- [ ] Fix the "this iPad" strings, or make the app iPad-only and update the website
- [ ] Replace `com.example` bundle and product IDs
- [ ] Confirm the release build is built from the audited code; App Privacy answer: Data Not Collected, no tracking

## Website
- [ ] Cloudflare → Workers & Pages → littlepenguinstudio → Settings → Build → Branch control: set the **production branch to `main`** (it is still `claude/lucid-clarke-ief7bj`, the GitHub default branch), then merge the finished work into `main`
- [ ] Terms of Use page for the Animal Pairs Plus subscription: none on the site yet. Either publish your own terms, or use Apple's standard EULA and link to it from the app (`AP_TERMS_OF_USE_URL`) and the App Store description
- [x] Animal Pairs pages describe the Animal Pairs Plus monthly subscription (free = Classic with 6 cards), 18 Nov 2026
- [ ] Optional: plush artwork files for `src/content/art.ts`
- [ ] Domain, mailbox and Cloudflare Pages (`docs/setup-guide.md`)
