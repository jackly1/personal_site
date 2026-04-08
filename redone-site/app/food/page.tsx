import { readdirSync } from 'fs';
import { join } from 'path';
import FoodPhotoGrid from '@/components/FoodPhotoGrid';
import { chunkIntoRows, circularRowCounts } from '@/lib/foodGrid';

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;

/** Shown on the interests tile only — not rendered on this page. */
const FOOD_COVER = '/static/food/food.png';

function listFoodImageSrcs(): string[] {
  const dir = join(process.cwd(), 'public/static/food');
  const names = readdirSync(dir, { withFileTypes: true })
    .filter(
      (e) =>
        e.isFile() &&
        !e.name.startsWith('.') &&
        IMAGE_EXT.test(e.name),
    )
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'en'));
  return names.map((n) => `/static/food/${n}`);
}

export default function FoodPage() {
  const gridSrcs = listFoodImageSrcs().filter((src) => src !== FOOD_COVER);
  const rowCounts = circularRowCounts(gridSrcs.length);
  const rows = chunkIntoRows(gridSrcs, rowCounts);

  return (
    <main className="flex h-[calc(100dvh-9rem)] min-h-0 flex-col overflow-hidden sm:h-[calc(100dvh-8.5rem)] xl:h-[calc(100dvh-6.5rem)]">
      <div className="flex min-h-0 flex-1 flex-col px-6 pb-6 pt-8 md:px-12 md:pb-8 md:pt-12">
        <div className="flex min-h-0 flex-1 flex-col gap-6 md:flex-row md:items-stretch md:gap-8 lg:gap-10">
          {/*
            ~3/4 of prior widths (22rem → 16.5rem, 28rem → 21rem).
            Grid fills remaining width and height to the padded viewport bottom (no page scroll).
          */}
          <div className="w-full shrink-0 md:max-w-[16.5rem] lg:max-w-[21rem]">
            <h2 className="mb-3 text-2xl font-bold text-neutral-800 md:mb-4">
              Food
            </h2>
            <div className="space-y-4 leading-relaxed text-neutral-600 md:space-y-5">
              <p>
                For two summers I worked at Ernesto&apos;s, a Basque restaurant
                where I first ran a concession stand outdoors that sold summer
                treats, and later worked as a runner/server. The job was easy to
                fall in love with, the people, the role, the environment, but most
                of all was the food. Since working there, I have developed a real
                love for cooking.
              </p>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <FoodPhotoGrid rows={rows} />
          </div>
        </div>
      </div>
    </main>
  );
}
