import { describe, expect, it } from "vitest";

describe("Supabase browser configuration", () => {
  it("reaches the configured Auth health endpoint with the publishable key", async () => {
    const projectUrl = process.env.VITE_SUPABASE_URL;
    const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    expect(projectUrl).toMatch(/^https:\/\/[^/]+\.supabase\.co$/);
    expect(publishableKey).toMatch(/^sb_publishable_/);

    const response = await fetch(`${projectUrl}/auth/v1/health`, {
      headers: { apikey: publishableKey! },
    });

    expect(response.ok).toBe(true);
  });
});
