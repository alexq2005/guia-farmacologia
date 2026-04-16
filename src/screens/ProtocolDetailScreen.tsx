import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar, Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, EmergencyProtocol } from '../types';
import { PROTOCOL_COLORS, PROTOCOL_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import protocolsData from '../data/emergency_protocols.json';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'ProtocolDetail'>;

const PRIORITY_CONFIG = {
  critico: { label: 'CRÍTICO', color: '#DC2626', bg: '#DC262618' },
  urgente: { label: 'URGENTE', color: '#F59E0B', bg: '#F59E0B18' },
  emergente: { label: 'EMERGENTE', color: '#EA580C', bg: '#EA580C18' },
};

export function ProtocolDetailScreen({ route }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
  const protocols = protocolsData as EmergencyProtocol[];
  const protocol = protocols.find(p => p.id === route.params.protocolId);

  if (!protocol) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <MaterialCommunityIcons name="alert-octagon" size={48} color="#DC2626" />
        <Text style={{ color: colors.text, fontSize: 16, marginTop: 12 }}>Protocolo no encontrado</Text>
      </View>
    );
  }

  const catColor = PROTOCOL_COLORS[protocol.categoria];
  const prioConfig = PRIORITY_CONFIG[protocol.prioridad];

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={catColor} barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { backgroundColor: catColor }]}>
        <View style={styles.headerTop}>
          <MaterialCommunityIcons name={PROTOCOL_ICONS[protocol.categoria] || 'hospital-building'} size={36} color="#FFFFFF" />
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="flag-variant" size={18} color="#DC2626" style={{ marginRight: 6 }} />
            <Text style={[styles.redFlagsTitle, { marginBottom: 0 }]}>Banderas Rojas</Text>
          </View>
          {protocol.banderasRojas.map((flag, i) => (
            <View key={i} style={styles.redFlagRow}>
              <View style={styles.redFlagDot} />
              <Text style={styles.redFlagText}>{flag}</Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          <MaterialCommunityIcons name="clipboard-list-outline" size={18} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Pasos del Protocolo</Text>
        </View>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="timer-outline" size={12} color={colors.textSecondary} style={{ marginRight: 3 }} />
                    <Text style={styles.timeText}>{step.tiempo}</Text>
                  </View>
                </View>
              )}
              {step.critico && (
                <View style={styles.criticalBadge}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="alert-outline" size={12} color="#DC2626" style={{ marginRight: 2 }} />
                    <Text style={styles.criticalText}>CRÍTICO</Text>
                  </View>
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
                    <MaterialCommunityIcons name="pill" size={14} color={colors.primary} style={{ marginRight: 8 }} />
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <MaterialCommunityIcons name="help-circle-outline" size={16} color={colors.text} style={{ marginRight: 4 }} />
                  <Text style={[styles.decisionQuestion, { marginBottom: 0 }]}>{step.decision.pregunta}</Text>
                </View>
                <View style={styles.decisionOptions}>
                  <View style={[styles.decisionBox, { backgroundColor: '#16A34A15', borderColor: '#16A34A40' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                      <MaterialCommunityIcons name="check" size={14} color="#16A34A" style={{ marginRight: 4 }} />
                      <Text style={[styles.decisionLabel, { color: '#16A34A', marginBottom: 0 }]}>SÍ</Text>
                    </View>
                    <Text style={styles.decisionText}>{step.decision.si}</Text>
                  </View>
                  <View style={[styles.decisionBox, { backgroundColor: '#DC262615', borderColor: '#DC262640' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                      <MaterialCommunityIcons name="close" size={14} color="#DC2626" style={{ marginRight: 4 }} />
                      <Text style={[styles.decisionLabel, { color: '#DC2626', marginBottom: 0 }]}>NO</Text>
                    </View>
                    <Text style={styles.decisionText}>{step.decision.no}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Drug Summary */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          <MaterialCommunityIcons name="pill" size={18} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Resumen de Fármacos</Text>
        </View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          <MaterialCommunityIcons name="account-heart-outline" size={18} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Notas de Enfermería</Text>
        </View>
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
Este protocolo es una guía de referencia educativa. Siga siempre los protocolos institucionales y las indicaciones del equipo médico.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    paddingTop: rs.space(16), paddingBottom: rs.space(20), paddingHorizontal: rs.space(20),
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: rs.space(8) },
  headerIcon: { fontSize: rs.font(36) },
  priorityBadge: { paddingHorizontal: rs.space(10), paddingVertical: rs.space(4), borderRadius: 10 },
  priorityText: { fontSize: rs.font(11), fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  headerTitle: { fontSize: rs.font(22), fontWeight: '800', color: '#FFFFFF' },
  headerAbbr: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: 2 },
  headerDesc: { fontSize: rs.font(13), color: 'rgba(255,255,255,0.7)', marginTop: rs.space(6), lineHeight: rs.font(18) },
  scroll: { flex: 1 },
  redFlagsContainer: {
    margin: rs.space(16), marginBottom: 0, backgroundColor: '#DC262610', borderRadius: 14,
    padding: rs.space(16), borderWidth: 1, borderColor: '#DC262630',
  },
  redFlagsTitle: { fontSize: rs.font(15), fontWeight: '800', color: '#DC2626', marginBottom: rs.space(10) },
  redFlagRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: rs.space(6) },
  redFlagDot: { width: rs.space(6), height: rs.space(6), borderRadius: 3, backgroundColor: '#DC2626', marginRight: rs.space(8), marginTop: rs.space(5) },
  redFlagText: { fontSize: rs.font(13), color: colors.text, flex: 1, lineHeight: rs.font(18) },
  sectionTitle: {
    fontSize: rs.font(16), fontWeight: '800', color: colors.text,
    marginHorizontal: rs.space(20), marginTop: rs.space(20), marginBottom: rs.space(10),
  },
  stepCard: { ...neuCardSubtle(colors), marginHorizontal: rs.space(16), marginBottom: rs.space(8), padding: rs.space(16), borderLeftWidth: 3, borderLeftColor: colors.border },
  stepCardCritical: {
    borderLeftColor: '#DC2626', borderLeftWidth: 4,
    backgroundColor: colors.surface,
  },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(8), gap: rs.space(8) },
  stepNumber: {
    width: rs.space(28), height: rs.space(28), borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  stepNumberText: { color: '#FFFFFF', fontWeight: '800', fontSize: rs.font(13) },
  timeBadge: {
    backgroundColor: colors.background, paddingHorizontal: rs.space(8), paddingVertical: 3, borderRadius: 8,
  },
  timeText: { fontSize: rs.font(11), color: colors.textSecondary, fontWeight: '600' },
  criticalBadge: {
    backgroundColor: '#DC262615', paddingHorizontal: rs.space(8), paddingVertical: 3, borderRadius: 8,
  },
  criticalText: { fontSize: rs.font(10), fontWeight: '800', color: '#DC2626' },
  stepAction: { fontSize: rs.font(14), fontWeight: '700', color: colors.text, lineHeight: rs.font(20) },
  stepDetails: { fontSize: rs.font(12), color: colors.textSecondary, marginTop: 4, lineHeight: rs.font(17) },
  stepDrugs: {
    marginTop: rs.space(10), backgroundColor: colors.background, borderRadius: 10, padding: rs.space(10),
  },
  stepDrugRow: { flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(6) },
  stepDrugIcon: { fontSize: rs.font(14), marginRight: rs.space(8) },
  stepDrugInfo: { flex: 1 },
  stepDrugName: { fontSize: rs.font(13), fontWeight: '700', color: colors.text },
  stepDrugDosis: { fontSize: rs.font(11), color: colors.textSecondary, marginTop: 1 },
  decisionContainer: {
    marginTop: rs.space(12), backgroundColor: colors.background, borderRadius: 12, padding: rs.space(12),
  },
  decisionQuestion: { fontSize: rs.font(13), fontWeight: '700', color: colors.text, marginBottom: rs.space(8) },
  decisionOptions: { gap: rs.space(6) },
  decisionBox: { padding: rs.space(10), borderRadius: 8, borderWidth: 1 },
  decisionLabel: { fontSize: rs.font(11), fontWeight: '800', marginBottom: 2 },
  decisionText: { fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(17) },
  drugSummaryContainer: { ...neuCardSubtle(colors), marginHorizontal: rs.space(16), padding: rs.space(14) },
  drugSummaryRow: {
    flexDirection: 'row', paddingVertical: rs.space(8),
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  drugSummaryDot: { width: 4, borderRadius: 2, marginRight: rs.space(10), alignSelf: 'stretch' },
  drugSummaryInfo: { flex: 1 },
  drugSummaryName: { fontSize: rs.font(14), fontWeight: '700', color: colors.text },
  drugSummaryDosis: { fontSize: rs.font(13), fontWeight: '600', color: colors.primary, marginTop: 2 },
  drugSummaryDetails: { fontSize: rs.font(11), color: colors.textSecondary, marginTop: 2 },
  nursingContainer: { ...neuCardSubtle(colors), marginHorizontal: rs.space(16), padding: rs.space(14) },
  nursingRow: { flexDirection: 'row', marginBottom: rs.space(8), paddingRight: 4 },
  nursingBullet: { fontSize: rs.font(14), color: colors.nursing, marginRight: rs.space(8), marginTop: 1 },
  nursingText: { fontSize: rs.font(13), color: colors.textSecondary, flex: 1, lineHeight: rs.font(18) },
  disclaimer: {
    marginHorizontal: rs.space(16), marginTop: rs.space(16), backgroundColor: colors.surface,
    padding: rs.space(14), borderRadius: 12, borderWidth: 1, borderColor: colors.borderLight,
  },
  disclaimerText: { fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(18) },
});
