export type ImageType = 'project' | 'book' | 'film' | 'food' | 'self' | 'misc';

export interface GalleryImage {
  id: number;
  src: string;
  type: ImageType;
  alt: string;
  /** Display title (e.g. full book title). Edit `data/gallery-notes.json`. */
  title?: string;
  /** Personal note (films / books pages). Edit `data/gallery-notes.json` — not `imagePool.ts`. */
  notes?: string;
  /**
   * Rank for “Ranked” sort (1 = first). Omit or `null` = unranked (sorted last).
   * Edit `data/gallery-notes.json`.
   */
  rank?: number | null;
  /** If true, not used on the home gallery (still in `imagePool` for listings, etc.). */
  omitFromGallery?: boolean;
}

/**
 * Built from `public/static/{self,books,film,food,misc,projects}` via `npm run sync:images`.
 * Edit captions in `data/image-meta.json`. Title, notes, and rank live in
 * `data/gallery-notes.json` (sync reads this file and does not overwrite it).
 * New images: run `npm run sync:init-notes` once to add empty keys, then fill them in.
 */
export { imagePool } from './generated/imagePool';
import { imagePool } from './generated/imagePool';

/** Subset of `imagePool` used by the home `GalleryWall` (respects `omitFromGallery`). */
export const galleryImagePool = imagePool.filter((i) => !i.omitFromGallery);

export const bookImages = imagePool.filter((i) => i.type === 'book');
export const filmImages = imagePool.filter((i) => i.type === 'film');
export const foodImages = imagePool.filter((i) => i.type === 'food');
