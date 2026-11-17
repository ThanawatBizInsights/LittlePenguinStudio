import type { MetadataRoute } from "next";
import { studio } from "@/content/site";
import { isLive } from "@/content/env";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Previews and drafts ask every crawler to stay away.
  if (!isLive) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${studio.siteUrl}/sitemap.xml` };
}
