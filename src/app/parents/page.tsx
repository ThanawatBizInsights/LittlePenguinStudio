import type { Metadata } from "next";
import Link from "next/link";
import { gamePaths, games, studio } from "@/content/site";
import { PageIntro, Panel } from "@/components/Content";
import { Container } from "@/components/Curve";
import { Button, TextLink } from "@/components/Button";
import { AppInfoTable } from "@/components/GameParts";
import { Snowy } from "@/components/Brand";
import { Heart, Shield, SpeechBubble, Star } from "@/components/illustrations/Decor";
import { canonical } from "@/content/env";

export const metadata: Metadata = {
  title: "For Parents",
  description: "Practical information for parents and carers about Little Snowy Owl Studio games, including app details, privacy and support.",
  alternates: canonical("/parents/"),
};

export default function ParentsPage() {
  return (
    <>
      <PageIntro
        eyebrow="For parents and carers"
        title="For the grown-ups"
        art={
          <div className="relative aspect-square rounded-[3rem] bg-lilac">
            <Heart className="absolute left-[8%] top-[10%] w-[18%]" />
            <Star className="absolute right-[10%] top-[8%] w-[16%] motion-safe:animate-twinkle" />
            <div className="absolute bottom-[4%] left-[18%] w-[64%]">
              <Snowy pose="reading" className="w-full" priority />
            </div>
          </div>
        }
      >
        <p>
          Plain-language information about our games: what they are, practical app details, and where to find privacy information and help.
        </p>
      </PageIntro>

      <Container>
        <Panel tone="butter" className="mb-10">
          <h2 className="text-2xl">A note on these details</h2>
          <p className="mt-2">
            We only list facts we’ve confirmed for the released app. Anything marked “Details to be confirmed” will be updated before launch.
          </p>
        </Panel>
      </Container>

      <section id="app-info" aria-labelledby="app-info-title" className="scroll-mt-6">
        <Container>
          <h2 id="app-info-title" className="text-4xl">App information</h2>
          <div className="mt-6 space-y-10">
            {games.map((g) => (
              <article key={g.slug} aria-labelledby={`info-${g.slug}`} className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                <div>
                  <h3 id={`info-${g.slug}`} className="text-3xl">{g.title}</h3>
                  <p className="mt-2 text-ink-soft">{g.summary}</p>
                  <TextLink href={gamePaths(g.slug).overview} className="mt-3">About {g.title}</TextLink>
                  <TextLink href={gamePaths(g.slug).support}>{g.title} support</TextLink>
                </div>
                <AppInfoTable details={g.details} caption={`${g.title} app information`} />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="privacy-support" aria-labelledby="ps-title" className="scroll-mt-6 py-16">
        <Container>
          <h2 id="ps-title" className="text-4xl">Privacy and support</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Panel tone="lilac" className="flex flex-col gap-3">
              <Shield className="h-14 w-14" />
              <h3 className="text-2xl">Privacy</h3>
              <p>Each game has its own privacy policy, alongside a separate notice for this website.</p>
              <ul className="space-y-1">
                {games.map((g) => (
                  <li key={g.slug}>
                    <Link className="font-semibold underline underline-offset-4" href={gamePaths(g.slug).privacy}>
                      {g.title} privacy policy
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="font-semibold underline underline-offset-4" href="/privacy/">Privacy overview</Link>
                </li>
              </ul>
            </Panel>
            <Panel tone="mint" className="flex flex-col gap-3">
              <SpeechBubble className="h-14 w-14" />
              <h3 className="text-2xl">Support</h3>
              <p>Answers to common questions, plus what to include when you contact us.</p>
              <Button href="/support/" arrow className="self-start">
                Visit support
              </Button>
              {!studio.supportEmail && <p className="text-sm text-ink-soft">Our support email address will be published here soon.</p>}
            </Panel>
          </div>
        </Container>
      </section>
    </>
  );
}
