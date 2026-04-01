import Link from 'next/link';

interface PageHeaderProps {
  backLabel?: string;
}

export default function PageHeader({ backLabel = '← back' }: PageHeaderProps) {
  return (
    <header className="shrink-0 px-6 pb-6 pt-10 md:px-12">
      <Link
        href="/"
        className="text-[11px] font-bold uppercase tracking-name text-neutral-800 transition-colors hover:text-neutral-500"
      >
        Jack Lille Yerington
      </Link>
      <div className="mt-3">
        <Link
          href="/"
          className="text-base font-bold text-neutral-400 transition-colors hover:text-neutral-600 md:text-lg"
        >
          {backLabel}
        </Link>
      </div>
    </header>
  );
}
