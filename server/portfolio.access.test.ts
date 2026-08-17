import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 99,
      openId: "standard-user",
      email: "standard@example.com",
      name: "Standard User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("portfolio administration access", () => {
  it("rejects a standard user before a portfolio create operation can reach the database", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(
      caller.portfolio.create({
        kind: "website",
        title: "Blocked test item",
        label: "TEST",
        description: "This request should be rejected by the administrator guard.",
        imageUrl: "/manus-storage/blocked.webp",
        imageAlt: "Blocked test image",
        details: [],
        approvalRequired: false,
        status: "draft",
        sortOrder: 1,
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
