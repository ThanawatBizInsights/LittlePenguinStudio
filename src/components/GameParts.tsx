import Link from "next/link";
import {
  appDetailLabels,
  statusLabel,
  TO_BE_CONFIRMED,
  type AppDetails,
  type Game,
} from "@/content/site";
import { Tile, Art } from "./Art";
import { Sparkle, Star } from "./illustrations/Decor";
import { Arrow, Button } from "./Button";

export { accentBg } from "./accent";
import { accentBg } from "./accent";

/** Animal Pairs key art: supplied penguin-and-cards artwork, or fanned SVG tiles. */
export function AnimalPairsArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Art
        slot="heroGroup"
        className="absolute inset-0 h-full w-full"
        fallback={
          <>
            <Tile kind="bunny" className="absolute left-[2%] top-[22%] w-[42%] -rotate-[12deg]" />
            <Tile kind="bear" className="absolute right-[2%] top-[22%] w-[42%] rotate-[12deg]" />
            <Tile kind="fox" className="absolute left-[27%] top-[10%] w-[46%]" />
            <Sparkle className="absolute right-[8%] top-[2%] h-10 w-10" color="#ffffff" />
            <Star className="absolute bottom-[4%] left-[10%] h-10 w-10 motion-safe:animate-twinkle" color="#ffffff" />
          </>
        }
      />
    </div>
  );
}

export function StatusPill({ game, className = "" }: { game: Game; className?: string }) {
  return (
    <span className={`inline-flex min-h-9 items-center gap-2 rounded-full bg-paper px-4 text-sm font-extrabold uppercase tracking-wide text-ink ring-2 ring-ink/15 ${className}`}>
      <span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden="true" />
      {statusLabel[game.status]}
    </span>
  );
}

/** Home "games" grid card. */
export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-paper shadow-[0_8px_0_0_rgba(28,35,80,0.08)] ring-1 ring-ink/10 transition-transform duration-200 hover:-translate-y-1"
    >
      <div className={`relative aspect-[4/3] ${accentBg[game.accent]}`}>
        {game.slug === "animal-pairs" ? <AnimalPairsArt className="absolute inset-0" /> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-2xl">{game.title}</h3>
        <p className="text-ink-soft">{game.tagline}</p>
        <span className="mt-auto inline-flex items-center justify-between pt-2 font-semibold">
          Meet the game <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Shows the App Store link only when a real URL is configured. */
export function StoreCta({ game }: { game: Game }) {
  if (!game.appStoreUrl) {
    return <StatusPill game={game} />;
  }
  return (
    <Button href={game.appStoreUrl} variant="cobalt" external arrow>
      View {game.title} on the App Store
    </Button>
  );
}

export function AppInfoTable({ details, caption }: { details: AppDetails; caption: string }) {
  const rows = Object.keys(appDetailLabels) as (keyof AppDetails)[];
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/10">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((key, i) => {
            const value = details[key];
            return (
              <tr key={key} className={i % 2 ? "bg-cream/60" : ""}>
                <th scope="row" className="w-2/5 px-5 py-3.5 align-top font-display text-lg font-semibold sm:w-1/3">
                  {appDetailLabels[key]}
                </th>
                <td className="px-5 py-3.5 align-top">
                  {value ?? (
                    <span className="inline-flex items-center gap-2 text-ink-soft">
                      <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
                      {TO_BE_CONFIRMED}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function ScreenshotGallery({ game }: { game: Game }) {
  if (game.screenshots.length) {
    return (
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {game.screenshots.map((s) => (
          <li key={s.src}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized assets */}
            <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" className="h-auto w-full rounded-3xl ring-1 ring-ink/10" />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {game.screenshotPlaceholders.map((p, i) => (
        <li
          key={i}
          className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-[3px] border-dashed border-ink/25 bg-paper p-4 text-center ${
            p.device === "iPad" ? "aspect-[3/4]" : "aspect-[9/19]"
          }`}
        >
          <span className="rounded-full bg-lilac-soft px-3 py-1 text-xs font-extrabold uppercase tracking-wide">{p.device}</span>
          <span className="font-display text-lg font-semibold">{p.label}</span>
          <span className="text-sm text-ink-soft">Screenshot placeholder — real capture coming soon</span>
        </li>
      ))}
    </ul>
  );
}
