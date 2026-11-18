// Route file for /games/animal-pairs/support/. See src/components/game-pages/GameSupportPage.tsx.
import { GameSupportPage, gameSupportMetadata } from "@/components/game-pages/GameSupportPage";

const slug = "animal-pairs";
export const metadata = gameSupportMetadata(slug);
export default function Page() {
  return <GameSupportPage slug={slug} />;
}
