import { ImageMasonry } from '@/components/ImageMasonry';
import { filmImages } from '@/data/images';

export default function FilmsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="px-6 pb-20 pt-10 md:px-12 md:pt-12">
        <h2 className="mb-5 text-2xl font-bold text-neutral-800 md:mb-6">
          Films
        </h2>

        <ImageMasonry items={filmImages} imageAlt="Film still" />

        <div className="mt-12">
          <a
            href="https://letterboxd.com/jack1y/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800"
          >
            Letterboxd
          </a>
        </div>
      </div>
    </main>
  );
}
