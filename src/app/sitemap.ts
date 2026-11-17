import type { MetadataRoute } from "next";
import { games, studio } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/", "/parents/", "/support/", "/privacy/"];
  for (const g of games) {
    paths.push(`/games/${g.slug}/`);
    if (g.privacy.status === "published") paths.push(`/privacy/${g.slug}/`);
  }
  return paths.map((p) => ({ url: `${studio.siteUrl}${p}` }));
}
