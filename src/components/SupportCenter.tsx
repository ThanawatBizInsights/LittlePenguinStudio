"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { games, mailto, studio, type Game } from "@/content/site";
import { FaqList, Panel } from "./Content";
import { Button } from "./Button";
import { accentBg } from "./accent";

function faqsFor(game: Game): { q: string; a: ReactNode }[] {
  return [
    {
      q: `${game.title} won’t open or stops unexpectedly`,
      a: (
        <>
          <p>Try closing the app completely and opening it again. If that doesn’t help, restarting the device often clears things up.</p>
          <p>It can also help to check that the device has some free storage space and is running the latest software it supports.</p>
          <p>Still stuck? Contact us with the details listed below and we’ll take a look.</p>
        </>
      ),
    },
    {
      q: "There’s no sound or music",
      a: (
        <>
          <p>Check the device volume and whether the device is set to silent. If headphones or a speaker are connected, check where the sound is going.</p>
          <p>If the game has its own sound or music settings, make sure they’re switched on.</p>
        </>
      ),
    },
    {
      q: "How do I get the latest version?",
      a: (
        <p>
          Updates are delivered through the App Store. Open the App Store app to check for available updates. The app version is useful to include if you contact us.
        </p>
      ),
    },
    {
      q: "How do I report a problem?",
      a: (
        <p>
          Email us using the details below. Tell us what happened and what you expected to happen — a screenshot can help too, as long as it doesn’t show personal information.
        </p>
      ),
    },
  ];
}

export function SupportCenter() {
  const [slug, setSlug] = useState(games[0].slug);

  // Pre-select a game from ?app=slug without blocking server rendering.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("app");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL is only possible after mount in a static export
    if (requested && games.some((g) => g.slug === requested)) setSlug(requested);
  }, []);

  const game = games.find((g) => g.slug === slug) ?? games[0];
  const href = mailto(studio.supportEmail, `${game.title} support`);

  return (
    <div className="space-y-12">
      <fieldset>
        <legend className="mb-4 font-display text-2xl font-bold">Which game do you need help with?</legend>
        <div className="flex flex-wrap gap-3">
          {games.map((g) => (
            <label
              key={g.slug}
              className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-full py-2 pl-2 pr-6 font-display text-lg font-semibold ring-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt ${
                g.slug === slug ? "bg-ink text-paper ring-ink" : "bg-paper ring-ink/20 hover:ring-ink"
              }`}
            >
              <input
                type="radio"
                name="app"
                value={g.slug}
                checked={g.slug === slug}
                onChange={() => setSlug(g.slug)}
                className="sr-only"
              />
              <span aria-hidden="true" className={`h-10 w-10 rounded-full ${accentBg[g.accent]}`} />
              {g.title}
            </label>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-soft">More games will appear here as they’re released.</p>
      </fieldset>

      <section aria-labelledby="faq-title">
        <h2 id="faq-title" className="mb-5 text-4xl">
          {game.title}: common questions
        </h2>
        <FaqList items={faqsFor(game)} />
      </section>

      <section aria-labelledby="contact-title" className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel tone="mint">
          <h2 id="contact-title" className="text-3xl">Contact us</h2>
          {href ? (
            <>
              <p className="mt-3 text-lg">
                Email <strong>{studio.supportEmail}</strong> and we’ll get back to you as soon as we can.
              </p>
              <Button href={href} arrow className="mt-5">
                Email {game.title} support
              </Button>
            </>
          ) : (
            <p className="mt-3 text-lg">
              Our support email address will be published here before {game.title} launches.
            </p>
          )}
          <p className="mt-6 text-ink-soft">
            Looking for privacy information?{" "}
            <Link className="font-semibold text-ink underline underline-offset-4" href={`/privacy/${game.slug}/`}>
              Read the {game.title} privacy policy
            </Link>
            .
          </p>
        </Panel>
        <Panel tone="butter">
          <h2 className="text-2xl">Helpful details to include</h2>
          <ul className="mt-4 list-disc space-y-1.5 pl-6">
            <li>App name ({game.title})</li>
            <li>App version</li>
            <li>Device model, e.g. the type of iPhone or iPad</li>
            <li>Operating system version</li>
            <li>A short description of what happened</li>
          </ul>
          <p className="mt-5 rounded-2xl bg-paper p-4 font-semibold">
            Please don’t include children’s names, photos, or other personal information in your message.
          </p>
        </Panel>
      </section>
    </div>
  );
}
