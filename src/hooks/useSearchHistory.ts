import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SearchHistoryEntry } from '../types';

const STORAGE_KEY = '@guia_farmaco_search_history';
const MAX_ENTRIES = 20;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setHistory(JSON.parse(raw)); } catch {}
      }
    });
  }, []);

  const persist = useCallback((updated: SearchHistoryEntry[]) => {
    setHistory(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addEntry = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;
    const filtered = history.filter(
      h => h.query.toLowerCase() !== trimmed.toLowerCase(),
    );
    const updated = [
      { query: trimmed, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_ENTRIES);
    persist(updated);
  }, [history, persist]);

  const removeEntry = useCallback((query: string) => {
    persist(history.filter(h => h.query !== query));
  }, [history, persist]);

  const clearHistory = useCallback(() => {
    persist([]);
  }, [persist]);

  return { history, addEntry, removeEntry, clearHistory };
}
