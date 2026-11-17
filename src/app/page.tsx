import Link from "next/link";
import { games, studio } from "@/content/site";
import { Button, TextLink, Arrow } from "@/components/Button";
import { Container, CurvedSection, Eyebrow } from "@/components/Curve";
import { Penguin } from "@/components/illustrations/Penguin";
import { animalArt, animalKinds, type AnimalKind } from "@/components/illustrations/Animals";
import { Art, Tile, hasArt } from "@/components/Art";
import { artSlots } from "@/content/art";
import {
  Blocks, Bubble, Bulb, Cloud, Family, Heart, Puzzle, Shield, Smiley, Sparkle, SpeechBubble, Star, Wave, Iceberg,
} from "@/components/illustrations/Decor";
import { GameKeyArt, GameCard, StoreCta } from "@/components/GameParts";
import { MiniMatchGame } from "@/components/MiniMatchGame";

const featured = games[0];

const strip = [
  { icon: Puzzle, label: "Playful puzzles" },
  { icon: Heart, label: "Friendly characters" },
  { icon: Bulb, label: "Little discoveries" },
  { icon: Family, label: "Family moments" },
];

const parentCards = [
  {
    title: "About the game",
    text: "What Animal Pairs is and how a round of matching works.",
    href: `/games/${featured.slug}/`,
    bg: "bg-butter-soft",
    icon: <Puzzle className="h-12 w-12" />,
  },
  {
    title: "Practical app information",
    text: "Devices, languages, age rating and other details in plain language.",
    href: "/parents/#app-info",
    bg: "bg-mint-soft",
    icon: <Bulb className="h-12 w-12" />,
  },
  {
    title: "Privacy and support",
    text: "How to reach us and where to read each app’s privacy policy.",
    href: "/parents/#privacy-support",
    bg: "bg-lilac-soft",
    icon: <Shield className="h-12 w-12" />,
  },
];

const tileArt = Object.fromEntries(
  animalKinds.filter((k) => hasArt(animalArt[k])).map((k) => [k, artSlots[animalArt[k]]]),
) as Partial<Record<AnimalKind, string>>;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative">
        <Container className="grid items-center gap-6 pb-6 pt-4 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-14 lg:pt-6">
          <div className="relative z-10 order-2 lg:order-1">
            <Eyebrow>Play. Wonder. Discover.</Eyebrow>
            <h1 id="hero-title" className="mt-4 text-[clamp(2.7rem,7.2vw,5.2rem)] leading-[0.98]">
              Little games.
              <br />
              Big happy discoveries.
            </h1>
            <Wave className="mt-5 h-4 w-48" />
            <p className="mt-6 max-w-md text-xl text-ink-soft sm:text-2xl">{studio.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#games" arrow>
                Explore our games
              </Button>
              <TextLink href="/about/">Meet Little Penguin</TextLink>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative order-1 mx-auto aspect-[1.08] w-full max-w-[34rem] lg:order-2 lg:max-w-none">
            <svg viewBox="0 0 600 560" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3d6fe0" />
                  <stop offset="1" stopColor="#2a54c0" />
                </linearGradient>
              </defs>
              <path
                d="M120 40 C220 -10 330 30 420 18 C520 6 590 60 596 160 C602 260 600 420 560 500 C520 560 380 556 260 548 C140 540 40 530 14 440 C-10 350 40 300 50 220 C60 130 40 80 120 40 Z"
                fill="url(#heroSky)"
              />
            </svg>
            <Cloud className="absolute right-[4%] top-[8%] w-[18%]" />
            <Cloud className="absolute left-[10%] top-[52%] w-[13%] opacity-90" />
            <Bubble className="absolute left-[44%] top-[6%] w-[6%]" />
            <Bubble className="absolute right-[30%] top-[46%] w-[4%]" />
            <Star className="absolute right-[24%] top-[3%] w-[16%] motion-safe:animate-twinkle" />
            <Sparkle className="absolute left-[30%] top-[22%] w-[7%]" color="#ffd94d" />
            <Tile kind="fox" className="absolute left-[6%] top-[8%] w-[25%] -rotate-[8deg]" />
            <Tile kind="bear" className="absolute left-[4%] top-[58%] w-[24%] rotate-[6deg]" />
            <Tile kind="bunny" className="absolute right-[3%] top-[26%] w-[23%] rotate-[8deg]" />
            <Iceberg className="absolute bottom-[3%] left-[18%] w-[66%]" />
            <div className="absolute bottom-[12%] left-[30%] w-[42%] motion-safe:animate-bob">
              <Art slot="penguinWave" className="w-full" fallback={<Penguin pose="wave" className="w-full" />} />
            </div>
            <div
              aria-hidden="true"
              className="absolute bottom-[2%] right-[0%] grid aspect-square w-[24%] -rotate-12 place-items-center rounded-full bg-butter p-2 text-center font-display text-[clamp(0.8rem,2.4vw,1.2rem)] font-bold leading-tight shadow-[0_6px_0_0_rgba(28,35,80,0.18)] ring-4 ring-paper"
            >
              Made for little explorers
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURE STRIP */}
      <CurvedSection color="#c9b3ec" className="py-6">
        <Container>
          <h2 className="sr-only">What our games are about</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
            {strip.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={`flex items-center gap-3 md:justify-center ${i > 0 ? "md:border-l-2 md:border-ink/15" : ""}`}
              >
                <Icon className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <span className="font-display text-lg font-semibold leading-tight sm:text-xl">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </CurvedSection>

      {/* GAMES */}
      <section id="games" aria-labelledby="games-title" className="scroll-mt-4 py-16 sm:py-20">
        <Container>
          <Eyebrow>Our little game world</Eyebrow>
          <h2 id="games-title" className="sr-only">Our games</h2>

          {/* Featured game */}
          <article
            aria-labelledby="featured-title"
            className="mt-5 grid overflow-hidden rounded-[2.5rem] bg-paper shadow-[0_10px_0_0_rgba(28,35,80,0.08)] ring-1 ring-ink/10 md:grid-cols-2"
          >
            <div className="relative min-h-72 bg-butter md:min-h-[26rem]">
              <GameKeyArt game={featured} className="absolute inset-0" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
              <p className="font-extrabold uppercase tracking-[0.14em] text-coral-deep">Our first little adventure</p>
              <h3 id="featured-title" className="text-[clamp(2.4rem,5vw,3.5rem)]">{featured.title}</h3>
              <p className="text-xl text-ink-soft">{featured.summary}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button href={`/games/${featured.slug}/`} arrow>
                  Meet the game
                </Button>
                <StoreCta game={featured} />
              </div>
            </div>
          </article>

          {/* Growing world */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_2.2fr] lg:items-start">
            <div>
              <h3 className="text-[clamp(2rem,4vw,2.8rem)]">Our little world is growing.</h3>
              <Wave className="mt-3 h-3.5 w-32" color="#ffd94d" />
              <p className="mt-4 text-lg text-ink-soft">
                New games will appear here as they’re ready. We’ll share them when there’s something real to show.
              </p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {games.map((g) => (
                <li key={g.slug}>
                  <GameCard game={g} />
                </li>
              ))}
              <li>
                <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-paper ring-1 ring-ink/10">
                  <div className="relative aspect-[4/3] bg-mint">
                    <Penguin pose="telescope" className="absolute bottom-[4%] left-1/2 w-[46%] -translate-x-1/2" />
                    <Cloud className="absolute left-[8%] top-[10%] w-[22%]" />
                    <Sparkle className="absolute right-[10%] top-[10%] w-[10%]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-2xl">More little adventures</h3>
                    <p className="text-ink-soft">Little Penguin is looking out for what comes next.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* MINI-GAME */}
      <CurvedSection color="#d4f2e4" className="py-12 sm:py-16" labelledBy="play-title">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow>Try a little matching</Eyebrow>
            <h2 id="play-title" className="mt-3 text-[clamp(2.2rem,5vw,3.4rem)]">Find the animal pairs</h2>
            <p className="mt-3 text-lg text-ink-soft">
              A tiny game you can play right here. It’s a playful preview made for this website — not the Animal Pairs app itself.
            </p>
          </div>
          <MiniMatchGame tileArt={tileArt} />
        </Container>
      </CurvedSection>

      {/* STORY + GROWN-UPS BAND */}
      <section aria-label="Our story and information for grown-ups" className="mt-16">
        <div className="grid overflow-hidden lg:grid-cols-[1fr_1.1fr_1fr]">
          <div className="relative bg-coral-soft px-6 py-12 text-ink sm:px-10 lg:rounded-r-[4rem] lg:py-16">
            <Sparkle className="absolute left-5 top-5 w-8" />
            <h2 className="text-[clamp(2.2rem,4.4vw,3.2rem)]">Small moments. Wonderful memories.</h2>
            <Wave className="mt-3 h-3.5 w-36" color="#fffaf2" />
            <p className="mt-5 max-w-md text-lg font-semibold">{studio.story}</p>
            <Link
              href="/about/"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 font-display text-lg font-semibold"
            >
              Read our story <Arrow />
            </Link>
          </div>
          <div className="relative min-h-72 bg-mint">
            <Blocks className="absolute bottom-6 left-1/2 w-[86%] max-w-md -translate-x-1/2" />
            <div className="absolute bottom-6 left-1/2 w-[46%] max-w-[13rem] -translate-x-1/2">
              <Art slot="penguinStar" className="w-full motion-safe:animate-bob" fallback={<Penguin pose="star" bob className="w-full" />} />
            </div>
            <Sparkle className="absolute right-[20%] top-8 w-10" />
            <Star className="absolute left-[12%] top-10 w-10 motion-safe:animate-twinkle" />
          </div>
          <div className="relative flex flex-col items-center justify-center bg-lilac px-6 py-12 text-center sm:px-10 lg:rounded-l-[4rem]">
            <Smiley className="h-16 w-16" />
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,3rem)]">For the grown-ups</h2>
            <p className="mt-3 max-w-sm text-lg">App details, privacy and support — all in one place.</p>
            <Button href="/parents/" variant="outline" arrow className="mt-6">
              Parent information
            </Button>
          </div>
        </div>
      </section>

      {/* PARENTS PREVIEW */}
      <section aria-labelledby="parents-title" className="py-16 sm:py-20">
        <Container>
          <Eyebrow>For parents and carers</Eyebrow>
          <h2 id="parents-title" className="mt-3 text-[clamp(2.2rem,5vw,3.2rem)]">Everything you need to know</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {parentCards.map((c) => (
              <li key={c.title}>
                <Link
                  href={c.href}
                  className={`group flex h-full flex-col gap-3 rounded-[2rem] p-6 ring-1 ring-ink/10 transition-transform hover:-translate-y-1 ${c.bg}`}
                >
                  {c.icon}
                  <h3 className="text-2xl">{c.title}</h3>
                  <p className="text-ink-soft">{c.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold">
                    Find out more <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-[2rem] bg-mint-soft p-6 ring-1 ring-ink/10 sm:flex-row sm:items-center">
              <SpeechBubble className="h-16 w-16 shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl">Need a little help?</h3>
                <p className="mt-1 text-ink-soft">Find answers to common questions and how to get in touch about our games.</p>
              </div>
              <Button href="/support/" arrow className="!min-h-11 !px-5 !text-base">
                Visit support
              </Button>
            </div>
            <div className="flex flex-col gap-4 rounded-[2rem] bg-butter-soft p-6 ring-1 ring-ink/10 sm:flex-row sm:items-center">
              <Shield className="h-16 w-16 shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl">Privacy, made clear.</h3>
                <p className="mt-1 text-ink-soft">Learn how we handle information for our website and our games.</p>
              </div>
              <Button href="/privacy/" arrow className="!min-h-11 !px-5 !text-base">
                Privacy information
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
