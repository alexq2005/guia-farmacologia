import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar, Animated } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, Drug } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { UNIT_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { normalizeText } from '../utils/search';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

interface InteractionResult {
  drug1: Drug;
  drug2: Drug;
  interactions: string[];
  severity: 'alta' | 'media' | 'baja';
}

const SEVERITY_COLORS = {
  alta: '#DC2626',
  media: '#F59E0B',
  baja: '#16A34A',
};

const SEVERITY_LABELS = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
};

function findInteractions(drug1: Drug, drug2: Drug): InteractionResult | null {
  const interactions: string[] = [];
  let severity: 'alta' | 'media' | 'baja' = 'baja';

  const name1Lower = drug1.nombre.toLowerCase();
  const name2Lower = drug2.nombre.toLowerCase();
  const generic1 = drug1.nombreGenerico.toLowerCase();
  const generic2 = drug2.nombreGenerico.toLowerCase();
  const family1 = drug1.familia.toLowerCase();
  const family2 = drug2.familia.toLowerCase();

  for (const interaction of drug1.interacciones) {
    const intLower = interaction.toLowerCase();
    if (intLower.includes(name2Lower) || intLower.includes(generic2) || intLower.includes(family2) ||
        drug2.nombresComerciales.some(nc => intLower.includes(nc.toLowerCase()))) {
      interactions.push(`${drug1.nombre}: ${interaction}`);
    }
  }

  for (const interaction of drug2.interacciones) {
    const intLower = interaction.toLowerCase();
    if (intLower.includes(name1Lower) || intLower.includes(generic1) || intLower.includes(family1) ||
        drug1.nombresComerciales.some(nc => intLower.includes(nc.toLowerCase()))) {
      interactions.push(`${drug2.nombre}: ${interaction}`);
    }
  }

  const dangerousCombos = [
    { families: ['aine', 'anticoagulante'], severity: 'alta' as const, msg: 'AINEs + Anticoagulantes: riesgo aumentado de sangrado gastrointestinal' },
    { families: ['aine', 'ieca'], severity: 'media' as const, msg: 'AINEs + IECA: reducción del efecto antihipertensivo y riesgo de nefrotoxicidad' },
    { families: ['aine', 'ara-ii'], severity: 'media' as const, msg: 'AINEs + ARA-II: reducción del efecto antihipertensivo y riesgo de nefrotoxicidad' },
    { families: ['isrs', 'imao'], severity: 'alta' as const, msg: 'ISRS + IMAO: riesgo de síndrome serotoninérgico potencialmente mortal' },
    { families: ['isrs', 'aine'], severity: 'media' as const, msg: 'ISRS + AINEs: riesgo aumentado de sangrado gastrointestinal' },
    { families: ['aminoglucósido', 'diurético de asa'], severity: 'alta' as const, msg: 'Aminoglucósidos + Diuréticos de asa: aumento de nefrotoxicidad y ototoxicidad' },
    { families: ['benzodiacepina', 'opioide'], severity: 'alta' as const, msg: 'Benzodiacepinas + Opioides: riesgo de depresión respiratoria severa y muerte' },
    { families: ['warfarina', 'aine'], severity: 'alta' as const, msg: 'Warfarina + AINEs: riesgo muy alto de hemorragia' },
  ];

  for (const combo of dangerousCombos) {
    const f1 = family1 + ' ' + drug1.clasificacion.toLowerCase();
    const f2 = family2 + ' ' + drug2.clasificacion.toLowerCase();
    const allF1 = f1 + ' ' + name1Lower + ' ' + generic1;
    const allF2 = f2 + ' ' + name2Lower + ' ' + generic2;

    const match1 = combo.families.some(f => allF1.includes(f));
    const match2 = combo.families.some(f => allF2.includes(f));

    if (match1 && match2 && combo.families[0] !== combo.families[1]) {
      const matchedFams1 = combo.families.filter(f => allF1.includes(f));
      const matchedFams2 = combo.families.filter(f => allF2.includes(f));
      if (matchedFams1.some(f => !matchedFams2.includes(f)) || matchedFams2.some(f => !matchedFams1.includes(f))) {
        if (!interactions.some(i => i.includes(combo.msg))) {
          interactions.push(combo.msg);
          if (combo.severity === 'alta') severity = 'alta';
          else if (combo.severity === 'media' && severity !== 'alta') severity = 'media';
        }
      }
    }
  }

  if (interactions.length === 0) return null;

  const allText = interactions.join(' ').toLowerCase();
  if (allText.includes('contraindicad') || allText.includes('mortal') || allText.includes('severa') || allText.includes('grave')) {
    severity = 'alta';
  } else if (allText.includes('riesgo') || allText.includes('aumenta') || allText.includes('potencia')) {
    if (severity !== 'alta') severity = 'media';
  }

  return { drug1, drug2, interactions, severity };
}

export function InteractionCheckerScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs } = useDrugData();
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const fadeIn = useFadeIn();
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    const q = normalizeText(searchQuery);
    return drugs
      .filter(d => {
        const name = normalizeText(d.nombre);
        const generic = normalizeText(d.nombreGenerico);
        return (name.includes(q) || generic.includes(q)) && !selectedDrugs.some(s => s.id === d.id);
      })
      .slice(0, 8);
  }, [searchQuery, drugs, selectedDrugs]);

  const interactionResults = useMemo(() => {
    if (selectedDrugs.length < 2) return [];
    const results: InteractionResult[] = [];
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const result = findInteractions(selectedDrugs[i], selectedDrugs[j]);
        if (result) results.push(result);
      }
    }
    return results.sort((a, b) => {
      const order = { alta: 0, media: 1, baja: 2 };
      return order[a.severity] - order[b.severity];
    });
  }, [selectedDrugs]);

  const addDrug = (drug: Drug) => {
    if (selectedDrugs.length < 6) {
      setSelectedDrugs(prev => [...prev, drug]);
      setSearchQuery('');
    }
  };

  const removeDrug = (drugId: string) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== drugId));
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={colors.accent} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verificador de Interacciones</Text>
        <Text style={styles.headerSubtitle}>Selecciona 2-6 fármacos para verificar interacciones</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.selectedSection}>
          <Text style={styles.selectedTitle}>Fármacos seleccionados ({selectedDrugs.length}/6)</Text>
          <View style={styles.selectedChips}>
            {selectedDrugs.map(drug => (
              <View key={drug.id} style={[styles.selectedChip, { backgroundColor: (UNIT_COLORS[drug.unidadId] || colors.primary) + '20' }]}>
                <Text style={[styles.selectedChipText, { color: UNIT_COLORS[drug.unidadId] || colors.primary }]}>{drug.nombre}</Text>
                <TouchableOpacity onPress={() => removeDrug(drug.id)}>
                  <Text style={styles.removeChip}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            {selectedDrugs.length === 0 && <Text style={styles.emptyHint}>Busca y agrega fármacos abajo</Text>}
          </View>
        </View>

        {selectedDrugs.length < 6 && (
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar fármaco para agregar..."
                placeholderTextColor={colors.textLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={styles.clearSearch}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {searchResults.length > 0 && (
              <View style={styles.searchResults}>
                {searchResults.map(drug => (
                  <TouchableOpacity key={drug.id} style={styles.searchResult} onPress={() => addDrug(drug)} activeOpacity={0.7}>
                    <View style={[styles.searchDot, { backgroundColor: UNIT_COLORS[drug.unidadId] || colors.primary }]} />
                    <View style={styles.searchResultText}>
                      <Text style={styles.searchResultName}>{drug.nombre}</Text>
                      <Text style={styles.searchResultGeneric}>{drug.nombreGenerico}</Text>
                    </View>
                    <Text style={styles.addIcon}>+</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {selectedDrugs.length >= 2 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>
              {interactionResults.length > 0
                ? `⚠️ ${interactionResults.length} interacci${interactionResults.length === 1 ? 'ón' : 'ones'} encontrada${interactionResults.length === 1 ? '' : 's'}`
                : '✅ No se encontraron interacciones conocidas'}
            </Text>

            {interactionResults.length === 0 && selectedDrugs.length >= 2 && (
              <View style={styles.safeBox}>
                <Text style={styles.safeText}>
                  No se detectaron interacciones directas entre los fármacos seleccionados en nuestra base de datos. Esto no descarta interacciones no registradas. Siempre consulte fuentes adicionales.
                </Text>
              </View>
            )}

            {interactionResults.map((result, i) => (
              <View key={i} style={[styles.interactionCard, { borderLeftColor: SEVERITY_COLORS[result.severity] }]}>
                <View style={styles.interactionHeader}>
                  <Text style={styles.interactionDrugs}>{result.drug1.nombre} + {result.drug2.nombre}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: SEVERITY_COLORS[result.severity] }]}>
                    <Text style={styles.severityText}>{SEVERITY_LABELS[result.severity]}</Text>
                  </View>
                </View>
                {result.interactions.map((interaction, j) => (
                  <View key={j} style={styles.interactionItem}>
                    <Text style={styles.interactionBullet}>•</Text>
                    <Text style={styles.interactionText}>{interaction}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ Esta herramienta es de apoyo educativo. Las interacciones se basan en la información registrada en la ficha de cada fármaco. Siempre verifique con fuentes clínicas actualizadas y consulte con el equipo médico.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: '#7C3AED', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  scroll: { flex: 1 },
  selectedSection: { padding: 16, paddingBottom: 8 },
  selectedTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 8 },
  selectedChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  selectedChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  selectedChipText: { fontSize: 13, fontWeight: '600' },
  removeChip: { fontSize: 14, color: colors.textLight },
  emptyHint: { fontSize: 13, color: colors.textLight, fontStyle: 'italic' },
  searchSection: { marginHorizontal: 16, marginBottom: 8 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 12, elevation: 1 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, paddingVertical: 10 },
  clearSearch: { color: colors.textLight, fontSize: 16, padding: 4 },
  searchResults: { marginTop: 4, backgroundColor: colors.surface, borderRadius: 12, elevation: 2, overflow: 'hidden' },
  searchResult: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  searchDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  searchResultText: { flex: 1 },
  searchResultName: { fontSize: 14, fontWeight: '600', color: colors.text },
  searchResultGeneric: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic' },
  addIcon: { fontSize: 22, color: colors.accent, fontWeight: '700' },
  resultsSection: { marginHorizontal: 16, marginTop: 8 },
  resultsTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  safeBox: { backgroundColor: colors.success + '12', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.success + '30' },
  safeText: { fontSize: 13, color: colors.success, lineHeight: 20 },
  interactionCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 14, marginBottom: 10, borderLeftWidth: 4, elevation: 2, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  interactionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  interactionDrugs: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1 },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, marginLeft: 8 },
  severityText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  interactionItem: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  interactionBullet: { fontSize: 14, marginRight: 8, color: colors.textSecondary },
  interactionText: { flex: 1, fontSize: 13, color: colors.text, lineHeight: 20 },
  disclaimer: { marginHorizontal: 16, marginTop: 20, backgroundColor: colors.info + '12', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.info + '30' },
  disclaimerText: { fontSize: 12, color: colors.info, lineHeight: 18 },
});