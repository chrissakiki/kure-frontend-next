import type { ReactNode } from 'react';

type LegalSectionProps = {
  title: string;
  items?: ReactNode[];
  children?: ReactNode;
  noBorder?: boolean;
};

const LegalSection = ({
  title,
  items,
  children,
  noBorder = false,
}: LegalSectionProps) => (
  <div className={`legal-section ${noBorder ? 'border-b-0' : ''}`}>
    <h3 className='mb-3.5 text-[18px] font-semibold tracking-[0.02em] text-theme-primary'>
      {title}
    </h3>
    {items && items.length > 0 && (
      <ul className='m-0 list-disc space-y-0 py-0 pl-5'>
        {items.map((item, index) => (
          <li key={index} className='legal-section-item'>
            {item}
          </li>
        ))}
      </ul>
    )}
    {children}
  </div>
);

export default LegalSection;
