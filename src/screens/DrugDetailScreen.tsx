import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
  Animated,
  Modal,
  Pressable,
  type LayoutChangeEvent,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground } from 'react-native';
import ClipboardService from '@react-native-clipboard/clipboard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import { UNIT_COLORS, PREGNANCY_COLORS, ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { shareDrug } from '../utils/share';
import { useFadeIn } from '../utils/animations';
import { useRecentDrugs } from '../hooks/useRecentDrugs';
import { SkeletonDrugDetail } from '../components/Skeleton';
import { neuCard } from '../utils/neumorphism';
import { getUnitImage, HERO_IMAGE } from '../utils/unitImages';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import {
  getMeta,
  getReviewStatus,
  formatMonthYear,
} from '../utils/datasetMeta';

const drugsMeta = getMeta('drugs');
const drugsReviewStatus = getReviewStatus('drugs');

type Props = NativeStackScreenProps<RootStackParamList, 'DrugDetail'>;

function BulletList({ items, color }: { items: string[]; color?: string }) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
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
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const PREGNANCY_INFO: Record<
  string,
  { label: string; desc: string; risk: string }
> = {
  A: {
    label: 'Categoría A',
    desc: 'Estudios controlados en mujeres no han demostrado riesgo fetal en el primer trimestre y no hay evidencia de riesgo en trimestres posteriores.',
    risk: 'Sin riesgo',
  },
  B: {
    label: 'Categoría B',
    desc: 'Estudios en animales no han mostrado riesgo fetal, pero no hay estudios controlados en mujeres embarazadas. O estudios en animales mostraron efectos adversos no confirmados en humanos.',
    risk: 'Sin evidencia de riesgo',
  },
  C: {
    label: 'Categoría C',
    desc: 'Estudios en animales han mostrado efectos adversos sobre el feto. No hay estudios controlados en humanos. El fármaco solo debe usarse si el beneficio potencial justifica el riesgo.',
    risk: 'Riesgo no descartable',
  },
  D: {
    label: 'Categoría D',
    desc: 'Existe evidencia positiva de riesgo fetal humano basada en datos de reacciones adversas. Sin embargo, los beneficios del uso en embarazadas pueden ser aceptables a pesar del riesgo (ej: situación de riesgo vital).',
    risk: 'Evidencia de riesgo',
  },
  X: {
    label: 'Categoría X',
    desc: 'Estudios en animales o humanos han demostrado anomalías fetales y/o existe evidencia positiva de riesgo fetal. Los riesgos superan claramente cualquier beneficio posible. Contraindicado en embarazo.',
    risk: 'Contraindicado',
  },
  'N/A': {
    label: 'No clasificado',
    desc: 'No se ha asignado categoría de riesgo en embarazo para este fármaco. Consultar ficha técnica actualizada.',
    risk: 'Sin clasificar',
  },
};

function PregnancyModal({
  visible,
  onClose,
  current,
}: {
  visible: boolean;
  onClose: () => void;
  current: string;
}) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const s = useMemo(() => createStyles(colors, rs), [colors, rs]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={s.modalOverlay} onPress={onClose}>
        <Pressable style={s.modalContent} onPress={e => e.stopPropagation()}>
          <Text style={s.modalTitle}>Categorías de Embarazo (FDA)</Text>
          <Text style={s.modalSubtitle}>Clasificación de riesgo fetal</Text>
          {(['A', 'B', 'C', 'D', 'X'] as const).map(cat => {
            const info = PREGNANCY_INFO[cat];
            const color = PREGNANCY_COLORS[cat] || colors.textLight;
            const isCurrent = cat === current;
            return (
              <View
                key={cat}
                style={[
                  s.pregModalRow,
                  isCurrent && {
                    backgroundColor: color + '15',
                    borderColor: color + '40',
                  },
                ]}
              >
                <View style={[s.pregModalBadge, { backgroundColor: color }]}>
                  <Text style={s.pregModalBadgeText}>{cat}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.pregModalRisk, { color }]}>{info.risk}</Text>
                  <Text style={s.pregModalDesc}>{info.desc}</Text>
                </View>
                {isCurrent && (
                  <MaterialCommunityIcons
                    name="arrow-left-bold"
                    size={16}
                    color={color}
                  />
                )}
              </View>
            );
          })}
          <TouchableOpacity
            style={[s.modalCloseBtn, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={s.modalCloseBtnText}>Entendido</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function CopyButton({
  text,
  colors: c,
}: {
  text: string;
  colors: ThemeColors;
}) {
  const [copied, setCopied] = useState(false);
  const rs = useResponsiveScale();
  const handleCopy = useCallback(() => {
    ClipboardService.setString(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <TouchableOpacity
      onPress={handleCopy}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={{ paddingHorizontal: rs.space(6), paddingVertical: rs.space(2) }}
    >
      <MaterialCommunityIcons
        name={copied ? 'check' : 'content-copy'}
        size={14}
        color={copied ? c.success : c.textLight}
      />
    </TouchableOpacity>
  );
}

export function DrugDetailScreen({ route, navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { getDrugById, getUnitById, pathologies } = useDrugData();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { getNote, saveNote } = useNotesContext();
  const { addRecent } = useRecentDrugs();
  const fadeIn = useFadeIn(350);
  const [showPregModal, setShowPregModal] = useState(false);
  const drug = getDrugById(route.params.drugId);

  // ── Índice de secciones (chips ancla) ──────────────────────
  // Registra la posición Y de cada sección crítica dentro del scroll
  // para saltar a ella con un toque (scrollTo con refs, sin librerías).
  const scrollRef = useRef<ScrollView>(null);
  const sectionYRef = useRef<Record<string, number>>({});
  const registerSection = useCallback(
    (key: string) => (e: LayoutChangeEvent) => {
      sectionYRef.current[key] = e.nativeEvent.layout.y;
    },
    [],
  );
  const scrollToSection = useCallback(
    (key: string) => {
      const y = sectionYRef.current[key];
      if (y != null) {
        scrollRef.current?.scrollTo({
          y: Math.max(y - rs.space(8), 0),
          animated: true,
        });
      }
    },
    [rs],
  );

  // Set drug name as header title + track recent
  useEffect(() => {
    if (drug) {
      navigation.setOptions({ title: drug.nombre });
      navigation.setParams({ drugName: drug.nombre });
      addRecent(drug.id);
    }
  }, [drug?.id]);

  // Reverse lookup: find pathologies that reference this drug.
  // farmacosRelacionados is string[] (drug IDs or names), not objects.
  const relatedPathologies = useMemo(() => {
    if (!drug) return [];
    return pathologies.filter(p =>
      p.farmacosRelacionados?.some(f => f === drug.id),
    );
  }, [drug?.id, pathologies]);

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
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [noteText]);

  if (!drug) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons
          name="pill-off"
          size={48}
          color={colors.textLight}
          style={{ marginBottom: rs.space(12) }}
        />
        <Text style={styles.errorText}>Fármaco no encontrado</Text>
        <TouchableOpacity
          style={{
            marginTop: rs.space(16),
            backgroundColor: colors.primary,
            paddingHorizontal: rs.space(24),
            paddingVertical: rs.space(12),
            borderRadius: 12,
          }}
          onPress={() => navigation.goBack()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={18}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: rs.font(15),
              }}
            >
              Volver
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const unit = getUnitById(drug.unidadId);
  const unitColor = UNIT_COLORS[drug.unidadId] || colors.primary;
  const pregColor = PREGNANCY_COLORS[drug.embarazo] || colors.textLight;

  // Secciones disponibles para el índice rápido (solo las críticas en guardia)
  const hasLegacyPrep =
    !drug.preparacionParenteral &&
    Boolean(
      drug.preparacionDilucion ||
        drug.reconstitucion ||
        (Array.isArray(drug.solucionesCompatibles) &&
          drug.solucionesCompatibles.length > 0),
    );
  const sectionIndex = [
    { key: 'dosis', label: 'Dosis', icon: 'needle', color: colors.primary },
    ...(drug.preparacionParenteral || hasLegacyPrep
      ? [
          {
            key: 'preparacion',
            label: 'Preparación',
            icon: 'iv-bag',
            color: colors.info,
          },
        ]
      : []),
    {
      key: 'cuidados',
      label: 'Cuidados',
      icon: 'account-heart-outline',
      color: colors.nursing,
    },
    ...(drug.riesgosSobremedicacion
      ? [
          {
            key: 'riesgos',
            label: 'Riesgos',
            icon: 'alert-outline',
            color: colors.warning,
          },
        ]
      : []),
    {
      key: 'contraindicaciones',
      label: 'Contraindic.',
      icon: 'close-octagon-outline',
      color: colors.error,
    },
    {
      key: 'interacciones',
      label: 'Interacciones',
      icon: 'swap-horizontal',
      color: colors.info,
    },
  ];
  const chipTint = (color: string) => ({
    borderColor: color + '45',
    backgroundColor: color + '10',
  });

  // Parse replacement note from mechanism text
  const notaMatch = drug.mecanismoAccion?.match(/\s*Nota:\s*(.+)$/);
  const isReplacement = notaMatch && /reemplaz|sustitu/i.test(notaMatch[1]);
  const mainMechanism = notaMatch
    ? drug.mecanismoAccion.replace(/\s*Nota:\s*.+$/, '')
    : drug.mecanismoAccion;
  const replacedDrug =
    isReplacement && notaMatch
      ? notaMatch[1]
          .match(
            /reemplazado?\s+a\s+([a-záéíóúñü/\s]+?)(?:\s+(?:en|por|como|debido|,|\())/i,
          )?.[1]
          ?.trim() ||
        notaMatch[1]
          .match(
            /reemplazan?\s+a\s+([a-záéíóúñü/\s]+?)(?:\s+(?:en|por|como|debido|,|\())/i,
          )?.[1]
          ?.trim() ||
        null
      : null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar
        backgroundColor={unitColor}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ImageBackground
        source={getUnitImage(drug.unidadId) || HERO_IMAGE}
        style={styles.headerImageBg}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[unitColor + '80', unitColor + 'E6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTopRow}>
            <Text style={[styles.unitName, { flex: 1 }]}>
              {unit?.nombre || 'Sin unidad'}
            </Text>
            <TouchableOpacity
              onPress={() => shareDrug(drug)}
              style={styles.favButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleFavorite(drug.id)}
              style={[styles.favButton, { marginLeft: rs.space(8) }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name={isFavorite(drug.id) ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorite(drug.id) ? '#E91E63' : '#FFFFFF'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.classificationBadge}>
            <Text style={styles.classificationText}>{drug.clasificacion}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.drugName, { flex: 1 }]}>{drug.nombre}</Text>
            <CopyButton
              text={`${drug.nombre} (${drug.nombreGenerico})`}
              colors={{
                ...colors,
                textLight: 'rgba(255,255,255,0.6)',
                success: '#34D399',
              }}
            />
          </View>
          <Text style={styles.genericName}>{drug.nombreGenerico}</Text>
          <View style={styles.headerBadges}>
            <TouchableOpacity
              style={[styles.pregBadge, { backgroundColor: pregColor }]}
              onPress={() => setShowPregModal(true)}
              accessibilityRole="button"
              accessibilityLabel={`Categoría de embarazo ${drug.embarazo}. Toca para más información`}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.pregText}>Embarazo: {drug.embarazo} </Text>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={12}
                  color="#FFFFFF"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.familyBadge}>
              <Text style={styles.familyText}>{drug.familia}</Text>
            </View>
          </View>
          {(drug.grupoTerapeutico || drug.grupoFarmacologico) && (
            <View style={styles.grupoRow}>
              {drug.grupoTerapeutico && (
                <View style={styles.grupoBadge}>
                  <Text style={styles.grupoLabel}>GT</Text>
                  <Text style={styles.grupoText}>{drug.grupoTerapeutico}</Text>
                </View>
              )}
              {drug.grupoFarmacologico && (
                <View style={styles.grupoBadge}>
                  <Text style={styles.grupoLabel}>GF</Text>
                  <Text style={styles.grupoText}>
                    {drug.grupoFarmacologico}
                  </Text>
                </View>
              )}
            </View>
          )}
          {isReplacement && replacedDrug && (
            <View style={styles.replacementHeaderBadge}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="swap-horizontal-circle-outline"
                  size={14}
                  color="#FFFFFF"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.replacementHeaderText}>
                  Reemplazo de {replacedDrug}
                </Text>
              </View>
            </View>
          )}
        </LinearGradient>
      </ImageBackground>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Índice rápido de secciones críticas — chips ancla */}
        <View style={styles.sectionIndexRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sectionIndexContent}
          >
            {sectionIndex.map(s => (
              <TouchableOpacity
                key={s.key}
                style={[styles.sectionIndexChip, chipTint(s.color)]}
                onPress={() => scrollToSection(s.key)}
                accessibilityRole="button"
                accessibilityLabel={`Ir a la sección ${s.label}`}
              >
                <MaterialCommunityIcons
                  name={s.icon}
                  size={13}
                  color={s.color}
                  style={styles.sectionIndexIcon}
                />
                <Text style={[styles.sectionIndexLabel, { color: s.color }]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {(() => {
          // Farmacocinética se considera "parcial" si tiene menos de 3 subcampos
          // populados (de los 8 posibles). El objeto puede existir con un solo
          // string en `absorcion` y no aportar valor clínico real.
          const fcFields = drug.farmacocinetica
            ? Object.values(drug.farmacocinetica).filter(
                v => typeof v === 'string' && v.trim().length > 0,
              ).length
            : 0;
          const missing = [
            fcFields < 3 && 'Farmacocinética',
            !drug.dosis.ajusteRenal && 'Ajuste renal',
            !drug.dosis.ajusteHepatico && 'Ajuste hepático',
            !drug.dosis.pediatrico && 'Dosis pediátrica',
            !drug.almacenamiento && 'Almacenamiento',
          ].filter(Boolean);
          return missing.length > 0 ? (
            <View style={styles.incompleteBadge}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={14}
                  color={colors.info}
                  style={{ marginRight: 4, marginTop: 1 }}
                />
                <Text style={[styles.incompleteBadgeText, { flex: 1 }]}>
                  Información parcial — faltan: {missing.join(', ')}
                </Text>
              </View>
            </View>
          ) : null;
        })()}

        {/* Quick action buttons */}
        <View style={styles.quickActionRow}>
          <TouchableOpacity
            style={[
              styles.quickActionBtn,
              {
                backgroundColor: colors.info + '12',
                borderColor: colors.info + '30',
              },
            ]}
            onPress={() =>
              navigation.navigate('InteractionChecker', {
                preloadDrugId: drug.id,
              })
            }
            accessibilityRole="button"
            accessibilityLabel="Comprobar interacciones"
          >
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={16}
              color={colors.info}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.quickActionLabel, { color: colors.info }]}>
              Interacciones
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.quickActionBtn,
              {
                backgroundColor: colors.primary + '12',
                borderColor: colors.primary + '30',
              },
            ]}
            onPress={() =>
              navigation.navigate('DrugComparison', { preloadDrugId: drug.id })
            }
            accessibilityRole="button"
            accessibilityLabel="Comparar fármaco"
          >
            <MaterialCommunityIcons
              name="scale-balance"
              size={16}
              color={colors.primary}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.quickActionLabel, { color: colors.primary }]}>
              Comparar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.doseCard} onLayout={registerSection('dosis')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: rs.space(10),
            }}
          >
            <MaterialCommunityIcons
              name="needle"
              size={20}
              color={colors.primary}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.doseSectionTitle, { marginBottom: 0 }]}>
              Vía y Dosis
            </Text>
          </View>

          <View style={styles.routesContainer}>
            {drug.viaAdministracion.map(via => (
              <View
                key={via}
                style={[
                  styles.routeChip,
                  {
                    backgroundColor:
                      (ROUTE_COLORS[via] || colors.primary) + '20',
                    borderColor: ROUTE_COLORS[via] || colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.routeChipText,
                    { color: ROUTE_COLORS[via] || colors.primary },
                  ]}
                >
                  {via}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.doseBox}>
            <View style={styles.doseLabelRow}>
              <Text style={styles.doseLabel}>Adulto</Text>
              <CopyButton
                text={`${drug.nombre} — Adulto: ${drug.dosis.adulto}`}
                colors={colors}
              />
            </View>
            <Text style={styles.doseValue}>{drug.dosis.adulto}</Text>
          </View>

          {drug.dosis.pediatrico && (
            <View style={[styles.doseBox, styles.pediatricBox]}>
              <View style={styles.doseLabelRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name="baby-face-outline"
                    size={14}
                    color={colors.pediatric}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.doseLabel, { color: colors.pediatric }]}>
                    Pediátrico
                  </Text>
                </View>
                <CopyButton
                  text={`${drug.nombre} — Pediátrico: ${drug.dosis.pediatrico}`}
                  colors={colors}
                />
              </View>
              <Text style={styles.doseValue}>{drug.dosis.pediatrico}</Text>
            </View>
          )}

          {drug.dosis.geriatrico && (
            <View style={styles.doseBox}>
              <View style={styles.doseLabelRow}>
                <Text style={styles.doseLabel}>Geriátrico</Text>
                <CopyButton
                  text={`${drug.nombre} — Geriátrico: ${drug.dosis.geriatrico}`}
                  colors={colors}
                />
              </View>
              <Text style={styles.doseValue}>{drug.dosis.geriatrico}</Text>
            </View>
          )}

          {drug.dosis.ajusteRenal && (
            <View style={styles.doseBox}>
              <View style={styles.doseLabelRow}>
                <Text style={styles.doseLabel}>Ajuste renal</Text>
                <CopyButton
                  text={`${drug.nombre} — Ajuste renal: ${drug.dosis.ajusteRenal}`}
                  colors={colors}
                />
              </View>
              <Text style={styles.doseValue}>{drug.dosis.ajusteRenal}</Text>
            </View>
          )}

          {drug.dosis.ajusteHepatico && (
            <View style={styles.doseBox}>
              <View style={styles.doseLabelRow}>
                <Text style={styles.doseLabel}>Ajuste hepático</Text>
                <CopyButton
                  text={`${drug.nombre} — Ajuste hepático: ${drug.dosis.ajusteHepatico}`}
                  colors={colors}
                />
              </View>
              <Text style={styles.doseValue}>{drug.dosis.ajusteHepatico}</Text>
            </View>
          )}
        </View>

        {(drug.preparacionDilucion ||
          drug.reconstitucion ||
          (Array.isArray(drug.solucionesCompatibles) &&
            drug.solucionesCompatibles.length > 0)) &&
          !drug.preparacionParenteral && (
            <View
              style={styles.parenteralCard}
              onLayout={registerSection('preparacion')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="needle"
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: rs.space(6) }}
                />
                <Text
                  style={[styles.parenteralSectionTitle, { marginBottom: 0 }]}
                >
                  Preparación y Dilución
                </Text>
              </View>
              {drug.reconstitucion && (
                <CollapsibleSection
                  title="Reconstitución"
                  icon="flask-round-bottom-outline"
                  accentColor={colors.primary}
                  initiallyOpen
                >
                  <Text style={styles.parenteralValue}>
                    {drug.reconstitucion}
                  </Text>
                </CollapsibleSection>
              )}
              {drug.preparacionDilucion && (
                <CollapsibleSection
                  title="Dilución"
                  icon="water-outline"
                  accentColor={colors.info}
                  initiallyOpen
                >
                  <Text style={styles.parenteralValue}>
                    {drug.preparacionDilucion}
                  </Text>
                </CollapsibleSection>
              )}
              {Array.isArray(drug.solucionesCompatibles) &&
                drug.solucionesCompatibles.length > 0 && (
                  <CollapsibleSection
                    title="Soluciones Compatibles"
                    icon="test-tube"
                    accentColor="#0891B2"
                  >
                    {drug.solucionesCompatibles.map(
                      (sol: string, i: number) => (
                        <View key={i} style={styles.proteccionRow}>
                          <MaterialCommunityIcons
                            name={
                              sol.startsWith('INCOMPATIBLE')
                                ? 'close-circle'
                                : 'check-circle'
                            }
                            size={16}
                            color={
                              sol.startsWith('INCOMPATIBLE')
                                ? '#DC2626'
                                : '#059669'
                            }
                            style={{ marginRight: rs.space(8), marginTop: 1 }}
                          />
                          <Text style={styles.proteccionText}>{sol}</Text>
                        </View>
                      ),
                    )}
                  </CollapsibleSection>
                )}
              {drug.observaciones && (
                <CollapsibleSection
                  title="Observaciones"
                  icon="clipboard-text-outline"
                  accentColor={colors.textSecondary}
                >
                  <Text style={styles.parenteralValue}>
                    {drug.observaciones}
                  </Text>
                </CollapsibleSection>
              )}
            </View>
          )}

        {drug.preparacionParenteral && (
          <View
            style={styles.parenteralCard}
            onLayout={registerSection('preparacion')}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}
            >
              <MaterialCommunityIcons
                name="iv-bag"
                size={20}
                color={colors.primary}
                style={{ marginRight: rs.space(6) }}
              />
              <Text
                style={[styles.parenteralSectionTitle, { marginBottom: 0 }]}
              >
                Guía de Administración Parenteral
              </Text>
            </View>

            {drug.preparacionParenteral.medicamentoPeligroso && (
              <View style={styles.hazardBadge}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name="alert-outline"
                    size={18}
                    color="#DC2626"
                    style={{ marginRight: rs.space(6) }}
                  />
                  <Text style={styles.hazardText}>MEDICAMENTO PELIGROSO</Text>
                </View>
              </View>
            )}

            {(drug.preparacionParenteral.reconstitucion ||
              drug.preparacionParenteral.dilucion ||
              drug.preparacionParenteral.volumenAdministracion) && (
              <CollapsibleSection
                title="Reconstitución y Dilución"
                icon="flask-round-bottom-outline"
                accentColor={colors.primary}
                initiallyOpen
              >
                {drug.preparacionParenteral.reconstitucion && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Reconstitución</Text>
                    <Text style={styles.parenteralValue}>
                      {drug.preparacionParenteral.reconstitucion}
                    </Text>
                  </View>
                )}
                {drug.preparacionParenteral.dilucion && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Dilución</Text>
                    <Text style={styles.parenteralValue}>
                      {drug.preparacionParenteral.dilucion}
                    </Text>
                  </View>
                )}
                {drug.preparacionParenteral.volumenAdministracion && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>Volumen</Text>
                    <Text style={styles.parenteralValue}>
                      {drug.preparacionParenteral.volumenAdministracion}
                    </Text>
                  </View>
                )}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.velocidadAdministracion && (
              <CollapsibleSection
                title="Administración"
                icon="timer-outline"
                accentColor={colors.info}
                initiallyOpen
              >
                <View style={styles.parenteralRow}>
                  <Text style={styles.parenteralLabel}>Velocidad</Text>
                  <Text style={styles.parenteralValue}>
                    {drug.preparacionParenteral.velocidadAdministracion}
                  </Text>
                </View>
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.solucionesCompatibles && (
              <CollapsibleSection
                title="Soluciones Compatibles"
                icon="water-outline"
                accentColor="#0891B2"
              >
                {drug.preparacionParenteral.solucionesCompatibles.ssf !=
                  null && (
                  <View style={styles.compatRow}>
                    <MaterialCommunityIcons
                      name={
                        drug.preparacionParenteral.solucionesCompatibles.ssf ===
                        true
                          ? 'check-circle'
                          : drug.preparacionParenteral.solucionesCompatibles
                              .ssf === false
                          ? 'close-circle'
                          : 'alert-circle'
                      }
                      size={18}
                      color={
                        drug.preparacionParenteral.solucionesCompatibles.ssf ===
                        true
                          ? '#059669'
                          : drug.preparacionParenteral.solucionesCompatibles
                              .ssf === false
                          ? '#DC2626'
                          : '#D97706'
                      }
                      style={{ marginRight: rs.space(10), marginTop: 1 }}
                    />
                    <View style={styles.compatInfo}>
                      <Text style={styles.compatName}>SSF (NaCl 0.9%)</Text>
                      {typeof drug.preparacionParenteral.solucionesCompatibles
                        .ssf === 'string' && (
                        <Text style={styles.compatNote}>
                          {drug.preparacionParenteral.solucionesCompatibles.ssf}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {drug.preparacionParenteral.solucionesCompatibles.sg5 !=
                  null && (
                  <View style={styles.compatRow}>
                    <MaterialCommunityIcons
                      name={
                        drug.preparacionParenteral.solucionesCompatibles.sg5 ===
                        true
                          ? 'check-circle'
                          : drug.preparacionParenteral.solucionesCompatibles
                              .sg5 === false
                          ? 'close-circle'
                          : 'alert-circle'
                      }
                      size={18}
                      color={
                        drug.preparacionParenteral.solucionesCompatibles.sg5 ===
                        true
                          ? '#059669'
                          : drug.preparacionParenteral.solucionesCompatibles
                              .sg5 === false
                          ? '#DC2626'
                          : '#D97706'
                      }
                      style={{ marginRight: rs.space(10), marginTop: 1 }}
                    />
                    <View style={styles.compatInfo}>
                      <Text style={styles.compatName}>SG 5%</Text>
                      {typeof drug.preparacionParenteral.solucionesCompatibles
                        .sg5 === 'string' && (
                        <Text style={styles.compatNote}>
                          {drug.preparacionParenteral.solucionesCompatibles.sg5}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {drug.preparacionParenteral.solucionesCompatibles.otras && (
                  <View style={styles.compatRow}>
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={18}
                      color={colors.info}
                      style={{ marginRight: rs.space(10), marginTop: 1 }}
                    />
                    <View style={styles.compatInfo}>
                      <Text style={styles.compatName}>Otras</Text>
                      <Text style={styles.compatNote}>
                        {drug.preparacionParenteral.solucionesCompatibles.otras}
                      </Text>
                    </View>
                  </View>
                )}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.compatibilidadNPT && (
              <CollapsibleSection
                title="Compatibilidad con NPT"
                icon="flask"
                accentColor="#7C3AED"
              >
                {drug.preparacionParenteral.compatibilidadNPT.tresEnUno && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>
                      3-en-1 (amino + glucosa + lípidos)
                    </Text>
                    <Text style={styles.parenteralValue}>
                      {drug.preparacionParenteral.compatibilidadNPT.tresEnUno}
                    </Text>
                  </View>
                )}
                {drug.preparacionParenteral.compatibilidadNPT.dosEnUno && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>
                      2-en-1 (amino + glucosa)
                    </Text>
                    <Text style={styles.parenteralValue}>
                      {drug.preparacionParenteral.compatibilidadNPT.dosEnUno}
                    </Text>
                  </View>
                )}
                {drug.preparacionParenteral.compatibilidadNPT.observaciones && (
                  <View style={styles.parenteralRow}>
                    <Text style={styles.parenteralLabel}>
                      Observaciones NPT
                    </Text>
                    <Text style={styles.parenteralValue}>
                      {
                        drug.preparacionParenteral.compatibilidadNPT
                          .observaciones
                      }
                    </Text>
                  </View>
                )}
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.estabilidad && (
              <CollapsibleSection
                title="Conservación y Estabilidad"
                icon="snowflake"
                accentColor="#059669"
              >
                <View style={styles.parenteralRow}>
                  <Text style={styles.parenteralLabel}>Estabilidad</Text>
                  <Text style={styles.parenteralValue}>
                    {drug.preparacionParenteral.estabilidad}
                  </Text>
                </View>
              </CollapsibleSection>
            )}

            {drug.preparacionParenteral.proteccionPersonal &&
              drug.preparacionParenteral.proteccionPersonal.length > 0 && (
                <CollapsibleSection
                  title="Protección del Personal"
                  icon="shield-outline"
                  accentColor="#DC2626"
                  initiallyOpen={
                    drug.preparacionParenteral.medicamentoPeligroso
                  }
                >
                  {drug.preparacionParenteral.proteccionPersonal.map(
                    (item, i) => (
                      <View key={i} style={styles.proteccionRow}>
                        <Text style={styles.proteccionBullet}>•</Text>
                        <Text style={styles.proteccionText}>{item}</Text>
                      </View>
                    ),
                  )}
                </CollapsibleSection>
              )}

            {drug.preparacionParenteral.observaciones && (
              <CollapsibleSection
                title="Observaciones"
                icon="clipboard-text-outline"
                accentColor={colors.textSecondary}
              >
                <Text style={styles.parenteralValue}>
                  {drug.preparacionParenteral.observaciones}
                </Text>
              </CollapsibleSection>
            )}
          </View>
        )}

        <View style={styles.nursingCard} onLayout={registerSection('cuidados')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: rs.space(10),
            }}
          >
            <MaterialCommunityIcons
              name="account-heart-outline"
              size={20}
              color={colors.nursing}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.nursingSectionTitle, { marginBottom: 0 }]}>
              Cuidados de Enfermería
            </Text>
          </View>
          <BulletList items={drug.cuidadosEnfermeria} color={colors.nursing} />
        </View>

        {drug.riesgosSobremedicacion && (
          <View style={styles.riskCard} onLayout={registerSection('riesgos')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rs.space(8),
              }}
            >
              <MaterialCommunityIcons
                name="alert-outline"
                size={20}
                color={colors.error}
                style={{ marginRight: rs.space(6) }}
              />
              <Text style={[styles.riskSectionTitle, { marginBottom: 0 }]}>
                Riesgos por Sobremedicación
              </Text>
            </View>
            <Text style={styles.riskDescription}>
              {drug.riesgosSobremedicacion.descripcion}
            </Text>
            {drug.riesgosSobremedicacion.efectos && (
              <View style={styles.riskEffects}>
                <Text style={styles.riskSubtitle}>
                  Efectos de sobredosis/uso prolongado:
                </Text>
                <BulletList
                  items={drug.riesgosSobremedicacion.efectos}
                  color={colors.error}
                />
              </View>
            )}
            {drug.riesgosSobremedicacion.manejo && (
              <View style={styles.riskManejo}>
                <Text style={styles.riskManejoLabel}>Manejo:</Text>
                <Text style={styles.riskManejoText}>
                  {drug.riesgosSobremedicacion.manejo}
                </Text>
              </View>
            )}
            {drug.riesgosSobremedicacion.alerta && (
              <View style={styles.riskAlerta}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <MaterialCommunityIcons
                    name="alert-octagon"
                    size={16}
                    color={colors.error}
                    style={{ marginRight: rs.space(6), marginTop: 1 }}
                  />
                  <Text style={[styles.riskAlertaText, { flex: 1 }]}>
                    {drug.riesgosSobremedicacion.alerta}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {isReplacement && notaMatch && (
          <View style={styles.replacementBanner}>
            <Text style={styles.replacementBannerText}>{notaMatch[1]}</Text>
          </View>
        )}

        <CollapsibleSection
          title="Mecanismo de Acción"
          icon="cog-outline"
          accentColor={unitColor}
        >
          <Text style={styles.bodyText}>
            {mainMechanism || 'Sin datos disponibles'}
          </Text>
          {notaMatch && !isReplacement && (
            <Text
              style={[
                styles.bodyText,
                {
                  marginTop: rs.space(8),
                  fontStyle: 'italic',
                  color: colors.textSecondary,
                },
              ]}
            >
              Nota: {notaMatch[1]}
            </Text>
          )}
        </CollapsibleSection>

        <CollapsibleSection
          title="Indicaciones"
          icon="check-decagram-outline"
          accentColor={colors.success}
          badge={`${drug.indicaciones.length}`}
        >
          <BulletList items={drug.indicaciones} color={colors.success} />
        </CollapsibleSection>

        <View onLayout={registerSection('contraindicaciones')}>
          <CollapsibleSection
            title="Contraindicaciones"
            icon="close-octagon-outline"
            accentColor={colors.error}
            badge={`${drug.contraindicaciones.length}`}
            emphasized
          >
            <BulletList items={drug.contraindicaciones} color={colors.error} />
          </CollapsibleSection>
        </View>

        <CollapsibleSection
          title="Efectos Adversos"
          icon="alert-outline"
          accentColor={colors.warning}
          badge={`${drug.efectosAdversos.length}`}
        >
          <BulletList items={drug.efectosAdversos} color={colors.warning} />
        </CollapsibleSection>

        <View onLayout={registerSection('interacciones')}>
          <CollapsibleSection
            title="Interacciones"
            icon="swap-horizontal"
            accentColor={colors.info}
            badge={`${drug.interacciones.length}`}
          >
            <BulletList items={drug.interacciones} color={colors.info} />
          </CollapsibleSection>
        </View>

        <CollapsibleSection
          title="Presentaciones"
          icon="pill"
          accentColor={colors.textSecondary}
        >
          <BulletList items={drug.presentaciones} />
        </CollapsibleSection>

        <CollapsibleSection
          title="Nombres Comerciales"
          icon="tag-outline"
          accentColor={colors.textSecondary}
        >
          <Text style={styles.bodyText}>
            {drug.nombresComerciales.join(', ')}
          </Text>
        </CollapsibleSection>

        {drug.farmacocinetica && (
          <CollapsibleSection
            title="Farmacocinética"
            icon="chart-bell-curve-cumulative"
            accentColor={unitColor}
          >
            <InfoRow
              label="Absorción"
              value={drug.farmacocinetica.absorcion || ''}
            />
            <InfoRow
              label="Distribución"
              value={drug.farmacocinetica.distribucion || ''}
            />
            <InfoRow
              label="Metabolismo"
              value={drug.farmacocinetica.metabolismo || ''}
            />
            <InfoRow
              label="Excreción"
              value={drug.farmacocinetica.excrecion || ''}
            />
            <InfoRow
              label="Vida media"
              value={drug.farmacocinetica.vidaMedia || ''}
            />
            <InfoRow
              label="Inicio de acción"
              value={drug.farmacocinetica.inicioAccion || ''}
            />
            <InfoRow
              label="Pico de acción"
              value={drug.farmacocinetica.picoAccion || ''}
            />
            <InfoRow
              label="Duración"
              value={drug.farmacocinetica.duracionAccion || ''}
            />
          </CollapsibleSection>
        )}

        <CollapsibleSection
          title="Lactancia"
          icon="baby-bottle-outline"
          accentColor={colors.pediatric}
        >
          <Text style={styles.bodyText}>
            {drug.lactancia || 'Sin datos disponibles'}
          </Text>
        </CollapsibleSection>

        {drug.almacenamiento && (
          <CollapsibleSection
            title="Almacenamiento"
            icon="fridge-outline"
            accentColor={colors.textSecondary}
          >
            <Text style={styles.bodyText}>{drug.almacenamiento}</Text>
          </CollapsibleSection>
        )}

        {/* Related Pathologies */}
        {relatedPathologies.length > 0 && (
          <CollapsibleSection
            title="Patologías Relacionadas"
            icon="hospital-box-outline"
            accentColor={colors.emergency}
            badge={`${relatedPathologies.length}`}
          >
            {relatedPathologies.map(p => (
              <TouchableOpacity
                key={p.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: rs.space(6),
                }}
                onPress={() =>
                  navigation.navigate('PathologyDetail', { pathologyId: p.id })
                }
              >
                <Text
                  style={{
                    fontSize: rs.font(14),
                    color: colors.primary,
                    fontWeight: '600',
                    flex: 1,
                  }}
                >
                  {p.nombre}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color={colors.textLight}
                />
              </TouchableOpacity>
            ))}
          </CollapsibleSection>
        )}

        {/* Embarazo Nota */}
        {drug.embarazoNota && (
          <View
            style={{
              marginHorizontal: rs.space(16),
              marginTop: rs.space(6),
              backgroundColor: colors.warning + '10',
              borderRadius: 8,
              padding: rs.space(10),
              borderWidth: 1,
              borderColor: colors.warning + '25',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={14}
                color={colors.textSecondary}
                style={{ marginRight: 4, marginTop: 1 }}
              />
              <Text
                style={{
                  fontSize: rs.font(12),
                  color: colors.textSecondary,
                  lineHeight: rs.font(17),
                  flex: 1,
                }}
              >
                {drug.embarazoNota}
              </Text>
            </View>
          </View>
        )}

        {/* Personal Notes */}
        <View style={styles.notesSection}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: rs.space(8),
            }}
          >
            <MaterialCommunityIcons
              name="note-text-outline"
              size={18}
              color={colors.text}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.notesSectionTitle, { marginBottom: 0 }]}>
              Mis Notas
            </Text>
          </View>
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

        {/* Provenance footer — source + review status. Honest disclosure that the
            content is reference material, not a substitute for clinical judgment. */}
        <View style={styles.provenanceCard}>
          <MaterialCommunityIcons
            name="information-outline"
            size={14}
            color={colors.textSecondary}
            style={{ marginRight: 6, marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.provenanceText}>
              Fuente: {drugsMeta.sourceCanonical} · Edición:{' '}
              {formatMonthYear(drugsMeta.lastEdited)}
            </Text>
            <Text
              style={[
                styles.provenanceText,
                {
                  color:
                    drugsReviewStatus === 'reviewed'
                      ? colors.success
                      : colors.warning,
                  marginTop: 2,
                },
              ]}
            >
              {drugsReviewStatus === 'reviewed'
                ? `✓ Revisado clínicamente: ${drugsMeta.lastClinicalReview} · ${drugsMeta.reviewedBy}`
                : 'Revisión clínica pendiente — verificar siempre con fuentes primarias'}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
      <PregnancyModal
        visible={showPregModal}
        onClose={() => setShowPregModal(false)}
        current={drug.embarazo}
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neuBackground },
    headerImageBg: {
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      overflow: 'hidden',
    },
    header: {
      paddingTop: rs.space(16),
      paddingBottom: rs.space(20),
      paddingHorizontal: rs.space(20),
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerTopRow: { flexDirection: 'row', alignItems: 'center' },
    unitName: {
      fontSize: rs.font(12),
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    favButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 20,
      width: rs.space(36),
      height: rs.space(36),
      alignItems: 'center',
      justifyContent: 'center',
    },
    favButtonIcon: { fontSize: rs.font(18) },
    drugName: {
      fontSize: rs.font(26),
      fontWeight: '800',
      color: '#FFFFFF',
      marginTop: 4,
    },
    genericName: {
      fontSize: rs.font(15),
      color: 'rgba(255,255,255,0.8)',
      fontStyle: 'italic',
      marginTop: 2,
    },
    headerBadges: {
      flexDirection: 'row',
      marginTop: rs.space(10),
      gap: rs.space(8),
    },
    pregBadge: {
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(4),
      borderRadius: 12,
    },
    pregText: { color: '#FFFFFF', fontSize: rs.font(12), fontWeight: '700' },
    familyBadge: {
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(4),
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    familyText: { color: '#FFFFFF', fontSize: rs.font(12), fontWeight: '600' },
    grupoRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: rs.space(6),
      marginTop: rs.space(8),
    },
    grupoBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: 8,
      paddingHorizontal: rs.space(8),
      paddingVertical: rs.space(3),
    },
    grupoLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: rs.font(10),
      fontWeight: '800',
      marginRight: rs.space(5),
    },
    grupoText: { color: '#FFFFFF', fontSize: rs.font(11), fontWeight: '500' },
    scroll: { flex: 1, marginTop: -12 },
    sectionIndexRow: { marginTop: rs.space(14) },
    sectionIndexContent: {
      paddingHorizontal: rs.space(16),
      gap: rs.space(6),
      alignItems: 'center',
    },
    sectionIndexChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(6),
      borderRadius: 14,
      borderWidth: 1,
    },
    sectionIndexIcon: { marginRight: rs.space(4) },
    sectionIndexLabel: { fontSize: rs.font(12), fontWeight: '700' },
    doseCard: {
      ...neuCard(colors),
      marginHorizontal: rs.space(16),
      marginTop: rs.space(16),
      padding: rs.space(16),
      borderColor: colors.primaryLight + '30',
    },
    doseSectionTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.primary,
      marginBottom: rs.space(10),
    },
    routesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: rs.space(6),
      marginBottom: rs.space(12),
    },
    routeChip: {
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(4),
      borderRadius: 12,
      borderWidth: 1,
    },
    routeChipText: { fontSize: rs.font(13), fontWeight: '600' },
    doseBox: {
      backgroundColor: colors.background,
      padding: rs.space(10),
      borderRadius: 8,
      marginBottom: rs.space(6),
    },
    pediatricBox: {
      backgroundColor: colors.pediatric + '10',
      borderWidth: 1,
      borderColor: colors.pediatric + '30',
    },
    doseLabelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    doseLabel: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    doseValue: {
      fontSize: rs.font(14),
      color: colors.text,
      lineHeight: rs.font(21),
    },
    parenteralCard: {
      backgroundColor: colors.primary + '08',
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      padding: rs.space(16),
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.primary + '25',
    },
    parenteralSectionTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 4,
    },
    hazardBadge: {
      backgroundColor: '#DC262615',
      borderRadius: 10,
      padding: rs.space(10),
      marginBottom: rs.space(10),
      borderWidth: 1,
      borderColor: '#DC262640',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hazardText: {
      fontSize: rs.font(14),
      fontWeight: '800',
      color: '#DC2626',
      letterSpacing: 0.5,
    },
    parenteralRow: {
      backgroundColor: colors.background,
      padding: rs.space(10),
      borderRadius: 8,
      marginBottom: rs.space(6),
    },
    parenteralLabel: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    parenteralValue: {
      fontSize: rs.font(14),
      color: colors.text,
      lineHeight: rs.font(21),
    },
    compatRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: rs.space(6),
      paddingHorizontal: rs.space(4),
    },
    compatIcon: {
      fontSize: rs.font(18),
      marginRight: rs.space(10),
      marginTop: 1,
    },
    compatInfo: { flex: 1 },
    compatName: {
      fontSize: rs.font(14),
      fontWeight: '600',
      color: colors.text,
    },
    compatNote: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      marginTop: 2,
      lineHeight: rs.font(18),
    },
    proteccionRow: {
      flexDirection: 'row',
      marginBottom: 4,
      paddingRight: rs.space(8),
    },
    proteccionBullet: {
      fontSize: rs.font(14),
      color: '#DC2626',
      marginRight: rs.space(8),
      marginTop: 1,
    },
    proteccionText: {
      fontSize: rs.font(14),
      color: colors.text,
      flex: 1,
      lineHeight: rs.font(21),
    },
    nursingCard: {
      backgroundColor: colors.nursing + '08',
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      padding: rs.space(16),
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.nursing + '25',
    },
    nursingSectionTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.nursing,
      marginBottom: rs.space(10),
    },
    riskCard: {
      backgroundColor: colors.error + '08',
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      padding: rs.space(16),
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.error + '30',
    },
    riskSectionTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.error,
      marginBottom: rs.space(8),
    },
    riskDescription: {
      fontSize: rs.font(14),
      color: colors.text,
      lineHeight: rs.font(20),
      marginBottom: rs.space(10),
    },
    riskEffects: { marginBottom: rs.space(10) },
    riskSubtitle: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.error,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: rs.space(6),
    },
    riskManejo: {
      backgroundColor: colors.warning + '12',
      borderRadius: 8,
      padding: rs.space(10),
      borderLeftWidth: 3,
      borderLeftColor: colors.warning,
      marginBottom: rs.space(8),
    },
    riskManejoLabel: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.warning,
      marginBottom: 4,
    },
    riskManejoText: {
      fontSize: rs.font(13),
      color: colors.text,
      lineHeight: rs.font(19),
    },
    riskAlerta: {
      backgroundColor: colors.error + '15',
      borderRadius: 8,
      padding: rs.space(10),
    },
    riskAlertaText: {
      fontSize: rs.font(13),
      fontWeight: '700',
      color: colors.error,
      lineHeight: rs.font(19),
    },
    replacementHeaderBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 10,
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(6),
      marginTop: rs.space(10),
      alignSelf: 'flex-start',
    },
    replacementHeaderText: {
      color: '#FFFFFF',
      fontSize: rs.font(12),
      fontWeight: '700',
    },
    replacementBanner: {
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      backgroundColor: '#0891B2' + '10',
      borderRadius: 12,
      padding: rs.space(12),
      borderLeftWidth: 3,
      borderLeftColor: '#0891B2',
    },
    replacementBannerText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(20),
    },
    bodyText: {
      fontSize: rs.font(14),
      color: colors.text,
      lineHeight: rs.font(21),
    },
    bulletRow: {
      flexDirection: 'row',
      marginBottom: 4,
      paddingRight: rs.space(8),
    },
    bullet: {
      fontSize: rs.font(14),
      color: colors.text,
      marginRight: rs.space(8),
      marginTop: 1,
    },
    bulletText: {
      fontSize: rs.font(14),
      color: colors.text,
      flex: 1,
      lineHeight: rs.font(21),
    },
    infoRow: {
      flexDirection: 'row',
      paddingVertical: rs.space(4),
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    infoLabel: {
      fontSize: rs.font(13),
      fontWeight: '600',
      color: colors.textSecondary,
      flex: 0.35,
      maxWidth: rs.space(120),
    },
    infoValue: { fontSize: rs.font(13), color: colors.text, flex: 1 },
    classificationBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(3),
      borderRadius: 10,
      marginTop: rs.space(6),
    },
    classificationText: {
      color: '#FFFFFF',
      fontSize: rs.font(11),
      fontWeight: '600',
    },
    notesSection: {
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      backgroundColor: colors.noteBackground,
      borderRadius: 14,
      padding: rs.space(14),
      borderWidth: 1,
      borderColor: colors.noteBorder,
    },
    notesSectionTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(8),
    },
    notesInput: {
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: rs.space(12),
      fontSize: rs.font(14),
      color: colors.text,
      minHeight: rs.space(80),
      borderWidth: 1,
      borderColor: colors.border,
    },
    notesSaved: {
      fontSize: rs.font(11),
      color: colors.textLight,
      marginTop: 4,
      textAlign: 'right',
      fontStyle: 'italic',
    },
    quickActionRow: {
      flexDirection: 'row',
      gap: rs.space(8),
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
    },
    quickActionBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: rs.space(10),
      borderRadius: 12,
      borderWidth: 1,
    },
    quickActionIcon: { fontSize: rs.font(16), marginRight: rs.space(6) },
    quickActionLabel: { fontSize: rs.font(13), fontWeight: '600' },
    incompleteBadge: {
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      backgroundColor: colors.info + '10',
      borderRadius: 10,
      padding: rs.space(10),
      borderWidth: 1,
      borderColor: colors.info + '25',
    },
    incompleteBadgeText: {
      fontSize: rs.font(12),
      color: colors.info,
      lineHeight: rs.font(17),
    },
    bottomSpacer: { height: rs.space(40) },
    provenanceCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginHorizontal: rs.space(16),
      marginTop: rs.space(20),
      padding: rs.space(10),
      borderRadius: 8,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    provenanceText: {
      fontSize: rs.font(11),
      color: colors.textSecondary,
      lineHeight: rs.font(15),
    },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { fontSize: rs.font(16), color: colors.error },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: rs.space(20),
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: rs.space(20),
      width: '100%',
      maxHeight: '85%',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    modalTitle: {
      fontSize: rs.font(18),
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
    },
    modalSubtitle: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: rs.space(16),
      marginTop: 2,
    },
    pregModalRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: rs.space(10),
      paddingHorizontal: rs.space(10),
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: rs.space(6),
    },
    pregModalBadge: {
      width: rs.space(32),
      height: rs.space(32),
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rs.space(12),
      marginTop: 2,
    },
    pregModalBadgeText: {
      color: '#FFFFFF',
      fontSize: rs.font(16),
      fontWeight: '800',
    },
    pregModalRisk: {
      fontSize: rs.font(13),
      fontWeight: '700',
      marginBottom: 2,
    },
    pregModalDesc: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      lineHeight: rs.font(17),
    },
    modalCloseBtn: {
      marginTop: rs.space(16),
      paddingVertical: rs.space(12),
      borderRadius: 12,
      alignItems: 'center',
    },
    modalCloseBtnText: {
      color: '#FFFFFF',
      fontSize: rs.font(15),
      fontWeight: '700',
    },
  });
