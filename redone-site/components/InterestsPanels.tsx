'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { GalleryImage } from '@/data/images';
import { bookImages, filmImages } from '@/data/images';

function pick<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

const FOOD_IMG = '/static/food/food.png';
const MUSIC_IMG = '/static/misc/IMG_1070.jpg';

/**
 * Half of (viewport − header) minus label/padding. Header ~7.5rem desktop,
 * taller on small screens — use extra slack on narrow viewports.
 */
const quadrantImg =
  'max-h-[calc((100dvh-10rem)/2-2.25rem)] w-full object-contain min-h-0 md:max-h-[calc((100dvh-7.5rem)/2-2.25rem)]';

export default function InterestsPanels() {
  const [film, setFilm] = useState<GalleryImage | null>(null);
  const [book, setBook] = useState<GalleryImage | null>(null);

  useEffect(() => {
    setFilm(pick(filmImages) ?? null);
    setBook(pick(bookImages) ?? null);
  }, []);

  const cell =
    'group flex min-h-0 flex-col items-center justify-center overflow-hidden bg-[#fafafa] px-3 py-2 transition-colors hover:bg-neutral-50';

  return (
    <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] bg-[#fafafa]">
      <Link href="/films" className={cell}>
        <span className="mb-1 shrink-0 text-lg font-bold text-neutral-900 md:text-xl">
          Film
        </span>
        {film ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={film.src}
            alt={film.alt || 'Film still'}
            className={`${quadrantImg} max-w-[min(46vw,28rem)]`}
          />
        ) : (
          <div className="h-16 w-full max-w-md animate-pulse bg-neutral-100" />
        )}
      </Link>

      <Link href="/books" className={cell}>
        <span className="mb-1 shrink-0 text-lg font-bold text-neutral-900 md:text-xl">
          Books
        </span>
        {book ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={book.src}
            alt={book.alt || 'Book cover'}
            className={`${quadrantImg} max-w-[min(40vw,14rem)] md:max-w-[min(28vw,18rem)]`}
          />
        ) : (
          <div className="h-16 w-24 animate-pulse bg-neutral-100" />
        )}
      </Link>

      <Link href="/food" className={cell}>
        <span className="mb-1 shrink-0 text-lg font-bold text-neutral-900 md:text-xl">
          Food
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOOD_IMG}
          alt="Food"
          className={`${quadrantImg} max-w-[min(46vw,22rem)]`}
        />
      </Link>

      <Link href="/music" className={cell}>
        <span className="mb-1 shrink-0 text-lg font-bold text-neutral-900 md:text-xl">
          Music
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MUSIC_IMG}
          alt="Music"
          className={`${quadrantImg} max-w-[min(46vw,22rem)]`}
        />
      </Link>
    </div>
  );
}
