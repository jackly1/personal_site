import { imagePool } from '@/data/images';

const EXTRA_STATIC_SRCS = [
  '/static/writing/writing.jpg',
  '/avatar.jpg',
] as const;

/** All gallery-related image URLs (plus a few always-used assets). */
export const allSiteImageSrcs: string[] = Array.from(
  new Set([...imagePool.map((i) => i.src), ...EXTRA_STATIC_SRCS]),
);

const done = new Set<string>();

function whenIdle(run: () => void) {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(
      () => {
        run();
      },
      { timeout: 2500 },
    );
  } else {
    setTimeout(run, 0);
  }
}

function prefetchOne(href: string): Promise<void> {
  if (done.has(href)) return Promise.resolve();
  done.add(href);
  return new Promise((resolve) => {
    const im = new Image();
    if ('fetchPriority' in im) {
      (im as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'low';
    }
    im.onload = () => resolve();
    im.onerror = () => resolve();
    im.src = href;
  });
}

/** Run fetches with limited parallelism so the network stack stays responsive. */
async function runWithConcurrency(
  hrefs: string[],
  concurrency: number,
): Promise<void> {
  if (hrefs.length === 0) return;
  const q = [...hrefs];
  const n = Math.min(Math.max(1, concurrency), q.length);
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (q.length) {
        const href = q.shift();
        if (href) await prefetchOne(href);
      }
    }),
  );
}

/** “Rest of pool after home wall” has been scheduled. */
let homeRestScheduled = false;
/** Full-pool off-route prefetch has been scheduled. */
let fullOffRouteScheduled = false;

/**
 * After the home wall has loaded its selected images, prefetch every other
 * static image in the background (HTTP cache — makes /books, /films, etc. instant).
 */
export function scheduleRestOfPoolAfterHome(homeSrcs: ReadonlySet<string>) {
  if (homeRestScheduled) return;
  if (fullOffRouteScheduled) return; // already warming entire pool
  homeRestScheduled = true;

  const rest = allSiteImageSrcs.filter((src) => !homeSrcs.has(src));
  if (rest.length === 0) return;

  whenIdle(() => {
    void runWithConcurrency(rest, 4);
  });
}

/**
 * If the user lands on a subpage, there is no home wall run — still warm the full
 * set once, after idle, so gallery pages populate from cache.
 */
export function scheduleFullPoolIfNotHome() {
  if (fullOffRouteScheduled) return;
  if (homeRestScheduled) return; // home already started “rest of pool” prefetch
  fullOffRouteScheduled = true;

  const pending = allSiteImageSrcs.filter((s) => !done.has(s));
  if (pending.length === 0) return;

  whenIdle(() => {
    void runWithConcurrency(pending, 4);
  });
}
