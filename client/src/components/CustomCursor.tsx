/** Custom cursor: immediate accent dot + ring, desktop only (CSS hides on touch). */
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setDot({ x: e.clientX, y: e.clientY });
      // Keep the ring in lockstep with the pointer—no trailing timeout.
      setRing({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
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
