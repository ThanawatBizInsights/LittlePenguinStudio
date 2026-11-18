import type { Metadata } from "next";
import { games, studio } from "@/content/site";
import { PageIntro, Panel } from "@/components/Content";
import { Container } from "@/components/Curve";
import { Button } from "@/components/Button";
import { Snowy, Sticker } from "@/components/Brand";
import { Cloud, Flower, Sparkle, Star } from "@/components/illustrations/Decor";
import { canonical } from "@/content/env";

export const metadata: Metadata = {
  title: "Our Story",
  description: studio.story,
  alternates: canonical("/about/"),
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title={`Meet ${studio.mascotName}`}
        art={
          <div className="relative aspect-square rounded-full bg-mint">
            <Cloud className="absolute left-[2%] top-[12%] w-[28%]" />
            <Sparkle className="absolute right-[12%] top-[8%] w-[12%]" />
            <Star className="absolute right-[4%] top-[40%] w-[14%] motion-safe:animate-twinkle" />
            <div className="absolute bottom-[4%] left-[14%] w-[68%]">
              <Snowy pose="wave" labelled bob className="w-full" priority />
            </div>
          </div>
        }
      >
        <p>{studio.story}</p>
      </PageIntro>

      <Container className="pb-8">
        <Panel tone="mint" className="relative overflow-hidden">
          <Sticker name="feather-a" className="absolute -right-2 -top-2 w-16 rotate-12 sm:w-20" />
          <h2 className="text-3xl">Who is {studio.mascotName}?</h2>
          <p className="mt-3 max-w-2xl text-lg">
            {studio.mascotName} is the little snowy owl at the heart of {studio.name}: soft white feathers, silver-grey spots,
            violet eyes and a tiny three-feather tuft. You’ll find her here on our website, waving hello alongside her friends.
          </p>
        </Panel>
      </Container>

      <Container className="grid gap-6 pb-8 md:grid-cols-2">
        <Panel tone="butter">
          <h2 className="text-3xl">What we make</h2>
          <p className="mt-3 text-lg">
            We make calm, colourful games with friendly characters for children to enjoy — and for grown-ups to enjoy alongside them.
          </p>
        </Panel>
        <Panel tone="lilac">
          <h2 className="text-3xl">Where we’re starting</h2>
          <p className="mt-3 text-lg">
            Our first game is <strong>{games[0].title}</strong>: {games[0].summary.charAt(0).toLowerCase() + games[0].summary.slice(1)}
          </p>
          <Button href={`/games/${games[0].slug}/`} arrow className="mt-5">
            Meet the game
          </Button>
        </Panel>
      </Container>

      <Container className="py-8">
        <Panel className="relative overflow-hidden text-center">
          <Flower className="absolute -left-3 -top-3 w-16" />
          <Flower className="absolute -bottom-3 -right-3 w-16" color="#c9b3ec" />
          <h2 className="text-3xl">More adventures to come</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">
            Animal Pairs is just the beginning. When our next little world is ready, you’ll find it on our homepage.
          </p>
        </Panel>
      </Container>
    </>
  );
}
