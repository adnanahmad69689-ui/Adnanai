/**
 * Scroll-reveal hook: animates all `.reveal-item` descendants into view with
 * a stagger, once, when they cross 88% of the viewport. Mirrors the reference
 * site's GSAP batch reveal. Respects prefers-reduced-motion.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal<T extends HTMLElement>(options: {
  stagger?: number;
  y?: number;
  duration?: number;
} = {}) {
  const { stagger = 0.12, y = 40, duration = 0.75 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".reveal-item");
    if (!items.length) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reducedMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { reducedMotion } = ctx.conditions as { reducedMotion: boolean };
        if (reducedMotion) {
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap.set(items, { opacity: 0, y });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration,
              ease: "power3.out",
              stagger,
            });
          },
        });
      }
    );

    return () => {
      mm.revert();
    };
  }, [stagger, y, duration]);

  return ref;
}
