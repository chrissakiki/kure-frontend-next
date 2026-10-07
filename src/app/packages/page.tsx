import type { Metadata } from 'next';
import Packages from '@/views/Packages';
import PageStatus from '@/components/PageStatus';
import { getPackagesPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/packages');

export default async function PackagesPage() {
  const result = await loadPage(getPackagesPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Packages data={result.data} />;
}
