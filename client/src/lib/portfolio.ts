import { supabase } from "./supabase";

/**
 * 'ai_system' is the original value and is presented as AI Automation.
 * 'ai_agent' is for genuine agent projects. Existing rows were never rewritten,
 * so the historical value stays meaningful.
 */
export type PortfolioKind = "website" | "ai_system" | "ai_agent";

export const PORTFOLIO_KINDS: { id: PortfolioKind; label: string }[] = [
  { id: "website", label: "Website Projects" },
  { id: "ai_system", label: "AI Automation" },
  { id: "ai_agent", label: "AI Agents" },
];
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
  image_focal_x: number | string | null;
  image_focal_y: number | string | null;
  image_zoom: number | string | null;
  agent_example: boolean | null;
  created_at: string;
  updated_at: string;
};

/** Postgres numeric columns arrive as strings over PostgREST. */
function toNumber(value: number | string | null | undefined, fallback: number) {
  const parsed = typeof value === "string" ? Number.parseFloat(value) : value;
  return typeof parsed === "number" && Number.isFinite(parsed) ? parsed : fallback;
}

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
  focalX: number;
  focalY: number;
  zoom: number;
  /** Temporarily borrowed into the AI Agents section. Automations only. */
  agentExample: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PortfolioInput = Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">;

type SiteSettingsRow = {
  id: "global";
  hero_image_url: string | null;
  hero_image_key: string | null;
  hero_image_alt: string | null;
  about_image_url: string | null;
  about_image_key: string | null;
  about_image_alt: string | null;
  about_image_focal_x: number | string | null;
  about_image_focal_y: number | string | null;
  about_image_zoom: number | string | null;
  hero_image_focal_x: number | string | null;
  hero_image_focal_y: number | string | null;
  hero_image_zoom: number | string | null;
  updated_at: string;
};

export type SiteSettings = {
  heroImageUrl: string | null;
  heroImageKey: string | null;
  heroImageAlt: string | null;
  aboutImageUrl: string | null;
  aboutImageKey: string | null;
  aboutImageAlt: string | null;
  aboutFocalX: number;
  aboutFocalY: number;
  aboutZoom: number;
  heroFocalX: number;
  heroFocalY: number;
  heroZoom: number;
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
    focalX: toNumber(row.image_focal_x, 50),
    focalY: toNumber(row.image_focal_y, 50),
    zoom: toNumber(row.image_zoom, 1),
    agentExample: row.agent_example === true,
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
    image_focal_x: input.focalX,
    image_focal_y: input.focalY,
    image_zoom: input.zoom,
    agent_example: input.agentExample,
  };
}

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

/**
 * Image framing lives in columns added by a later migration. Until that
 * migration is applied, sending those fields makes PostgREST reject the whole
 * write, which would silently break every save from the admin console.
 *
 * The capability is probed once and cached, so a pending migration degrades to
 * "framing unavailable" instead of "nothing can be saved".
 */
/**
 * Reads one row with select('*') and inspects its keys.
 *
 * Selecting the column by name would be the obvious probe, but PostgREST
 * answers 400 when the column does not exist, and that lands in the browser
 * console on every visit. Asking for the whole row always succeeds, so the
 * capability checks stay silent.
 */
const rowShapes = new Map<string, Promise<Set<string>>>();

function tableColumns(table: "portfolio_items" | "site_settings"): Promise<Set<string>> {
  let cached = rowShapes.get(table);
  if (!cached) {
    cached = (async () => {
      try {
        const { data, error } = await supabase.from(table).select("*").limit(1);
        if (error || !data?.length) return new Set<string>();
        return new Set(Object.keys(data[0] as Record<string, unknown>));
      } catch {
        return new Set<string>();
      }
    })();
    rowShapes.set(table, cached);
  }
  return cached;
}

async function columnExists(table: "portfolio_items" | "site_settings", column: string) {
  const columns = await tableColumns(table);
  // An empty table tells us nothing about its shape, so assume support rather
  // than permanently disabling a feature on an empty database.
  return columns.size === 0 ? true : columns.has(column);
}

let framingProbe: Promise<boolean> | null = null;

export function supportsFraming(): Promise<boolean> {
  framingProbe ??= columnExists("portfolio_items", "image_focal_x");
  return framingProbe;
}

let aboutImageProbe: Promise<boolean> | null = null;

export function supportsAboutImage(): Promise<boolean> {
  aboutImageProbe ??= columnExists("site_settings", "about_image_url");
  return aboutImageProbe;
}

function withoutKeys<T extends Record<string, unknown>>(payload: T, keys: string[]) {
  const copy: Record<string, unknown> = { ...payload };
  for (const key of keys) delete copy[key];
  return copy;
}

let agentCategoryProbe: Promise<boolean> | null = null;

/**
 * Whether the agent-category migration has been applied. Until it has, the
 * agent_example column and the 'ai_agent' kind do not exist, so those fields
 * are stripped from writes and the Agents section simply stays empty rather
 * than every save failing.
 */
export function supportsAgentCategory(): Promise<boolean> {
  agentCategoryProbe ??= columnExists("portfolio_items", "agent_example");
  return agentCategoryProbe;
}

const FRAMING_KEYS = ["image_focal_x", "image_focal_y", "image_zoom"];
const AGENT_KEYS = ["agent_example"];
const ABOUT_FRAMING_KEYS = ["about_image_focal_x", "about_image_focal_y", "about_image_zoom"];
const HERO_FRAMING_KEYS = ["hero_image_focal_x", "hero_image_focal_y", "hero_image_zoom"];

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

/**
 * Everything the AI Agents section shows: genuine agent projects, plus any
 * automation the owner has flagged as a temporary agent-style example.
 *
 * The flagged automations are the same rows the automation section renders, not
 * copies, so editing one updates both places and un-flagging it removes it from
 * here with no other change.
 */
export async function listAgentSectionItems() {
  const genuine = await listPublishedPortfolioItems("ai_agent");
  if (!(await supportsAgentCategory())) return genuine;

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("kind", "ai_system")
    .eq("status", "published")
    .eq("agent_example", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  throwIfError(error);

  // Genuine agent work leads; borrowed examples follow it.
  return [...genuine, ...((data ?? []) as PortfolioRow[]).map(mapRow)];
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

async function portfolioPayload(input: PortfolioInput) {
  let payload: Record<string, unknown> = mapInput(input);
  if (!(await supportsFraming())) payload = withoutKeys(payload, FRAMING_KEYS);
  if (!(await supportsAgentCategory())) payload = withoutKeys(payload, AGENT_KEYS);
  return payload;
}

export async function createPortfolioItem(input: PortfolioInput) {
  const { error } = await supabase.from("portfolio_items").insert(await portfolioPayload(input));
  throwIfError(error);
}

export async function updatePortfolioItem({ id, ...input }: PortfolioInput & { id: number }) {
  const { error } = await supabase.from("portfolio_items").update(await portfolioPayload(input)).eq("id", id);
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
    aboutImageUrl: row.about_image_url ?? null,
    aboutImageKey: row.about_image_key ?? null,
    aboutImageAlt: row.about_image_alt ?? null,
    aboutFocalX: toNumber(row.about_image_focal_x, 50),
    aboutFocalY: toNumber(row.about_image_focal_y, 50),
    aboutZoom: toNumber(row.about_image_zoom, 1),
    heroFocalX: toNumber(row.hero_image_focal_x, 50),
    heroFocalY: toNumber(row.hero_image_focal_y, 50),
    heroZoom: toNumber(row.hero_image_zoom, 1),
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

/** Stored in the existing hero bucket under about/ so no new storage policy is needed. */
export async function uploadAboutImage(file: File) {
  const extension = file.type === "image/png" ? "png" : file.type === "image/jpeg" ? "jpg" : "webp";
  const objectPath = `about/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("hero").upload(objectPath, file, { contentType: file.type, upsert: false });
  throwIfError(error);
  const { data } = supabase.storage.from("hero").getPublicUrl(objectPath);
  return { key: `hero/${objectPath}`, url: data.publicUrl };
}

export async function updateHeroSettings(input: { imageUrl: string | null; imageKey: string | null; imageAlt: string | null; focalX?: number; focalY?: number; zoom?: number; previousKey?: string | null }) {
  const payload = {
    id: "global",
    hero_image_url: input.imageUrl,
    hero_image_key: input.imageKey,
    hero_image_alt: input.imageAlt,
    hero_image_focal_x: input.focalX ?? 50,
    hero_image_focal_y: input.focalY ?? 50,
    hero_image_zoom: input.zoom ?? 1,
  };
  const { error } = await supabase
    .from("site_settings")
    .upsert((await supportsFraming()) ? payload : withoutKeys(payload, HERO_FRAMING_KEYS));
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

export async function updateAboutSettings(input: { imageUrl: string | null; imageKey: string | null; imageAlt: string | null; focalX?: number; focalY?: number; zoom?: number; previousKey?: string | null }) {
  // Only the about_* columns are sent, so the hero image on the same row is
  // left exactly as it is.
  const payload = {
    id: "global",
    about_image_url: input.imageUrl,
    about_image_key: input.imageKey,
    about_image_alt: input.imageAlt,
    about_image_focal_x: input.focalX ?? 50,
    about_image_focal_y: input.focalY ?? 50,
    about_image_zoom: input.zoom ?? 1,
  };
  if (!(await supportsAboutImage())) {
    throw new Error("The About image columns are not in the database yet. Run the pending migration in Supabase, then try again.");
  }
  const stripped = (await supportsFraming()) ? payload : withoutKeys(payload, ABOUT_FRAMING_KEYS);
  const { error } = await supabase.from("site_settings").upsert(stripped);
  throwIfError(error);

  if (input.previousKey && input.previousKey !== input.imageKey) {
    const [bucket, ...pathParts] = input.previousKey.split("/");
    const objectPath = pathParts.join("/");
    if (bucket && objectPath) {
      const { error: storageError } = await supabase.storage.from(bucket).remove([objectPath]);
      if (storageError) throw new Error(`About settings were saved, but the previous image could not be removed: ${storageError.message}`);
    }
  }
}
