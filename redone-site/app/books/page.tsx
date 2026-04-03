import { GalleryWithSort } from '@/components/GalleryWithSort';
import { bookImages } from '@/data/images';

export default function BooksPage() {
  return (
    <GalleryWithSort
      title="Books"
      items={bookImages}
      detailHover
      bottomPaddingClass="pb-10 md:pb-16"
      imageAlt="Book cover"
      headerLink={{
        href: 'https://www.goodreads.com/user/show/158036909-jack-lille-yerington/',
        label: 'Goodreads',
      }}
    />
  );
}
