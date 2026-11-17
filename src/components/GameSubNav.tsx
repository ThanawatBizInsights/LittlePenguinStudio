import Link from "next/link";
import { gamePaths, type Game } from "@/content/site";

/** Tabs linking a game's overview, support and privacy pages. */
export function GameSubNav({ game, current }: { game: Game; current: "overview" | "support" | "privacy" }) {
  const p = gamePaths(game.slug);
  const tabs = [
    { key: "overview", href: p.overview, label: "Overview" },
    { key: "support", href: p.support, label: "Support" },
    { key: "privacy", href: p.privacy, label: "Privacy" },
  ] as const;
  return (
    <nav aria-label={`${game.title} pages`} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <ul className="flex flex-wrap items-center gap-2 rounded-full bg-paper p-1.5 ring-1 ring-ink/10 sm:inline-flex">
        <li className="hidden items-center gap-2 pl-1 pr-2 sm:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={game.icon} alt="" aria-hidden="true" width={36} height={36} className="h-9 w-9 rounded-[22%]" />
          <span className="font-display font-semibold">{game.title}</span>
        </li>
        {tabs.map((t) => (
          <li key={t.key}>
            <Link
              href={t.href}
              aria-current={current === t.key ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-5 font-display text-base font-semibold transition-colors ${
                current === t.key ? "bg-ink text-paper" : "hover:bg-butter-soft"
              }`}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
