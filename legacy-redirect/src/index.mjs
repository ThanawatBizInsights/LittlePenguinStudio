// Redirects the retired littlepenguinstudio.krai-thanawat.workers.dev host to
// the live site, keeping the path and query string unchanged.
export const TARGET_ORIGIN = "https://littlesnowyowl.com";

export function redirectTarget(requestUrl) {
  const url = new URL(requestUrl);
  return `${TARGET_ORIGIN}${url.pathname}${url.search}`;
}

const legacyRedirect = {
  fetch(request) {
    return Response.redirect(redirectTarget(request.url), 301);
  },
};

export default legacyRedirect;
