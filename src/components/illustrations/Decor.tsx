/** Decorative SVG shapes. All are hidden from assistive technology. */

type P = { className?: string };
const hidden = { "aria-hidden": true as const, focusable: "false" as const };

export function Star({ className = "", color = "#ffd94d" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...hidden}>
      <path
        d="M50 6 C54 6 56 10 59 22 L64 36 L79 37 C92 38 96 40 96 45 C96 49 92 52 82 60 L71 69 L75 84 C78 95 77 98 73 99 C69 100 65 97 56 90 L50 86 L44 90 C35 97 31 100 27 99 C23 98 22 95 25 84 L29 69 L18 60 C8 52 4 49 4 45 C4 40 8 38 21 37 L36 36 L41 22 C44 10 46 6 50 6 Z"
        fill={color}
      />
      <ellipse cx="40" cy="34" rx="8" ry="4" fill="#fff" opacity="0.45" transform="rotate(-30 40 34)" />
    </svg>
  );
}

export function Cloud({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 64" className={className} {...hidden}>
      <path
        d="M24 60 C8 60 2 50 4 42 C6 32 16 28 24 30 C24 16 36 6 50 8 C60 9 66 14 70 22 C76 14 90 12 98 20 C104 26 104 32 102 36 C112 36 118 44 116 52 C114 58 108 60 100 60 Z"
        fill="#ffffff"
      />
      <path d="M20 54 C40 56 80 56 104 54" stroke="#dbe8f7" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#ffd94d" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...hidden}>
      <path d="M8 26 L2 30 M14 14 L10 4 M26 12 L32 4" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Flower({ className = "", color = "#f7a6b4" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...hidden}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="30" cy="16" rx="10" ry="13" fill={color} transform={`rotate(${r} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill="#ffd94d" />
    </svg>
  );
}

export function Bubble({ className = "" }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...hidden}>
      <circle cx="20" cy="20" r="17" fill="#ffffff" fillOpacity="0.35" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M11 16 Q13 10 19 9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Heart({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 56" className={className} {...hidden}>
      <path d="M30 52 C10 38 2 28 4 16 C6 6 18 2 26 8 L30 12 L34 8 C42 2 54 6 56 16 C58 28 50 38 30 52 Z" fill="#ee5b47" stroke="#1c2350" strokeWidth="3" />
      <ellipse cx="16" cy="16" rx="5" ry="3" fill="#fff" opacity="0.5" transform="rotate(-30 16 16)" />
    </svg>
  );
}

export function Puzzle({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...hidden}>
      <path
        d="M8 18 H22 C20 8 34 8 32 18 H46 V30 C56 28 56 42 46 40 V52 H32 C34 42 20 42 22 52 H8 V40 C18 42 18 28 8 30 Z"
        fill="#ffd94d" stroke="#1c2350" strokeWidth="3" strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bulb({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...hidden}>
      <path d="M30 8 C42 8 50 16 50 27 C50 35 44 40 41 44 V48 H19 V44 C16 40 10 35 10 27 C10 16 18 8 30 8 Z" fill="#ffd94d" stroke="#1c2350" strokeWidth="3" />
      <rect x="20" y="48" width="20" height="8" rx="3" fill="#9fe0c4" stroke="#1c2350" strokeWidth="3" />
      <path d="M24 30 L30 36 L36 30 M30 36 V46" stroke="#1c2350" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Family({ className = "" }: P) {
  return (
    <svg viewBox="0 0 70 60" className={className} {...hidden}>
      <path d="M4 56 C4 40 14 34 24 34 C34 34 42 40 42 56 Z" fill="#9fe0c4" stroke="#1c2350" strokeWidth="3" />
      <path d="M30 56 C30 42 38 38 48 38 C58 38 66 42 66 56 Z" fill="#ffd94d" stroke="#1c2350" strokeWidth="3" />
      <circle cx="24" cy="20" r="12" fill="#fffaf2" stroke="#1c2350" strokeWidth="3" />
      <circle cx="48" cy="24" r="10" fill="#fffaf2" stroke="#1c2350" strokeWidth="3" />
      <path d="M19 22 Q24 27 29 22 M44 26 Q48 30 52 26" stroke="#1c2350" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SpeechBubble({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...hidden}>
      <path d="M30 6 C46 6 56 16 56 28 C56 40 46 50 30 50 C26 50 22 49 19 48 L8 54 L11 43 C6 39 4 34 4 28 C4 16 14 6 30 6 Z" fill="#fffaf2" stroke="#1c2350" strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="20" cy="28" r="3.5" fill="#1c2350" />
      <circle cx="30" cy="28" r="3.5" fill="#1c2350" />
      <circle cx="40" cy="28" r="3.5" fill="#1c2350" />
    </svg>
  );
}

export function Shield({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...hidden}>
      <path d="M30 4 L52 12 V28 C52 42 42 52 30 56 C18 52 8 42 8 28 V12 Z" fill="#fffaf2" stroke="#1c2350" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M20 30 L27 37 L41 23" stroke="#1c2350" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Smiley({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...hidden}>
      <circle cx="30" cy="30" r="25" fill="none" stroke="#1c2350" strokeWidth="3.5" />
      <path d="M19 26 Q22 21 25 26 M35 26 Q38 21 41 26" stroke="#1c2350" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M19 35 Q30 46 41 35" stroke="#1c2350" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Blocks({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 80" className={className} {...hidden}>
      <rect x="4" y="40" width="34" height="36" rx="6" fill="#ffd94d" />
      <rect x="8" y="8" width="30" height="32" rx="6" fill="#2f5fd0" />
      <path d="M70 76 V48 H112 V76 H100 V64 C100 58 82 58 82 64 V76 Z" fill="#ee5b47" />
      <path d="M72 46 L91 14 L110 46 Z" fill="#c9b3ec" />
    </svg>
  );
}

/** Hand-drawn wavy underline used beneath headings. */
export function Wave({ className = "", color = "#c9b3ec" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" className={className} {...hidden}>
      <path
        d="M4 8 Q16 2 28 8 T52 8 T76 8 T100 8 T124 8 T148 8 T172 8 T196 8"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Mint iceberg the hero penguin stands on. */
export function Iceberg({ className = "" }: P) {
  return (
    <svg viewBox="0 0 320 120" className={className} {...hidden}>
      <path d="M10 120 L30 60 L80 36 L150 30 L220 40 L280 58 L310 120 Z" fill="#9fe0c4" />
      <path d="M30 60 L80 36 L150 30 L220 40 L280 58 L240 72 L160 66 L80 74 Z" fill="#c4f0dc" />
      <path d="M80 74 L96 120 M160 66 L170 120 M240 72 L250 120" stroke="#7fcfae" strokeWidth="4" />
    </svg>
  );
}
