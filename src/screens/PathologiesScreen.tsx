import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
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
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

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
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
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
      <StatusBar backgroundColor="#0F766E" barStyle={isDark ? 'light-content' : 'dark-content'} />
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

      <FlashList
        data={filtered}
        renderItem={renderItem}
        estimatedItemSize={150}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: { backgroundColor: '#0F766E', paddingTop: rs.space(16), paddingBottom: rs.space(20), paddingHorizontal: rs.space(20), borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, paddingHorizontal: rs.space(12), marginTop: rs.space(12) },
  searchIcon: { fontSize: rs.font(16), marginRight: rs.space(8) },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: rs.font(15), paddingVertical: rs.space(10) },
  clearBtn: { color: 'rgba(255,255,255,0.7)', fontSize: rs.font(16), padding: 4 },
  chipsScroll: {},
  chipsContainer: { paddingHorizontal: rs.space(16), paddingVertical: rs.space(12), gap: rs.space(8), flexDirection: 'row', paddingRight: rs.space(24) },
  chip: { ...neuPill(colors), paddingHorizontal: rs.space(12), paddingVertical: rs.space(6) },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: rs.font(12), fontWeight: '600', color: colors.textSecondary },
  chipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: rs.font(13), color: colors.textSecondary, marginHorizontal: rs.space(20), marginBottom: rs.space(8) },
  pathologyCard: { ...neuCard(colors), marginHorizontal: rs.space(16), marginBottom: rs.space(10), padding: rs.space(16), borderLeftWidth: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(8) },
  cardIcon: { fontSize: rs.font(28), marginRight: rs.space(12) },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: rs.font(16), fontWeight: '700', color: colors.text },
  cardCategory: { fontSize: rs.font(11), fontWeight: '600', marginTop: 2 },
  drugCountBadge: { backgroundColor: colors.background, borderRadius: 10, paddingHorizontal: rs.space(10), paddingVertical: 4, alignItems: 'center' },
  drugCountText: { fontSize: rs.font(16), fontWeight: '800', color: colors.primary },
  drugCountLabel: { fontSize: rs.font(11), color: colors.textLight },
  cardDefinition: { fontSize: rs.font(13), color: colors.textSecondary, lineHeight: rs.font(18) },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: rs.space(10) },
  cardAlarmCount: { fontSize: rs.font(11), color: colors.warning },
  cardArrow: { fontSize: rs.font(16), color: colors.textLight },
  emptyState: { alignItems: 'center', paddingVertical: rs.space(60) },
  emptyIcon: { fontSize: rs.font(48), marginBottom: rs.space(12) },
  emptyText: { fontSize: rs.font(16), fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: rs.font(13), color: colors.textSecondary, marginTop: 4 },
});
