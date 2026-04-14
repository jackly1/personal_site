import { GalleryWithSort } from '@/components/GalleryWithSort';
import { filmImages } from '@/data/images';

export default function FilmsPage() {
  return (
    <GalleryWithSort
      title="Films"
      items={filmImages}
      detailHover
      showRankedSort={false}
      imageAlt="Film still"
      headerLink={{
        href: 'https://letterboxd.com/jack1y/',
        label: 'Letterboxd',
      }}
    />
  );
}
