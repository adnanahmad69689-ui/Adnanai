import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Public portfolio content controlled by the owner-only admin dashboard.
 * Image bytes live in managed storage; this table stores their references only.
 */
export const portfolioItems = mysqlTable(
  "portfolio_items",
  {
    id: int("id").autoincrement().primaryKey(),
    kind: mysqlEnum("kind", ["website", "ai_system"]).notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    label: varchar("label", { length: 180 }).notNull(),
    description: text("description").notNull(),
    imageUrl: varchar("imageUrl", { length: 2048 }).notNull(),
    imageAlt: varchar("imageAlt", { length: 500 }).notNull(),
    imageKey: varchar("imageKey", { length: 1024 }),
    publicUrl: varchar("publicUrl", { length: 2048 }),
    detailsJson: text("detailsJson"),
    trigger: text("trigger"),
    aiProcess: text("aiProcess"),
    output: text("output"),
    approvalRequired: int("approvalRequired").notNull().default(0),
    status: mysqlEnum("status", ["draft", "published"]).notNull().default("draft"),
    sortOrder: int("sortOrder").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("portfolio_kind_status_sort_idx").on(table.kind, table.status, table.sortOrder)],
);

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItems.$inferInsert;
