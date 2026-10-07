import type { Metadata } from 'next';
import Careers from '@/views/Careers';
import PageStatus from '@/components/PageStatus';
import { getCareersPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/careers');

export default async function CareersPage() {
  const result = await loadPage(getCareersPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Careers data={result.data} />;
}
