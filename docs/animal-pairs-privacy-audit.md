# Animal Pairs — privacy audit for the website policy

**What was audited:** the Animal Pairs iOS source, repository `ThanawatBizInsights/AnimalPairs`, branch `claude/animal-pairs-ipad-game-w6w7n5`, commit `2b39570` ("Remove the first-launch introduction page; every launch opens Home"), on 17 November 2026.

**Method:** a static review of the source code, Xcode project settings, Info.plist, privacy manifest and in-app text. No compiled release binary (.ipa) was inspected, and the app was not run with network monitoring. **Before publishing, confirm that the build uploaded to App Store Connect is built from this code (or re-run these checks on the final commit).**

## Update: re-check at commit `64888ba` (19 November 2026)

The paid tier changed after the original audit. At `64888ba` ("Rename SubscriptionRenewalState to avoid a clash with StoreKit") on the same branch:

- **Free tier:** Classic mode on the 6-card board only (`starterBoards = [.six]`, `starterModes = [.classic]`). The 12-, 16- and 20-card boards and Exact Pose need the paid tier.
- **Paid tier:** "Animal Pairs Plus", one auto-renewing **monthly subscription** (StoreKit 2). Parents area buttons: "Subscribe to Animal Pairs Plus", "Restore Purchases", "Manage Subscription", "Redeem Offer Code". Family Sharing is off. The price comes from StoreKit and is never hard-coded. Ask to Buy shows as pending. The one-time "Full Game Unlock" and gift codes in the table below are **superseded**.
- **New local storage:** the cached ID of the last verified subscription transaction **and the end date of its current period**, so Plus keeps working offline until that date (never longer). Still UserDefaults, still on the device only.
- **Unchanged:** no new packages, network calls, permissions, accounts or data collection. App Privacy answers stay "Data Not Collected" / no tracking.
- **Still open:** `systemUptime` remains in `AudioManager.swift` without a System Boot Time (`35F9.1`) entry in `PrivacyInfo.xcprivacy` (issue 2 below). `AP_TERMS_OF_USE_URL` is empty: set it to Apple's standard EULA, `https://www.apple.com/legal/internet-services/itunes/dev/stdeula/` (the website now links the same page). Apple requires a working Terms of Use link in the app and in the App Store description for auto-renewing subscriptions.

The website policy (`src/content/games/animal-pairs.tsx`) was updated to describe the subscription.

## Findings

| Area | Result | Evidence |
|---|---|---|
| Third-party SDKs / packages | None. Only a local Swift package (`AnimalPairsKit`, Foundation only) | `project.pbxproj` has only `XCLocalSwiftPackageReference "Packages/AnimalPairsKit"`; no Package.resolved, Podfile or Cartfile |
| Analytics, crash reporting, ads, tracking | None | No Firebase, Crashlytics, Sentry, AdMob or other SDK; no `ASIdentifierManager` or `ATTrackingManager`; `NSPrivacyTracking = false` |
| Network calls by the app | None of its own. No `URLSession`, sockets or web views | The only URL use is `openURL` for the privacy and support links in `ParentsView.swift` |
| StoreKit | StoreKit 2: one non-consumable "Full Game Unlock"; purchase, `offerCodeRedemption` (gift codes, Apple's sheet) and `AppStore.sync()` restore; `Transaction.updates` observed | `Purchases/PurchaseManager.swift` |
| Backend server | Exists in `backend/` but is **not called by the app** ("the app does not call it today") | `backend/README.md`; no backend URL in app code or Info.plist |
| Permissions | None requested: no `NS…UsageDescription` keys | Info.plist and build settings |
| Accounts / sign-in / chat | None | — |
| iCloud / CloudKit sync | None: no entitlements file, no CloudKit or ubiquity APIs | — |
| Local storage: UserDefaults | Sound, music and voice switches; last mode and board size; cached ID of the last verified StoreKit transaction for the unlock; a debug-only flag compiled out of Release | `SettingsStore.swift`, `PurchaseManager.swift` |
| Local storage: SwiftData | Completed rounds: round UUID, mode, board size, attempts, hints used, pair count, start and end time (newest 100 listed, totals kept) | `Persistence/HistoryStore.swift` (Application Support/History) |
| Local storage: JSON file | Snapshot of the unfinished round (tile layout, attempts, hints, timestamps) | `RoundSnapshotStore.swift` (Application Support/Rounds) |
| Deletion | Parents → Reset progress clears history and snapshot (not purchases); deleting the app removes everything | `AppModel.resetProgress()` |
| Parental gate | Home gear → multiplication question → Parents. Purchases, gift codes, restore, settings, reset and **both external links** are only in Parents. Access is revoked on leaving, on backgrounding and after 5 minutes | `AppModel.swift`, `ParentsView.swift`, `ParentalGate.swift` |
| Audio | Ambient session with `.mixWithOthers`: follows the Ring/Silent switch and does not interrupt other audio | `AudioSessionController.swift` |
| Devices | `TARGETED_DEVICE_FAMILY = 1,2` (iPhone and iPad), iOS 17.0+, English only | `project.pbxproj`, `CFBundleLocalizations` |
| Category | `public.app-category.kids-games` | build settings |
| Export compliance | `ITSAppUsesNonExemptEncryption = false` | Info.plist |

## Recommended App Store Connect "App Privacy" answers

These match the published policy if the release build matches the audited code:

- **Data collection:** "No, we do not collect data from this app" → label **Data Not Collected**. Apple defines "collect" as transmitting data off the device in a way that lets you or third-party partners access it. Animal Pairs stores data only on the device, and StoreKit purchases are processed by Apple as the platform provider.
- **Tracking:** No.

If anything is added later (analytics, crash reporting, the backend, iCloud sync, a contact form), the App Privacy answers **and** the website policy must change before that version ships.

## Issues to fix in the iOS project before submission

1. **Set the website URLs** in the AnimalPairs target's build settings (both configurations):
   - `AP_SUPPORT_URL = https://littlepenguinstudio.com/games/animal-pairs/support/`
   - `AP_PRIVACY_POLICY_URL = https://littlepenguinstudio.com/games/animal-pairs/privacy/`
   
   Both links are already behind the parental gate (Parents area only). Until they are set, the app shows "Not configured yet".
2. **Privacy manifest missing a required-reason API.** `ProcessInfo.processInfo.systemUptime` is used in `AudioManager.swift` and `BackgroundMusicPlayer.swift`. Add `NSPrivacyAccessedAPICategorySystemBootTime` with reason `35F9.1` (measuring elapsed time between in-app events) to `PrivacyInfo.xcprivacy`, or App Store Connect will report a missing declaration at upload.
3. **"iPad" wording vs. iPhone support.** The target builds for iPhone and iPad, but five in-app strings say "this iPad". Examples are the privacy summary ("game progress stays on this iPad"), "Progress on this iPad" and the reset confirmation. Either change them to "this device", or make the app iPad-only (`TARGETED_DEVICE_FAMILY = 2`) and update the website's supported-devices text to match. The app README also says iPad.
4. **Placeholder identifiers:** `PRODUCT_BUNDLE_IDENTIFIER = com.example.AnimalPairs` and `AP_FULL_UNLOCK_PRODUCT_ID = com.example.animalpairs.fullgame` must be replaced with your own before creating the app and in-app purchase in App Store Connect. Also update the matching entry in `Config/Products.storekit`.
5. **In-app privacy summary:** it already agrees with the website policy. Keep the two in sync.
