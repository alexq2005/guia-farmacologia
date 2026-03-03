import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ChapterDrugs'>;

export function ChapterDrugsScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { chapterId, unitName, unitColor } = route.params;
  const { getDrugsByChapter, getChapterById } = useDrugData();

  const chapter = getChapterById(chapterId);
  const drugs = getDrugsByChapter(chapterId);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={unitColor} barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: unitColor }]}>
        <Text style={styles.unitName}>{unitName}</Text>
        <Text style={styles.chapterName}>{chapter?.nombre || 'Capítulo'}</Text>
        <Text style={styles.drugCount}>{drugs.length} fármacos</Text>
      </View>

      <FlatList
        data={drugs}
        renderItem={({ item }) => (
          <DrugCard
            drug={item}
            onPress={() => navigation.navigate('DrugDetail', { drugId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay fármacos en este capítulo</Text>
          </View>
        }
      />
    </View>
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
});