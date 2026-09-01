// Returns only the visitor's country code so the client can offer local pricing.
// The IP address itself never leaves Cloudflare or reaches the browser.
export function onRequestGet(context) {
  const country = context.request.cf?.country || context.request.headers.get('CF-IPCountry') || '';

  return new Response(JSON.stringify({ country }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
