'use client';

import { createContext, useContext } from 'react';
import type { BookingOptionsData } from '../api/types';

const BookingOptionsContext = createContext<BookingOptionsData | null>(null);

export const BookingOptionsProvider = ({
  options,
  children,
}: {
  options: BookingOptionsData | null;
  children: React.ReactNode;
}) => {
  return (
    <BookingOptionsContext.Provider value={options}>
      {children}
    </BookingOptionsContext.Provider>
  );
};

export const useBookingOptions = () => useContext(BookingOptionsContext);
