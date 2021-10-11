import { useCallback, useEffect, useState } from 'react';
import FavoritesContext from './FavoritesContext';

const FAVORITES_KEY = 'bar-favorites';

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const handleStorage = () => {
      const savedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites != null) {
        const parsedFavorites = JSON.parse(savedFavorites) as string[];
        setFavorites(parsedFavorites);
      }
    };
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const savedFavorites = window.localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites != null) {
      const parsedFavorites = JSON.parse(savedFavorites) as string[];

      if (
        JSON.stringify([...parsedFavorites].sort()) !==
        JSON.stringify([...favorites].sort())
      ) {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    }
  }, [favorites]);

  const toggleFavorite = useCallback(
    (id: string) => {
      if (favorites.includes(id)) {
        setFavorites(favorites.filter(f => f !== id));
      } else {
        setFavorites([...favorites, id]);
      }
    },
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
