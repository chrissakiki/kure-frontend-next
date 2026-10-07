import type { Metadata } from 'next';
import Privacy from '@/views/Privacy';
import PageStatus from '@/components/PageStatus';
import { getPrivacyPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/privacy');

export default async function PrivacyPage() {
  const result = await loadPage(getPrivacyPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Privacy data={result.data} />;
}
