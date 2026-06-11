import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, Unit } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { neuCard } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { getUnitImage, HERO_IMAGE } from '../utils/unitImages';
import { useTabBar } from '../context/TabBarContext';

const UNIT_ICON_MAP: Record<string, string> = {
  u01: 'brain',
  u02: 'heart-pulse',
  u03: 'virus-outline',
  u04: 'lungs',
  u05: 'stomach',
  u06: 'diabetes',
  u07: 'human-pregnant',
  u08: 'bone',
  u09: 'hand-back-right-outline',
  u10: 'water-outline',
  u11: 'alert-decagram-outline',
  u12: 'hospital-building',
  u13: 'head-cog-outline',
  u14: 'clipboard-text-outline',
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Categorias'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export function CategoriesScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const rs = useResponsiveScale();
  const { handleScroll: handleTabBarScroll } = useTabBar();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { categories, getUnitDrugCount } = useDrugData();
  const fadeIn = useFadeIn();

  const renderUnit = ({ item }: { item: Unit }) => {
    const color = UNIT_COLORS[item.id] || colors.primary;
    const iconName = UNIT_ICON_MAP[item.id] || 'clipboard-text-outline';
    const drugCount = getUnitDrugCount(item.id);

    const image = getUnitImage(item.id);
    return (
      <View style={styles.unitCard}>
        <ImageBackground
          source={image || HERO_IMAGE}
          style={styles.unitImageBg}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[color + '60', color + 'E6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.unitHeader]}
          >
            <MaterialCommunityIcons
              name={iconName}
              size={26}
              color="#FFFFFF"
              style={styles.mr12}
            />
            <View style={styles.unitHeaderText}>
              <Text style={styles.unitNumber}>UNIDAD {item.numero}</Text>
              <Text style={styles.unitName}>{item.nombre}</Text>
            </View>
            <View style={styles.drugCountBadge}>
              <Text style={styles.drugCountText}>{drugCount}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

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
              accessibilityRole="button"
              accessibilityLabel={`${chapter.nombre}, ${chapter.drugIds.length} fármacos`}
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
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Categorías</Text>
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
        onScroll={handleTabBarScroll}
        scrollEventThrottle={16}
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    // ── Helpers de layout (extraídos de inline styles) ──
    mr12: { marginRight: 12 },

    container: {
      flex: 1,
      backgroundColor: colors.neuBackground,
    },
    header: {
      paddingBottom: rs.space(16),
      paddingHorizontal: rs.space(20),
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      marginTop: 2,
    },
    list: {
      padding: rs.space(16),
      paddingBottom: rs.space(32),
    },
    unitCard: {
      ...neuCard(colors),
      marginBottom: rs.space(16),
      overflow: 'hidden',
    },
    unitImageBg: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: 'hidden',
    },
    unitHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs.space(16),
    },
    unitIcon: {
      fontSize: rs.font(28),
      marginRight: rs.space(12),
    },
    unitHeaderText: {
      flex: 1,
    },
    unitNumber: {
      fontSize: rs.font(10),
      color: 'rgba(255,255,255,0.8)',
      fontWeight: '700',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },
    unitName: {
      fontSize: rs.font(17),
      fontWeight: '700',
      color: '#FFFFFF',
      marginTop: 1,
    },
    drugCountBadge: {
      backgroundColor: 'rgba(255,255,255,0.25)',
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(4),
      borderRadius: 12,
    },
    drugCountText: {
      color: '#FFFFFF',
      fontSize: rs.font(14),
      fontWeight: '700',
    },
    chaptersContainer: {
      padding: rs.space(8),
    },
    chapterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rs.space(12),
      paddingHorizontal: rs.space(14),
      borderRadius: 10,
      marginHorizontal: rs.space(4),
      marginVertical: 1,
    },
    chapterDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: rs.space(12),
    },
    chapterName: {
      fontSize: rs.font(14),
      color: colors.text,
      flex: 1,
    },
    chapterCount: {
      fontSize: rs.font(12),
      color: colors.textLight,
      marginRight: 4,
      backgroundColor: colors.background,
      paddingHorizontal: rs.space(8),
      paddingVertical: 2,
      borderRadius: 8,
    },
    chapterArrow: {
      fontSize: rs.font(18),
      color: colors.textLight,
      fontWeight: '300',
    },
  });
