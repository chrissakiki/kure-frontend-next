import type { Metadata } from 'next';
import Faq from '@/views/Faq';
import PageStatus from '@/components/PageStatus';
import { getFaqPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/faq');

export default async function FaqPage() {
  const result = await loadPage(getFaqPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Faq data={result.data} />;
}
