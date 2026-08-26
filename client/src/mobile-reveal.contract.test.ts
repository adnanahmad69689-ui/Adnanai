import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("mobile reveal visibility contract", () => {
  it("restores visible styling when the compact-screen fallback marks an item as revealed", () => {
    const hook = readFileSync(resolve(projectRoot, "client/src/hooks/useReveal.ts"), "utf8");
    const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(hook).toContain('window.matchMedia("(max-width: 768px)").matches');
    expect(hook).toContain('item.classList.add("is-revealed")');
    expect(hook).toContain("new MutationObserver");
    expect(hook).toContain('node.querySelectorAll<HTMLElement>(".reveal-item").forEach(observeItem)');
    expect(styles).toContain(".reveal-item.is-revealed {");
    expect(styles).toContain(".reveal-item.is-revealed {\n  opacity: 1;");
    expect(styles).toContain("  transform: translateY(0);");
    expect(styles).toContain("@media (max-width: 768px) {");
    expect(styles).toContain(".reveal-item {\n    opacity: 1 !important;");
  });
});
