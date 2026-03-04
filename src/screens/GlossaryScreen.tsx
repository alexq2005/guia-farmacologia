import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import type { GlossaryEntry } from '../types';
import { SearchBar } from '../components/SearchBar';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import glossaryData from '../data/glossary.json';

const CATEGORY_COLORS: Record<string, string> = {
  farmacologia: '#3B82F6',
  anatomia: '#DC2626',
  enfermeria: '#7C3AED',
  abreviatura: '#EA580C',
  general: '#6B7280',
};

const CATEGORY_LABELS: Record<string, string> = {
  farmacologia: 'Farmacología',
  anatomia: 'Anatomía',
  enfermeria: 'Enfermería',
  abreviatura: 'Abreviatura',
  general: 'General',
};

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function GlossaryScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
      <StatusBar backgroundColor="#7C3AED" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>📖 Glosario</Text>
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

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: '#7C3AED',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  categoryChipText: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  categoryChipTextActive: { color: colors.primary },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  sectionLetter: { fontSize: 18, fontWeight: '800', color: colors.primary },
  glossaryCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 14,
    borderRadius: 12,
    elevation: 1,
  },
  glossaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  glossaryTerm: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 },
  abbrBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  abbrText: { fontSize: 11, fontWeight: '700' },
  glossaryDefinition: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 8,
  },
  categoryTagText: { fontSize: 10, fontWeight: '700' },
  list: { paddingBottom: 32 },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: colors.textLight },
});