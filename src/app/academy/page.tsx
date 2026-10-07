import type { Metadata } from 'next';
import Academy from '@/views/Academy';
import PageStatus from '@/components/PageStatus';
import { getAcademyPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/academy');

export default async function AcademyPage() {
  const result = await loadPage(getAcademyPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Academy data={result.data} />;
}
