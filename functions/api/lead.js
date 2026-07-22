// Cloudflare Pages Function: /api/lead
// Receives a form-submission webhook (e.g. from a Google Apps Script trigger
// bound to the registration Google Form) and forwards a server-side
// "CompleteRegistration" event to the Meta Conversions API.
//
// Required Cloudflare Pages environment variables (set in the dashboard,
// never committed to the repo):
//   META_ACCESS_TOKEN   - token generated in Events Manager > Conversions API
//   LEAD_WEBHOOK_SECRET - any shared secret string, must match the value used
//                         in the Apps Script payload, so only that script can
//                         trigger this endpoint.

const PIXEL_ID = '3604684703003850';

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.META_ACCESS_TOKEN || !env.LEAD_WEBHOOK_SECRET) {
    return new Response('Server not configured', { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  if (body.secret !== env.LEAD_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = {
    data: [
      {
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id || crypto.randomUUID(),
        action_source: 'website',
        event_source_url: body.source_url || 'https://contactplus-2026.pages.dev/',
        user_data: {
          em: body.em ? [body.em] : undefined,
          client_ip_address: body.client_ip || undefined,
          client_user_agent: body.client_user_agent || undefined,
        },
      },
    ],
  };

  const metaResponse = await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  const result = await metaResponse.text();
  return new Response(result, {
    status: metaResponse.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
