import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useDrugData } from '../hooks/useDrugData';
import { UNIT_COLORS, PATHOLOGY_COLORS, PATHOLOGY_ICONS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import { PATHOLOGY_CATEGORY_LABELS as CATEGORY_LABELS } from '../utils/labels';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';

type Props = NativeStackScreenProps<RootStackParamList, 'PathologyDetail'>;

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

export function PathologyDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const { getPathologyById, getDrugById } = useDrugData();
  const pathology = getPathologyById(route.params.pathologyId);

  if (!pathology) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Patología no encontrada</Text>
      </View>
    );
  }

  const catColor = PATHOLOGY_COLORS[pathology.categoria] || colors.primary;
  const catIcon = PATHOLOGY_ICONS[pathology.categoria] || 'clipboard-text-outline';
  const linkedDrugs = pathology.farmacosRelacionados.map(id => getDrugById(id)).filter(Boolean);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={catColor} barStyle="light-content" />

      <View style={[styles.header, { backgroundColor: catColor }]}>
        <View style={styles.headerCategoryRow}>
          <MaterialCommunityIcons name={catIcon} size={20} color="rgba(255,255,255,0.9)" style={{ marginRight: 6 }} />
          <Text style={styles.categoryLabel}>{CATEGORY_LABELS[pathology.categoria]}</Text>
        </View>
        <Text style={styles.pathologyName}>{pathology.nombre}</Text>
        <View style={styles.headerStats}>
          <View style={styles.statBadge}>
            <Text style={styles.statNumber}>{linkedDrugs.length}</Text>
            <Text style={styles.statLabel}>Fármacos</Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statNumber}>{pathology.signosSintomas.length}</Text>
            <Text style={styles.statLabel}>Signos</Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statNumber}>{pathology.criteriosAlarma.length}</Text>
            <Text style={styles.statLabel}>Alarmas</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.definitionCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MaterialCommunityIcons name="clipboard-list-outline" size={18} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.definitionTitle, { marginBottom: 0 }]}>Definición</Text>
          </View>
          <Text style={styles.definitionText}>{pathology.definicion}</Text>
        </View>

        <View style={[styles.card, { borderLeftColor: catColor }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="microscope" size={18} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.cardTitle, { marginBottom: 0 }]}>Fisiopatología</Text>
          </View>
          <Text style={styles.cardText}>{pathology.fisiopatologiaBreve}</Text>
        </View>

        <View style={[styles.card, { borderLeftColor: '#2563EB' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="stethoscope" size={18} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.cardTitle, { marginBottom: 0 }]}>Signos y Síntomas</Text>
          </View>
          <BulletList items={pathology.signosSintomas} color="#2563EB" />
        </View>

        <View style={styles.alarmCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <MaterialCommunityIcons name="alert-outline" size={18} color={colors.error} style={{ marginRight: 6 }} />
            <Text style={[styles.alarmTitle, { marginBottom: 0 }]}>Criterios de Alarma</Text>
          </View>
          <Text style={styles.alarmSubtitle}>Situaciones que requieren acción inmediata</Text>
          {pathology.criteriosAlarma.map((item, i) => (
            <View key={i} style={styles.alarmItem}>
              <MaterialCommunityIcons name="circle" size={10} color="#DC2626" style={{ marginRight: 8, marginTop: 3 }} />
              <Text style={styles.alarmText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { borderLeftColor: colors.nursing }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="account-heart-outline" size={18} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.cardTitle, { marginBottom: 0 }]}>Cuidados de Enfermería</Text>
          </View>
          {pathology.cuidadosEnfermeria.map((item, i) => (
            <View key={i} style={styles.nursingItem}>
              <Text style={styles.nursingNumber}>{i + 1}</Text>
              <Text style={styles.nursingText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.drugsSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <MaterialCommunityIcons name="pill" size={18} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.drugsSectionTitle, { marginBottom: 0 }]}>Fármacos Relacionados ({linkedDrugs.length})</Text>
          </View>
          <Text style={styles.drugsSectionSubtitle}>Toca un fármaco para ver su ficha completa</Text>
          {linkedDrugs.map(drug => {
            if (!drug) return null;
            const unitColor = UNIT_COLORS[drug.unidadId] || colors.primary;
            return (
              <TouchableOpacity
                key={drug.id}
                style={[styles.drugCard, { borderLeftColor: unitColor }]}
                onPress={() => navigation.navigate('DrugDetail', { drugId: drug.id })}
                activeOpacity={0.7}
              >
                <View style={styles.drugCardContent}>
                  <Text style={styles.drugName}>{drug.nombre}</Text>
                  <Text style={styles.drugGeneric}>{drug.nombreGenerico}</Text>
                  <Text style={styles.drugFamily}>{drug.familia}</Text>
                </View>
                <View style={styles.drugCardRight}>
                  <View style={styles.drugRoutes}>
                    {drug.viaAdministracion.slice(0, 3).map(via => (
                      <Text key={via} style={styles.drugRouteBadge}>{via}</Text>
                    ))}
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: colors.textSecondary },
  header: { paddingTop: 12, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerCategoryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  categoryLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  pathologyName: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginTop: 4 },
  headerStats: { flexDirection: 'row', marginTop: 14, gap: 10 },
  statBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6, alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  scroll: { flex: 1 },
  definitionCard: { ...neuCard(colors), margin: 16, marginBottom: 8, padding: 16 },
  definitionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 },
  definitionText: { fontSize: 14, color: colors.text, lineHeight: 22 },
  card: { ...neuCard(colors), marginHorizontal: 16, marginBottom: 8, padding: 16, borderLeftWidth: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 10 },
  cardText: { fontSize: 14, color: colors.text, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  bullet: { fontSize: 16, marginRight: 8, marginTop: -1 },
  bulletText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
  alarmCard: { backgroundColor: colors.error + '12', marginHorizontal: 16, marginBottom: 8, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.error + '30' },
  alarmTitle: { fontSize: 16, fontWeight: '700', color: colors.error, marginBottom: 2 },
  alarmSubtitle: { fontSize: 12, color: colors.error, marginBottom: 12, opacity: 0.8 },
  alarmItem: { flexDirection: 'row', marginBottom: 8, paddingRight: 8 },
  alarmBullet: { fontSize: 10, marginRight: 8, marginTop: 3 },
  alarmText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
  nursingItem: { flexDirection: 'row', marginBottom: 10, paddingRight: 8 },
  nursingNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.nursing + '20', color: colors.nursing, fontWeight: '700', fontSize: 12, textAlign: 'center', lineHeight: 24, marginRight: 10 },
  nursingText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
  drugsSection: { marginHorizontal: 16, marginBottom: 8, marginTop: 4 },
  drugsSectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  drugsSectionSubtitle: { fontSize: 12, color: colors.textSecondary, marginBottom: 12 },
  drugCard: { ...neuCardSubtle(colors), borderRadius: 12, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4 },
  drugCardContent: { flex: 1 },
  drugName: { fontSize: 15, fontWeight: '700', color: colors.text },
  drugGeneric: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic', marginTop: 1 },
  drugFamily: { fontSize: 11, color: colors.textLight, marginTop: 2 },
  drugCardRight: { alignItems: 'flex-end' },
  drugRoutes: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  drugRouteBadge: { fontSize: 9, color: colors.primaryLight, backgroundColor: colors.primary + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '600' },
  drugArrow: { fontSize: 16, color: colors.textLight },
});