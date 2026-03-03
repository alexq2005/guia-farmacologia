import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList } from '../types';
import { SearchBar } from '../components/SearchBar';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import { useDrugSearch } from '../hooks/useDrugSearch';
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
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs } = useDrugData();
  const { query, results, search, clear, resultCount } = useDrugSearch(drugs);

  const recentSearches = ['Amoxicilina', 'Insulina', 'Omeprazol', 'Paracetamol', 'Heparina'];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.header}>
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
        <>
          <Text style={styles.resultCount}>
            {resultCount} resultado{resultCount !== 1 ? 's' : ''}
          </Text>
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <DrugCard
                drug={item.drug}
                onPress={() => navigation.navigate('DrugDetail', { drugId: item.drug.id })}
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
        </>
      ) : (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Sugerencias</Text>
          <View style={styles.suggestionsGrid}>
            {recentSearches.map((term, i) => (
              <View key={i} style={styles.suggestionChip}>
                <Text
                  style={styles.suggestionText}
                  onPress={() => search(term)}
                >
                  {term}
                </Text>
              </View>
            ))}
          </View>

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