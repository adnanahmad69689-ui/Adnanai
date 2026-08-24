/** Lightweight desktop pointer cursor: one frame update and a restrained interactive state. */
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const latestPointer = useRef({ x: -100, y: -100 });
  const cursorActivated = useRef(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const paint = () => {
      frameRef.current = null;
      const transform = `translate3d(${latestPointer.current.x}px, ${latestPointer.current.y}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      if (!cursorActivated.current) {
        cursorActivated.current = true;
        document.documentElement.classList.add("custom-cursor-active");
      }
      latestPointer.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(paint);
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setIsInteractive(Boolean(target?.closest("a, button, input, textarea, select, [role='button'], [role='option']")));
    };
    const onPointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget as Element | null;
      setIsInteractive(Boolean(related?.closest("a, button, input, textarea, select, [role='button'], [role='option']")));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  const initialStyle = { transform: "translate3d(-100px, -100px, 0)" };
  const interactiveClass = isInteractive ? " is-interactive" : "";
  return <><div ref={dotRef} aria-hidden="true" className={`custom-cursor${interactiveClass}`} style={initialStyle} /><div ref={ringRef} aria-hidden="true" className={`custom-cursor-ring${interactiveClass}`} style={initialStyle} /></>;
}
