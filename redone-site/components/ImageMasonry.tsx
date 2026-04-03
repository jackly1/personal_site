'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const GAP_PX = 6;
/** Reserved height below the image when `notes` is set (layout + short caption). */
const NOTES_BLOCK_PX = 52;

export type MasonryItem = {
  id: number;
  src: string;
  alt?: string;
  /** Full display title (e.g. book). Shown in hover panel when `hoverDetails` is set. */
  title?: string;
  notes?: string;
  /**
   * When true, title + notes show in a side popover (right of cover, or left if
   * the tile is in the rightmost column). Otherwise notes render under the image.
   */
  hoverDetails?: boolean;
};

function colsForWidth(w: number): number {
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
}

type Size = { w: number; h: number };

function computeLayout(
  items: MasonryItem[],
  sizes: Record<number, Size>,
  containerWidth: number,
  gap: number
): {
  positions: {
    left: number;
    top: number;
    width: number;
    height: number;
    imgHeight: number;
    notesExtra: number;
    /** 0-based column index; used to place hover popover left vs right. */
    colIndex: number;
  }[];
  totalHeight: number;
  columnCount: number;
} | null {
  if (containerWidth <= 0 || items.length === 0) return null;
  if (!items.every((it) => sizes[it.id]?.w && sizes[it.id]?.h)) return null;

  const cols = colsForWidth(containerWidth);
  const columnWidth = (containerWidth - gap * (cols - 1)) / cols;
  const columnHeights = Array.from({ length: cols }, () => 0);
  const positions: {
    left: number;
    top: number;
    width: number;
    height: number;
    imgHeight: number;
    notesExtra: number;
    colIndex: number;
  }[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const s = sizes[item.id]!;
    const imgHeight = (s.h / s.w) * columnWidth;
    const inlineCaption =
      item.notes && !item.hoverDetails ? NOTES_BLOCK_PX : 0;
    const notesExtra = inlineCaption;
    const height = imgHeight + notesExtra;

    let bestCol = 0;
    let bestH = columnHeights[0];
    for (let c = 1; c < cols; c++) {
      if (columnHeights[c] < bestH) {
        bestH = columnHeights[c];
        bestCol = c;
      }
    }

    const left = bestCol * (columnWidth + gap);
    const top = columnHeights[bestCol];
    columnHeights[bestCol] += height + gap;

    positions[i] = { left, top, width: columnWidth, height, imgHeight, notesExtra, colIndex: bestCol };
  }

  const totalHeight = Math.max(...columnHeights, 0) - gap;
  return {
    positions,
    totalHeight: Math.max(0, totalHeight),
    columnCount: cols,
  };
}

function hasHoverPanel(item: MasonryItem): boolean {
  return Boolean(
    item.hoverDetails &&
      (item.title?.trim() || item.notes?.trim())
  );
}

function tilePopoverClasses(popoverOnLeft: boolean) {
  const sideDesktop = popoverOnLeft
    ? 'md:left-auto md:right-full md:mr-2 md:translate-x-2 md:group-hover/item:translate-x-0 md:group-focus-within/item:translate-x-0'
    : 'md:left-full md:right-auto md:ml-2 md:-translate-x-2 md:group-hover/item:translate-x-0 md:group-focus-within/item:translate-x-0';
  /**
   * Inside image frame: mobile = full-bleed overlay (matches image width + height);
   * md+ = side panel (parent uses overflow-hidden md:overflow-visible).
   */
  /** overflow-y only when open — avoids nested scroll traps that eat the first page scroll on touch */
  return `pointer-events-none absolute inset-0 z-30 min-h-0 w-full overflow-x-hidden overflow-y-hidden rounded-sm border border-neutral-200/45 bg-white/90 px-2.5 py-2 text-left text-xs shadow-sm [overflow-wrap:anywhere] [word-break:break-word] opacity-0 transition-[opacity,transform] duration-200 group-hover/item:pointer-events-auto group-hover/item:overflow-y-auto group-hover/item:opacity-100 group-focus-within/item:pointer-events-auto group-focus-within/item:overflow-y-auto group-focus-within/item:opacity-100 md:inset-auto md:top-0 md:h-auto md:min-h-0 md:w-[min(17rem,calc(100vw-2rem))] md:max-h-[min(72vh,22rem)] md:rounded-md md:border md:border-neutral-200 md:bg-white md:px-3 md:py-2.5 md:shadow-lg md:shadow-neutral-900/10 ${sideDesktop}`;
}

export function ImageMasonry({
  items,
  imageAlt,
  layoutMode = 'masonry',
}: {
  items: MasonryItem[];
  imageAlt: string;
  /** Masonry packs into columns (order not preserved). Ordered grid keeps sort order (use for A–Z / Ranked). */
  layoutMode?: 'masonry' | 'ordered';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sizes, setSizes] = useState<Record<number, Size>>({});

  useEffect(() => {
    setSizes({});
    let cancelled = false;
    items.forEach((item) => {
      const im = new Image();
      im.onload = () => {
        if (cancelled) return;
        const w = im.naturalWidth;
        const h = im.naturalHeight;
        if (w > 0 && h > 0) {
          setSizes((prev) => ({ ...prev, [item.id]: { w, h } }));
        }
      };
      im.onerror = () => {
        if (cancelled) return;
        setSizes((prev) => ({ ...prev, [item.id]: { w: 3, h: 4 } }));
      };
      im.src = item.src;
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const onResize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.offsetWidth);
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => onResize());
    ro.observe(el);
    onResize();
    return () => ro.disconnect();
  }, [onResize]);

  const layout = useMemo(
    () => computeLayout(items, sizes, containerWidth, GAP_PX),
    [items, sizes, containerWidth]
  );

  const masonryReady =
    layout !== null && layout.positions.length === items.length && items.length > 0;

  const orderedCols = containerWidth > 0 ? colsForWidth(containerWidth) : 2;
  const orderedReady = layoutMode === 'ordered' && items.length > 0 && containerWidth > 0;

  if (items.length === 0) {
    return <div className="w-full min-w-0" />;
  }

  if (layoutMode === 'ordered') {
    /** Equal column width including gaps; used with flex-wrap (not grid) so align-items:center vertically centers shorter tiles in each row. */
    const orderedItemBasis =
      orderedCols > 0
        ? `calc((100% - ${GAP_PX * (orderedCols - 1)}px) / ${orderedCols})`
        : '100%';

    return (
      <div ref={containerRef} className="w-full min-w-0">
        {!orderedReady ? (
          <div className="min-h-[120px] w-full" aria-busy="true" aria-label="Loading gallery" />
        ) : (
          <ul
            className="m-0 flex list-none flex-wrap items-center p-0"
            style={{
              gap: GAP_PX,
            }}
          >
            {items.map((item, i) => {
              const showHover = hasHoverPanel(item);
              const popoverOnLeft = orderedCols > 1 && i % orderedCols >= orderedCols - 1;
              const notesExtra =
                item.notes && !item.hoverDetails ? NOTES_BLOCK_PX : 0;
              return (
                <li
                  key={item.id}
                  tabIndex={showHover ? 0 : undefined}
                  className={`group/item relative flex min-h-0 min-w-0 flex-col outline-none ring-offset-2 focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                    showHover ? 'overflow-visible hover:z-30' : 'overflow-hidden'
                  }`}
                  style={{
                    flex: `0 0 ${orderedItemBasis}`,
                    maxWidth: orderedItemBasis,
                  }}
                >
                  <div
                    className={`relative flex w-full min-h-0 items-center justify-center ${
                      showHover ? 'overflow-hidden md:overflow-visible' : 'overflow-hidden'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt || imageAlt}
                      className="mx-auto block h-auto max-h-[min(42vh,300px)] w-auto max-w-full object-contain object-center"
                      loading="lazy"
                      decoding="async"
                    />
                    {showHover ? (
                      <div className={tilePopoverClasses(popoverOnLeft)}>
                        {item.title?.trim() ? (
                          <h3 className="mb-1.5 border-b border-neutral-400/35 pb-1.5 text-[11px] font-semibold leading-snug text-neutral-900 md:mb-2 md:border-neutral-200 md:pb-2 md:text-sm">
                            {item.title.trim()}
                          </h3>
                        ) : null}
                        {item.notes?.trim() ? (
                          <p className="m-0 text-[11px] leading-relaxed text-neutral-800 [text-wrap:pretty] md:text-[13px] md:text-neutral-700">
                            {item.notes.trim()}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  {item.notes && !item.hoverDetails ? (
                    <p
                      className="m-0 box-border w-full shrink-0 px-0.5 pb-0.5 pt-1 text-left text-[11px] leading-snug text-neutral-600"
                      style={{ minHeight: notesExtra }}
                    >
                      {item.notes}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full min-w-0">
      {!masonryReady ? (
        <div className="min-h-[120px] w-full" aria-busy="true" aria-label="Loading gallery" />
      ) : (
        <ul
          className="relative m-0 list-none p-0"
          style={{ height: layout!.totalHeight }}
        >
          {items.map((item, i) => {
            const pos = layout!.positions[i];
            const showHover = hasHoverPanel(item);
            const cols = layout!.columnCount;
            const popoverOnLeft = cols > 1 && pos.colIndex >= cols - 1;
            return (
              <li
                key={item.id}
                tabIndex={showHover ? 0 : undefined}
                className={`group/item absolute flex flex-col outline-none ring-offset-2 focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                  showHover ? 'overflow-visible hover:z-30' : 'overflow-hidden'
                }`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: pos.width,
                  height: pos.height,
                }}
              >
                <div
                  className={`relative min-h-0 w-full shrink-0 ${
                    showHover ? 'overflow-hidden md:overflow-visible' : 'overflow-hidden'
                  }`}
                  style={{ height: pos.imgHeight }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt || imageAlt}
                    className="block h-full w-full object-contain object-top"
                    loading="lazy"
                    decoding="async"
                  />
                  {showHover ? (
                    <div className={tilePopoverClasses(popoverOnLeft)}>
                      {item.title?.trim() ? (
                        <h3 className="mb-1.5 border-b border-neutral-400/35 pb-1.5 text-[11px] font-semibold leading-snug text-neutral-900 md:mb-2 md:border-neutral-200 md:pb-2 md:text-sm">
                          {item.title.trim()}
                        </h3>
                      ) : null}
                      {item.notes?.trim() ? (
                        <p className="m-0 text-[11px] leading-relaxed text-neutral-800 [text-wrap:pretty] md:text-[13px] md:text-neutral-700">
                          {item.notes.trim()}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                {item.notes && !item.hoverDetails ? (
                  <p
                    className="m-0 box-border w-full shrink-0 px-0.5 pb-0.5 pt-1 text-left text-[11px] leading-snug text-neutral-600"
                    style={{ minHeight: pos.notesExtra }}
                  >
                    {item.notes}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
