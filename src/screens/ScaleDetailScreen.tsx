import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, ClinicalScale, ScaleInterpretation } from '../types';
import { SCALE_COLORS, SCALE_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import scalesData from '../data/clinical_scales.json';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';

type Props = NativeStackScreenProps<RootStackParamList, 'ScaleDetail'>;

function getInterpretation(score: number, interpretations: ScaleInterpretation[]): ScaleInterpretation | null {
  return interpretations.find(i => score >= i.rango[0] && score <= i.rango[1]) || null;
}

export function ScaleDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const scales = scalesData as ClinicalScale[];
  const scale = scales.find(s => s.id === route.params.scaleId);

  // State for component/selector type: index of selected option per component
  const [selections, setSelections] = useState<(number | null)[]>(
    scale ? scale.componentes.map(() => null) : []
  );
  // State for checklist type: boolean per item
  const [checks, setChecks] = useState<boolean[]>(
    scale ? scale.componentes.map(() => false) : []
  );

  // Reset state when navigating to a different scale
  const scaleId = route.params.scaleId;
  React.useEffect(() => {
    if (scale) {
      setSelections(scale.componentes.map(() => null));
      setChecks(scale.componentes.map(() => false));
    }
  }, [scaleId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ALL hooks MUST be above the early return (Rules of Hooks)
  const score = useMemo(() => {
    if (!scale) return null;
    if (scale.tipo === 'checklist') {
      return scale.componentes.reduce((sum, comp, i) => {
        // opciones[0] = "No" (value 0), opciones[1] = "Sí" (value = puntos)
        return sum + (checks[i] ? (comp.opciones[1]?.value ?? comp.opciones[0].value) : 0);
      }, 0);
    }
    // components & selector — mostrar score parcial mientras se selecciona
    const anySelected = selections.some(s => s !== null);
    if (!anySelected) return null;
    return selections.reduce<number>((sum, selIdx, i) => {
      if (selIdx === null) return sum;
      return sum + scale.componentes[i].opciones[selIdx].value;
    }, 0);
  }, [scale, selections, checks]);

  if (!scale) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <MaterialCommunityIcons name="chart-bar" size={48} color={colors.textLight} />
        <Text style={{ color: colors.text, fontSize: 16, marginTop: 12 }}>Escala no encontrada</Text>
      </View>
    );
  }

  const catColor = SCALE_COLORS[scale.categoria] || '#7C3AED';
  const allSelected = scale.tipo !== 'checklist' && selections.every(s => s !== null);
  const pendingCount = scale.tipo !== 'checklist' ? selections.filter(s => s === null).length : 0;
  const interpretation = (score !== null && (scale.tipo === 'checklist' || allSelected))
    ? getInterpretation(score, scale.interpretaciones as ScaleInterpretation[])
    : null;

  const handleSelect = (compIdx: number, optIdx: number) => {
    setSelections(prev => {
      const next = [...prev];
      next[compIdx] = optIdx;
      return next;
    });
  };

  const handleCheck = (idx: number) => {
    setChecks(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const resetAll = () => {
    setSelections(scale.componentes.map(() => null));
    setChecks(scale.componentes.map(() => false));
  };

  // Render component-based scale (Glasgow, APGAR, etc.)
  const renderComponents = () => (
    <>
      {scale.componentes.map((comp, compIdx) => (
        <View key={compIdx} style={styles.componentCard}>
          <Text style={styles.componentTitle}>{comp.nombre}</Text>
          {comp.opciones.map((opt, optIdx) => {
            const isSelected = selections[compIdx] === optIdx;
            return (
              <TouchableOpacity
                key={optIdx}
                style={[
                  styles.optionRow,
                  isSelected && { backgroundColor: catColor + '15', borderColor: catColor + '50' },
                ]}
                onPress={() => handleSelect(compIdx, optIdx)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioOuter, isSelected && { borderColor: catColor }]}>
                  {isSelected && <View style={[styles.radioInner, { backgroundColor: catColor }]} />}
                </View>
                <Text style={[styles.optionLabel, isSelected && { color: colors.text, fontWeight: '600' }]}>
                  {opt.label}
                </Text>
                <Text style={[styles.optionValue, isSelected && { color: catColor }]}>
                  {opt.value}
                </Text>
              </TouchableOpacity>
            );
          })}
          {selections[compIdx] !== null && (
            <Text style={[styles.componentScore, { color: catColor }]}>
              Puntos: {scale.componentes[compIdx].opciones[selections[compIdx]!].value}
            </Text>
          )}
        </View>
      ))}
    </>
  );

  // Render selector-based scale (RASS, EVA, etc.)
  const renderSelector = () => (
    <View style={styles.componentCard}>
      <Text style={styles.componentTitle}>{scale.componentes[0].nombre}</Text>
      {scale.componentes[0].opciones.map((opt, optIdx) => {
        const isSelected = selections[0] === optIdx;
        const optInterp = getInterpretation(opt.value, scale.interpretaciones as ScaleInterpretation[]);
        return (
          <TouchableOpacity
            key={optIdx}
            style={[
              styles.selectorRow,
              isSelected && { backgroundColor: (optInterp?.color || catColor) + '15', borderColor: (optInterp?.color || catColor) + '50' },
            ]}
            onPress={() => handleSelect(0, optIdx)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.selectorValueBox,
              { backgroundColor: (optInterp?.color || catColor) + '20' },
            ]}>
              <Text style={[styles.selectorValue, { color: optInterp?.color || catColor }]}>
                {opt.value}
              </Text>
            </View>
            <View style={styles.selectorTextArea}>
              <Text style={[styles.selectorLabel, isSelected && { fontWeight: '700' }]}>{opt.label}</Text>
              {optInterp && <Text style={[styles.selectorInterp, { color: optInterp.color }]}>{optInterp.label}</Text>}
            </View>
            {isSelected && <MaterialCommunityIcons name="check" size={18} color={optInterp?.color || catColor} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // Render checklist-based scale (Wells, qSOFA)
  const renderChecklist = () => (
    <View style={styles.componentCard}>
      <Text style={styles.componentTitle}>Criterios</Text>
      {scale.componentes.map((comp, idx) => {
        const isChecked = checks[idx];
        const points = comp.opciones[1]?.value ?? comp.opciones[0].value;
        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.checklistRow,
              isChecked && { backgroundColor: catColor + '12', borderColor: catColor + '40' },
            ]}
            onPress={() => handleCheck(idx)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              isChecked && { backgroundColor: catColor, borderColor: catColor },
            ]}>
              {isChecked && <MaterialCommunityIcons name="check" size={14} color="#FFFFFF" />}
            </View>
            <Text style={[styles.checklistLabel, isChecked && { color: colors.text }]}>{comp.nombre}</Text>
            <View style={[styles.pointsBadge, { backgroundColor: catColor + '18' }]}>
              <Text style={[styles.pointsText, { color: points < 0 ? '#DC2626' : catColor }]}>{points > 0 ? '+' : ''}{points}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const showScore = scale.tipo === 'checklist' || (score !== null);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={catColor} barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: catColor }]}>
        <View style={styles.headerTop}>
          <MaterialCommunityIcons name={SCALE_ICONS[scale.categoria] || 'chart-bar'} size={36} color="#FFFFFF" />
          <Text style={styles.headerRange}>{scale.rangoTotal[0]}–{scale.rangoTotal[1]} pts</Text>
        </View>
        <Text style={styles.headerTitle}>{scale.nombre}</Text>
        <Text style={styles.headerAbbr}>{scale.abreviatura}</Text>
        <Text style={styles.headerDesc}>{scale.descripcion}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Score Display */}
        {showScore && (
          <View style={[styles.scoreContainer, { borderColor: (interpretation?.color || catColor) + '50' }]}>
            <Text style={styles.scoreLabel}>PUNTUACIÓN</Text>
            <Text style={[styles.scoreValue, { color: interpretation?.color || catColor }]}>
              {score ?? 0}
            </Text>
            <Text style={[styles.scoreMax, { color: colors.textLight }]}>
              {scale.rangoTotal[0] < 0 ? `(${scale.rangoTotal[0]} a ${scale.rangoTotal[1]})` : `/ ${scale.rangoTotal[1]}`}
            </Text>
            {interpretation && (
              <View style={[styles.interpBadge, { backgroundColor: interpretation.color + '18' }]}>
                <Text style={[styles.interpLabel, { color: interpretation.color }]}>
                  {interpretation.label}
                </Text>
              </View>
            )}
            {interpretation?.descripcion && (
              <Text style={styles.interpDesc}>{interpretation.descripcion}</Text>
            )}
            {pendingCount > 0 && score !== null && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <MaterialCommunityIcons name="alert-outline" size={14} color={colors.warning} style={{ marginRight: 4 }} />
                <Text style={[styles.interpDesc, { color: colors.warning, marginTop: 0 }]}>
                  Faltan {pendingCount} componente{pendingCount > 1 ? 's' : ''} por seleccionar
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Scale Input */}
        {scale.tipo === 'components' && renderComponents()}
        {scale.tipo === 'selector' && renderSelector()}
        {scale.tipo === 'checklist' && renderChecklist()}

        {/* Reset */}
        <TouchableOpacity onPress={resetAll} style={styles.resetBtn} activeOpacity={0.7}>
          <Text style={styles.resetBtnText}>Reiniciar escala</Text>
        </TouchableOpacity>

        {/* Interpretation Scale */}
        <View style={styles.interpScaleContainer}>
          <Text style={styles.interpScaleTitle}>INTERPRETACIÓN</Text>
          {(scale.interpretaciones as ScaleInterpretation[]).map((interp, i) => {
            const isActive = interpretation === interp;
            return (
              <View key={i} style={[styles.interpScaleRow, isActive && { backgroundColor: interp.color + '15' }]}>
                <View style={[styles.interpScaleDot, { backgroundColor: interp.color }]} />
                <Text style={[styles.interpScaleRange, { color: interp.color }]}>
                  {interp.rango[0]}–{interp.rango[1]}
                </Text>
                <Text style={[styles.interpScaleLabel, isActive && { fontWeight: '700', color: interp.color }]}>
                  {interp.label}
                </Text>
                {isActive && <Text style={[styles.interpScaleArrow, { color: interp.color }]}>◀</Text>}
              </View>
            );
          })}
        </View>

        {/* Context */}
        <View style={styles.contextContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <MaterialCommunityIcons name="book-open-variant" size={16} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.contextTitle, { marginBottom: 0 }]}>Contexto Clínico</Text>
          </View>
          <Text style={styles.contextText}>{scale.contextoClinico}</Text>
          <Text style={styles.referenceText}>Ref: {scale.referencia}</Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
Esta herramienta es de apoyo educativo. La interpretación clínica debe realizarse por profesionales de salud en contexto del paciente.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  headerIcon: { fontSize: 36 },
  headerRange: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '700' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  headerAbbr: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: 2 },
  headerDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6, lineHeight: 18 },
  scroll: { flex: 1 },
  // Score
  scoreContainer: { ...neuCard(colors), margin: 16, marginBottom: 8, padding: 20, alignItems: 'center', borderWidth: 2 },
  scoreLabel: {
    fontSize: 10, fontWeight: '700', color: colors.textLight, letterSpacing: 1.5,
  },
  scoreValue: { fontSize: 48, fontWeight: '900', marginTop: 4 },
  scoreMax: { fontSize: 16, fontWeight: '600', marginTop: -4 },
  interpBadge: {
    marginTop: 10, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 12,
  },
  interpLabel: { fontSize: 14, fontWeight: '800' },
  interpDesc: { fontSize: 12, color: colors.textSecondary, textAlign: 'center', marginTop: 8, lineHeight: 17 },
  // Component card
  componentCard: { ...neuCardSubtle(colors), margin: 16, marginBottom: 0, padding: 16 },
  componentTitle: {
    fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: 10,
  },
  componentScore: { fontSize: 13, fontWeight: '700', textAlign: 'right', marginTop: 6 },
  // Option row (components type)
  optionRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12,
    borderRadius: 10, borderWidth: 1, borderColor: colors.borderLight, marginBottom: 6,
  },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  optionLabel: { flex: 1, fontSize: 13, color: colors.textSecondary },
  optionValue: { fontSize: 16, fontWeight: '800', color: colors.textLight, minWidth: 24, textAlign: 'right' },
  // Selector row
  selectorRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10,
    borderRadius: 10, borderWidth: 1, borderColor: colors.borderLight, marginBottom: 6,
  },
  selectorValueBox: {
    width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  selectorValue: { fontSize: 16, fontWeight: '900' },
  selectorTextArea: { flex: 1 },
  selectorLabel: { fontSize: 13, color: colors.text },
  selectorInterp: { fontSize: 11, fontWeight: '600', marginTop: 1 },
  selectorCheck: { fontSize: 18, fontWeight: '800' },
  // Checklist row
  checklistRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12,
    borderRadius: 10, borderWidth: 1, borderColor: colors.borderLight, marginBottom: 6,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  checklistLabel: { flex: 1, fontSize: 13, color: colors.textSecondary },
  pointsBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  pointsText: { fontSize: 12, fontWeight: '800' },
  // Reset
  resetBtn: { alignItems: 'center', paddingVertical: 12, marginTop: 8 },
  resetBtnText: { fontSize: 13, color: colors.textSecondary, textDecorationLine: 'underline' },
  // Interpretation scale
  interpScaleContainer: { ...neuCardSubtle(colors), margin: 16, padding: 14 },
  interpScaleTitle: {
    fontSize: 10, fontWeight: '700', color: colors.textLight, letterSpacing: 1, marginBottom: 8,
  },
  interpScaleRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 8,
    borderRadius: 6, marginBottom: 2,
  },
  interpScaleDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  interpScaleRange: { fontSize: 12, fontWeight: '700', width: 50 },
  interpScaleLabel: { fontSize: 13, color: colors.textSecondary, flex: 1 },
  interpScaleArrow: { fontSize: 12, fontWeight: '700' },
  // Context
  contextContainer: { ...neuCardSubtle(colors), margin: 16, marginTop: 0, padding: 14 },
  contextTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 6 },
  contextText: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  referenceText: { fontSize: 11, color: colors.textLight, marginTop: 8, fontStyle: 'italic' },
  // Disclaimer
  disclaimer: {
    marginHorizontal: 16, marginTop: 8, backgroundColor: colors.surface,
    padding: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.borderLight,
  },
  disclaimerText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});
