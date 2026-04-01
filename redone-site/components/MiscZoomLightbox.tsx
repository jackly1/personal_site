'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const WHEEL_STEP = 0.12;

type Props = {
  src: string;
  open: boolean;
  overlayOpen: boolean;
  onClose: () => void;
};

export function MiscZoomLightbox({ src, open, overlayOpen, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const draggingRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setScale(1);
      setTx(0);
      setTy(0);
      draggingRef.current = false;
      setDragging(false);
    }
  }, [open, src]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !open) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => {
        const next = Math.min(
          MAX_SCALE,
          Math.max(MIN_SCALE, s + (e.deltaY < 0 ? WHEEL_STEP : -WHEEL_STEP))
        );
        if (next <= MIN_SCALE + 0.01) {
          setTx(0);
          setTy(0);
        }
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (scale <= MIN_SCALE + 0.001) return;
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      draggingRef.current = true;
      setDragging(true);
      dragRef.current = { x: e.clientX, y: e.clientY, tx, ty };
    },
    [scale, tx, ty]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const d = dragRef.current;
    setTx(d.tx + (e.clientX - d.x));
    setTy(d.ty + (e.clientY - d.y));
  }, []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex min-h-[min(400px,60vh)] flex-col md:min-h-[min(480px,65vh)]"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`absolute left-3 top-0 z-20 flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white/95 text-lg leading-none text-neutral-700 shadow-md transition-opacity duration-300 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 md:left-4 ${
          overlayOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close enlarged image"
      >
        ×
      </button>

      <div
        className={`absolute inset-0 z-0 bg-neutral-950/82 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          overlayOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-14 md:px-10 md:py-16">
        <div
          ref={viewportRef}
          className="pointer-events-auto relative max-h-[min(85vh,88dvh)] w-full max-w-[min(96vw,72rem)] overflow-hidden rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            role="presentation"
            className={`flex h-[min(85vh,88dvh)] w-full items-center justify-center ${
              scale > MIN_SCALE + 0.01 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
            }`}
            style={{ touchAction: 'none' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: dragging ? 'none' : 'transform 0.08s ease-out',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className={`max-h-[min(85vh,88dvh)] w-auto max-w-none select-none object-contain transition-opacity duration-300 ease-out ${
                  overlayOpen ? 'opacity-100' : 'opacity-0'
                }`}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
