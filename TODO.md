# Before launch

## Real-world details (edit `src/content/site.ts`)
- [ ] `studio.publisherName`: your legal name (Individual Apple enrollment)
- [ ] `studio.supportEmail` / `studio.privacyEmail`: once the domain mailbox works
- [ ] Animal Pairs `details`: age rating, internet requirements, advertising, in-app purchases, availability
- [ ] Confirm or adjust `supportedDevices` ("iPhone and iPad") and `supportedLanguages` ("English") against the release build
- [ ] `claims`: set to `true` only what the release build proves
- [ ] After App Store approval: `appStoreUrl`, `status: "available"`, optional official badge

## Artwork
- [ ] Export the plush artwork sheets as individual transparent files at the paths in `src/content/art.ts`
- [ ] Add real iPhone and iPad screenshots to `public/screenshots/animal-pairs/` and list them in `site.ts`
- [ ] Regenerate `public/og-image.png` and `public/apple-touch-icon.png` (`node scripts/make-images.cjs`)

## Privacy
- [ ] Audit the release build and every SDK, then write the final Animal Pairs policy (`src/app/privacy/[slug]/page.tsx`)
- [ ] Set `privacy.status: "published"` and `lastUpdated`, which removes the Draft banner and lets search engines index the page
- [ ] App Store Connect App Privacy answers must match the published policy

## Domain and hosting (`docs/setup-guide.md`)
- [ ] Buy littlepenguinstudio.com, set up the mailbox and DNS (SPF/DKIM/DMARC)
- [ ] Connect Cloudflare Pages (build `npm run build`, output `out`), add the apex and www domains
- [ ] Choose the canonical host (apex) and redirect www to it
