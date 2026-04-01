import PageHeader from '@/components/PageHeader';

export default function MiscPage() {
  return (
    <main className="min-h-screen">
      <PageHeader />

      <div className="px-6 md:px-12 pb-20 max-w-2xl">
        <h2 className="text-2xl font-light mb-6 text-neutral-800">Misc</h2>
        <p className="text-neutral-400 leading-relaxed">
          More coming soon.
        </p>
      </div>
    </main>
  );
}
