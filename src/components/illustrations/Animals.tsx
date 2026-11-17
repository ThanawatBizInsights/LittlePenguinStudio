/**
 * Original friendly animal face illustrations used on matching cards, styled
 * after the studio's plush artwork: open dot eyes, rosy cheeks, open smiles.
 * Each draws inside a 100×100 viewBox.
 */
import type { ReactElement } from "react";
import type { ArtSlot } from "@/content/art";

export type AnimalKind = "bunny" | "fox" | "bear" | "turtle" | "elephant" | "penguin";

export const animalKinds: AnimalKind[] = ["bunny", "fox", "bear", "turtle", "elephant", "penguin"];

export const animalNames: Record<AnimalKind, string> = {
  bunny: "bunny",
  fox: "fox",
  bear: "bear",
  turtle: "turtle",
  elephant: "elephant",
  penguin: "penguin",
};

/** Tile background colour for each animal (matches the supplied tile sheet). */
export const animalTile: Record<AnimalKind, string> = {
  bunny: "#c7a8ea",
  fox: "#9fe0c4",
  bear: "#ffd94d",
  turtle: "#f4877a",
  elephant: "#8fc3f5",
  penguin: "#f6e8cc",
};

/** Artwork slot that replaces each SVG face when the real tile image is supplied. */
export const animalArt: Record<AnimalKind, ArtSlot> = {
  bunny: "tileBunny",
  fox: "tileFox",
  bear: "tileBear",
  turtle: "tileTurtle",
  elephant: "tileElephant",
  penguin: "tilePenguin",
};

const INK = "#1c2350";

const eyes = (y: number, dx: number, r = 4.6) => (
  <>
    <circle cx={50 - dx} cy={y} r={r} fill={INK} />
    <circle cx={50 + dx} cy={y} r={r} fill={INK} />
    <circle cx={50 - dx + 1.5} cy={y - 1.6} r={r * 0.36} fill="#fff" />
    <circle cx={50 + dx + 1.5} cy={y - 1.6} r={r * 0.36} fill="#fff" />
  </>
);
const cheeks = (y: number, dx: number) => (
  <>
    <ellipse cx={50 - dx} cy={y} rx="6.5" ry="4.6" fill="#f58f8f" opacity="0.75" />
    <ellipse cx={50 + dx} cy={y} rx="6.5" ry="4.6" fill="#f58f8f" opacity="0.75" />
  </>
);
const mouth = (y: number, w = 6) => (
  <>
    <path d={`M${50 - w} ${y} Q50 ${y + w * 1.6} ${50 + w} ${y} Z`} fill="#b8343b" />
    <path d={`M${50 - w * 0.55} ${y + w * 0.75} Q50 ${y + w * 0.35} ${50 + w * 0.55} ${y + w * 0.75} Q50 ${y + w * 1.25} ${50 - w * 0.55} ${y + w * 0.75} Z`} fill="#f58f86" />
  </>
);

const faces: Record<AnimalKind, ReactElement> = {
  bunny: (
    <>
      <ellipse cx="36" cy="22" rx="9" ry="20" fill="#fbe9cf" />
      <ellipse cx="64" cy="22" rx="9" ry="20" fill="#fbe9cf" />
      <ellipse cx="36" cy="24" rx="4.5" ry="14" fill="#f39b95" />
      <ellipse cx="64" cy="24" rx="4.5" ry="14" fill="#f39b95" />
      <ellipse cx="50" cy="62" rx="34" ry="28" fill="#fbe9cf" />
      {eyes(57, 14)}
      <path d="M46.5 63 Q50 61 53.5 63 Q50 67 46.5 63 Z" fill="#f1857f" />
      {mouth(69, 5)}
      {cheeks(68, 23)}
    </>
  ),
  fox: (
    <>
      <path d="M16 20 L40 32 L24 52 Z" fill="#ed7a2c" />
      <path d="M84 20 L60 32 L76 52 Z" fill="#ed7a2c" />
      <path d="M21 27 L34 34 L25 45 Z" fill="#fbe9cf" />
      <path d="M79 27 L66 34 L75 45 Z" fill="#fbe9cf" />
      <path d="M50 26 C74 26 88 42 90 62 C80 60 70 64 64 70 C58 80 42 80 36 70 C30 64 20 60 10 62 C12 42 26 26 50 26 Z" fill="#f0832f" />
      <path d="M10 62 C20 60 30 64 36 70 C42 80 58 80 64 70 C70 64 80 60 90 62 C86 78 70 88 50 88 C30 88 14 78 10 62 Z" fill="#fbe9cf" />
      {eyes(58, 15)}
      <ellipse cx="50" cy="66" rx="4.6" ry="3.4" fill={INK} />
      {mouth(72, 5)}
      {cheeks(70, 25)}
    </>
  ),
  bear: (
    <>
      <circle cx="22" cy="28" r="13" fill="#b5713b" />
      <circle cx="78" cy="28" r="13" fill="#b5713b" />
      <circle cx="22" cy="28" r="7" fill="#e6b27c" />
      <circle cx="78" cy="28" r="7" fill="#e6b27c" />
      <ellipse cx="50" cy="56" rx="36" ry="33" fill="#c07d45" />
      <ellipse cx="50" cy="68" rx="17" ry="13" fill="#ecc08f" />
      {eyes(50, 15)}
      <ellipse cx="50" cy="62" rx="5.6" ry="4" fill="#4a2a18" />
      {mouth(68, 5.5)}
      {cheeks(62, 25)}
    </>
  ),
  turtle: (
    <>
      <ellipse cx="18" cy="74" rx="12" ry="8" fill="#8fd88a" />
      <ellipse cx="82" cy="74" rx="12" ry="8" fill="#8fd88a" />
      <path d="M12 56 C12 26 30 12 50 12 C70 12 88 26 88 56 Z" fill="#3f9e5a" />
      <path d="M30 22 L40 34 L60 34 L70 22 M40 34 L36 50 M60 34 L64 50 M20 44 L36 50 L64 50 L80 44" stroke="#2f7f45" strokeWidth="2.6" fill="none" strokeLinejoin="round" />
      <ellipse cx="50" cy="62" rx="27" ry="23" fill="#9ee09a" />
      <path d="M26 80 C36 86 64 86 74 80 L72 86 C62 92 38 92 28 86 Z" fill="#f5c74a" />
      {eyes(58, 12)}
      {mouth(67, 5)}
      {cheeks(66, 19)}
    </>
  ),
  elephant: (
    <>
      <ellipse cx="18" cy="54" rx="16" ry="22" fill="#b7a3e6" />
      <ellipse cx="82" cy="54" rx="16" ry="22" fill="#b7a3e6" />
      <ellipse cx="18" cy="54" rx="9" ry="15" fill="#f2a6b6" />
      <ellipse cx="82" cy="54" rx="9" ry="15" fill="#f2a6b6" />
      <ellipse cx="50" cy="50" rx="28" ry="30" fill="#bfa9ec" />
      <path d="M44 9 Q50 4 56 9 Q53 13 50 13 Q47 13 44 9 Z" fill="#b7a3e6" />
      <path d="M44 58 C44 72 42 82 34 88 C32 90 34 94 38 92 C50 86 56 74 56 58 Z" fill="#b7a3e6" />
      <path d="M45 70 Q50 72 55 70 M44 78 Q48 80 52 77" stroke="#9a86cf" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {eyes(48, 13)}
      {cheeks(58, 19)}
    </>
  ),
  penguin: (
    <>
      <ellipse cx="14" cy="66" rx="10" ry="16" fill="#252d5c" transform="rotate(-25 14 66)" />
      <ellipse cx="86" cy="66" rx="10" ry="16" fill="#252d5c" transform="rotate(25 86 66)" />
      <ellipse cx="50" cy="54" rx="34" ry="38" fill="#2a3266" />
      <path d="M50 26 C66 26 76 36 76 50 C76 66 64 74 50 74 C36 74 24 66 24 50 C24 36 34 26 50 26 Z" fill="#fbe9cf" />
      <ellipse cx="50" cy="80" rx="20" ry="12" fill="#fbe9cf" />
      {eyes(46, 12, 4.2)}
      <path d="M43 53 Q50 49 57 53 Q50 63 43 53 Z" fill="#f6a531" />
      {cheeks(58, 19)}
      <path d="M20 68 C34 76 66 76 80 68 L80 75 C66 83 34 83 20 75 Z" fill="#8fdcbb" />
      <ellipse cx="36" cy="94" rx="9" ry="4.5" fill="#f6a531" />
      <ellipse cx="64" cy="94" rx="9" ry="4.5" fill="#f6a531" />
    </>
  ),
};

export function AnimalFace({ kind, className = "" }: { kind: AnimalKind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {faces[kind]}
    </svg>
  );
}

/** A decorative plush-style matching card tile (SVG). */
export function AnimalTile({ kind, className = "" }: { kind: AnimalKind; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`grid aspect-square place-items-center rounded-[22%] border-[6px] border-paper shadow-[0_10px_0_-2px_rgba(28,35,80,0.12),0_18px_30px_-10px_rgba(28,35,80,0.35)] ${className}`}
      style={{ backgroundColor: animalTile[kind] }}
    >
      <AnimalFace kind={kind} className="h-[80%] w-[80%]" />
    </div>
  );
}
