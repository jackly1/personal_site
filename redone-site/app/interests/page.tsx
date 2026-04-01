import PageHeader from '@/components/PageHeader';
import InterestsPanels from '@/components/InterestsPanels';

export default function InterestsPage() {
  return (
    <main className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden">
      <PageHeader />
      <InterestsPanels />
    </main>
  );
}
