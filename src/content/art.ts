/**
 * Artwork slots. Drop a transparent PNG/WebP at the listed path under /public
 * and the site uses it automatically on the next build. Until a file exists,
 * the matching built-in SVG illustration is shown instead.
 *
 * Keep transparent backgrounds and original proportions; ~1200px on the long
 * side is plenty (export WebP for smaller files).
 */
export const artSlots = {
  // Penguin poses (from the 2×2 penguin sheet)
  penguinWave: "/art/penguin-wave.webp",
  penguinStar: "/art/penguin-star.webp",
  penguinPeek: "/art/penguin-peek.webp",
  penguinReading: "/art/penguin-reading.webp",
  // Penguin waving beside the bunny / fox / bear cards
  heroGroup: "/art/hero-penguin-cards.webp",
  // Animal tiles (from the 3×2 tile sheet) — also used by the mini-game
  tileBunny: "/art/tiles/bunny.webp",
  tileFox: "/art/tiles/fox.webp",
  tileBear: "/art/tiles/bear.webp",
  tileTurtle: "/art/tiles/turtle.webp",
  tileElephant: "/art/tiles/elephant.webp",
  tilePenguin: "/art/tiles/penguin.webp",
  // Decorations (from the 4×3 decoration sheet)
  star: "/art/decor/star.webp",
  cloud: "/art/decor/cloud.webp",
  flower: "/art/decor/flower.webp",
  ring: "/art/decor/ring.webp",
  leaf: "/art/decor/leaf.webp",
  squiggle: "/art/decor/squiggle.webp",
  heart: "/art/decor/heart.webp",
  sparkles: "/art/decor/sparkles.webp",
  cloudLilac: "/art/decor/cloud-lilac.webp",
  bubbles: "/art/decor/bubbles.webp",
  rainbow: "/art/decor/rainbow.webp",
  confetti: "/art/decor/confetti.webp",
} as const;

export type ArtSlot = keyof typeof artSlots;
