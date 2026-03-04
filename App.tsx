/**
 * Guía Farmacológica de Enfermería
 * App de referencia rápida con 201+ fármacos
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { NotesProvider } from './src/context/NotesContext';
import { ThemeProvider } from './src/context/ThemeContext';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <NotesProvider>
            <AppNavigator />
          </NotesProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
