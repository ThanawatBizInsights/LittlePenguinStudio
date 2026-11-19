import type { Metadata } from "next";
import Link from "next/link";
import { gamePaths, games, PH, studio } from "@/content/site";
import { EmailLink, PageIntro, Panel } from "@/components/Content";
import { Container } from "@/components/Curve";
import { Arrow } from "@/components/Button";
import { Snowy } from "@/components/Brand";
import { Bubble, SpeechBubble } from "@/components/illustrations/Decor";
import { canonical } from "@/content/env";

/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: "Support",
  description: "Help with Little Snowy Owl Studio games. Choose a game for its support page, or contact us.",
  alternates: canonical("/support/"),
};

export default function SupportHub() {
  return (
    <>
      <PageIntro
        eyebrow="Support"
        title="Need a little help?"
        art={
          <div className="relative aspect-square rounded-full bg-sky">
            <SpeechBubble className="absolute right-[6%] top-[6%] w-[26%]" />
            <Bubble className="absolute left-[12%] top-[16%] w-[10%]" />
            <div className="absolute bottom-[4%] left-[14%] w-[66%]">
              <Snowy pose="reading" className="w-full" priority />
            </div>
          </div>
        }
      >
        <p>Choose a game to find answers to common questions, sound settings and subscription help.</p>
      </PageIntro>

      <Container className="space-y-10 pb-6">
        <section aria-labelledby="choose">
          <h2 id="choose" className="text-3xl">Which game do you need help with?</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {games.map((g) => (
              <li key={g.slug}>
                <Link
                  href={gamePaths(g.slug).support}
                  className="group flex min-h-24 items-center gap-4 rounded-[1.75rem] bg-paper p-5 ring-1 ring-ink/10 hover:ring-ink"
                >
                  <img src={g.icon} alt="" width={64} height={64} className="h-16 w-16 rounded-[22%]" />
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-semibold">{g.title} support</span>
                    <span className="text-ink-soft">Sound, subscription, progress and contact</span>
                  </span>
                  <Arrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-soft">More games will appear here as they’re released.</p>
        </section>

        <Panel tone="mint">
          <h2 className="text-3xl">Contact us</h2>
          <p className="mt-3 text-lg">
            Email <EmailLink email={studio.supportEmail} ph={PH.supportEmail} />. Please tell us which game you’re asking about, and
            don’t include personal information about your child.
          </p>
        </Panel>
      </Container>
    </>
  );
}
