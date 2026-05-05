import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Formula, FormulaVariable } from '../types';
import { FORMULA_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import formulas from '../data/formulas.json';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'FormulaDetail'>;

function calculateResult(
  formulaId: string,
  values: Record<string, string>,
): string | null {
  const nums: Record<string, number> = {};
  for (const [key, val] of Object.entries(values)) {
    if (!val || val.trim() === '') return null;
    const n = parseFloat(val.replace(',', '.'));
    if (isNaN(n)) return null;
    nums[key] = n;
  }

  try {
    switch (formulaId) {
      case 'f01':
        return `${(nums.peso * nums.dosisPorKg).toFixed(1)} mg`;
      case 'f02':
        return `${((nums.volumen * nums.factorGoteo) / nums.tiempo).toFixed(
          1,
        )} gotas/min`;
      case 'f03':
        return `${(nums.volumen / nums.tiempo).toFixed(1)} mL/h`;
      case 'f04':
        return `${(
          (nums.dosisDeseada * nums.peso * 60) /
          nums.concentracion
        ).toFixed(1)} mL/h`;
      case 'f05':
        return `${(
          (nums.dosisPrescrita * nums.presentacion) /
          nums.concentracion
        ).toFixed(1)} mL`;
      case 'f06':
        return `${Math.sqrt((nums.peso * nums.talla) / 3600).toFixed(3)} m²`;
      case 'f07':
        return `${((nums.bsaNino / 1.73) * nums.dosisAdulto).toFixed(1)} mg`;
      case 'f08':
        return `${((nums.edad / (nums.edad + 12)) * nums.dosisAdulto).toFixed(
          1,
        )} mg`;
      case 'f09':
        return `${((nums.peso / 70) * nums.dosisAdulto).toFixed(1)} mg`;
      case 'f10': {
        const base = ((140 - nums.edad) * nums.peso) / (72 * nums.creatinina);
        const factor = nums.sexo === 0.85 ? 0.85 : 1;
        return `${(base * factor).toFixed(1)} mL/min`;
      }
      case 'f11':
        return `${(nums.unidades / nums.concentracion).toFixed(2)} mL`;
      case 'f13':
        return `${((nums.C1 * nums.V1) / nums.C2).toFixed(1)} mL total`;
      case 'f14':
        return `${((nums.CpDeseada * nums.Vd * nums.peso) / nums.F).toFixed(
          1,
        )} mg`;
      case 'f15':
        return `${(nums.peso / (nums.talla * nums.talla)).toFixed(1)} kg/m²`;
      case 'f16': {
        const isMale = nums.sexo !== 0;
        const base2 = isMale ? 50 : 45.5;
        return `${(base2 + 0.91 * (nums.talla - 152.4)).toFixed(1)} kg`;
      }
      case 'f17':
        return `${(nums.pci + 0.4 * (nums.pesoReal - nums.pci)).toFixed(1)} kg`;
      case 'f18':
        return `${(nums.calcioMedido + 0.8 * (4.0 - nums.albumina)).toFixed(
          1,
        )} mg/dL`;
      case 'f19': {
        const act = nums.peso * (nums.sexo === 0.5 ? 0.5 : 0.6);
        return `${(act * (nums.naDeseado - nums.naActual)).toFixed(0)} mEq`;
      }
      case 'f20':
        return `${(nums.sodio - (nums.cloro + nums.bicarbonato)).toFixed(
          1,
        )} mEq/L`;
      case 'f21':
        return `${(2 * nums.sodio + nums.glucosa / 18 + nums.bun / 2.8).toFixed(
          0,
        )} mOsm/L`;
      case 'f22':
        return `${((nums.mgFarmaco * 1000) / nums.volumen).toFixed(0)} mcg/mL`;
      default:
        return null;
    }
  } catch {
    return null;
  }
}

export function FormulaDetailScreen({ route }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const formula = (formulas as Formula[]).find(
    f => f.id === route.params.formulaId,
  );
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [showCalc, setShowCalc] = useState(false);

  // useMemo must be called unconditionally (Rules of Hooks). When formula is
  // missing we render an early-return below; result will simply be null in
  // that branch and never read.
  const result = useMemo(
    () => (formula ? calculateResult(formula.id, inputValues) : null),
    [formula, inputValues],
  );

  if (!formula) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Fórmula no encontrada</Text>
      </View>
    );
  }

  const color = FORMULA_COLORS[formula.categoria] || colors.primary;

  const handleInputChange = (varName: string, value: string) => {
    setInputValues(prev => ({ ...prev, [varName]: value }));
  };

  const clearInputs = () => {
    setInputValues({});
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar
        backgroundColor={color}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.categoryLabel}>
          {formula.categoria.toUpperCase()}
        </Text>
        <Text style={styles.title}>{formula.nombre}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>FÓRMULA</Text>
          <Text style={styles.formulaText}>{formula.formula}</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.calcToggle, { borderColor: color }]}
            onPress={() => setShowCalc(!showCalc)}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="calculator-variant-outline"
                size={18}
                color={color}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.calcToggleText, { color }]}>
                {showCalc
                  ? 'Ocultar calculadora'
                  : 'Abrir calculadora interactiva'}
              </Text>
            </View>
          </TouchableOpacity>

          {showCalc && (
            <View style={[styles.calcContainer, { borderColor: color + '40' }]}>
              <Text style={styles.calcTitle}>Ingresa los valores:</Text>
              {formula.variables.map((v, i) => (
                <View key={i} style={styles.calcInputRow}>
                  <View style={styles.calcLabelArea}>
                    <Text style={styles.calcLabel}>{v.descripcion}</Text>
                    {v.unidad ? (
                      <Text style={styles.calcUnit}>{v.unidad}</Text>
                    ) : null}
                  </View>
                  <TextInput
                    style={[styles.calcInput, { borderColor: color + '60' }]}
                    value={inputValues[v.nombre] || ''}
                    onChangeText={val => handleInputChange(v.nombre, val)}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={colors.textLight}
                  />
                </View>
              ))}

              {result && (
                <View
                  style={[
                    styles.resultBox,
                    {
                      backgroundColor: color + '15',
                      borderColor: color + '40',
                    },
                  ]}
                >
                  <Text style={styles.resultLabel}>RESULTADO</Text>
                  <Text style={[styles.resultValue, { color }]}>{result}</Text>
                </View>
              )}

              {Object.keys(inputValues).length > 0 && (
                <TouchableOpacity onPress={clearInputs} style={styles.clearBtn}>
                  <Text style={styles.clearBtnText}>Limpiar valores</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="ruler-square"
              size={18}
              color={colors.text}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
              Variables
            </Text>
          </View>
          {formula.variables.map((v, i) => (
            <View key={i} style={styles.variableRow}>
              <View
                style={[
                  styles.variableBadge,
                  { backgroundColor: color + '20' },
                ]}
              >
                <Text style={[styles.variableName, { color }]}>{v.nombre}</Text>
              </View>
              <View style={styles.variableInfo}>
                <Text style={styles.variableDesc}>{v.descripcion}</Text>
                {v.unidad ? (
                  <Text style={styles.variableUnit}>({v.unidad})</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="note-text-outline"
              size={18}
              color={colors.text}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
              Ejemplo
            </Text>
          </View>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleText}>{formula.ejemplo}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={18}
              color={colors.text}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
              Explicación
            </Text>
          </View>
          <Text style={styles.explanationText}>{formula.explicacion}</Text>
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
      paddingTop: rs.space(16),
      paddingBottom: rs.space(20),
      paddingHorizontal: rs.space(20),
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    categoryLabel: {
      fontSize: rs.font(11),
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '700',
      letterSpacing: 1,
    },
    title: {
      fontSize: rs.font(22),
      fontWeight: '800',
      color: '#FFFFFF',
      marginTop: 4,
    },
    scroll: { flex: 1 },
    formulaBox: {
      ...neuCard(colors),
      marginHorizontal: rs.space(16),
      marginTop: rs.space(16),
      padding: rs.space(20),
    },
    formulaLabel: {
      fontSize: rs.font(10),
      color: colors.textLight,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: rs.space(8),
    },
    formulaText: {
      fontSize: rs.font(16),
      color: colors.text,
      fontFamily: 'monospace',
      lineHeight: rs.font(24),
    },
    section: {
      marginHorizontal: rs.space(16),
      marginTop: rs.space(20),
    },
    sectionTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(10),
    },
    calcToggle: {
      paddingVertical: rs.space(12),
      paddingHorizontal: rs.space(16),
      borderRadius: 12,
      borderWidth: 2,
      alignItems: 'center',
    },
    calcToggleText: {
      fontSize: rs.font(15),
      fontWeight: '700',
    },
    calcContainer: {
      ...neuCardSubtle(colors),
      marginTop: rs.space(12),
      padding: rs.space(16),
      borderWidth: 1,
    },
    calcTitle: {
      fontSize: rs.font(14),
      fontWeight: '600',
      color: colors.text,
      marginBottom: rs.space(12),
    },
    calcInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(10),
    },
    calcLabelArea: {
      flex: 1,
      marginRight: rs.space(10),
    },
    calcLabel: {
      fontSize: rs.font(13),
      color: colors.text,
    },
    calcUnit: {
      fontSize: rs.font(11),
      color: colors.textLight,
    },
    calcInput: {
      flex: 1,
      maxWidth: rs.space(140),
      borderWidth: 1.5,
      borderRadius: 10,
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(8),
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      backgroundColor: colors.background,
      textAlign: 'center',
    },
    resultBox: {
      marginTop: rs.space(12),
      padding: rs.space(16),
      borderRadius: 12,
      borderWidth: 1,
      alignItems: 'center',
    },
    resultLabel: {
      fontSize: rs.font(10),
      fontWeight: '700',
      letterSpacing: 1,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    resultValue: {
      fontSize: rs.font(28),
      fontWeight: '800',
    },
    clearBtn: {
      marginTop: rs.space(10),
      alignItems: 'center',
    },
    clearBtnText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      textDecorationLine: 'underline',
    },
    variableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(8),
      backgroundColor: colors.surface,
      padding: rs.space(10),
      borderRadius: 10,
    },
    variableBadge: {
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(4),
      borderRadius: 8,
      marginRight: rs.space(10),
    },
    variableName: { fontSize: rs.font(13), fontWeight: '700' },
    variableInfo: { flex: 1 },
    variableDesc: { fontSize: rs.font(13), color: colors.text },
    variableUnit: {
      fontSize: rs.font(11),
      color: colors.textLight,
      marginTop: 1,
    },
    exampleBox: {
      backgroundColor: colors.success + '10',
      padding: rs.space(16),
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.success + '30',
    },
    exampleText: {
      fontSize: rs.font(14),
      color: colors.text,
      lineHeight: rs.font(22),
      fontFamily: 'monospace',
    },
    explanationText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      lineHeight: rs.font(22),
    },
    errorText: {
      fontSize: rs.font(16),
      color: colors.error,
      textAlign: 'center',
      marginTop: rs.space(40),
    },
  });
