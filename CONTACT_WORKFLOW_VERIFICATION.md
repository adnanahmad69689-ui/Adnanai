# Contact Workflow Verification

The public Contact form sends `name`, `email`, `subject`, `service`, and `message` to the protected Supabase Edge Function `contact-submit`. The function stores each submission in private `contact_submissions` storage, sends the enquiry through Resend to `info@adnanai.com`, and records the resulting Resend message ID and status.

The live browser form initially surfaced a CORS error because it included unnecessary browser authorization headers. The published correction removes those headers. The deployed preflight request from `https://adnanai.com` now returns `204` and permits `Content-Type` for `POST`.

On 2026-08-24, a browser-equivalent submission from the canonical origin returned `200`, was written to Supabase with `delivery_status` set to `sent`, and received a Resend message ID. Resend verifies `adnanai.com` as a sending domain; existing Cloudflare Email Routing records were retained, so the delivery path remains Resend → `info@adnanai.com` → Cloudflare Email Routing → the configured personal Gmail destination.
