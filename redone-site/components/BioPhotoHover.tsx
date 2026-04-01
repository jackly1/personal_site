'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Always starts on Molly; cycles the other self shots on hover (no headshot). */
const PHOTOS = [
  '/static/self/molly_pic_1.JPEG',
  '/static/self/bitts_pic.JPG',
  '/static/self/dog_pic.jpeg',
  '/static/self/tube.JPG',
] as const;

const INTERVAL_MS = 900;

/** Max width of the photo column (px cap in `min(100%, …)`). Raise to show a wider image. */
const MAX_IMG_WIDTH_PX = 400;
/** Max height: viewport share and px cap. Raise `vh` or second number for a taller image. */
const MAX_IMG_HEIGHT = 'min(60vh,520px)';

/** Vertical nudge for the photo (px). Negative = up, positive = down. */
const IMG_TRANSLATE_Y_PX = -50;

export default function BioPhotoHover() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleEnter = () => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % PHOTOS.length);
    }, INTERVAL_MS);
  };

  const handleLeave = () => {
    clearTimer();
    setIdx(0);
  };

  useEffect(() => () => clearTimer(), [clearTimer]);

  return (
    <div className="flex w-full justify-center">
      <div
        className="w-full bg-neutral-50"
        style={{ maxWidth: `min(100%, ${MAX_IMG_WIDTH_PX}px)` }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Full image always visible: object-contain + max dimensions, no overflow clip or fixed box height */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={PHOTOS[idx]}
          src={PHOTOS[idx]}
          alt=""
          className="h-auto w-full object-contain"
          style={{
            maxHeight: MAX_IMG_HEIGHT,
            transform: `translateY(${IMG_TRANSLATE_Y_PX}px)`,
          }}
        />
      </div>
    </div>
  );
}
