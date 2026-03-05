import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TextInput, Animated } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { TouchableOpacity } from 'react-native';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import { UNIT_COLORS, PREGNANCY_COLORS, ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { shareDrug } from '../utils/share';
import { useFadeIn } from '../utils/animations';

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
  const { getNote, saveNote } = useNotesContext();
  const fadeIn = useFadeIn(350);
  const drug = getDrugById(route.params.drugId);

  const existingNote = drug ? getNote(drug.id) : undefined;
  const [noteText, setNoteText] = useState(existingNote?.text || '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (existingNote) setNoteText(existingNote.text);
  }, [existingNote?.text]);

  useEffect(() => {
    if (!drug) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (noteText.trim()) {
        saveNote(drug.id, noteText.trim());
      }
    }, 800);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [noteText]);

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
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={unitColor} barStyle="light-content" />

      <View style={[styles.header, { backgroundColor: unitColor }]}>
        <View style={styles.headerTopRow}>
          <Text style={[styles.unitName, { flex: 1 }]}>{unit?.nombre || 'Sin unidad'}</Text>
          <TouchableOpacity
            onPress={() => shareDrug(drug)}
            style={styles.favButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favButtonIcon}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleFavorite(drug.id)}
            style={[styles.favButton, { marginLeft: 8 }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favButtonIcon}>{isFavorite(drug.id) ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.classificationBadge}>
          <Text style={styles.classificationText}>{drug.clasificacion}</Text>
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

        {drug.preparacionParenteral && (
          <View style={styles.parenteralCard}>
            <Text style={styles.parenteralSectionTitle}>💉 Guía de Administración Parenteral</Text>

            {drug.preparacionParenteral.medicamentoPeligroso && (
              <View style={styles.hazardBadge}>
                <Text style={styles.hazardText}>⚠️ MEDICAMENTO PELIGROSO</Text>
              </View>
            )}

            {(drug.preparacionParenteral.reconstitucion || drug.preparacionParenteral.dilucion || drug.preparacionParenteral.volumenAdministracion) && (
              <CollapsibleSection title="Reconstitución y Dilución" icon="🧪" accentColor={colors.primary} initiallyOpen>
                {drug.preparacionParenteral.reconstitucion && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Reconstitución</Text>
                    <Text style={styles.parenteralValue}>{drug.preparacionParenteral.reconstitucion}</Text>
                  </View>
                )}
                {drug.preparacionParenteral.dilucion && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Dilución</Text>
                    <Text style={styles.parenteralValue}>{drug.preparacionParenteral.dilucion}</Text>
                  </View>
                )}
                {drug.preparacionParenteral.volumenAdministracion && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Volumen</Text>
                    <Text style={styles.parenteralValue}>{drug.preparacionParenteral.volumenAdministracion}</Text>
                  </View>
                )}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.velocidadAdministracion && (
              <CollapsibleSection title="Administración" icon="⏱️" accentColor={colors.info} initiallyOpen>
                <View style={styles.parenteralRow}>
                  <Text style={styles.parenteralLabel}>Velocidad</Text>
                  <Text style={styles.parenteralValue}>{drug.preparacionParenteral.velocidadAdministracion}</Text>
                </View>
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.solucionesCompatibles && (
              <CollapsibleSection title="Soluciones Compatibles" icon="💧" accentColor="#0891B2">
                {drug.preparacionParenteral.solucionesCompatibles.ssf != null && (
                  <View style={styles.compatRow}>
                    <Text style={[styles.compatIcon, { color: drug.preparacionParenteral.solucionesCompatibles.ssf === true ? '#059669' : drug.preparacionParenteral.solucionesCompatibles.ssf === false ? '#DC2626' : '#D97706' }]}>
                      {drug.preparacionParenteral.solucionesCompatibles.ssf === true ? '✅' : drug.preparacionParenteral.solucionesCompatibles.ssf === false ? '❌' : '⚠️'}
                    </Text>
                    <View style={styles.compatInfo}>
                      <Text style={styles.compatName}>SSF (NaCl 0.9%)</Text>
                      {typeof drug.preparacionParenteral.solucionesCompatibles.ssf === 'string' && (
                        <Text style={styles.compatNote}>{drug.preparacionParenteral.solucionesCompatibles.ssf}</Text>
                      )}
                    </View>
                  </View>
                )}
                {drug.preparacionParenteral.solucionesCompatibles.sg5 != null && (
                  <View style={styles.compatRow}>
                    <Text style={[styles.compatIcon, { color: drug.preparacionParenteral.solucionesCompatibles.sg5 === true ? '#059669' : drug.preparacionParenteral.solucionesCompatibles.sg5 === false ? '#DC2626' : '#D97706' }]}>
                      {drug.preparacionParenteral.solucionesCompatibles.sg5 === true ? '✅' : drug.preparacionParenteral.solucionesCompatibles.sg5 === false ? '❌' : '⚠️'}
                    </Text>
                    <View style={styles.compatInfo}>
                      <Text style={styles.compatName}>SG 5%</Text>
                      {typeof drug.preparacionParenteral.solucionesCompatibles.sg5 === 'string' && (
                        <Text style={styles.compatNote}>{drug.preparacionParenteral.solucionesCompatibles.sg5}</Text>
                      )}
                    </View>
                  </View>
                )}
                {drug.preparacionParenteral.solucionesCompatibles.otras && (
                  <View style={styles.compatRow}>
                    <Text style={styles.compatIcon}>ℹ️</Text>
                    <View style={styles.compatInfo}>
                      <Text style={styles.compatName}>Otras</Text>
                      <Text style={styles.compatNote}>{drug.preparacionParenteral.solucionesCompatibles.otras}</Text>
                    </View>
                  </View>
                )}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.compatibilidadNPT && (
              <CollapsibleSection title="Compatibilidad con NPT" icon="🍶" accentColor="#7C3AED">
                {drug.preparacionParenteral.compatibilidadNPT.tresEnUno && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>3-en-1 (amino + glucosa + lípidos)</Text>
                    <Text style={styles.parenteralValue}>{drug.preparacionParenteral.compatibilidadNPT.tresEnUno}</Text>
                  </View>
                )}
                {drug.preparacionParenteral.compatibilidadNPT.dosEnUno && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>2-en-1 (amino + glucosa)</Text>
                    <Text style={styles.parenteralValue}>{drug.preparacionParenteral.compatibilidadNPT.dosEnUno}</Text>
                  </View>
                )}
                {drug.preparacionParenteral.compatibilidadNPT.observaciones && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Observaciones NPT</Text>
                    <Text style={styles.parenteralValue}>{drug.preparacionParenteral.compatibilidadNPT.observaciones}</Text>
                  </View>
                )}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.estabilidad && (
              <CollapsibleSection title="Conservación y Estabilidad" icon="🧊" accentColor="#059669">
                <View style={styles.parenteralRow}>
                  <Text style={styles.parenteralLabel}>Estabilidad</Text>
                  <Text style={styles.parenteralValue}>{drug.preparacionParenteral.estabilidad}</Text>
                </View>
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.proteccionPersonal && drug.preparacionParenteral.proteccionPersonal.length > 0 && (
              <CollapsibleSection title="Protección del Personal" icon="🛡️" accentColor="#DC2626" initiallyOpen={drug.preparacionParenteral.medicamentoPeligroso}>
                {drug.preparacionParenteral.proteccionPersonal.map((item, i) => (
                  <View key={i} style={styles.proteccionRow}>
                    <Text style={styles.proteccionBullet}>•</Text>
                    <Text style={styles.proteccionText}>{item}</Text>
                  </View>
                ))}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.observaciones && (
              <CollapsibleSection title="Observaciones" icon="📋" accentColor={colors.textSecondary}>
                <Text style={styles.parenteralValue}>{drug.preparacionParenteral.observaciones}</Text>
              </CollapsibleSection>
            )}
          </View>
        )}

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

        {/* Personal Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesSectionTitle}>📝 Mis Notas</Text>
          <TextInput
            style={styles.notesInput}
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Escribe tus notas personales sobre este fármaco..."
            placeholderTextColor={colors.textLight}
            multiline
            textAlignVertical="top"
          />
          {noteText.trim().length > 0 && (
            <Text style={styles.notesSaved}>Guardado automáticamente</Text>
          )}
        </View>

        <View style={styles.bottomSpacer} />
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
  parenteralCard: {
    backgroundColor: colors.primary + '08', marginHorizontal: 16, marginTop: 12, padding: 16, borderRadius: 16,
    borderWidth: 2, borderColor: colors.primary + '25',
  },
  parenteralSectionTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  hazardBadge: {
    backgroundColor: '#DC262615', borderRadius: 10, padding: 10, marginBottom: 10,
    borderWidth: 1, borderColor: '#DC262640', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  hazardText: { fontSize: 14, fontWeight: '800', color: '#DC2626', letterSpacing: 0.5 },
  parenteralRow: { backgroundColor: colors.background, padding: 10, borderRadius: 8, marginBottom: 6 },
  parenteralLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  parenteralValue: { fontSize: 14, color: colors.text, lineHeight: 20 },
  compatRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6, paddingHorizontal: 4 },
  compatIcon: { fontSize: 18, marginRight: 10, marginTop: 1 },
  compatInfo: { flex: 1 },
  compatName: { fontSize: 14, fontWeight: '600', color: colors.text },
  compatNote: { fontSize: 13, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  proteccionRow: { flexDirection: 'row', marginBottom: 4, paddingRight: 8 },
  proteccionBullet: { fontSize: 14, color: '#DC2626', marginRight: 8, marginTop: 1 },
  proteccionText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
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
  classificationBadge: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10,
    paddingVertical: 3, borderRadius: 10, marginTop: 6,
  },
  classificationText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  notesSection: {
    marginHorizontal: 16, marginTop: 12, backgroundColor: colors.noteBackground,
    borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.noteBorder,
  },
  notesSectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 },
  notesInput: {
    backgroundColor: colors.surface, borderRadius: 10, padding: 12, fontSize: 14,
    color: colors.text, minHeight: 80, borderWidth: 1, borderColor: colors.border,
  },
  notesSaved: { fontSize: 11, color: colors.textLight, marginTop: 4, textAlign: 'right', fontStyle: 'italic' },
  bottomSpacer: { height: 40 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: colors.error },
});