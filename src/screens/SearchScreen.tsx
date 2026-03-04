import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList } from '../types';
import { SearchBar } from '../components/SearchBar';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import { useDrugSearch } from '../hooks/useDrugSearch';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useFadeIn } from '../utils/animations';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Busqueda'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export function SearchScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs } = useDrugData();
  const { query, results, search, clear, resultCount } = useDrugSearch(drugs);
  const { history, addEntry, removeEntry, clearHistory } = useSearchHistory();
  const fadeIn = useFadeIn(300);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>🔍 Búsqueda</Text>
        <Text style={styles.headerSubtitle}>
          Busca entre {drugs.length} fármacos
        </Text>
      </View>

      <SearchBar
        value={query}
        onChangeText={search}
        onClear={clear}
        placeholder="Nombre, genérico, indicación..."
        autoFocus={false}
      />

      {query.length >= 2 ? (
        <Animated.View style={{ flex: 1, opacity: fadeIn }}>
          <Text style={styles.resultCount}>
            {resultCount} resultado{resultCount !== 1 ? 's' : ''}
          </Text>
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <DrugCard
                drug={item.drug}
                onPress={() => {
                  addEntry(query);
                  navigation.navigate('DrugDetail', { drugId: item.drug.id });
                }}
                highlight={query}
              />
            )}
            keyExtractor={item => item.drug.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>No se encontraron resultados</Text>
                <Text style={styles.emptySubtext}>
                  Intenta con el nombre genérico o comercial
                </Text>
              </View>
            }
          />
        </Animated.View>
      ) : (
        <View style={styles.suggestionsContainer}>
          {history.length > 0 ? (
            <>
              <View style={styles.historyHeader}>
                <Text style={styles.suggestionsTitle}>🕐 Búsquedas recientes</Text>
                <TouchableOpacity onPress={clearHistory}>
                  <Text style={styles.clearHistoryText}>Limpiar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.suggestionsGrid}>
                {history.map((entry, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.suggestionChip}
                    onPress={() => search(entry.query)}
                    onLongPress={() => removeEntry(entry.query)}
                  >
                    <Text style={styles.suggestionText}>{entry.query}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.suggestionsTitle}>Sugerencias</Text>
              <View style={styles.suggestionsGrid}>
                {['Amoxicilina', 'Insulina', 'Omeprazol', 'Paracetamol', 'Heparina'].map((term, i) => (
                  <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => search(term)}>
                    <Text style={styles.suggestionText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Consejos de búsqueda</Text>
            <Text style={styles.tipText}>• Busca por nombre genérico o comercial</Text>
            <Text style={styles.tipText}>• Busca por indicación (ej: "hipertensión")</Text>
            <Text style={styles.tipText}>• Busca por familia (ej: "penicilina")</Text>
            <Text style={styles.tipText}>• Mínimo 2 caracteres para buscar</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  resultCount: {
    fontSize: 13,
    color: colors.textSecondary,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
  },
  list: {
    paddingBottom: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  suggestionsContainer: {
    padding: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearHistoryText: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '600',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: colors.primaryLight + '15',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primaryLight + '30',
  },
  suggestionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  tipsContainer: {
    marginTop: 24,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
});