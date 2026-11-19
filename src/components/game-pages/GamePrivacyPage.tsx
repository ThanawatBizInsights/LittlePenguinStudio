import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gamePaths, getGame, studio, PH, unresolvedFacts } from "@/content/site";
import { gameContent } from "@/content/games";
import { Container, Eyebrow } from "@/components/Curve";
import { NotReadyBanner, Panel, Val } from "@/components/Content";
import { GameSubNav } from "@/components/GameSubNav";
import { SectionedArticle } from "@/components/Sections";
import { Shield, Wave } from "@/components/illustrations/Decor";
import { canonical } from "@/content/env";

/** Page metadata for a game's route file. */
export function gamePrivacyMetadata(slug: string): Metadata {
  const game = getGame(slug);
  if (!game) return {};
  const ready = game.privacy.status === "published" && unresolvedFacts(game).length === 0;
  return {
    title: `${game.title} Privacy Policy`,
    description: `How the ${game.title} app handles information: what is stored on the device, subscriptions through Apple, and how parents can contact the publisher.`,
    alternates: canonical(gamePaths(game.slug).privacy),
    robots: ready ? undefined : { index: false },
  };
}

/** Shared page body; each game has a tiny route file under src/app/games/<slug>/ that renders this. */
export function GamePrivacyPage({ slug }: { slug: string }) {
  const game = getGame(slug);
  const content = game && gameContent[game.slug];
  if (!game || !content) notFound();

  return (
    <>
      <GameSubNav game={game} current="privacy" />
      <Container className="pb-6 pt-8 md:pt-12">
        <Eyebrow>Privacy policy</Eyebrow>
        <h1 className="mt-3 text-[clamp(2.3rem,6vw,3.8rem)]">{game.title} Privacy Policy</h1>
        <Wave className="mt-3 h-4 w-40" />
        <p className="mt-4 text-lg">
          Effective date: <Val value={game.privacy.effectiveDate} ph={PH.effectiveDate} />
          <span className="text-ink-soft"> · Publisher: </span>
          <Val value={studio.publisherName} ph={PH.publisher} />
          <span className="text-ink-soft"> ({studio.name})</span>
        </p>

        <div className="mt-6">
          <NotReadyBanner
            items={unresolvedFacts(game)}
            extra={
              game.privacy.status === "draft"
                ? "Confirm that the final release build matches the audited app before publishing, then set privacy.status to “published”."
                : undefined
            }
          />
        </div>

        <Panel tone="mint" className="mt-8">
          <div className="flex items-start gap-4">
            <Shield className="hidden h-14 w-14 shrink-0 sm:block" />
            <div>
              <h2 className="text-2xl">The short version</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-lg">
                {content.privacySummary(game).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      </Container>

      <Container className="py-10">
        <SectionedArticle sections={content.privacySections(game)} numbered />
      </Container>
    </>
  );
}
