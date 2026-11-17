import Link from "next/link";
import { Penguin } from "./illustrations/Penguin";
import { Sparkle } from "./illustrations/Decor";

/** Compact penguin mark — used for favicon-sized and mobile placements. */
export function PenguinMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-grid place-items-center rounded-full bg-paper ${className}`} aria-hidden="true">
      <Penguin pose="stand" className="h-[86%] w-[86%] translate-y-[4%]" />
    </span>
  );
}

type LogoProps = {
  variant?: "stacked" | "inline";
  tone?: "ink" | "light";
  className?: string;
  /** Wrap in a home link (default true). */
  link?: boolean;
};

/** Little Penguin Studio logo lockup. */
export function Logo({ variant = "stacked", tone = "ink", className = "", link = true }: LogoProps) {
  const text = tone === "light" ? "text-paper" : "text-ink";
  const rule = tone === "light" ? "bg-paper/70" : "bg-ink/70";

  const content =
    variant === "stacked" ? (
      <span className={`relative inline-flex flex-col items-center leading-none ${text} ${className}`}>
        <span className="relative -mb-1" aria-hidden="true">
          <Penguin pose="wave" className="h-14 w-14" />
          <Sparkle className="absolute -right-4 top-0 h-5 w-5" />
        </span>
        <span className="font-display text-[2rem] font-bold uppercase tracking-tight">Little</span>
        <span className="font-display text-[2rem] font-bold uppercase tracking-tight">Penguin</span>
        <span className="mt-1 flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.35em]">
          <span className={`h-0.5 w-4 ${rule}`} />Studio<span className={`h-0.5 w-4 ${rule}`} />
        </span>
      </span>
    ) : (
      <span className={`inline-flex items-center gap-2.5 ${text} ${className}`}>
        <PenguinMark className="h-12 w-12 shrink-0 shadow-sm" />
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold uppercase tracking-tight">Little Penguin</span>
          <span className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.35em]">Studio</span>
        </span>
      </span>
    );

  if (!link) return content;
  return (
    <Link href="/" className="inline-block rounded-2xl" aria-label="Little Penguin Studio — home">
      {content}
    </Link>
  );
}
