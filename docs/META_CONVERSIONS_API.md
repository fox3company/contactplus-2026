# Meta Conversions API

The site keeps the browser Meta Pixel and also sends the same `Lead` event from a Cloudflare Pages Function when a visitor opens the registration form.

## Cloudflare variables

Configure these variables for the production Pages deployment:

- `META_ACCESS_TOKEN` — Meta Conversions API access token, stored as a secret.
- `META_PIXEL_ID` — optional; defaults to the current site Pixel ID `3604684703003850`.
- `META_GRAPH_API_VERSION` — optional; defaults to `v23.0`. Update this value when Meta requires a newer Graph API version.

The access token must never be added to client-side Astro code or committed to Git.

## Event flow

Registration links first open `/api/registration-click`. The Function sends `Lead` to Meta and redirects to the Google Form. The browser Pixel and server event share the same `event_id`, so Meta can deduplicate them. UTM parameters, `fbclid`, `_fbp` and `_fbc` are forwarded to the Function. `_fbp` and `_fbc` are also forwarded to the existing hidden Google Form fields.

If `META_ACCESS_TOKEN` is missing, the Function still redirects visitors to registration, but the server event is skipped and a warning is logged.
