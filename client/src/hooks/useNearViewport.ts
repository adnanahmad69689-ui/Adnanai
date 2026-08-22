import { useEffect, useState, type RefObject } from "react";

/** Starts non-critical work only when its sentinel begins entering the viewport. */
export function useNearViewport<T extends Element>(ref: RefObject<T | null>) {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNear) return;
    if (!("IntersectionObserver" in window)) {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNear, ref]);

  return isNear;
}
