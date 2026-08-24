# Contact Form Delivery Plan

## Chosen delivery architecture

The contact form will submit to a Cloudflare Pages Function at `/api/contact`. The function will validate the request server-side, send an email to `info@adnanai.com`, and set the visitor email as the email provider’s `Reply-To` value. The mail-provider API key will be read only from a Cloudflare secret binding and will never be placed in browser code, the Git repository, or the static build.

## Required account-side configuration

The deployment requires a verified email-sending provider account and its API key. The current task configuration contains a disabled Resend integration, so it cannot yet be used for this delivery path. After the form code is ready, the required key must be added to the Cloudflare Pages project as the secret named `RESEND_API_KEY`; the sender address must be a verified address or verified domain in the provider account. The recipient will be `info@adnanai.com`.

## Resend request contract

The protected function will send a `POST` request to `https://api.resend.com/emails` with a Bearer API key. The request will include a verified `from` sender, `to: ["info@adnanai.com"]`, a clear enquiry subject, a text or HTML message containing only the submitted form values, and `reply_to` set to the visitor’s validated email address. Resend documents `from`, `to`, and `subject` as required send-email fields and supports `reply_to` on the same request.

## References

[1] [Cloudflare Pages Functions bindings](https://developers.cloudflare.com/pages/functions/bindings/) states that Pages Functions access bindings through `context.env` and that bindings can be configured for production and preview environments.

[2] [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) states that secrets are encrypted bindings for sensitive values, are available to runtime code through the environment, and should be used instead of plaintext environment variables for API keys and tokens.

[3] [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email) documents the `POST /emails` endpoint and its `from`, `to`, `subject`, and `reply_to` fields.
