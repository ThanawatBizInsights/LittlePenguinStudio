// Route file for /games/animal-pairs/. Content lives in src/content/site.ts;
// layout in src/components/game-pages/GameOverviewPage.tsx.
// (Static folders instead of a dynamic [slug] route: Cloudflare serves
// Next's "$d$slug" prefetch files in a redirect loop.)
import { GameOverviewPage, gameOverviewMetadata } from "@/components/game-pages/GameOverviewPage";

const slug = "animal-pairs";
export const metadata = gameOverviewMetadata(slug);
export default function Page() {
  return <GameOverviewPage slug={slug} />;
}
