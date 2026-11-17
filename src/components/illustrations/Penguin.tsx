import { useId } from "react";

export type PenguinPose = "wave" | "cheer" | "telescope" | "stand" | "star" | "reading";

type Props = {
  pose?: PenguinPose;
  className?: string;
  /** Gentle bobbing animation (disabled automatically for reduced motion). */
  bob?: boolean;
  /** Provide a label only when the penguin carries meaning; otherwise it is decorative. */
  title?: string;
};

/**
 * Little Penguin — the studio mascot. Original SVG: round navy body, cream belly,
 * orange beak and feet, rosy cheeks and a mint scarf.
 */
export function Penguin({ pose = "wave", className = "", bob = false, title }: Props) {
  const id = useId().replace(/:/g, "");
  const body = `pb-${id}`;
  const belly = `pbe-${id}`;
  const scarf = `ps-${id}`;
  const a11y = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const, focusable: "false" as const };

  const leftUp = pose === "cheer";
  const hugging = pose === "star" || pose === "reading";
  const rightUp = pose === "wave" || pose === "cheer";

  return (
    <svg
      viewBox="0 0 240 260"
      className={`${bob ? "motion-safe:animate-bob" : ""} ${className}`}
      {...a11y}
    >
      <defs>
        <radialGradient id={body} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor="#3a4680" />
          <stop offset="0.6" stopColor="#252d5c" />
          <stop offset="1" stopColor="#161c40" />
        </radialGradient>
        <radialGradient id={belly} cx="45%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#f3e6cc" />
        </radialGradient>
        <linearGradient id={scarf} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a8ead0" />
          <stop offset="1" stopColor="#6fcfa8" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="120" cy="248" rx="70" ry="9" fill="#1c2350" opacity="0.12" />

      {/* feet */}
      <ellipse cx="92" cy="240" rx="26" ry="12" fill="#f6a531" />
      <ellipse cx="148" cy="240" rx="26" ry="12" fill="#f6a531" />
      <ellipse cx="88" cy="236" rx="12" ry="4" fill="#ffc768" opacity="0.7" />
      <ellipse cx="144" cy="236" rx="12" ry="4" fill="#ffc768" opacity="0.7" />

      {/* left flipper */}
      {hugging ? null : leftUp ? (
        <path d="M58 132 C30 110 22 78 34 64 C46 56 62 86 76 120 Z" fill={`url(#${body})`} />
      ) : (
        <path d="M52 128 C30 150 26 186 38 196 C50 200 64 170 72 146 Z" fill={`url(#${body})`} />
      )}

      {/* right flipper */}
      {hugging ? null : rightUp ? (
        <path d="M182 132 C210 110 218 78 206 64 C194 56 178 86 164 120 Z" fill={`url(#${body})`} />
      ) : pose === "telescope" ? (
        <path d="M184 140 C204 132 214 112 206 104 C196 98 180 112 168 128 Z" fill={`url(#${body})`} />
      ) : (
        <path d="M188 128 C210 150 214 186 202 196 C190 200 176 170 168 146 Z" fill={`url(#${body})`} />
      )}

      {/* body */}
      <path
        d="M120 28 C172 28 196 72 196 128 C196 194 166 238 120 238 C74 238 44 194 44 128 C44 72 68 28 120 28 Z"
        fill={`url(#${body})`}
      />
      {/* belly */}
      <path
        d="M120 112 C156 112 172 144 172 178 C172 214 150 232 120 232 C90 232 68 214 68 178 C68 144 84 112 120 112 Z"
        fill={`url(#${belly})`}
      />
      {/* face patch */}
      <path
        d="M120 52 C150 52 168 72 168 96 C168 120 148 132 120 132 C92 132 72 120 72 96 C72 72 90 52 120 52 Z"
        fill={`url(#${belly})`}
      />

      {/* eyes */}
      <ellipse cx="100" cy="86" rx="7.5" ry="8.5" fill="#1c2350" />
      <ellipse cx="140" cy="86" rx="7.5" ry="8.5" fill="#1c2350" />
      <circle cx="102.5" cy="82.5" r="2.8" fill="#ffffff" />
      <circle cx="142.5" cy="82.5" r="2.8" fill="#ffffff" />

      {/* cheeks */}
      <ellipse cx="86" cy="106" rx="10" ry="7" fill="#f7a6b4" opacity="0.85" />
      <ellipse cx="154" cy="106" rx="10" ry="7" fill="#f7a6b4" opacity="0.85" />

      {/* beak (open smile) */}
      <path d="M106 100 Q120 92 134 100 Q128 106 120 106 Q112 106 106 100 Z" fill="#f6a531" />
      <path d="M109 104 Q120 122 131 104 Q120 109 109 104 Z" fill="#e2702c" />
      <path d="M114 109 Q120 115 126 109" fill="#f58f86" />

      {/* scarf */}
      <path
        d="M66 132 C90 146 150 146 174 132 C178 140 178 150 174 156 C150 168 90 168 66 156 C62 150 62 140 66 132 Z"
        fill={`url(#${scarf})`}
      />
      <path d="M142 150 C146 172 140 194 132 206 L152 204 C160 188 162 168 158 150 Z" fill={`url(#${scarf})`} />
      <path d="M134 204 L136 214 M142 204 L144 214 M150 203 L152 212" stroke="#6fcfa8" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 145 C100 152 140 152 160 145" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" fill="none" strokeLinecap="round" />


      {pose === "star" && (
        <g>
          <path
            d="M120 140 C124 140 126 144 129 154 L133 164 L145 165 C155 166 158 168 158 172 C158 175 155 178 147 184 L139 191 L142 203 C144 212 143 214 140 215 C137 216 134 214 127 208 L120 204 L113 208 C106 214 103 216 100 215 C97 214 96 212 98 203 L101 191 L93 184 C85 178 82 175 82 172 C82 168 85 166 95 165 L107 164 L111 154 C114 144 116 140 120 140 Z"
            fill="#ffd94d"
          />
          <ellipse cx="111" cy="160" rx="6" ry="3" fill="#ffffff" opacity="0.5" transform="rotate(-30 111 160)" />
          <ellipse cx="82" cy="182" rx="15" ry="20" fill={`url(#${body})`} transform="rotate(-30 82 182)" />
          <ellipse cx="158" cy="182" rx="15" ry="20" fill={`url(#${body})`} transform="rotate(30 158 182)" />
        </g>
      )}
      {pose === "reading" && (
        <g>
          <path d="M72 168 L118 158 L118 222 L72 230 Z" fill="#ee5b47" />
          <path d="M168 168 L122 158 L122 222 L168 230 Z" fill="#e5503d" />
          <path d="M76 166 L118 156 L118 160 L76 170 Z M164 166 L122 156 L122 160 L164 170 Z" fill="#fffaf2" />
          <path d="M84 196 c0-6 10-6 11-2 c4-3 10 0 8 5 h-19 z" fill="#ffffff" />
          <path d="M136 204 a14 14 0 0 1 28 0" stroke="#ffd94d" strokeWidth="3.5" fill="none" />
          <path d="M140 204 a10 10 0 0 1 20 0" stroke="#c9b3ec" strokeWidth="3.5" fill="none" />
          <ellipse cx="68" cy="196" rx="13" ry="18" fill={`url(#${body})`} transform="rotate(-20 68 196)" />
          <ellipse cx="172" cy="196" rx="13" ry="18" fill={`url(#${body})`} transform="rotate(20 172 196)" />
        </g>
      )}
      {/* telescope */}
      {pose === "telescope" && (
        <g transform="rotate(-24 186 98)">
          <rect x="160" y="88" width="62" height="20" rx="6" fill="#f2b632" />
          <rect x="206" y="84" width="26" height="28" rx="7" fill="#e09a1a" />
          <ellipse cx="231" cy="98" rx="5" ry="11" fill="#3a6fd8" />
          <rect x="170" y="88" width="6" height="20" fill="#e09a1a" />
        </g>
      )}

      {/* soft highlight */}
      <ellipse cx="92" cy="58" rx="18" ry="9" fill="#ffffff" opacity="0.12" transform="rotate(-25 92 58)" />
    </svg>
  );
}
