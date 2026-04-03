'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Always starts on Molly; cycles the other self shots (no headshot). */
const PHOTOS = [
  '/static/self/molly_pic_1.JPEG',
  '/static/self/bitts_pic.JPG',
  '/static/self/dog_pic.jpeg',
  '/static/self/tube.JPG',
] as const;

const INTERVAL_MS = 900;

/** Matches Tailwind `md` (768px): below = mobile auto-cycle, md+ = hover to cycle. */
const MOBILE_MAX_WIDTH_PX = 767;

/** Frame width cap (px). */
const MAX_IMG_WIDTH_PX = 400;

/** Extra vertical offset from the frame center (px). Positive = down, negative = up. */
const IMG_TRANSLATE_Y_PX = 0;

export default function BioPhotoHover() {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setIdx((prev) => (prev + 1) % PHOTOS.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    clearTimer();
    if (!isMobile) {
      setIdx(0);
      return;
    }
    setIdx(0);
    timerRef.current = setInterval(tick, INTERVAL_MS);
    return () => clearTimer();
  }, [isMobile, clearTimer, tick]);

  const handleEnter = () => {
    if (isMobile) return;
    clearTimer();
    timerRef.current = setInterval(tick, INTERVAL_MS);
  };

  const handleLeave = () => {
    if (isMobile) return;
    clearTimer();
    setIdx(0);
  };

  useEffect(() => () => clearTimer(), [clearTimer]);

  useEffect(() => {
    PHOTOS.forEach((src) => {
      const im = new Image();
      im.src = src;
    });
  }, []);

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
