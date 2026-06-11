import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// LinearGradient removed — clean modern headers
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type {
  RootStackParamList,
  TabParamList,
  RouteOfAdministration,
  PregnancyCategory,
} from '../types';
import { SearchBar } from '../components/SearchBar';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import { useDrugSearch } from '../hooks/useDrugSearch';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useRecentDrugs } from '../hooks/useRecentDrugs';
import { useFadeIn } from '../utils/animations';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { neuPill, neuInset, neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { useTabBar } from '../context/TabBarContext';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Busqueda'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

const VIA_OPTIONS: { key: RouteOfAdministration; label: string }[] = [
  { key: 'IV', label: 'IV' },
  { key: 'IM', label: 'IM' },
  { key: 'SC', label: 'SC' },
  { key: 'oral', label: 'VO' },
  { key: 'inhalatoria', label: 'Inh' },
  { key: 'topica', label: 'Tóp' },
];

const PREG_OPTIONS: PregnancyCategory[] = ['A', 'B', 'C', 'D', 'X'];

export function SearchScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { handleScroll: handleTabBarScroll } = useTabBar();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { drugs, getDrugById } = useDrugData();
  const { query, results, search, clear, resultCount } = useDrugSearch(drugs);
  const { history, addEntry, removeEntry, clearHistory } = useSearchHistory();
  const { recentDrugs } = useRecentDrugs();
  const fadeIn = useFadeIn(300);
  const [filterVia, setFilterVia] = useState<RouteOfAdministration | null>(
    null,
  );
  const [filterPreg, setFilterPreg] = useState<PregnancyCategory | null>(null);

  // Fármacos consultados recientemente — re-abrir la ficha sin volver a buscar
  const recentDrugObjs = useMemo(
    () =>
      recentDrugs
        .slice(0, 8)
        .map(id => getDrugById(id))
        .filter((d): d is NonNullable<typeof d> => Boolean(d)),
    [recentDrugs, getDrugById],
  );

  const filteredResults = useMemo(() => {
    let filtered = results;
    if (filterVia)
      filtered = filtered.filter(r =>
        r.drug.viaAdministracion.includes(filterVia),
      );
    if (filterPreg)
      filtered = filtered.filter(r => r.drug.embarazo === filterPreg);
    return filtered;
  }, [results, filterVia, filterPreg]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Búsqueda</Text>
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
          {/* Filter chips */}
          <View style={styles.filtersRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              <Text style={styles.filterLabel}>Vía:</Text>
              {VIA_OPTIONS.map(v => (
                <TouchableOpacity
                  key={v.key}
                  style={[
                    styles.filterChip,
                    filterVia === v.key && styles.filterChipActive,
                  ]}
                  onPress={() =>
                    setFilterVia(filterVia === v.key ? null : v.key)
                  }
                  hitSlop={{ top: 8, bottom: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar por vía ${v.label}`}
                  accessibilityState={{ selected: filterVia === v.key }}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filterVia === v.key && styles.filterChipTextActive,
                    ]}
                  >
                    {v.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={[styles.filterLabel, { marginLeft: 10 }]}>Emb:</Text>
              {PREG_OPTIONS.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.filterChip,
                    filterPreg === p && styles.filterChipActive,
                  ]}
                  onPress={() => setFilterPreg(filterPreg === p ? null : p)}
                  hitSlop={{ top: 8, bottom: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar por categoría de embarazo ${p}`}
                  accessibilityState={{ selected: filterPreg === p }}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filterPreg === p && styles.filterChipTextActive,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.resultCount}>
            {filteredResults.length} resultado
            {filteredResults.length !== 1 ? 's' : ''}
            {filterVia || filterPreg ? ' (filtrado)' : ''}
          </Text>
          <FlashList
            data={filteredResults}
            renderItem={({ item }) => (
              <DrugCard
                drug={item.drug}
                onPress={() => {
                  addEntry(query);
                  navigation.navigate('DrugDetail', { drugId: item.drug.id });
                }}
                highlight={query}
                matchedCommercial={item.matchedCommercial}
              />
            )}
            keyExtractor={item => item.drug.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onScroll={handleTabBarScroll}
            scrollEventThrottle={16}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={48}
                  color={colors.textLight}
                  style={styles.emptyIcon}
                />
                <Text style={styles.emptyText}>
                  Sin resultados para "{query.trim()}"
                </Text>
                {results.length > 0 && (filterVia || filterPreg) ? (
                  <>
                    <Text style={styles.emptySubtext}>
                      {results.length} resultado
                      {results.length !== 1 ? 's' : ''} oculto
                      {results.length !== 1 ? 's' : ''} por los filtros activos
                    </Text>
                    <TouchableOpacity
                      style={styles.clearFiltersBtn}
                      onPress={() => {
                        setFilterVia(null);
                        setFilterPreg(null);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel="Quitar filtros activos"
                    >
                      <Text style={styles.clearFiltersText}>
                        Quitar filtros
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={styles.emptySubtext}>
                    Revisa la ortografía o prueba con el nombre genérico,
                    comercial o una indicación (ej: "hipertensión")
                  </Text>
                )}
              </View>
            }
          />
        </Animated.View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.suggestionsContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {history.length > 0 ? (
            <>
              <View style={styles.historyHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name="history"
                    size={18}
                    color={colors.text}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.suggestionsTitle}>
                    Búsquedas recientes
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={clearHistory}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityRole="button"
                  accessibilityLabel="Limpiar historial de búsquedas"
                >
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
                    accessibilityRole="button"
                    accessibilityLabel={`Buscar ${entry.query}. Mantén presionado para eliminar del historial`}
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
                {[
                  'Amoxicilina',
                  'Insulina',
                  'Omeprazol',
                  'Paracetamol',
                  'Heparina',
                ].map((term, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.suggestionChip}
                    onPress={() => search(term)}
                    accessibilityRole="button"
                    accessibilityLabel={`Buscar ${term}`}
                  >
                    <Text style={styles.suggestionText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {recentDrugObjs.length > 0 && (
            <>
              <View style={styles.recentDrugsHeader}>
                <MaterialCommunityIcons
                  name="pill"
                  size={18}
                  color={colors.text}
                  style={styles.recentDrugsHeaderIcon}
                />
                <Text style={styles.recentDrugsTitle}>
                  Consultados recientemente
                </Text>
              </View>
              <View style={styles.suggestionsGrid}>
                {recentDrugObjs.map(d => (
                  <TouchableOpacity
                    key={d.id}
                    style={styles.recentDrugChip}
                    onPress={() =>
                      navigation.navigate('DrugDetail', { drugId: d.id })
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Abrir ficha de ${d.nombre}`}
                  >
                    <View
                      style={[
                        styles.recentDrugDot,
                        {
                          backgroundColor:
                            UNIT_COLORS[d.unidadId] || colors.primary,
                        },
                      ]}
                    />
                    <Text style={styles.recentDrugText} numberOfLines={1}>
                      {d.nombre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.tipsContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={18}
                color={colors.text}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tipsTitle, { marginBottom: 0 }]}>
                Consejos de búsqueda
              </Text>
            </View>
            <Text style={styles.tipText}>
              • Busca por nombre genérico o comercial
            </Text>
            <Text style={styles.tipText}>
              • Busca por indicación (ej: "hipertensión")
            </Text>
            <Text style={styles.tipText}>
              • Busca por familia (ej: "penicilina")
            </Text>
            <Text style={styles.tipText}>
              • Mínimo 2 caracteres para buscar
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neuBackground,
    },
    header: {
      paddingBottom: rs.space(12),
      paddingHorizontal: rs.space(20),
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      marginTop: 2,
    },
    resultCount: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      marginHorizontal: rs.space(20),
      marginTop: 4,
      marginBottom: 4,
    },
    list: {
      paddingBottom: rs.space(32),
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: rs.space(60),
    },
    emptyIcon: {
      fontSize: rs.font(48),
      marginBottom: rs.space(12),
    },
    emptyText: {
      fontSize: rs.font(16),
      fontWeight: '600',
      color: colors.text,
    },
    emptySubtext: {
      fontSize: rs.font(13),
      color: colors.textLight,
      marginTop: 4,
    },
    suggestionsContainer: {
      padding: rs.space(20),
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rs.space(10),
    },
    clearHistoryText: {
      fontSize: rs.font(13),
      color: colors.error,
      fontWeight: '600',
    },
    suggestionsTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(10),
    },
    suggestionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: rs.space(8),
    },
    suggestionChip: {
      backgroundColor: colors.primaryLight + '15',
      paddingHorizontal: rs.space(14),
      paddingVertical: rs.space(8),
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primaryLight + '30',
    },
    suggestionText: {
      fontSize: rs.font(14),
      color: colors.primary,
      fontWeight: '500',
    },
    clearFiltersBtn: {
      marginTop: rs.space(14),
      paddingHorizontal: rs.space(18),
      paddingVertical: rs.space(9),
      borderRadius: 20,
      backgroundColor: colors.primary + '12',
      borderWidth: 1,
      borderColor: colors.primary + '35',
    },
    clearFiltersText: {
      fontSize: rs.font(13),
      color: colors.primary,
      fontWeight: '700',
    },
    recentDrugsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: rs.space(24),
      marginBottom: rs.space(10),
    },
    recentDrugsHeaderIcon: { marginRight: rs.space(6) },
    recentDrugsTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
    },
    recentDrugChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(8),
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      maxWidth: '100%',
    },
    recentDrugDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: rs.space(7),
    },
    recentDrugText: {
      fontSize: rs.font(14),
      color: colors.text,
      fontWeight: '600',
      flexShrink: 1,
    },
    tipsContainer: {
      marginTop: rs.space(24),
      ...neuCardSubtle(colors),
      padding: rs.space(16),
    },
    tipsTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(8),
    },
    tipText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      marginBottom: 4,
      lineHeight: rs.font(20),
    },
    filtersRow: {
      marginTop: 4,
      marginBottom: 2,
    },
    filtersScroll: {
      paddingHorizontal: rs.space(16),
      gap: rs.space(6),
      alignItems: 'center',
    },
    filterLabel: {
      fontSize: rs.font(11),
      fontWeight: '700',
      color: colors.textSecondary,
      marginRight: 4,
    },
    filterChip: {
      ...neuPill(colors),
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(5),
    },
    filterChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterChipText: {
      fontSize: rs.font(12),
      fontWeight: '600',
      color: colors.textSecondary,
    },
    filterChipTextActive: {
      color: '#FFFFFF',
    },
  });
