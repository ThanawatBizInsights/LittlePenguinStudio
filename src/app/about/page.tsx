import type { Metadata } from "next";
import { games, studio } from "@/content/site";
import { PageIntro, Panel } from "@/components/Content";
import { Container } from "@/components/Curve";
import { Button } from "@/components/Button";
import { Art } from "@/components/Art";
import { Penguin } from "@/components/illustrations/Penguin";
import { Cloud, Flower, Sparkle, Star } from "@/components/illustrations/Decor";

export const metadata: Metadata = {
  title: "Our Story",
  description: studio.story,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title="Meet Little Penguin"
        art={
          <div className="relative aspect-square rounded-full bg-mint">
            <Cloud className="absolute left-[2%] top-[12%] w-[28%]" />
            <Sparkle className="absolute right-[12%] top-[8%] w-[12%]" />
            <Star className="absolute right-[4%] top-[40%] w-[14%] motion-safe:animate-twinkle" />
            <div className="absolute bottom-[4%] left-[14%] w-[68%]">
              <Art slot="penguinReading" alt="Little Penguin reading a picture book" className="w-full" fallback={<Penguin pose="reading" bob className="w-full" title="Little Penguin reading a picture book" />} />
            </div>
          </div>
        }
      >
        <p>{studio.story}</p>
      </PageIntro>

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
