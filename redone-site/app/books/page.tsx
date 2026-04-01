import { GalleryWithSort } from '@/components/GalleryWithSort';
import { bookImages } from '@/data/images';

export default function BooksPage() {
  return (
    <GalleryWithSort
      title="Books"
      items={bookImages}
      detailHover
      imageAlt="Book cover"
      headerLink={{
        href: 'https://www.goodreads.com/user/show/158036909-jack-lille-yerington/',
        label: 'Goodreads',
      }}
    />
  );
}
