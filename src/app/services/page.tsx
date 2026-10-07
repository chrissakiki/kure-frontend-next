import type { Metadata } from 'next';
import ServicesPrices from '@/views/ServicesPrices';
import PageStatus from '@/components/PageStatus';
import { getServicesPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/services');

export default async function ServicesPage() {
  const result = await loadPage(getServicesPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <ServicesPrices data={result.data} />;
}
