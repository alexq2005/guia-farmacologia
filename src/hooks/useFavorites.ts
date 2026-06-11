import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@guia_farmaco_favorites';
const COLLECTIONS_KEY = '@guia_farmaco_collections';
const FREE_FAVORITES_LIMIT = 5;

export interface FavoriteCollection {
  id: string;
  name: string;
  icon: string;
  color: string;
  drugIds: string[];
}

const DEFAULT_COLLECTIONS: FavoriteCollection[] = [
  {
    id: 'guardia',
    name: 'Guardia',
    icon: 'hospital-box-outline',
    color: '#DC2626',
    drugIds: [],
  },
  {
    id: 'estudio',
    name: 'Estudio',
    icon: 'school-outline',
    color: '#8B5CF6',
    drugIds: [],
  },
  {
    id: 'uci',
    name: 'UCI',
    icon: 'heart-pulse',
    color: '#0891B2',
    drugIds: [],
  },
];

export function useFavorites(isPremium: boolean = true) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<FavoriteCollection[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(FAVORITES_KEY),
      AsyncStorage.getItem(COLLECTIONS_KEY),
    ])
      .then(([favData, colData]) => {
        if (favData) {
          try {
            setFavorites(JSON.parse(favData));
          } catch (e) {
            console.warn('Failed to parse saved favorites:', e);
          }
        }
        if (colData) {
          try {
            setCollections(JSON.parse(colData));
          } catch (e) {
            console.warn('Failed to parse saved collections:', e);
            setCollections(DEFAULT_COLLECTIONS);
          }
        } else {
          setCollections(DEFAULT_COLLECTIONS);
        }
        setLoaded(true);
      })
      .catch(e => {
        console.warn('Failed to load favorites:', e);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(
        () => {},
      );
    }
  }, [favorites, loaded]);

  useEffect(() => {
    if (loaded && collections.length > 0) {
      AsyncStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections)).catch(
        () => {},
      );
    }
  }, [collections, loaded]);

  const toggleFavorite = useCallback(
    (drugId: string) => {
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
    },
    [isPremium],
  );

  const isFavorite = useCallback(
    (drugId: string): boolean => {
      return favorites.includes(drugId);
    },
    [favorites],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  // ─── Collections ───────────────────────────────────────────

  const createCollection = useCallback(
    (
      name: string,
      icon: string = 'folder-outline',
      color: string = '#3B82F6',
    ) => {
      const id = `col_${Date.now()}`;
      setCollections(prev => [...prev, { id, name, icon, color, drugIds: [] }]);
      return id;
    },
    [],
  );

  const deleteCollection = useCallback((collectionId: string) => {
    setCollections(prev => prev.filter(c => c.id !== collectionId));
  }, []);

  const renameCollection = useCallback((collectionId: string, name: string) => {
    setCollections(prev =>
      prev.map(c => (c.id === collectionId ? { ...c, name } : c)),
    );
  }, []);

  const addToCollection = useCallback(
    (collectionId: string, drugId: string) => {
      setCollections(prev =>
        prev.map(c => {
          if (c.id !== collectionId) return c;
          if (c.drugIds.includes(drugId)) return c;
          return { ...c, drugIds: [...c.drugIds, drugId] };
        }),
      );
    },
    [],
  );

  const removeFromCollection = useCallback(
    (collectionId: string, drugId: string) => {
      setCollections(prev =>
        prev.map(c => {
          if (c.id !== collectionId) return c;
          return { ...c, drugIds: c.drugIds.filter(id => id !== drugId) };
        }),
      );
    },
    [],
  );

  const getCollectionsForDrug = useCallback(
    (drugId: string): FavoriteCollection[] => {
      return collections.filter(c => c.drugIds.includes(drugId));
    },
    [collections],
  );

  return {
    favorites,
    favoriteCount: favorites.length,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    collections,
    createCollection,
    deleteCollection,
    renameCollection,
    addToCollection,
    removeFromCollection,
    getCollectionsForDrug,
    loaded,
  };
}
