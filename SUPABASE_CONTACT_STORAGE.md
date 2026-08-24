# Supabase Contact Submission Storage

Two private tables now support the Contact workflow: `contact_submissions` stores the complete submitted name, email, subject, service, message, Resend reference, and delivery state; `contact_submission_rate_limits` supports server-side rate limiting.

Both tables have row-level security enabled, explicit deny-all policies for public client roles, and revoked public privileges. Contact data can therefore be written only by the planned privileged server-side function. The Supabase security check confirms there are no table-policy advisories for these new tables.

The dedicated Resend sending key is stored as the encrypted Supabase Edge Function secret `RESEND_API_KEY`. Its value is not stored in application source code or exposed to public clients.
