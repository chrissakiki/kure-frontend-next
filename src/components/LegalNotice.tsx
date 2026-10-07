import type { ReactNode } from 'react';

type LegalNoticeProps = {
  children: ReactNode;
  className?: string;
};

const LegalNotice = ({ children, className = '' }: LegalNoticeProps) => (
  <div className={`legal-notice ${className}`.trim()}>{children}</div>
);

export default LegalNotice;
