import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@guia_farmaco_recent_drugs';
const MAX_ENTRIES = 15;

export function useRecentDrugs() {
  const [recentDrugs, setRecentDrugs] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setRecentDrugs(JSON.parse(raw)); } catch (e) { console.warn('Failed to parse recent drugs:', e); }
      }
    }).catch(e => console.warn('Failed to load recent drugs:', e));
  }, []);

  const persist = useCallback((updated: string[]) => {
    setRecentDrugs(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(e =>
      console.warn('Failed to save recent drugs:', e),
    );
  }, []);

  const addRecent = useCallback((drugId: string) => {
    setRecentDrugs(prev => {
      const filtered = prev.filter(id => id !== drugId);
      const updated = [drugId, ...filtered].slice(0, MAX_ENTRIES);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(e =>
        console.warn('Failed to save recent drugs:', e),
      );
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    persist([]);
  }, [persist]);

  return { recentDrugs, addRecent, clearRecent };
}
