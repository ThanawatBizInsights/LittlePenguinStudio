import type { ReactNode } from "react";
import { Container } from "./Curve";
import { Wave } from "./illustrations/Decor";

/** Simple page header used by inner pages. */
export function PageIntro({
  eyebrow,
  title,
  children,
  art,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <Container className="grid items-center gap-8 pb-10 pt-6 md:grid-cols-[1.4fr_1fr] md:pt-10">
      <div>
        {eyebrow && <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-coral-deep">{eyebrow}</p>}
        <h1 className="text-[clamp(2.4rem,6vw,4rem)]">{title}</h1>
        <Wave className="mt-3 h-4 w-40" />
        {children && <div className="mt-5 max-w-2xl text-xl text-ink-soft">{children}</div>}
      </div>
      {art && <div className="relative mx-auto w-full max-w-xs md:max-w-sm">{art}</div>}
    </Container>
  );
}

export function Panel({ children, className = "", tone = "paper" }: { children: ReactNode; className?: string; tone?: "paper" | "mint" | "butter" | "lilac" }) {
  const bg = { paper: "bg-paper", mint: "bg-mint-soft", butter: "bg-butter-soft", lilac: "bg-lilac-soft" }[tone];
  return <div className={`rounded-[1.75rem] p-6 ring-1 ring-ink/10 sm:p-8 ${bg} ${className}`}>{children}</div>;
}

export function FaqList({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-3xl bg-paper ring-1 ring-ink/10 open:ring-2 open:ring-cobalt/40">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-3 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-butter text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="prose-lp px-6 pb-5 text-ink-soft">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function DraftBanner({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="flex items-start gap-3 rounded-3xl border-[3px] border-dashed border-orange bg-butter-soft p-5">
      <span aria-hidden="true" className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange font-display font-bold text-white">!</span>
      <div className="font-semibold">{children}</div>
    </div>
  );
}

/** A visibly highlighted, machine-detectable placeholder for an unconfirmed fact. */
export function Ph({ children }: { children: ReactNode }) {
  return (
    <mark data-placeholder="" className="rounded-md bg-butter px-1.5 py-0.5 font-bold text-ink ring-2 ring-orange">
      {children}
    </mark>
  );
}

/** Shows a value, or its placeholder when empty. */
export function Val({ value, ph }: { value: string | null | undefined; ph: string }) {
  return value ? <>{value}</> : <Ph>{ph}</Ph>;
}

/** Email link, or its placeholder when not configured. */
export function EmailLink({ email, ph, subject }: { email: string; ph: string; subject?: string }) {
  if (!email) return <Ph>{ph}</Ph>;
  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
  return (
    <a className="font-semibold text-cobalt-deep underline underline-offset-4" href={href}>
      {email}
    </a>
  );
}

/** Review banner listing unresolved facts. Renders nothing once everything is filled in. */
export function NotReadyBanner({ items, extra }: { items: { label: string }[]; extra?: ReactNode }) {
  if (!items.length && !extra) return null;
  return (
    <DraftBanner>
      <p>Draft for review — not ready to publish.</p>
      {items.length > 0 && (
        <p className="mt-1 font-normal">
          Still needed: {items.map((i) => i.label).join(", ")}.
        </p>
      )}
      {extra && <div className="mt-1 font-normal">{extra}</div>}
    </DraftBanner>
  );
}
