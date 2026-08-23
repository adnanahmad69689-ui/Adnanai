import { supabase } from "./supabase";

export type PortfolioKind = "website" | "ai_system";
export type PortfolioStatus = "draft" | "published";

type PortfolioRow = {
  id: number;
  kind: PortfolioKind;
  title: string;
  label: string;
  description: string;
  image_url: string;
  image_alt: string;
  image_key: string | null;
  public_url: string | null;
  details: string[] | null;
  trigger: string | null;
  ai_process: string | null;
  output: string | null;
  approval_required: boolean;
  status: PortfolioStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type PortfolioItem = {
  id: number;
  kind: PortfolioKind;
  title: string;
  label: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageKey: string | null;
  publicUrl: string | null;
  details: string[];
  trigger: string | null;
  aiProcess: string | null;
  output: string | null;
  approvalRequired: boolean;
  status: PortfolioStatus;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PortfolioInput = Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">;

type SiteSettingsRow = {
  id: "global";
  hero_image_url: string | null;
  hero_image_key: string | null;
  hero_image_alt: string | null;
  updated_at: string;
};

export type SiteSettings = {
  heroImageUrl: string | null;
  heroImageKey: string | null;
  heroImageAlt: string | null;
  updatedAt: Date;
};

function mapRow(row: PortfolioRow): PortfolioItem {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    label: row.label,
    description: row.description,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    imageKey: row.image_key,
    publicUrl: row.public_url,
    details: Array.isArray(row.details) ? row.details.filter((detail): detail is string => typeof detail === "string") : [],
    trigger: row.trigger,
    aiProcess: row.ai_process,
    output: row.output,
    approvalRequired: row.approval_required,
    status: row.status,
    sortOrder: row.sort_order,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

function mapInput(input: PortfolioInput) {
  return {
    kind: input.kind,
    title: input.title,
    label: input.label,
    description: input.description,
    image_url: input.imageUrl,
    image_alt: input.imageAlt,
    image_key: input.imageKey,
    public_url: input.publicUrl,
    details: input.details,
    trigger: input.trigger,
    ai_process: input.aiProcess,
    output: input.output,
    approval_required: input.approvalRequired,
    status: input.status,
    sort_order: input.sortOrder,
  };
}

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export async function listPublishedPortfolioItems(kind: PortfolioKind) {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("kind", kind)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  throwIfError(error);
  return ((data ?? []) as PortfolioRow[]).map(mapRow);
}

export async function listAdminPortfolioItems() {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("kind", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  throwIfError(error);
  return ((data ?? []) as PortfolioRow[]).map(mapRow);
}

export async function createPortfolioItem(input: PortfolioInput) {
  const { error } = await supabase.from("portfolio_items").insert(mapInput(input));
  throwIfError(error);
}

export async function updatePortfolioItem({ id, ...input }: PortfolioInput & { id: number }) {
  const { error } = await supabase.from("portfolio_items").update(mapInput(input)).eq("id", id);
  throwIfError(error);
}

export async function deletePortfolioItem(item: PortfolioItem) {
  const { error } = await supabase.from("portfolio_items").delete().eq("id", item.id);
  throwIfError(error);

  if (item.imageKey) {
    const [bucket, ...pathParts] = item.imageKey.split("/");
    const objectPath = pathParts.join("/");
    if (bucket && objectPath) {
      const { error: storageError } = await supabase.storage.from(bucket).remove([objectPath]);
      if (storageError) throw new Error(`Portfolio item was deleted, but image cleanup failed: ${storageError.message}`);
    }
  }
}

export async function reorderPortfolioItems(items: Array<{ id: number; sortOrder: number }>) {
  await Promise.all(items.map(async item => {
    const { error } = await supabase.from("portfolio_items").update({ sort_order: item.sortOrder }).eq("id", item.id);
    throwIfError(error);
  }));
}

export async function uploadPortfolioImage(file: File, kind: PortfolioKind) {
  const bucket = kind === "website" ? "portfolio" : "workflows";
  const extension = file.type === "image/png" ? "png" : file.type === "image/jpeg" ? "jpg" : "webp";
  const objectPath = `admin/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(bucket).upload(objectPath, file, {
    contentType: file.type,
    upsert: false,
  });
  throwIfError(error);
  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
  return { key: `${bucket}/${objectPath}`, url: data.publicUrl };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", "global").maybeSingle();
  throwIfError(error);
  if (!data) return null;
  const row = data as SiteSettingsRow;
  return {
    heroImageUrl: row.hero_image_url,
    heroImageKey: row.hero_image_key,
    heroImageAlt: row.hero_image_alt,
    updatedAt: new Date(row.updated_at),
  };
}

export async function uploadHeroImage(file: File) {
  const extension = file.type === "image/png" ? "png" : file.type === "image/jpeg" ? "jpg" : "webp";
  const objectPath = `admin/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("hero").upload(objectPath, file, { contentType: file.type, upsert: false });
  throwIfError(error);
  const { data } = supabase.storage.from("hero").getPublicUrl(objectPath);
  return { key: `hero/${objectPath}`, url: data.publicUrl };
}

export async function updateHeroSettings(input: { imageUrl: string | null; imageKey: string | null; imageAlt: string | null; previousKey?: string | null }) {
  const { error } = await supabase.from("site_settings").upsert({
    id: "global",
    hero_image_url: input.imageUrl,
    hero_image_key: input.imageKey,
    hero_image_alt: input.imageAlt,
  });
  throwIfError(error);

  if (input.previousKey && input.previousKey !== input.imageKey) {
    const [bucket, ...pathParts] = input.previousKey.split("/");
    const objectPath = pathParts.join("/");
    if (bucket && objectPath) {
      const { error: storageError } = await supabase.storage.from(bucket).remove([objectPath]);
      if (storageError) throw new Error(`Hero settings were saved, but the previous image could not be removed: ${storageError.message}`);
    }
  }
}
