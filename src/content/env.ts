/**
 * Build-time environment flags.
 *
 * SITE_LIVE=true is set ONLY in Cloudflare's production environment on
 * launch day. Every other build (local, previews, drafts) tells search
 * engines not to index the site.
 *
 * SITE_URL (optional) is the public origin, e.g. https://littlesnowyowl.com.
 * Switch it on only after the custom domain is connected and HTTPS works.
 */
export const isLive = process.env.SITE_LIVE === "true";

/**
 * Canonical link for a page path — emitted only for the live site, so preview
 * builds never advertise a domain that isn't connected yet.
 */
export function canonical(path: string): { canonical: string } | undefined {
  return isLive ? { canonical: path } : undefined;
}
