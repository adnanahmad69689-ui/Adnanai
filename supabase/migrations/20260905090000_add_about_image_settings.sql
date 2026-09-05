-- Adds owner-managed About section imagery alongside the existing hero image.
--
-- Purely additive: three nullable columns on the existing global settings row.
-- No existing column, row, policy or bucket is altered, so applying this cannot
-- affect the hero image or any published portfolio content.
--
-- Uploaded files reuse the existing 'hero' bucket under an about/ prefix, so the
-- storage policies already granted for that bucket cover them and no new
-- storage rules are required.

alter table public.site_settings
  add column if not exists about_image_url text,
  add column if not exists about_image_key text,
  add column if not exists about_image_alt text;
