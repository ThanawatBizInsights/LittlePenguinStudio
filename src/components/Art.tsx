import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { artSlots, type ArtSlot } from "@/content/art";
import { AnimalTile, animalArt, type AnimalKind } from "./illustrations/Animals";

/** Build-time check: does the artwork file for this slot exist in /public? */
export function hasArt(slot: ArtSlot): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", artSlots[slot]));
}

/** Map of slot → URL for every slot that has a real file (for client components). */
export function availableArt(slots: ArtSlot[]): Partial<Record<ArtSlot, string>> {
  return Object.fromEntries(slots.filter(hasArt).map((s) => [s, artSlots[s]]));
}

/**
 * Renders supplied artwork when present, otherwise the SVG fallback.
 * Decorative by default (empty alt); pass `alt` when the image carries meaning.
 */
export function Art({
  slot,
  fallback,
  className = "",
  alt = "",
}: {
  slot: ArtSlot;
  fallback: ReactNode;
  className?: string;
  alt?: string;
}) {
  if (!hasArt(slot)) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; files are pre-sized
    <img
      src={artSlots[slot]}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
      decoding="async"
      className={`h-auto object-contain ${className}`}
    />
  );
}

/** Animal tile: supplied plush artwork when available, otherwise the SVG tile. */
export function Tile({ kind, className = "" }: { kind: AnimalKind; className?: string }) {
  const slot = animalArt[kind];
  if (!hasArt(slot)) return <AnimalTile kind={kind} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export
    <img
      src={artSlots[slot]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`aspect-square object-contain drop-shadow-[0_14px_16px_rgba(28,35,80,0.28)] ${className}`}
    />
  );
}
