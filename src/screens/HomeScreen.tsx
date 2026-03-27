import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated, Linking, ImageBackground, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, Drug } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { useQuiz } from '../hooks/useQuiz';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn, useStaggeredEntrance } from '../utils/animations';
import { useRecentDrugs } from '../hooks/useRecentDrugs';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { getUnitImage, HERO_IMAGE } from '../utils/unitImages';
import { useTabBar } from '../context/TabBarContext';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Inicio'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export function HomeScreen({ navigation }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const rs = useResponsiveScale();
  const { handleScroll: handleTabBarScroll } = useTabBar();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { drugs, categories, getDrugCount, getRandomDrug, emergencyDrugs, pathologies, getDrugById } = useDrugData();
  const { favorites, favoriteCount } = useFavoritesContext();
  const { recentNotes, noteCount } = useNotesContext();
  const { results: quizResults, averageScore } = useQuiz(drugs);
  const { recentDrugs } = useRecentDrugs();
  const { isTrialActive, trialDaysLeft, isSubscribed, isFreeBuild, isCodeActivated } = usePremium();
  const [dailyDrug, setDailyDrug] = useState<Drug | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const fadeIn = useFadeIn(400);
  const stagger = useStaggeredEntrance(6, 80);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % drugs.length;
    setDailyDrug(drugs[index] || null);
  }, [drugs]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const random = getRandomDrug();
    if (random) setDailyDrug(random);
    setTimeout(() => setRefreshing(false), 600);
  }, [getRandomDrug]);

  const quickActions = [
    { label: 'Buscar', gradient: ['#3B82F6', '#2563EB'] as [string, string], image: require('../assets/images/units/pharmacy.jpg'), onPress: () => navigation.navigate('Busqueda') },
    { label: 'Test', gradient: ['#8B5CF6', '#7C3AED'] as [string, string], image: require('../assets/images/units/quiz.jpg'), onPress: () => navigation.navigate('QuizScreen') },
    { label: 'Protocolos', gradient: ['#EF4444', '#DC2626'] as [string, string], image: require('../assets/images/units/emergency.jpg'), onPress: () => navigation.navigate('EmergencyProtocols') },
    { label: 'Escalas', gradient: ['#F59E0B', '#D97706'] as [string, string], image: require('../assets/images/units/nursing.jpg'), onPress: () => navigation.navigate('ClinicalScales') },
    { label: 'Lab', gradient: ['#10B981', '#059669'] as [string, string], image: require('../assets/images/units/lab.jpg'), onPress: () => navigation.navigate('LabValues') },
  ];

  const latestNotes = recentNotes(5);
  const unitColor = dailyDrug ? (UNIT_COLORS[dailyDrug.unidadId] || colors.primary) : colors.primary;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <Animated.ScrollView
        style={[styles.scroll, { opacity: fadeIn }]}
        showsVerticalScrollIndicator={false}
        onScroll={handleTabBarScroll}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" colors={['#2563EB']} />}
      >
        {/* Hero Header with Image */}
        <ImageBackground
          source={HERO_IMAGE}
          style={[styles.heroHeader, { paddingTop: insets.top + 12 }]}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.85)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroContent}>
            <View style={styles.headerTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>Guía{'\n'}Farmacológica</Text>
                <Text style={styles.heroSubtitle}>Enfermería</Text>
              </View>
              <View style={styles.headerButtons}>
                <TouchableOpacity onPress={toggleTheme} style={styles.heroButton}>
                  <MaterialCommunityIcons name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'} size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')} style={styles.heroButton}>
                  <MaterialCommunityIcons name="information-outline" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Stats row */}
            <View style={styles.heroStats}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatNumber}>{drugs.length}</Text>
                <Text style={styles.heroStatLabel}>Fármacos</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatNumber}>{categories.unidades.length}</Text>
                <Text style={styles.heroStatLabel}>Sistemas</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatNumber}>{emergencyDrugs.length}</Text>
                <Text style={styles.heroStatLabel}>Emergencia</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Quick Actions — gradient pills */}
        <Animated.View style={[styles.quickActions, { opacity: stagger[0] || 1 }]}>
          {quickActions.map((action, i) => (
            <TouchableOpacity key={i} onPress={action.onPress} activeOpacity={0.85}>
              <ImageBackground
                source={action.image}
                style={{
                  width: rs.space(78),
                  height: rs.space(84),
                  borderRadius: 18,
                  overflow: 'hidden',
                  elevation: 4,
                  shadowColor: action.gradient[1],
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
                imageStyle={{ borderRadius: 18 }}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={[action.gradient[0] + 'CC', action.gradient[1] + 'EE']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: rs.space(10),
                  }}
                >
                  <Text style={{ fontSize: rs.font(11), fontWeight: '800', color: '#fff', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>
                    {action.label}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Trial Banner */}
        {!isFreeBuild && !isSubscribed && !isCodeActivated && (
          <TouchableOpacity
            style={[styles.trialBanner, {
              backgroundColor: isTrialActive ? colors.primary + '10' : colors.warning + '10',
              borderColor: isTrialActive ? colors.primary + '30' : colors.warning + '30',
            }]}
            onPress={() => navigation.navigate('PremiumScreen')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name={isTrialActive ? 'star-four-points' : 'lock-outline'} size={28} color={isTrialActive ? colors.primary : colors.warning} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.trialBannerTitle, { color: isTrialActive ? colors.primary : colors.warning }]}>
                {isTrialActive ? `${trialDaysLeft} días de prueba Premium` : 'Prueba Premium expirada'}
              </Text>
              <Text style={styles.trialBannerSubtitle}>
                {isTrialActive ? 'Todas las funciones desbloqueadas' : 'Suscríbete para recuperar acceso'}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={isTrialActive ? colors.primary : colors.warning} />
          </TouchableOpacity>
        )}

        {/* Drug of the Day — Hero Card */}
        {dailyDrug && (
          <Animated.View style={[styles.section, { opacity: stagger[1] || 1 }]}>
            <Text style={styles.sectionTitle}>Fármaco del Día</Text>
            <TouchableOpacity
              style={styles.dailyHero}
              onPress={() => navigation.navigate('DrugDetail', { drugId: dailyDrug.id })}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={getUnitImage(dailyDrug.unidadId) || HERO_IMAGE}
                style={styles.dailyHeroImage}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={[unitColor + '20', unitColor + 'DD']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.dailyHeroGradient}
                >
                  <View style={styles.dailyHeroTop}>
                    <View style={styles.dailyBadge}>
                      <Text style={styles.dailyBadgeText}>{dailyDrug.embarazo}</Text>
                    </View>
                    <View style={styles.dailyViasRow}>
                      {dailyDrug.viaAdministracion.slice(0, 3).map(via => (
                        <View key={via} style={styles.dailyViaPill}>
                          <Text style={styles.dailyViaText}>{via}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.dailyHeroBottom}>
                    <Text style={styles.dailyHeroName}>{dailyDrug.nombre}</Text>
                    <Text style={styles.dailyHeroGeneric}>{dailyDrug.nombreGenerico}</Text>
                    <Text style={styles.dailyHeroFamily}>{dailyDrug.familia}</Text>
                    <View style={styles.dailyCtaRow}>
                      <Text style={styles.dailyCtaText}>Ver detalle completo</Text>
                      <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Recently Viewed */}
        {recentDrugs.length > 0 && (
          <Animated.View style={[styles.section, { opacity: stagger[2] || 1 }]}>
            <Text style={styles.sectionTitle}>Vistos Recientemente</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {recentDrugs.slice(0, 10).map(drugId => {
                const recentDrug = getDrugById(drugId);
                if (!recentDrug) return null;
                const rColor = UNIT_COLORS[recentDrug.unidadId] || colors.primary;
                return (
                  <TouchableOpacity
                    key={drugId}
                    style={styles.recentCard}
                    onPress={() => navigation.navigate('DrugDetail', { drugId })}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.recentAccent, { backgroundColor: rColor }]} />
                    <Text style={styles.recentName} numberOfLines={1}>{recentDrug.nombre}</Text>
                    <Text style={styles.recentGeneric} numberOfLines={1}>{recentDrug.nombreGenerico}</Text>
                    <Text style={[styles.recentFamily, { color: rColor }]}>{recentDrug.familia}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        )}

        {/* Study Progress */}
        {quizResults.length > 0 && (
          <Animated.View style={[styles.section, { opacity: stagger[3] || 1 }]}>
            <Text style={styles.sectionTitle}>Progreso de Estudio</Text>
            <TouchableOpacity style={styles.progressCard} onPress={() => navigation.navigate('QuizScreen')} activeOpacity={0.7}>
              <LinearGradient colors={['#8B5CF6', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.progressGradient}>
                <View style={styles.progressRow}>
                  <View style={styles.progressItem}>
                    <Text style={styles.progressNumber}>{quizResults.length}</Text>
                    <Text style={styles.progressLabel}>Sesiones</Text>
                  </View>
                  <View style={styles.progressDivider} />
                  <View style={styles.progressItem}>
                    <Text style={styles.progressNumber}>{averageScore}%</Text>
                    <Text style={styles.progressLabel}>Promedio</Text>
                  </View>
                  <View style={styles.progressDivider} />
                  <View style={styles.progressItem}>
                    <Text style={styles.progressNumber}>{quizResults.reduce((s, r) => s + r.correctAnswers, 0)}</Text>
                    <Text style={styles.progressLabel}>Correctas</Text>
                  </View>
                </View>
                <View style={styles.progressCta}>
                  <Text style={styles.progressCtaText}>Seguir practicando</Text>
                  <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Favorites */}
        {favoriteCount > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mis Favoritos ({favoriteCount})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {favorites.slice(0, 10).map(favId => {
                const favDrug = getDrugById(favId);
                if (!favDrug) return null;
                const fColor = UNIT_COLORS[favDrug.unidadId] || colors.primary;
                return (
                  <TouchableOpacity key={favId} style={styles.recentCard} onPress={() => navigation.navigate('DrugDetail', { drugId: favId })} activeOpacity={0.7}>
                    <View style={[styles.recentAccent, { backgroundColor: fColor }]} />
                    <Text style={styles.recentName} numberOfLines={1}>{favDrug.nombre}</Text>
                    <Text style={styles.recentGeneric} numberOfLines={1}>{favDrug.nombreGenerico}</Text>
                    <Text style={[styles.recentFamily, { color: fColor }]}>{favDrug.familia}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Browse by System — 2-column image grid */}
        <Animated.View style={[styles.section, { opacity: stagger[4] || 1 }]}>
          <Text style={styles.sectionTitle}>Explorar por Sistema</Text>
          <View style={styles.systemsGrid}>
            {categories.unidades.map(unit => {
              const color = UNIT_COLORS[unit.id] || colors.primary;
              const image = getUnitImage(unit.id);
              return (
                <TouchableOpacity
                  key={unit.id}
                  style={styles.systemCard}
                  onPress={() => navigation.navigate('ChapterDrugs', {
                    chapterId: unit.capitulos[0]?.id || '',
                    unitName: unit.nombre,
                    unitColor: color,
                  })}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel={unit.nombre}
                >
                  <ImageBackground
                    source={image || HERO_IMAGE}
                    style={styles.systemImage}
                    imageStyle={{ borderRadius: 16 }}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={[color + '40', color + 'E6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.systemGradient}
                    >
                      <Text style={styles.systemNumber}>U{unit.numero}</Text>
                      <Text style={styles.systemName} numberOfLines={2}>{unit.nombre}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Emergency Banner */}
        <Animated.View style={[styles.section, { opacity: stagger[5] || 1 }]}>
          <TouchableOpacity style={styles.emergencyBanner} onPress={() => navigation.navigate('Especial')} activeOpacity={0.8}>
            <LinearGradient colors={['#DC2626', '#991B1B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emergencyGradient}>
              <View style={styles.emergencyIconBg}>
                <MaterialCommunityIcons name="alert-octagon" size={28} color="#FFFFFF" />
              </View>
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>Fármacos de Emergencia</Text>
                <Text style={styles.emergencySubtitle}>Acceso rápido a {emergencyDrugs.length} fármacos críticos</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Guía Farmacológica Integral de Enfermería</Text>
          <View style={styles.offlineBadge}>
            <MaterialCommunityIcons name="cellphone-check" size={14} color={colors.success} style={{ marginRight: 4 }} />
            <Text style={[styles.offlineBadgeText, { color: colors.success }]}>v1.0 — 100% Offline</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:alexq2005@gmail.com?subject=Guía Farmacológica - Contacto')} style={styles.footerEmail} activeOpacity={0.7}>
            <MaterialCommunityIcons name="email-outline" size={14} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={[styles.footerEmailText, { color: colors.primaryLight }]}>alexq2005@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  scroll: { flex: 1 },

  // ── Hero Header ──────────────────────────────────────────────
  heroHeader: {
    minHeight: rs.space(220),
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: rs.space(20),
    paddingBottom: rs.space(24),
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: rs.font(32),
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: rs.font(36),
  },
  heroSubtitle: {
    fontSize: rs.font(15),
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: rs.space(8),
    marginTop: 4,
  },
  heroButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    width: rs.space(36),
    height: rs.space(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: rs.space(12),
    marginTop: rs.space(16),
  },
  heroStatItem: { flex: 1, alignItems: 'center' },
  heroStatNumber: { fontSize: rs.font(20), fontWeight: '800', color: '#FFFFFF' },
  heroStatLabel: { fontSize: rs.font(10), color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  heroStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 4 },

  // ── Quick Actions ────────────────────────────────────────────
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: rs.space(16),
    paddingVertical: rs.space(16),
    gap: rs.space(10),
  },
  quickAction: { flex: 1, alignItems: 'center' },
  quickGradient: {
    width: rs.space(48),
    height: rs.space(48),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quickLabel: {
    fontSize: rs.font(11),
    color: colors.text,
    fontWeight: '600',
    marginTop: rs.space(6),
    textAlign: 'center',
  },

  // ── Trial Banner ─────────────────────────────────────────────
  trialBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: rs.space(16),
    marginBottom: rs.space(8),
    padding: rs.space(14),
    borderRadius: 16,
    borderWidth: 1,
  },
  trialBannerTitle: { fontSize: rs.font(14), fontWeight: '700' },
  trialBannerSubtitle: { fontSize: rs.font(12), color: colors.textSecondary, marginTop: 2 },

  // ── Section ──────────────────────────────────────────────────
  section: { marginBottom: rs.space(8) },
  sectionTitle: {
    fontSize: rs.font(19),
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: rs.space(20),
    marginBottom: rs.space(12),
    marginTop: rs.space(8),
  },

  // ── Drug of the Day — Hero Card ──────────────────────────────
  dailyHero: { marginHorizontal: rs.space(16) },
  dailyHeroImage: { height: rs.space(200), borderRadius: 20, overflow: 'hidden' },
  dailyHeroGradient: {
    flex: 1,
    borderRadius: 20,
    padding: rs.space(16),
    justifyContent: 'space-between',
  },
  dailyHeroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  dailyBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: rs.space(10),
    paddingVertical: rs.space(4),
    borderRadius: 8,
  },
  dailyBadgeText: { fontSize: rs.font(12), fontWeight: '700', color: '#FFFFFF' },
  dailyViasRow: { flexDirection: 'row', gap: rs.space(4) },
  dailyViaPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: rs.space(8),
    paddingVertical: 2,
    borderRadius: 8,
  },
  dailyViaText: { fontSize: rs.font(10), color: '#FFFFFF', fontWeight: '600' },
  dailyHeroBottom: {},
  dailyHeroName: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  dailyHeroGeneric: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', marginTop: 2 },
  dailyHeroFamily: { fontSize: rs.font(12), color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  dailyCtaRow: { flexDirection: 'row', alignItems: 'center', marginTop: rs.space(8), gap: 4 },
  dailyCtaText: { fontSize: rs.font(13), color: '#FFFFFF', fontWeight: '600' },

  // ── Horizontal Cards ─────────────────────────────────────────
  horizontalScroll: { paddingHorizontal: rs.space(16), gap: rs.space(10) },
  recentCard: {
    ...neuCardSubtle(colors),
    padding: rs.space(12),
    width: rs.space(140),
  },
  recentAccent: { width: '100%', height: 3, borderRadius: 2, marginBottom: rs.space(8) },
  recentName: { fontSize: rs.font(14), fontWeight: '700', color: colors.text },
  recentGeneric: { fontSize: rs.font(11), color: colors.textSecondary, fontStyle: 'italic', marginTop: 2 },
  recentFamily: { fontSize: rs.font(10), fontWeight: '600', marginTop: rs.space(4) },

  // ── Study Progress ───────────────────────────────────────────
  progressCard: { marginHorizontal: rs.space(16), borderRadius: 16, overflow: 'hidden' },
  progressGradient: { padding: rs.space(20), borderRadius: 16 },
  progressRow: { flexDirection: 'row', alignItems: 'center' },
  progressItem: { flex: 1, alignItems: 'center' },
  progressNumber: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  progressLabel: { fontSize: rs.font(11), color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  progressDivider: { width: 1, height: rs.space(30), backgroundColor: 'rgba(255,255,255,0.2)' },
  progressCta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: rs.space(12), gap: 4 },
  progressCtaText: { fontSize: rs.font(14), color: '#FFFFFF', fontWeight: '600' },

  // ── System Grid — 2 columns with images ──────────────────────
  systemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: rs.space(16),
    gap: rs.space(10),
  },
  systemCard: {
    width: (rs.width - rs.space(42)) / 2,
    height: rs.space(100),
    borderRadius: 16,
    overflow: 'hidden',
  },
  systemImage: { flex: 1 },
  systemGradient: {
    flex: 1,
    borderRadius: 16,
    padding: rs.space(12),
    justifyContent: 'flex-end',
  },
  systemNumber: {
    fontSize: rs.font(10),
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  systemName: {
    fontSize: rs.font(13),
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },

  // ── Emergency Banner ─────────────────────────────────────────
  emergencyBanner: { marginHorizontal: rs.space(16), borderRadius: 16, overflow: 'hidden' },
  emergencyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: rs.space(16),
    borderRadius: 16,
  },
  emergencyIconBg: {
    width: rs.space(48),
    height: rs.space(48),
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs.space(14),
  },
  emergencyText: { flex: 1 },
  emergencyTitle: { fontSize: rs.font(16), fontWeight: '700', color: '#FFFFFF' },
  emergencySubtitle: { fontSize: rs.font(12), color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  // ── Footer ───────────────────────────────────────────────────
  footer: { alignItems: 'center', paddingVertical: rs.space(24), paddingBottom: rs.space(100) },
  footerText: { fontSize: rs.font(12), color: colors.textLight, textAlign: 'center' },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '12',
    paddingHorizontal: rs.space(12),
    paddingVertical: rs.space(4),
    borderRadius: 12,
    marginTop: rs.space(8),
  },
  offlineBadgeText: { fontSize: rs.font(11), fontWeight: '600' },
  footerEmail: { flexDirection: 'row', alignItems: 'center', marginTop: rs.space(12), paddingVertical: rs.space(8) },
  footerEmailText: { fontSize: rs.font(12), fontWeight: '600' },
});
