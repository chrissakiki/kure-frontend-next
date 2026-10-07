'use client';

import { cn } from '../../utils/cn';
import React, { useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const Modal = ({ children, className, onClose }: IProps) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] grid place-items-center p-3 sm:p-5 backdrop-blur-[6px]',
        className
      )}
      style={{ backgroundColor: 'rgba(16, 16, 16, 0.55)' }}
      role='dialog'
      aria-modal='true'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className='w-full' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
