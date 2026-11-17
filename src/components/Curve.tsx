import type { ReactNode } from "react";

/** Organic curved edge drawn at the top or bottom of a coloured section. */
export function CurveEdge({
  position,
  color,
  shape = "wave",
  className = "",
}: {
  position: "top" | "bottom";
  color: string;
  shape?: "wave" | "arc";
  className?: string;
}) {
  const d =
    shape === "arc"
      ? "M0 48 C320 0 1120 0 1440 48 V48 H0 Z"
      : "M0 48 V30 C180 0 360 0 540 22 C720 44 900 46 1080 22 C1260 0 1360 6 1440 18 V48 Z";
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-6 w-full sm:h-10 ${position === "bottom" ? "rotate-180" : ""} ${className}`}
    >
      <path d={d} fill={color} />
    </svg>
  );
}

/** Full-width coloured band with curved top and bottom edges. */
export function CurvedSection({
  color,
  children,
  className = "",
  id,
  labelledBy,
  top = true,
  bottom = true,
}: {
  color: string;
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  top?: boolean;
  bottom?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="relative">
      {top && <CurveEdge position="top" color={color} />}
      <div style={{ backgroundColor: color }} className={className}>
        {children}
      </div>
      {bottom && <CurveEdge position="bottom" color={color} />}
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-coral-deep ${className}`}>{children}</p>;
}
