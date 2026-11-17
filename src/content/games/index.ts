import type { Game } from "@/content/site";
import type { Section } from "./animal-pairs";
import * as animalPairs from "./animal-pairs";

export type { Section };

type GameContent = {
  supportSections: (g: Game) => Section[];
  privacySections: (g: Game) => Section[];
  privacySummary: (g: Game) => string[];
};

/** Per-game support and privacy content. Add an entry when adding a game. */
export const gameContent: Record<string, GameContent> = {
  "animal-pairs": animalPairs,
};
