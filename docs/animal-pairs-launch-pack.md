# Animal Pairs — App Store launch pack

Prepared 17 November 2026. Draft for the English-language iPhone and iPad release. Replace every bracketed field and verify features against the final release build before submission.

## 1. Submission materials and decisions

| Item | Status / action |
|---|---|
| Apple Developer Program membership and agreements | Account holder to confirm active membership and accept current agreements. |
| App identity | Confirm developer/publisher name, final app name, bundle ID, version 1.0, build number, SKU, and English primary language in Xcode and App Store Connect. |
| Supported devices | Confirm iPhone and iPad destinations; test the release build on both. |
| App icon | Attached plush icon with Momo, Iris and Nori is a candidate. Put the approved 1024 × 1024 artwork into Xcode's AppIcon asset and check the icon at small sizes; use the final app icon in the store listing. |
| Store text | English draft below; verify every feature claim. |
| Screenshots | At least one actual app screenshot for the required iPhone Dynamic Island size and one for 13-inch iPad. Prepare 3–5 per device; do not submit concept art as gameplay captures. |
| Category and age | Decide Games and whether to select Made for Kids; select the appropriate Kids age band if applicable. Complete the age-rating questionnaire accurately. |
| Support URL | Publish the draft support page below at a stable public HTTPS URL and supply a working email. |
| Privacy policy URL | Audit actual data use and SDKs, complete the conditional policy below, publish a public HTTPS URL, and link it from the app. Complete App Privacy answers to match. |
| Business model | Confirm free, paid, or free with Full Game Unlock. If the non-consumable purchase exists, configure and submit it with the first app version, including reviewer access and restore flow. |
| App review information | Supply contact details, explanation of the parental gate and purchase, and any account or feature access steps. Draft below. |
| Availability and release | Choose countries, price and tax/banking setup if selling, then choose manual release after approval. |
| Rights | Keep evidence of rights or commercial-use permissions for artwork, music and sounds, including generated assets and any third-party material. |
| Export compliance | Answer Apple's encryption questions according to the built app and its dependencies. |

## 2. App Store listing copy — draft

**Name:** Animal Pairs

**Subtitle:** A gentle animal matching game

**Keywords:** memory,matching,animals,pairs,puppy,kitten,elephant,play,learning

**Promotional text:** Meet ten adorable animal friends in a colorful matching game made for little hands and curious minds.

**Description:**

Meet Momo the puppy, Iris the kitten, Nori the elephant, and seven more animal friends in Animal Pairs, a gentle matching game filled with soft colors and playful character art.

Turn over cards, remember what you saw, and find the matching pairs. Explore the animals and their different poses as you play. Friendly sounds celebrate each successful match, and separate music and sound controls let families choose how the game sounds.

Animal Pairs is designed for simple, touch-friendly play on iPhone and iPad.

[Before submission: confirm which matching modes, pose collections, parent controls and premium features actually appear in the release build. Mention any purchase or unlock clearly if the listing describes its content. Remove claims that are not verified.]

**Primary category:** Games [confirm subcategory in App Store Connect].

**Suggested age-band decision:** Evaluate Made for Kids, 5 and under versus 6–8, based on the actual intended audience and parental gate implementation. Do not select a band solely from this draft.

## 3. Screenshot capture and captions

Use the final installed app with representative, solvable game states. Keep controls visible, hide personal notifications and debugging UI, and avoid using generated home-screen mockups as actual app screenshots.

| Order | Actual screen to capture | Optional short overlay |
|---|---|---|
| 1 | Home with title, Iris and Play | Meet the Animal Pairs friends |
| 2 | Board with some cards face down and a revealed animal | Flip, remember, and match |
| 3 | Successful pair with its feedback | Every match feels rewarding |
| 4 | Pose or mode selection, only if present in release build | More ways to play |
| 5 | Settings or Parents area, if useful and accurate | Made for family play |

Capture both iPhone Dynamic Island and 13-inch iPad required placements using supported simulators or actual devices of suitable size. The supplied `IMG_1090`–`IMG_1094` captures are 1423 × 2048 and show an iPad session; inspect each for current UI and export fresh captures at the required App Store Connect sizes. The attached illustrated iPhone and iPad concepts are reference art, not evidence of implemented screens.

## 4. Support page — publication draft

# Animal Pairs Support

Animal Pairs is a matching game for iPhone and iPad. If you need help with the game, audio settings, an unlock, or restoring a purchase, contact [SUPPORT EMAIL].

When contacting us, please include your device model, iOS or iPadOS version, app version, and a brief description of the issue. Please do not send children's personal information.

**Sound or music:** Open Settings in Animal Pairs and check the separate Music and Sound Effects controls. Also check your device volume and audio output.

**Restore a purchase:** If Full Game Unlock is offered in your version, open the Parents area and choose Restore Purchases. Use the same Apple Account that made the purchase. [Verify the exact navigation and wording.]

**Privacy:** Read our privacy policy at [PUBLIC PRIVACY POLICY URL].

Publisher: [PUBLISHER NAME]. Last updated: [DATE].

## 5. Privacy policy — conditional draft; audit required

# Animal Pairs Privacy Policy

Last updated: [DATE]. Publisher: [LEGAL NAME]. Contact: [PRIVACY EMAIL].

Animal Pairs is a children's matching game. This policy explains what information the released app handles. **Do not publish the following claims until the release binary and every included SDK have been audited.**

**Data handled by the app:** [Specify whether game progress and audio preferences are stored locally, synced to iCloud, or transmitted to any server. List each data type and purpose.]

**Accounts and purchases:** [State whether accounts exist. If Full Game Unlock uses Apple In-App Purchase, explain that Apple processes the transaction and that the app checks purchase entitlement. Describe any transaction data your app or server receives.]

**Analytics, ads and third parties:** [List each SDK, analytics service, advertising network or crash-reporting provider, or say none only after verifying the release build. State any data each receives.]

**Children's information:** [Explain whether the app collects personal information from children. Describe any parental consent process if applicable.]

**Retention and deletion:** [Explain how locally stored progress can be reset and how a parent can request deletion of any server data, if any.]

**External links:** [Describe any links, and verify they are behind a parental gate if Made for Kids applies.]

**Changes and contact:** We may update this policy when the app changes. Questions may be sent to [PRIVACY EMAIL].

The final App Store Connect App Privacy answers must match this published policy and actual app behavior. Add a link to the policy in the app's Parents area.

## 6. Notes for App Review — draft

Animal Pairs is an English-language animal matching game intended for [AGE BAND]. The player taps Play, chooses [MODE/BOARD OPTIONS], reveals cards, and finds matching animals and poses. Music and effects can be controlled separately in Settings.

[If applicable: The Parents section is accessed by [EXACT STEPS]. It contains a non-consumable Full Game Unlock purchase, Redeem Gift Code using Apple's system, and Restore Purchases. The purchase unlocks [EXACT FEATURES]. No custom license key is used. Please review the free mode and premium entitlement using [REVIEW STEPS].]

[If applicable: The app does not require login or network access for ordinary matching play. Confirm in the release build.]

Support: [PUBLIC SUPPORT URL]. Privacy policy: [PUBLIC PRIVACY POLICY URL]. Review contact: [NAME, EMAIL, PHONE].

## 7. Final verification before upload

1. Review every user-visible screen on physical iPhone and iPad, including orientation, safe areas and accessibility text sizing.
2. Confirm all ten character assets, the new Football/Golf/Cooking poses, and each matching mode are packaged and that Stretch no longer appears if intentionally removed.
3. Confirm background music, card sounds, animal match sounds, mute settings, interruptions and relaunch behavior.
4. Check the parental gate, links, purchase, gift-code redemption and Restore Purchases if those features are shipping.
5. Compare the release build against the listing, privacy policy, review notes and screenshots. Resolve all placeholders before submission.
6. Archive and upload the release build, complete metadata and questionnaires, submit for review, then manually release after approval.

## Official references

- Screenshot specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications
- App privacy: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- Product page: https://developer.apple.com/app-store/product-page/
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Submission overview: https://developer.apple.com/app-store/submitting/
