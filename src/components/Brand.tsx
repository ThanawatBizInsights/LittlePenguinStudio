/* eslint-disable @next/next/no-img-element -- static export; images are pre-sized WebP */
import assets from "@/content/brand-assets.json";

/**
 * Little Snowy Owl Studio artwork, built by scripts/build-brand-art.py from the
 * originals in design/source/. Each item is its own optimised WebP; sprite
 * sheets are never served.
 */
type AssetName = keyof typeof assets;

export type SnowyPose = "wave" | "star" | "nap" | "reading";
export type StickerName =
  | "snowflake-a" | "snowflake-b" | "star-a" | "star-b" | "moon-a" | "moon-b" | "cloud-a"
  | "tree-a" | "tree-b" | "snow-arch-a" | "heart-a" | "heart-b" | "snowballs-a"
  | "rainbow-a" | "leaf-a" | "confetti-a" | "feather-a" | "feather-b";

function asset(name: AssetName) {
  return assets[name];
}

const poseAlt: Record<SnowyPose, string> = {
  wave: "Snowy the snowy owl waving hello",
  star: "Snowy the snowy owl hugging a yellow star",
  nap: "Snowy the snowy owl napping on a soft cushion",
  reading: "Snowy the snowy owl reading a picture book",
};

/**
 * Snowy, the studio mascot. Decorative by default (hidden from screen readers);
 * pass `labelled` when the picture carries meaning on its own.
 */
export function Snowy({
  pose,
  className = "",
  labelled = false,
  bob = false,
  priority = false,
}: {
  pose: SnowyPose;
  className?: string;
  labelled?: boolean;
  bob?: boolean;
  priority?: boolean;
}) {
  const a = asset(`snowy-${pose}` as AssetName);
  return (
    <img
      src={a.src}
      width={a.width}
      height={a.height}
      alt={labelled ? poseAlt[pose] : ""}
      aria-hidden={labelled ? undefined : true}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-auto select-none ${bob ? "motion-safe:animate-bob" : ""} ${className}`}
      draggable={false}
    />
  );
}

/** Snowy's head: the studio's compact mark (logo, small badges). Decorative. */
export function SnowyMark({ className = "" }: { className?: string }) {
  const a = asset("snowy-mark");
  return (
    <img src={a.src} width={a.width} height={a.height} alt="" aria-hidden="true"
      decoding="async" draggable={false} className={`h-auto select-none ${className}`} />
  );
}

/** Snowy waving beside the Animal Pairs cards (promotional artwork). */
export function SnowyPromo({ className = "" }: { className?: string }) {
  const a = asset("snowy-promo");
  return (
    <img
      src={a.src}
      width={a.width}
      height={a.height}
      alt="Snowy the snowy owl waving beside Animal Pairs cards of a kitten, an elephant and a puppy"
      loading="lazy"
      decoding="async"
      className={`h-auto ${className}`}
    />
  );
}

/**
 * A small plush sticker for section edges. Always decorative: hidden from
 * screen readers and never clickable, so it can't cover text or controls.
 */
export function Sticker({ name, className = "" }: { name: StickerName; className?: string }) {
  const a = asset(`sticker-${name}` as AssetName);
  return (
    <img
      src={a.src}
      width={a.width}
      height={a.height}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}

/** The snow-canyon hero illustration (Snowy on the right). */
export function HeroCanyon({ className = "", alt }: { className?: string; alt: string }) {
  const big = asset("hero-canyon-1672");
  const small = asset("hero-canyon-900");
  return (
    <img
      src={big.src}
      srcSet={`${small.src} ${small.width}w, ${big.src} ${big.width}w`}
      sizes="100vw"
      width={big.width}
      height={big.height}
      alt={alt}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  );
}

/** Snowy's plush penguin friend, waving (cut from the penguin pose sheet). */
export function PenguinFriend({ className = "", labelled = true }: { className?: string; labelled?: boolean }) {
  const a = asset("penguin-wave" as AssetName);
  return (
    <img
      src={a.src}
      width={a.width}
      height={a.height}
      alt={labelled ? "Snowy's penguin friend waving" : ""}
      aria-hidden={labelled ? undefined : true}
      loading="lazy"
      decoding="async"
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}
