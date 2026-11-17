import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games, getGame } from "@/content/site";
import { Container, CurvedSection, Eyebrow } from "@/components/Curve";
import { Button, TextLink } from "@/components/Button";
import { AnimalPairsArt, AppInfoTable, ScreenshotGallery, StatusPill, StoreCta, accentBg } from "@/components/GameParts";
import { Cloud, Star, Wave } from "@/components/illustrations/Decor";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const game = getGame((await params).slug);
  if (!game) return {};
  return {
    title: game.title,
    description: `${game.title} by Little Penguin Studio — ${game.summary}`,
    alternates: { canonical: `/games/${game.slug}/` },
    openGraph: { title: game.title, description: game.summary },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  return (
    <>
      <section aria-labelledby="game-title">
        <Container className="grid items-center gap-8 pb-12 pt-4 md:grid-cols-2 md:pt-8">
          <div>
            <Eyebrow>{game.slug === games[0].slug ? "Our first little adventure" : "A Little Penguin Studio game"}</Eyebrow>
            <h1 id="game-title" className="mt-3 text-[clamp(2.8rem,7vw,4.8rem)]">{game.title}</h1>
            <Wave className="mt-3 h-4 w-44" color="#ffd94d" />
            <p className="mt-5 text-2xl text-ink-soft">{game.tagline}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <StoreCta game={game} />
              {game.appStoreUrl ? <StatusPill game={game} /> : null}
            </div>
          </div>
          <div className={`relative aspect-square w-full overflow-hidden rounded-[2.5rem] ${accentBg[game.accent]}`}>
            {game.slug === "animal-pairs" ? <AnimalPairsArt className="absolute inset-[8%]" /> : null}
            <Cloud className="absolute left-[6%] top-[6%] w-[22%]" />
            <Star className="absolute bottom-[8%] left-[8%] w-[10%]" />
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 pb-12 lg:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="about-game" className="prose-lp text-lg">
          <h2 id="about-game" className="mb-4 text-4xl">About the game</h2>
          {game.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <section aria-labelledby="how-to-play" className="rounded-[2rem] bg-butter-soft p-6 ring-1 ring-ink/10 sm:p-8">
          <h2 id="how-to-play" className="text-3xl">How matching works</h2>
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
          <p className="mb-6 mt-2 text-ink-soft">
            {game.screenshots.length ? `Screens from ${game.title}.` : "Real screenshots from the finished app will appear here."}
          </p>
          <ScreenshotGallery game={game} />
        </Container>
      </CurvedSection>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="app-info">
          <h2 id="app-info" className="mb-5 text-4xl">App information</h2>
          <AppInfoTable details={game.details} caption={`${game.title} app information`} />
        </section>
        <section aria-labelledby="help" className="flex flex-col gap-4 self-start rounded-[2rem] bg-mint-soft p-6 ring-1 ring-ink/10 sm:p-8">
          <h2 id="help" className="text-3xl">Help &amp; privacy</h2>
          <p className="text-ink-soft">Questions about {game.title}? We’re here to help.</p>
          <Button href={`/support/?app=${game.slug}`} arrow>
            {game.title} support
          </Button>
          <TextLink href={`/privacy/${game.slug}/`}>{game.title} privacy policy</TextLink>
        </section>
      </Container>
    </>
  );
}
