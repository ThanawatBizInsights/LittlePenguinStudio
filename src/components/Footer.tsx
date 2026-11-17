import Link from "next/link";
import { studio } from "@/content/site";
import { Logo } from "./Logo";
import { Container } from "./Curve";
import { Sparkle, Wave } from "./illustrations/Decor";

const links = [
  { href: "/#games", label: "Games" },
  { href: "/about/", label: "Our Story" },
  { href: "/parents/", label: "For Parents" },
  { href: "/support/", label: "Support" },
  { href: "/privacy/", label: "Privacy" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark mt-16 bg-ink text-paper">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div className="space-y-4">
          <Logo variant="inline" tone="light" />
          <p className="max-w-xs text-paper/85">{studio.description}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center font-display text-lg font-semibold hover:text-butter">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3">
          <p className="relative font-display text-2xl font-bold leading-tight">
            <Sparkle className="absolute -left-6 -top-3 h-5 w-5" />
            Small games.
            <br />
            Big little discoveries.
          </p>
          <Wave className="h-3 w-40" color="#c9b3ec" />
          {studio.supportEmail ? (
            <p>
              Support:{" "}
              <a className="underline underline-offset-4 hover:text-butter" href={`mailto:${studio.supportEmail}`}>
                {studio.supportEmail}
              </a>
            </p>
          ) : null}
        </div>
      </Container>
      <div className="border-t border-paper/15">
        <Container className="flex flex-col gap-1 py-5 text-sm text-paper/75 sm:flex-row sm:justify-between">
          <p>
            © {year} {studio.publisherName || studio.name}
            {studio.publisherName && studio.publisherName !== studio.name ? ` · ${studio.name}` : ""}
          </p>
          <p>Made with care for little explorers.</p>
        </Container>
      </div>
    </footer>
  );
}
