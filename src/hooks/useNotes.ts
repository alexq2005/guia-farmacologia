import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { DrugNote } from '../types';

const STORAGE_KEY = '@guia_farmaco_notes';

export function useNotes() {
  const [notes, setNotes] = useState<DrugNote[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setNotes(JSON.parse(raw)); } catch (e) { console.warn('Failed to parse saved notes:', e); }
      }
      setLoaded(true);
    }).catch(e => console.warn('Failed to load notes:', e));
  }, []);

  const persist = useCallback((updated: DrugNote[]) => {
    setNotes(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const getNote = useCallback((drugId: string): DrugNote | undefined => {
    return notes.find(n => n.drugId === drugId);
  }, [notes]);

  const saveNote = useCallback((drugId: string, text: string) => {
    const existing = notes.findIndex(n => n.drugId === drugId);
    const entry: DrugNote = { drugId, text, updatedAt: Date.now() };
    if (existing >= 0) {
      const updated = [...notes];
      updated[existing] = entry;
      persist(updated);
    } else {
      persist([...notes, entry]);
    }
  }, [notes, persist]);

  const deleteNote = useCallback((drugId: string) => {
    persist(notes.filter(n => n.drugId !== drugId));
  }, [notes, persist]);

  const recentNotes = useCallback((limit: number = 5): DrugNote[] => {
    return [...notes]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }, [notes]);

  return { notes, loaded, getNote, saveNote, deleteNote, recentNotes, noteCount: notes.length };
}
