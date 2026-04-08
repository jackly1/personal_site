'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { galleryImagePool, type GalleryImage } from '@/data/images';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ROUTES: Record<GalleryImage['type'], string> = {
  project: '/projects',
  misc: '/misc',
  book: '/books',
  film: '/films',
  self: '/bio',
};

const TOTAL = 15;
const COR_WALL = 0.88;
const COR_BODY = 0.82;
const AIR_DAMP = 0.9992;
const SUBSTEPS = 2;
const PAIR_ITERS = 8;
/** Tiny gap after separation so the next frame does not re-detect overlap. */
const SEP_EPS = 0.5;
const GAP_PLACE = 8;

type Tier = 'large' | 'medium' | 'small';

export interface Body {
  key: string;
  image: GalleryImage;
  tier: Tier;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  mass: number;
}

function randomTierCounts(rng: () => number): { s: number; m: number; l: number } {
  for (let t = 0; t < 200; t++) {
    const l = 2 + Math.floor(rng() * 2);
    const m = 3 + Math.floor(rng() * 3);
    const s = TOTAL - l - m;
    if (s >= 6 && s <= 10) return { s, m, l };
  }
  return { s: 8, m: 4, l: 3 };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// const BOOK_SCALE = 0.75;

/** Always included in the gallery “project/misc” slots when present in the pool. */
const REPERTORY_SRC = '/static/projects/repertory.jpg';

/**
 * Books vs films: **films = 2 × books** (3 books + 6 films).
 * Large tier is **self only** (never books). Remaining: self + project + misc (**repertory.nyc** always when available).
 */
function pickGalleryImages(rng: () => number): Array<{ image: GalleryImage; tier: Tier }> {
  const { s, m, l } = randomTierCounts(rng);

  const books = shuffle(
    galleryImagePool.filter((i) => i.type === 'book'),
    rng,
  );
  const films = shuffle(
    galleryImagePool.filter((i) => i.type === 'film'),
    rng,
  );
  const selfs = shuffle(
    galleryImagePool.filter((i) => i.type === 'self'),
    rng,
  );
  const projs = galleryImagePool.filter((i) => i.type === 'project');
  const miscs = galleryImagePool.filter((i) => i.type === 'misc');
  const repertory = galleryImagePool.find((i) => i.src === REPERTORY_SRC);
  const restExtras = shuffle(
    [...projs.filter((i) => i.src !== REPERTORY_SRC), ...miscs],
    rng,
  );

  const numBooks = 3;
  const numFilms = 6;
  const useFiveSelf = rng() < 0.5 && selfs.length >= 5;
  const numSelf = useFiveSelf ? 5 : 4;
  const numExtra = useFiveSelf ? 1 : 2;

  const extras: GalleryImage[] = [];
  if (repertory) extras.push(repertory);
  for (const img of restExtras) {
    if (extras.length >= numExtra) break;
    if (!extras.some((e) => e.id === img.id)) extras.push(img);
  }
  if (extras.length < numExtra) {
    const fallback = shuffle([...projs, ...miscs], rng);
    for (const img of fallback) {
      if (extras.length >= numExtra) break;
      if (!extras.some((e) => e.id === img.id)) extras.push(img);
    }
  }

  if (
    books.length < numBooks ||
    films.length < numFilms ||
    selfs.length < numSelf ||
    extras.length < numExtra
  ) {
    throw new Error('Gallery: image pool too small for book/film/self/project+misc quotas');
  }

  const selected: GalleryImage[] = [
    ...books.slice(0, numBooks),
    ...films.slice(0, numFilms),
    ...selfs.slice(0, numSelf),
    ...extras.slice(0, numExtra),
  ];

  const selectedSelfs = selected.filter((i) => i.type === 'self');
  if (selectedSelfs.length < l) {
    throw new Error('Gallery: not enough self images for large tier');
  }

  const large = shuffle(selectedSelfs, rng).slice(0, l);

  const used = new Set<number>(large.map((x) => x.id));

  const mediumPool = shuffle(
    selected.filter((i) => !used.has(i.id)),
    rng,
  );
  const medium: GalleryImage[] = [];
  for (const img of mediumPool) {
    if (medium.length >= m) break;
    medium.push(img);
    used.add(img.id);
  }

  const small: GalleryImage[] = [];
  for (const img of selected) {
    if (!used.has(img.id)) {
      small.push(img);
      used.add(img.id);
    }
  }

  if (large.length !== l || medium.length !== m || small.length !== s) {
    throw new Error('Gallery: image pick mismatch');
  }

  return [
    ...large.map((image) => ({ image, tier: 'large' as const })),
    ...medium.map((image) => ({ image, tier: 'medium' as const })),
    ...small.map((image) => ({ image, tier: 'small' as const })),
  ];
}

function rectsOverlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
): boolean {
  return ax + aw > bx && bx + bw > ax && ay + ah > by && by + bh > ay;
}

function findSlot(
  w: number,
  h: number,
  vw: number,
  vh: number,
  placed: Array<{ x: number; y: number; w: number; h: number }>,
  rng: () => number,
): { x: number; y: number } | null {
  for (let k = 0; k < 8000; k++) {
    const x = GAP_PLACE + rng() * Math.max(0, vw - w - GAP_PLACE * 2);
    const y = GAP_PLACE + rng() * Math.max(0, vh - h - GAP_PLACE * 2);
    const cand = { x, y, w, h };
    if (
      !placed.some((p) =>
        rectsOverlap(
          cand.x,
          cand.y,
          cand.w,
          cand.h,
          p.x,
          p.y,
          p.w,
          p.h,
        ),
      )
    ) {
      return { x, y };
    }
  }
  const step = 12;
  for (let y = GAP_PLACE; y <= vh - h - GAP_PLACE; y += step) {
    for (let x = GAP_PLACE; x <= vw - w - GAP_PLACE; x += step) {
      const cand = { x, y, w, h };
      if (
        !placed.some((p) =>
          rectsOverlap(
            cand.x,
            cand.y,
            cand.w,
            cand.h,
            p.x,
            p.y,
            p.w,
            p.h,
          ),
        )
      ) {
        return { x, y };
      }
    }
  }
  return null;
}

/** naturalWidth / naturalHeight — used so layout matches photo proportions (no crop). */
const aspectRatioById = new Map<number, number>();

/** Loads dimensions only for the given images (home wall uses 15, not the full pool). */
async function loadImageAspectRatiosForImages(
  images: GalleryImage[],
): Promise<void> {
  const unique = Array.from(new Map(images.map((i) => [i.id, i])).values());
  const missing = unique.filter((i) => !aspectRatioById.has(i.id));
  if (missing.length === 0) return;

  await Promise.all(
    missing.map(
      (entry) =>
        new Promise<void>((resolve) => {
          const im = new Image();
          im.onload = () => {
            const w = im.naturalWidth;
            const h = im.naturalHeight;
            aspectRatioById.set(
              entry.id,
              w > 0 && h > 0 ? w / h : 1,
            );
            resolve();
          };
          im.onerror = () => {
            aspectRatioById.set(entry.id, 1);
            resolve();
          };
          im.src = entry.src;
        }),
    ),
  );
}

/** Film stills in the **small** tier are 1.5× the normal small width. Books use BOOK_SCALE. Large = self only; large scale factor uses rng in [0, 0.2] → 0.75–0.95×. */
function sizeBodyForTier(
  image: GalleryImage,
  tier: Tier,
  rng: () => number,
  aspectWh: number,
  vw: number,
  vh: number,
  scale: number,
): { w: number; h: number } {
  const minDim = Math.min(vw, vh);
  let baseW: number;

  if (tier === 'large') {
    const baseLarge = minDim * (0.22 + rng() * 0.08) * scale;
    const largeT = 0.75 + rng() * 0.2;
    baseW = baseLarge * largeT;
  } else if (tier === 'medium') {
    baseW = minDim * (0.13 + rng() * 0.05) * scale;
  } else {
    baseW = minDim * (0.07 + rng() * 0.04) * scale;
    baseW *= 2;
  }

  if (image.type === 'book') {
    baseW *= 1.05;
  }
  else if (image.type === 'self'){
    baseW *= 2
  }
  else if (image.type === 'film'){
    baseW *= 1.5
  }
  else if (image.type === 'project') {
    baseW *= 2;
  }
  else if (image.type === 'misc'){
    baseW *= 2.5;
  }

  if (image.src === "/static/self/tube.JPG"){
    baseW /= 2.5
  }

  let w = baseW;
  let h = w / aspectWh;

  const maxW = vw * 0.5;
  const maxH = vh * 0.55;
  if (h > maxH) {
    const s = maxH / h;
    w *= s;
    h = maxH;
  }
  if (w > maxW) {
    const s = maxW / w;
    w = maxW;
    h *= s;
  }

  return { w, h };
}

function buildBodies(
  vw: number,
  vh: number,
  rng: () => number,
  aspects: Map<number, number>,
  bodiesMeta?: Array<{ image: GalleryImage; tier: Tier }>,
): Body[] {
  const meta = bodiesMeta ?? pickGalleryImages(rng);

  let scale = 2;
  for (let attempt = 0; attempt < 35; attempt++) {
    const placed: Array<{ x: number; y: number; w: number; h: number }> = [];
    const out: Body[] = [];
    let ok = true;

    for (const { image, tier } of meta) {
      const aspectWh = aspects.get(image.id) ?? 1;
      const { w, h } = sizeBodyForTier(image, tier, rng, aspectWh, vw, vh, scale);
      const pos = findSlot(w, h, vw, vh, placed, rng);
      if (!pos) {
        ok = false;
        break;
      }
      placed.push({ x: pos.x, y: pos.y, w, h });
      const mass = Math.max(1, w * h);
      out.push({
        key: `${image.id}-${tier}-${attempt}`,
        image,
        tier,
        x: pos.x,
        y: pos.y,
        w,
        h,
        vx: (rng() - 0.5) * 36,
        vy: (rng() - 0.5) * 36,
        mass,
      });
    }

    if (ok && out.length === TOTAL) return out;
    scale *= 0.94;
  }

  throw new Error('Gallery: could not pack images in viewport');
}

function resolveWalls(b: Body, vw: number, vh: number) {
  if (b.x < 0) {
    b.x = 0;
    b.vx = -b.vx * COR_WALL;
  }
  if (b.x + b.w > vw) {
    b.x = vw - b.w;
    b.vx = -b.vx * COR_WALL;
  }
  if (b.y < 0) {
    b.y = 0;
    b.vy = -b.vy * COR_WALL;
  }
  if (b.y + b.h > vh) {
    b.y = vh - b.h;
    b.vy = -b.vy * COR_WALL;
  }
}

/**
 * AABB collision: separate along the shallow axis, then apply 1D elastic impulse
 * along that axis so bodies bounce apart (not stack).
 */
function resolvePair(a: Body, b: Body) {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  if (ox <= 0 || oy <= 0) return;

  const total = a.mass + b.mass;
  if (total <= 0) return;

  const ax = a.x + a.w * 0.5;
  const bx = b.x + b.w * 0.5;
  const ay = a.y + a.h * 0.5;
  const by = b.y + b.h * 0.5;

  if (ox < oy) {
    const depth = ox + SEP_EPS;
    if (ax < bx) {
      a.x -= (depth * b.mass) / total;
      b.x += (depth * a.mass) / total;
    } else {
      a.x += (depth * b.mass) / total;
      b.x -= (depth * a.mass) / total;
    }

    const rel = a.vx - b.vx;
    if (ax < bx) {
      if (rel > 0) {
        const j = (-(1 + COR_BODY) * rel) / (1 / a.mass + 1 / b.mass);
        a.vx += j / a.mass;
        b.vx -= j / b.mass;
      }
    } else if (rel < 0) {
      const j = (-(1 + COR_BODY) * rel) / (1 / a.mass + 1 / b.mass);
      a.vx += j / a.mass;
      b.vx -= j / b.mass;
    }
  } else {
    const depth = oy + SEP_EPS;
    if (ay < by) {
      a.y -= (depth * b.mass) / total;
      b.y += (depth * a.mass) / total;
    } else {
      a.y += (depth * b.mass) / total;
      b.y -= (depth * a.mass) / total;
    }

    const rel = a.vy - b.vy;
    if (ay < by) {
      if (rel > 0) {
        const j = (-(1 + COR_BODY) * rel) / (1 / a.mass + 1 / b.mass);
        a.vy += j / a.mass;
        b.vy -= j / b.mass;
      }
    } else if (rel < 0) {
      const j = (-(1 + COR_BODY) * rel) / (1 / a.mass + 1 / b.mass);
      a.vy += j / a.mass;
      b.vy -= j / b.mass;
    }
  }
}

/**
 * Dragged vs other: push other first; if walls block it and overlap remains, push drag back
 * so boxes never sit on top of each other (hard edges).
 */
function resolvePairWithDrag(
  drag: Body,
  other: Body,
  vw: number,
  vh: number,
) {
  let ox = Math.min(drag.x + drag.w, other.x + other.w) - Math.max(drag.x, other.x);
  let oy = Math.min(drag.y + drag.h, other.y + other.h) - Math.max(drag.y, other.y);
  if (ox <= 0 || oy <= 0) return;

  const dcx = drag.x + drag.w * 0.5;
  const ocx = other.x + other.w * 0.5;
  const dcy = drag.y + drag.h * 0.5;
  const ocy = other.y + other.h * 0.5;

  if (ox < oy) {
    const depth = ox + SEP_EPS;
    if (ocx < dcx) {
      other.x -= depth;
    } else {
      other.x += depth;
    }
    other.vx = -other.vx * COR_BODY;
  } else {
    const depth = oy + SEP_EPS;
    if (ocy < dcy) {
      other.y -= depth;
    } else {
      other.y += depth;
    }
    other.vy = -other.vy * COR_BODY;
  }
  resolveWalls(other, vw, vh);

  ox = Math.min(drag.x + drag.w, other.x + other.w) - Math.max(drag.x, other.x);
  oy = Math.min(drag.y + drag.h, other.y + other.h) - Math.max(drag.y, other.y);
  if (ox <= 0 || oy <= 0) return;

  if (ox < oy) {
    const depth = ox + SEP_EPS;
    const dcx2 = drag.x + drag.w * 0.5;
    const ocx2 = other.x + other.w * 0.5;
    if (dcx2 < ocx2) {
      drag.x -= depth;
    } else {
      drag.x += depth;
    }
  } else {
    const depth = oy + SEP_EPS;
    const dcy2 = drag.y + drag.h * 0.5;
    const ocy2 = other.y + other.h * 0.5;
    if (dcy2 < ocy2) {
      drag.y -= depth;
    } else {
      drag.y += depth;
    }
  }
}

/** Run after pointer moves the drag — keeps separation in sync (physics alone can lag one frame). */
function resolveDragAgainstAll(
  dragIdx: number,
  bodies: Body[],
  vw: number,
  vh: number,
) {
  for (let it = 0; it < PAIR_ITERS; it++) {
    for (let j = 0; j < bodies.length; j++) {
      if (j === dragIdx) continue;
      resolvePairWithDrag(bodies[dragIdx], bodies[j], vw, vh);
    }
    resolveWalls(bodies[dragIdx], vw, vh);
  }
}

function stepPhysics(
  bodies: Body[],
  vw: number,
  vh: number,
  dragIdx: number | null,
) {
  const dt = 1 / 60;

  for (let s = 0; s < SUBSTEPS; s++) {
    for (let i = 0; i < bodies.length; i++) {
      if (i === dragIdx) continue;
      const b = bodies[i];
      b.vx *= AIR_DAMP;
      b.vy *= AIR_DAMP;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      resolveWalls(b, vw, vh);
    }

    for (let it = 0; it < PAIR_ITERS; it++) {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          if (dragIdx === null) {
            resolvePair(bodies[i], bodies[j]);
            resolveWalls(bodies[i], vw, vh);
            resolveWalls(bodies[j], vw, vh);
          } else if (dragIdx === i) {
            resolvePairWithDrag(bodies[i], bodies[j], vw, vh);
          } else if (dragIdx === j) {
            resolvePairWithDrag(bodies[j], bodies[i], vw, vh);
          } else {
            resolvePair(bodies[i], bodies[j]);
            resolveWalls(bodies[i], vw, vh);
            resolveWalls(bodies[j], vw, vh);
          }
        }
      }
    }

    if (dragIdx !== null) {
      resolveWalls(bodies[dragIdx], vw, vh);
    }
  }
}

function syncDom(
  bodies: Body[],
  refs: React.MutableRefObject<(HTMLAnchorElement | null)[]>,
) {
  bodies.forEach((b, i) => {
    const el = refs.current[i];
    if (el) {
      el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    }
  });
}

export default function GalleryWall() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Body[]>([]);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [bodies, setBodies] = useState<Body[]>([]);

  const dragIdxRef = useRef<number | null>(null);
  const grabRef = useRef({ ox: 0, oy: 0 });
  const lastVelRef = useRef({ vx: 0, vy: 0, t: 0 });
  const blockNextClickRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const seedRef = useRef(
    typeof window !== 'undefined' ? Date.now() : 42,
  );

  const [layoutKey, setLayoutKey] = useState(0);
  const lastSizeRef = useRef({ w: 0, h: 0 });

  const initBodies = useCallback(async (vw: number, vh: number) => {
    const rng = mulberry32(seedRef.current);
    const bodiesMeta = pickGalleryImages(rng);
    const uniqueImages = Array.from(
      new Map(bodiesMeta.map((b) => [b.image.id, b.image])).values(),
    );
    await loadImageAspectRatiosForImages(uniqueImages);
    const built = buildBodies(vw, vh, rng, aspectRatioById, bodiesMeta);
    bodiesRef.current = built;
    linkRefs.current = [];
    setBodies(built);
    setLayoutKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let t: ReturnType<typeof setTimeout> | null = null;
    let first = true;

    const apply = () => {
      const r = el.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      if (w < 40 || h < 40) return;

      const lw = lastSizeRef.current.w;
      const lh = lastSizeRef.current.h;
      if (
        lw > 0 &&
        lh > 0 &&
        Math.abs(w - lw) < 3 &&
        Math.abs(h - lh) < 3
      ) {
        return;
      }
      lastSizeRef.current = { w, h };

      if (first) {
        first = false;
        void initBodies(w, h);
        return;
      }

      if (t) clearTimeout(t);
      t = setTimeout(() => {
        void initBodies(w, h);
      }, 120);
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (t) clearTimeout(t);
    };
  }, [initBodies]);

  useEffect(() => {
    if (layoutKey === 0) return;

    const loop = () => {
      const el = viewportRef.current;
      if (!el) return;
      const vw = el.clientWidth;
      const vh = el.clientHeight;
      stepPhysics(bodiesRef.current, vw, vh, dragIdxRef.current);
      syncDom(bodiesRef.current, linkRefs);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [layoutKey]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const root = viewportRef.current;
      if (!root || !root.contains(e.target as Node)) return;

      const rect = root.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      const bs = bodiesRef.current;
      let hit = -1;
      for (let i = bs.length - 1; i >= 0; i--) {
        const b = bs[i];
        if (
          px >= b.x &&
          px <= b.x + b.w &&
          py >= b.y &&
          py <= b.y + b.h
        ) {
          hit = i;
          break;
        }
      }

      if (hit < 0) return;

      blockNextClickRef.current = false;
      dragIdxRef.current = hit;
      const b = bs[hit];
      grabRef.current = { ox: px - b.x, oy: py - b.y };
      lastVelRef.current = { vx: 0, vy: 0, t: performance.now() };
      b.vx = 0;
      b.vy = 0;

      const onMove = (ev: PointerEvent) => {
        if (dragIdxRef.current === null) return;
        const r = root.getBoundingClientRect();
        const nx = ev.clientX - r.left - grabRef.current.ox;
        const ny = ev.clientY - r.top - grabRef.current.oy;
        const bb = bodiesRef.current[dragIdxRef.current];
        const dt = Math.max(1, performance.now() - lastVelRef.current.t);
        lastVelRef.current = {
          vx: ((nx - bb.x) / dt) * 16,
          vy: ((ny - bb.y) / dt) * 16,
          t: performance.now(),
        };
        bb.x = Math.max(0, Math.min(r.width - bb.w, nx));
        bb.y = Math.max(0, Math.min(r.height - bb.h, ny));
        blockNextClickRef.current = true;
        const idx = dragIdxRef.current;
        resolveDragAgainstAll(idx, bodiesRef.current, r.width, r.height);
        syncDom(bodiesRef.current, linkRefs);
      };

      const onUp = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);

        const idx = dragIdxRef.current;
        dragIdxRef.current = null;
        if (idx === null) return;

        const bb = bodiesRef.current[idx];
        bb.vx = lastVelRef.current.vx;
        bb.vy = lastVelRef.current.vy;
        const sp = Math.hypot(bb.vx, bb.vy);
        if (sp > 1100) {
          const k = 1100 / sp;
          bb.vx *= k;
          bb.vy *= k;
        }
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    };

    window.addEventListener('pointerdown', onPointerDown, true);
    return () => window.removeEventListener('pointerdown', onPointerDown, true);
  }, []);

  const onLinkClick = useCallback((e: React.MouseEvent) => {
    if (blockNextClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      blockNextClickRef.current = false;
    }
  }, []);

  if (bodies.length === 0) {
    return (
      <div
        ref={viewportRef}
        className="relative flex w-full items-center justify-center overflow-hidden bg-[#fafafa]"
        style={{ height: 'calc(100vh - 96px)' }}
      >
        <p
          className="-translate-y-10 text-2xl tracking-wide text-neutral-400 sm:text-3xl"
          aria-live="polite"
        >
        </p>
      </div>
    );
  }

  return (
    <div
      ref={viewportRef}
      className="relative w-full touch-none select-none overflow-hidden bg-[#fafafa]"
      style={{ height: 'calc(100vh - 96px)' }}
    >
      {bodies.map((b, index) => (
        <Link
          key={b.key}
          ref={(el) => {
            linkRefs.current[index] = el;
            if (el && bodiesRef.current[index]) {
              const bb = bodiesRef.current[index];
              el.style.transform = `translate(${bb.x}px, ${bb.y}px)`;
            }
          }}
          href={ROUTES[b.image.type]}
          onClickCapture={onLinkClick}
          className="absolute left-0 top-0 block will-change-transform transition-opacity duration-200 hover:opacity-[0.85]"
          style={{
            width: b.w,
            height: b.h,
          }}
          draggable={false}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.image.src}
            alt={b.image.alt}
            className="h-full w-full object-contain pointer-events-none"
            draggable={false}
          />
        </Link>
      ))}
    </div>
  );
}
