import type { Metadata } from 'next';
import Locations from '@/views/Locations';
import PageStatus from '@/components/PageStatus';
import { getLocationsPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/locations');

export default async function LocationsPage() {
  const result = await loadPage(getLocationsPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Locations data={result.data} />;
}
