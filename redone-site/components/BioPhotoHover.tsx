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

/** Frame width cap (px). */
const MAX_IMG_WIDTH_PX = 400;
/** Fixed frame height — all photos scale inside this box so the center pivot stays put. */
const FRAME_HEIGHT = 'min(60vh,520px)';

/** Extra vertical offset from the frame center (px). Positive = down, negative = up. */
const IMG_TRANSLATE_Y_PX = -60;

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
        className="relative bg-neutral-50"
        style={{
          width: `min(100%, ${MAX_IMG_WIDTH_PX}px)`,
          height: FRAME_HEIGHT,
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={PHOTOS[idx]}
          src={PHOTOS[idx]}
          alt=""
          className="absolute left-1/2 top-1/2 max-h-full max-w-full object-contain"
          style={{
            transform: `translate(-50%, calc(-50% + ${IMG_TRANSLATE_Y_PX}px))`,
          }}
        />
      </div>
    </div>
  );
}
