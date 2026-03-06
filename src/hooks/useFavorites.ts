import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@guia_farmaco_favorites';
const FREE_FAVORITES_LIMIT = 5;

export function useFavorites(isPremium: boolean = true) {
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
      if (!isPremium && prev.length >= FREE_FAVORITES_LIMIT) {
        Alert.alert(
          'Límite alcanzado',
          `En la versión gratuita puedes tener hasta ${FREE_FAVORITES_LIMIT} favoritos. Actualiza a Premium para favoritos ilimitados.`,
          [{ text: 'Entendido' }],
        );
        return prev;
      }
      return [...prev, drugId];
    });
  }, [isPremium]);

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
