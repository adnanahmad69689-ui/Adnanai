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
    let revealIndex = 0;
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
    const observeItem = (item: HTMLElement) => {
      if (item.classList.contains("reveal-managed") || item.classList.contains("is-revealed")) return;
      item.classList.add("reveal-managed");
      item.style.setProperty("--reveal-delay", `${Math.min(revealIndex, 8) * stagger}s`);
      revealIndex += 1;
      observer.observe(item);
    };

    items.forEach(observeItem);
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".reveal-item")) observeItem(node);
          node.querySelectorAll<HTMLElement>(".reveal-item").forEach(observeItem);
        });
      }
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [stagger]);

  return ref;
}
