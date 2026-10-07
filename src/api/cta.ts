import { BOOKING_MODAL_HREF } from './config';

export type ContentCta = {
  label: string;
  action: 'book' | 'link';
  href?: string;
};

export const toCta = (
  label?: string | null,
  href?: string | null
): ContentCta | null => {
  if (!label) return null;

  if (!href || href === BOOKING_MODAL_HREF) {
    return { label, action: 'book' };
  }

  return { label, action: 'link', href };
};
