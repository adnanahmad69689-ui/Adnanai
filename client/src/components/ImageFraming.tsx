/**
 * Non-destructive image framing control.
 *
 * Drag the preview to choose the focal point, use the slider to zoom. Nothing
 * is re-encoded: the values are stored alongside the image and applied on the
 * public site as object-position plus a scale transform, so the uploaded file
 * keeps its original quality and one framing works at every viewport size.
 */
import { useCallback, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { DEFAULT_FRAMING, framingStyle, type Framing } from "@/lib/framing";

export { DEFAULT_FRAMING, framingStyle };
export type { Framing };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ImageFraming({
  src,
  alt,
  value,
  onChange,
  aspect = "16 / 10",
  label = "Framing",
  hint,
}: {
  src: string;
  alt: string;
  value: Framing;
  onChange: (next: Framing) => void;
  aspect?: string;
  label?: string;
  hint?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  const applyFromPointer = useCallback((clientX: number, clientY: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    onChange({
      ...valueRef.current,
      focalX: Math.round(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)),
      focalY: Math.round(clamp(((clientY - rect.top) / rect.height) * 100, 0, 100)),
    });
  }, [onChange]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      event.preventDefault();
      applyFromPointer(event.clientX, event.clientY);
    };
    const stop = () => { draggingRef.current = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [applyFromPointer]);

  // Arrow keys nudge the focal point, so this is usable without a mouse.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    onChange({
      ...value,
      focalX: clamp(value.focalX + move[0], 0, 100),
      focalY: clamp(value.focalY + move[1], 0, 100),
    });
  };

  const isDefault = value.focalX === 50 && value.focalY === 50 && value.zoom === 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#a8ff3e]">{label}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isDefault}
          onClick={() => onChange({ ...DEFAULT_FRAMING })}
          className="h-7 border-white/15 px-2 text-[10px] uppercase tracking-[0.12em] text-[#d9d9d9] hover:bg-white/5 hover:text-white"
        >
          Reset framing
        </Button>
      </div>

      <div
        ref={frameRef}
        role="application"
        aria-label={`${label}: drag or use arrow keys to choose the focal point`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          draggingRef.current = true;
          (event.target as Element).setPointerCapture?.(event.pointerId);
          applyFromPointer(event.clientX, event.clientY);
        }}
        className="relative w-full cursor-move overflow-hidden border border-white/15 bg-black/40 outline-none focus-visible:border-[#a8ff3e]"
        style={{ aspectRatio: aspect, touchAction: "none" }}
      >
        <img src={src} alt={alt} draggable={false} className="h-full w-full select-none" style={framingStyle(value)} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#a8ff3e] bg-[#a8ff3e]/20"
          style={{ left: `${value.focalX}%`, top: `${value.focalY}%` }}
        />
      </div>

      <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-[#9e9e9e]">
        Zoom
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={value.zoom}
          onChange={(event) => onChange({ ...value, zoom: Number(event.target.value) })}
          className="h-1 flex-1 accent-[#a8ff3e]"
        />
        <span className="w-10 text-right tabular-nums text-[#d9d9d9]">{value.zoom.toFixed(2)}×</span>
      </label>

      <p className="text-xs leading-5 text-[#777]">
        {hint ?? "Drag the preview to move the important part of the image into view. The public site keeps this point centred at every screen size, so nothing important gets cropped out on mobile."}
      </p>
    </div>
  );
}
