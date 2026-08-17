import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertPortfolioItem,
  InsertUser,
  portfolioItems,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

async function getRequiredDb() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database connection is unavailable");
  }
  return db;
}

export type PortfolioKind = "website" | "ai_system";

export async function listPublishedPortfolioItems(kind: PortfolioKind) {
  const db = await getRequiredDb();
  return db
    .select()
    .from(portfolioItems)
    .where(and(eq(portfolioItems.kind, kind), eq(portfolioItems.status, "published")))
    .orderBy(asc(portfolioItems.sortOrder), asc(portfolioItems.id));
}

export async function listAdminPortfolioItems(kind?: PortfolioKind) {
  const db = await getRequiredDb();
  const query = db.select().from(portfolioItems);
  const records = kind ? await query.where(eq(portfolioItems.kind, kind)) : await query;
  return records.sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

export async function createPortfolioItem(item: InsertPortfolioItem) {
  const db = await getRequiredDb();
  await db.insert(portfolioItems).values(item);
}

export async function updatePortfolioItem(id: number, item: Partial<InsertPortfolioItem>) {
  const db = await getRequiredDb();
  await db.update(portfolioItems).set(item).where(eq(portfolioItems.id, id));
}

export async function deletePortfolioItem(id: number) {
  const db = await getRequiredDb();
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
}

export async function reorderPortfolioItems(items: Array<{ id: number; sortOrder: number }>) {
  const db = await getRequiredDb();
  await db.transaction(async tx => {
    for (const item of items) {
      await tx
        .update(portfolioItems)
        .set({ sortOrder: item.sortOrder })
        .where(eq(portfolioItems.id, item.id));
    }
  });
}
