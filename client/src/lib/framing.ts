/**
 * Image framing values and the style that renders them.
 *
 * Deliberately kept free of any UI imports: the public site pulls this in, and
 * co-locating it with the admin editor dragged the whole button component into
 * the visitor-facing bundle.
 */

export type Framing = { focalX: number; focalY: number; zoom: number };

export const DEFAULT_FRAMING: Framing = { focalX: 50, focalY: 50, zoom: 1 };

/**
 * True when a framing carries no owner intent.
 *
 * This matters because applying the default inline still overrides whatever
 * object-position the stylesheet set for that image. Doing so silently changed
 * the hero composition, so callers skip the inline style entirely until the
 * owner has actually chosen a crop.
 */
export function isDefaultFraming(framing: Framing | null | undefined) {
  if (!framing) return true;
  return framing.focalX === DEFAULT_FRAMING.focalX
    && framing.focalY === DEFAULT_FRAMING.focalY
    && framing.zoom === DEFAULT_FRAMING.zoom;
}

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
