import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated, TextInput, Alert } from 'react-native';
import ClipboardService from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList } from '../types';
import { FORMULA_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import { useFadeIn } from '../utils/animations';
import formulas from '../data/formulas.json';
import pathologies from '../data/pathologies.json';
import scalesData from '../data/clinical_scales.json';
import protocolsData from '../data/emergency_protocols.json';
import labValuesData from '../data/lab_values.json';
import type { Formula } from '../types';
import { exportUserData, importUserData } from '../utils/backup';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Herramientas'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

const categoryLabels: Record<string, string> = {
  dosificacion: '💊 Dosificación',
  goteo: '💧 Goteo e Infusión',
  conversion: '🔄 Conversión de Unidades',
  pediatria: '👶 Pediatría',
  renal: '🫘 Función Renal',
};

const PREMIUM_TARGETS = new Set([
  'dashboard', 'quiz', 'comparison', 'interactions', 'calculators',
  'scales', 'labValues', 'emergencyProtocols', 'parenteralGuide',
]);

export function ToolsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { isPremium, isFreeBuild } = usePremium();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');

  const handleExport = async () => {
    try { await exportUserData(isPremium); }
    catch (e) { Alert.alert('Error', 'No se pudo exportar los datos.'); }
  };

  const handleImport = async () => {
    const text = importText.trim();
    if (!text) {
      Alert.alert('Vacío', 'Pega el JSON de backup en el campo de texto.');
      return;
    }
    const result = await importUserData(text, isPremium);
    Alert.alert(result.imported ? 'Importado' : 'Error', result.message);
    if (result.imported) { setShowImport(false); setImportText(''); }
  };

  const handlePaste = async () => {
    const text = await ClipboardService.getString();
    if (text) setImportText(text);
  };

  const toolSections = [
    {
      icon: '❤️',
      title: 'Mis Favoritos',
      subtitle: 'Todos tus fármacos marcados como favoritos',
      color: '#E91E63',
      target: 'favorites' as const,
    },
    {
      icon: '📝',
      title: 'Mis Notas',
      subtitle: 'Notas personales en fármacos',
      color: '#F59E0B',
      target: 'notes' as const,
    },
    {
      icon: '📊',
      title: 'Dashboard de Estudio',
      subtitle: 'Progreso, estadísticas y racha de estudio',
      color: colors.quiz,
      target: 'dashboard' as const,
    },
    {
      icon: '🧠',
      title: 'Modo Estudio',
      subtitle: 'Test interactivo de farmacología',
      color: colors.quiz,
      target: 'quiz' as const,
    },
    {
      icon: '⚖️',
      title: 'Comparador de Fármacos',
      subtitle: 'Compara hasta 3 fármacos lado a lado',
      color: '#0891B2',
      target: 'comparison' as const,
    },
    {
      icon: '🏥',
      title: 'Patologías Clínicas',
      subtitle: `${pathologies.length} patologías con fármacos vinculados`,
      color: '#0F766E',
      target: 'pathologies' as const,
    },
    {
      icon: '⚠️',
      title: 'Verificar Interacciones',
      subtitle: 'Comprueba interacciones entre fármacos',
      color: '#7C3AED',
      target: 'interactions' as const,
    },
    {
      icon: '📊',
      title: 'Escalas Clínicas',
      subtitle: `${scalesData.length} escalas interactivas de valoración`,
      color: '#7C3AED',
      target: 'scales' as const,
    },
    {
      icon: '🔬',
      title: 'Valores de Laboratorio',
      subtitle: `${labValuesData.length} valores de referencia clínica`,
      color: '#2563EB',
      target: 'labValues' as const,
    },
    {
      icon: '🚨',
      title: 'Protocolos de Emergencia',
      subtitle: `${protocolsData.length} protocolos con fármacos y dosis`,
      color: '#DC2626',
      target: 'emergencyProtocols' as const,
    },
    {
      icon: '👩‍⚕️',
      title: 'Cuidados de Enfermería',
      subtitle: '10 correctos, valoración, alto riesgo, procedimientos',
      color: colors.nursing || '#E91E63',
      target: 'nursing' as const,
    },
    {
      icon: '🧮',
      title: 'Calculadoras Clínicas',
      subtitle: '15 calculadoras interactivas con interpretación',
      color: '#0891B2',
      target: 'calculators' as const,
    },
    {
      icon: '💉',
      title: 'Guía Parenteral',
      subtitle: 'Administración de medicamentos por vía parenteral',
      color: '#0891B2',
      target: 'parenteralGuide' as const,
    },
    {
      icon: '📖',
      title: 'Glosario Farmacológico',
      subtitle: 'Términos, abreviaturas y definiciones',
      color: '#7C3AED',
      target: 'glossary' as const,
    },
  ];

  // Group formulas by category
  const groupedFormulas: Record<string, Formula[]> = {};
  (formulas as Formula[]).forEach(f => {
    if (!groupedFormulas[f.categoria]) groupedFormulas[f.categoria] = [];
    groupedFormulas[f.categoria].push(f);
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: colors.accent, paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>🔧 Herramientas</Text>
        <Text style={styles.headerSubtitle}>Calculadoras, escalas, protocolos y más</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Tool Cards */}
        <View style={styles.toolsGrid}>
          {toolSections.map((tool, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.toolCard, { borderLeftColor: tool.color }]}
              onPress={() => {
                if (tool.target === 'favorites') navigation.navigate('AllFavorites');
                else if (tool.target === 'notes') navigation.navigate('AllNotes');
                else if (tool.target === 'dashboard') navigation.navigate('Dashboard');
                else if (tool.target === 'quiz') navigation.navigate('QuizScreen');
                else if (tool.target === 'comparison') navigation.navigate('DrugComparison');
                else if (tool.target === 'glossary') navigation.navigate('GlossaryScreen');
                else if (tool.target === 'nursing') navigation.navigate('NursingCare');
                else if (tool.target === 'pathologies') navigation.navigate('PathologiesScreen');
                else if (tool.target === 'interactions') navigation.navigate('InteractionChecker');
                else if (tool.target === 'calculators') navigation.navigate('Calculators');
                else if (tool.target === 'scales') navigation.navigate('ClinicalScales');
                else if (tool.target === 'labValues') navigation.navigate('LabValues');
                else if (tool.target === 'emergencyProtocols') navigation.navigate('EmergencyProtocols');
                else if (tool.target === 'parenteralGuide') navigation.navigate('ParenteralGuide');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <View style={styles.toolText}>
                <Text style={styles.toolTitle}>
                  {tool.title}
                  {!isFreeBuild && !isPremium && PREMIUM_TARGETS.has(tool.target) ? ' 🔒' : ''}
                </Text>
                <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
              </View>
              <Text style={styles.toolArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Backup Section */}
        <Text style={styles.sectionTitle}>💾 Mis Datos</Text>
        <View style={styles.backupSection}>
          <TouchableOpacity style={[styles.backupButton, { backgroundColor: colors.success + '15', borderColor: colors.success + '30' }]} onPress={handleExport} activeOpacity={0.7}>
            <Text style={styles.backupIcon}>📤</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.backupTitle, { color: colors.success }]}>Exportar datos</Text>
              <Text style={styles.backupSubtitle}>Favoritos, notas, tests, historial</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.backupButton, { backgroundColor: colors.info + '15', borderColor: colors.info + '30' }]} onPress={() => setShowImport(!showImport)} activeOpacity={0.7}>
            <Text style={styles.backupIcon}>📥</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.backupTitle, { color: colors.info }]}>Importar datos</Text>
              <Text style={styles.backupSubtitle}>Restaurar desde backup JSON</Text>
            </View>
          </TouchableOpacity>
          {showImport && (
            <View style={styles.importArea}>
              <TextInput
                style={[styles.importInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
                value={importText}
                onChangeText={setImportText}
                placeholder="Pega el JSON de backup aquí..."
                placeholderTextColor={colors.textLight}
                multiline
                textAlignVertical="top"
              />
              <View style={styles.importButtons}>
                <TouchableOpacity style={[styles.importBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={handlePaste}>
                  <Text style={[styles.importBtnText, { color: colors.text }]}>📋 Pegar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.importBtn, { backgroundColor: colors.info, borderColor: colors.info }]} onPress={handleImport}>
                  <Text style={[styles.importBtnText, { color: '#FFFFFF' }]}>Importar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Formula Quick Access */}
        <Text style={styles.sectionTitle}>🧮 Fórmulas de Cálculo</Text>
        {Object.entries(groupedFormulas).map(([cat, fms]) => (
          <View key={cat} style={styles.formulaGroup}>
            <Text style={[styles.formulaCategoryTitle, { color: FORMULA_COLORS[cat] || colors.text }]}>
              {categoryLabels[cat] || cat}
            </Text>
            {fms.map(formula => (
              <TouchableOpacity
                key={formula.id}
                style={styles.formulaCard}
                onPress={() => navigation.navigate('FormulaDetail', { formulaId: formula.id })}
                activeOpacity={0.7}
              >
                <View style={[styles.formulaColor, { backgroundColor: FORMULA_COLORS[formula.categoria] || colors.primary }]} />
                <View style={styles.formulaContent}>
                  <Text style={styles.formulaName}>{formula.nombre}</Text>
                  <Text style={styles.formulaFormula} numberOfLines={1}>{formula.formula}</Text>
                </View>
                <Text style={styles.formulaArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Routes Quick Access */}
        <Text style={styles.sectionTitle}>💉 Vías de Administración</Text>
        <View style={styles.routesGrid}>
          {([
            { id: 'oral', icon: '💊', name: 'Oral' },
            { id: 'IV', icon: '💉', name: 'Intravenosa' },
            { id: 'IM', icon: '💪', name: 'Intramuscular' },
            { id: 'SC', icon: '📌', name: 'Subcutánea' },
            { id: 'sublingual', icon: '👅', name: 'Sublingual' },
            { id: 'inhalatoria', icon: '🌬️', name: 'Inhalatoria' },
            { id: 'topica', icon: '🧴', name: 'Tópica' },
            { id: 'transdermica', icon: '🩹', name: 'Transdérmica' },
            { id: 'rectal', icon: '💠', name: 'Rectal' },
            { id: 'oftalmica', icon: '👁️', name: 'Oftálmica' },
            { id: 'otica', icon: '👂', name: 'Ótica' },
            { id: 'nasal', icon: '👃', name: 'Nasal' },
            { id: 'vaginal', icon: '🔴', name: 'Vaginal' },
            { id: 'intradermica', icon: '💧', name: 'Intradérmica' },
            { id: 'epidural', icon: '🔷', name: 'Epidural' },
          ] as const).map(r => (
            <TouchableOpacity
              key={r.id}
              style={styles.routeCard}
              onPress={() => navigation.navigate('RouteDetail', { routeId: r.id })}
              activeOpacity={0.7}
            >
              <Text style={styles.routeIcon}>{r.icon}</Text>
              <Text style={styles.routeName}>{r.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  scroll: { flex: 1 },
  toolsGrid: { padding: 16, gap: 10 },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
  },
  toolIcon: { fontSize: 32, marginRight: 14 },
  toolText: { flex: 1 },
  toolTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  toolSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  toolArrow: { fontSize: 18, color: colors.textLight },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  formulaGroup: { marginBottom: 8 },
  formulaCategoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 6,
  },
  formulaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
  },
  formulaColor: { width: 4, alignSelf: 'stretch' },
  formulaContent: { flex: 1, padding: 12 },
  formulaName: { fontSize: 14, fontWeight: '600', color: colors.text },
  formulaFormula: { fontSize: 11, color: colors.textLight, marginTop: 2, fontFamily: 'monospace' },
  formulaArrow: { fontSize: 20, color: colors.textLight, marginRight: 12 },
  routesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  routeCard: {
    width: '22%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    marginHorizontal: '1.5%',
  },
  routeIcon: { fontSize: 28 },
  routeName: { fontSize: 11, color: colors.text, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  backupSection: { paddingHorizontal: 16, gap: 8 },
  backupButton: {
    flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1,
  },
  backupIcon: { fontSize: 28, marginRight: 12 },
  backupTitle: { fontSize: 15, fontWeight: '700' },
  backupSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  importArea: { marginTop: 8 },
  importInput: {
    minHeight: 80, borderRadius: 10, padding: 12, fontSize: 13, borderWidth: 1,
  },
  importButtons: { flexDirection: 'row', gap: 8, marginTop: 8, justifyContent: 'flex-end' },
  importBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
  importBtnText: { fontSize: 13, fontWeight: '600' },
});