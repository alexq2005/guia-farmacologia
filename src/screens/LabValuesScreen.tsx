import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { LabValue, LabCategory } from '../types';
import { LAB_COLORS, LAB_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';
import { LAB_CATEGORY_LABELS } from '../utils/labels';
import { PremiumGate } from '../components/PremiumGate';
import labValuesData from '../data/lab_values.json';
import { neuCard, neuPill } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

const ALL_LAB_CATEGORIES: LabCategory[] = [
  'hematologia', 'bioquimica', 'coagulacion', 'hepatico',
  'renal', 'cardiaco', 'endocrino', 'orina', 'gasometria',
];

function RangeBar({ label, range, colors, iconName }: { label: string; range: { min: number; max: number; unidad: string }; colors: ThemeColors; iconName?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: 90 }}>
        {iconName && <MaterialCommunityIcons name={iconName} size={13} color={colors.textSecondary} style={{ marginRight: 3 }} />}
        <Text style={{ fontSize: 12, color: colors.textSecondary }}>{label}</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: colors.text }}>
          {range.min} – {range.max} {range.unidad}
        </Text>
      </View>
    </View>
  );
}

export function LabValuesScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const labValues = labValuesData as LabValue[];

  const [selectedCategory, setSelectedCategory] = useState<LabCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let result = labValues;
    if (selectedCategory !== 'all') {
      result = result.filter(v => v.categoria === selectedCategory);
    }
    if (searchQuery.trim().length >= 2) {
      const q = normalizeText(searchQuery);
      result = result.filter(v => {
        const name = normalizeText(v.nombre);
        const abbr = v.abreviatura.toLowerCase();
        return name.includes(q) || abbr.includes(q);
      });
    }
    return result;
  }, [labValues, selectedCategory, searchQuery]);

  const renderItem = useCallback(({ item: value }: { item: LabValue }) => {
    const isExpanded = expandedIds.has(value.id);
    const catColor = LAB_COLORS[value.categoria];
    return (
      <TouchableOpacity
        style={[styles.labCard, { borderLeftColor: catColor }]}
        onPress={() => toggleExpand(value.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{LAB_ICONS[value.categoria]}</Text>
          <View style={styles.cardTitleArea}>
            <Text style={styles.cardTitle}>{value.nombre}</Text>
            <Text style={[styles.cardAbbr, { color: catColor }]}>{value.abreviatura}</Text>
          </View>
          <View style={styles.cardBadge}>
            <Text style={[styles.cardBadgeText, { color: catColor }]}>
              {value.rangos.adulto
                ? `${value.rangos.adulto.min}-${value.rangos.adulto.max}`
                : value.rangos.adultoHombre
                  ? `${value.rangos.adultoHombre.min}-${value.rangos.adultoHombre.max}`
                  : '—'}
            </Text>
            <Text style={styles.cardBadgeUnit}>
              {value.rangos.adulto?.unidad || value.rangos.adultoHombre?.unidad || ''}
            </Text>
          </View>
          <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>▼</Text>
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.sectionLabel}>RANGOS NORMALES</Text>
            {value.rangos.adulto && (
              <RangeBar label="Adulto" range={value.rangos.adulto} colors={colors} />
            )}
            {value.rangos.adultoHombre && (
              <RangeBar label="Hombre" range={value.rangos.adultoHombre} colors={colors} iconName="gender-male" />
            )}
            {value.rangos.adultoMujer && (
              <RangeBar label="Mujer" range={value.rangos.adultoMujer} colors={colors} iconName="gender-female" />
            )}
            {value.rangos.pediatrico && (
              <RangeBar label="Pediátrico" range={value.rangos.pediatrico} colors={colors} />
            )}

            <View style={styles.significanceRow}>
              <View style={[styles.significanceBox, { backgroundColor: colors.error + '10', borderColor: colors.error + '30' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="arrow-up-bold" size={14} color={colors.error} style={{ marginRight: 3 }} />
                  <Text style={[styles.sigLabel, { color: colors.error }]}>ELEVADO</Text>
                </View>
                <Text style={styles.sigText}>{value.significadoAlto}</Text>
              </View>
              <View style={[styles.significanceBox, { backgroundColor: colors.info + '10', borderColor: colors.info + '30' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="arrow-down-bold" size={14} color={colors.info} style={{ marginRight: 3 }} />
                  <Text style={[styles.sigLabel, { color: colors.info }]}>DISMINUIDO</Text>
                </View>
                <Text style={styles.sigText}>{value.significadoBajo}</Text>
              </View>
            </View>

            {value.farmacosAlteran.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>FÁRMACOS QUE ALTERAN</Text>
                <View style={styles.tagsRow}>
                  {value.farmacosAlteran.map((f, i) => (
                    <View key={i} style={styles.drugTag}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="pill" size={12} color={colors.text} style={{ marginRight: 3 }} />
                        <Text style={styles.drugTagText}>{f}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}

            {value.implicacionesEnfermeria.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>IMPLICACIONES DE ENFERMERÍA</Text>
                {value.implicacionesEnfermeria.map((imp, i) => (
                  <View key={i} style={styles.nursingRow}>
                    <Text style={styles.nursingBullet}>•</Text>
                    <Text style={styles.nursingText}>{imp}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }, [expandedIds, colors, styles, toggleExpand]);

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
            Todos ({labValues.length})
          </Text>
        </TouchableOpacity>
        {ALL_LAB_CATEGORIES.map(cat => {
          const count = labValues.filter(v => v.categoria === cat).length;
          if (count === 0) return null;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && { backgroundColor: LAB_COLORS[cat] }]}
              onPress={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {LAB_ICONS[cat]} {LAB_CATEGORY_LABELS[cat]} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {searchQuery.length >= 2 && (
        <Text style={styles.resultCount}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</Text>
      )}
    </>
  ), [selectedCategory, searchQuery, filtered.length, labValues.length, styles, colors]);

  const ListFooter = useMemo(() => (
    <View style={styles.disclaimer}>
      <Text style={styles.disclaimerText}>
Los rangos de referencia pueden variar según el laboratorio y el método de análisis. Siempre consultar con los valores de referencia del laboratorio local.
      </Text>
    </View>
  ), [styles]);

  const ListEmpty = useMemo(() => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name="microscope" size={48} color={colors.textLight} />
      <Text style={styles.emptyText}>No se encontraron valores</Text>
      <Text style={styles.emptyHint}>Intenta con otro término de búsqueda</Text>
    </View>
  ), [styles]);

  const keyExtractor = useCallback((item: LabValue) => item.id, []);

  return (
    <PremiumGate feature="Valores de Laboratorio">
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#2563EB" barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Valores de Laboratorio</Text>
        <Text style={styles.headerSubtitle}>{labValues.length} valores de referencia clínica</Text>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={18} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar valor..."
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
        ListFooterComponent={filtered.length > 0 ? ListFooter : undefined}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        extraData={expandedIds}
      />
    </Animated.View>
    </PremiumGate>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    backgroundColor: '#2563EB', paddingTop: rs.space(16), paddingBottom: rs.space(20), paddingHorizontal: rs.space(20),
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12, paddingHorizontal: rs.space(12), marginTop: rs.space(12),
  },
  searchIcon: { fontSize: rs.font(16), marginRight: rs.space(8) },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: rs.font(15), paddingVertical: rs.space(10) },
  clearSearch: { color: 'rgba(255,255,255,0.7)', fontSize: rs.font(16), padding: 4 },
  chipsScroll: {},
  chipsContainer: { paddingHorizontal: rs.space(16), paddingVertical: rs.space(12), gap: rs.space(8), flexDirection: 'row', paddingRight: rs.space(24) },
  chip: { ...neuPill(colors), paddingHorizontal: rs.space(12), paddingVertical: rs.space(6) },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: rs.font(12), fontWeight: '600', color: colors.textSecondary },
  chipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: rs.font(13), color: colors.textSecondary, marginHorizontal: rs.space(20), marginBottom: rs.space(8) },
  labCard: { ...neuCard(colors), marginHorizontal: rs.space(16), marginBottom: rs.space(10), padding: rs.space(16), borderLeftWidth: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: rs.font(24), marginRight: rs.space(10) },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: rs.font(15), fontWeight: '700', color: colors.text },
  cardAbbr: { fontSize: rs.font(12), fontWeight: '600', marginTop: 1 },
  cardBadge: { alignItems: 'center', marginRight: rs.space(8) },
  cardBadgeText: { fontSize: rs.font(13), fontWeight: '800' },
  cardBadgeUnit: { fontSize: rs.font(11), color: colors.textLight },
  chevron: { fontSize: rs.font(10), color: colors.textLight, transform: [{ rotate: '0deg' }] },
  chevronExpanded: { transform: [{ rotate: '180deg' }] },
  expandedContent: { marginTop: rs.space(14), paddingTop: rs.space(14), borderTopWidth: 1, borderTopColor: colors.borderLight },
  sectionLabel: {
    fontSize: rs.font(10), fontWeight: '700', color: colors.textLight, letterSpacing: 1,
    marginTop: rs.space(12), marginBottom: rs.space(8),
  },
  significanceRow: { gap: rs.space(8), marginTop: 4 },
  significanceBox: {
    padding: rs.space(10), borderRadius: 10, borderWidth: 1, marginBottom: 4,
  },
  sigLabel: { fontSize: rs.font(10), fontWeight: '800', letterSpacing: 0.5, marginBottom: 4 },
  sigText: { fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(17) },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: rs.space(6) },
  drugTag: {
    backgroundColor: colors.background, paddingHorizontal: rs.space(10), paddingVertical: 4,
    borderRadius: 8, borderWidth: 1, borderColor: colors.borderLight,
  },
  drugTagText: { fontSize: rs.font(11), color: colors.text, fontWeight: '500' },
  nursingRow: { flexDirection: 'row', marginBottom: 4, paddingRight: rs.space(8) },
  nursingBullet: { fontSize: rs.font(13), color: colors.primary, marginRight: rs.space(6), marginTop: 1 },
  nursingText: { fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(17), flex: 1 },
  emptyState: { alignItems: 'center', paddingVertical: rs.space(60) },
  emptyIcon: { fontSize: rs.font(48), marginBottom: rs.space(12) },
  emptyText: { fontSize: rs.font(16), fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: rs.font(13), color: colors.textSecondary, marginTop: 4 },
  disclaimer: {
    marginHorizontal: rs.space(16), marginTop: rs.space(16), backgroundColor: colors.surface,
    padding: rs.space(14), borderRadius: 12, borderWidth: 1, borderColor: colors.borderLight,
  },
  disclaimerText: { fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(18) },
});
