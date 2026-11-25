# Before launch

Run `npm run check:release`. It must pass before anything is deployed.

## Facts to supply (`src/content/site.ts`)
- [ ] `studio.publisherName`: [LEGAL PUBLISHER NAME]. Must match the App Store seller (Individual enrollment: your legal name)
- [x] Support and privacy email: littlesnowysupport@icloud.com (changed 25 Nov 2026 from littlepenguinsupport@icloud.com)
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

## Full Game Unlock (19 Nov 2026; replaces the Animal Pairs Plus subscription)
- [x] Website copy: free Classic 6 and 12; one-time Full Game Unlock adds Classic 16/20, Exact Pose at every size, 70 more pictures
- [ ] App Store Connect: create the non-consumable **Full Game Unlock**, product ID `com.littlepenguinstudio.animalpairs.fullgame`; choose price and Family Sharing; submit it with the app version
- [ ] Do not create (or remove from sale) the Animal Pairs Plus subscription
- [ ] iOS: add System Boot Time (`35F9.1`) to `PrivacyInfo.xcprivacy` (`systemUptime` in `AudioManager.swift`)
- [ ] The existing set-up screenshots (6 and 12 free, Exact Pose locked) match the free tier again; recapture only if the build looks different
