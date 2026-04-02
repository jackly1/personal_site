'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MiscZoomLightbox } from '@/components/MiscZoomLightbox';

const FOOD = '/static/misc/food.png';
const BIKE = '/static/misc/bike.JPG';

type Expanded = 'food' | 'bike' | null;

export default function MiscPage() {
  const [expanded, setExpanded] = useState<Expanded>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const miscHeadingRef = useRef<HTMLHeadingElement>(null);
  const [contentTopPx, setContentTopPx] = useState(0);

  useEffect(() => {
    if (expanded) {
      const id = requestAnimationFrame(() => setOverlayOpen(true));
      return () => cancelAnimationFrame(id);
    }
    setOverlayOpen(false);
  }, [expanded]);

  const close = useCallback(() => {
    setOverlayOpen(false);
    window.setTimeout(() => setExpanded(null), 280);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, close]);

  useLayoutEffect(() => {
    if (!expanded) return;
    const measure = () => {
      const el = miscHeadingRef.current;
      if (!el) return;
      setContentTopPx(Math.round(el.getBoundingClientRect().bottom));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [expanded]);

  const src = expanded === 'food' ? FOOD : expanded === 'bike' ? BIKE : '';

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-8 pt-10 md:px-12 md:pt-18">
        <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col">
          <h2
            ref={miscHeadingRef}
            className={`shrink-0 text-2xl font-bold text-neutral-800 ${
              expanded ? 'mb-0' : 'mb-4 md:mb-5'
            }`}
          >
            Misc
          </h2>

          <div className="min-h-0 flex-1">
            <div
              className={`flex min-h-0 flex-1 flex-col justify-center gap-6 pb-6 transition-opacity duration-300 md:flex-row md:items-start md:gap-8 lg:gap-10 ${
                expanded ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
              aria-hidden={expanded !== null}
            >
              <section className="flex min-h-0 w-full flex-col md:w-[46%] md:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <button
                  type="button"
                  onClick={() => setExpanded('food')}
                  className="group w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                  aria-label="Open food image larger"
                >
                  <img
                    src={FOOD}
                    alt=""
                    className="w-full max-h-[min(32vh,36dvh)] object-contain transition-transform duration-200 group-hover:scale-[1.02] group-active:scale-[0.99] md:max-h-[min(40vh,44dvh)]"
                  />
                </button>
                <p className="mt-3 text-center text-sm leading-relaxed text-neutral-600 md:mt-4">
                  For two summers I worked at Ernesto&apos;s, a Basque restaurant
                  where I first ran a concession stand outdoors that sold summer
                  treats, and later worked as a runner/server. The job was easy to
                  fall in love with, the people, the role, the environment, but
                  most of all was the food. Since working there, I have developed a
                  love for cooking.
                </p>
              </section>

              <section className="flex min-h-0 w-full flex-col-reverse gap-3 md:ml-0 md:flex-col md:gap-0 md:w-[46%] md:max-w-none">
                <p className="mb-0 text-center text-sm leading-relaxed text-neutral-600 md:mb-4">
                  This is my bike. I bought it two years ago when I had
                  covid and needed something to do for a week in the summer. Since
                  then, it has become one of the best purchases I&apos;ve ever made.
                  In the two years it&apos;s been mine: the right brake no longer
                  works, the left one has to be fixed every other week, the seat has
                  been changed, it&apos;s become much rustier than it was here, I
                  trust it much less, and someone randomly broke off the water
                  bottle holder pictured (although they left the rest of the bike
                  untouched). However, even with all this, it is still a lovely
                  bike, and I cherish it.
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <button
                  type="button"
                  onClick={() => setExpanded('bike')}
                  className="group w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                  aria-label="Open bike image larger"
                >
                  <img
                    src={BIKE}
                    alt=""
                    className="w-full max-h-[min(32vh,38dvh)] object-contain transition-transform duration-200 group-hover:scale-[1.02] group-active:scale-[0.99] md:max-h-[min(42vh,44dvh)]"
                  />
                </button>
              </section>
            </div>
          </div>
        </div>

        {expanded ? (
          <MiscZoomLightbox
            src={src}
            open={Boolean(expanded)}
            overlayOpen={overlayOpen}
            contentTopPx={contentTopPx}
            onClose={close}
          />
        ) : null}
      </div>
    </main>
  );
}
