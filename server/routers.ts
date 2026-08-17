import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import {
  createPortfolioItem,
  deletePortfolioItem,
  listAdminPortfolioItems,
  listPublishedPortfolioItems,
  reorderPortfolioItems,
  updatePortfolioItem,
} from "./db";
import { storagePut } from "./storage";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

const portfolioKindSchema = z.enum(["website", "ai_system"]);
const portfolioStatusSchema = z.enum(["draft", "published"]);

const optionalText = z.string().trim().max(5000).nullable().optional();

const portfolioItemInput = z.object({
  kind: portfolioKindSchema,
  title: z.string().trim().min(2).max(180),
  label: z.string().trim().min(2).max(180),
  description: z.string().trim().min(8).max(5000),
  imageUrl: z.string().trim().min(1).max(2048),
  imageAlt: z.string().trim().min(4).max(500),
  imageKey: z.string().trim().max(1024).nullable().optional(),
  publicUrl: z.string().trim().url().max(2048).nullable().optional(),
  details: z.array(z.string().trim().min(1).max(280)).max(6).default([]),
  trigger: optionalText,
  aiProcess: optionalText,
  output: optionalText,
  approvalRequired: z.boolean().default(false),
  status: portfolioStatusSchema.default("draft"),
  sortOrder: z.number().int().min(0).max(10000).default(0),
});

function toDatabaseItem(input: z.infer<typeof portfolioItemInput>) {
  return {
    ...input,
    imageKey: input.imageKey || null,
    publicUrl: input.publicUrl || null,
    detailsJson: JSON.stringify(input.details),
    trigger: input.trigger || null,
    aiProcess: input.aiProcess || null,
    output: input.output || null,
    approvalRequired: input.approvalRequired ? 1 : 0,
  };
}

function toPublicItem<T extends { detailsJson: string | null; approvalRequired: number }>(item: T) {
  let details: string[] = [];
  try {
    const parsed = JSON.parse(item.detailsJson ?? "[]");
    details = Array.isArray(parsed) ? parsed.filter(value => typeof value === "string") : [];
  } catch {
    details = [];
  }
  return { ...item, details, approvalRequired: item.approvalRequired === 1 };
}

const imageUploadInput = z.object({
  fileName: z.string().trim().min(1).max(140),
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  contentBase64: z.string().min(32).max(7_000_000),
});

function safeImageName(fileName: string, contentType: string) {
  const extension = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const stem = fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${stem || "portfolio-image"}-${Date.now()}.${extension}`;
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  portfolio: router({
    list: publicProcedure.input(z.object({ kind: portfolioKindSchema })).query(async ({ input }) => {
      const items = await listPublishedPortfolioItems(input.kind);
      return items.map(toPublicItem);
    }),
    adminList: adminProcedure
      .input(z.object({ kind: portfolioKindSchema.optional() }).optional())
      .query(async ({ input }) => {
        const items = await listAdminPortfolioItems(input?.kind);
        return items.map(toPublicItem);
      }),
    create: adminProcedure.input(portfolioItemInput).mutation(async ({ input }) => {
      await createPortfolioItem(toDatabaseItem(input));
      return { success: true } as const;
    }),
    update: adminProcedure
      .input(portfolioItemInput.partial().extend({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const { id, ...partial } = input;
        const fields = Object.fromEntries(Object.entries(partial).filter(([, value]) => value !== undefined));
        const updates: Record<string, unknown> = {};
        const directFields = [
          "kind",
          "title",
          "label",
          "description",
          "imageUrl",
          "imageAlt",
          "imageKey",
          "publicUrl",
          "trigger",
          "aiProcess",
          "output",
          "status",
          "sortOrder",
        ] as const;
        for (const field of directFields) {
          if (field in fields) updates[field] = fields[field];
        }
        if ("details" in fields) updates.detailsJson = JSON.stringify(fields.details);
        if ("approvalRequired" in fields) updates.approvalRequired = fields.approvalRequired ? 1 : 0;
        if (Object.keys(updates).length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No changes were provided." });
        }
        await updatePortfolioItem(id, updates);
        return { success: true } as const;
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await deletePortfolioItem(input.id);
        return { success: true } as const;
      }),
    reorder: adminProcedure
      .input(z.object({ items: z.array(z.object({ id: z.number().int().positive(), sortOrder: z.number().int().min(0) })).min(1) }))
      .mutation(async ({ input }) => {
        await reorderPortfolioItems(input.items);
        return { success: true } as const;
      }),
    uploadImage: adminProcedure.input(imageUploadInput).mutation(async ({ input }) => {
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(input.contentBase64)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Image data is invalid." });
      }
      const imageBuffer = Buffer.from(input.contentBase64, "base64");
      if (imageBuffer.length === 0 || imageBuffer.length > 5 * 1024 * 1024) {
        throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "Images must be 5 MB or smaller." });
      }
      const result = await storagePut(
        `portfolio/${safeImageName(input.fileName, input.contentType)}`,
        imageBuffer,
        input.contentType,
      );
      return result;
    }),
  }),
});

export type AppRouter = typeof appRouter;
