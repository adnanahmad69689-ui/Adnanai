-- Keep security-definer helpers out of the exposed public schema and callable
-- only where required by internal auth triggers or authenticated RLS policies.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function private.is_portfolio_admin() from public, anon;
grant execute on function private.is_portfolio_admin() to authenticated;

-- The original public function is no longer used by policies or browser code.
revoke all on function public.is_portfolio_admin() from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
grant execute on function public.handle_new_user() to supabase_auth_admin;

drop policy if exists "portfolio_admin_reads_all" on public.portfolio_items;
create policy "portfolio_admin_reads_all"
on public.portfolio_items for select to authenticated
using ((select private.is_portfolio_admin()));

drop policy if exists "portfolio_admin_creates" on public.portfolio_items;
create policy "portfolio_admin_creates"
on public.portfolio_items for insert to authenticated
with check ((select private.is_portfolio_admin()));

drop policy if exists "portfolio_admin_updates" on public.portfolio_items;
create policy "portfolio_admin_updates"
on public.portfolio_items for update to authenticated
using ((select private.is_portfolio_admin()))
with check ((select private.is_portfolio_admin()));

drop policy if exists "portfolio_admin_deletes" on public.portfolio_items;
create policy "portfolio_admin_deletes"
on public.portfolio_items for delete to authenticated
using ((select private.is_portfolio_admin()));

drop policy if exists "settings_admin_creates" on public.site_settings;
create policy "settings_admin_creates"
on public.site_settings for insert to authenticated
with check ((select private.is_portfolio_admin()));

drop policy if exists "settings_admin_updates" on public.site_settings;
create policy "settings_admin_updates"
on public.site_settings for update to authenticated
using ((select private.is_portfolio_admin()))
with check ((select private.is_portfolio_admin()));

drop policy if exists "settings_admin_deletes" on public.site_settings;
create policy "settings_admin_deletes"
on public.site_settings for delete to authenticated
using ((select private.is_portfolio_admin()));

drop policy if exists "portfolio_assets_admin_insert" on storage.objects;
create policy "portfolio_assets_admin_insert"
on storage.objects for insert to authenticated
with check (
  bucket_id in ('hero', 'portfolio', 'workflows', 'uploads')
  and (select private.is_portfolio_admin())
);

drop policy if exists "portfolio_assets_admin_update" on storage.objects;
create policy "portfolio_assets_admin_update"
on storage.objects for update to authenticated
using (
  bucket_id in ('hero', 'portfolio', 'workflows', 'uploads')
  and (select private.is_portfolio_admin())
)
with check (
  bucket_id in ('hero', 'portfolio', 'workflows', 'uploads')
  and (select private.is_portfolio_admin())
);

drop policy if exists "portfolio_assets_admin_delete" on storage.objects;
create policy "portfolio_assets_admin_delete"
on storage.objects for delete to authenticated
using (
  bucket_id in ('hero', 'portfolio', 'workflows', 'uploads')
  and (select private.is_portfolio_admin())
);
