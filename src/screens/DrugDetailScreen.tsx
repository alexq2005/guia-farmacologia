import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { TouchableOpacity } from 'react-native';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { UNIT_COLORS, PREGNANCY_COLORS, ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'DrugDetail'>;

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

function InfoRow({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export function DrugDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { getDrugById, getUnitById } = useDrugData();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const drug = getDrugById(route.params.drugId);

  if (!drug) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Fármaco no encontrado</Text>
      </View>
    );
  }

  const unit = getUnitById(drug.unidadId);
  const unitColor = UNIT_COLORS[drug.unidadId] || colors.primary;
  const pregColor = PREGNANCY_COLORS[drug.embarazo] || colors.textLight;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={unitColor} barStyle="light-content" />

      <View style={[styles.header, { backgroundColor: unitColor }]}>
        <View style={styles.headerTopRow}>
          <Text style={[styles.unitName, { flex: 1 }]}>{unit?.nombre || 'Sin unidad'}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(drug.id)}
            style={styles.favButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favButtonIcon}>{isFavorite(drug.id) ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.drugName}>{drug.nombre}</Text>
        <Text style={styles.genericName}>{drug.nombreGenerico}</Text>
        <View style={styles.headerBadges}>
          <View style={[styles.pregBadge, { backgroundColor: pregColor }]}>
            <Text style={styles.pregText}>Embarazo: {drug.embarazo}</Text>
          </View>
          <View style={styles.familyBadge}>
            <Text style={styles.familyText}>{drug.familia}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.doseCard}>
          <Text style={styles.doseSectionTitle}>💊 Vía y Dosis</Text>

          <View style={styles.routesContainer}>
            {drug.viaAdministracion.map(via => (
              <View key={via} style={[styles.routeChip, { backgroundColor: (ROUTE_COLORS[via] || colors.primary) + '20', borderColor: ROUTE_COLORS[via] || colors.primary }]}>
                <Text style={[styles.routeChipText, { color: ROUTE_COLORS[via] || colors.primary }]}>{via}</Text>
              </View>
            ))}
          </View>

          <View style={styles.doseBox}>
            <Text style={styles.doseLabel}>Adulto</Text>
            <Text style={styles.doseValue}>{drug.dosis.adulto}</Text>
          </View>

          {drug.dosis.pediatrico && (
            <View style={[styles.doseBox, styles.pediatricBox]}>
              <Text style={[styles.doseLabel, { color: colors.pediatric }]}>👶 Pediátrico</Text>
              <Text style={styles.doseValue}>{drug.dosis.pediatrico}</Text>
            </View>
          )}

          {drug.dosis.geriatrico && (
            <View style={styles.doseBox}>
              <Text style={styles.doseLabel}>Geriátrico</Text>
              <Text style={styles.doseValue}>{drug.dosis.geriatrico}</Text>
            </View>
          )}

          {drug.dosis.ajusteRenal && (
            <View style={styles.doseBox}>
              <Text style={styles.doseLabel}>Ajuste renal</Text>
              <Text style={styles.doseValue}>{drug.dosis.ajusteRenal}</Text>
            </View>
          )}

          {drug.dosis.ajusteHepatico && (
            <View style={styles.doseBox}>
              <Text style={styles.doseLabel}>Ajuste hepático</Text>
              <Text style={styles.doseValue}>{drug.dosis.ajusteHepatico}</Text>
            </View>
          )}
        </View>

        <View style={styles.nursingCard}>
          <Text style={styles.nursingSectionTitle}>👩‍⚕️ Cuidados de Enfermería</Text>
          <BulletList items={drug.cuidadosEnfermeria} color={colors.nursing} />
        </View>

        {drug.riesgosSobremedicacion && (
          <View style={styles.riskCard}>
            <Text style={styles.riskSectionTitle}>⚠️ Riesgos por Sobremedicación</Text>
            <Text style={styles.riskDescription}>{drug.riesgosSobremedicacion.descripcion}</Text>
            {drug.riesgosSobremedicacion.efectos && (
              <View style={styles.riskEffects}>
                <Text style={styles.riskSubtitle}>Efectos de sobredosis/uso prolongado:</Text>
                <BulletList items={drug.riesgosSobremedicacion.efectos} color={colors.error} />
              </View>
            )}
            {drug.riesgosSobremedicacion.manejo && (
              <View style={styles.riskManejo}>
                <Text style={styles.riskManejoLabel}>Manejo:</Text>
                <Text style={styles.riskManejoText}>{drug.riesgosSobremedicacion.manejo}</Text>
              </View>
            )}
            {drug.riesgosSobremedicacion.alerta && (
              <View style={styles.riskAlerta}>
                <Text style={styles.riskAlertaText}>🚨 {drug.riesgosSobremedicacion.alerta}</Text>
              </View>
            )}
          </View>
        )}

        <CollapsibleSection title="Mecanismo de Acción" icon="⚙️" accentColor={unitColor}>
          <Text style={styles.bodyText}>{drug.mecanismoAccion}</Text>
        </CollapsibleSection>

        <CollapsibleSection title="Indicaciones" icon="✅" accentColor={colors.success} badge={`${drug.indicaciones.length}`}>
          <BulletList items={drug.indicaciones} color={colors.success} />
        </CollapsibleSection>

        <CollapsibleSection title="Contraindicaciones" icon="🚫" accentColor={colors.error} badge={`${drug.contraindicaciones.length}`}>
          <BulletList items={drug.contraindicaciones} color={colors.error} />
        </CollapsibleSection>

        <CollapsibleSection title="Efectos Adversos" icon="⚠️" accentColor={colors.warning} badge={`${drug.efectosAdversos.length}`}>
          <BulletList items={drug.efectosAdversos} color={colors.warning} />
        </CollapsibleSection>

        <CollapsibleSection title="Interacciones" icon="🔄" accentColor={colors.info}>
          <BulletList items={drug.interacciones} color={colors.info} />
        </CollapsibleSection>

        <CollapsibleSection title="Presentaciones" icon="📦" accentColor={colors.textSecondary}>
          <BulletList items={drug.presentaciones} />
        </CollapsibleSection>

        <CollapsibleSection title="Nombres Comerciales" icon="🏷️" accentColor={colors.textSecondary}>
          <Text style={styles.bodyText}>{drug.nombresComerciales.join(', ')}</Text>
        </CollapsibleSection>

        {drug.farmacocinetica && (
          <CollapsibleSection title="Farmacocinética" icon="📊" accentColor={unitColor}>
            <InfoRow label="Absorción" value={drug.farmacocinetica.absorcion || ''} />
            <InfoRow label="Distribución" value={drug.farmacocinetica.distribucion || ''} />
            <InfoRow label="Metabolismo" value={drug.farmacocinetica.metabolismo || ''} />
            <InfoRow label="Excreción" value={drug.farmacocinetica.excrecion || ''} />
            <InfoRow label="Vida media" value={drug.farmacocinetica.vidaMedia || ''} />
            <InfoRow label="Inicio de acción" value={drug.farmacocinetica.inicioAccion || ''} />
            <InfoRow label="Pico de acción" value={drug.farmacocinetica.picoAccion || ''} />
            <InfoRow label="Duración" value={drug.farmacocinetica.duracionAccion || ''} />
          </CollapsibleSection>
        )}

        <CollapsibleSection title="Lactancia" icon="🤱" accentColor={colors.pediatric}>
          <Text style={styles.bodyText}>{drug.lactancia}</Text>
        </CollapsibleSection>

        {drug.almacenamiento && (
          <CollapsibleSection title="Almacenamiento" icon="🏪" accentColor={colors.textSecondary}>
            <Text style={styles.bodyText}>{drug.almacenamiento}</Text>
          </CollapsibleSection>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center' },
  unitName: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  favButton: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  favButtonIcon: { fontSize: 18 },
  drugName: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginTop: 4 },
  genericName: { fontSize: 15, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', marginTop: 2 },
  headerBadges: { flexDirection: 'row', marginTop: 10, gap: 8 },
  pregBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pregText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  familyBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)' },
  familyText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  scroll: { flex: 1, marginTop: -12 },
  doseCard: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16,
    elevation: 3, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
    borderWidth: 2, borderColor: colors.primaryLight + '30',
  },
  doseSectionTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 10 },
  routesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  routeChip: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 1 },
  routeChipText: { fontSize: 13, fontWeight: '600' },
  doseBox: { backgroundColor: colors.background, padding: 10, borderRadius: 8, marginBottom: 6 },
  pediatricBox: { backgroundColor: colors.pediatric + '10', borderWidth: 1, borderColor: colors.pediatric + '30' },
  doseLabel: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  doseValue: { fontSize: 14, color: colors.text, lineHeight: 20 },
  nursingCard: { backgroundColor: colors.nursing + '08', marginHorizontal: 16, marginTop: 12, padding: 16, borderRadius: 16, borderWidth: 2, borderColor: colors.nursing + '25' },
  nursingSectionTitle: { fontSize: 18, fontWeight: '700', color: colors.nursing, marginBottom: 10 },
  riskCard: { backgroundColor: colors.error + '08', marginHorizontal: 16, marginTop: 12, padding: 16, borderRadius: 16, borderWidth: 2, borderColor: colors.error + '30' },
  riskSectionTitle: { fontSize: 18, fontWeight: '700', color: colors.error, marginBottom: 8 },
  riskDescription: { fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: 10 },
  riskEffects: { marginBottom: 10 },
  riskSubtitle: { fontSize: 12, fontWeight: '700', color: colors.error, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  riskManejo: { backgroundColor: colors.warning + '12', borderRadius: 8, padding: 10, borderLeftWidth: 3, borderLeftColor: colors.warning, marginBottom: 8 },
  riskManejoLabel: { fontSize: 12, fontWeight: '700', color: colors.warning, marginBottom: 4 },
  riskManejoText: { fontSize: 13, color: colors.text, lineHeight: 19 },
  riskAlerta: { backgroundColor: colors.error + '15', borderRadius: 8, padding: 10 },
  riskAlertaText: { fontSize: 13, fontWeight: '700', color: colors.error, lineHeight: 19 },
  bodyText: { fontSize: 14, color: colors.text, lineHeight: 21 },
  bulletRow: { flexDirection: 'row', marginBottom: 4, paddingRight: 8 },
  bullet: { fontSize: 14, color: colors.text, marginRight: 8, marginTop: 1 },
  bulletText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  infoRow: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  infoLabel: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, width: 110 },
  infoValue: { fontSize: 13, color: colors.text, flex: 1 },
  bottomSpacer: { height: 40 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: colors.error },
});