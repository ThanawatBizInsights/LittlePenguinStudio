/**
 * Build-time environment flags.
 *
 * SITE_LIVE=true is set ONLY in Cloudflare's production environment on
 * launch day. Every other build (local, previews, drafts) tells search
 * engines not to index the site.
 */
export const isLive = process.env.SITE_LIVE === "true";
