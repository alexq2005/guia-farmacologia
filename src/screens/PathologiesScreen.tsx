import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, PathologyCategory, Pathology } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { PATHOLOGY_COLORS, PATHOLOGY_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';
import { PATHOLOGY_CATEGORY_LABELS as CATEGORY_LABELS } from '../utils/labels';
import { neuCard, neuPill } from '../utils/neumorphism';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

const ALL_CATEGORIES: PathologyCategory[] = [
  'cardiovascular', 'respiratorio', 'neurologico', 'gastrointestinal',
  'endocrino', 'infeccioso', 'renal', 'hematologico',
  'psiquiatrico', 'obstetrico', 'musculoesqueletico', 'emergencia',
];

export function PathologiesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const { pathologies } = useDrugData();
  const [selectedCategory, setSelectedCategory] = useState<PathologyCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = pathologies;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categoria === selectedCategory);
    }
    if (searchQuery.trim().length >= 2) {
      const q = normalizeText(searchQuery);
      result = result.filter(p => {
        const name = normalizeText(p.nombre);
        const def = normalizeText(p.definicion);
        return name.includes(q) || def.includes(q);
      });
    }
    return result;
  }, [pathologies, selectedCategory, searchQuery]);

  const renderItem = useCallback(({ item: pathology }: { item: Pathology }) => (
    <TouchableOpacity
      style={[styles.pathologyCard, { borderLeftColor: PATHOLOGY_COLORS[pathology.categoria] }]}
      onPress={() => navigation.navigate('PathologyDetail', { pathologyId: pathology.id })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={PATHOLOGY_ICONS[pathology.categoria] || 'clipboard-text-outline'} size={28} color={PATHOLOGY_COLORS[pathology.categoria]} style={{ marginRight: 12 }} />
        <View style={styles.cardTitleArea}>
          <Text style={styles.cardTitle}>{pathology.nombre}</Text>
          <Text style={[styles.cardCategory, { color: PATHOLOGY_COLORS[pathology.categoria] }]}>
            {CATEGORY_LABELS[pathology.categoria]}
          </Text>
        </View>
        <View style={styles.drugCountBadge}>
          <Text style={styles.drugCountText}>{pathology.farmacosRelacionados.length}</Text>
          <Text style={styles.drugCountLabel}>fármacos</Text>
        </View>
      </View>
      <Text style={styles.cardDefinition} numberOfLines={2}>{pathology.definicion}</Text>
      <View style={styles.cardFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="alert-outline" size={13} color={colors.warning} />
          <Text style={[styles.cardAlarmCount, { marginLeft: 3 }]}>{pathology.criteriosAlarma.length} criterios de alarma</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  ), [styles, navigation]);

  const ListHeader = useMemo(() => (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsContainer}>
        <TouchableOpacity
          style={[styles.chip, selectedCategory === 'all' && styles.chipActive]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[styles.chipText, selectedCategory === 'all' && styles.chipTextActive]}>
            Todas ({pathologies.length})
          </Text>
        </TouchableOpacity>
        {ALL_CATEGORIES.map(cat => {
          const count = pathologies.filter(p => p.categoria === cat).length;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && { backgroundColor: PATHOLOGY_COLORS[cat] }]}
              onPress={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name={PATHOLOGY_ICONS[cat] || 'clipboard-text-outline'} size={14} color={selectedCategory === cat ? '#FFFFFF' : colors.textSecondary} style={{ marginRight: 4 }} />
                <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                  {CATEGORY_LABELS[cat]} ({count})
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {searchQuery.length >= 2 && (
        <Text style={styles.resultCount}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</Text>
      )}
    </>
  ), [selectedCategory, searchQuery, filtered.length, pathologies.length, styles]);

  const ListEmpty = useMemo(() => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name="magnify" size={48} color={colors.textLight} />
      <Text style={styles.emptyText}>No se encontraron patologías</Text>
      <Text style={styles.emptyHint}>Intenta con otro término de búsqueda</Text>
    </View>
  ), [styles]);

  const keyExtractor = useCallback((item: Pathology) => item.id, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#0F766E" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Patologías</Text>
        <Text style={styles.headerSubtitle}>{pathologies.length} patologías con fármacos vinculados</Text>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={18} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar patología..."
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
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: { backgroundColor: '#0F766E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, paddingHorizontal: 12, marginTop: 12 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 10 },
  clearBtn: { color: 'rgba(255,255,255,0.7)', fontSize: 16, padding: 4 },
  chipsScroll: {},
  chipsContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 8, flexDirection: 'row', paddingRight: 24 },
  chip: { ...neuPill(colors), paddingHorizontal: 12, paddingVertical: 6 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  chipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: 13, color: colors.textSecondary, marginHorizontal: 20, marginBottom: 8 },
  pathologyCard: { ...neuCard(colors), marginHorizontal: 16, marginBottom: 10, padding: 16, borderLeftWidth: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardIcon: { fontSize: 28, marginRight: 12 },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardCategory: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  drugCountBadge: { backgroundColor: colors.background, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, alignItems: 'center' },
  drugCountText: { fontSize: 16, fontWeight: '800', color: colors.primary },
  drugCountLabel: { fontSize: 9, color: colors.textLight },
  cardDefinition: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  cardAlarmCount: { fontSize: 11, color: colors.warning },
  cardArrow: { fontSize: 16, color: colors.textLight },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
