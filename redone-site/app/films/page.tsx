import PageHeader from '@/components/PageHeader';
import { filmImages } from '@/data/images';

export default function FilmsPage() {
  return (
    <main className="min-h-screen">
      <PageHeader />

      <div className="px-6 md:px-12 pb-20">
        <h2 className="text-2xl font-light mb-10 text-neutral-800">Films</h2>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filmImages.map((img) => (
            <li key={img.id} className="overflow-hidden bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt || 'Film still'}
                className="h-auto w-full object-contain"
              />
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <a
            href="https://letterboxd.com/jack1y/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 underline underline-offset-4 decoration-neutral-300 hover:text-neutral-800 transition-colors"
          >
            Letterboxd
          </a>
        </div>
      </div>
    </main>
  );
}
