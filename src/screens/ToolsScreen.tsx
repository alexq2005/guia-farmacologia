import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  TextInput,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground } from 'react-native';
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
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import formulas from '../data/formulas.json';
import pathologies from '../data/pathologies.json';
import scalesData from '../data/clinical_scales.json';
import protocolsData from '../data/emergency_protocols.json';
import labValuesData from '../data/lab_values.json';
import type { Formula } from '../types';
import { exportUserData, importUserData } from '../utils/backup';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { useTabBar } from '../context/TabBarContext';
import { getToolImage } from '../utils/toolImages';
import { getRouteImage } from '../utils/routeImages';
import { ROUTE_COLORS } from '../utils/colors';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Herramientas'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

const categoryLabels: Record<string, { icon: string; label: string }> = {
  dosificacion: { icon: 'pill', label: 'Dosificación' },
  goteo: { icon: 'water-outline', label: 'Goteo e Infusión' },
  conversion: { icon: 'swap-horizontal', label: 'Conversión de Unidades' },
  pediatria: { icon: 'baby-face-outline', label: 'Pediatría' },
  renal: { icon: 'filter-outline', label: 'Función Renal' },
};

const PREMIUM_TARGETS = new Set([
  'dashboard',
  'quiz',
  'comparison',
  'interactions',
  'calculators',
  'scales',
  'labValues',
  'emergencyProtocols',
  'parenteralGuide',
]);

export function ToolsScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const { isPremium, isFreeBuild } = usePremium();
  const insets = useSafeAreaInsets();
  const { handleScroll: handleTabBarScroll } = useTabBar();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');

  const handleExport = async () => {
    try {
      await exportUserData(isPremium);
    } catch (e) {
      Alert.alert('Error', 'No se pudo exportar los datos.');
    }
  };

  const handleImport = async () => {
    const text = importText.trim();
    if (!text) {
      Alert.alert('Vacío', 'Pega el JSON de backup en el campo de texto.');
      return;
    }
    const result = await importUserData(text, isPremium);
    Alert.alert(result.imported ? 'Importado' : 'Error', result.message);
    if (result.imported) {
      setShowImport(false);
      setImportText('');
    }
  };

  const handlePaste = async () => {
    const text = await ClipboardService.getString();
    if (text) setImportText(text);
  };

  type ToolTarget =
    | 'favorites'
    | 'notes'
    | 'dashboard'
    | 'quiz'
    | 'comparison'
    | 'pathologies'
    | 'interactions'
    | 'scales'
    | 'labValues'
    | 'emergencyProtocols'
    | 'nursing'
    | 'calculators'
    | 'parenteralGuide'
    | 'glossary'
    | 'misuite';

  const toolGroups: {
    sectionIcon: string;
    sectionTitle: string;
    sectionColor: string;
    tools: {
      icon: string;
      title: string;
      subtitle: string;
      color: string;
      target: ToolTarget;
    }[];
  }[] = [
    {
      sectionIcon: 'clipboard-text-outline',
      sectionTitle: 'Referencia Clínica',
      sectionColor: '#2563EB',
      tools: [
        {
          icon: 'calculator-variant-outline',
          title: 'Calculadoras Clínicas',
          subtitle: '15 calculadoras interactivas con interpretación',
          color: '#0891B2',
          target: 'calculators',
        },
        {
          icon: 'chart-timeline-variant-shimmer',
          title: 'Escalas Clínicas',
          subtitle: `${scalesData.length} escalas interactivas de valoración`,
          color: '#7C3AED',
          target: 'scales',
        },
        {
          icon: 'flask-outline',
          title: 'Valores de Laboratorio',
          subtitle: `${labValuesData.length} valores de referencia clínica`,
          color: '#2563EB',
          target: 'labValues',
        },
        {
          icon: 'hospital-box-outline',
          title: 'Protocolos de Emergencia',
          subtitle: `${protocolsData.length} protocolos con fármacos y dosis`,
          color: '#DC2626',
          target: 'emergencyProtocols',
        },
      ],
    },
    {
      sectionIcon: 'pill',
      sectionTitle: 'Farmacología',
      sectionColor: '#7C3AED',
      tools: [
        {
          icon: 'scale-balance',
          title: 'Comparador de Fármacos',
          subtitle: 'Compara hasta 3 fármacos lado a lado',
          color: '#0891B2',
          target: 'comparison',
        },
        {
          icon: 'swap-horizontal-bold',
          title: 'Verificar Interacciones',
          subtitle: 'Comprueba interacciones entre fármacos',
          color: '#7C3AED',
          target: 'interactions',
        },
        {
          icon: 'iv-bag',
          title: 'Guía Parenteral',
          subtitle: 'Administración de medicamentos por vía parenteral',
          color: '#0891B2',
          target: 'parenteralGuide',
        },
        {
          icon: 'book-alphabet',
          title: 'Glosario Farmacológico',
          subtitle: 'Términos, abreviaturas y definiciones',
          color: '#7C3AED',
          target: 'glossary',
        },
      ],
    },
    {
      sectionIcon: 'stethoscope',
      sectionTitle: 'Enfermería',
      sectionColor: '#059669',
      tools: [
        {
          icon: 'account-heart-outline',
          title: 'Cuidados de Enfermería',
          subtitle: '10 correctos, valoración, alto riesgo, procedimientos',
          color: colors.nursing || '#E91E63',
          target: 'nursing',
        },
        {
          icon: 'stethoscope',
          title: 'Patologías Clínicas',
          subtitle: `${pathologies.length} patologías con fármacos vinculados`,
          color: '#0F766E',
          target: 'pathologies',
        },
      ],
    },
    {
      sectionIcon: 'school-outline',
      sectionTitle: 'Estudio',
      sectionColor: colors.quiz,
      tools: [
        {
          icon: 'head-question-outline',
          title: 'Modo Estudio (Test)',
          subtitle: 'Test interactivo de farmacología',
          color: colors.quiz,
          target: 'quiz',
        },
        {
          icon: 'chart-arc',
          title: 'Dashboard de Estudio',
          subtitle: 'Progreso, estadísticas y racha de estudio',
          color: colors.quiz,
          target: 'dashboard',
        },
      ],
    },
    {
      sectionIcon: 'account-outline',
      sectionTitle: 'Personal',
      sectionColor: '#E91E63',
      tools: [
        {
          icon: 'heart-outline',
          title: 'Mis Favoritos',
          subtitle: 'Todos tus fármacos marcados como favoritos',
          color: '#E91E63',
          target: 'favorites',
        },
        {
          icon: 'note-text-outline',
          title: 'Mis Notas',
          subtitle: 'Notas personales en fármacos',
          color: '#F59E0B',
          target: 'notes',
        },
      ],
    },
    {
      sectionIcon: 'apps',
      sectionTitle: 'Ecosistema',
      sectionColor: '#0EA5E9',
      tools: [
        {
          icon: 'apps',
          title: 'Mi suite',
          subtitle:
            'Las 3 apps de enfermería: Curso + Patologías + Farmacológica',
          color: '#0EA5E9',
          target: 'misuite',
        },
      ],
    },
  ];

  const navigateTo = (target: ToolTarget) => {
    const routes: Record<ToolTarget, () => void> = {
      favorites: () => navigation.navigate('AllFavorites'),
      notes: () => navigation.navigate('AllNotes'),
      dashboard: () => navigation.navigate('Dashboard'),
      quiz: () => navigation.navigate('QuizScreen'),
      comparison: () => navigation.navigate('DrugComparison'),
      glossary: () => navigation.navigate('GlossaryScreen'),
      nursing: () => navigation.navigate('NursingCare'),
      pathologies: () => navigation.navigate('PathologiesScreen'),
      interactions: () => navigation.navigate('InteractionChecker'),
      calculators: () => navigation.navigate('Calculators'),
      scales: () => navigation.navigate('ClinicalScales'),
      labValues: () => navigation.navigate('LabValues'),
      emergencyProtocols: () => navigation.navigate('EmergencyProtocols'),
      parenteralGuide: () => navigation.navigate('ParenteralGuide'),
      misuite: () => navigation.navigate('MiSuite'),
    };
    routes[target]();
  };

  // Group formulas by category
  const groupedFormulas: Record<string, Formula[]> = {};
  (formulas as Formula[]).forEach(f => {
    if (!groupedFormulas[f.categoria]) groupedFormulas[f.categoria] = [];
    groupedFormulas[f.categoria].push(f);
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Herramientas</Text>
        <Text style={styles.headerSubtitle}>
          Calculadoras, escalas, protocolos y más
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleTabBarScroll}
        scrollEventThrottle={16}
      >
        {/* Grouped Tool Sections */}
        {toolGroups.map((group, gi) => (
          <View key={gi} style={styles.sectionGroup}>
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionIconBg,
                  { backgroundColor: group.sectionColor + '15' },
                ]}
              >
                <MaterialCommunityIcons
                  name={group.sectionIcon}
                  size={18}
                  color={group.sectionColor}
                />
              </View>
              <Text style={styles.sectionHeaderTitle}>
                {group.sectionTitle}
              </Text>
            </View>
            <View style={styles.sectionCards}>
              {group.tools.map((tool, ti) => {
                const toolImage = getToolImage(tool.target);
                return (
                  <TouchableOpacity
                    key={ti}
                    style={styles.toolCard}
                    onPress={() => navigateTo(tool.target)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`${tool.title}. ${tool.subtitle}`}
                  >
                    <ImageBackground
                      source={
                        toolImage ||
                        require('../assets/images/units/hero_pharmacy.jpg')
                      }
                      style={styles.toolImageBg}
                      imageStyle={{ borderRadius: 16 }}
                      resizeMode="cover"
                    >
                      <LinearGradient
                        colors={[tool.color + '60', tool.color + 'E6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.toolGradient}
                      >
                        <View style={styles.toolContent}>
                          <MaterialCommunityIcons
                            name={tool.icon}
                            size={24}
                            color="#FFFFFF"
                          />
                          <View style={{ flex: 1, marginLeft: 12 }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Text style={styles.toolTitle}>{tool.title}</Text>
                              {!isFreeBuild &&
                                !isPremium &&
                                PREMIUM_TARGETS.has(tool.target) && (
                                  <MaterialCommunityIcons
                                    name="lock-outline"
                                    size={13}
                                    color="rgba(255,255,255,0.6)"
                                    style={{ marginLeft: 4 }}
                                  />
                                )}
                            </View>
                            <Text style={styles.toolSubtitle}>
                              {tool.subtitle}
                            </Text>
                          </View>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={20}
                            color="rgba(255,255,255,0.7)"
                          />
                        </View>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Backup Section */}
        <View style={styles.sectionGroup}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.sectionIconBg,
                { backgroundColor: colors.success + '15' },
              ]}
            >
              <MaterialCommunityIcons
                name="cloud-sync-outline"
                size={18}
                color={colors.success}
              />
            </View>
            <Text style={styles.sectionHeaderTitle}>Mis Datos</Text>
          </View>
        </View>
        <View style={styles.backupSection}>
          <TouchableOpacity
            style={[
              styles.backupButton,
              {
                backgroundColor: colors.success + '15',
                borderColor: colors.success + '30',
              },
            ]}
            onPress={handleExport}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Exportar datos: favoritos, notas, tests e historial"
          >
            <MaterialCommunityIcons
              name="upload-outline"
              size={26}
              color={colors.success}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.backupTitle, { color: colors.success }]}>
                Exportar datos
              </Text>
              <Text style={styles.backupSubtitle}>
                Favoritos, notas, tests, historial
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.backupButton,
              {
                backgroundColor: colors.info + '15',
                borderColor: colors.info + '30',
              },
            ]}
            onPress={() => setShowImport(!showImport)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Importar datos desde backup JSON"
            accessibilityState={{ expanded: showImport }}
          >
            <MaterialCommunityIcons
              name="download-outline"
              size={26}
              color={colors.info}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.backupTitle, { color: colors.info }]}>
                Importar datos
              </Text>
              <Text style={styles.backupSubtitle}>
                Restaurar desde backup JSON
              </Text>
            </View>
          </TouchableOpacity>
          {showImport && (
            <View style={styles.importArea}>
              <TextInput
                style={[
                  styles.importInput,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
                value={importText}
                onChangeText={setImportText}
                placeholder="Pega el JSON de backup aquí..."
                placeholderTextColor={colors.textLight}
                multiline
                textAlignVertical="top"
                accessibilityLabel="Campo para pegar el JSON de backup"
              />
              <View style={styles.importButtons}>
                <TouchableOpacity
                  style={[
                    styles.importBtn,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={handlePaste}
                  accessibilityRole="button"
                  accessibilityLabel="Pegar desde el portapapeles"
                >
                  <Text style={[styles.importBtnText, { color: colors.text }]}>
                    Pegar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.importBtn,
                    { backgroundColor: colors.info, borderColor: colors.info },
                  ]}
                  onPress={handleImport}
                  accessibilityRole="button"
                  accessibilityLabel="Importar el backup pegado"
                >
                  <Text style={[styles.importBtnText, { color: '#FFFFFF' }]}>
                    Importar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Formula Quick Access */}
        <View style={styles.sectionGroup}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.sectionIconBg,
                { backgroundColor: '#0891B2' + '15' },
              ]}
            >
              <MaterialCommunityIcons
                name="function-variant"
                size={18}
                color="#0891B2"
              />
            </View>
            <Text style={styles.sectionHeaderTitle}>Fórmulas de Cálculo</Text>
          </View>
        </View>
        {Object.entries(groupedFormulas).map(([cat, fms]) => (
          <View key={cat} style={styles.formulaGroup}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                marginBottom: 6,
              }}
            >
              <MaterialCommunityIcons
                name={categoryLabels[cat]?.icon || 'calculator'}
                size={16}
                color={FORMULA_COLORS[cat] || colors.text}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.formulaCategoryTitle,
                  {
                    color: FORMULA_COLORS[cat] || colors.text,
                    marginHorizontal: 0,
                    marginBottom: 0,
                  },
                ]}
              >
                {categoryLabels[cat]?.label || cat}
              </Text>
            </View>
            {fms.map(formula => (
              <TouchableOpacity
                key={formula.id}
                style={styles.formulaCard}
                onPress={() =>
                  navigation.navigate('FormulaDetail', {
                    formulaId: formula.id,
                  })
                }
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Fórmula: ${formula.nombre}`}
              >
                <View
                  style={[
                    styles.formulaColor,
                    {
                      backgroundColor:
                        FORMULA_COLORS[formula.categoria] || colors.primary,
                    },
                  ]}
                />
                <View style={styles.formulaContent}>
                  <Text style={styles.formulaName}>{formula.nombre}</Text>
                  <Text style={styles.formulaFormula} numberOfLines={1}>
                    {formula.formula}
                  </Text>
                </View>
                <Text style={styles.formulaArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Routes Quick Access */}
        <View style={styles.sectionGroup}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.sectionIconBg,
                { backgroundColor: colors.primary + '15' },
              ]}
            >
              <MaterialCommunityIcons
                name="directions-fork"
                size={18}
                color={colors.primary}
              />
            </View>
            <Text style={styles.sectionHeaderTitle}>
              Vías de Administración
            </Text>
          </View>
        </View>
        <View style={styles.routesGrid}>
          {(
            [
              { id: 'oral', name: 'Oral' },
              { id: 'IV', name: 'Intravenosa' },
              { id: 'IM', name: 'Intramuscular' },
              { id: 'SC', name: 'Subcutánea' },
              { id: 'sublingual', name: 'Sublingual' },
              { id: 'inhalatoria', name: 'Inhalatoria' },
              { id: 'topica', name: 'Tópica' },
              { id: 'transdermica', name: 'Transdérmica' },
              { id: 'rectal', name: 'Rectal' },
              { id: 'oftalmica', name: 'Oftálmica' },
              { id: 'otica', name: 'Ótica' },
              { id: 'nasal', name: 'Nasal' },
              { id: 'vaginal', name: 'Vaginal' },
              { id: 'intradermica', name: 'Intradérmica' },
              { id: 'epidural', name: 'Epidural' },
            ] as const
          ).map(r => {
            const routeColor = ROUTE_COLORS[r.id] || colors.primary;
            return (
              <TouchableOpacity
                key={r.id}
                onPress={() =>
                  navigation.navigate('RouteDetail', { routeId: r.id })
                }
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`Vía ${r.name}`}
                style={{
                  width: '30%',
                  marginHorizontal: '1.5%',
                  marginBottom: rs.space(10),
                  borderRadius: 16,
                  overflow: 'hidden',
                  elevation: 3,
                  shadowColor: routeColor,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                }}
              >
                <ImageBackground
                  source={getRouteImage(r.id)}
                  style={{ width: '100%', height: rs.space(90) }}
                  imageStyle={{ borderRadius: 16 }}
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={[
                      'transparent',
                      routeColor + '90',
                      routeColor + 'E0',
                    ]}
                    locations={[0, 0.5, 1]}
                    style={{
                      flex: 1,
                      borderRadius: 16,
                      justifyContent: 'flex-end',
                      padding: rs.space(8),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: rs.font(10.5),
                        fontWeight: '800',
                        color: '#fff',
                        textAlign: 'center',
                        textShadowColor: 'rgba(0,0,0,0.4)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                      }}
                    >
                      {r.name}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neuBackground },
    header: {
      paddingBottom: rs.space(16),
      paddingHorizontal: rs.space(20),
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      marginTop: 2,
    },
    scroll: { flex: 1 },
    sectionGroup: { marginTop: rs.space(16) },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: rs.space(20),
      marginBottom: rs.space(10),
    },
    sectionIconBg: {
      width: rs.space(30),
      height: rs.space(30),
      borderRadius: 8,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: rs.space(8),
    },
    sectionHeaderTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
    },
    sectionCards: { paddingHorizontal: rs.space(16), gap: rs.space(8) },
    toolsGrid: { padding: rs.space(16), gap: rs.space(10) },
    toolCard: {
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 2,
    },
    toolImageBg: {
      minHeight: rs.space(72),
    },
    toolGradient: {
      flex: 1,
      borderRadius: 16,
      justifyContent: 'center',
      paddingHorizontal: rs.space(16),
      paddingVertical: rs.space(14),
    },
    toolContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toolTitle: { fontSize: rs.font(15), fontWeight: '700', color: '#FFFFFF' },
    toolSubtitle: {
      fontSize: rs.font(11),
      color: 'rgba(255,255,255,0.8)',
      marginTop: 2,
    },
    toolArrow: { color: colors.textLight },
    sectionTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.text,
      marginHorizontal: rs.space(20),
      marginTop: rs.space(20),
      marginBottom: rs.space(10),
    },
    formulaGroup: { marginBottom: rs.space(8) },
    formulaCategoryTitle: {
      fontSize: rs.font(14),
      fontWeight: '700',
      marginHorizontal: rs.space(20),
      marginBottom: rs.space(6),
    },
    formulaCard: {
      flexDirection: 'row',
      alignItems: 'center',
      ...neuCardSubtle(colors),
      marginHorizontal: rs.space(16),
      marginBottom: rs.space(6),
    },
    formulaColor: { width: 4, alignSelf: 'stretch' },
    formulaContent: { flex: 1, padding: rs.space(12) },
    formulaName: {
      fontSize: rs.font(14),
      fontWeight: '600',
      color: colors.text,
    },
    formulaFormula: {
      fontSize: rs.font(11),
      color: colors.textLight,
      marginTop: 2,
      fontFamily: 'monospace',
    },
    formulaArrow: {
      fontSize: rs.font(20),
      color: colors.textLight,
      marginRight: rs.space(12),
    },
    routesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: rs.space(12),
      gap: rs.space(8),
    },
    routeCard: {
      width: '22%',
      ...neuCardSubtle(colors),
      padding: rs.space(12),
      alignItems: 'center',
      marginHorizontal: '1.5%',
    },
    routeIcon: { marginBottom: 4 },
    routeName: {
      fontSize: rs.font(11),
      color: colors.text,
      fontWeight: '600',
      marginTop: 4,
      textAlign: 'center',
    },
    backupSection: { paddingHorizontal: rs.space(16), gap: rs.space(8) },
    backupButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs.space(14),
      borderRadius: 14,
      borderWidth: 1,
    },
    backupIcon: { marginRight: rs.space(12) },
    backupTitle: { fontSize: rs.font(15), fontWeight: '700' },
    backupSubtitle: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      marginTop: 2,
    },
    importArea: { marginTop: rs.space(8) },
    importInput: {
      minHeight: rs.space(80),
      borderRadius: 10,
      padding: rs.space(12),
      fontSize: rs.font(13),
      borderWidth: 1,
    },
    importButtons: {
      flexDirection: 'row',
      gap: rs.space(8),
      marginTop: rs.space(8),
      justifyContent: 'flex-end',
    },
    importBtn: {
      paddingHorizontal: rs.space(16),
      paddingVertical: rs.space(8),
      borderRadius: 10,
      borderWidth: 1,
    },
    importBtnText: { fontSize: rs.font(13), fontWeight: '600' },
  });
