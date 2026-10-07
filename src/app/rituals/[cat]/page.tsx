import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Service from '@/views/Services/cat';
import PageStatus from '@/components/PageStatus';
import { getServiceCategoryPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

type RitualPageProps = {
  params: Promise<{ cat: string }>;
};

export async function generateMetadata({
  params,
}: RitualPageProps): Promise<Metadata> {
  const { cat } = await params;
  return pageMetadata(`/rituals/${cat}`);
}

export default async function RitualPage({ params }: RitualPageProps) {
  const { cat } = await params;
  const result = await loadPage(() => getServiceCategoryPage(cat));

  if (!result.ok) {
    if (/not found/i.test(result.error) || /404/.test(result.error)) {
      redirect('/services');
    }
    return <PageStatus error={result.error} />;
  }

  return <Service data={result.data} />;
}
