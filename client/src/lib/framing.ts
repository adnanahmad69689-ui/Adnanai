/**
 * Image framing values and the style that renders them.
 *
 * Deliberately kept free of any UI imports: the public site pulls this in, and
 * co-locating it with the admin editor dragged the whole button component into
 * the visitor-facing bundle.
 */

export type Framing = { focalX: number; focalY: number; zoom: number };

export const DEFAULT_FRAMING: Framing = { focalX: 50, focalY: 50, zoom: 1 };

/** Reproduces a saved framing wherever the image is rendered. */
export function framingStyle(framing: Framing | null | undefined) {
  const { focalX, focalY, zoom } = framing ?? DEFAULT_FRAMING;
  return {
    objectFit: "cover" as const,
    objectPosition: `${focalX}% ${focalY}%`,
    transform: zoom === 1 ? undefined : `scale(${zoom})`,
    transformOrigin: `${focalX}% ${focalY}%`,
  };
}
