import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Drug } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { PREGNANCY_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { neuCardSubtle } from '../utils/neumorphism';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';
import { PremiumGate } from '../components/PremiumGate';

type Props = NativeStackScreenProps<RootStackParamList, 'DrugComparison'>;

const MAX_DRUGS = 3;

interface ComparisonRow {
  label: string;
  iconName: string;
  getValue: (drug: Drug) => string;
  highlight?: (value: string) => string | undefined;
}

const ROWS: ComparisonRow[] = [
  { label: 'Nombre genérico', iconName: 'pill', getValue: d => d.nombreGenerico },
  { label: 'Familia', iconName: 'tag-outline', getValue: d => d.familia },
  {
    label: 'Embarazo', iconName: 'human-pregnant',
    getValue: d => d.embarazo,
    highlight: v => PREGNANCY_COLORS[v],
  },
  { label: 'Vías', iconName: 'needle', getValue: d => d.viaAdministracion.join(', ') },
  { label: 'Dosis adulto', iconName: 'clipboard-list-outline', getValue: d => d.dosis.adulto },
  { label: 'Dosis pediátrica', iconName: 'baby-face-outline', getValue: d => d.dosis.pediatrico || '—' },
  { label: 'Contraindicaciones', iconName: 'cancel', getValue: d => d.contraindicaciones.slice(0, 3).join('; ') || '—' },
  { label: 'RAM principales', iconName: 'alert-outline', getValue: d => d.efectosAdversos.slice(0, 3).join('; ') || '—' },
  { label: 'Lactancia', iconName: 'mother-nursing', getValue: d => d.lactancia || '—' },
  { label: 'Clasificación', iconName: 'bookshelf', getValue: d => d.clasificacion },
];

export function DrugComparisonScreen({ route }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const { drugs } = useDrugData();

  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Preload drug if navigated with preloadDrugId
  useEffect(() => {
    const preloadId = route.params?.preloadDrugId;
    if (preloadId && drugs.length > 0) {
      const drug = drugs.find(d => d.id === preloadId);
      if (drug && !selectedDrugs.some(s => s.id === drug.id)) {
        setSelectedDrugs([drug]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.preloadDrugId, drugs]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    const q = normalizeText(searchQuery);
    return drugs
      .filter(d => !selectedDrugs.find(s => s.id === d.id))
      .filter(d => {
        const name = normalizeText(d.nombre);
        const generic = normalizeText(d.nombreGenerico);
        return name.includes(q) || generic.includes(q);
      })
      .slice(0, 8);
  }, [searchQuery, drugs, selectedDrugs]);

  const addDrug = useCallback((drug: Drug) => {
    if (selectedDrugs.length >= MAX_DRUGS) return;
    setSelectedDrugs(prev => [...prev, drug]);
    setSearchQuery('');
  }, [selectedDrugs]);

  const removeDrug = useCallback((drugId: string) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== drugId));
  }, []);

  return (
    <PremiumGate feature="Comparador de Fármacos">
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#0891B2" barStyle="light-content" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Comparador de Fármacos</Text>
        <Text style={styles.headerSubtitle}>Selecciona hasta {MAX_DRUGS} fármacos para comparar</Text>

        {/* Search */}
        {selectedDrugs.length < MAX_DRUGS && (
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={18} color="rgba(255,255,255,0.7)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar fármaco..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialCommunityIcons name="close" size={18} color="rgba(255,255,255,0.7)" style={{ padding: 4 }} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Selected chips */}
        {selectedDrugs.length > 0 && (
          <View style={styles.selectedChips}>
            {selectedDrugs.map(drug => (
              <TouchableOpacity
                key={drug.id}
                style={styles.selectedChip}
                onPress={() => removeDrug(drug.id)}
              >
                <Text style={styles.selectedChipText} numberOfLines={1}>{drug.nombre}</Text>
                <MaterialCommunityIcons name="close" size={14} color="rgba(255,255,255,0.7)" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Search Results */}
        {searchResults.length > 0 && (
          <View style={styles.searchResults}>
            {searchResults.map(drug => (
              <TouchableOpacity
                key={drug.id}
                style={styles.searchResultItem}
                onPress={() => addDrug(drug)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.searchResultName}>{drug.nombre}</Text>
                  <Text style={styles.searchResultGeneric}>{drug.nombreGenerico} · {drug.familia}</Text>
                </View>
                <Text style={styles.searchResultAdd}>+</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Comparison Table */}
        {selectedDrugs.length >= 2 && (
          <View style={styles.tableSection}>
            <Text style={styles.sectionTitle}>Comparativa</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View>
                {/* Column headers */}
                <View style={[styles.tableRow, styles.tableHeaderRow]}>
                  <View style={styles.tableLabelCell}>
                    <Text style={styles.tableLabelText}>Campo</Text>
                  </View>
                  {selectedDrugs.map(drug => (
                    <View key={drug.id} style={[styles.tableValueCell, { backgroundColor: colors.primary + '10' }]}>
                      <Text style={[styles.tableHeaderText, { color: colors.primary }]} numberOfLines={2}>{drug.nombre}</Text>
                    </View>
                  ))}
                </View>

                {/* Data rows */}
                {ROWS.map((row, i) => (
                  <View key={row.label} style={[styles.tableRow, i % 2 === 0 && { backgroundColor: colors.background }]}>
                    <View style={styles.tableLabelCell}>
                      <MaterialCommunityIcons name={row.iconName} size={14} color={colors.textSecondary} style={{ marginRight: 6 }} />
                      <Text style={styles.tableLabelText}>{row.label}</Text>
                    </View>
                    {selectedDrugs.map(drug => {
                      const value = row.getValue(drug);
                      const highlightColor = row.highlight?.(value);
                      return (
                        <View key={drug.id} style={styles.tableValueCell}>
                          <Text style={[
                            styles.tableValueText,
                            highlightColor ? { color: highlightColor, fontWeight: '700' } : null,
                          ]}>{value}</Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {selectedDrugs.length < 2 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="scale-balance" size={56} color={colors.textLight} style={{ marginBottom: 16 }} />
            <Text style={styles.emptyText}>Selecciona al menos 2 fármacos</Text>
            <Text style={styles.emptyHint}>Usa el buscador para añadir fármacos a la comparación</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
    </PremiumGate>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    backgroundColor: '#0891B2', paddingBottom: 16, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12, paddingHorizontal: 12, marginTop: 12,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 10 },
  clearSearch: { color: 'rgba(255,255,255,0.7)', fontSize: 16, padding: 4 },
  selectedChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  selectedChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, maxWidth: 180,
  },
  selectedChipText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600', flex: 1 },
  selectedChipRemove: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginLeft: 6 },
  scroll: { flex: 1 },
  searchResults: { paddingHorizontal: 16, paddingTop: 8 },
  searchResultItem: {
    ...neuCardSubtle(colors), flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 6,
  },
  searchResultName: { fontSize: 14, fontWeight: '700', color: colors.text },
  searchResultGeneric: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  searchResultAdd: { fontSize: 22, fontWeight: '700', color: colors.primary, paddingHorizontal: 8 },
  tableSection: { marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginHorizontal: 20, marginBottom: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tableHeaderRow: { borderBottomWidth: 2, borderBottomColor: colors.border },
  tableLabelCell: {
    width: 130, paddingHorizontal: 12, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center',
  },
  tableRowIcon: { fontSize: 14, marginRight: 6 },
  tableLabelText: { fontSize: 12, fontWeight: '700', color: colors.textSecondary },
  tableValueCell: { width: 160, paddingHorizontal: 10, paddingVertical: 10 },
  tableHeaderText: { fontSize: 13, fontWeight: '800', textAlign: 'center' },
  tableValueText: { fontSize: 12, color: colors.text, lineHeight: 17 },
  emptyState: { alignItems: 'center', paddingVertical: 80 },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: 13, color: colors.textSecondary, marginTop: 6, textAlign: 'center', paddingHorizontal: 40 },
});
