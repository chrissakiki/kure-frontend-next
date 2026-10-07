import type { Metadata } from 'next';
import About from '@/views/About';
import PageStatus from '@/components/PageStatus';
import { getAboutPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/about');

export default async function AboutPage() {
  const result = await loadPage(getAboutPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <About data={result.data} />;
}
