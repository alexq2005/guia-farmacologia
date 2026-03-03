import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, EmergencyDrug, Antidote, IVCompatibilityEntry } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Especial'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

type Tab = 'emergencias' | 'antidotos' | 'compatibilidades';

function EmergencyTable({ drugs }: { drugs: EmergencyDrug[] }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <View>
      {drugs.map(drug => (
        <TouchableOpacity
          key={drug.id}
          style={[styles.emergencyCard, expanded === drug.id && styles.emergencyCardExpanded]}
          onPress={() => setExpanded(expanded === drug.id ? null : drug.id)}
          activeOpacity={0.7}
        >
          <View style={styles.emergencyHeader}>
            <Text style={styles.emergencyIcon}>🚑</Text>
            <View style={styles.emergencyInfo}>
              <Text style={styles.emergencyName}>{drug.nombre}</Text>
              <Text style={styles.emergencyIndication} numberOfLines={expanded === drug.id ? undefined : 1}>
                {drug.indicacion}
              </Text>
            </View>
          </View>

          {expanded === drug.id && (
            <View style={styles.emergencyDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Dosis</Text>
                <Text style={styles.detailValue}>{drug.dosis}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Vía</Text>
                <Text style={styles.detailValue}>{drug.via}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Administración</Text>
                <Text style={styles.detailValue}>{drug.velocidadAdmin}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Presentación</Text>
                <Text style={styles.detailValue}>{drug.presentacion}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Efectos adversos</Text>
                <Text style={styles.detailValue}>{drug.efectosAdversos}</Text>
              </View>
              {drug.notas ? (
                <View style={styles.notesBox}>
                  <Text style={styles.notesText}>📝 {drug.notas}</Text>
                </View>
              ) : null}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

function AntidoteTable({ antidotes }: { antidotes: Antidote[] }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View>
      {antidotes.map(ant => (
        <View key={ant.id} style={styles.antidoteCard}>
          <View style={styles.antidoteHeader}>
            <Text style={styles.antidoteIcon}>💉</Text>
            <View style={styles.antidoteHeaderText}>
              <Text style={styles.toxicName}>Tóxico: {ant.toxico}</Text>
              <Text style={styles.antidoteName}>Antídoto: {ant.antidoto}</Text>
            </View>
          </View>
          <View style={styles.antidoteBody}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dosis</Text>
              <Text style={styles.detailValue}>{ant.dosis}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vía</Text>
              <Text style={styles.detailValue}>{ant.via}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Inicio</Text>
              <Text style={styles.detailValue}>{ant.inicio}</Text>
            </View>
            {ant.notas ? (
              <View style={styles.notesBox}>
                <Text style={styles.notesText}>📝 {ant.notas}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

function CompatibilityTable({ data }: { data: { farmacos: string[]; compatibilidades: IVCompatibilityEntry[] } }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const compatColors: Record<string, string> = {
    compatible: '#16A34A',
    incompatible: '#DC2626',
    variable: '#F59E0B',
    desconocido: '#9CA3AF',
  };

  const compatLabels: Record<string, string> = {
    compatible: '✅ Compatible',
    incompatible: '❌ Incompatible',
    variable: '⚠️ Variable',
    desconocido: '❓ Desconocido',
  };

  return (
    <View>
      {data.compatibilidades.map((entry, i) => (
        <View key={i} style={styles.compatCard}>
          <View style={styles.compatDrugs}>
            <Text style={styles.compatDrug1}>{entry.farmaco1}</Text>
            <Text style={styles.compatPlus}>+</Text>
            <Text style={styles.compatDrug2}>{entry.farmaco2}</Text>
          </View>
          <View style={[styles.compatBadge, { backgroundColor: (compatColors[entry.compatibilidad] || '#9CA3AF') + '15', borderColor: compatColors[entry.compatibilidad] || '#9CA3AF' }]}>
            <Text style={[styles.compatText, { color: compatColors[entry.compatibilidad] || '#9CA3AF' }]}>
              {compatLabels[entry.compatibilidad] || entry.compatibilidad}
            </Text>
          </View>
          {entry.notas ? (
            <Text style={styles.compatNotes}>{entry.notas}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export function SpecialScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { emergencyDrugs, antidotes, ivCompatibilities } = useDrugData();
  const [activeTab, setActiveTab] = useState<Tab>('emergencias');

  const tabs: { key: Tab; label: string; icon: string; count: number }[] = [
    { key: 'emergencias', label: 'Emergencias', icon: '🚑', count: emergencyDrugs.length },
    { key: 'antidotos', label: 'Antídotos', icon: '💉', count: antidotes.length },
    { key: 'compatibilidades', label: 'Compat. IV', icon: '🧪', count: ivCompatibilities.compatibilidades.length },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.emergency} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚨 Tablas Especiales</Text>
        <Text style={styles.headerSubtitle}>Referencia rápida de emergencia</Text>
      </View>

      {/* Tab selector */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            <View style={[styles.tabBadge, activeTab === tab.key && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === tab.key && styles.tabBadgeTextActive]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'emergencias' && (
          <View>
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Esta tabla es una referencia rápida. Siempre consultar protocolos institucionales y verificar dosis.
              </Text>
            </View>
            <EmergencyTable drugs={emergencyDrugs} />
          </View>
        )}

        {activeTab === 'antidotos' && (
          <View>
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Contactar al centro toxicológico. Las dosis pueden variar según gravedad de la intoxicación.
              </Text>
            </View>
            <AntidoteTable antidotes={antidotes} />
          </View>
        )}

        {activeTab === 'compatibilidades' && (
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                🧪 Compatibilidades para administración en Y. Verificar siempre con farmacia hospitalaria.
              </Text>
            </View>
            <CompatibilityTable data={ivCompatibilities} />
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.emergency,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabActive: { backgroundColor: colors.emergency + '15' },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 11, color: colors.textLight, fontWeight: '600', marginTop: 2 },
  tabLabelActive: { color: colors.emergency },
  tabBadge: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginTop: 2,
  },
  tabBadgeActive: { backgroundColor: colors.emergency + '20' },
  tabBadgeText: { fontSize: 10, color: colors.textLight, fontWeight: '700' },
  tabBadgeTextActive: { color: colors.emergency },
  scroll: { flex: 1 },
  warningBox: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F59E0B40',
  },
  warningText: { fontSize: 12, color: '#92400E', lineHeight: 18 },
  infoBox: {
    backgroundColor: '#DBEAFE',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3B82F640',
  },
  infoText: { fontSize: 12, color: '#1E40AF', lineHeight: 18 },
  emergencyCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    elevation: 1,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: colors.emergency,
  },
  emergencyCardExpanded: {
    elevation: 3,
  },
  emergencyHeader: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  emergencyIcon: { fontSize: 24, marginRight: 10 },
  emergencyInfo: { flex: 1 },
  emergencyName: { fontSize: 15, fontWeight: '700', color: colors.text },
  emergencyIndication: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  emergencyDetails: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    width: 100,
  },
  detailValue: { fontSize: 13, color: colors.text, flex: 1, lineHeight: 18 },
  notesBox: {
    backgroundColor: '#FFF7ED',
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
  notesText: { fontSize: 12, color: '#9A3412', lineHeight: 18 },
  antidoteCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    elevation: 1,
    overflow: 'hidden',
  },
  antidoteHeader: {
    flexDirection: 'row',
    backgroundColor: '#DC262612',
    padding: 12,
    alignItems: 'center',
  },
  antidoteIcon: { fontSize: 24, marginRight: 10 },
  antidoteHeaderText: { flex: 1 },
  toxicName: { fontSize: 13, color: colors.error, fontWeight: '600' },
  antidoteName: { fontSize: 15, fontWeight: '700', color: colors.text, marginTop: 2 },
  antidoteBody: { padding: 12 },
  compatCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  compatDrugs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  compatDrug1: { fontSize: 14, fontWeight: '600', color: colors.text, flex: 1 },
  compatPlus: { fontSize: 16, color: colors.textLight, marginHorizontal: 8 },
  compatDrug2: { fontSize: 14, fontWeight: '600', color: colors.text, flex: 1 },
  compatBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  compatText: { fontSize: 12, fontWeight: '700' },
  compatNotes: { fontSize: 12, color: colors.textSecondary, marginTop: 6, lineHeight: 18 },
});