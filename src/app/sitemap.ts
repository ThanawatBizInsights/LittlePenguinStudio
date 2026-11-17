import type { MetadataRoute } from "next";
import { gamePaths, games, studio } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/", "/parents/", "/support/", "/privacy/"];
  for (const g of games) {
    const p = gamePaths(g.slug);
    paths.push(p.overview, p.support, p.privacy);
  }
  return paths.map((p) => ({ url: `${studio.siteUrl}${p}` }));
}
