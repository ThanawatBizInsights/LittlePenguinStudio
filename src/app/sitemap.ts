import type { MetadataRoute } from "next";
import { gamePaths, games, studio, unresolvedFacts } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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
