import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { GlossaryEntry } from '../types';
import { SearchBar } from '../components/SearchBar';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import glossaryData from '../data/glossary.json';
import { normalizeText as normalize } from '../utils/search';
import { GLOSSARY_CATEGORY_LABELS as CATEGORY_LABELS } from '../utils/labels';
import { neuCardSubtle, neuPill } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

const CATEGORY_COLORS: Record<string, string> = {
  farmacologia: '#3B82F6',
  anatomia: '#DC2626',
  enfermeria: '#7C3AED',
  abreviatura: '#EA580C',
  general: '#6B7280',
};

export function GlossaryScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['farmacologia', 'anatomia', 'enfermeria', 'abreviatura', 'general'];

  const filteredSections = useMemo(() => {
    let entries = glossaryData as GlossaryEntry[];

    if (selectedCategory) {
      entries = entries.filter(e => e.categoria === selectedCategory);
    }

    if (query.length >= 2) {
      const normalized = normalize(query);
      entries = entries.filter(
        e =>
          normalize(e.termino).includes(normalized) ||
          normalize(e.definicion).includes(normalized) ||
          (e.abreviatura && normalize(e.abreviatura).includes(normalized))
      );
    }

    const grouped: Record<string, GlossaryEntry[]> = {};
    entries.forEach(entry => {
      const letter = entry.termino[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(entry);
    });

    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        title: letter,
        data: grouped[letter].sort((a, b) => a.termino.localeCompare(b.termino)),
      }));
  }, [query, selectedCategory]);

  const totalEntries = (glossaryData as GlossaryEntry[]).length;

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#7C3AED" barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="book-open-variant" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Glosario</Text>
        </View>
        <Text style={styles.headerSubtitle}>{totalEntries} términos y abreviaturas</Text>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        placeholder="Buscar término..."
      />

      <View style={styles.categoryRow}>
        <TouchableOpacity
          style={[styles.categoryChip, !selectedCategory && styles.categoryChipActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.categoryChipText, !selectedCategory && styles.categoryChipTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && {
                backgroundColor: CATEGORY_COLORS[cat] + '20',
                borderColor: CATEGORY_COLORS[cat],
              },
            ]}
            onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === cat && { color: CATEGORY_COLORS[cat] },
              ]}
            >
              {CATEGORY_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionList
        sections={filteredSections}
        keyExtractor={(item, i) => item.termino + i}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLetter}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.glossaryCard}>
            <View style={styles.glossaryHeader}>
              <Text style={styles.glossaryTerm}>{item.termino}</Text>
              {item.abreviatura && (
                <View style={[styles.abbrBadge, { backgroundColor: (CATEGORY_COLORS[item.categoria] || '#6B7280') + '15' }]}>
                  <Text style={[styles.abbrText, { color: CATEGORY_COLORS[item.categoria] || '#6B7280' }]}>
                    {item.abreviatura}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.glossaryDefinition}>{item.definicion}</Text>
            <View style={[styles.categoryTag, { backgroundColor: (CATEGORY_COLORS[item.categoria] || '#6B7280') + '10' }]}>
              <Text style={[styles.categoryTagText, { color: CATEGORY_COLORS[item.categoria] || '#6B7280' }]}>
                {CATEGORY_LABELS[item.categoria] || item.categoria}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron términos</Text>
          </View>
        }
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    backgroundColor: '#7C3AED',
    paddingTop: rs.space(16),
    paddingBottom: rs.space(20),
    paddingHorizontal: rs.space(20),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: rs.space(16),
    paddingVertical: rs.space(8),
    gap: rs.space(6),
  },
  categoryChip: { ...neuPill(colors), paddingHorizontal: rs.space(12), paddingVertical: rs.space(6) },
  categoryChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  categoryChipText: { fontSize: rs.font(12), color: colors.textSecondary, fontWeight: '600' },
  categoryChipTextActive: { color: colors.primary },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingHorizontal: rs.space(20),
    paddingVertical: rs.space(6),
  },
  sectionLetter: { fontSize: rs.font(18), fontWeight: '800', color: colors.primary },
  glossaryCard: { ...neuCardSubtle(colors), marginHorizontal: rs.space(16), marginVertical: 4, padding: rs.space(14) },
  glossaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs.space(6),
  },
  glossaryTerm: { fontSize: rs.font(16), fontWeight: '700', color: colors.text, flex: 1 },
  abbrBadge: {
    paddingHorizontal: rs.space(8),
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: rs.space(8),
  },
  abbrText: { fontSize: rs.font(11), fontWeight: '700' },
  glossaryDefinition: { fontSize: rs.font(13), color: colors.textSecondary, lineHeight: rs.font(20) },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: rs.space(8),
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: rs.space(8),
  },
  categoryTagText: { fontSize: rs.font(10), fontWeight: '700' },
  list: { paddingBottom: rs.space(32) },
  emptyContainer: { padding: rs.space(40), alignItems: 'center' },
  emptyText: { fontSize: rs.font(16), color: colors.textLight },
});