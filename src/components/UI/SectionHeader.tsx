import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  theme?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  as: Tag = 'h2',
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) => {
  const isCenter = align === 'center';

  return (
    <div className={cn(isCenter && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-brand',
            isCenter && 'text-center'
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'mb-5 text-[clamp(1.875rem,4.5vw,2.75rem)] font-medium leading-[1.05]',
          theme === 'dark' ? 'text-white' : 'text-theme-primary',
          isCenter && 'text-center',
          titleClassName
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            'mb-14 max-w-[620px] text-base leading-relaxed',
            isCenter && 'mx-auto text-center',
            theme === 'dark' ? 'text-white/65' : 'text-theme-secondary',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
