import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "coral" | "cobalt" | "outline" | "light";

const styles: Record<Variant, string> = {
  coral:
    "bg-coral-button text-white shadow-[0_5px_0_0_var(--color-coral-button-edge)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_0_var(--color-coral-button-edge)] active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--color-coral-button-edge)]",
  cobalt:
    "bg-cobalt text-white shadow-[0_5px_0_0_var(--color-cobalt-deep)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_0_var(--color-cobalt-deep)] active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--color-cobalt-deep)]",
  outline: "bg-paper text-ink ring-2 ring-ink hover:bg-white hover:-translate-y-0.5",
  light: "bg-paper text-ink hover:bg-white hover:-translate-y-0.5",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-display text-lg font-semibold no-underline transition-[transform,box-shadow,background-color] duration-150";

export function Arrow({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

/** Pill-shaped call-to-action link. */
export function Button({ href, children, variant = "coral", arrow = false, className = "", external = false }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Simple underlined text link with arrow. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-1.5 font-display text-lg font-semibold underline decoration-2 underline-offset-4 ${className}`}
    >
      {children}
      <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
