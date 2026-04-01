'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const GAP_PX = 6;

export type MasonryItem = {
  id: number;
  src: string;
  alt?: string;
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
): { positions: { left: number; top: number; width: number; height: number }[]; totalHeight: number } | null {
  if (containerWidth <= 0 || items.length === 0) return null;
  if (!items.every((it) => sizes[it.id]?.w && sizes[it.id]?.h)) return null;

  const cols = colsForWidth(containerWidth);
  const columnWidth = (containerWidth - gap * (cols - 1)) / cols;
  const columnHeights = Array.from({ length: cols }, () => 0);
  const positions: { left: number; top: number; width: number; height: number }[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const s = sizes[item.id]!;
    const height = (s.h / s.w) * columnWidth;

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

    positions[i] = { left, top, width: columnWidth, height };
  }

  const totalHeight = Math.max(...columnHeights, 0) - gap;
  return { positions, totalHeight: Math.max(0, totalHeight) };
}

export function ImageMasonry({ items, imageAlt }: { items: MasonryItem[]; imageAlt: string }) {
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

  const ready =
    layout !== null && layout.positions.length === items.length && items.length > 0;

  if (items.length === 0) {
    return <div className="w-full min-w-0" />;
  }

  return (
    <div ref={containerRef} className="w-full min-w-0">
      {!ready ? (
        <div className="min-h-[120px] w-full" aria-busy="true" aria-label="Loading gallery" />
      ) : (
        <ul
          className="relative m-0 list-none p-0"
          style={{ height: layout!.totalHeight }}
        >
          {items.map((item, i) => {
            const pos = layout!.positions[i];
            return (
              <li
                key={item.id}
                className="absolute overflow-hidden bg-neutral-100"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: pos.width,
                  height: pos.height,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt || imageAlt}
                  className="block h-full w-full object-contain object-top"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
