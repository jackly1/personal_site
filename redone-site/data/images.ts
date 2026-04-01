export type ImageType = 'project' | 'book' | 'film' | 'self';

export interface GalleryImage {
  id: number;
  src: string;
  type: ImageType;
  alt: string;
  /** If true, not used on the home gallery (still in `imagePool` for listings, etc.). */
  omitFromGallery?: boolean;
}

/**
 * Built from `public/static/{self,books,film,misc}` via `npm run sync:images`.
 * Edit captions / `omitFromGallery` in `data/image-meta.json`, then re-run sync.
 */
export { imagePool } from './generated/imagePool';
import { imagePool } from './generated/imagePool';

/** Subset of `imagePool` used by the home `GalleryWall` (respects `omitFromGallery`). */
export const galleryImagePool = imagePool.filter((i) => !i.omitFromGallery);

export const bookImages = imagePool.filter((i) => i.type === 'book');
export const filmImages = imagePool.filter((i) => i.type === 'film');
