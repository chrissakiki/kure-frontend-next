import {
  HiOutlineArrowsRightLeft,
  HiOutlineBanknotes,
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineHeart,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';

/** Icons matched to PACKAGE_BENEFITS seed titles / sort order. */
const BY_SORT: Record<number, IconType> = {
  1: HiOutlineBanknotes, // Real Savings
  2: HiOutlineCalendarDays, // Priority Booking
  3: HiOutlineClock, // Extended Validity
  4: HiOutlineArrowsRightLeft, // Flexible Services
  5: HiOutlineBuildingStorefront, // In-Clinic Experience
  6: HiOutlineHeart, // Continuity of Care
};

const BY_TITLE: Record<string, IconType> = {
  'real savings': HiOutlineBanknotes,
  'priority booking': HiOutlineCalendarDays,
  'extended validity': HiOutlineClock,
  'flexible services': HiOutlineArrowsRightLeft,
  'in-clinic experience': HiOutlineBuildingStorefront,
  'continuity of care': HiOutlineHeart,
};

export const getPackageBenefitIcon = (
  title: string,
  sortOrder?: number
): IconType => {
  const fromTitle = BY_TITLE[title.trim().toLowerCase()];
  if (fromTitle) return fromTitle;
  if (sortOrder != null && BY_SORT[sortOrder]) return BY_SORT[sortOrder];
  return HiOutlineHeart;
};
