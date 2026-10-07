import type { Metadata } from 'next';
import Testimonials from '@/views/Testimonials';
import PageStatus from '@/components/PageStatus';
import { getTestimonialsPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/testimonials');

export default async function TestimonialsPage() {
  const result = await loadPage(getTestimonialsPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Testimonials data={result.data} />;
}
