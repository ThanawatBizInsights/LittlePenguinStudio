# Before launch

Run `npm run check:release`. It must pass before anything is deployed.

## Facts to supply (`src/content/site.ts`)
- [ ] `studio.publisherName`: [LEGAL PUBLISHER NAME]. Must match the App Store seller (Individual enrollment: your legal name)
- [ ] `studio.supportEmail`: [SUPPORT EMAIL]
- [ ] `studio.privacyEmail`: [PRIVACY CONTACT EMAIL] (can be the same mailbox)
- [ ] `studio.supportEmailRetention`: [EMAIL RETENTION PERIOD], e.g. "12 months"
- [ ] Animal Pairs `privacy.effectiveDate`: [EFFECTIVE DATE], then `privacy.status: "published"`
- [ ] Animal Pairs `details.ageRating`: [AGE RATING], from App Store Connect's age-rating questionnaire (and Kids age band if used)
- [ ] Animal Pairs `details.availability`: e.g. countries/regions, once chosen
- [ ] After approval: `appStoreUrl` ([APP STORE URL]) and `status: "available"`. The App Store button then appears.

## iOS app (see docs/animal-pairs-privacy-audit.md)
- [ ] Set `AP_SUPPORT_URL` and `AP_PRIVACY_POLICY_URL` to the website URLs
- [ ] Add the System Boot Time required-reason API (35F9.1) to `PrivacyInfo.xcprivacy`
- [ ] Fix the "this iPad" strings, or make the app iPad-only and update the website
- [ ] Replace `com.example` bundle and product IDs
- [ ] Confirm the release build is built from the audited code; App Privacy answer: Data Not Collected, no tracking

## Website
- [ ] Optional: iPhone screenshots (current ones are iPad)
- [ ] Optional: plush artwork files for `src/content/art.ts`
- [ ] Domain, mailbox and Cloudflare Pages (`docs/setup-guide.md`)
