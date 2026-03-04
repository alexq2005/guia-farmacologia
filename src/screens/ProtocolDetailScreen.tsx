import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar, Animated,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, EmergencyProtocol } from '../types';
import { PROTOCOL_COLORS, PROTOCOL_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import protocolsData from '../data/emergency_protocols.json';

type Props = NativeStackScreenProps<RootStackParamList, 'ProtocolDetail'>;

const PRIORITY_CONFIG = {
  critico: { label: 'CRÍTICO', color: '#DC2626', bg: '#DC262618' },
  urgente: { label: 'URGENTE', color: '#F59E0B', bg: '#F59E0B18' },
  emergente: { label: 'EMERGENTE', color: '#EA580C', bg: '#EA580C18' },
};

export function ProtocolDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const protocols = protocolsData as EmergencyProtocol[];
  const protocol = protocols.find(p => p.id === route.params.protocolId);

  if (!protocol) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 48 }}>🚨</Text>
        <Text style={{ color: colors.text, fontSize: 16, marginTop: 12 }}>Protocolo no encontrado</Text>
      </View>
    );
  }

  const catColor = PROTOCOL_COLORS[protocol.categoria];
  const prioConfig = PRIORITY_CONFIG[protocol.prioridad];

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={catColor} barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: catColor }]}>
        <View style={styles.headerTop}>
          <Text style={styles.headerIcon}>{PROTOCOL_ICONS[protocol.categoria]}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <Text style={styles.priorityText}>{prioConfig.label}</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>{protocol.nombre}</Text>
        {protocol.abreviatura && <Text style={styles.headerAbbr}>{protocol.abreviatura}</Text>}
        <Text style={styles.headerDesc}>{protocol.descripcion}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Red Flags */}
        <View style={styles.redFlagsContainer}>
          <Text style={styles.redFlagsTitle}>🚩 Banderas Rojas</Text>
          {protocol.banderasRojas.map((flag, i) => (
            <View key={i} style={styles.redFlagRow}>
              <View style={styles.redFlagDot} />
              <Text style={styles.redFlagText}>{flag}</Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <Text style={styles.sectionTitle}>📋 Pasos del Protocolo</Text>
        {protocol.pasos.map((step, i) => (
          <View
            key={i}
            style={[
              styles.stepCard,
              step.critico && styles.stepCardCritical,
            ]}
          >
            <View style={styles.stepHeader}>
              <View style={[styles.stepNumber, { backgroundColor: step.critico ? '#DC2626' : catColor }]}>
                <Text style={styles.stepNumberText}>{step.orden}</Text>
              </View>
              {step.tiempo && (
                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>⏱ {step.tiempo}</Text>
                </View>
              )}
              {step.critico && (
                <View style={styles.criticalBadge}>
                  <Text style={styles.criticalText}>⚠️ CRÍTICO</Text>
                </View>
              )}
            </View>

            <Text style={styles.stepAction}>{step.accion}</Text>
            {step.detalles && <Text style={styles.stepDetails}>{step.detalles}</Text>}

            {/* Drugs in step */}
            {step.farmacos && step.farmacos.length > 0 && (
              <View style={styles.stepDrugs}>
                {step.farmacos.map((drug, j) => (
                  <View key={j} style={styles.stepDrugRow}>
                    <Text style={styles.stepDrugIcon}>💊</Text>
                    <View style={styles.stepDrugInfo}>
                      <Text style={styles.stepDrugName}>{drug.nombre}</Text>
                      <Text style={styles.stepDrugDosis}>{drug.dosis} · {drug.via}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Decision point */}
            {step.decision && (
              <View style={styles.decisionContainer}>
                <Text style={styles.decisionQuestion}>❓ {step.decision.pregunta}</Text>
                <View style={styles.decisionOptions}>
                  <View style={[styles.decisionBox, { backgroundColor: '#16A34A15', borderColor: '#16A34A40' }]}>
                    <Text style={[styles.decisionLabel, { color: '#16A34A' }]}>✓ SÍ</Text>
                    <Text style={styles.decisionText}>{step.decision.si}</Text>
                  </View>
                  <View style={[styles.decisionBox, { backgroundColor: '#DC262615', borderColor: '#DC262640' }]}>
                    <Text style={[styles.decisionLabel, { color: '#DC2626' }]}>✗ NO</Text>
                    <Text style={styles.decisionText}>{step.decision.no}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Drug Summary */}
        <Text style={styles.sectionTitle}>💊 Resumen de Fármacos</Text>
        <View style={styles.drugSummaryContainer}>
          {protocol.resumenFarmacos.map((drug, i) => (
            <View key={i} style={styles.drugSummaryRow}>
              <View style={[styles.drugSummaryDot, { backgroundColor: catColor }]} />
              <View style={styles.drugSummaryInfo}>
                <Text style={styles.drugSummaryName}>{drug.nombre}</Text>
                <Text style={styles.drugSummaryDosis}>{drug.dosis}</Text>
                <Text style={styles.drugSummaryDetails}>{drug.via} · {drug.indicacion}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Nursing Notes */}
        <Text style={styles.sectionTitle}>👩‍⚕️ Notas de Enfermería</Text>
        <View style={styles.nursingContainer}>
          {protocol.notasEnfermeria.map((note, i) => (
            <View key={i} style={styles.nursingRow}>
              <Text style={styles.nursingBullet}>•</Text>
              <Text style={styles.nursingText}>{note}</Text>
            </View>
          ))}
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ Este protocolo es una guía de referencia educativa. Siga siempre los protocolos institucionales y las indicaciones del equipo médico.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  headerIcon: { fontSize: 36 },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  priorityText: { fontSize: 11, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  headerAbbr: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: 2 },
  headerDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6, lineHeight: 18 },
  scroll: { flex: 1 },
  // Red Flags
  redFlagsContainer: {
    margin: 16, marginBottom: 0, backgroundColor: '#DC262610', borderRadius: 14,
    padding: 16, borderWidth: 1, borderColor: '#DC262630',
  },
  redFlagsTitle: { fontSize: 15, fontWeight: '800', color: '#DC2626', marginBottom: 10 },
  redFlagRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  redFlagDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DC2626', marginRight: 8, marginTop: 5 },
  redFlagText: { fontSize: 13, color: colors.text, flex: 1, lineHeight: 18 },
  // Section
  sectionTitle: {
    fontSize: 16, fontWeight: '800', color: colors.text,
    marginHorizontal: 20, marginTop: 20, marginBottom: 10,
  },
  // Steps
  stepCard: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 8,
    borderRadius: 14, padding: 16, elevation: 1,
    borderLeftWidth: 3, borderLeftColor: colors.border,
  },
  stepCardCritical: {
    borderLeftColor: '#DC2626', borderLeftWidth: 4,
    backgroundColor: colors.surface,
  },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  stepNumberText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  timeBadge: {
    backgroundColor: colors.background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  timeText: { fontSize: 11, color: colors.textSecondary, fontWeight: '600' },
  criticalBadge: {
    backgroundColor: '#DC262615', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  criticalText: { fontSize: 10, fontWeight: '800', color: '#DC2626' },
  stepAction: { fontSize: 14, fontWeight: '700', color: colors.text, lineHeight: 20 },
  stepDetails: { fontSize: 12, color: colors.textSecondary, marginTop: 4, lineHeight: 17 },
  // Drugs in step
  stepDrugs: {
    marginTop: 10, backgroundColor: colors.background, borderRadius: 10, padding: 10,
  },
  stepDrugRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  stepDrugIcon: { fontSize: 14, marginRight: 8 },
  stepDrugInfo: { flex: 1 },
  stepDrugName: { fontSize: 13, fontWeight: '700', color: colors.text },
  stepDrugDosis: { fontSize: 11, color: colors.textSecondary, marginTop: 1 },
  // Decision
  decisionContainer: {
    marginTop: 12, backgroundColor: colors.background, borderRadius: 12, padding: 12,
  },
  decisionQuestion: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  decisionOptions: { gap: 6 },
  decisionBox: { padding: 10, borderRadius: 8, borderWidth: 1 },
  decisionLabel: { fontSize: 11, fontWeight: '800', marginBottom: 2 },
  decisionText: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },
  // Drug Summary
  drugSummaryContainer: {
    backgroundColor: colors.surface, marginHorizontal: 16, borderRadius: 14,
    padding: 14, elevation: 1,
  },
  drugSummaryRow: {
    flexDirection: 'row', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  drugSummaryDot: { width: 4, borderRadius: 2, marginRight: 10, alignSelf: 'stretch' },
  drugSummaryInfo: { flex: 1 },
  drugSummaryName: { fontSize: 14, fontWeight: '700', color: colors.text },
  drugSummaryDosis: { fontSize: 13, fontWeight: '600', color: colors.primary, marginTop: 2 },
  drugSummaryDetails: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  // Nursing
  nursingContainer: {
    backgroundColor: colors.surface, marginHorizontal: 16, borderRadius: 14,
    padding: 14, elevation: 1,
  },
  nursingRow: { flexDirection: 'row', marginBottom: 8, paddingRight: 4 },
  nursingBullet: { fontSize: 14, color: colors.nursing, marginRight: 8, marginTop: 1 },
  nursingText: { fontSize: 13, color: colors.textSecondary, flex: 1, lineHeight: 18 },
  // Disclaimer
  disclaimer: {
    marginHorizontal: 16, marginTop: 16, backgroundColor: colors.surface,
    padding: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.borderLight,
  },
  disclaimerText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});
