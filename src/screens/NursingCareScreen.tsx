import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useFadeIn } from '../utils/animations';
import type { NursingCareData, NursingRight, NursingAssessmentCategory, NursingRouteCare, NursingHighRiskCategory, NursingProcedure, NursingDocSection, NursingCalcFormula } from '../types';

const nursingData: NursingCareData = require('../data/nursing_care.json');

type TabKey = 'derechos' | 'valoracion' | 'vias' | 'altoRiesgo' | 'procedimientos' | 'documentacion' | 'calculos';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'derechos', label: '10 Correctos', icon: '✅' },
  { key: 'valoracion', label: 'Valoración', icon: '🩺' },
  { key: 'vias', label: 'Vías', icon: '💉' },
  { key: 'altoRiesgo', label: 'Alto Riesgo', icon: '⚠️' },
  { key: 'procedimientos', label: 'Procedimientos', icon: '📋' },
  { key: 'documentacion', label: 'Documentación', icon: '📝' },
  { key: 'calculos', label: 'Cálculos', icon: '🧮' },
];

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

function NumberedList({ items, color }: { items: string[]; color?: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
  const styles = useMemo(() => createStyles(colors), [colors]);
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
  const data = nursingData.valoracionPreAdministracion;
  return (
    <View>
      <Text style={useMemo(() => createStyles(colors), [colors]).tabDescription}>{data.descripcion}</Text>
      {data.categorias.map((cat: NursingAssessmentCategory, i: number) => (
        <CollapsibleSection
          key={i}
          title={cat.nombre}
          icon={cat.nombre === 'Signos Vitales' ? '❤️' : cat.nombre === 'Alergias' ? '🚫' : cat.nombre === 'Estado del Paciente' ? '🏥' : '🔄'}
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
          icon={via.nombre.includes('Oral') ? '💊' : via.nombre.includes('Intravenosa') ? '💉' : via.nombre.includes('Intramuscular') ? '💪' : via.nombre.includes('Subcutánea') ? '🔵' : via.nombre.includes('Inhalatoria') ? '🌬️' : '🩹'}
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
  const styles = useMemo(() => createStyles(colors), [colors]);
  const data = nursingData.medicamentosAltoRiesgo;
  return (
    <View>
      <Text style={styles.tabDescription}>{data.descripcion}</Text>
      <View style={styles.apinchBadge}>
        <Text style={styles.apinchText}>A · P · I · N · C · H</Text>
      </View>
      {data.categorias.map((cat: NursingHighRiskCategory, i: number) => (
        <CollapsibleSection key={i} title={cat.nombre} icon="⚠️" accentColor={colors.error} badge={`${cat.farmacos.length}`}>
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
          icon={i === 0 ? '🔧' : i === 1 ? '⚗️' : i === 2 ? '🚨' : '💉'}
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
          icon={i === 0 ? '✍️' : i === 1 ? '❌' : '⚡'}
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
  const styles = useMemo(() => createStyles(colors), [colors]);
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
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
      <StatusBar backgroundColor={colors.nursing} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>👩‍⚕️ Cuidados de Enfermería</Text>
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
            <Text style={styles.tabChipIcon}>{tab.icon}</Text>
            <Text style={[styles.tabChipLabel, activeTab === tab.key && styles.tabChipLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>{activeTabData.icon} {nursingData[
            activeTab === 'derechos' ? 'derechosAdministracion' :
            activeTab === 'valoracion' ? 'valoracionPreAdministracion' :
            activeTab === 'vias' ? 'cuidadosPorVia' :
            activeTab === 'altoRiesgo' ? 'medicamentosAltoRiesgo' :
            activeTab === 'procedimientos' ? 'procedimientosEspeciales' :
            activeTab === 'documentacion' ? 'documentacionEnfermeria' :
            'calculosFarmacologicos'
          ].titulo}</Text>
        </View>

        {renderContent()}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.nursing, paddingTop: 16, paddingBottom: 16, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  tabScroll: { backgroundColor: colors.surface, maxHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tabContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  tabChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: colors.background, gap: 4 },
  tabChipActive: { backgroundColor: colors.nursing + '18', borderWidth: 1, borderColor: colors.nursing },
  tabChipIcon: { fontSize: 14 },
  tabChipLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  tabChipLabelActive: { color: colors.nursing, fontWeight: '700' },
  scroll: { flex: 1 },
  contentHeader: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  contentTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  tabDescription: { fontSize: 14, color: colors.textSecondary, marginHorizontal: 16, marginBottom: 12, lineHeight: 20 },
  derechoCard: { backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10, padding: 14, borderRadius: 12, elevation: 1, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  derechoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  derechoNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.nursing, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  derechoNumberText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  derechoName: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 },
  derechoDesc: { fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: 8 },
  ejemploBox: { backgroundColor: colors.nursing + '08', borderRadius: 8, padding: 10, borderLeftWidth: 3, borderLeftColor: colors.nursing },
  ejemploLabel: { fontSize: 11, fontWeight: '700', color: colors.nursing, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  ejemploText: { fontSize: 13, color: colors.text, lineHeight: 19, fontStyle: 'italic' },
  bulletRow: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  bullet: { fontSize: 14, color: colors.text, marginRight: 8, marginTop: 1 },
  bulletText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  numberedRow: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  numberBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1 },
  numberText: { fontSize: 12, fontWeight: '700' },
  numberedText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  apinchBadge: { alignSelf: 'center', backgroundColor: colors.error + '15', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.error + '40', marginBottom: 12 },
  apinchText: { fontSize: 18, fontWeight: '800', color: colors.error, letterSpacing: 3 },
  farmacosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  farmacoChip: { backgroundColor: colors.error + '12', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: colors.error + '25' },
  farmacoChipText: { fontSize: 12, fontWeight: '600', color: colors.error },
  precaucionTitle: { fontSize: 13, fontWeight: '700', color: colors.textSecondary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  formulaCard: { backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10, padding: 14, borderRadius: 12, elevation: 1 },
  formulaName: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 },
  formulaBox: { backgroundColor: colors.surfaceElevated, borderRadius: 8, padding: 12, marginBottom: 8 },
  formulaText: { fontSize: 14, color: colors.text, fontFamily: 'monospace', lineHeight: 20 },
  bottomSpacer: { height: 40 },
});