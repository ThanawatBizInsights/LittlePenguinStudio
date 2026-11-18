import type { MetadataRoute } from "next";
import { gamePaths, games, studio, unresolvedFacts } from "@/content/site";
import { isLive } from "@/content/env";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Previews and drafts list nothing: the custom domain may not be connected yet.
  if (!isLive) return [];
  const paths = ["/", "/about/", "/parents/", "/support/", "/privacy/"];
  for (const g of games) {
    const p = gamePaths(g.slug);
    paths.push(p.overview);
    // Support and privacy pages are noindex until every placeholder is resolved.
    if (unresolvedFacts(g).length === 0) paths.push(p.support);
    if (unresolvedFacts(g).length === 0 && g.privacy.status === "published") paths.push(p.privacy);
  }
  return paths.map((p) => ({ url: `${studio.siteUrl}${p}` }));
}
