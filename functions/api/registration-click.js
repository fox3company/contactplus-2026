const REGISTRATION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdkDT1NjKXxzbAg_8dqSLEDnYPstOaBZ8oE6mxqNHkLTUbBlg/viewform?usp=header';
const FBC_ENTRY_ID = '94192550';
const FBP_ENTRY_ID = '724598572';
const TRACKING_PARAM_NAMES = ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function cookieValue(request, name) {
  const cookies = request.headers.get('Cookie') || '';
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function cleanValue(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function getTrackingValues(url, request) {
  const values = {};
  for (const name of TRACKING_PARAM_NAMES) {
    const value = cleanValue(url.searchParams.get(name));
    if (value) values[name] = value;
  }
  values.fbp = cleanValue(url.searchParams.get('fbp')) || cookieValue(request, '_fbp');
  values.fbc = cleanValue(url.searchParams.get('fbc')) || cookieValue(request, '_fbc');
  if (!values.fbc && values.fbclid) values.fbc = `fb.1.${Date.now()}.${values.fbclid}`;
  return values;
}

function buildRegistrationUrl(values) {
  const target = new URL(REGISTRATION_URL);
  if (values.fbc) target.searchParams.set(`entry.${FBC_ENTRY_ID}`, values.fbc);
  if (values.fbp) target.searchParams.set(`entry.${FBP_ENTRY_ID}`, values.fbp);
  return target.toString();
}

async function sendMetaEvent({ context, eventId, values }) {
  const pixelId = context.env.META_PIXEL_ID || '3604684703003850';
  const accessToken = context.env.META_ACCESS_TOKEN;
  const apiVersion = context.env.META_GRAPH_API_VERSION || 'v23.0';
  if (!accessToken) {
    console.warn('[Meta CAPI] META_ACCESS_TOKEN is not configured');
    return;
  }

  const request = context.request;
  const userData = {};
  const clientIp = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '';
  const clientUserAgent = cleanValue(request.headers.get('User-Agent'), 1000);
  if (clientIp) userData.client_ip_address = clientIp;
  if (clientUserAgent) userData.client_user_agent = clientUserAgent;
  if (values.fbp) userData.fbp = values.fbp;
  if (values.fbc) userData.fbc = values.fbc;

  const customData = {};
  for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    if (values[name]) customData[name] = values[name];
  }

  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: cleanValue(request.headers.get('Referer'), 2000) || 'https://contactplus-2026.pages.dev/',
      user_data: userData,
      ...(Object.keys(customData).length > 0 ? { custom_data: customData } : {}),
    }],
  };

  const endpoint = `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) console.error('[Meta CAPI] request failed', response.status, await response.text());
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const eventId = cleanValue(url.searchParams.get('event_id'), 100) || crypto.randomUUID();
  const values = getTrackingValues(url, context.request);
  context.waitUntil(sendMetaEvent({ context, eventId, values }));
  return Response.redirect(buildRegistrationUrl(values), 302);
}
