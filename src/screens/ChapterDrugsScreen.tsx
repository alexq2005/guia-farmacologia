import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import { normalizeText } from '../utils/search';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { neuInset } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'ChapterDrugs'>;

export function ChapterDrugsScreen({ route, navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const { chapterId, unitName, unitColor } = route.params;
  const { getDrugsByChapter, getChapterById } = useDrugData();
  const [filter, setFilter] = useState('');

  const chapter = getChapterById(chapterId);
  const allDrugs = getDrugsByChapter(chapterId);

  const drugs = useMemo(() => {
    if (filter.length < 2) return allDrugs;
    const norm = normalizeText(filter);
    return allDrugs.filter(d =>
      normalizeText(d.nombre).includes(norm) ||
      normalizeText(d.nombreGenerico).includes(norm) ||
      d.nombresComerciales.some(c => normalizeText(c).includes(norm))
    );
  }, [allDrugs, filter]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={unitColor} barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { backgroundColor: unitColor }]}>
        <Text style={styles.unitName}>{unitName}</Text>
        <Text style={styles.chapterName}>{chapter?.nombre || 'Capítulo'}</Text>
        <Text style={styles.drugCount}>{drugs.length} de {allDrugs.length} fármacos</Text>
      </View>

      {allDrugs.length > 8 && (
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.filterInput}
            value={filter}
            onChangeText={setFilter}
            placeholder="Filtrar fármacos..."
            placeholderTextColor={colors.textLight}
            clearButtonMode="while-editing"
          />
        </View>
      )}

      <FlashList
        data={drugs}
        renderItem={({ item }) => (
          <DrugCard
            drug={item}
            onPress={() => navigation.navigate('DrugDetail', { drugId: item.id })}
            highlight={filter.length >= 2 ? filter : undefined}
          />
        )}
        estimatedItemSize={120}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {filter.length >= 2 ? 'Sin resultados para el filtro' : 'No hay fármacos en este capítulo'}
            </Text>
          </View>
        }
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neuBackground,
  },
  header: {
    paddingTop: rs.space(16),
    paddingBottom: rs.space(20),
    paddingHorizontal: rs.space(20),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  unitName: {
    fontSize: rs.font(12),
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chapterName: {
    fontSize: rs.font(22),
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  drugCount: {
    fontSize: rs.font(13),
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  list: {
    paddingVertical: rs.space(12),
    paddingBottom: rs.space(32),
  },
  emptyContainer: {
    padding: rs.space(40),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: rs.font(16),
    color: colors.textLight,
  },
  filterContainer: {
    paddingHorizontal: rs.space(16),
    paddingTop: rs.space(10),
    paddingBottom: 4,
  },
  filterInput: { ...neuInset(colors), paddingHorizontal: rs.space(14), paddingVertical: rs.space(10), fontSize: rs.font(14), color: colors.text },
});