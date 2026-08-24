import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "client", "src");

describe("password-based owner login contract", () => {
  it("uses password sign-in and a password recovery path without weakening the admin role gate", () => {
    const authHook = readFileSync(resolve(root, "_core/hooks/useAuth.ts"), "utf8");
    const signIn = readFileSync(resolve(root, "components/AdminSignIn.tsx"), "utf8");
    const dashboard = readFileSync(resolve(root, "components/DashboardLayout.tsx"), "utf8");

    expect(authHook).toContain("signInWithPassword");
    expect(authHook).toContain("resetPasswordForEmail");
    expect(authHook).toContain("/reset-password");
    expect(authHook).toContain("updateUser({ password })");
    expect(signIn).toContain("Set or reset password");
    expect(signIn).toContain("New password (12+ characters)");
    expect(dashboard).toContain('user.role !== "admin"');
  });
});
