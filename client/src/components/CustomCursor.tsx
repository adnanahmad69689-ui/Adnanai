/** Raw-pointer cursor: direct high-frequency updates with the original dot-and-ring appearance. */
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (event: Event) => {
      const { clientX, clientY } = event as PointerEvent;
      const transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
    };
    const eventName = "onpointerrawupdate" in window ? "pointerrawupdate" : "pointermove";
    window.addEventListener(eventName, onMove, { passive: true });
    return () => window.removeEventListener(eventName, onMove);
  }, []);

  const initialStyle = { transform: "translate3d(-100px, -100px, 0)" };
  return <><div ref={dotRef} className="custom-cursor" style={initialStyle} /><div ref={ringRef} className="custom-cursor-ring" style={initialStyle} /></>;
}
