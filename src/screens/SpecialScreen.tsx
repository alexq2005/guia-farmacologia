import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// LinearGradient removed — clean modern headers
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList, EmergencyDrug, Antidote, IVCompatibilityEntry } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { useTabBar } from '../context/TabBarContext';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Especial'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

type Tab = 'emergencias' | 'antidotos' | 'compatibilidades';

const EmergencyCard = React.memo(({ drug, isExpanded, onToggle, styles, colors }: {
  drug: EmergencyDrug; isExpanded: boolean; onToggle: (id: string) => void;
  styles: ReturnType<typeof createStyles>; colors: ThemeColors;
}) => (
  <TouchableOpacity
    style={[styles.emergencyCard, isExpanded && styles.emergencyCardExpanded]}
    onPress={() => onToggle(drug.id)}
    activeOpacity={0.7}
  >
    <View style={styles.emergencyHeader}>
      <MaterialCommunityIcons name="ambulance" size={24} color={colors.emergency} style={{ marginRight: 10 }} />
      <View style={styles.emergencyInfo}>
        <Text style={styles.emergencyName}>{drug.nombre}</Text>
        <Text style={styles.emergencyIndication} numberOfLines={isExpanded ? undefined : 1}>
          {drug.indicacion}
        </Text>
      </View>
    </View>

    {isExpanded && (
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
                  <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons name="note-text-outline" size={14} color={colors.textSecondary} style={{ marginRight: 4, marginTop: 1 }} />
                  <Text style={[styles.notesText, { flex: 1 }]}>{drug.notas}</Text>
                </View>
                </View>
              ) : null}
      </View>
    )}
  </TouchableOpacity>
));

function EmergencyTable({ drugs }: { drugs: EmergencyDrug[] }) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const handleToggle = useCallback((id: string) => {
    setExpanded(prev => prev === id ? null : id);
  }, []);

  return (
    <View>
      {drugs.map(drug => (
        <EmergencyCard key={drug.id} drug={drug} isExpanded={expanded === drug.id} onToggle={handleToggle} styles={styles} colors={colors} />
      ))}
    </View>
  );
}

function AntidoteTable({ antidotes }: { antidotes: Antidote[] }) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  return (
    <View>
      {antidotes.map(ant => (
        <View key={ant.id} style={styles.antidoteCard}>
          <View style={styles.antidoteHeader}>
            <MaterialCommunityIcons name="needle" size={24} color={colors.error} style={{ marginRight: 10 }} />
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
                <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons name="note-text-outline" size={14} color={colors.textSecondary} style={{ marginRight: 4, marginTop: 1 }} />
                  <Text style={[styles.notesText, { flex: 1 }]}>{ant.notas}</Text>
                </View>
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
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const compatColors: Record<string, string> = {
    compatible: '#16A34A',
    incompatible: '#DC2626',
    variable: '#F59E0B',
    desconocido: '#9CA3AF',
  };

  const compatIconNames: Record<string, string> = {
    compatible: 'check-circle',
    incompatible: 'close-circle',
    variable: 'alert-circle',
    desconocido: 'help-circle',
  };
  const compatLabelTexts: Record<string, string> = {
    compatible: 'Compatible',
    incompatible: 'Incompatible',
    variable: 'Variable',
    desconocido: 'Desconocido',
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name={compatIconNames[entry.compatibilidad] || 'help-circle'} size={14} color={compatColors[entry.compatibilidad] || '#9CA3AF'} style={{ marginRight: 4 }} />
              <Text style={[styles.compatText, { color: compatColors[entry.compatibilidad] || '#9CA3AF' }]}>
                {compatLabelTexts[entry.compatibilidad] || entry.compatibilidad}
              </Text>
            </View>
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
  const insets = useSafeAreaInsets();
  const rs = useResponsiveScale();
  const { handleScroll: handleTabBarScroll } = useTabBar();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { emergencyDrugs, antidotes, ivCompatibilities } = useDrugData();
  const [activeTab, setActiveTab] = useState<Tab>('emergencias');
  const fadeIn = useFadeIn();

  const tabs: { key: Tab; label: string; icon: string; count: number }[] = [
    { key: 'emergencias', label: 'Emergencias', icon: 'ambulance', count: emergencyDrugs.length },
    { key: 'antidotos', label: 'Antídotos', icon: 'needle', count: antidotes.length },
    { key: 'compatibilidades', label: 'Compat. IV', icon: 'test-tube', count: ivCompatibilities.compatibilidades.length },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle={colors.text === '#F1F5F9' ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Tablas Especiales</Text>
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
            <MaterialCommunityIcons name={tab.icon} size={20} color={activeTab === tab.key ? colors.emergency : colors.textLight} />
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} onScroll={handleTabBarScroll} scrollEventThrottle={16}>
        {activeTab === 'emergencias' && (
          <View>
            <View style={styles.warningBox}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <MaterialCommunityIcons name="alert-outline" size={16} color={colors.warning} style={{ marginRight: 6, marginTop: 1 }} />
                <Text style={[styles.warningText, { flex: 1 }]}>Esta tabla es una referencia rápida. Siempre consultar protocolos institucionales y verificar dosis.</Text>
              </View>
            </View>
            <EmergencyTable drugs={emergencyDrugs} />
          </View>
        )}

        {activeTab === 'antidotos' && (
          <View>
            <View style={styles.warningBox}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <MaterialCommunityIcons name="alert-outline" size={16} color={colors.warning} style={{ marginRight: 6, marginTop: 1 }} />
                <Text style={[styles.warningText, { flex: 1 }]}>Contactar al centro toxicológico. Las dosis pueden variar según gravedad de la intoxicación.</Text>
              </View>
            </View>
            <AntidoteTable antidotes={antidotes} />
          </View>
        )}

        {activeTab === 'compatibilidades' && (
          <View>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <MaterialCommunityIcons name="test-tube" size={16} color={colors.info} style={{ marginRight: 6, marginTop: 1 }} />
                <Text style={[styles.infoText, { flex: 1 }]}>Compatibilidades para administración en Y. Verificar siempre con farmacia hospitalaria.</Text>
              </View>
            </View>
            <CompatibilityTable data={ivCompatibilities} />
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    paddingBottom: rs.space(16),
    paddingHorizontal: rs.space(20),
    backgroundColor: colors.background,
  },
  headerTitle: { fontSize: rs.font(28), fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: rs.font(14), color: colors.textSecondary, marginTop: 2 },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: rs.space(16),
    marginTop: rs.space(12),
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: rs.space(10),
    borderRadius: 10,
  },
  tabActive: { backgroundColor: colors.surface, elevation: 1, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
  tabIcon: { fontSize: rs.font(20) },
  tabLabel: { fontSize: rs.font(11), color: colors.textLight, fontWeight: '600', marginTop: 2 },
  tabLabelActive: { color: colors.emergency },
  tabBadge: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: rs.space(6),
    paddingVertical: 1,
    borderRadius: 8,
    marginTop: 2,
  },
  tabBadgeActive: { backgroundColor: colors.emergency + '20' },
  tabBadgeText: { fontSize: rs.font(10), color: colors.textLight, fontWeight: '700' },
  tabBadgeTextActive: { color: colors.emergency },
  scroll: { flex: 1 },
  warningBox: {
    backgroundColor: colors.warning + '15',
    marginHorizontal: rs.space(16),
    marginTop: rs.space(12),
    padding: rs.space(12),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.warning + '40',
  },
  warningText: { fontSize: rs.font(12), color: colors.warning, lineHeight: rs.font(18) },
  infoBox: {
    backgroundColor: colors.info + '15',
    marginHorizontal: rs.space(16),
    marginTop: rs.space(12),
    padding: rs.space(12),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.info + '40',
  },
  infoText: { fontSize: rs.font(12), color: colors.info, lineHeight: rs.font(18) },
  emergencyCard: {
    ...neuCard(colors),
    marginHorizontal: rs.space(16),
    marginTop: rs.space(8),
    borderLeftWidth: 4,
    borderLeftColor: colors.emergency,
  },
  emergencyCardExpanded: {
    elevation: 3,
  },
  emergencyHeader: {
    flexDirection: 'row',
    padding: rs.space(12),
    alignItems: 'center',
  },
  emergencyIcon: { fontSize: rs.font(24), marginRight: rs.space(10) },
  emergencyInfo: { flex: 1 },
  emergencyName: { fontSize: rs.font(15), fontWeight: '700', color: colors.text },
  emergencyIndication: { fontSize: rs.font(12), color: colors.textSecondary, marginTop: 2 },
  emergencyDetails: {
    paddingHorizontal: rs.space(12),
    paddingBottom: rs.space(12),
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: rs.space(6),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: rs.font(12),
    fontWeight: '700',
    color: colors.textSecondary,
    flex: 0.35,
    maxWidth: rs.space(120),
  },
  detailValue: { fontSize: rs.font(13), color: colors.text, flex: 1, lineHeight: rs.font(18) },
  notesBox: {
    backgroundColor: colors.warning + '10',
    padding: rs.space(8),
    borderRadius: 8,
    marginTop: rs.space(6),
  },
  notesText: { fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(18) },
  antidoteCard: {
    backgroundColor: colors.surface,
    marginHorizontal: rs.space(16),
    marginTop: rs.space(8),
    borderRadius: 12,
    elevation: 1,
    overflow: 'hidden',
  },
  antidoteHeader: {
    flexDirection: 'row',
    backgroundColor: colors.error + '12',
    padding: rs.space(12),
    alignItems: 'center',
  },
  antidoteIcon: { fontSize: rs.font(24), marginRight: rs.space(10) },
  antidoteHeaderText: { flex: 1 },
  toxicName: { fontSize: rs.font(13), color: colors.error, fontWeight: '600' },
  antidoteName: { fontSize: rs.font(15), fontWeight: '700', color: colors.text, marginTop: 2 },
  antidoteBody: { padding: rs.space(12) },
  compatCard: {
    backgroundColor: colors.surface,
    marginHorizontal: rs.space(16),
    marginTop: rs.space(8),
    padding: rs.space(12),
    borderRadius: 12,
    elevation: 1,
  },
  compatDrugs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs.space(8),
  },
  compatDrug1: { fontSize: rs.font(14), fontWeight: '600', color: colors.text, flex: 1 },
  compatPlus: { fontSize: rs.font(16), color: colors.textLight, marginHorizontal: rs.space(8) },
  compatDrug2: { fontSize: rs.font(14), fontWeight: '600', color: colors.text, flex: 1 },
  compatBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: rs.space(10),
    paddingVertical: rs.space(4),
    borderRadius: 8,
    borderWidth: 1,
  },
  compatText: { fontSize: rs.font(12), fontWeight: '700' },
  compatNotes: { fontSize: rs.font(12), color: colors.textSecondary, marginTop: rs.space(6), lineHeight: rs.font(18) },
});