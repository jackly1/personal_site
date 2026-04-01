import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function InterestsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />

      <div className="flex flex-1 min-h-[60vh] flex-col md:flex-row">
        <Link
          href="/films"
          className="flex flex-1 items-center justify-center border-b border-neutral-200 py-16 text-2xl font-light text-neutral-800 transition-colors hover:bg-neutral-100 md:border-b-0 md:border-r"
        >
          Film
        </Link>
        <Link
          href="/books"
          className="flex flex-1 items-center justify-center py-16 text-2xl font-light text-neutral-800 transition-colors hover:bg-neutral-100"
        >
          Books
        </Link>
      </div>
    </main>
  );
}
