# Resend Domain Setup

The Resend account is signed in and `adnanai.com` has been added as a pending domain. Its current status is **Not Started**.

Resend has identified Cloudflare as the DNS provider and generated sender-verification requirements. The required records include a DKIM TXT record at `resend._domainkey`, plus sending records at `send` (an MX record and an SPF TXT record). A DMARC record is shown as optional. The Resend dashboard provides an **Auto configure** action and a **Verify DNS Records** action.

The existing Cloudflare Email Routing records must remain unchanged. The approved Resend configuration should add only the provider-generated verification records and must not replace the existing Cloudflare Email Routing MX, SPF, or DKIM records.

The approved Cloudflare DNS update completed successfully. Three new records were added: the Resend DKIM TXT record at `resend._domainkey.adnanai.com`, plus the Resend sending MX and SPF TXT records at `send.adnanai.com`. The existing Email Routing records were not edited or removed.

After selecting **Verify DNS Records** in Resend, the domain entered **Pending** status. Resend is checking the publicly resolvable records and reports that verification may take time to complete. The provider-managed DNS records are already publicly visible through Cloudflare DNS-over-HTTPS.

Resend now reports `adnanai.com` as **Verified** and ready to send. A restricted sending-only key is stored in Supabase as an encrypted Edge Function secret. The secured `contact-submit` function completed an end-to-end test: it stored the complete test enquiry privately, delivered the Resend message to `info@adnanai.com`, and recorded the delivery state as sent.
