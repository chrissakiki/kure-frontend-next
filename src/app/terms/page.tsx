import type { Metadata } from 'next';
import Terms from '@/views/Terms';
import PageStatus from '@/components/PageStatus';
import { getTermsPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/terms');

export default async function TermsPage() {
  const result = await loadPage(getTermsPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Terms data={result.data} />;
}
