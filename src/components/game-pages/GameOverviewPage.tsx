import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gamePaths, games, getGame, studio } from "@/content/site";
import { Container, CurvedSection, Eyebrow } from "@/components/Curve";
import { Button, TextLink } from "@/components/Button";
import { AppInfoTable, GameKeyArt, ScreenshotGallery, StoreCta, accentBg } from "@/components/GameParts";
import { GameSubNav } from "@/components/GameSubNav";
import { Cloud, Wave } from "@/components/illustrations/Decor";
import { canonical } from "@/content/env";

/* eslint-disable @next/next/no-img-element -- static export; images are pre-sized WebP */

/** Page metadata for a game's route file. */
export function gameOverviewMetadata(slug: string): Metadata {
  const game = getGame(slug);
  if (!game) return {};
  const description = `${game.title}: ${game.tagline.toLowerCase()} for iPad and iPhone. Meet ${game.characters.length} animal friends and find the matching pairs.`;
  return {
    title: `${game.title} — ${game.tagline}`,
    description,
    alternates: canonical(gamePaths(game.slug).overview),
    openGraph: { title: game.title, description, images: [{ url: game.icon, width: 512, height: 512, alt: `${game.title} app icon` }] },
  };
}

/** Shared page body; each game has a tiny route file under src/app/games/<slug>/ that renders this. */
export function GameOverviewPage({ slug }: { slug: string }) {
  const game = getGame(slug);
  if (!game) notFound();
  const paths = gamePaths(game.slug);

  return (
    <>
      <GameSubNav game={game} current="overview" />

      <section aria-labelledby="game-title">
        <Container className="grid items-center gap-8 pb-12 pt-6 md:grid-cols-2 md:pt-10">
          <div>
            <Eyebrow>{game.slug === games[0].slug ? "Our first little adventure" : `A ${studio.name} game`}</Eyebrow>
            <h1 id="game-title" className="mt-4">
              <img src={game.wordmark} alt={game.title} width={1000} height={316} className="h-auto w-full max-w-md" />
            </h1>
            <p className="mt-5 text-2xl text-ink-soft">{game.tagline}</p>
            <p className="mt-2 text-lg">For {game.details.supportedDevices}.</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <StoreCta game={game} />
              <TextLink href={paths.support}>Help &amp; support</TextLink>
            </div>
          </div>
          <div className={`relative aspect-square w-full overflow-hidden rounded-[2.5rem] ${accentBg[game.accent]}`}>
            <Cloud className="absolute left-[6%] top-[6%] w-[22%]" />
            <GameKeyArt game={game} className="absolute inset-0" />
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 pb-14 lg:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="about-game" className="prose-lp text-lg">
          <h2 id="about-game" className="mb-4 text-4xl">About the game</h2>
          {game.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <section aria-labelledby="how-to-play" className="rounded-[2rem] bg-butter-soft p-6 ring-1 ring-ink/10 sm:p-8">
          <h2 id="how-to-play" className="text-3xl">How to play</h2>
          <ol className="mt-5 space-y-4">
            {game.howToPlay.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-lg font-bold text-paper">
                  {i + 1}
                </span>
                <span className="pt-1.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <CurvedSection color="#e6dbf7" className="py-12" labelledBy="screens">
        <Container>
          <h2 id="screens" className="text-4xl">Screenshots</h2>
          <p className="mb-8 mt-2 text-ink-soft">
            Captured from the working app on {[...new Set(game.screenshots.map((s) => s.device))].join(" and ")}.
          </p>
          <ScreenshotGallery game={game} />
        </Container>
      </CurvedSection>

      <section aria-labelledby="friends" className="py-14">
        <Container>
          <h2 id="friends" className="text-4xl">Meet the {game.characters.length} animal friends</h2>
          <Wave className="mt-3 h-3.5 w-36" color="#ffd94d" />
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {game.characters.map((c) => (
              <li key={c.name} className="flex flex-col items-center rounded-[1.75rem] bg-paper p-4 text-center ring-1 ring-ink/10">
                <img src={c.image} alt={`${c.name} the ${c.animal}`} width={360} height={360} loading="lazy" className="aspect-square h-auto w-full max-w-36 object-contain" />
                <span className="mt-2 font-display text-xl font-semibold">{c.name}</span>
                <span className="text-ink-soft">{c.animal}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="ways" className="pb-14">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-mint-soft p-6 ring-1 ring-ink/10 sm:p-8">
            <h2 id="ways" className="text-3xl">Two ways to play</h2>
            <ul className="mt-4 space-y-4">
              {game.modes.map((m) => (
                <li key={m.name}>
                  <p className="font-display text-xl font-semibold">
                    {m.name}
                    {m.fullGame && game.fullGameUnlock ? (
                      <span className="ml-2 rounded-full bg-lilac px-2.5 py-0.5 align-middle font-sans text-xs font-extrabold uppercase">Full Game</span>
                    ) : null}
                  </p>
                  <p className="text-ink-soft">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-paper p-6 ring-1 ring-ink/10 sm:p-8">
            <h2 className="text-3xl">Board sizes</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {game.boards.map((b) => (
                <li key={b.cards} className="rounded-2xl bg-cream p-4">
                  <p className="font-display text-2xl font-semibold">{b.cards} cards</p>
                  <p className="text-ink-soft">{b.layout}{b.fullGame && game.fullGameUnlock ? " · Full Game" : ""}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {game.fullGameUnlock && (
        <section aria-labelledby="unlock" className="pb-14">
          <Container>
            <div className="rounded-[2rem] bg-butter-soft p-6 ring-1 ring-ink/10 sm:p-8">
              <h2 id="unlock" className="text-3xl">Free to play, with an optional {game.fullGameUnlock.name}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="text-xl">Free for everyone</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-6">{game.fullGameUnlock.free.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xl">Added by the one-time {game.fullGameUnlock.name}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-6">{game.fullGameUnlock.adds.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
              </div>
              <p className="mt-5 text-ink-soft">Purchases are made by a grown-up in the app’s Parents area, behind a grown-ups check.</p>
            </div>
          </Container>
        </section>
      )}

      <Container className="grid gap-10 pb-6 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="app-info">
          <h2 id="app-info" className="mb-5 text-4xl">App information</h2>
          <AppInfoTable details={game.details} caption={`${game.title} app information`} />
        </section>
        <section aria-labelledby="help" className="flex flex-col gap-4 self-start rounded-[2rem] bg-mint-soft p-6 ring-1 ring-ink/10 sm:p-8">
          <h2 id="help" className="text-3xl">Help &amp; privacy</h2>
          <p className="text-ink-soft">Sound settings, restoring a purchase, and how to contact us.</p>
          <Button href={paths.support} arrow className="self-start">
            {game.title} support
          </Button>
          <TextLink href={paths.privacy}>{game.title} privacy policy</TextLink>
        </section>
      </Container>
    </>
  );
}
