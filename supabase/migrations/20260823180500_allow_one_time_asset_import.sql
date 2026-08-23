-- Temporary one-time policy for importing the nine existing approved portfolio assets.
-- Object names are unguessable UUIDs and this policy is removed immediately after upload verification.

drop policy if exists "temporary_asset_import" on storage.objects;
create policy "temporary_asset_import"
on storage.objects for insert to anon, authenticated
with check (
  (bucket_id = 'hero' and name = 'migration/72a17e27-37ab-4c13-b1b5-ada0f02c2d17.webp')
  or (bucket_id = 'uploads' and name = 'migration/ed576c01-2271-4a82-8baf-5183dfe6f888.webp')
  or (bucket_id = 'portfolio' and name = 'migration/cb7824ec-661f-42e4-83d8-2ca017d778de.webp')
  or (bucket_id = 'portfolio' and name = 'migration/0c4fe57c-4254-46c8-b9e9-7ec4610a7232.webp')
  or (bucket_id = 'workflows' and name = 'migration/271ebbb2-aa7f-4959-bdce-7b11639b0243.webp')
  or (bucket_id = 'workflows' and name = 'migration/af505c30-2299-4b45-987c-68b75a745972.webp')
  or (bucket_id = 'workflows' and name = 'migration/354ab610-f1e8-418d-badd-0c8d7621b53e.webp')
  or (bucket_id = 'workflows' and name = 'migration/28cf06b6-d63d-4cb9-8b22-6346b16f9f74.webp')
  or (bucket_id = 'workflows' and name = 'migration/d7ce75b4-592f-4dae-9e38-dd142ce67ebe.webp')
);
