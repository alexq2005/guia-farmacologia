import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Animated,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, EmergencyProtocol, ProtocolCategory } from '../types';
import { PROTOCOL_COLORS, PROTOCOL_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';
import { PROTOCOL_CATEGORY_LABELS as CATEGORY_LABELS } from '../utils/labels';
import protocolsData from '../data/emergency_protocols.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

const ALL_CATEGORIES: ProtocolCategory[] = [
  'cardiaco', 'respiratorio', 'neurologico', 'metabolico', 'sepsis', 'trauma', 'otro',
];

const PRIORITY_CONFIG = {
  critico: { label: 'CRÍTICO', color: '#DC2626', bg: '#DC262615' },
  urgente: { label: 'URGENTE', color: '#F59E0B', bg: '#F59E0B15' },
  emergente: { label: 'EMERGENTE', color: '#EA580C', bg: '#EA580C15' },
};

export function EmergencyProtocolsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const protocols = protocolsData as EmergencyProtocol[];

  const [selectedCategory, setSelectedCategory] = useState<ProtocolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = protocols;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categoria === selectedCategory);
    }
    if (searchQuery.trim().length >= 2) {
      const q = normalizeText(searchQuery);
      result = result.filter(p => {
        const name = normalizeText(p.nombre);
        const desc = normalizeText(p.descripcion);
        return name.includes(q) || desc.includes(q) || (p.abreviatura || '').toLowerCase().includes(q);
      });
    }
    return result;
  }, [protocols, selectedCategory, searchQuery]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor="#DC2626" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Protocolos de Emergencia</Text>
        <Text style={styles.headerSubtitle}>{protocols.length} protocolos con fármacos y dosis</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar protocolo..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContainer}
        >
          <TouchableOpacity
            style={[styles.chip, selectedCategory === 'all' && styles.chipActive]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[styles.chipText, selectedCategory === 'all' && styles.chipTextActive]}>
              Todos ({protocols.length})
            </Text>
          </TouchableOpacity>
          {ALL_CATEGORIES.map(cat => {
            const count = protocols.filter(p => p.categoria === cat).length;
            if (count === 0) return null;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, selectedCategory === cat && { backgroundColor: PROTOCOL_COLORS[cat] }]}
                onPress={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
              >
                <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                  {PROTOCOL_ICONS[cat]} {CATEGORY_LABELS[cat]} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {searchQuery.length >= 2 && (
          <Text style={styles.resultCount}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</Text>
        )}

        {filtered.map(protocol => {
          const prioConfig = PRIORITY_CONFIG[protocol.prioridad];
          const catColor = PROTOCOL_COLORS[protocol.categoria];
          return (
            <TouchableOpacity
              key={protocol.id}
              style={[styles.protocolCard, { borderLeftColor: catColor }]}
              onPress={() => navigation.navigate('ProtocolDetail', { protocolId: protocol.id })}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{PROTOCOL_ICONS[protocol.categoria]}</Text>
                <View style={styles.cardTitleArea}>
                  <Text style={styles.cardTitle}>{protocol.nombre}</Text>
                  <Text style={[styles.cardCategory, { color: catColor }]}>
                    {CATEGORY_LABELS[protocol.categoria]}
                    {protocol.abreviatura ? ` · ${protocol.abreviatura}` : ''}
                  </Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: prioConfig.bg }]}>
                  <Text style={[styles.priorityText, { color: prioConfig.color }]}>{prioConfig.label}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription} numberOfLines={2}>{protocol.descripcion}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardStepCount}>📋 {protocol.pasos.length} pasos</Text>
                <Text style={styles.cardDrugCount}>💊 {protocol.resumenFarmacos.length} fármacos</Text>
                <Text style={styles.cardArrow}>→</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🚨</Text>
            <Text style={styles.emptyText}>No se encontraron protocolos</Text>
            <Text style={styles.emptyHint}>Intenta con otro término de búsqueda</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: '#DC2626', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12, paddingHorizontal: 12, marginTop: 12,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 10 },
  clearSearch: { color: 'rgba(255,255,255,0.7)', fontSize: 16, padding: 4 },
  scroll: { flex: 1 },
  chipsScroll: { maxHeight: 50 },
  chipsContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 8, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    backgroundColor: colors.surface, elevation: 1, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  chipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: 13, color: colors.textSecondary, marginHorizontal: 20, marginBottom: 8 },
  protocolCard: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 14, padding: 16, elevation: 2,
    shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardIcon: { fontSize: 28, marginRight: 12 },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardCategory: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  priorityBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  priorityText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  cardDescription: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 12 },
  cardStepCount: { fontSize: 11, color: colors.textLight },
  cardDrugCount: { fontSize: 11, color: colors.textLight },
  cardArrow: { fontSize: 16, color: colors.textLight, marginLeft: 'auto' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptyHint: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
