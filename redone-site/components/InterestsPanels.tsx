'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { GalleryImage } from '@/data/images';
import { bookImages, filmImages } from '@/data/images';

function pick<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function InterestsPanels() {
  const [film, setFilm] = useState<GalleryImage | null>(null);
  const [book, setBook] = useState<GalleryImage | null>(null);

  useEffect(() => {
    setFilm(pick(filmImages) ?? null);
    setBook(pick(bookImages) ?? null);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col md:flex-row">
      <Link
        href="/films"
        className="group flex min-h-0 flex-[1.35] flex-col items-center justify-center px-4 py-3 transition-colors hover:bg-neutral-50 md:py-4"
      >
        <span className="mb-2 shrink-0 text-xl font-bold text-neutral-900 md:text-2xl">
          Film
        </span>
        {film ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={film.src}
            alt={film.alt || 'Film still'}
            className="max-h-[min(34vh,36dvh)] w-full max-w-[min(92vw,56rem)] object-contain md:max-h-[min(48vh,52dvh)]"
          />
        ) : (
          <div className="h-32 w-full max-w-md animate-pulse bg-neutral-100" />
        )}
      </Link>

      <Link
        href="/books"
        className="group flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-3 transition-colors hover:bg-neutral-50 md:py-4"
      >
        <span className="mb-2 shrink-0 text-xl font-bold text-neutral-900 md:text-2xl">
          Books
        </span>
        {book ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={book.src}
            alt={book.alt || 'Book cover'}
            className="max-h-[min(38vh,40dvh)] w-full max-w-[min(80vw,19rem)] object-contain md:max-h-[min(46vh,48dvh)] md:max-w-[min(32vw,22rem)]"
          />
        ) : (
          <div className="h-24 w-32 animate-pulse bg-neutral-100" />
        )}
      </Link>
    </div>
  );
}
