import React, { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

type FavoritesContextType = ReturnType<typeof useFavorites>;

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const favoritesState = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
}
