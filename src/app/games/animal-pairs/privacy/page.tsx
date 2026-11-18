// Route file for /games/animal-pairs/privacy/. See src/components/game-pages/GamePrivacyPage.tsx.
import { GamePrivacyPage, gamePrivacyMetadata } from "@/components/game-pages/GamePrivacyPage";

const slug = "animal-pairs";
export const metadata = gamePrivacyMetadata(slug);
export default function Page() {
  return <GamePrivacyPage slug={slug} />;
}
