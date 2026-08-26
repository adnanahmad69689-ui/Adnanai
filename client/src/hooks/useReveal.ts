/** Native scroll reveals with one IntersectionObserver and CSS transitions. */
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(options: { stagger?: number } = {}) {
  const { stagger = 0.06 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal-item"));
    if (!items.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 768px)").matches;
    if (reducedMotion || compactViewport || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-revealed"));
      return;
    }
    items.forEach((item, index) => {
      item.classList.add("reveal-managed");
      item.style.setProperty("--reveal-delay", `${Math.min(index, 8) * stagger}s`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}
