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
    expect(cursorComponent).toContain("pointermove");
    expect(stylesheet).toMatch(/\.custom-cursor,[\s\S]*?pointer-events:\s*none/);
  });

  it("writes the pointer position straight to the DOM so the cursor cannot fall behind", () => {
    // Position is applied inside the pointermove handler rather than being
    // deferred to a frame callback, which previously cost a frame of latency
    // for no saving: browsers already coalesce pointermove to one per frame.
    expect(cursorComponent).toContain("dot.style.transform = transform");
    expect(cursorComponent).toContain("ring.style.transform = transform");

    // The position write must sit inside the pointermove handler itself.
    const onMoveBody = cursorComponent.slice(
      cursorComponent.indexOf("const onMove"),
      cursorComponent.indexOf("const onPointerOver"),
    );
    expect(onMoveBody).toContain("dot.style.transform = transform");
    expect(onMoveBody).not.toMatch(/requestAnimationFrame\s*\(/);

    // Frame scheduling is allowed elsewhere, but only to throttle the hover
    // re-test after scrolling — never to move the cursor.
    const frameCalls = cursorComponent.match(/requestAnimationFrame\s*\(\s*(\w+)/g) ?? [];
    for (const call of frameCalls) {
      expect(call).toContain("syncHoverAfterScroll");
    }
  });

  it("never transitions the transform that tracks the pointer", () => {
    // Regression guard. A transition on transform makes the cursor trail the
    // real pointer by exactly its duration, which is what made it feel laggy.
    // Only the inner marks may animate.
    const trackedRules = stylesheet.match(/\.custom-cursor \{[^}]*\}|\.custom-cursor-ring \{[^}]*\}/g) ?? [];
    expect(trackedRules.length).toBeGreaterThan(0);
    for (const rule of trackedRules) {
      expect(rule).not.toContain("transition");
    }
  });

  it("keeps the custom cursor unavailable on narrow screens and disabled for reduced motion", () => {
    expect(stylesheet).toContain("@media (width <= 1024px)");
    expect(stylesheet).toMatch(/\.custom-cursor, \.custom-cursor-ring \{ display:\s*none;/);
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps hover feedback subtle, limited to interactive elements, and free of layout work", () => {
    expect(cursorComponent).toContain("a, button, input, textarea, select");
    // The hover state is a class toggle rather than React state, so moving the
    // mouse never re-renders the component.
    expect(cursorComponent).toContain('classList.toggle("is-interactive"');
    expect(stylesheet).toContain(".custom-cursor-ring.is-interactive");
    // The ring scales instead of animating width/height, which would relayout.
    expect(stylesheet).toMatch(/\.custom-cursor-ring\.is-interactive[^{]*\{[^}]*transform:\s*scale\(/);
  });

  it("activates only after a real desktop pointer move instead of relying on a fragile hover media query", () => {
    expect(cursorComponent).toContain('event.pointerType !== "mouse" && event.pointerType !== "pen"');
    expect(cursorComponent).toContain('classList.add("custom-cursor-active")');
    expect(cursorComponent).toContain('classList.remove("custom-cursor-active")');
    expect(stylesheet).toContain("html.custom-cursor-active body");
  });
});
