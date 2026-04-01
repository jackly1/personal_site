'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const WHEEL_STEP = 0.12;
/** Inset from viewport bottom for the image column — avoids sub-pixel overflow scroll. */
const LIGHTBOX_BOTTOM_INSET_PX = 12;

type Props = {
  src: string;
  open: boolean;
  overlayOpen: boolean;
  /** Viewport Y (px) where the main column starts — bottom edge of the “Misc” heading. Image centers below this, to the window bottom. */
  contentTopPx: number;
  onClose: () => void;
};

export function MiscZoomLightbox({
  src,
  open,
  overlayOpen,
  contentTopPx,
  onClose,
}: Props) {
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
    if (!open) return;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

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

  const isZoomed = scale > MIN_SCALE + 0.02;

  /** Fits the full image in view at 1×; accounts for bottom inset + padding so nothing spills past the viewport. */
  const imageMaxHeightPx =
    contentTopPx > 0
      ? `min(calc(100dvh - ${contentTopPx}px - 3rem - ${LIGHTBOX_BOTTOM_INSET_PX}px), 82vh)`
      : 'min(72dvh, 82vh)';

  return (
    <div
      className="fixed inset-0 z-40"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image — click outside the photo to close"
    >
      <div
        className={`absolute inset-0 z-0 bg-neutral-950/82 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          overlayOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Center the image in the main column from below the Misc heading; bottom inset avoids edge overflow / scroll. */}
      <div
        className="pointer-events-none fixed left-0 right-0 z-10 flex min-h-0 flex-col overflow-hidden"
        style={{
          top: contentTopPx,
          bottom: LIGHTBOX_BOTTOM_INSET_PX,
        }}
      >
        <div
          ref={viewportRef}
          className="pointer-events-auto box-border flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-6 py-4 md:px-12 md:py-6"
          onClick={onClose}
        >
          <div
            role="presentation"
            className={`mx-auto flex h-full min-h-0 w-full min-w-0 max-w-5xl flex-col items-center justify-center ${
              isZoomed ? '' : 'cursor-zoom-in'
            }`}
          >
            <div
              data-misc-photo
              className={`flex max-h-full max-w-full min-h-0 min-w-0 items-center justify-center ${
                isZoomed ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''
              }`}
              style={{
                touchAction: 'none',
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                transformOrigin: 'center center',
                // No CSS transition on transform — wheel zoom is discrete; animating transform while
                // layout/overflow used to flip with isZoomed caused a one-frame huge-image glitch.
                transition: 'none',
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className={`box-border block h-auto w-auto max-w-full select-none object-contain transition-opacity duration-300 ease-out ${
                  overlayOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: imageMaxHeightPx }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
