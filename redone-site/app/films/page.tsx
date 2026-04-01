import PageHeader from '@/components/PageHeader';
import { filmImages } from '@/data/images';

export default function FilmsPage() {
  return (
    <main className="min-h-screen">
      <PageHeader />

      <div className="px-6 pb-20 md:px-12">
        <h2 className="mb-10 text-2xl font-light text-neutral-800">Films</h2>

        <ul className="flex flex-wrap border-l border-t border-neutral-200">
          {filmImages.map((img) => (
            <li
              key={img.id}
              className="w-1/2 border-b border-r border-neutral-200 bg-neutral-100 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt || 'Film still'}
                className="block h-auto w-full object-contain align-top"
              />
            </li>
          ))}
        </ul>

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
