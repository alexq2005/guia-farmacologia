import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar, Animated,
} from 'react-native';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { PremiumGate } from '../components/PremiumGate';

// ─── Calculator Tabs ────────────────────────────────────────
type CalcKey = 'dosis' | 'goteo' | 'imc' | 'bsa' | 'creatinina' | 'dilucion' | 'sodio'
  | 'calcio' | 'anionGap' | 'osmolalidad' | 'qtc' | 'parkland' | 'holliday' | 'glasgow' | 'apache';

const CALC_TABS: { key: CalcKey; label: string; icon: string; color: string }[] = [
  { key: 'dosis', label: 'Dosis', icon: '💊', color: '#2563EB' },
  { key: 'goteo', label: 'Goteo IV', icon: '💧', color: '#0891B2' },
  { key: 'imc', label: 'IMC', icon: '📏', color: '#059669' },
  { key: 'bsa', label: 'BSA', icon: '👶', color: '#7C3AED' },
  { key: 'creatinina', label: 'ClCr', icon: '🫘', color: '#DC2626' },
  { key: 'dilucion', label: 'Dilución', icon: '⚗️', color: '#D97706' },
  { key: 'sodio', label: 'Na⁺', icon: '🧪', color: '#0F766E' },
  { key: 'calcio', label: 'Ca²⁺', icon: '🦴', color: '#B45309' },
  { key: 'anionGap', label: 'Anion Gap', icon: '⚡', color: '#7E22CE' },
  { key: 'osmolalidad', label: 'Osm', icon: '💧', color: '#0369A1' },
  { key: 'qtc', label: 'QTc', icon: '❤️', color: '#E11D48' },
  { key: 'parkland', label: 'Parkland', icon: '🔥', color: '#EA580C' },
  { key: 'holliday', label: 'Líquidos', icon: '🧒', color: '#0D9488' },
  { key: 'glasgow', label: 'Glasgow', icon: '🧠', color: '#6366F1' },
  { key: 'apache', label: 'APACHE', icon: '🏥', color: '#991B1B' },
];

// ─── Reusable Input Component ───────────────────────────────
function CalcInput({
  label,
  unit,
  value,
  onChangeText,
  placeholder = '0',
}: {
  label: string;
  unit?: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.inputRow}>
      <View style={styles.inputLabelArea}>
        <Text style={styles.inputLabel}>{label}</Text>
        {unit ? <Text style={styles.inputUnit}>{unit}</Text> : null}
      </View>
      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
      />
    </View>
  );
}

// ─── Sex Toggle ─────────────────────────────────────────────
function SexToggle({ value, onChange }: { value: 'M' | 'F'; onChange: (v: 'M' | 'F') => void }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>Sexo</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, value === 'M' && styles.toggleBtnActiveM]}
          onPress={() => onChange('M')}
        >
          <Text style={[styles.toggleBtnText, value === 'M' && styles.toggleBtnTextActive]}>♂ Hombre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, value === 'F' && styles.toggleBtnActiveF]}
          onPress={() => onChange('F')}
        >
          <Text style={[styles.toggleBtnText, value === 'F' && styles.toggleBtnTextActive]}>♀ Mujer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Result Display ─────────────────────────────────────────
function ResultDisplay({
  value,
  unit,
  color,
  interpretation,
  interpColor,
  warning,
}: {
  value: string | null;
  unit: string;
  color: string;
  interpretation?: string;
  interpColor?: string;
  warning?: string;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  if (!value) return null;
  return (
    <View style={styles.resultContainer}>
      <View style={[styles.resultBox, { backgroundColor: color + '12', borderColor: color + '40' }]}>
        <Text style={styles.resultLabel}>RESULTADO</Text>
        <View style={styles.resultValueRow}>
          <Text style={[styles.resultValue, { color }]}>{value}</Text>
          <Text style={[styles.resultUnit, { color }]}>{unit}</Text>
        </View>
        {interpretation && (
          <View style={[styles.interpBadge, { backgroundColor: (interpColor || color) + '20' }]}>
            <Text style={[styles.interpText, { color: interpColor || color }]}>{interpretation}</Text>
          </View>
        )}
      </View>
      {warning && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ {warning}</Text>
        </View>
      )}
    </View>
  );
}

// ─── 1. Dosis por Peso ─────────────────────────────────────
function DosisCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [peso, setPeso] = useState('');
  const [dosisPorKg, setDosisPorKg] = useState('');
  const [frecuencia, setFrecuencia] = useState('');

  const p = parseFloat(peso.replace(',', '.'));
  const d = parseFloat(dosisPorKg.replace(',', '.'));
  const f = parseFloat(frecuencia.replace(',', '.'));

  const totalDosis = !isNaN(p) && !isNaN(d) ? (p * d).toFixed(1) : null;
  const dosisPorToma = totalDosis && !isNaN(f) && f > 0 ? (parseFloat(totalDosis) / f).toFixed(1) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>💊 Dosis por Peso Corporal</Text>
      <Text style={styles.calcFormula}>Dosis Total = Peso (kg) x Dosis (mg/kg)</Text>
      <CalcInput label="Peso del paciente" unit="kg" value={peso} onChangeText={setPeso} />
      <CalcInput label="Dosis prescrita" unit="mg/kg" value={dosisPorKg} onChangeText={setDosisPorKg} />
      <CalcInput label="Frecuencia diaria (opcional)" unit="veces/día" value={frecuencia} onChangeText={setFrecuencia} />
      <ResultDisplay value={totalDosis} unit="mg total/día" color="#2563EB" />
      {dosisPorToma && (
        <View style={[styles.extraResult, { borderColor: '#2563EB30' }]}>
          <Text style={styles.extraResultLabel}>Dosis por toma:</Text>
          <Text style={[styles.extraResultValue, { color: '#2563EB' }]}>{dosisPorToma} mg</Text>
        </View>
      )}
      <ClearButton onPress={() => { setPeso(''); setDosisPorKg(''); setFrecuencia(''); }} />
    </View>
  );
}

// ─── 2. Goteo IV ────────────────────────────────────────────
function GoteoCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [volumen, setVolumen] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [tiempoUnit, setTiempoUnit] = useState<'horas' | 'min'>('horas');
  const [factorGoteo, setFactorGoteo] = useState<'20' | '60'>('20');

  const v = parseFloat(volumen.replace(',', '.'));
  const t = parseFloat(tiempo.replace(',', '.'));
  const fg = parseInt(factorGoteo, 10);

  const tiempoMin = !isNaN(t) && t > 0
    ? (tiempoUnit === 'horas' ? t * 60 : t)
    : NaN;
  const tiempoH = !isNaN(t) && t > 0
    ? (tiempoUnit === 'horas' ? t : t / 60)
    : NaN;

  const gotasMin = !isNaN(v) && !isNaN(tiempoMin) && tiempoMin > 0
    ? ((v * fg) / tiempoMin).toFixed(1) : null;
  const mlH = !isNaN(v) && !isNaN(tiempoH) && tiempoH > 0
    ? (v / tiempoH).toFixed(1) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>💧 Velocidad de Goteo IV</Text>
      <Text style={styles.calcFormula}>Gotas/min = (Vol x Factor) / Tiempo(min)</Text>
      <CalcInput label="Volumen total" unit="mL" value={volumen} onChangeText={setVolumen} />
      <CalcInput label="Tiempo de infusión" unit={tiempoUnit} value={tiempo} onChangeText={setTiempo} />
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Unidad de tiempo</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, tiempoUnit === 'horas' && { backgroundColor: '#0891B2', borderColor: '#0891B2' }]}
            onPress={() => setTiempoUnit('horas')}
          >
            <Text style={[styles.toggleBtnText, tiempoUnit === 'horas' && styles.toggleBtnTextActive]}>Horas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, tiempoUnit === 'min' && { backgroundColor: '#0891B2', borderColor: '#0891B2' }]}
            onPress={() => setTiempoUnit('min')}
          >
            <Text style={[styles.toggleBtnText, tiempoUnit === 'min' && styles.toggleBtnTextActive]}>Minutos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Equipo de goteo</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, factorGoteo === '20' && { backgroundColor: '#0891B2', borderColor: '#0891B2' }]}
            onPress={() => setFactorGoteo('20')}
          >
            <Text style={[styles.toggleBtnText, factorGoteo === '20' && styles.toggleBtnTextActive]}>Macro (20)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, factorGoteo === '60' && { backgroundColor: '#0891B2', borderColor: '#0891B2' }]}
            onPress={() => setFactorGoteo('60')}
          >
            <Text style={[styles.toggleBtnText, factorGoteo === '60' && styles.toggleBtnTextActive]}>Micro (60)</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ResultDisplay value={gotasMin} unit="gotas/min" color="#0891B2" />
      {mlH && (
        <View style={[styles.extraResult, { borderColor: '#0891B230' }]}>
          <Text style={styles.extraResultLabel}>Velocidad en bomba:</Text>
          <Text style={[styles.extraResultValue, { color: '#0891B2' }]}>{mlH} mL/h</Text>
        </View>
      )}
      <ClearButton onPress={() => { setVolumen(''); setTiempo(''); }} />
    </View>
  );
}

// ─── 3. IMC ─────────────────────────────────────────────────
function getIMCCategory(imc: number): { label: string; color: string } {
  if (imc < 18.5) return { label: 'Bajo peso', color: '#3B82F6' };
  if (imc < 25) return { label: 'Normal', color: '#16A34A' };
  if (imc < 30) return { label: 'Sobrepeso', color: '#F59E0B' };
  if (imc < 35) return { label: 'Obesidad grado I', color: '#EA580C' };
  if (imc < 40) return { label: 'Obesidad grado II', color: '#DC2626' };
  return { label: 'Obesidad grado III (mórbida)', color: '#991B1B' };
}

function IMCCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');

  const p = parseFloat(peso.replace(',', '.'));
  const t = parseFloat(talla.replace(',', '.'));
  const tallaM = t > 3 ? t / 100 : t; // auto-detect cm vs m

  const imc = !isNaN(p) && !isNaN(tallaM) && tallaM > 0 ? p / (tallaM * tallaM) : NaN;
  const imcStr = !isNaN(imc) ? imc.toFixed(1) : null;
  const cat = !isNaN(imc) ? getIMCCategory(imc) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>📏 Índice de Masa Corporal</Text>
      <Text style={styles.calcFormula}>IMC = Peso (kg) / Talla² (m²)</Text>
      <CalcInput label="Peso" unit="kg" value={peso} onChangeText={setPeso} />
      <CalcInput label="Talla" unit="m o cm" value={talla} onChangeText={setTalla} />
      <ResultDisplay
        value={imcStr}
        unit="kg/m²"
        color={cat?.color || '#059669'}
        interpretation={cat?.label}
        interpColor={cat?.color}
      />
      {imcStr && (
        <View style={styles.scaleContainer}>
          <Text style={styles.scaleTitle}>Clasificación OMS</Text>
          {[
            { label: '< 18.5 Bajo peso', color: '#3B82F6', active: imc < 18.5 },
            { label: '18.5-24.9 Normal', color: '#16A34A', active: imc >= 18.5 && imc < 25 },
            { label: '25-29.9 Sobrepeso', color: '#F59E0B', active: imc >= 25 && imc < 30 },
            { label: '30-34.9 Obesidad I', color: '#EA580C', active: imc >= 30 && imc < 35 },
            { label: '35-39.9 Obesidad II', color: '#DC2626', active: imc >= 35 && imc < 40 },
            { label: '≥ 40 Obesidad III', color: '#991B1B', active: imc >= 40 },
          ].map((item, i) => (
            <View key={i} style={[styles.scaleRow, item.active && { backgroundColor: item.color + '18' }]}>
              <View style={[styles.scaleDot, { backgroundColor: item.color }]} />
              <Text style={[styles.scaleLabel, item.active && { color: item.color, fontWeight: '700' }]}>{item.label}</Text>
              {item.active && <Text style={[styles.scaleArrow, { color: item.color }]}>◀</Text>}
            </View>
          ))}
        </View>
      )}
      <ClearButton onPress={() => { setPeso(''); setTalla(''); }} />
    </View>
  );
}

// ─── 4. BSA (Mosteller) ────────────────────────────────────
function BSACalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [dosisAdulto, setDosisAdulto] = useState('');

  const p = parseFloat(peso.replace(',', '.'));
  const t = parseFloat(talla.replace(',', '.'));
  const da = parseFloat(dosisAdulto.replace(',', '.'));

  const bsa = !isNaN(p) && !isNaN(t) && p > 0 && t > 0
    ? Math.sqrt((p * t) / 3600)
    : NaN;
  const bsaStr = !isNaN(bsa) ? bsa.toFixed(3) : null;
  const dosisPed = !isNaN(bsa) && !isNaN(da) && da > 0
    ? ((bsa / 1.73) * da).toFixed(1) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>👶 Superficie Corporal (Mosteller)</Text>
      <Text style={styles.calcFormula}>BSA = √((Peso kg x Talla cm) / 3600)</Text>
      <CalcInput label="Peso" unit="kg" value={peso} onChangeText={setPeso} />
      <CalcInput label="Talla" unit="cm" value={talla} onChangeText={setTalla} />
      <ResultDisplay value={bsaStr} unit="m²" color="#7C3AED" />
      <View style={styles.divider} />
      <Text style={styles.calcSubtitle}>Dosis pediátrica por BSA (opcional)</Text>
      <Text style={styles.calcSubFormula}>Dosis ped = (BSA / 1.73) x Dosis adulto</Text>
      <CalcInput label="Dosis adulto" unit="mg" value={dosisAdulto} onChangeText={setDosisAdulto} />
      {dosisPed && (
        <ResultDisplay value={dosisPed} unit="mg (pediátrica)" color="#7C3AED"
          interpretation={`BSA ${bsaStr} m² → ${((bsa / 1.73) * 100).toFixed(0)}% de la dosis adulta`}
        />
      )}
      <ClearButton onPress={() => { setPeso(''); setTalla(''); setDosisAdulto(''); }} />
    </View>
  );
}

// ─── 5. Aclaramiento de Creatinina ─────────────────────────
function getRenalStage(clcr: number): { label: string; color: string } {
  if (clcr >= 90) return { label: 'Función renal normal', color: '#16A34A' };
  if (clcr >= 60) return { label: 'Insuficiencia renal leve', color: '#84CC16' };
  if (clcr >= 30) return { label: 'Insuficiencia renal moderada', color: '#F59E0B' };
  if (clcr >= 15) return { label: 'Insuficiencia renal grave', color: '#DC2626' };
  return { label: 'Enfermedad renal terminal', color: '#991B1B' };
}

function CreatininaCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [creatinina, setCreatinina] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');

  const e = parseFloat(edad.replace(',', '.'));
  const p = parseFloat(peso.replace(',', '.'));
  const cr = parseFloat(creatinina.replace(',', '.'));

  const clcr = !isNaN(e) && !isNaN(p) && !isNaN(cr) && cr > 0
    ? (((140 - e) * p) / (72 * cr)) * (sexo === 'F' ? 0.85 : 1)
    : NaN;
  const clcrStr = !isNaN(clcr) && clcr > 0 ? clcr.toFixed(1) : null;
  const stage = !isNaN(clcr) && clcr > 0 ? getRenalStage(clcr) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🫘 Aclaramiento de Creatinina</Text>
      <Text style={styles.calcFormula}>ClCr = ((140 - Edad) x Peso) / (72 x Cr)</Text>
      <Text style={[styles.calcFormula, { marginTop: 0, fontStyle: 'italic' }]}>x 0.85 en mujeres (Cockcroft-Gault)</Text>
      <CalcInput label="Edad" unit="años" value={edad} onChangeText={setEdad} />
      <CalcInput label="Peso" unit="kg" value={peso} onChangeText={setPeso} />
      <CalcInput label="Creatinina sérica" unit="mg/dL" value={creatinina} onChangeText={setCreatinina} />
      <SexToggle value={sexo} onChange={setSexo} />
      <ResultDisplay
        value={clcrStr}
        unit="mL/min"
        color={stage?.color || '#DC2626'}
        interpretation={stage?.label}
        interpColor={stage?.color}
      />
      {clcrStr && (
        <View style={styles.scaleContainer}>
          <Text style={styles.scaleTitle}>Estadios de función renal</Text>
          {[
            { label: '≥ 90 Normal', color: '#16A34A', active: clcr >= 90 },
            { label: '60-89 Leve', color: '#84CC16', active: clcr >= 60 && clcr < 90 },
            { label: '30-59 Moderada', color: '#F59E0B', active: clcr >= 30 && clcr < 60 },
            { label: '15-29 Grave', color: '#DC2626', active: clcr >= 15 && clcr < 30 },
            { label: '< 15 Terminal', color: '#991B1B', active: clcr < 15 },
          ].map((item, i) => (
            <View key={i} style={[styles.scaleRow, item.active && { backgroundColor: item.color + '18' }]}>
              <View style={[styles.scaleDot, { backgroundColor: item.color }]} />
              <Text style={[styles.scaleLabel, item.active && { color: item.color, fontWeight: '700' }]}>{item.label}</Text>
              {item.active && <Text style={[styles.scaleArrow, { color: item.color }]}>◀</Text>}
            </View>
          ))}
        </View>
      )}
      <ClearButton onPress={() => { setEdad(''); setPeso(''); setCreatinina(''); }} />
    </View>
  );
}

// ─── 6. Dilución ────────────────────────────────────────────
function DilucionCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [c1, setC1] = useState('');
  const [v1, setV1] = useState('');
  const [c2, setC2] = useState('');

  const C1 = parseFloat(c1.replace(',', '.'));
  const V1 = parseFloat(v1.replace(',', '.'));
  const C2 = parseFloat(c2.replace(',', '.'));

  const v2 = !isNaN(C1) && !isNaN(V1) && !isNaN(C2) && C2 > 0
    ? (C1 * V1) / C2 : NaN;
  const v2Str = !isNaN(v2) ? v2.toFixed(1) : null;
  const diluyente = !isNaN(v2) && !isNaN(V1) ? (v2 - V1).toFixed(1) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>⚗️ Dilución de Fármacos</Text>
      <Text style={styles.calcFormula}>C1 x V1 = C2 x V2</Text>
      <CalcInput label="Concentración inicial (C1)" unit="mg/mL" value={c1} onChangeText={setC1} />
      <CalcInput label="Volumen inicial (V1)" unit="mL" value={v1} onChangeText={setV1} />
      <CalcInput label="Concentración deseada (C2)" unit="mg/mL" value={c2} onChangeText={setC2} />
      <ResultDisplay value={v2Str} unit="mL (volumen final)" color="#D97706" />
      {diluyente && parseFloat(diluyente) > 0 && (
        <View style={[styles.extraResult, { borderColor: '#D9770630' }]}>
          <Text style={styles.extraResultLabel}>Diluyente a agregar:</Text>
          <Text style={[styles.extraResultValue, { color: '#D97706' }]}>{diluyente} mL</Text>
        </View>
      )}
      {diluyente && parseFloat(diluyente) <= 0 && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ La concentración deseada es mayor o igual a la inicial. No se requiere dilución.</Text>
        </View>
      )}
      <ClearButton onPress={() => { setC1(''); setV1(''); setC2(''); }} />
    </View>
  );
}

// ─── 7. Déficit de Sodio ────────────────────────────────────
function SodioCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [peso, setPeso] = useState('');
  const [naActual, setNaActual] = useState('');
  const [naDeseado, setNaDeseado] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');

  const p = parseFloat(peso.replace(',', '.'));
  const naA = parseFloat(naActual.replace(',', '.'));
  const naD = parseFloat(naDeseado.replace(',', '.'));

  const act = !isNaN(p) ? p * (sexo === 'F' ? 0.5 : 0.6) : NaN;
  const deficit = !isNaN(act) && !isNaN(naA) && !isNaN(naD)
    ? act * (naD - naA) : NaN;
  const deficitStr = !isNaN(deficit) ? Math.abs(deficit).toFixed(0) : null;
  const deficitUnit = deficit < 0 ? 'mEq (exceso — aportar agua libre)' : 'mEq (déficit a reponer)';
  const actStr = !isNaN(act) ? act.toFixed(1) : null;

  const diff = !isNaN(naA) && !isNaN(naD) ? naD - naA : 0;
  const showWarning = Math.abs(diff) > 10;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🧪 Déficit de Sodio</Text>
      <Text style={styles.calcFormula}>Déficit Na = ACT x (Na deseado - Na actual)</Text>
      <Text style={[styles.calcFormula, { marginTop: 0, fontStyle: 'italic' }]}>ACT = Peso x 0.6 (H) o 0.5 (M)</Text>
      <CalcInput label="Peso" unit="kg" value={peso} onChangeText={setPeso} />
      <CalcInput label="Na⁺ actual" unit="mEq/L" value={naActual} onChangeText={setNaActual} />
      <CalcInput label="Na⁺ deseado" unit="mEq/L" value={naDeseado} onChangeText={setNaDeseado} />
      <SexToggle value={sexo} onChange={setSexo} />
      <ResultDisplay
        value={deficitStr}
        unit={deficitUnit}
        color="#0F766E"
        interpretation={actStr ? `ACT = ${actStr} L` : undefined}
        warning={showWarning
          ? 'No corregir Na más de 8-10 mEq/L en 24 horas. Riesgo de mielinólisis pontina (hipoNa) o edema cerebral (hiperNa). Monitorizar Na cada 4-6 h.'
          : undefined}
      />
      <ClearButton onPress={() => { setPeso(''); setNaActual(''); setNaDeseado(''); }} />
    </View>
  );
}

// ─── 8. Calcio Corregido ────────────────────────────────────
function CalcioCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [calcio, setCalcio] = useState('');
  const [albumina, setAlbumina] = useState('');

  const ca = parseFloat(calcio.replace(',', '.'));
  const alb = parseFloat(albumina.replace(',', '.'));
  const corr = !isNaN(ca) && !isNaN(alb) ? ca + 0.8 * (4 - alb) : NaN;
  const corrStr = !isNaN(corr) ? corr.toFixed(1) : null;

  const getInterp = (v: number) => {
    if (v < 8.5) return { label: 'Hipocalcemia', color: '#2563EB' };
    if (v <= 10.5) return { label: 'Normal', color: '#16A34A' };
    return { label: 'Hipercalcemia', color: '#DC2626' };
  };
  const interp = !isNaN(corr) ? getInterp(corr) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🦴 Calcio Corregido por Albúmina</Text>
      <Text style={styles.calcFormula}>Ca corr = Ca + 0.8 × (4 - Albúmina)</Text>
      <CalcInput label="Calcio sérico" unit="mg/dL" value={calcio} onChangeText={setCalcio} />
      <CalcInput label="Albúmina sérica" unit="g/dL" value={albumina} onChangeText={setAlbumina} />
      <ResultDisplay value={corrStr} unit="mg/dL" color={interp?.color || '#B45309'}
        interpretation={interp?.label} interpColor={interp?.color} />
      <ClearButton onPress={() => { setCalcio(''); setAlbumina(''); }} />
    </View>
  );
}

// ─── 9. Anion Gap ───────────────────────────────────────────
function AnionGapCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [na, setNa] = useState('');
  const [cl, setCl] = useState('');
  const [hco3, setHco3] = useState('');

  const naV = parseFloat(na.replace(',', '.'));
  const clV = parseFloat(cl.replace(',', '.'));
  const hV = parseFloat(hco3.replace(',', '.'));
  const ag = !isNaN(naV) && !isNaN(clV) && !isNaN(hV) ? naV - (clV + hV) : NaN;
  const agStr = !isNaN(ag) ? ag.toFixed(1) : null;

  const getInterp = (v: number) => {
    if (v < 8) return { label: 'Disminuido', color: '#2563EB' };
    if (v <= 12) return { label: 'Normal (8-12)', color: '#16A34A' };
    return { label: 'Elevado — acidosis metabólica con AG', color: '#DC2626' };
  };
  const interp = !isNaN(ag) ? getInterp(ag) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>⚡ Anion Gap</Text>
      <Text style={styles.calcFormula}>AG = Na⁺ - (Cl⁻ + HCO₃⁻) · Normal: 8-12 mEq/L</Text>
      <CalcInput label="Sodio (Na⁺)" unit="mEq/L" value={na} onChangeText={setNa} />
      <CalcInput label="Cloro (Cl⁻)" unit="mEq/L" value={cl} onChangeText={setCl} />
      <CalcInput label="Bicarbonato (HCO₃⁻)" unit="mEq/L" value={hco3} onChangeText={setHco3} />
      <ResultDisplay value={agStr} unit="mEq/L" color={interp?.color || '#7E22CE'}
        interpretation={interp?.label} interpColor={interp?.color}
        warning={ag > 20 ? 'AG > 20: considerar cetoacidosis diabética, acidosis láctica, intoxicación (metanol, etilenglicol, salicilatos)' : undefined} />
      <ClearButton onPress={() => { setNa(''); setCl(''); setHco3(''); }} />
    </View>
  );
}

// ─── 10. Osmolalidad Calculada ──────────────────────────────
function OsmCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [na, setNa] = useState('');
  const [glu, setGlu] = useState('');
  const [bun, setBun] = useState('');

  const naV = parseFloat(na.replace(',', '.'));
  const gluV = parseFloat(glu.replace(',', '.'));
  const bunV = parseFloat(bun.replace(',', '.'));
  const osm = !isNaN(naV) && !isNaN(gluV) && !isNaN(bunV)
    ? 2 * naV + gluV / 18 + bunV / 2.8 : NaN;
  const osmStr = !isNaN(osm) ? osm.toFixed(0) : null;

  const getInterp = (v: number) => {
    if (v < 275) return { label: 'Hipo-osmolar', color: '#2563EB' };
    if (v <= 295) return { label: 'Normal (275-295)', color: '#16A34A' };
    return { label: 'Hiperosmolar', color: '#DC2626' };
  };
  const interp = !isNaN(osm) ? getInterp(osm) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>💧 Osmolalidad Sérica Calculada</Text>
      <Text style={styles.calcFormula}>Osm = 2×Na + Glu/18 + BUN/2.8</Text>
      <CalcInput label="Sodio (Na⁺)" unit="mEq/L" value={na} onChangeText={setNa} />
      <CalcInput label="Glucosa" unit="mg/dL" value={glu} onChangeText={setGlu} />
      <CalcInput label="BUN (Urea)" unit="mg/dL" value={bun} onChangeText={setBun} />
      <ResultDisplay value={osmStr} unit="mOsm/kg" color={interp?.color || '#0369A1'}
        interpretation={interp?.label} interpColor={interp?.color} />
      <ClearButton onPress={() => { setNa(''); setGlu(''); setBun(''); }} />
    </View>
  );
}

// ─── 11. QTc (Bazett) ───────────────────────────────────────
function QTcCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [qt, setQt] = useState('');
  const [fc, setFc] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');

  const qtV = parseFloat(qt.replace(',', '.'));
  const fcV = parseFloat(fc.replace(',', '.'));
  const rr = !isNaN(fcV) && fcV > 0 ? 60 / fcV : NaN;
  const qtc = !isNaN(qtV) && !isNaN(rr) && rr > 0 ? qtV / Math.sqrt(rr) : NaN;
  const qtcStr = !isNaN(qtc) ? qtc.toFixed(0) : null;

  const getInterp = (v: number) => {
    const limit = sexo === 'M' ? 450 : 460;
    if (v <= limit) return { label: 'Normal', color: '#16A34A' };
    if (v <= 500) return { label: 'Prolongado — monitorizar', color: '#F59E0B' };
    return { label: 'Muy prolongado — riesgo de Torsades', color: '#DC2626' };
  };
  const interp = !isNaN(qtc) ? getInterp(qtc) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>❤️ Intervalo QTc (Bazett)</Text>
      <Text style={styles.calcFormula}>QTc = QT / √(RR) donde RR = 60/FC</Text>
      <CalcInput label="Intervalo QT" unit="ms" value={qt} onChangeText={setQt} />
      <CalcInput label="Frecuencia cardíaca" unit="lpm" value={fc} onChangeText={setFc} />
      <SexToggle value={sexo} onChange={setSexo} />
      <ResultDisplay value={qtcStr} unit="ms" color={interp?.color || '#E11D48'}
        interpretation={interp?.label} interpColor={interp?.color}
        warning={qtc > 500 ? 'QTc > 500 ms: riesgo alto de arritmia ventricular (Torsade de Pointes). Revisar medicación y electrolitos.' : undefined} />
      <ClearButton onPress={() => { setQt(''); setFc(''); }} />
    </View>
  );
}

// ─── 12. Parkland (Quemados) ────────────────────────────────
function ParklandCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [peso, setPeso] = useState('');
  const [scq, setScq] = useState('');

  const p = parseFloat(peso.replace(',', '.'));
  const s = parseFloat(scq.replace(',', '.'));
  const total24h = !isNaN(p) && !isNaN(s) ? 4 * p * s : NaN;
  const total24hStr = !isNaN(total24h) ? total24h.toFixed(0) : null;
  const first8h = !isNaN(total24h) ? (total24h / 2).toFixed(0) : null;
  const next16h = !isNaN(total24h) ? (total24h / 2).toFixed(0) : null;
  const rateFirst = !isNaN(total24h) ? (total24h / 2 / 8).toFixed(0) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🔥 Fórmula de Parkland (Quemados)</Text>
      <Text style={styles.calcFormula}>Volumen 24h = 4 × Peso (kg) × %SCQ</Text>
      <Text style={[styles.calcFormula, { marginTop: 0, fontStyle: 'italic' }]}>50% en primeras 8h, 50% en siguientes 16h (Ringer Lactato)</Text>
      <CalcInput label="Peso del paciente" unit="kg" value={peso} onChangeText={setPeso} />
      <CalcInput label="% Superficie Corporal Quemada" unit="%" value={scq} onChangeText={setScq} />
      <ResultDisplay value={total24hStr} unit="mL en 24h" color="#EA580C"
        warning={total24hStr ? 'Las 8 horas se cuentan desde la hora de la quemadura, NO desde la llegada al hospital. Si han pasado X horas, el 50% restante se administra en (8-X) horas.' : undefined} />
      {first8h && (
        <>
          <View style={[styles.extraResult, { borderColor: '#EA580C30' }]}>
            <Text style={styles.extraResultLabel}>Primeras 8 horas:</Text>
            <Text style={[styles.extraResultValue, { color: '#EA580C' }]}>{first8h} mL</Text>
          </View>
          <View style={[styles.extraResult, { borderColor: '#EA580C30' }]}>
            <Text style={styles.extraResultLabel}>Velocidad (si 0h transcurridas):</Text>
            <Text style={[styles.extraResultValue, { color: '#EA580C' }]}>{rateFirst} mL/h</Text>
          </View>
          <View style={[styles.extraResult, { borderColor: '#EA580C30' }]}>
            <Text style={styles.extraResultLabel}>Siguientes 16 horas:</Text>
            <Text style={[styles.extraResultValue, { color: '#EA580C' }]}>{next16h} mL</Text>
          </View>
        </>
      )}
      <ClearButton onPress={() => { setPeso(''); setScq(''); }} />
    </View>
  );
}

// ─── 13. Holliday-Segar (Líquidos Mantenimiento) ───────────
function HollidayCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [peso, setPeso] = useState('');

  const p = parseFloat(peso.replace(',', '.'));
  let mlDay = NaN;
  if (!isNaN(p) && p > 0) {
    if (p <= 10) mlDay = p * 100;
    else if (p <= 20) mlDay = 1000 + (p - 10) * 50;
    else mlDay = 1500 + (p - 20) * 20;
  }
  const mlDayStr = !isNaN(mlDay) ? mlDay.toFixed(0) : null;
  const mlHrStr = !isNaN(mlDay) ? (mlDay / 24).toFixed(1) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🧒 Holliday-Segar (Líquidos de Mantenimiento)</Text>
      <Text style={styles.calcFormula}>≤10 kg: 100 mL/kg/día</Text>
      <Text style={[styles.calcFormula, { marginTop: 0 }]}>11-20 kg: 1000 + 50 mL/kg por cada kg &gt; 10</Text>
      <Text style={[styles.calcFormula, { marginTop: 0 }]}>&gt;20 kg: 1500 + 20 mL/kg por cada kg &gt; 20</Text>
      <CalcInput label="Peso del paciente" unit="kg" value={peso} onChangeText={setPeso} />
      <ResultDisplay value={mlDayStr} unit="mL/día" color="#0D9488" />
      {mlHrStr && (
        <View style={[styles.extraResult, { borderColor: '#0D948830' }]}>
          <Text style={styles.extraResultLabel}>Velocidad de infusión:</Text>
          <Text style={[styles.extraResultValue, { color: '#0D9488' }]}>{mlHrStr} mL/h</Text>
        </View>
      )}
      <ClearButton onPress={() => setPeso('')} />
    </View>
  );
}

// ─── 14. Glasgow a Texto ────────────────────────────────────
function GlasgowCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [ocular, setOcular] = useState<number | null>(null);
  const [verbal, setVerbal] = useState<number | null>(null);
  const [motor, setMotor] = useState<number | null>(null);

  const ocularOpts = [
    { value: 4, label: 'Espontánea' }, { value: 3, label: 'A la voz' },
    { value: 2, label: 'Al dolor' }, { value: 1, label: 'Ninguna' },
  ];
  const verbalOpts = [
    { value: 5, label: 'Orientada' }, { value: 4, label: 'Confusa' },
    { value: 3, label: 'Palabras inapropiadas' }, { value: 2, label: 'Sonidos incomprensibles' },
    { value: 1, label: 'Ninguna' },
  ];
  const motorOpts = [
    { value: 6, label: 'Obedece órdenes' }, { value: 5, label: 'Localiza dolor' },
    { value: 4, label: 'Retira al dolor' }, { value: 3, label: 'Flexión anormal' },
    { value: 2, label: 'Extensión anormal' }, { value: 1, label: 'Ninguna' },
  ];

  const total = ocular !== null && verbal !== null && motor !== null ? ocular + verbal + motor : null;
  const totalStr = total !== null ? total.toString() : null;

  const getInterp = (v: number) => {
    if (v <= 8) return { label: 'TCE Grave — intubar', color: '#DC2626' };
    if (v <= 12) return { label: 'TCE Moderado', color: '#F59E0B' };
    return { label: 'TCE Leve', color: '#16A34A' };
  };
  const interp = total !== null ? getInterp(total) : null;

  const descripcion = total !== null
    ? `O${ocular}V${verbal}M${motor} — Ocular: ${ocularOpts.find(o => o.value === ocular)?.label}, Verbal: ${verbalOpts.find(o => o.value === verbal)?.label}, Motor: ${motorOpts.find(o => o.value === motor)?.label}`
    : null;

  const renderGroup = (
    title: string,
    opts: { value: number; label: string }[],
    selected: number | null,
    onSelect: (v: number) => void,
    groupColor: string,
  ) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.inputLabel, { marginBottom: 6, fontWeight: '700' }]}>{title}</Text>
      {opts.map(opt => (
        <TouchableOpacity
          key={opt.value}
          style={{
            flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12,
            borderRadius: 8, marginBottom: 3, borderWidth: 1,
            borderColor: selected === opt.value ? groupColor + '60' : colors.borderLight,
            backgroundColor: selected === opt.value ? groupColor + '12' : 'transparent',
          }}
          onPress={() => onSelect(opt.value)}
          activeOpacity={0.7}
        >
          <View style={{
            width: 18, height: 18, borderRadius: 9, borderWidth: 2,
            borderColor: selected === opt.value ? groupColor : colors.border,
            alignItems: 'center', justifyContent: 'center', marginRight: 10,
          }}>
            {selected === opt.value && <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: groupColor }} />}
          </View>
          <Text style={{ flex: 1, fontSize: 13, color: selected === opt.value ? colors.text : colors.textSecondary }}>
            {opt.label}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '800', color: selected === opt.value ? groupColor : colors.textLight }}>
            {opt.value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🧠 Glasgow — Calculadora + Texto</Text>
      <Text style={styles.calcFormula}>GCS = Ocular (1-4) + Verbal (1-5) + Motor (1-6)</Text>
      {renderGroup('👁 Respuesta Ocular', ocularOpts, ocular, setOcular, '#6366F1')}
      {renderGroup('💬 Respuesta Verbal', verbalOpts, verbal, setVerbal, '#6366F1')}
      {renderGroup('💪 Respuesta Motora', motorOpts, motor, setMotor, '#6366F1')}
      <ResultDisplay value={totalStr} unit="puntos" color={interp?.color || '#6366F1'}
        interpretation={interp?.label} interpColor={interp?.color} />
      {descripcion && (
        <View style={[styles.extraResult, { borderColor: '#6366F130', flexDirection: 'column', alignItems: 'flex-start' }]}>
          <Text style={styles.extraResultLabel}>Descripción:</Text>
          <Text style={[styles.extraResultValue, { color: '#6366F1', fontSize: 13, fontWeight: '600' }]}>{descripcion}</Text>
        </View>
      )}
      <ClearButton onPress={() => { setOcular(null); setVerbal(null); setMotor(null); }} />
    </View>
  );
}

// ─── 15. APACHE II Simplificado ─────────────────────────────
function ApacheCalc() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [temp, setTemp] = useState('');
  const [pam, setPam] = useState('');
  const [fc, setFc] = useState('');
  const [fr, setFr] = useState('');
  const [ph, setPh] = useState('');
  const [na, setNa] = useState('');
  const [k, setK] = useState('');
  const [creat, setCreat] = useState('');
  const [edad, setEdad] = useState('');

  const vals = {
    temp: parseFloat(temp.replace(',', '.')),
    pam: parseFloat(pam.replace(',', '.')),
    fc: parseFloat(fc.replace(',', '.')),
    fr: parseFloat(fr.replace(',', '.')),
    ph: parseFloat(ph.replace(',', '.')),
    na: parseFloat(na.replace(',', '.')),
    k: parseFloat(k.replace(',', '.')),
    creat: parseFloat(creat.replace(',', '.')),
    edad: parseFloat(edad.replace(',', '.')),
  };

  const allValid = Object.values(vals).every(v => !isNaN(v));

  const scoreTemp = (v: number) => {
    if (v >= 41) return 4; if (v >= 39) return 3; if (v >= 38.5) return 1;
    if (v >= 36) return 0; if (v >= 34) return 1; if (v >= 32) return 2;
    if (v >= 30) return 3; return 4;
  };
  const scorePAM = (v: number) => {
    if (v >= 160) return 4; if (v >= 130) return 3; if (v >= 110) return 2;
    if (v >= 70) return 0; if (v >= 50) return 2; return 4;
  };
  const scoreFC = (v: number) => {
    if (v >= 180) return 4; if (v >= 140) return 3; if (v >= 110) return 2;
    if (v >= 70) return 0; if (v >= 55) return 2; if (v >= 40) return 3; return 4;
  };
  const scoreFR = (v: number) => {
    if (v >= 50) return 4; if (v >= 35) return 3; if (v >= 25) return 1;
    if (v >= 12) return 0; if (v >= 10) return 1; if (v >= 6) return 2; return 4;
  };
  const scorePH = (v: number) => {
    if (v >= 7.7) return 4; if (v >= 7.6) return 3; if (v >= 7.5) return 1;
    if (v >= 7.33) return 0; if (v >= 7.25) return 2; if (v >= 7.15) return 3; return 4;
  };
  const scoreNa = (v: number) => {
    if (v >= 180) return 4; if (v >= 160) return 3; if (v >= 155) return 2;
    if (v >= 150) return 1; if (v >= 130) return 0; if (v >= 120) return 2; return 3;
  };
  const scoreK = (v: number) => {
    if (v >= 7) return 4; if (v >= 6) return 3; if (v >= 5.5) return 1;
    if (v >= 3.5) return 0; if (v >= 3) return 1; if (v >= 2.5) return 2; return 4;
  };
  const scoreCreat = (v: number) => {
    if (v >= 3.5) return 4; if (v >= 2) return 3; if (v >= 1.5) return 2;
    if (v >= 0.6) return 0; return 2;
  };
  const scoreEdad = (v: number) => {
    if (v < 45) return 0; if (v <= 54) return 2; if (v <= 64) return 3;
    if (v <= 74) return 5; return 6;
  };

  let total = NaN;
  if (allValid) {
    total = scoreTemp(vals.temp) + scorePAM(vals.pam) + scoreFC(vals.fc) +
      scoreFR(vals.fr) + scorePH(vals.ph) + scoreNa(vals.na) + scoreK(vals.k) +
      scoreCreat(vals.creat) + scoreEdad(vals.edad);
  }
  const totalStr = !isNaN(total) ? total.toString() : null;

  const getInterp = (v: number) => {
    if (v <= 9) return { label: 'Mortalidad ~8%', color: '#16A34A' };
    if (v <= 14) return { label: 'Mortalidad ~15%', color: '#84CC16' };
    if (v <= 19) return { label: 'Mortalidad ~24%', color: '#F59E0B' };
    if (v <= 24) return { label: 'Mortalidad ~40%', color: '#EA580C' };
    if (v <= 29) return { label: 'Mortalidad ~55%', color: '#DC2626' };
    return { label: 'Mortalidad >73%', color: '#991B1B' };
  };
  const interp = !isNaN(total) ? getInterp(total) : null;

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🏥 APACHE II Simplificado</Text>
      <Text style={styles.calcFormula}>Score de severidad en UCI (versión simplificada)</Text>
      <CalcInput label="Temperatura" unit="°C" value={temp} onChangeText={setTemp} />
      <CalcInput label="Presión arterial media" unit="mmHg" value={pam} onChangeText={setPam} />
      <CalcInput label="Frecuencia cardíaca" unit="lpm" value={fc} onChangeText={setFc} />
      <CalcInput label="Frecuencia respiratoria" unit="rpm" value={fr} onChangeText={setFr} />
      <CalcInput label="pH arterial" unit="" value={ph} onChangeText={setPh} placeholder="7.40" />
      <CalcInput label="Sodio sérico" unit="mEq/L" value={na} onChangeText={setNa} />
      <CalcInput label="Potasio sérico" unit="mEq/L" value={k} onChangeText={setK} />
      <CalcInput label="Creatinina sérica" unit="mg/dL" value={creat} onChangeText={setCreat} />
      <CalcInput label="Edad" unit="años" value={edad} onChangeText={setEdad} />
      <ResultDisplay value={totalStr} unit="puntos" color={interp?.color || '#991B1B'}
        interpretation={interp?.label} interpColor={interp?.color}
        warning={total > 24 ? 'Score alto: paciente críticamente enfermo. Requiere monitorización intensiva.' : undefined} />
      <ClearButton onPress={() => { setTemp(''); setPam(''); setFc(''); setFr(''); setPh(''); setNa(''); setK(''); setCreat(''); setEdad(''); }} />
    </View>
  );
}

// ─── Clear Button ───────────────────────────────────────────
function ClearButton({ onPress }: { onPress: () => void }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <TouchableOpacity onPress={onPress} style={styles.clearBtn} activeOpacity={0.7}>
      <Text style={styles.clearBtnText}>Limpiar valores</Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ────────────────────────────────────────────
export function CalculatorsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [activeCalc, setActiveCalc] = useState<CalcKey>('dosis');
  const activeData = CALC_TABS.find(t => t.key === activeCalc)!;
  const fadeIn = useFadeIn();

  const renderCalc = () => {
    switch (activeCalc) {
      case 'dosis': return <DosisCalc />;
      case 'goteo': return <GoteoCalc />;
      case 'imc': return <IMCCalc />;
      case 'bsa': return <BSACalc />;
      case 'creatinina': return <CreatininaCalc />;
      case 'dilucion': return <DilucionCalc />;
      case 'sodio': return <SodioCalc />;
      case 'calcio': return <CalcioCalc />;
      case 'anionGap': return <AnionGapCalc />;
      case 'osmolalidad': return <OsmCalc />;
      case 'qtc': return <QTcCalc />;
      case 'parkland': return <ParklandCalc />;
      case 'holliday': return <HollidayCalc />;
      case 'glasgow': return <GlasgowCalc />;
      case 'apache': return <ApacheCalc />;
    }
  };

  return (
    <PremiumGate feature="Calculadoras Clínicas">
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={activeData.color} barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: activeData.color }]}>
        <Text style={styles.headerTitle}>🧮 Calculadoras Clínicas</Text>
        <Text style={styles.headerSubtitle}>15 herramientas de cálculo para enfermería</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabContent}
      >
        {CALC_TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabChip,
              activeCalc === tab.key && { backgroundColor: tab.color + '18', borderColor: tab.color, borderWidth: 1 },
            ]}
            onPress={() => setActiveCalc(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabChipIcon}>{tab.icon}</Text>
            <Text style={[
              styles.tabChipLabel,
              activeCalc === tab.key && { color: tab.color, fontWeight: '700' },
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        {renderCalc()}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ Estas calculadoras son herramientas de apoyo educativo. Siempre verifique los resultados con el equipo médico y fuentes clínicas actualizadas antes de actuar.
          </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
    </PremiumGate>
  );
}

// ─── Styles ─────────────────────────────────────────────────
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 16, paddingBottom: 16, paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  // Tabs
  tabScroll: { backgroundColor: colors.surface, maxHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tabContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  tabChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, backgroundColor: colors.background, gap: 4,
  },
  tabChipIcon: { fontSize: 14 },
  tabChipLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  // Calculator card
  scroll: { flex: 1 },
  calcCard: {
    backgroundColor: colors.surface, margin: 16, marginBottom: 0,
    padding: 18, borderRadius: 16,
    elevation: 3, shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  calcTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 4 },
  calcFormula: {
    fontSize: 12, color: colors.textSecondary, fontFamily: 'monospace',
    marginBottom: 14, lineHeight: 18,
  },
  calcSubtitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  calcSubFormula: { fontSize: 11, color: colors.textSecondary, fontFamily: 'monospace', marginBottom: 10 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 16 },
  // Inputs
  inputRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10,
  },
  inputLabelArea: { flex: 1 },
  inputLabel: { fontSize: 14, color: colors.text, fontWeight: '500' },
  inputUnit: { fontSize: 11, color: colors.textLight, marginTop: 1 },
  inputField: {
    width: 110, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 17, fontWeight: '700', color: colors.text,
    backgroundColor: colors.background, textAlign: 'center',
  },
  // Toggle
  toggleRow: { flexDirection: 'row', gap: 6 },
  toggleBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
    borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.background,
  },
  toggleBtnActiveM: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  toggleBtnActiveF: { backgroundColor: '#DB2777', borderColor: '#DB2777' },
  toggleBtnText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  toggleBtnTextActive: { color: '#FFFFFF' },
  // Result
  resultContainer: { marginTop: 16 },
  resultBox: {
    padding: 16, borderRadius: 14, borderWidth: 1.5, alignItems: 'center',
  },
  resultLabel: {
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5,
    color: colors.textSecondary, marginBottom: 4,
  },
  resultValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  resultValue: { fontSize: 32, fontWeight: '800' },
  resultUnit: { fontSize: 14, fontWeight: '600' },
  interpBadge: {
    marginTop: 8, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 12,
  },
  interpText: { fontSize: 13, fontWeight: '700' },
  // Extra result
  extraResult: {
    marginTop: 10, padding: 12, borderRadius: 10, borderWidth: 1,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  extraResultLabel: { fontSize: 13, color: colors.textSecondary },
  extraResultValue: { fontSize: 18, fontWeight: '800' },
  // Warning
  warningBox: {
    marginTop: 10, backgroundColor: colors.warning + '15', borderRadius: 10,
    padding: 12, borderWidth: 1, borderColor: colors.warning + '40',
  },
  warningText: { fontSize: 12, color: colors.warning, lineHeight: 18 },
  // Scale
  scaleContainer: {
    marginTop: 14, backgroundColor: colors.background,
    borderRadius: 12, padding: 12,
  },
  scaleTitle: {
    fontSize: 12, fontWeight: '700', color: colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
  },
  scaleRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 5, paddingHorizontal: 8, borderRadius: 6, marginBottom: 2,
  },
  scaleDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  scaleLabel: { fontSize: 13, color: colors.textSecondary, flex: 1 },
  scaleArrow: { fontSize: 12, fontWeight: '700' },
  // Clear
  clearBtn: { marginTop: 14, alignItems: 'center', paddingVertical: 8 },
  clearBtnText: { fontSize: 13, color: colors.textSecondary, textDecorationLine: 'underline' },
  // Disclaimer
  disclaimer: {
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: colors.surface, padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  disclaimerText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});