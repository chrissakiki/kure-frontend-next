import type { Metadata } from 'next';
import CorporateEvents from '@/views/CorporateEvents';
import PageStatus from '@/components/PageStatus';
import { getCorporatePage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/corporate-events');

export default async function CorporateEventsPage() {
  const result = await loadPage(getCorporatePage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <CorporateEvents data={result.data} />;
}
