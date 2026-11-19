# Before launch

Run `npm run check:release`. It must pass before anything is deployed.

## Facts to supply (`src/content/site.ts`)
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
- [ ] Connect littlesnowyowl.com to the Worker; after HTTPS works set `SITE_URL` (see README → Domain)
- [ ] Domain, mailbox and Cloudflare Pages (`docs/setup-guide.md`)

## Animal Pairs Plus (added 19 Nov 2026)
- [ ] Recapture the iPhone and iPad **set-up screenshots** from the current build: the existing ones show the 12-card board without a lock (older build). Only the 6-card board is free now.
- [ ] iOS: set `AP_TERMS_OF_USE_URL` to Apple's standard EULA (`https://www.apple.com/legal/internet-services/itunes/dev/stdeula/`), and add the same link to the App Store description.
- [ ] iOS: add System Boot Time (`35F9.1`) to `PrivacyInfo.xcprivacy` (`systemUptime` in `AudioManager.swift`).
- [ ] App Store Connect: create the Animal Pairs Plus subscription (monthly, Family Sharing off) with the final product ID.
