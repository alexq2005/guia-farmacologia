import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@guia_farmaco_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load favorites from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then(data => {
        if (data) setFavorites(JSON.parse(data));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Save to storage whenever favorites change (after initial load)
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
    }
  }, [favorites, loaded]);

  const toggleFavorite = useCallback((drugId: string) => {
    setFavorites(prev => {
      if (prev.includes(drugId)) {
        return prev.filter(id => id !== drugId);
      }
      return [...prev, drugId];
    });
  }, []);

  const isFavorite = useCallback((drugId: string): boolean => {
    return favorites.includes(drugId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    favoriteCount: favorites.length,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    loaded,
  };
}
