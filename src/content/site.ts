/**
 * Little Snowy Owl Studio — shared site content and configuration.
 *
 * This is the ONE place to update studio details, contact emails, game
 * descriptions, app facts and screenshots. Every page reads from here.
 *
 * Rules:
 * - Leave a value as "" or null until it is confirmed. Pages then show a
 *   highlighted [PLACEHOLDER] (on support/privacy pages) or "Details to be
 *   confirmed", and `npm run check:release` fails until it is filled in.
 * - App facts below were verified against the Animal Pairs iOS source
 *   (see docs/animal-pairs-privacy-audit.md). Re-check them against the
 *   final release build before submission.
 */

/** A fact that is either confirmed (a string) or still unknown (`null`). */
export type Confirmable = string | null;

export type GameStatus = "in-development" | "coming-soon" | "available";

export type Screenshot = {
  /** Path under /public */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  device: "iPhone" | "iPad";
};

export type Character = { name: string; animal: string; image: string };

export type AppDetails = {
  ageRating: Confirmable;
  supportedDevices: Confirmable;
  supportedLanguages: Confirmable;
  internetRequirements: Confirmable;
  advertising: Confirmable;
  inAppPurchases: Confirmable;
  availability: Confirmable;
};

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  /** One-sentence description used on cards and the homepage. */
  summary: string;
  /** Longer description paragraphs for the game page. */
  description: string[];
  howToPlay: string[];
  modes: { name: string; text: string; fullGame: boolean }[];
  boards: { cards: number; layout: string; fullGame: boolean }[];
  characters: Character[];
  /** Real app icon and wordmark (brand assets from the app project). */
  icon: string;
  wordmark: string;
  status: GameStatus;
  /** Real App Store URL. Leave "" until the app is live — no button is shown otherwise. */
  appStoreUrl: string;
  /** Real screenshots captured from the working app. Never concept art. The first iPad one is used as key art. */
  screenshots: Screenshot[];
  details: AppDetails;
  /** Optional purchase, if it exists in the release build. */
  fullGameUnlock: null | {
    name: string;
    adds: string[];
    free: string[];
  };
  privacy: {
    /** "draft" until every placeholder is resolved and the release build is re-checked. */
    status: "draft" | "published";
    effectiveDate: Confirmable;
  };
  accent: "butter" | "mint" | "lilac" | "coral" | "cobalt";
};

export type Studio = {
  /** Visible brand. */
  name: string;
  /** The studio mascot's name. */
  mascotName: string;
  /** Legal publisher name — must match the App Store seller (Individual: your legal name). */
  publisherName: string;
  supportEmail: string;
  privacyEmail: string;
  /** How long support emails are kept, e.g. "12 months". */
  supportEmailRetention: string;
  /**
   * Public origin used for social-image URLs and (only when SITE_LIVE=true)
   * canonical tags and the sitemap. Set the build variable SITE_URL once the
   * custom domain is connected and serves HTTPS.
   */
  siteUrl: string;
  tagline: string;
  description: string;
  story: string;
};

/**
 * Working support mailbox (supplied by the owner, 18 Nov 2026).
 * The privacy contact uses the same address.
 */
const SUPPORT_EMAIL = "littlepenguinsupport@icloud.com";

/** Intended custom domain (not yet connected). Override with the SITE_URL build variable. */
export const PLANNED_SITE_URL = "https://littlesnowyowl.com";

export const studio: Studio = {
  name: "Little Snowy Owl Studio",
  mascotName: "Snowy",
  /**
   * The EXACT seller name shown in your Apple Developer account / App Store
   * Connect (Individual enrollment: your legal name). Never the brand name.
   */
  publisherName: "",
  supportEmail: SUPPORT_EMAIL,
  privacyEmail: SUPPORT_EMAIL,
  /**
   * Only true if support emails are actually deleted 12 months after the
   * last reply. Change this text if the practice changes.
   */
  supportEmailRetention: "12 months after the last reply",
  siteUrl: (process.env.SITE_URL || PLANNED_SITE_URL).replace(/\/+$/, ""),
  tagline: "Playful little worlds for curious minds.",
  description:
    "Little Snowy Owl Studio creates playful little worlds for children and families.",
  story:
    "Little Snowy Owl Studio creates playful little worlds for children and families. Our journey begins with Animal Pairs, with more adventures to come.",
};

const ap = "/games/animal-pairs";

export const games: Game[] = [
  {
    slug: "animal-pairs",
    title: "Animal Pairs",
    tagline: "A gentle animal matching game",
    summary:
      "Meet friendly animals, discover matching pairs, and enjoy little moments of play together.",
    description: [
      "Ten soft animal friends hide under paw-print cards. Turn two cards over, remember where everyone is, and find the matching pairs. Matched pairs stay face up with a little green tick, and each friend makes a happy sound when their pair is found.",
      "There are no timers and no lives — just calm, unhurried play. A gentle Hint button is always there if little ones need a nudge.",
      "Animal Pairs is designed for young children, with large cards, simple controls, and settings and purchases kept in a Parents area behind a grown-ups check.",
    ],
    howToPlay: [
      "Tap Play, then choose a way to play and how many cards you’d like.",
      "Tap a card to turn it over and meet the animal underneath.",
      "Tap a second card. If the two match, they stay face up. If not, they turn back over — try to remember where they were!",
      "Find every pair to finish the board. Stuck? Tap Hint.",
    ],
    modes: [
      { name: "Classic", text: "Match two cards of the same animal.", fullGame: false },
      {
        name: "Exact Pose",
        text: "The board mixes different poses of the same friends. A pair must be the same animal and the same pose.",
        fullGame: true,
      },
    ],
    boards: [
      { cards: 6, layout: "3 × 2", fullGame: false },
      { cards: 12, layout: "4 × 3", fullGame: false },
      { cards: 16, layout: "4 × 4", fullGame: true },
      { cards: 20, layout: "5 × 4", fullGame: true },
    ],
    characters: [
      { name: "Momo", animal: "puppy", image: `${ap}/characters/momo.webp` },
      { name: "Iris", animal: "kitten", image: `${ap}/characters/iris.webp` },
      { name: "Nori", animal: "elephant", image: `${ap}/characters/nori.webp` },
      { name: "Sprout", animal: "little dinosaur", image: `${ap}/characters/sprout.webp` },
      { name: "Mochi", animal: "bunny", image: `${ap}/characters/mochi.webp` },
      { name: "Sunny", animal: "duckling", image: `${ap}/characters/sunny.webp` },
      { name: "Maple", animal: "bear cub", image: `${ap}/characters/maple.webp` },
      { name: "Clover", animal: "turtle", image: `${ap}/characters/clover.webp` },
      { name: "Rusty", animal: "red panda", image: `${ap}/characters/rusty.webp` },
      { name: "Pebble", animal: "penguin", image: `${ap}/characters/pebble.webp` },
    ],
    icon: `${ap}/app-icon.webp`,
    wordmark: `${ap}/wordmark.webp`,
    status: "in-development",
    /** Leave "" until the app has a live App Store product URL; the App Store button stays hidden until then. */
    appStoreUrl: "",
    screenshots: [
      {
        src: `${ap}/screenshots/home.webp`,
        alt: "Animal Pairs home screen: the Animal Pairs title, Iris the kitten playing with a ball of wool, other animal friends around a playground, and a large Play button.",
        caption: "The home screen",
        width: 820,
        height: 1180,
        device: "iPad",
      },
      {
        src: `${ap}/screenshots/setup.webp`,
        alt: "Set-up screen with a choice of Classic or Exact Pose, board sizes of 6, 12, 16 or 20 cards, and the animal friends Momo, Iris, Nori, Sprout, Mochi, Sunny, Maple and Clover.",
        caption: "Choose how to play and how many cards",
        width: 820,
        height: 1180,
        device: "iPad",
      },
      {
        src: `${ap}/screenshots/board-12-start.webp`,
        alt: "A fresh board of 12 lavender cards with paw prints, all face down, with a Hint button below.",
        caption: "A fresh 12-card board",
        width: 820,
        height: 1180,
        device: "iPad",
      },
      {
        src: `${ap}/screenshots/round-12-in-progress.webp`,
        alt: "A 12-card round in progress showing 2 of 6 pairs found: matched puppy and turtle cards are face up with green ticks, and two more cards are turned over.",
        caption: "Matched pairs stay face up",
        width: 820,
        height: 1180,
        device: "iPad",
      },
      {
        src: `${ap}/screenshots/board-20.webp`,
        alt: "A 20-card board showing 4 of 10 pairs found, with matched bunny, kitten and penguin cards face up.",
        caption: "A 20-card board (Full Game Unlock)",
        width: 820,
        height: 1180,
        device: "iPad",
      },
      {
        src: `${ap}/screenshots/iphone-home.webp`,
        alt: "Animal Pairs home screen on iPhone: the Animal Pairs title, animal friends around a playground, Iris the kitten playing with a ball of wool, and a large Play button.",
        caption: "The home screen",
        width: 600,
        height: 1298,
        device: "iPhone",
      },
      {
        src: `${ap}/screenshots/iphone-setup.webp`,
        alt: "Set-up screen on iPhone with Classic selected, Exact Pose shown with a lock, and board sizes of 6 and 12 cards.",
        caption: "Choose how to play",
        width: 600,
        height: 1298,
        device: "iPhone",
      },
      {
        src: `${ap}/screenshots/iphone-round.webp`,
        alt: "A 12-card round on iPhone with 3 of 6 pairs found: matched bear, kitten and penguin pairs face up with green ticks, and a duckling and a bunny turned over.",
        caption: "Matched pairs stay face up",
        width: 600,
        height: 1298,
        device: "iPhone",
      },
      {
        src: `${ap}/screenshots/iphone-pause.webp`,
        alt: "Pause screen on iPhone titled Taking a break, with Keep playing, Start over and Home buttons.",
        caption: "Taking a break",
        width: 600,
        height: 1298,
        device: "iPhone",
      },
    ],
    details: {
      /**
       * Only the rating produced by App Store Connect's age-rating questionnaire.
       * Never use the intended audience (e.g. "about 3–7") here.
       */
      ageRating: null,
      supportedDevices: "iPad and iPhone with iPadOS or iOS 17 or later",
      supportedLanguages: "English",
      internetRequirements:
        "Not needed to play. An internet connection is only used for App Store purchases, gift codes and restoring purchases.",
      advertising: "None",
      inAppPurchases: "One optional, one-time purchase: Full Game Unlock",
      /** Countries or regions selected in App Store Connect → Pricing and Availability. */
      availability: null,
    },
    fullGameUnlock: {
      name: "Full Game Unlock",
      free: ["Classic mode", "6- and 12-card boards", "All ten animal friends", "Sounds, hints and progress"],
      adds: ["Exact Pose mode", "16- and 20-card boards", "70 more pictures of the ten friends playing, napping, waving, celebrating, playing football, playing golf and cooking"],
    },
    privacy: {
      /**
       * Set "published" only once the policy page is live AND its statements
       * have been verified against the release build.
       */
      status: "draft",
      /** The date the final policy is published, e.g. "1 December 2026". */
      effectiveDate: null,
    },
    accent: "butter",
  },
];

export const appDetailLabels: Record<keyof AppDetails, string> = {
  ageRating: "Age rating",
  supportedDevices: "Supported devices",
  supportedLanguages: "Supported languages",
  internetRequirements: "Internet requirements",
  advertising: "Advertising",
  inAppPurchases: "In-app purchases",
  availability: "Availability",
};

export const TO_BE_CONFIRMED = "To be confirmed";

export const statusLabel: Record<GameStatus, string> = {
  "in-development": "Coming to the App Store",
  "coming-soon": "Coming soon",
  available: "Available now",
};

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function mailto(email: string, subject?: string): string | null {
  if (!email) return null;
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

export const gamePaths = (slug: string) => ({
  overview: `/games/${slug}/`,
  support: `/games/${slug}/support/`,
  privacy: `/games/${slug}/privacy/`,
});

/** Labels used for unresolved publishing facts. */
export const PH = {
  supportEmail: "[SUPPORT EMAIL]",
  publisher: "[LEGAL PUBLISHER NAME]",
  privacyEmail: "[PRIVACY CONTACT EMAIL]",
  appStoreUrl: "[APP STORE URL]",
  effectiveDate: "[EFFECTIVE DATE]",
  ageRating: "[AGE RATING]",
  emailRetention: "[EMAIL RETENTION PERIOD]",
  availability: "[COUNTRIES OR REGIONS]",
} as const;

export const nav = [
  { href: "/#games", label: "Our Games" },
  { href: "/about/", label: "Our Story" },
  { href: "/parents/", label: "For Parents" },
  { href: "/support/", label: "Support" },
] as const;

/** Every publishing fact still missing for a game's public pages. */
export type UnresolvedFact = {
  /** Machine label, e.g. "[LEGAL PUBLISHER NAME]" (used by the release check). */
  label: string;
  /** Plain name shown in the draft notice. */
  name: string;
  /** Where to fill it in. */
  where: string;
};

export function unresolvedFacts(game: Game): UnresolvedFact[] {
  const out: UnresolvedFact[] = [];
  const add = (label: string, name: string, where: string) => out.push({ label, name, where });
  if (!studio.publisherName) add(PH.publisher, "legal publisher name", "studio.publisherName");
  if (!studio.supportEmail) add(PH.supportEmail, "support email", "SUPPORT_EMAIL");
  if (!studio.privacyEmail) add(PH.privacyEmail, "privacy contact email", "SUPPORT_EMAIL");
  if (!studio.supportEmailRetention) add(PH.emailRetention, "support email retention period", "studio.supportEmailRetention");
  if (!game.privacy.effectiveDate) add(PH.effectiveDate, "privacy policy effective date", "privacy.effectiveDate");
  if (!game.details.ageRating) add(PH.ageRating, "App Store age rating", "details.ageRating");
  if (!game.details.availability) add(PH.availability, "release countries or regions", "details.availability");
  return out;
}
