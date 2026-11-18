import Link from "next/link";
import { gamePaths, games, studio } from "@/content/site";
import { Button, TextLink, Arrow } from "@/components/Button";
import { Container, CurvedSection, Eyebrow } from "@/components/Curve";
import { Penguin } from "@/components/illustrations/Penguin";
import { HeroCanyon, Snowy, SnowyPromo, Sticker } from "@/components/Brand";
import {
  Bulb, Family, Heart, Puzzle, Shield, Smiley, Sparkle, SpeechBubble, Star, Wave,
} from "@/components/illustrations/Decor";
import { GameCard, StoreCta } from "@/components/GameParts";

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
    href: gamePaths(featured.slug).overview,
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

export default function Home() {
  return (
    <>
      {/* HERO — copy above the art on phones/tablets; over the open left side of the art on desktop */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="relative flex flex-col lg:block lg:h-[clamp(34rem,56.25vw,46rem)] lg:w-full">
          <HeroCanyon
            alt={`${studio.mascotName} the snowy owl smiling on a snowy ledge above a pastel canyon river`}
            className="order-2 block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-[72%_60%]"
          />
          {/* Soft cream wash behind the copy on desktop for contrast */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-cream/90 via-cream/60 to-transparent lg:block"
          />
          <Container className="relative order-1 pb-8 pt-4 lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0">
            <div className="relative max-w-[34rem]">
              <Sticker name="snowflake-b" className="absolute -right-4 -top-2 hidden w-14 rotate-12 opacity-90 sm:block lg:-right-16" />
              <Eyebrow>Play. Wonder. Discover.</Eyebrow>
              <h1 id="hero-title" className="mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98]">
                Little games.
                <br />
                Big happy discoveries.
              </h1>
              <Wave className="mt-5 h-4 w-48" />
              <p className="mt-6 max-w-md text-xl text-ink-soft sm:text-2xl">
                Welcome to {studio.name}, home of Animal Pairs and playful little worlds for curious minds.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href={gamePaths(featured.slug).overview} arrow>
                  Meet Animal Pairs
                </Button>
                <TextLink href="/about/">Meet {studio.mascotName}</TextLink>
              </div>
            </div>
          </Container>
        </div>
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
      <section id="games" aria-labelledby="games-title" className="relative scroll-mt-4 py-16 sm:py-20">
        <Sticker name="cloud-a" className="absolute right-4 top-6 hidden w-24 opacity-90 lg:block xl:right-12" />
        <Container>
          <Eyebrow>Our little game world</Eyebrow>
          <h2 id="games-title" className="sr-only">Our games</h2>

          {/* Featured game */}
          <article
            aria-labelledby="featured-title"
            className="mt-5 grid overflow-hidden rounded-[2.5rem] bg-paper shadow-[0_10px_0_0_rgba(28,35,80,0.08)] ring-1 ring-ink/10 md:grid-cols-2"
          >
            <div className="relative grid place-items-center bg-lilac-soft p-6 sm:p-8">
              <SnowyPromo className="w-full max-w-[34rem]" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
              <p className="font-extrabold uppercase tracking-[0.14em] text-coral-deep">Our first little adventure</p>
              <h3 id="featured-title" className="text-[clamp(2.4rem,5vw,3.5rem)]">{featured.title}</h3>
              <p className="text-xl text-ink-soft">{featured.summary}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button href={gamePaths(featured.slug).overview} arrow>
                  Meet the game
                </Button>
                <StoreCta game={featured} />
              </div>
            </div>
          </article>

          {/* Growing world */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_2.2fr] lg:items-start">
            <div className="relative">
              <Snowy pose="star" className="mb-4 w-28 sm:w-32" />
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
                  <div className="relative grid aspect-[4/3] place-items-center bg-mint-soft">
                    <Snowy pose="nap" className="w-[46%]" />
                    <Sticker name="moon-b" className="absolute right-[9%] top-[9%] w-[13%]" />
                    <Sticker name="star-b" className="absolute left-[10%] top-[14%] w-[9%]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-2xl">More little adventures</h3>
                    <p className="text-ink-soft">{studio.mascotName} and her friends are dreaming up what comes next.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Container>
        <Sticker name="feather-b" className="absolute bottom-2 left-4 hidden w-16 -rotate-12 opacity-90 lg:block xl:left-12" />
      </section>

      {/* STORY + GROWN-UPS BAND */}
      <section aria-label="Our story and information for grown-ups" className="mt-4">
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
          {/* Snowy waving hello, with her penguin friend beside her */}
          <div className="relative flex min-h-72 items-end justify-center gap-2 bg-mint px-6 pb-6 pt-14">
            <Snowy pose="wave" bob className="w-[42%] max-w-[13rem]" />
            <Penguin pose="cheer" className="w-[34%] max-w-[10.5rem]" />
            <Sparkle className="absolute right-[16%] top-6 w-10" />
            <Star className="absolute left-[12%] top-8 w-10 motion-safe:animate-twinkle" />
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
      <section aria-labelledby="parents-title" className="relative py-16 sm:py-20">
        <Container>
          <div className="relative">
            <Eyebrow>For parents and carers</Eyebrow>
            <h2 id="parents-title" className="mt-3 text-[clamp(2.2rem,5vw,3.2rem)]">Everything you need to know</h2>
            <Sticker name="heart-b" className="absolute right-0 top-0 hidden w-16 rotate-6 md:block" />
            <Sticker name="star-a" className="absolute right-20 top-6 hidden w-10 -rotate-12 md:block" />
          </div>
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
