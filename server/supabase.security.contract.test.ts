import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Supabase security-definer hardening contract", () => {
  it("moves the owner RLS helper to a private schema and revokes public execution", () => {
    const migration = readFileSync(
      resolve(process.cwd(), "supabase/migrations/20260823214000_harden_security_definer_functions.sql"),
      "utf8",
    );

    expect(migration).toContain("create schema if not exists private");
    expect(migration).toContain("private.is_portfolio_admin()");
    expect(migration).toContain("revoke all on function public.handle_new_user() from public, anon, authenticated");
    expect(migration).toContain("revoke all on function public.is_portfolio_admin() from public, anon, authenticated");
    expect(migration).toContain("select private.is_portfolio_admin()");
  });
});
