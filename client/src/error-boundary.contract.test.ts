import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("deployment asset recovery boundary", () => {
  it("retries once when a stale deployment asset prevents a lazy route from loading", () => {
    const source = readFileSync(resolve(projectRoot, "client/src/components/ErrorBoundary.tsx"), "utf8");

    expect(source).toContain('const DEPLOYMENT_RELOAD_KEY = "adnan-ai:asset-reload-attempted"');
    expect(source).toContain("failed to fetch dynamically imported module");
    expect(source).toContain("window.sessionStorage.getItem(DEPLOYMENT_RELOAD_KEY) !== \"true\"");
    expect(source).toContain("window.location.reload()");
  });
});
