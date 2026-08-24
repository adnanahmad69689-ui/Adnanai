import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const adminPage = readFileSync(resolve(projectRoot, "client/src/pages/AdminPortfolio.tsx"), "utf8");
const cursorComponent = readFileSync(resolve(projectRoot, "client/src/components/CustomCursor.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("admin custom cursor contract", () => {
  it("mounts the lightweight cursor without allowing it to intercept dashboard controls", () => {
    expect(adminPage).toContain("<CustomCursor />");
    expect(cursorComponent).toContain("requestAnimationFrame");
    expect(cursorComponent).toContain("cancelAnimationFrame");
    expect(cursorComponent).toContain("pointermove");
    expect(stylesheet).toMatch(/\.custom-cursor,[\s\S]*?pointer-events:\s*none/);
  });

  it("keeps the custom cursor disabled for touch and narrow-screen admin layouts", () => {
    expect(stylesheet).toContain("@media (hover: none), (width <= 1024px)");
    expect(stylesheet).toMatch(/\.custom-cursor, \.custom-cursor-ring \{ display:\s*none;/);
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps hover feedback subtle and limited to interactive elements", () => {
    expect(cursorComponent).toContain("a, button, input, textarea, select");
    expect(cursorComponent).toContain("isInteractive");
    expect(stylesheet).toContain(".custom-cursor-ring.is-interactive");
    expect(stylesheet).toContain("width: 38px");
  });
});
