import { createContext, useContext } from 'react';

export interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setFavorites: (favorites: string[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  setFavorites: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export default FavoritesContext;
