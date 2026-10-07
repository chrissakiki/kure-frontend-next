'use client';

import PageStatus from '@/components/PageStatus';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <PageStatus error={error.message || 'Something went wrong'} />;
}
