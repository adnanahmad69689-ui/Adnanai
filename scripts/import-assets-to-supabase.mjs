import fs from "node:fs/promises";
import path from "node:path";

const projectUrl = process.env.VITE_SUPABASE_URL;
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!projectUrl || !publishableKey) {
  throw new Error("Supabase browser configuration is required for asset migration.");
}

const assetRoot = "/home/ubuntu/webdev-static-assets";
const assets = [
  ["hero", "hero-user-portrait.webp", "migration/72a17e27-37ab-4c13-b1b5-ada0f02c2d17.webp"],
  ["uploads", "adnan-ai-about-portrait.webp", "migration/ed576c01-2271-4a82-8baf-5183dfe6f888.webp"],
  ["portfolio", "aqualume-live-card.webp", "migration/cb7824ec-661f-42e4-83d8-2ca017d778de.webp"],
  ["portfolio", "na-metal-live-card.webp", "migration/0c4fe57c-4254-46c8-b9e9-7ec4610a7232.webp"],
  ["workflows", "workflow1-dashboard.webp", "migration/271ebbb2-aa7f-4959-bdce-7b11639b0243.webp"],
  ["workflows", "workflow2-dashboard.webp", "migration/af505c30-2299-4b45-987c-68b75a745972.webp"],
  ["workflows", "workflow3-dashboard.webp", "migration/354ab610-f1e8-418d-badd-0c8d7621b53e.webp"],
  ["workflows", "workflow4-dashboard.webp", "migration/28cf06b6-d63d-4cb9-8b22-6346b16f9f74.webp"],
  ["workflows", "workflow5-dashboard.webp", "migration/d7ce75b4-592f-4dae-9e38-dd142ce67ebe.webp"],
];

const manifest = [];

for (const [bucket, fileName, objectPath] of assets) {
  const sourcePath = path.join(assetRoot, fileName);
  const data = await fs.readFile(sourcePath);
  const uploadUrl = `${projectUrl}/storage/v1/object/${bucket}/${objectPath}`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      "Content-Type": "image/webp",
      "x-upsert": "false",
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Upload failed for ${fileName}: ${response.status} ${await response.text()}`);
  }

  manifest.push({
    bucket,
    sourceFile: fileName,
    objectPath,
    publicUrl: `${projectUrl}/storage/v1/object/public/${bucket}/${objectPath}`,
  });
  console.log(`Uploaded ${fileName}`);
}

await fs.writeFile("/tmp/adnan-ai-supabase-asset-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`Uploaded ${manifest.length} approved assets.`);
