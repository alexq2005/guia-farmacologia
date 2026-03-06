import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, StatusBar, Animated } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import { normalizeText } from '../utils/search';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';

type Props = NativeStackScreenProps<RootStackParamList, 'ChapterDrugs'>;

export function ChapterDrugsScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
      <StatusBar backgroundColor={unitColor} barStyle="light-content" />
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

      <FlatList
        data={drugs}
        renderItem={({ item }) => (
          <DrugCard
            drug={item}
            onPress={() => navigation.navigate('DrugDetail', { drugId: item.id })}
            highlight={filter.length >= 2 ? filter : undefined}
          />
        )}
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

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  unitName: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chapterName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  drugCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  list: {
    paddingVertical: 12,
    paddingBottom: 32,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  filterInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
});