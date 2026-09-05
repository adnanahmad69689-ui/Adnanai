/**
 * Desktop pointer cursor.
 *
 * Position is written straight to the DOM in the pointermove handler rather
 * than being deferred to requestAnimationFrame. Browsers already coalesce
 * pointermove to at most one event per frame, so rAF added a frame of latency
 * without saving any work. The hover state is toggled with a class rather than
 * React state, so moving the mouse never re-renders the component.
 *
 * Two things the page cannot observe directly are handled explicitly:
 *
 *  - The browser does not deliver pointer events over its own scrollbar. Left
 *    alone, the mark freezes at the last in-document position while the real
 *    pointer travels down the scrollbar, so dragging the scrollbar looks like
 *    the cursor has desynced. The mark is hidden whenever the pointer leaves
 *    the document, which includes moving onto the scrollbar, and the real
 *    system cursor takes over there.
 *
 *  - Scrolling moves the page under a stationary pointer, so the element being
 *    hovered changes without any pointer event. The hover state is re-tested
 *    against the last known position after each scroll.
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
    let visible = true;
    let lastX = -100;
    let lastY = -100;
    let scrollFrame = 0;

    const setInteractive = (next: boolean) => {
      if (next === interactive) return;
      interactive = next;
      dot.classList.toggle("is-interactive", next);
      ring.classList.toggle("is-interactive", next);
    };

    const setVisible = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      dot.classList.toggle("is-hidden", !next);
      ring.classList.toggle("is-hidden", !next);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      if (!activated) {
        activated = true;
        document.documentElement.classList.add("custom-cursor-active");
      }
      lastX = event.clientX;
      lastY = event.clientY;
      setVisible(true);
      // Two writes, no reads: nothing here can force a synchronous layout.
      const transform = `translate3d(${lastX}px, ${lastY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = transform;
      ring.style.transform = transform;
    };

    const onPointerOver = (event: PointerEvent) => {
      setInteractive(Boolean((event.target as Element | null)?.closest(INTERACTIVE_SELECTOR)));
    };
    const onPointerOut = (event: PointerEvent) => {
      setInteractive(Boolean((event.relatedTarget as Element | null)?.closest(INTERACTIVE_SELECTOR)));
    };

    // Leaving the document covers the scrollbar, the browser chrome and the
    // window edge. relatedTarget is null only when the pointer really left.
    const onDocumentLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) setVisible(false);
    };

    // The pointer has not moved, but the page under it has. Re-test the hover
    // target so the ring does not stay lit on an element that scrolled away.
    const syncHoverAfterScroll = () => {
      scrollFrame = 0;
      if (!visible || !activated) return;
      const target = document.elementFromPoint(lastX, lastY);
      setInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncHoverAfterScroll);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerout", onDocumentLeave, { passive: true });
    window.addEventListener("blur", () => setVisible(false));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerout", onDocumentLeave);
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
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
