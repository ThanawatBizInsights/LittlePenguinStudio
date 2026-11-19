import Link from "next/link";
import {
  appDetailLabels,
  gamePaths,
  statusLabel,
  TO_BE_CONFIRMED,
  type AppDetails,
  type Game,
} from "@/content/site";
import { Sparkle, Star } from "./illustrations/Decor";
import { Arrow, Button } from "./Button";
import { accentBg } from "./accent";

export { accentBg };

/* eslint-disable @next/next/no-img-element -- static export; images are pre-sized WebP */

/** The game's real app icon. */
export function AppIcon({ game, className = "" }: { game: Game; className?: string }) {
  return (
    <img
      src={game.icon}
      alt={`${game.title} app icon`}
      width={512}
      height={512}
      className={`aspect-square rounded-[22%] shadow-[0_14px_30px_-10px_rgba(28,35,80,0.45)] ring-4 ring-paper ${className}`}
    />
  );
}

/** Key art: a real screenshot in a tablet frame with the app icon. */
export function GameKeyArt({ game, className = "relative" }: { game: Game; className?: string }) {
  const shot = game.screenshots.find((s) => s.device === "iPad") ?? game.screenshots[0];
  return (
    <div className={className}>
      {shot && (
        <div className="absolute left-1/2 top-[6%] w-[52%] -translate-x-1/2 rotate-[4deg] rounded-[1.6rem] bg-ink p-[2.2%] shadow-[0_24px_40px_-14px_rgba(28,35,80,0.55)]">
          <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className="h-auto w-full rounded-[1.1rem]" />
        </div>
      )}
      <AppIcon game={game} className="absolute bottom-[6%] left-[6%] w-[30%] -rotate-[8deg]" />
      <Sparkle className="absolute right-[8%] top-[4%] h-10 w-10" color="#ffffff" />
      <Star className="absolute bottom-[8%] right-[10%] h-10 w-10 motion-safe:animate-twinkle" color="#ffffff" />
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
      href={gamePaths(game.slug).overview}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-paper shadow-[0_8px_0_0_rgba(28,35,80,0.08)] ring-1 ring-ink/10 transition-transform duration-200 hover:-translate-y-1"
    >
      <div className={`relative grid aspect-[4/3] place-items-center ${accentBg[game.accent]}`}>
        <img src={game.icon} alt="" aria-hidden="true" width={512} height={512} className="w-[44%] rounded-[22%] shadow-[0_14px_30px_-10px_rgba(28,35,80,0.45)] ring-4 ring-paper" />
        <Sparkle className="absolute right-[10%] top-[10%] w-[10%]" color="#ffffff" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-2xl">{game.title}</h3>
        <p className="text-ink-soft">{game.tagline}</p>
        {game.premium ? (
          <p className="text-sm font-semibold">
            Free {game.boards.filter((b) => !b.plus).map((b) => `${b.cards}-card`).join(" and ")} board · {game.premium.name} unlocks more
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center justify-between pt-2 font-semibold">
          Meet the game <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Shows the App Store link only when a real URL is configured. */
export function StoreCta({ game }: { game: Game }) {
  if (!game.appStoreUrl) return <StatusPill game={game} />;
  return (
    <Button href={game.appStoreUrl} variant="cobalt" external arrow>
      Get {game.title} on the App Store
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

/** Real screenshots from the working app, captioned and grouped by device. */
export function ScreenshotGallery({ game }: { game: Game }) {
  const devices = (["iPhone", "iPad"] as const).filter((d) => game.screenshots.some((s) => s.device === d));
  return (
    <div className="space-y-10">
      {devices.map((device) => {
        const shots = game.screenshots.filter((s) => s.device === device);
        return (
          <section key={device} aria-label={`Screenshots on ${device}`}>
            <h3 className="mb-4 text-2xl">On {device}</h3>
            <ul
              className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 ${
                device === "iPhone" ? "sm:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {shots.map((s) => (
                <li
                  key={s.src}
                  className={`shrink-0 snap-center sm:w-auto sm:max-w-none ${device === "iPhone" ? "w-[46vw] max-w-52" : "w-[62vw] max-w-64"}`}
                >
                  <figure>
                    <div className={`bg-ink p-1.5 shadow-[0_12px_24px_-12px_rgba(28,35,80,0.5)] ${device === "iPhone" ? "rounded-[1.8rem]" : "rounded-[1.4rem]"}`}>
                      <img
                        src={s.src}
                        alt={s.alt}
                        width={s.width}
                        height={s.height}
                        loading="lazy"
                        className={`h-auto w-full ${device === "iPhone" ? "rounded-[1.4rem]" : "rounded-[1rem]"}`}
                      />
                    </div>
                    <figcaption className="mt-3 text-center font-display text-base font-semibold leading-snug">{s.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
