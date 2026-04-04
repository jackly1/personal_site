'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { imagePool } from '@/data/images';

const MOLLY_SRC = '/static/self/molly_pic_1.JPEG';

/** All `self` images from the image pool (synced from `public/static/self`), minus `omitFromGallery`. Molly first. */
const PHOTOS: readonly string[] = (() => {
  const selfs = imagePool
    .filter((i) => i.type === 'self' && !i.omitFromGallery)
    .map((i) => i.src);
  const rest = selfs.filter((s) => s !== MOLLY_SRC).sort();
  return selfs.includes(MOLLY_SRC) ? [MOLLY_SRC, ...rest] : [...selfs].sort();
})();

const INTERVAL_MS = 900;

/** Frame width cap (px). */
const MAX_IMG_WIDTH_PX = 400;

/** Extra vertical offset from the frame center (px). Positive = down, negative = up. */
const IMG_TRANSLATE_Y_PX = 0;

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

  if (PHOTOS.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full justify-center">
      <div
        className="relative h-[min(38vh,320px)] bg-neutral-50 md:h-[min(60vh,520px)]"
        style={{
          width: `min(100%, ${MAX_IMG_WIDTH_PX}px)`,
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
