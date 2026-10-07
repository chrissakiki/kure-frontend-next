'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AosInit = () => {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({ duration: 900 });
    AOS.refresh();
  }, [pathname]);

  return null;
};

export default AosInit;
