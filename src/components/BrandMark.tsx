import {
  HiOutlineCheck,
  HiOutlineCheckBadge,
  HiOutlineMapPin,
  HiOutlineMinus,
  HiOutlineNoSymbol,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { cn } from '../utils/cn';

export type BrandMarkVariant =
  | 'check' // included features / perks / policies
  | 'pin' // coverage areas / locations
  | 'shield' // credibility / method / standards
  | 'badge' // partner trust points
  | 'ban' // prohibitions ("students may not")
  | 'divider'; // nav separators

type BrandMarkProps = {
  variant?: BrandMarkVariant;
  className?: string;
};

const ICONS = {
  check: HiOutlineCheck,
  pin: HiOutlineMapPin,
  shield: HiOutlineShieldCheck,
  badge: HiOutlineCheckBadge,
  ban: HiOutlineNoSymbol,
  divider: HiOutlineMinus,
} as const;

const BrandMark = ({ variant = 'check', className }: BrandMarkProps) => {
  const Icon = ICONS[variant];

  return (
    <Icon
      aria-hidden
      className={cn('inline-block shrink-0 text-brand', className)}
      strokeWidth={1.75}
    />
  );
};

export default BrandMark;
