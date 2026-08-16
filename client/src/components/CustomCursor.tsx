/** GPU-friendly desktop cursor: direct DOM updates avoid React re-renders on mousemove. */
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const initialStyle = { transform: "translate3d(-100px, -100px, 0)" };
  return <><div ref={dotRef} className="custom-cursor" style={initialStyle} /><div ref={ringRef} className="custom-cursor-ring" style={initialStyle} /></>;
}
