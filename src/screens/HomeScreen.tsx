import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, Drug } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { useQuiz } from '../hooks/useQuiz';
import { useTheme } from '../context/ThemeContext';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn, useStaggeredEntrance } from '../utils/animations';
import { useRecentDrugs } from '../hooks/useRecentDrugs';

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
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs, categories, getDrugCount, getRandomDrug, emergencyDrugs, pathologies, getDrugById } = useDrugData();
  const { favorites, favoriteCount } = useFavoritesContext();
  const { recentNotes, noteCount } = useNotesContext();
  const { results: quizResults, averageScore } = useQuiz(drugs);
  const { recentDrugs } = useRecentDrugs();
  const [dailyDrug, setDailyDrug] = useState<Drug | null>(null);
  const fadeIn = useFadeIn(400);
  const stagger = useStaggeredEntrance(5, 100);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % drugs.length;
    setDailyDrug(drugs[index] || null);
  }, [drugs]);

  const quickActions = [
    { icon: '🔍', label: 'Buscar', onPress: () => navigation.navigate('Busqueda') },
    { icon: '🧠', label: 'Test', onPress: () => navigation.navigate('QuizScreen') },
    { icon: '🚨', label: 'Protocolos', onPress: () => navigation.navigate('EmergencyProtocols') },
    { icon: '📊', label: 'Escalas', onPress: () => navigation.navigate('ClinicalScales') },
    { icon: '🔬', label: 'Laboratorio', onPress: () => navigation.navigate('LabValues') },
  ];

  const latestNotes = recentNotes(5);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* App Header */}
      <View style={[styles.appHeader, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.appTitle}>Guía Farmacológica</Text>
            <Text style={styles.appSubtitle}>Enfermería</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              <Text style={styles.themeToggleIcon}>{isDark ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')} style={styles.themeToggle}>
              <Text style={styles.themeToggleIcon}>ℹ️</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getDrugCount()}</Text>
            <Text style={styles.statLabel}>Fármacos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{categories.unidades.length}</Text>
            <Text style={styles.statLabel}>Unidades</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pathologies.length}</Text>
            <Text style={styles.statLabel}>Patologías</Text>
          </View>
        </View>
      </View>

      <Animated.ScrollView style={[styles.scroll, { opacity: fadeIn }]} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <Animated.View style={[styles.quickActions, { opacity: stagger[0] || 1 }]}>
          {quickActions.map((action, i) => (
            <TouchableOpacity key={i} style={styles.quickAction} onPress={action.onPress} activeOpacity={0.7}>
              <Text style={styles.quickIcon}>{action.icon}</Text>
              <Text style={styles.quickLabel} numberOfLines={1}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Drug of the Day */}
        {dailyDrug && (
          <Animated.View style={[styles.section, { opacity: stagger[1] || 1 }]}>
            <Text style={styles.sectionTitle}>💊 Fármaco del Día</Text>
            <TouchableOpacity
              style={[styles.dailyCard, { borderLeftColor: UNIT_COLORS[dailyDrug.unidadId] || colors.primary }]}
              onPress={() => navigation.navigate('DrugDetail', { drugId: dailyDrug.id })}
              activeOpacity={0.7}
            >
              <View style={styles.dailyCardHeader}>
                <Text style={styles.dailyName}>{dailyDrug.nombre}</Text>
                <View style={[styles.dailyPregBadge, { backgroundColor: colors.primaryLight + '20' }]}>
                  <Text style={[styles.dailyPregText, { color: colors.primaryLight }]}>{dailyDrug.embarazo}</Text>
                </View>
              </View>
              <Text style={styles.dailyGeneric}>{dailyDrug.nombreGenerico}</Text>
              <Text style={styles.dailyFamily}>{dailyDrug.familia}</Text>
              <View style={styles.dailyInfoRow}>
                {dailyDrug.viaAdministracion.slice(0, 3).map(via => (
                  <View key={via} style={styles.dailyViaBadge}>
                    <Text style={styles.dailyViaText}>{via}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.dailyDose} numberOfLines={2}>
                {dailyDrug.dosis.adulto}
              </Text>
              <Text style={styles.dailyCta}>Ver detalle completo →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Recently Viewed */}
        {recentDrugs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🕐 Vistos Recientemente</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoritesScroll}>
              {recentDrugs.slice(0, 10).map(drugId => {
                const recentDrug = getDrugById(drugId);
                if (!recentDrug) return null;
                const rColor = UNIT_COLORS[recentDrug.unidadId] || colors.primary;
                return (
                  <TouchableOpacity
                    key={drugId}
                    style={[styles.favoriteCard, { borderTopColor: rColor }]}
                    onPress={() => navigation.navigate('DrugDetail', { drugId })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.favoriteName} numberOfLines={1}>{recentDrug.nombre}</Text>
                    <Text style={styles.favoriteGeneric} numberOfLines={1}>{recentDrug.nombreGenerico}</Text>
                    <Text style={[styles.favoriteFamily, { color: rColor }]}>{recentDrug.familia}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Study Progress */}
        {quizResults.length > 0 && (
          <Animated.View style={[styles.section, { opacity: stagger[2] || 1 }]}>
            <Text style={styles.sectionTitle}>📊 Progreso de Estudio</Text>
            <TouchableOpacity
              style={styles.progressCard}
              onPress={() => navigation.navigate('QuizScreen')}
              activeOpacity={0.7}
            >
              <View style={styles.progressRow}>
                <View style={styles.progressItem}>
                  <Text style={[styles.progressNumber, { color: colors.quiz }]}>{quizResults.length}</Text>
                  <Text style={styles.progressLabel}>Sesiones</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <Text style={[styles.progressNumber, { color: averageScore >= 70 ? colors.success : colors.warning }]}>{averageScore}%</Text>
                  <Text style={styles.progressLabel}>Promedio</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <Text style={[styles.progressNumber, { color: colors.quiz }]}>{quizResults.reduce((s, r) => s + r.correctAnswers, 0)}</Text>
                  <Text style={styles.progressLabel}>Correctas</Text>
                </View>
              </View>
              <Text style={[styles.dailyCta, { textAlign: 'center', marginTop: 8 }]}>Seguir practicando →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Recent Notes */}
        {latestNotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Notas Recientes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoritesScroll}>
              {latestNotes.map(note => {
                const noteDrug = getDrugById(note.drugId);
                return (
                  <TouchableOpacity
                    key={note.drugId}
                    style={styles.noteCard}
                    onPress={() => navigation.navigate('DrugDetail', { drugId: note.drugId })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.noteCardDrug} numberOfLines={1}>{noteDrug?.nombre || note.drugId}</Text>
                    <Text style={styles.noteCardText} numberOfLines={2}>{note.text}</Text>
                    <Text style={styles.noteCardDate}>
                      {new Date(note.updatedAt).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Favorites */}
        {favoriteCount > 0 && (
          <Animated.View style={[styles.section, { opacity: stagger[3] || 1 }]}>
            <Text style={styles.sectionTitle}>❤️ Mis Favoritos ({favoriteCount})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoritesScroll}>
              {favorites.slice(0, 10).map(favId => {
                const favDrug = getDrugById(favId);
                if (!favDrug) return null;
                const fColor = UNIT_COLORS[favDrug.unidadId] || colors.primary;
                return (
                  <TouchableOpacity
                    key={favId}
                    style={[styles.favoriteCard, { borderTopColor: fColor }]}
                    onPress={() => navigation.navigate('DrugDetail', { drugId: favId })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.favoriteName} numberOfLines={1}>{favDrug.nombre}</Text>
                    <Text style={styles.favoriteGeneric} numberOfLines={1}>{favDrug.nombreGenerico}</Text>
                    <Text style={[styles.favoriteFamily, { color: fColor }]}>{favDrug.familia}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        )}

        {/* Browse by System */}
        <Animated.View style={[styles.section, { opacity: stagger[4] || 1 }]}>
          <Text style={styles.sectionTitle}>📚 Explorar por Sistema</Text>
          <View style={styles.systemsGrid}>
            {categories.unidades.map(unit => (
              <TouchableOpacity
                key={unit.id}
                style={[styles.systemCard, { backgroundColor: (UNIT_COLORS[unit.id] || colors.primary) + '12' }]}
                onPress={() => navigation.navigate('ChapterDrugs', {
                  chapterId: unit.capitulos[0]?.id || '',
                  unitName: unit.nombre,
                  unitColor: UNIT_COLORS[unit.id] || colors.primary,
                })}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={unit.nombre}
              >
                <View style={[styles.systemIcon, { backgroundColor: UNIT_COLORS[unit.id] || colors.primary }]}>
                  <Text style={styles.systemIconText}>{unit.icon === 'brain' ? '🧠' : unit.numero.toString()}</Text>
                </View>
                <Text style={[styles.systemName, { color: UNIT_COLORS[unit.id] || colors.primary }]} numberOfLines={2}>
                  {unit.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Emergency Access */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.emergencyBanner}
            onPress={() => navigation.navigate('Especial')}
            activeOpacity={0.7}
          >
            <Text style={styles.emergencyIcon}>🚨</Text>
            <View style={styles.emergencyText}>
              <Text style={styles.emergencyTitle}>Fármacos de Emergencia</Text>
              <Text style={styles.emergencySubtitle}>
                Acceso rápido a {emergencyDrugs.length} fármacos críticos
              </Text>
            </View>
            <Text style={styles.emergencyArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Info footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Guía Farmacológica Integral de Enfermería
          </Text>
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineBadgeText}>📱 v2.0 — 100% Offline</Text>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:alexq2005@gmail.com?subject=Guía Farmacológica - Contacto')}
            style={styles.footerEmail}
            activeOpacity={0.7}
          >
            <Text style={styles.footerEmailText}>✉️ Contacto: alexq2005@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appHeader: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  themeToggle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggleIcon: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 4,
  },
  scroll: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 16,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickIcon: {
    fontSize: 28,
  },
  quickLabel: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 8,
  },
  dailyCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dailyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dailyPregBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  dailyPregText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dailyInfoRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  dailyViaBadge: {
    backgroundColor: colors.primaryLight + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  dailyViaText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  dailyName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  dailyGeneric: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  dailyFamily: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  dailyDose: {
    fontSize: 13,
    color: colors.text,
    marginTop: 8,
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 8,
  },
  dailyCta: {
    fontSize: 13,
    color: colors.primaryLight,
    fontWeight: '600',
    marginTop: 8,
  },
  systemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  systemCard: {
    width: '22%',
    aspectRatio: 0.85,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: '1.5%',
  },
  systemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  systemIconText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  systemName: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.emergency + '10',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.emergency + '30',
  },
  emergencyIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.emergency,
  },
  emergencySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emergencyArrow: {
    fontSize: 20,
    color: colors.emergency,
    fontWeight: '700',
  },
  favoritesScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  favoriteCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    width: 140,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderTopWidth: 3,
  },
  favoriteName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  favoriteGeneric: {
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  favoriteFamily: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  footerVersion: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 4,
  },
  offlineBadge: {
    backgroundColor: colors.success + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  offlineBadgeText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '600',
  },
  footerEmail: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerEmailText: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: colors.quiz + '20',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  progressLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  noteCard: {
    backgroundColor: colors.noteBackground,
    borderRadius: 12,
    padding: 12,
    width: 160,
    borderWidth: 1,
    borderColor: colors.noteBorder,
  },
  noteCardDrug: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  noteCardText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  noteCardDate: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
  },
});