import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gamePaths, getGame, mailto, studio, PH, unresolvedFacts } from "@/content/site";
import { gameContent } from "@/content/games";
import { Container, Eyebrow } from "@/components/Curve";
import { Button } from "@/components/Button";
import { NotReadyBanner, Ph, Val } from "@/components/Content";
import { GameSubNav } from "@/components/GameSubNav";
import { SectionedArticle } from "@/components/Sections";
import { Snowy } from "@/components/Brand";
import { Wave } from "@/components/illustrations/Decor";
import { canonical } from "@/content/env";

/** Page metadata for a game's route file. */
export function gameSupportMetadata(slug: string): Metadata {
  const game = getGame(slug);
  if (!game) return {};
  const ready = unresolvedFacts(game).length === 0;
  return {
    title: `${game.title} Support`,
    description: `Help for ${game.title}: music and sound settings, restoring Full Game Unlock, resetting progress and how to contact ${studio.name}.`,
    alternates: canonical(gamePaths(game.slug).support),
    robots: ready ? undefined : { index: false },
  };
}

/** Shared page body; each game has a tiny route file under src/app/games/<slug>/ that renders this. */
export function GameSupportPage({ slug }: { slug: string }) {
  const game = getGame(slug);
  const content = game && gameContent[game.slug];
  if (!game || !content) notFound();
  const href = mailto(studio.supportEmail, `${game.title} support`);

  return (
    <>
      <GameSubNav game={game} current="support" />
      <Container className="pb-6 pt-8 md:pt-12">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Help for parents</Eyebrow>
            <h1 className="mt-3 text-[clamp(2.4rem,6vw,4rem)]">{game.title} Support</h1>
            <Wave className="mt-3 h-4 w-40" />
            <p className="mt-5 max-w-2xl text-xl text-ink-soft">
              Answers to common questions about {game.title}, and how to get in touch.
            </p>
          </div>
          <Snowy pose="reading" className="hidden w-44 md:block" priority />
        </div>

        <div className="mt-8">
          <NotReadyBanner items={unresolvedFacts(game)} />
        </div>

        <div className="mt-8 grid gap-4 rounded-[2rem] bg-mint-soft p-6 ring-1 ring-ink/10 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]">
            <dt className="font-semibold">App</dt>
            <dd>{game.title} for iPad and iPhone</dd>
            <dt className="font-semibold">Publisher</dt>
            <dd>
              <Val value={studio.publisherName} ph={PH.publisher} /> · {studio.name}
            </dd>
            <dt className="font-semibold">Email</dt>
            <dd>{studio.supportEmail ? studio.supportEmail : <Ph>{PH.supportEmail}</Ph>}</dd>
          </dl>
          {href ? (
            <Button href={href} arrow>
              Email support
            </Button>
          ) : null}
        </div>
      </Container>

      <Container className="py-10">
        <SectionedArticle sections={content.supportSections(game)} />
      </Container>
    </>
  );
}
