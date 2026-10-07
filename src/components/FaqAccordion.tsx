'use client';

import { useState } from 'react';

type FaqItem = {
  id: string | number;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<string | number>>(new Set());

  if (!items.length) return null;

  const toggle = (id: string | number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className='space-y-0'>
      {items.map((faq) => {
        const isOpen = openIds.has(faq.id);

        return (
          <div key={faq.id} className='border-b border-black/[0.08] py-5'>
            <button
              type='button'
              aria-expanded={isOpen}
              onClick={() => toggle(faq.id)}
              className='flex w-full cursor-pointer items-start justify-between gap-4 text-left text-[17px] font-medium text-theme-primary'
            >
              {faq.question}
              <span
                className={`shrink-0 text-brand transition-transform duration-300 ease-out ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className='overflow-hidden'>
                <p
                  className={`mt-3 pr-8 text-[15px] leading-relaxed text-theme-secondary transition-opacity duration-300 ease-out ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
