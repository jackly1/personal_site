import Image from 'next/image';

/** Scales images down with `object-contain` (no cropping); `sizes` is approximate for the optimizer. */
const FOOD_IMAGE_SIZES =
  '(max-width: 640px) 42vw, (max-width: 1024px) 22vw, (max-width: 1536px) 18vw, 240px';

type Props = {
  rows: string[][];
  /** Extra classes for the outer wrapper (e.g. alignment on the food page). */
  className?: string;
};

/**
 * Rows share the parent height equally (viewport-bound food page) so the grid
 * bottom aligns with the visible window without page scroll.
 */
export default function FoodPhotoGrid({ rows, className = '' }: Props) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-1 flex-col gap-1.5 md:gap-2 ${className}`}
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="grid min-h-0 w-full flex-1 basis-0 gap-1.5 md:gap-2"
          style={{
            gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
          }}
        >
          {row.map((src) => (
            <div
              key={src}
              className="relative min-h-0 h-full w-full overflow-hidden rounded-sm bg-neutral-100"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={FOOD_IMAGE_SIZES}
                quality={65}
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
