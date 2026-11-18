import Link from "next/link";
import { studio } from "@/content/site";
import { SnowyMark } from "./Brand";
import { Sparkle } from "./illustrations/Decor";

/** Compact studio mark: Snowy's head on a soft snow disc. Decorative. */
export function StudioMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-grid place-items-center overflow-hidden rounded-full bg-[#ece6fa] ring-2 ring-paper ${className}`}
      aria-hidden="true"
    >
      <SnowyMark className="w-[88%] translate-y-[6%]" />
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

/** Little Snowy Owl Studio logo lockup. */
export function Logo({ variant = "stacked", tone = "ink", className = "", link = true }: LogoProps) {
  const text = tone === "light" ? "text-paper" : "text-ink";
  const rule = tone === "light" ? "bg-paper/70" : "bg-ink/70";

  const content =
    variant === "stacked" ? (
      <span className={`relative inline-flex flex-col items-center leading-none ${text} ${className}`}>
        <span className="relative mb-1" aria-hidden="true">
          <StudioMark className="h-14 w-14" />
          <Sparkle className="absolute -right-4 top-0 h-5 w-5" />
        </span>
        <span className="font-display text-[1.05rem] font-bold uppercase tracking-[0.2em]">Little</span>
        <span className="font-display text-[1.9rem] font-bold uppercase tracking-tight">Snowy Owl</span>
        <span className="mt-1 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.35em]">
          <span className={`h-0.5 w-4 ${rule}`} />Studio<span className={`h-0.5 w-4 ${rule}`} />
        </span>
      </span>
    ) : (
      <span className={`inline-flex items-center gap-2.5 ${text} ${className}`}>
        <StudioMark className="h-12 w-12 shrink-0 shadow-sm" />
        <span className="flex flex-col leading-none">
          <span className="whitespace-nowrap font-display text-[1.05rem] font-bold uppercase tracking-tight min-[400px]:text-xl">
            Little Snowy Owl
          </span>
          <span className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.35em]">Studio</span>
        </span>
      </span>
    );

  if (!link) return content;
  return (
    <Link href="/" className="inline-block rounded-2xl" aria-label={`${studio.name} — home`}>
      {content}
    </Link>
  );
}
