'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { GalleryImage } from '@/data/images';
import { ImageMasonry } from '@/components/ImageMasonry';

export type GallerySortMode = 'random' | 'alpha' | 'ranked';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** A–Z / tie-break: prefer full `title` from gallery-notes, then alt, then path. */
function alphaSortKey(item: GalleryImage): string {
  const t = item.title?.trim();
  if (t) return t;
  return (item.alt || item.src).trim();
}

function labelKey(item: GalleryImage): string {
  return alphaSortKey(item);
}

/** Coerce JSON / runtime rank to a finite number for sorting (handles string "10", etc.). */
function rankValue(rank: unknown): number | null {
  if (rank === null || rank === undefined) return null;
  if (typeof rank === 'number' && Number.isFinite(rank)) return rank;
  if (typeof rank === 'string' && rank.trim() !== '') {
    const n = Number(rank);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function sortForMode(items: GalleryImage[], mode: GallerySortMode): GalleryImage[] {
  const copy = [...items];
  if (mode === 'alpha') {
    return copy.sort((a, b) =>
      alphaSortKey(a).localeCompare(alphaSortKey(b), 'en', { sensitivity: 'base' })
    );
  }
  if (mode === 'ranked') {
    return copy.sort((a, b) => {
      const ra = rankValue(a.rank);
      const rb = rankValue(b.rank);
      const ua = ra === null;
      const ub = rb === null;
      if (ua && ub) {
        return labelKey(a).localeCompare(labelKey(b), 'en', { sensitivity: 'base' });
      }
      if (ua) return 1;
      if (ub) return -1;
      if (ra !== rb) return ra - rb;
      return labelKey(a).localeCompare(labelKey(b), 'en', { sensitivity: 'base' });
    });
  }
  return shuffle(copy);
}

const linkClass =
  'text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800';

export function GalleryWithSort({
  title,
  items,
  imageAlt,
  /** Optional link shown to the right of sort controls (e.g. Goodreads, Letterboxd). */
  headerLink,
  footer,
  /** When true, title + notes appear in a side popover (books + films). */
  detailHover = false,
}: {
  title: string;
  items: GalleryImage[];
  imageAlt: string;
  headerLink?: { href: string; label: string };
  footer?: ReactNode;
  detailHover?: boolean;
}) {
  const [sortMode, setSortMode] = useState<GallerySortMode>('random');
  const [randomVersion, setRandomVersion] = useState(0);

  const sortedItems = useMemo(() => {
    if (sortMode !== 'random') {
      return sortForMode(items, sortMode);
    }
    return sortForMode(items, 'random');
  }, [items, sortMode, randomVersion]);

  const handleSort = useCallback((mode: GallerySortMode) => {
    setSortMode(mode);
    if (mode === 'random') {
      setRandomVersion((v) => v + 1);
    }
  }, []);

  const masonryItems = useMemo(
    () =>
      sortedItems.map((i) => ({
        id: i.id,
        src: i.src,
        alt: i.alt,
        title: i.title?.trim() ? i.title : undefined,
        notes: i.notes?.trim() ? i.notes : undefined,
        hoverDetails: detailHover,
      })),
    [sortedItems, detailHover]
  );

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="px-6 pb-20 pt-10 md:px-12 md:pt-12">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:gap-4">
          <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div
              className="flex flex-wrap items-center gap-1 text-sm text-neutral-600"
              role="group"
              aria-label="Sort order"
            >
              {(
                [
                  ['random', 'Random'],
                  ['alpha', 'A–Z'],
                  ['ranked', 'Ranked'],
                ] as const
              ).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleSort(mode)}
                  className={`rounded px-2 py-1 transition-colors ${
                    sortMode === mode
                      ? 'bg-neutral-200 text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {headerLink ? (
              <a
                href={headerLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {headerLink.label}
              </a>
            ) : null}
          </div>
        </div>

        <ImageMasonry
          items={masonryItems}
          imageAlt={imageAlt}
          layoutMode={sortMode === 'random' ? 'masonry' : 'ordered'}
        />

        {footer ? <div className="mt-12">{footer}</div> : null}
      </div>
    </main>
  );
}
