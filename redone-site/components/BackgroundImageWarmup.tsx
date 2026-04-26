'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { scheduleFullPoolIfNotHome } from '@/lib/prefetchSiteImages';

/**
 * When there is no home `GalleryWall` run (direct visit to /books, etc.), warm
 * the image pool once after idle so subpages still benefit from cache.
 */
export default function BackgroundImageWarmup() {
  const pathname = usePathname();
  const ran = useRef(false);

  useEffect(() => {
    if (pathname === '/' || ran.current) return;
    ran.current = true;
    scheduleFullPoolIfNotHome();
  }, [pathname]);

  return null;
}
