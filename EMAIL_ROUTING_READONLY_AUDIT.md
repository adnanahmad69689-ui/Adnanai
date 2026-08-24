# Adnan Ai Email Routing — Read-Only Audit

Audit time: 24 August 2026. No DNS records, Cloudflare settings, website code, or design were changed.

## Verified Cloudflare state

Cloudflare's API returned a verified destination address: `adnanahmad69689@gmail.com`. Email Routing for `adnanai.com` is enabled, synchronized, and `ready`. The active rule with priority `0` exactly matches `info@adnanai.com` and forwards it to `adnanahmad69689@gmail.com`. The only other rule is a final low-priority catch-all drop rule; it does not take precedence over the specific active `info@adnanai.com` rule.

## Verified DNS state

The Email Routing configuration and public DNS agree on the three expected MX records:

| Priority | MX target |
|---:|---|
| 10 | `route3.mx.cloudflare.net` |
| 70 | `route1.mx.cloudflare.net` |
| 98 | `route2.mx.cloudflare.net` |

The public root SPF record is exactly `v=spf1 include:_spf.mx.cloudflare.net ~all`. Public DNS also exposes the Cloudflare routing DKIM record at `cf2024-1._domainkey.adnanai.com`. No DMARC record is published; Cloudflare describes DMARC as a deliverability improvement rather than a requirement for routing.

## Interpretation

The inbound routing configuration is correct and active. Public MX/SPF/DKIM records are already visible with a 300-second public DNS TTL. The email-routing configuration was created and verified on 24 August 2026, so a test sent immediately afterward can still be subject to normal DNS cache expiry or sender-side delivery delay. The Adnan Ai public website displays `info@adnanai.com`, but it cannot change whether a separately sent inbound email reaches Gmail.

The website contact form's server-side sending remains intentionally deferred until a private Resend key is configured. That affects form submissions only; it does **not** affect incoming mail sent directly to `info@adnanai.com` through Cloudflare Email Routing.

## Exact manual delivery check

Cloudflare documents that domain onboarding can take up to 24 hours to propagate globally, although Cloudflare DNS usually completes in 5–15 minutes. The current routing destination and rule were created at approximately 15:01 UTC on 24 August 2026, while this inspection occurred shortly afterwards. A brief delay is therefore plausible and does not indicate a routing configuration error.

Send a fresh plain-text test from an address that is **not** `adnanahmad69689@gmail.com`, because Cloudflare notes that some providers discard messages that appear to originate from the same account that receives the forwarded mail. Use a distinctive subject such as `Adnan Ai routing test 2`.

Then open **Cloudflare Dashboard → Compute → Email Service → Email Routing → Activity log**, select the test, and use the displayed status as the decision point:

| Activity-log status | Meaning | Safe next action |
|---|---|---|
| No entry | The sender has not reached Cloudflare yet, commonly because of cached old MX data or sender-side delay. | Wait 30–60 minutes and test again from a different provider. |
| Forwarded | Cloudflare accepted the message and forwarded it to Gmail. | In Gmail, search `in:anywhere to:info@adnanai.com`, then check Spam, All Mail, Filters and Blocked Addresses. |
| Rejected | The incoming message failed SPF, DKIM, or DMARC checks. | Expand the log entry and inspect the authentication result; test again from a standard Gmail/Outlook sender. |
| Delivery failed | Cloudflare could not deliver to Gmail. | Expand the entry and retain the recipient-server error for Cloudflare Support if it persists. |
| Dropped | A rule or filtering decision prevented forwarding. | Confirm that the displayed matched rule is the active exact `info@adnanai.com` forward rule, not the final catch-all drop rule. |

## No-change conclusion

No change is recommended. The missing DMARC record is optional for this inbound routing use case, though it can be considered later for broader domain-deliverability hygiene. The separate website form is not yet able to send because its private Resend secret is intentionally deferred; this does not explain a missing direct email to `info@adnanai.com`.

## Sources

- Cloudflare Email Routing API read-only responses: destination addresses, routing status, routing rules, and managed DNS on 24 August 2026.
- Public DNS resolver responses for `adnanai.com`, `cf2024-1._domainkey.adnanai.com`, and `_dmarc.adnanai.com` on 24 August 2026.
- Cloudflare, [Email routing rules and addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/).
- Cloudflare, [Troubleshooting Email Service](https://developers.cloudflare.com/email-service/reference/troubleshooting/).
