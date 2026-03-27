import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Drug } from '../types';
import type { ThemeColors } from '../utils/colors';
import { neuCardSubtle } from '../utils/neumorphism';
import { useTheme } from '../context/ThemeContext';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useDrugData } from '../hooks/useDrugData';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';
import { PremiumGate } from '../components/PremiumGate';

const guideData = require('../data/parenteral_guide.json');

type Props = NativeStackScreenProps<RootStackParamList, 'ParenteralGuide'>;
type TabKey = 'introduccion' | 'soluciones' | 'npt' | 'proteccion' | 'reconstitucion' | 'farmacos';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'introduccion', label: 'Introducción', icon: 'book-open-variant' },
  { key: 'soluciones', label: 'Soluciones', icon: 'water-outline' },
  { key: 'npt', label: 'NPT', icon: 'flask' },
  { key: 'proteccion', label: 'Protección', icon: 'shield-outline' },
  { key: 'reconstitucion', label: 'Reconstitución', icon: 'test-tube' },
  { key: 'farmacos', label: 'Fármacos', icon: 'pill' },
];

const ACCENT = '#0891B2';

interface SectionContent {
  subtitulo: string;
  descripcion: string;
  puntos: string[];
}

interface GuideSection {
  id: string;
  titulo: string;
  icon: string;
  contenido: SectionContent[];
}

function BulletList({ items, color }: { items: string[]; color?: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={[styles.bullet, color ? { color } : null]}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function IntroduccionTab() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const intro = guideData.introduccion;
  return (
    <View>
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>{guideData.advertencia}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Propósito</Text>
        <Text style={styles.infoCardText}>{intro.proposito}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Destinatarios</Text>
        <Text style={styles.infoCardText}>{intro.destinatarios}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Metodología</Text>
        <Text style={styles.infoCardText}>{intro.metodologia}</Text>
      </View>

      <CollapsibleSection title="Contenido de la Guía" icon="clipboard-text-outline" accentColor={ACCENT} initiallyOpen>
        <BulletList items={intro.contenido} color={ACCENT} />
      </CollapsibleSection>

      <View style={styles.fuentesSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <MaterialCommunityIcons name="bookshelf" size={18} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.fuentesTitle, { marginBottom: 0 }]}>Fuentes y Referencias</Text>
        </View>
        {guideData.fuentes.map((ref: string, i: number) => (
          <View key={i} style={styles.fuenteRow}>
            <Text style={styles.fuenteNumber}>{i + 1}</Text>
            <Text style={styles.fuenteText}>{ref}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function GenericSectionTab({ sectionId }: { sectionId: string }) {
  const { colors } = useTheme();
  const section: GuideSection | undefined = guideData.secciones.find((s: GuideSection) => s.id === sectionId);
  if (!section) return null;

  const sectionColors: Record<string, string> = {
    soluciones: '#0891B2',
    npt: '#7C3AED',
    proteccion: '#DC2626',
    'reconstitución': '#059669',
  };
  const color = sectionColors[sectionId] || ACCENT;

  return (
    <View>
      {section.contenido.map((item: SectionContent, i: number) => (
        <CollapsibleSection
          key={i}
          title={item.subtitulo}
          icon={section.icon}
          accentColor={color}
          initiallyOpen={i === 0}
        >
          <Text style={{ fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: 10 }}>
            {item.descripcion}
          </Text>
          <BulletList items={item.puntos} color={color} />
        </CollapsibleSection>
      ))}
    </View>
  );
}

function FarmacosTab({ navigation }: { navigation: Props['navigation'] }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs } = useDrugData();
  const [search, setSearch] = useState('');

  const parenteralDrugs = useMemo(() => {
    const parenteral = ['IV', 'IM', 'SC', 'intratecal', 'epidural', 'intradermica'];
    return drugs.filter(d => d.viaAdministracion.some(v => parenteral.includes(v)));
  }, [drugs]);

  const filtered = useMemo(() => {
    if (!search.trim()) return parenteralDrugs;
    const q = normalizeText(search);
    return parenteralDrugs.filter(d =>
      normalizeText(d.nombre).includes(q) ||
      normalizeText(d.nombreGenerico).includes(q)
    );
  }, [parenteralDrugs, search]);

  const renderDrug = useCallback(({ item }: { item: Drug }) => {
    const pp = item.preparacionParenteral;
    const hasData = !!pp;
    const isDangerous = pp?.medicamentoPeligroso;
    return (
      <TouchableOpacity
        style={[styles.drugItem, isDangerous && styles.drugItemDangerous]}
        onPress={() => navigation.navigate('DrugDetail', { drugId: item.id })}
        activeOpacity={0.7}
      >
        <View style={styles.drugItemLeft}>
          <Text style={styles.drugItemName} numberOfLines={1}>{item.nombre}</Text>
          <Text style={styles.drugItemGeneric} numberOfLines={1}>{item.nombreGenerico}</Text>
          <View style={styles.drugItemRoutes}>
            {item.viaAdministracion
              .filter(v => ['IV', 'IM', 'SC', 'intratecal', 'epidural'].includes(v))
              .map(v => (
                <View key={v} style={styles.routeMini}><Text style={styles.routeMiniText}>{v}</Text></View>
              ))}
          </View>
        </View>
        <View style={styles.drugItemRight}>
          {isDangerous && <MaterialCommunityIcons name="alert-outline" size={16} color="#DC2626" />}
          {hasData && <MaterialCommunityIcons name="needle" size={16} color={ACCENT} />}
          {!hasData && <Text style={styles.noDataIcon}>—</Text>}
        </View>
      </TouchableOpacity>
    );
  }, [colors, navigation, styles]);

  return (
    <View style={styles.farmacosContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar fármaco parenteral..."
          placeholderTextColor={colors.textLight}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          {filtered.length} fármacos parenterales
          {search.trim() ? ` (de ${parenteralDrugs.length})` : ''}
        </Text>
        <View style={styles.legendRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="needle" size={14} color={ACCENT} style={{ marginRight: 4 }} />
            <Text style={styles.legendItem}>Con datos</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="alert-outline" size={14} color="#DC2626" style={{ marginRight: 4 }} />
            <Text style={styles.legendItem}>Peligroso</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={d => d.id}
        renderItem={renderDrug}
        style={styles.drugList}
        contentContainerStyle={styles.drugListContent}
        initialNumToRender={20}
        maxToRenderPerBatch={15}
        windowSize={5}
      />
    </View>
  );
}

export function ParenteralGuideScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const [activeTab, setActiveTab] = useState<TabKey>('introduccion');

  const sectionMap: Record<string, string> = {
    soluciones: 'soluciones',
    npt: 'npt',
    proteccion: 'proteccion',
    reconstitucion: 'reconstitución',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'introduccion': return <IntroduccionTab />;
      case 'soluciones':
      case 'npt':
      case 'proteccion':
      case 'reconstitucion':
        return <GenericSectionTab sectionId={sectionMap[activeTab]} />;
      case 'farmacos': return <FarmacosTab navigation={navigation} />;
    }
  };

  return (
    <PremiumGate feature="Guía Parenteral">
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={ACCENT} barStyle="light-content" />

      <View style={[styles.header, { backgroundColor: ACCENT }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="needle" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Guía de Administración Parenteral</Text>
        </View>
        <Text style={styles.headerSubtitle}>Hospital Universitario Son Espases</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll} contentContainerStyle={styles.tabContent}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabChip, activeTab === tab.key && styles.tabChipActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name={tab.icon} size={16} color={activeTab === tab.key ? ACCENT : colors.textSecondary} />
            <Text style={[styles.tabChipLabel, activeTab === tab.key && styles.tabChipLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {activeTab === 'farmacos' ? (
        renderContent()
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {renderContent()}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </Animated.View>
    </PremiumGate>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: { paddingTop: 16, paddingBottom: 16, paddingHorizontal: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  tabScroll: { backgroundColor: colors.surface, maxHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tabContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  tabChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: colors.background, gap: 4 },
  tabChipActive: { backgroundColor: '#0891B218', borderWidth: 1, borderColor: '#0891B2' },
  tabChipIcon: { fontSize: 14 },
  tabChipLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  tabChipLabelActive: { color: '#0891B2', fontWeight: '700' },
  scroll: { flex: 1 },
  bottomSpacer: { height: 40 },

  // Intro
  disclaimerBox: { backgroundColor: colors.warning + '15', marginHorizontal: 16, marginTop: 16, padding: 12, borderRadius: 10, borderLeftWidth: 3, borderLeftColor: colors.warning },
  disclaimerText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, fontStyle: 'italic' },
  infoCard: { ...neuCardSubtle(colors), marginHorizontal: 16, marginTop: 10, padding: 14 },
  infoCardTitle: { fontSize: 14, fontWeight: '700', color: '#0891B2', marginBottom: 6 },
  infoCardText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  fuentesSection: { marginHorizontal: 16, marginTop: 16, padding: 14, backgroundColor: colors.surface, borderRadius: 12 },
  fuentesTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 10 },
  fuenteRow: { flexDirection: 'row', marginBottom: 8 },
  fuenteNumber: { fontSize: 11, fontWeight: '700', color: '#0891B2', width: 20, marginTop: 2 },
  fuenteText: { fontSize: 12, color: colors.textSecondary, flex: 1, lineHeight: 17 },

  // Bullets
  bulletRow: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  bullet: { fontSize: 14, color: colors.text, marginRight: 8, marginTop: 1 },
  bulletText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },

  // Farmacos tab
  farmacosContainer: { flex: 1 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 12 },
  searchInput: {
    flex: 1, backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border,
  },
  clearButton: { position: 'absolute', right: 12, padding: 4 },
  clearText: { fontSize: 16, color: colors.textLight },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 8, marginBottom: 4 },
  statsText: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  legendRow: { flexDirection: 'row', gap: 10 },
  legendItem: { fontSize: 11, color: colors.textLight },
  drugList: { flex: 1 },
  drugListContent: { paddingHorizontal: 16, paddingBottom: 40 },
  drugItem: {
    ...neuCardSubtle(colors), flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 6,
  },
  drugItemDangerous: { borderLeftWidth: 3, borderLeftColor: '#DC2626' },
  drugItemLeft: { flex: 1 },
  drugItemName: { fontSize: 14, fontWeight: '600', color: colors.text },
  drugItemGeneric: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  drugItemRoutes: { flexDirection: 'row', gap: 4, marginTop: 4 },
  routeMini: { backgroundColor: '#0891B215', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 },
  routeMiniText: { fontSize: 10, fontWeight: '600', color: '#0891B2' },
  drugItemRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dangerIcon: { fontSize: 16 },
  dataIcon: { fontSize: 16 },
  noDataIcon: { fontSize: 14, color: colors.textLight },
});
