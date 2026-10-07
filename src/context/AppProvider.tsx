'use client';

import React, { useState, createContext, useContext } from 'react';

interface AppContextInterface {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const AppProvider = ({ children }:Children) => {
  const [showMenu, setShowMenu] = useState(false);

  const state = { showMenu, setShowMenu };


  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;