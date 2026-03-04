import React, { createContext, useContext } from 'react';
import { useNotes } from '../hooks/useNotes';

type NotesContextType = ReturnType<typeof useNotes>;

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const notesState = useNotes();
  return (
    <NotesContext.Provider value={notesState}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext(): NotesContextType {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within NotesProvider');
  }
  return context;
}
