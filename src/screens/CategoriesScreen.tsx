import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, Unit } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { UNIT_ICONS } from '../utils/icons';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Categorias'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export function CategoriesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { categories, getUnitDrugCount } = useDrugData();

  const renderUnit = ({ item }: { item: Unit }) => {
    const color = UNIT_COLORS[item.id] || colors.primary;
    const icon = UNIT_ICONS[item.id] || '📋';
    const drugCount = getUnitDrugCount(item.id);

    return (
      <View style={styles.unitCard}>
        <View style={[styles.unitHeader, { backgroundColor: color }]}>
          <Text style={styles.unitIcon}>{icon}</Text>
          <View style={styles.unitHeaderText}>
            <Text style={styles.unitNumber}>UNIDAD {item.numero}</Text>
            <Text style={styles.unitName}>{item.nombre}</Text>
          </View>
          <View style={styles.drugCountBadge}>
            <Text style={styles.drugCountText}>{drugCount}</Text>
          </View>
        </View>

        <View style={styles.chaptersContainer}>
          {item.capitulos.map(chapter => (
            <TouchableOpacity
              key={chapter.id}
              style={styles.chapterRow}
              onPress={() =>
                navigation.navigate('ChapterDrugs', {
                  chapterId: chapter.id,
                  unitName: item.nombre,
                  unitColor: color,
                })
              }
              activeOpacity={0.7}
            >
              <View style={[styles.chapterDot, { backgroundColor: color }]} />
              <Text style={styles.chapterName} numberOfLines={1}>
                {chapter.nombre}
              </Text>
              <Text style={styles.chapterCount}>{chapter.drugIds.length}</Text>
              <Text style={styles.chapterArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Categorías</Text>
        <Text style={styles.headerSubtitle}>
          {categories.unidades.length} unidades temáticas
        </Text>
      </View>

      <FlatList
        data={categories.unidades}
        renderItem={renderUnit}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  unitCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  unitIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  unitHeaderText: {
    flex: 1,
  },
  unitNumber: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  unitName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 1,
  },
  drugCountBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  drugCountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  chaptersContainer: {
    padding: 8,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  chapterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  chapterName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  chapterCount: {
    fontSize: 12,
    color: colors.textLight,
    marginRight: 4,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  chapterArrow: {
    fontSize: 18,
    color: colors.textLight,
    fontWeight: '300',
  },
});