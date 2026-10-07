import type { Metadata } from 'next';
import Vouchers from '@/views/Vouchers';
import PageStatus from '@/components/PageStatus';
import { getGiftVouchersPage } from '@/api/pages';
import { loadPage } from '@/lib/loadPage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/vouchers');

export default async function VouchersPage() {
  const result = await loadPage(getGiftVouchersPage);
  if (!result.ok) return <PageStatus error={result.error} />;
  return <Vouchers data={result.data} />;
}
