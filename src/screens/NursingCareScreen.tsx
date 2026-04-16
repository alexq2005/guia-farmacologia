import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useFadeIn } from '../utils/animations';
import { neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import type { NursingCareData, NursingRight, NursingAssessmentCategory, NursingRouteCare, NursingHighRiskCategory, NursingProcedure, NursingDocSection, NursingCalcFormula } from '../types';

const nursingData: NursingCareData = require('../data/nursing_care.json');

type TabKey = 'derechos' | 'valoracion' | 'vias' | 'altoRiesgo' | 'procedimientos' | 'documentacion' | 'calculos';

const TAB_ICON_MAP: Record<TabKey, string> = {
  derechos: 'check-circle-outline',
  valoracion: 'stethoscope',
  vias: 'needle',
  altoRiesgo: 'alert-outline',
  procedimientos: 'clipboard-list-outline',
  documentacion: 'file-document-edit-outline',
  calculos: 'calculator-variant-outline',
};

const TABS: { key: TabKey; label: string; iconName: string }[] = [
  { key: 'derechos', label: '10 Correctos', iconName: 'check-circle-outline' },
  { key: 'valoracion', label: 'Valoración', iconName: 'stethoscope' },
  { key: 'vias', label: 'Vías', iconName: 'needle' },
  { key: 'altoRiesgo', label: 'Alto Riesgo', iconName: 'alert-outline' },
  { key: 'procedimientos', label: 'Procedimientos', iconName: 'clipboard-list-outline' },
  { key: 'documentacion', label: 'Documentación', iconName: 'file-document-edit-outline' },
  { key: 'calculos', label: 'Cálculos', iconName: 'calculator-variant-outline' },
];

function BulletList({ items, color }: { items: string[]; color?: string }) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
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

function NumberedList({ items, color }: { items: string[]; color?: string }) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  return (
    <View>
      {items.map((item, i) => (
        <View key={i} style={styles.numberedRow}>
          <View style={[styles.numberBadge, { backgroundColor: (color || colors.nursing) + '20' }]}>
            <Text style={[styles.numberText, { color: color || colors.nursing }]}>{i + 1}</Text>
          </View>
          <Text style={styles.numberedText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function DerechosTab() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const data = nursingData.derechosAdministracion;
  return (
    <View>
      <Text style={styles.tabDescription}>{data.descripcion}</Text>
      {data.items.map((item: NursingRight) => (
        <View key={item.numero} style={styles.derechoCard}>
          <View style={styles.derechoHeader}>
            <View style={styles.derechoNumber}>
              <Text style={styles.derechoNumberText}>{item.numero}</Text>
            </View>
            <Text style={styles.derechoName}>{item.nombre}</Text>
          </View>
          <Text style={styles.derechoDesc}>{item.descripcion}</Text>
          <View style={styles.ejemploBox}>
            <Text style={styles.ejemploLabel}>Ejemplo práctico:</Text>
            <Text style={styles.ejemploText}>{item.ejemplo}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function ValoracionTab() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const data = nursingData.valoracionPreAdministracion;
  return (
    <View>
      <Text style={useMemo(() => createStyles(colors, rs), [colors, rs]).tabDescription}>{data.descripcion}</Text>
      {data.categorias.map((cat: NursingAssessmentCategory, i: number) => (
        <CollapsibleSection
          key={i}
          title={cat.nombre}
          icon={cat.nombre === 'Signos Vitales' ? 'heart' : cat.nombre === 'Alergias' ? 'cancel' : cat.nombre === 'Estado del Paciente' ? 'hospital-box' : 'refresh'}
          accentColor={colors.nursing}
          badge={`${cat.items.length}`}
          initiallyOpen={i === 0}
        >
          <BulletList items={cat.items} color={colors.nursing} />
        </CollapsibleSection>
      ))}
    </View>
  );
}

function ViasTab() {
  const data = nursingData.cuidadosPorVia;
  const viaColors = ['#2563EB', '#DC2626', '#059669', '#D97706', '#7C3AED', '#EC4899'];
  return (
    <View>
      {data.vias.map((via: NursingRouteCare, i: number) => (
        <CollapsibleSection
          key={i}
          title={via.nombre}
          icon={via.nombre.includes('Oral') ? 'pill' : via.nombre.includes('Intravenosa') ? 'needle' : via.nombre.includes('Intramuscular') ? 'arm-flex-outline' : via.nombre.includes('Subcutánea') ? 'circle-medium' : via.nombre.includes('Inhalatoria') ? 'weather-windy' : 'bandage'}
          accentColor={viaColors[i % viaColors.length]}
          badge={`${via.cuidados.length}`}
        >
          <NumberedList items={via.cuidados} color={viaColors[i % viaColors.length]} />
        </CollapsibleSection>
      ))}
    </View>
  );
}

function AltoRiesgoTab() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const data = nursingData.medicamentosAltoRiesgo;
  return (
    <View>
      <Text style={styles.tabDescription}>{data.descripcion}</Text>
      <View style={styles.apinchBadge}>
        <Text style={styles.apinchText}>A · P · I · N · C · H</Text>
      </View>
      {data.categorias.map((cat: NursingHighRiskCategory, i: number) => (
        <CollapsibleSection key={i} title={cat.nombre} icon="alert-outline" accentColor={colors.error} badge={`${cat.farmacos.length}`}>
          <View style={styles.farmacosRow}>
            {cat.farmacos.map((f: string, j: number) => (
              <View key={j} style={styles.farmacoChip}>
                <Text style={styles.farmacoChipText}>{f}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.precaucionTitle}>Precauciones:</Text>
          <BulletList items={cat.precauciones} color={colors.error} />
        </CollapsibleSection>
      ))}
    </View>
  );
}

function ProcedimientosTab() {
  const procColors = ['#2563EB', '#7C3AED', '#DC2626', '#DC2626'];
  const data = nursingData.procedimientosEspeciales;
  return (
    <View>
      {data.procedimientos.map((proc: NursingProcedure, i: number) => (
        <CollapsibleSection
          key={i}
          title={proc.nombre}
          icon={i === 0 ? 'wrench-outline' : i === 1 ? 'flask-outline' : i === 2 ? 'alert-octagon' : 'needle'}
          accentColor={procColors[i]}
          badge={`${proc.pasos.length} pasos`}
        >
          <NumberedList items={proc.pasos} color={procColors[i]} />
        </CollapsibleSection>
      ))}
    </View>
  );
}

function DocumentacionTab() {
  const { colors } = useTheme();
  const data = nursingData.documentacionEnfermeria;
  return (
    <View>
      {data.secciones.map((sec: NursingDocSection, i: number) => (
        <CollapsibleSection
          key={i}
          title={sec.nombre}
          icon={i === 0 ? 'pencil-outline' : i === 1 ? 'close-circle-outline' : 'lightning-bolt'}
          accentColor={i === 0 ? colors.success : i === 1 ? colors.warning : colors.error}
          badge={`${sec.items.length}`}
          initiallyOpen={i === 0}
        >
          <BulletList items={sec.items} color={i === 0 ? colors.success : i === 1 ? colors.warning : colors.error} />
        </CollapsibleSection>
      ))}
    </View>
  );
}

function CalculosTab() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const data = nursingData.calculosFarmacologicos;
  return (
    <View>
      {data.formulas.map((form: NursingCalcFormula, i: number) => (
        <View key={i} style={styles.formulaCard}>
          <Text style={styles.formulaName}>{form.nombre}</Text>
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>{form.formula}</Text>
          </View>
          <View style={styles.ejemploBox}>
            <Text style={styles.ejemploLabel}>Ejemplo:</Text>
            <Text style={styles.ejemploText}>{form.ejemplo}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export function NursingCareScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const [activeTab, setActiveTab] = useState<TabKey>('derechos');

  const renderContent = () => {
    switch (activeTab) {
      case 'derechos': return <DerechosTab />;
      case 'valoracion': return <ValoracionTab />;
      case 'vias': return <ViasTab />;
      case 'altoRiesgo': return <AltoRiesgoTab />;
      case 'procedimientos': return <ProcedimientosTab />;
      case 'documentacion': return <DocumentacionTab />;
      case 'calculos': return <CalculosTab />;
    }
  };

  const activeTabData = TABS.find(t => t.key === activeTab)!;

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={colors.nursing} barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="account-heart-outline" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Cuidados de Enfermería</Text>
        </View>
        <Text style={styles.headerSubtitle}>Protocolos y guías clínicas</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll} contentContainerStyle={styles.tabContent}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabChip, activeTab === tab.key && styles.tabChipActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name={tab.iconName} size={14} color={activeTab === tab.key ? colors.nursing : colors.textSecondary} />
            <Text style={[styles.tabChipLabel, activeTab === tab.key && styles.tabChipLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.contentHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name={activeTabData.iconName} size={20} color={colors.text} style={{ marginRight: 8 }} />
            <Text style={styles.contentTitle}>{nursingData[
            activeTab === 'derechos' ? 'derechosAdministracion' :
            activeTab === 'valoracion' ? 'valoracionPreAdministracion' :
            activeTab === 'vias' ? 'cuidadosPorVia' :
            activeTab === 'altoRiesgo' ? 'medicamentosAltoRiesgo' :
            activeTab === 'procedimientos' ? 'procedimientosEspeciales' :
            activeTab === 'documentacion' ? 'documentacionEnfermeria' :
            'calculosFarmacologicos'
          ].titulo}</Text>
          </View>
        </View>

        {renderContent()}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: { backgroundColor: colors.nursing, paddingTop: rs.space(16), paddingBottom: rs.space(16), paddingHorizontal: rs.space(20) },
  headerTitle: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  tabScroll: { backgroundColor: colors.surface, maxHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tabContent: { paddingHorizontal: rs.space(12), paddingVertical: rs.space(8), gap: rs.space(6) },
  tabChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: rs.space(12), paddingVertical: rs.space(6), borderRadius: 20, backgroundColor: colors.background, gap: 4 },
  tabChipActive: { backgroundColor: colors.nursing + '18', borderWidth: 1, borderColor: colors.nursing },
  tabChipIcon: { fontSize: rs.font(14) },
  tabChipLabel: { fontSize: rs.font(12), fontWeight: '600', color: colors.textSecondary },
  tabChipLabelActive: { color: colors.nursing, fontWeight: '700' },
  scroll: { flex: 1 },
  contentHeader: { paddingHorizontal: rs.space(16), paddingTop: rs.space(16), paddingBottom: rs.space(8) },
  contentTitle: { fontSize: rs.font(18), fontWeight: '700', color: colors.text },
  tabDescription: { fontSize: rs.font(14), color: colors.textSecondary, marginHorizontal: rs.space(16), marginBottom: rs.space(12), lineHeight: rs.font(20) },
  derechoCard: { ...neuCardSubtle(colors), marginHorizontal: rs.space(16), marginBottom: rs.space(10), padding: rs.space(14) },
  derechoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(8) },
  derechoNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.nursing, alignItems: 'center', justifyContent: 'center', marginRight: rs.space(10) },
  derechoNumberText: { color: '#FFFFFF', fontSize: rs.font(16), fontWeight: '800' },
  derechoName: { fontSize: rs.font(16), fontWeight: '700', color: colors.text, flex: 1 },
  derechoDesc: { fontSize: rs.font(14), color: colors.text, lineHeight: rs.font(20), marginBottom: rs.space(8) },
  ejemploBox: { backgroundColor: colors.nursing + '08', borderRadius: 8, padding: rs.space(10), borderLeftWidth: 3, borderLeftColor: colors.nursing },
  ejemploLabel: { fontSize: rs.font(11), fontWeight: '700', color: colors.nursing, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  ejemploText: { fontSize: rs.font(13), color: colors.text, lineHeight: rs.font(19), fontStyle: 'italic' },
  bulletRow: { flexDirection: 'row', marginBottom: rs.space(6), paddingRight: rs.space(8) },
  bullet: { fontSize: rs.font(14), color: colors.text, marginRight: rs.space(8), marginTop: 1 },
  bulletText: { fontSize: rs.font(14), color: colors.text, flex: 1, lineHeight: rs.font(20) },
  numberedRow: { flexDirection: 'row', marginBottom: rs.space(10), alignItems: 'flex-start' },
  numberBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: rs.space(10), marginTop: 1 },
  numberText: { fontSize: rs.font(12), fontWeight: '700' },
  numberedText: { fontSize: rs.font(14), color: colors.text, flex: 1, lineHeight: rs.font(20) },
  apinchBadge: { alignSelf: 'center', backgroundColor: colors.error + '15', paddingHorizontal: rs.space(20), paddingVertical: rs.space(8), borderRadius: 20, borderWidth: 1, borderColor: colors.error + '40', marginBottom: rs.space(12) },
  apinchText: { fontSize: rs.font(18), fontWeight: '800', color: colors.error, letterSpacing: 3 },
  farmacosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: rs.space(6), marginBottom: rs.space(10) },
  farmacoChip: { backgroundColor: colors.error + '12', paddingHorizontal: rs.space(10), paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: colors.error + '25' },
  farmacoChipText: { fontSize: rs.font(12), fontWeight: '600', color: colors.error },
  precaucionTitle: { fontSize: rs.font(13), fontWeight: '700', color: colors.textSecondary, marginBottom: rs.space(6), textTransform: 'uppercase', letterSpacing: 0.5 },
  formulaCard: { ...neuCardSubtle(colors), marginHorizontal: rs.space(16), marginBottom: rs.space(10), padding: rs.space(14) },
  formulaName: { fontSize: rs.font(16), fontWeight: '700', color: colors.text, marginBottom: rs.space(8) },
  formulaBox: { backgroundColor: colors.surfaceElevated, borderRadius: 8, padding: rs.space(12), marginBottom: rs.space(8) },
  formulaText: { fontSize: rs.font(14), color: colors.text, fontFamily: 'monospace', lineHeight: rs.font(20) },
  bottomSpacer: { height: 40 },
});
