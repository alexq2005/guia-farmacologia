/**
 * Guía Farmacológica de Enfermería
 * App de referencia rápida con 2,974 fármacos.
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { NotesProvider } from './src/context/NotesContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { PremiumProvider } from './src/context/PremiumContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { TabBarProvider } from './src/context/TabBarContext';
import { initDatabase } from './src/data/db';
import { initCrashReporting } from './src/utils/crashReporting';

initCrashReporting();
initDatabase();

function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <PremiumProvider>
            <FavoritesProvider>
              <NotesProvider>
                <TabBarProvider>
                  <AppNavigator />
                </TabBarProvider>
              </NotesProvider>
            </FavoritesProvider>
          </PremiumProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
