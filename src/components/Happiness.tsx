'use client';

import { usePathname } from 'next/navigation';

const Happiness = () => {
  const pathname = usePathname();

  return (
    <div className='grid place-items-center gap-5 mb-20'>
      <p className='text-[1.3rem] sm:text-[1.8rem] lg:text-[2.2rem] font-bold text-brand inline-block text-center uppercase tracking-[0.06rem]'>
        {pathname === '/' ? (
          'Luxury Delivered | Results Delivered | Healing Delivered | Reconnection Delivered | Knowledge Shared'
        ) : (
          'HAPPINESS, IS A HABIT, SO IS YOUR SELF CARE.'
        )}
      </p>
    </div>
  );
};

export default Happiness;
