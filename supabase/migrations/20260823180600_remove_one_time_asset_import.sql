-- Remove the temporary anonymous import allowance immediately after successful asset transfer.

drop policy if exists "temporary_asset_import" on storage.objects;
