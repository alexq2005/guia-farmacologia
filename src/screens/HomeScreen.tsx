import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, Drug } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Inicio'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export function HomeScreen({ navigation }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs, categories, getDrugCount, getRandomDrug, emergencyDrugs, pathologies, getDrugById } = useDrugData();
  const { favorites, favoriteCount } = useFavoritesContext();
  const [dailyDrug, setDailyDrug] = useState<Drug | null>(null);

  useEffect(() => {
    // Drug of the day based on current date (deterministic)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % drugs.length;
    setDailyDrug(drugs[index] || null);
  }, [drugs]);

  const quickActions = [
    { icon: '🔍', label: 'Buscar', onPress: () => navigation.navigate('Busqueda') },
    { icon: '🚑', label: 'Emergencias', onPress: () => navigation.navigate('Especial') },
    { icon: '🏥', label: 'Patologías', onPress: () => navigation.navigate('PathologiesScreen' as any) },
    { icon: '👩‍⚕️', label: 'Cuidados', onPress: () => navigation.navigate('NursingCare') },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* App Header */}
      <View style={styles.appHeader}>
        <View style={styles.headerTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.appTitle}>Guía Farmacológica</Text>
            <Text style={styles.appSubtitle}>Enfermería</Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={styles.themeToggleIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((action, i) => (
            <TouchableOpacity key={i} style={styles.quickAction} onPress={action.onPress} activeOpacity={0.7}>
              <Text style={styles.quickIcon}>{action.icon}</Text>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Drug of the Day */}
        {dailyDrug && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💊 Fármaco del Día</Text>
            <TouchableOpacity
              style={[styles.dailyCard, { borderLeftColor: UNIT_COLORS[dailyDrug.unidadId] || colors.primary }]}
              onPress={() => navigation.navigate('DrugDetail', { drugId: dailyDrug.id })}
              activeOpacity={0.7}
            >
              <Text style={styles.dailyName}>{dailyDrug.nombre}</Text>
              <Text style={styles.dailyGeneric}>{dailyDrug.nombreGenerico}</Text>
              <Text style={styles.dailyFamily}>{dailyDrug.familia}</Text>
              <Text style={styles.dailyDose} numberOfLines={2}>
                {dailyDrug.dosis.adulto}
              </Text>
              <Text style={styles.dailyCta}>Ver detalle completo →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Favorites */}
        {favoriteCount > 0 && (
          <View style={styles.section}>
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
          </View>
        )}

        {/* Browse by System */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Explorar por Sistema</Text>
          <View style={styles.systemsGrid}>
            {categories.unidades.slice(0, 8).map(unit => (
              <TouchableOpacity
                key={unit.id}
                style={[styles.systemCard, { backgroundColor: (UNIT_COLORS[unit.id] || colors.primary) + '12' }]}
                onPress={() => navigation.navigate('Categorias' as any)}
                activeOpacity={0.7}
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
        </View>

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
          <Text style={styles.footerVersion}>v1.0 — 100% Offline</Text>
        </View>
      </ScrollView>
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
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  quickAction: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 76,
  },
  quickIcon: {
    fontSize: 28,
  },
  quickLabel: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
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
  dailyName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
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
});