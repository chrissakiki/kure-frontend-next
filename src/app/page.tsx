import type { Metadata } from 'next';
import Home from '@/views/Home';
import PageStatus from '@/components/PageStatus';
import { getHomePage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/');

export default async function Page() {
  const result = await loadPage(getHomePage);

  return (
    <>
      <link
        rel='preload'
        as='image'
        href='/assets/images/kure-home-bg.webp'
        fetchPriority='high'
      />
      {result.ok ? <Home data={result.data} /> : <PageStatus error={result.error} />}
    </>
  );
}
