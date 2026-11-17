import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { MobileMenu } from "./MobileMenu";
import { Container } from "./Curve";

const linkCls =
  "inline-flex min-h-11 items-center rounded-full px-3 font-display text-lg font-semibold text-ink transition-colors hover:bg-butter-soft";

export function Header() {
  const left = nav.slice(0, 2);
  const right = nav.slice(2);
  return (
    <header className="relative z-30">
      <Container className="py-3 lg:py-4">
        {/* Desktop: split navigation around a centred logo */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-6 lg:grid">
          <nav aria-label="Main" className="justify-self-start">
            <ul className="flex items-center gap-2">
              {left.map((l) => (
                <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <Logo variant="stacked" className="scale-90" />
          <div className="flex items-center gap-2 justify-self-end">
            <nav aria-label="Main, continued">
              <ul className="flex items-center gap-2">
                {right.map((l) => (
                  <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
            <Button href="/#games" className="ml-2 hidden !min-h-11 !px-5 !text-base xl:inline-flex">
              Explore our games
            </Button>
          </div>
        </div>

        {/* Mobile & tablet portrait */}
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Logo variant="inline" />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
