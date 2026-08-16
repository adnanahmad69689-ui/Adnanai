/** Custom cursor: accent dot + trailing ring, desktop only (CSS hides on touch). */
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      setDot({ x: e.clientX, y: e.clientY });
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 60);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{ left: dot.x, top: dot.y, transform: "translate(-50%, -50%)" }}
      />
      <div
        className="custom-cursor-ring"
        style={{ left: ring.x, top: ring.y, transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}

