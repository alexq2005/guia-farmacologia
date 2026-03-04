import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Animated,
} from 'react-native';
import type { LabValue, LabCategory } from '../types';
import { LAB_COLORS, LAB_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import labValuesData from '../data/lab_values.json';

const LAB_CATEGORY_LABELS: Record<LabCategory, string> = {
  hematologia: 'Hematología',
  bioquimica: 'Bioquímica',
  coagulacion: 'Coagulación',
  hepatico: 'Hepático',
  renal: 'Renal',
  cardiaco: 'Cardíaco',
  endocrino: 'Endocrino',
  orina: 'Orina',
  gasometria: 'Gasometría',
};

const ALL_LAB_CATEGORIES: LabCategory[] = [
  'hematologia', 'bioquimica', 'coagulacion', 'hepatico',
  'renal', 'cardiaco', 'endocrino', 'orina', 'gasometria',
];

function RangeBar({ label, range, colors }: { label: string; range: { min: number; max: number; unidad: string }; colors: ThemeColors }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      <Text style={{ fontSize: 12, color: colors.textSecondary, width: 90 }}>{label}</Text>
      <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: colors.text }}>
          {range.min} – {range.max} {range.unidad}
        </Text>
      </View>
    </View>
  );
}

export function LabValuesScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const labValues = labValuesData as LabValue[];

  const [selectedCategory, setSelectedCategory] = useState<LabCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = labValues;
    if (selectedCategory !== 'all') {
      result = result.filter(v => v.categoria === selectedCategory);
    }
    if (searchQuery.trim().length >= 2) {
      const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      result = result.filter(v => {
        const name = v.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const abbr = v.abreviatura.toLowerCase();
        return name.includes(q) || abbr.includes(q);
      });
    }
    return result;
  }, [labValues, selectedCategory, searchQuery]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Valores de Laboratorio</Text>
        <Text style={styles.headerSubtitle}>{labValues.length} valores de referencia clínica</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar valor..."
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
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

        {filtered.map(value => {
          const isExpanded = expandedIds.has(value.id);
          const catColor = LAB_COLORS[value.categoria];
          return (
            <TouchableOpacity
              key={value.id}
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
                  {/* Ranges */}
                  <Text style={styles.sectionLabel}>RANGOS NORMALES</Text>
                  {value.rangos.adulto && (
                    <RangeBar label="Adulto" range={value.rangos.adulto} colors={colors} />
                  )}
                  {value.rangos.adultoHombre && (
                    <RangeBar label="♂ Hombre" range={value.rangos.adultoHombre} colors={colors} />
                  )}
                  {value.rangos.adultoMujer && (
                    <RangeBar label="♀ Mujer" range={value.rangos.adultoMujer} colors={colors} />
                  )}
                  {value.rangos.pediatrico && (
                    <RangeBar label="👶 Pediátrico" range={value.rangos.pediatrico} colors={colors} />
                  )}

                  {/* Significance */}
                  <View style={styles.significanceRow}>
                    <View style={[styles.significanceBox, { backgroundColor: '#DC262610', borderColor: '#DC262630' }]}>
                      <Text style={[styles.sigLabel, { color: '#DC2626' }]}>↑ ELEVADO</Text>
                      <Text style={styles.sigText}>{value.significadoAlto}</Text>
                    </View>
                    <View style={[styles.significanceBox, { backgroundColor: '#2563EB10', borderColor: '#2563EB30' }]}>
                      <Text style={[styles.sigLabel, { color: '#2563EB' }]}>↓ DISMINUIDO</Text>
                      <Text style={styles.sigText}>{value.significadoBajo}</Text>
                    </View>
                  </View>

                  {/* Drugs that alter */}
                  {value.farmacosAlteran.length > 0 && (
                    <>
                      <Text style={styles.sectionLabel}>FÁRMACOS QUE ALTERAN</Text>
                      <View style={styles.tagsRow}>
                        {value.farmacosAlteran.map((f, i) => (
                          <View key={i} style={styles.drugTag}>
                            <Text style={styles.drugTagText}>💊 {f}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}

                  {/* Nursing implications */}
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
        })}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔬</Text>
            <Text style={styles.emptyText}>No se encontraron valores</Text>
            <Text style={styles.emptyHint}>Intenta con otro término de búsqueda</Text>
          </View>
        )}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ Los rangos de referencia pueden variar según el laboratorio y el método de análisis. Siempre consultar con los valores de referencia del laboratorio local.
          </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: '#2563EB', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20,
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
  scroll: { flex: 1 },
  chipsScroll: { maxHeight: 50 },
  chipsContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 8, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    backgroundColor: colors.surface, elevation: 1, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  chipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: 13, color: colors.textSecondary, marginHorizontal: 20, marginBottom: 8 },
  labCard: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 14, padding: 16, elevation: 2,
    shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: 24, marginRight: 10 },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  cardAbbr: { fontSize: 12, fontWeight: '600', marginTop: 1 },
  cardBadge: { alignItems: 'center', marginRight: 8 },
  cardBadgeText: { fontSize: 13, fontWeight: '800' },
  cardBadgeUnit: { fontSize: 9, color: colors.textLight },
  chevron: { fontSize: 10, color: colors.textLight, transform: [{ rotate: '0deg' }] },
  chevronExpanded: { transform: [{ rotate: '180deg' }] },
  expandedContent: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.borderLight },
  sectionLabel: {
    fontSize: 10, fontWeight: '700', color: colors.textLight, letterSpacing: 1,
    marginTop: 12, marginBottom: 8,
  },
  significanceRow: { gap: 8, marginTop: 4 },
  significanceBox: {
    padding: 10, borderRadius: 10, borderWidth: 1, marginBottom: 4,
  },
  sigLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5, marginBottom: 4 },
  sigText: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  drugTag: {
    backgroundColor: colors.background, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, borderWidth: 1, borderColor: colors.borderLight,
  },
  drugTagText: { fontSize: 11, color: colors.text, fontWeight: '500' },
  nursingRow: { flexDirection: 'row', marginBottom: 4, paddingRight: 8 },
  nursingBullet: { fontSize: 13, color: colors.primary, marginRight: 6, marginTop: 1 },
  nursingText: { fontSize: 12, color: colors.textSecondary, lineHeight: 17, flex: 1 },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  disclaimer: {
    marginHorizontal: 16, marginTop: 16, backgroundColor: colors.surface,
    padding: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.borderLight,
  },
  disclaimerText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});
