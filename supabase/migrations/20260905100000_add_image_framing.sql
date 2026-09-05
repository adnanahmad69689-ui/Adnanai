-- Non-destructive image framing for project images and the About portrait.
--
-- Rather than cropping and re-encoding the uploaded file, each image stores a
-- focal point (0-100% on each axis) and a zoom factor. The public site renders
-- these as object-position plus a scale transform.
--
-- This is deliberate:
--   * the original upload is never re-compressed, so screenshots stay sharp
--   * one saved framing adapts to every viewport, because a focal point keeps
--     the important area centred whatever the container aspect ratio is, where
--     a fixed pixel crop would only ever suit the screen it was made on
--   * resetting is exact, since the source file is untouched
--
-- Purely additive. Defaults reproduce today's behaviour exactly: centre focus,
-- no zoom, so every existing image renders unchanged until it is re-framed.

alter table public.portfolio_items
  add column if not exists image_focal_x numeric(5,2) not null default 50,
  add column if not exists image_focal_y numeric(5,2) not null default 50,
  add column if not exists image_zoom numeric(4,2) not null default 1;

alter table public.site_settings
  add column if not exists about_image_focal_x numeric(5,2) not null default 50,
  add column if not exists about_image_focal_y numeric(5,2) not null default 50,
  add column if not exists about_image_zoom numeric(4,2) not null default 1,
  add column if not exists hero_image_focal_x numeric(5,2) not null default 50,
  add column if not exists hero_image_focal_y numeric(5,2) not null default 50,
  add column if not exists hero_image_zoom numeric(4,2) not null default 1;

-- Keep the stored values inside a sane range so a bad client cannot write a
-- framing that renders the image unusable.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'portfolio_items_framing_range') then
    alter table public.portfolio_items add constraint portfolio_items_framing_range
      check (image_focal_x between 0 and 100 and image_focal_y between 0 and 100 and image_zoom between 1 and 3);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'site_settings_framing_range') then
    alter table public.site_settings add constraint site_settings_framing_range
      check (
        about_image_focal_x between 0 and 100 and about_image_focal_y between 0 and 100 and about_image_zoom between 1 and 3
        and hero_image_focal_x between 0 and 100 and hero_image_focal_y between 0 and 100 and hero_image_zoom between 1 and 3
      );
  end if;
end $$;
