import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Animated,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, ClinicalScale } from '../types';
import { SCALE_COLORS, SCALE_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';
import { SCALE_CATEGORY_LABELS as CATEGORY_LABELS } from '../utils/labels';
import scalesData from '../data/clinical_scales.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

type ScaleCat = ClinicalScale['categoria'];

const TYPE_LABELS: Record<string, string> = {
  components: 'Componentes',
  selector: 'Selector',
  checklist: 'Checklist',
};

const TYPE_ICONS: Record<string, string> = {
  components: '🔢',
  selector: '📋',
  checklist: '✅',
};

export function ClinicalScalesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const scales = scalesData as ClinicalScale[];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ScaleCat | 'all'>('all');

  const categories = useMemo(() => {
    const cats = new Set(scales.map(s => s.categoria));
    return Array.from(cats);
  }, [scales]);

  const filtered = useMemo(() => {
    let result = scales;
    if (selectedCategory !== 'all') {
      result = result.filter(s => s.categoria === selectedCategory);
    }
    if (searchQuery.trim().length >= 2) {
      const q = normalizeText(searchQuery);
      result = result.filter(s => {
        const name = normalizeText(s.nombre);
        const abbr = s.abreviatura.toLowerCase();
        return name.includes(q) || abbr.includes(q);
      });
    }
    return result;
  }, [scales, selectedCategory, searchQuery]);

  const renderItem = useCallback(({ item: scale }: { item: ClinicalScale }) => {
    const catColor = SCALE_COLORS[scale.categoria] || '#7C3AED';
    return (
      <TouchableOpacity
        style={[styles.scaleCard, { borderLeftColor: catColor }]}
        onPress={() => navigation.navigate('ScaleDetail', { scaleId: scale.id })}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{SCALE_ICONS[scale.categoria] || '📊'}</Text>
          <View style={styles.cardTitleArea}>
            <Text style={styles.cardTitle}>{scale.nombre}</Text>
            <Text style={[styles.cardAbbr, { color: catColor }]}>{scale.abreviatura}</Text>
          </View>
          <View style={styles.cardMeta}>
            <View style={[styles.typeBadge, { backgroundColor: catColor + '18' }]}>
              <Text style={[styles.typeText, { color: catColor }]}>
                {TYPE_ICONS[scale.tipo]} {TYPE_LABELS[scale.tipo]}
              </Text>
            </View>
            <Text style={styles.rangeText}>
              {scale.rangoTotal[0]}–{scale.rangoTotal[1]} pts
            </Text>
          </View>
        </View>
        <Text style={styles.cardDesc} numberOfLines={2}>{scale.descripcion}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardContext} numberOfLines={1}>{scale.contextoClinico}</Text>
          <Text style={styles.cardArrow}>→</Text>
        </View>
      </TouchableOpacity>
    );
  }, [styles, navigation]);

  const ListHeader = useMemo(() => (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chipsContainer}
      >
        <TouchableOpacity
          style={[styles.chip, selectedCategory === 'all' && styles.chipActive]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[styles.chipText, selectedCategory === 'all' && styles.chipTextActive]}>
            Todas ({scales.length})
          </Text>
        </TouchableOpacity>
        {categories.map(cat => {
          const count = scales.filter(s => s.categoria === cat).length;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && { backgroundColor: SCALE_COLORS[cat] }]}
              onPress={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {SCALE_ICONS[cat] || '📊'} {CATEGORY_LABELS[cat] || cat} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {searchQuery.length >= 2 && (
        <Text style={styles.resultCount}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</Text>
      )}
    </>
  ), [selectedCategory, searchQuery, filtered.length, scales.length, categories, styles]);

  const ListEmpty = useMemo(() => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyText}>No se encontraron escalas</Text>
      <Text style={styles.emptyHint}>Intenta con otro término de búsqueda</Text>
    </View>
  ), [styles]);

  const keyExtractor = useCallback((item: ClinicalScale) => item.id, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#7C3AED" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escalas Clínicas</Text>
        <Text style={styles.headerSubtitle}>{scales.length} escalas interactivas de valoración</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar escala..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: '#7C3AED', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20,
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
  chipsScroll: {},
  chipsContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 8, flexDirection: 'row', paddingRight: 24 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    backgroundColor: colors.surface, elevation: 1, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  chipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: 13, color: colors.textSecondary, marginHorizontal: 20, marginBottom: 8 },
  scaleCard: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 14, padding: 16, elevation: 2,
    shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardIcon: { fontSize: 28, marginRight: 12 },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardAbbr: { fontSize: 12, fontWeight: '600', marginTop: 1 },
  cardMeta: { alignItems: 'flex-end' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginBottom: 4 },
  typeText: { fontSize: 10, fontWeight: '700' },
  rangeText: { fontSize: 11, color: colors.textLight, fontWeight: '600' },
  cardDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  cardContext: { fontSize: 11, color: colors.textLight, flex: 1, fontStyle: 'italic' },
  cardArrow: { fontSize: 16, color: colors.textLight },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
