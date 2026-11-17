"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimalFace, animalKinds, animalNames, animalTile, type AnimalKind } from "./illustrations/Animals";
import { Penguin } from "./illustrations/Penguin";

const KINDS: AnimalKind[] = animalKinds;
const FLIP_BACK_MS = 950;

type Card = { id: number; kind: AnimalKind };

const ordered = (): Card[] => [...KINDS, ...KINDS].map((kind, id) => ({ id, kind }));

function shuffled(): Card[] {
  const cards = ordered();
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

/**
 * Website mini-game: a small, data-free matching preview.
 * No timer, score saving, accounts or network requests.
 */
export function MiniMatchGame({
  tileArt = {},
}: {
  /** URLs of supplied plush tile artwork, keyed by animal (from the server). */
  tileArt?: Partial<Record<AnimalKind, string>>;
}) {
  // Deterministic first render (matches server HTML), shuffled after mount.
  const [cards, setCards] = useState<Card[]>(ordered);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<AnimalKind>>(new Set());
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");
  const [round, setRound] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- shuffle only on the client to avoid hydration mismatch
    setCards(shuffled());
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const done = matched.size === KINDS.length;

  const restart = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setCards(shuffled());
    setRevealed([]);
    setMatched(new Set());
    setLocked(false);
    setRound((r) => r + 1);
    setMessage("New game! All cards are face down.");
  }, []);

  function choose(index: number) {
    if (locked || done) return;
    const card = cards[index];
    if (matched.has(card.kind) || revealed.includes(index)) return;

    const next = [...revealed, index];
    setRevealed(next);
    const name = animalNames[card.kind];
    const an = /^[aeiou]/.test(name) ? "an" : "a";
    const An = an === "an" ? "An" : "A";

    if (next.length < 2) {
      setMessage(`You found ${an} ${name}. Now find its pair.`);
      return;
    }

    const [a, b] = next.map((i) => cards[i]);
    if (a.kind === b.kind) {
      const nowMatched = new Set(matched).add(a.kind);
      setMatched(nowMatched);
      setRevealed([]);
      setMessage(
        nowMatched.size === KINDS.length
          ? `${An} ${name} pair! You found all ${KINDS.length} pairs. Well done, little explorer!`
          : `Hooray, ${an} ${name} pair! ${KINDS.length - nowMatched.size} pairs to go.`,
      );
    } else {
      setLocked(true);
      setMessage(`${An} ${name}! Not a match this time. The cards will turn back over.`);
      timer.current = setTimeout(() => {
        setRevealed([]);
        setLocked(false);
      }, FLIP_BACK_MS);
    }
  }

  return (
    <div className="rounded-[2rem] bg-paper p-4 shadow-[0_10px_0_0_rgba(28,35,80,0.08)] ring-1 ring-ink/10 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 rounded-full bg-lilac-soft px-4 py-1.5 text-sm font-extrabold">
          Website mini-game — a playful preview
        </p>
        <button
          type="button"
          onClick={restart}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-display text-base font-semibold text-paper transition-transform hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
            <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Restart
        </button>
      </div>

      <p className="mb-4 text-ink-soft" id="mini-game-help">
        Turn over two cards at a time to find matching animal friends. Use a mouse, touch, or Tab and Enter.
      </p>

      <ul
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
        aria-describedby="mini-game-help"
        key={round}
      >
        {cards.map((card, i) => {
          const isMatched = matched.has(card.kind);
          const faceUp = isMatched || revealed.includes(i);
          const name = animalNames[card.kind];
          const label = isMatched
            ? `Card ${i + 1}: ${name}, matched`
            : faceUp
              ? `Card ${i + 1}: ${name}`
              : `Card ${i + 1}: face down`;
          return (
            <li key={card.id}>
              <button
                type="button"
                className="flip-card block aspect-[4/5] w-full rounded-[1.4rem] disabled:cursor-default"
                data-face={faceUp ? "up" : "down"}
                data-kind={card.kind}
                aria-label={label}
                aria-disabled={faceUp || locked ? true : undefined}
                disabled={isMatched}
                onClick={() => choose(i)}
              >
                <span className="flip-inner block">
                  <span className="flip-face flip-back grid place-items-center rounded-[1.4rem] bg-cobalt shadow-[0_6px_0_0_var(--color-cobalt-deep)]">
                    <span className="grid h-3/5 w-3/5 place-items-center rounded-full bg-paper/15">
                      <Penguin pose="stand" className="h-4/5 w-4/5" />
                    </span>
                  </span>
                  <span
                    className={`flip-face flip-front grid place-items-center rounded-[1.4rem] border-4 border-paper shadow-[0_6px_0_0_rgba(28,35,80,0.15)] ${
                      isMatched ? "ring-4 ring-mint" : ""
                    }`}
                    style={{ backgroundColor: animalTile[card.kind] }}
                  >
                    {tileArt[card.kind] ? (
                      // eslint-disable-next-line @next/next/no-img-element -- static export
                      <img src={tileArt[card.kind]} alt="" className="h-full w-full rounded-[1.1rem] object-cover" />
                    ) : (
                      <AnimalFace kind={card.kind} className="h-4/5 w-4/5" />
                    )}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="sr-only" aria-live="polite" role="status">
        {message}
      </p>

      <div className="mt-5 flex min-h-16 items-center gap-3">
        {done ? (
          <div className="flex w-full flex-wrap items-center gap-3 rounded-3xl bg-mint-soft p-4 motion-safe:animate-pop">
            <Penguin pose="cheer" className="h-16 w-16 shrink-0" />
            <p className="flex-1 font-display text-xl font-semibold">
              You found all the pairs! Well done, little explorer.
            </p>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-11 items-center rounded-full bg-coral-button px-5 font-display font-semibold text-white"
            >
              Play again
            </button>
          </div>
        ) : (
          <p className="text-ink-soft">
            Pairs found: <strong className="text-ink">{matched.size}</strong> of {KINDS.length}
          </p>
        )}
      </div>
    </div>
  );
}
