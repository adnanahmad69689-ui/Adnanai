import fs from "node:fs/promises";

const readLiveItems = async path => {
  const payload = JSON.parse(await fs.readFile(path, "utf8"));
  return payload.result.data.json;
};

const websites = await readLiveItems("/tmp/adnan-websites.json");
const systems = await readLiveItems("/tmp/adnan-ai-systems.json");
const manifest = JSON.parse(await fs.readFile("/tmp/adnan-ai-supabase-asset-manifest.json", "utf8"));

const byFile = new Map(manifest.map(asset => [asset.sourceFile, asset]));
const assetFor = fileName => {
  const asset = byFile.get(fileName);
  if (!asset) throw new Error(`Missing migrated asset: ${fileName}`);
  return asset;
};

const websiteAsset = new Map([
  ["Aqualume water website", "aqualume-live-card.webp"],
  ["N A Metal website", "na-metal-live-card.webp"],
]);

const workflowAsset = new Map([
  ["workflow1-dashboard_f2dd664f.webp", "workflow1-dashboard.webp"],
  ["workflow2-dashboard_fe9dd248.webp", "workflow2-dashboard.webp"],
  ["workflow3-dashboard_967223f5.webp", "workflow3-dashboard.webp"],
  ["workflow4-dashboard_e6a1c00a.webp", "workflow4-dashboard.webp"],
  ["workflow5-dashboard_3422b1b5.webp", "workflow5-dashboard.webp"],
]);

const quote = value => {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replaceAll("'", "''")}'`;
};

const jsonb = value => `${quote(JSON.stringify(value ?? []))}::jsonb`;
const rows = [...websites, ...systems].map(item => {
  const sourceFile = item.kind === "website"
    ? websiteAsset.get(item.title)
    : workflowAsset.get(item.imageUrl.split("/").pop());
  const asset = assetFor(sourceFile);
  const key = `${asset.bucket}/${asset.objectPath}`;
  return {
    ...item,
    imageUrl: asset.publicUrl,
    imageKey: key,
    details: item.details ?? JSON.parse(item.detailsJson ?? "[]"),
  };
});

const values = rows.map(item => `(
  ${quote(item.kind)}, ${quote(item.title)}, ${quote(item.label)}, ${quote(item.description)},
  ${quote(item.imageUrl)}, ${quote(item.imageAlt)}, ${quote(item.imageKey)}, ${quote(item.publicUrl)},
  ${jsonb(item.details)}, ${quote(item.trigger)}, ${quote(item.aiProcess)}, ${quote(item.output)},
  ${item.approvalRequired ? "true" : "false"}, ${quote(item.status)}, ${Number(item.sortOrder)},
  ${quote(item.createdAt)}::timestamptz, ${quote(item.updatedAt)}::timestamptz
)`).join(",\n");

const hero = assetFor("hero-user-portrait.webp");
const sql = `-- Generated from the current public portfolio API and verified Supabase asset manifest.\n\ninsert into public.site_settings (id, hero_image_url, hero_image_key, hero_image_alt)\nvalues (\n  'global',\n  ${quote(hero.publicUrl)},\n  ${quote(`${hero.bucket}/${hero.objectPath}`)},\n  'Portrait of Adnan Ai seated with a laptop'\n)\non conflict (id) do update\nset hero_image_url = excluded.hero_image_url,\n    hero_image_key = excluded.hero_image_key,\n    hero_image_alt = excluded.hero_image_alt;\n\ninsert into public.portfolio_items (\n  kind, title, label, description, image_url, image_alt, image_key, public_url,\n  details, trigger, ai_process, output, approval_required, status, sort_order, created_at, updated_at\n)\nselect * from (values\n${values}\n) as seeded(\n  kind, title, label, description, image_url, image_alt, image_key, public_url,\n  details, trigger, ai_process, output, approval_required, status, sort_order, created_at, updated_at\n)\nwhere not exists (\n  select 1 from public.portfolio_items existing\n  where existing.title = seeded.title and existing.kind = seeded.kind\n);\n`;

await fs.writeFile("/tmp/adnan-ai-supabase-seed.sql", sql, "utf8");
console.log(`Prepared ${rows.length} portfolio records for Supabase.`);
