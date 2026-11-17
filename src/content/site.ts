/**
 * Little Penguin Studio — shared site content and configuration.
 *
 * This is the ONE place to update studio details, contact emails, game
 * descriptions, app facts and screenshots. Every page reads from here.
 *
 * Rules:
 * - Leave a value as "" or null until it is confirmed. The site then hides the
 *   related button/link or shows "Details to be confirmed" instead of guessing.
 * - Only set a feature claim (e.g. adFree) to `true` once verified against the
 *   released app build.
 */

/** A fact that is either confirmed (`value` set) or still unknown (`null`). */
export type Confirmable = string | null;

export type GameStatus = "in-development" | "coming-soon" | "available";

export type Screenshot = {
  /** Path under /public, e.g. "/screenshots/animal-pairs/iphone-1.png" */
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "iPhone" | "iPad";
};

export type AppDetails = {
  ageRating: Confirmable;
  supportedDevices: Confirmable;
  supportedLanguages: Confirmable;
  internetRequirements: Confirmable;
  advertising: Confirmable;
  inAppPurchases: Confirmable;
  availability: Confirmable;
};

/** Claims that must stay `false` until verified in the release build. */
export type VerifiedClaims = {
  adFree: boolean;
  noInAppPurchases: boolean;
  playsOffline: boolean;
  noDataCollected: boolean;
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
  status: GameStatus;
  /** Real App Store URL. Leave "" until the app is live — no badge is shown otherwise. */
  appStoreUrl: string;
  screenshots: Screenshot[];
  /** Number of labelled placeholders to show while `screenshots` is empty. */
  screenshotPlaceholders: { device: "iPhone" | "iPad"; label: string }[];
  details: AppDetails;
  claims: VerifiedClaims;
  privacy: {
    status: "draft" | "published";
    lastUpdated: Confirmable;
  };
  /** Accent used for this game's cards: one of the theme colour names. */
  accent: "butter" | "mint" | "lilac" | "coral" | "cobalt";
};

export type Studio = {
  name: string;
  /** Legal publisher name as it should appear in policies (Individual: your legal name). */
  publisherName: string;
  supportEmail: string;
  privacyEmail: string;
  siteUrl: string;
  tagline: string;
  description: string;
  story: string;
};

export const studio: Studio = {
  name: "Little Penguin Studio",
  publisherName: "",
  supportEmail: "",
  privacyEmail: "",
  siteUrl: "https://littlepenguinstudio.com",
  tagline: "Playful little worlds for curious minds.",
  description:
    "Little Penguin Studio creates playful little worlds for children and families.",
  story:
    "Little Penguin Studio creates playful little worlds for children and families. Our journey begins with Animal Pairs, with more adventures to come.",
};

export const games: Game[] = [
  {
    slug: "animal-pairs",
    title: "Animal Pairs",
    tagline: "A gentle animal matching game",
    summary:
      "Meet friendly animals, discover matching pairs, and enjoy little moments of play together.",
    description: [
      "Meet Momo the puppy, Iris the kitten, Nori the elephant, and more animal friends in Animal Pairs, a gentle matching game filled with soft colours and playful character art.",
      "Turn over cards, remember what you saw, and find the matching pairs. Friendly sounds celebrate each match.",
      "Animal Pairs is designed for simple, touch-friendly play on iPhone and iPad.",
    ],
    howToPlay: [
      "Tap a card to turn it over and meet the animal underneath.",
      "Tap a second card. Is it the same friend?",
      "Matching pairs stay face up. If they don’t match, they turn back over — try to remember where they were!",
      "Find every pair to finish the board.",
    ],
    status: "in-development",
    appStoreUrl: "",
    screenshots: [],
    screenshotPlaceholders: [
      { device: "iPhone", label: "Home screen" },
      { device: "iPhone", label: "Game board" },
      { device: "iPhone", label: "A successful match" },
      { device: "iPad", label: "Game board on iPad" },
    ],
    details: {
      ageRating: null,
      supportedDevices: "iPhone and iPad",
      supportedLanguages: "English",
      internetRequirements: null,
      advertising: null,
      inAppPurchases: null,
      availability: null,
    },
    claims: {
      adFree: false,
      noInAppPurchases: false,
      playsOffline: false,
      noDataCollected: false,
    },
    privacy: { status: "draft", lastUpdated: null },
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

export const TO_BE_CONFIRMED = "Details to be confirmed";

export const statusLabel: Record<GameStatus, string> = {
  "in-development": "In development",
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

export const nav = [
  { href: "/#games", label: "Our Games" },
  { href: "/about/", label: "Our Story" },
  { href: "/parents/", label: "For Parents" },
  { href: "/support/", label: "Support" },
] as const;
