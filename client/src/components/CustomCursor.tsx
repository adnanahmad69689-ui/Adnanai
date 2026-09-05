/**
 * Desktop pointer cursor.
 *
 * Position is written straight to the DOM in the pointermove handler rather
 * than being deferred to requestAnimationFrame. Browsers already coalesce
 * pointermove to at most one event per frame, so rAF added a frame of latency
 * without saving any work. The hover state is toggled with a class rather than
 * React state, so moving the mouse never re-renders the component.
 */
import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [role='option']";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let activated = false;
    let interactive = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      if (!activated) {
        activated = true;
        document.documentElement.classList.add("custom-cursor-active");
      }
      // Two writes, no reads: nothing here can force a synchronous layout.
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = transform;
      ring.style.transform = transform;
    };

    const setInteractive = (next: boolean) => {
      if (next === interactive) return;
      interactive = next;
      dot.classList.toggle("is-interactive", next);
      ring.classList.toggle("is-interactive", next);
    };

    const onPointerOver = (event: PointerEvent) => {
      setInteractive(Boolean((event.target as Element | null)?.closest(INTERACTIVE_SELECTOR)));
    };
    const onPointerOut = (event: PointerEvent) => {
      setInteractive(Boolean((event.relatedTarget as Element | null)?.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  const offscreen = { transform: "translate3d(-100px, -100px, 0)" };
  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="custom-cursor" style={offscreen}>
        <div className="custom-cursor__mark" />
      </div>
      <div ref={ringRef} aria-hidden="true" className="custom-cursor-ring" style={offscreen}>
        <div className="custom-cursor-ring__mark" />
      </div>
    </>
  );
}
