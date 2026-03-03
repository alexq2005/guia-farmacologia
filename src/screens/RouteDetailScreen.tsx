import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, RouteInfo } from '../types';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import routes from '../data/routes.json';

type Props = NativeStackScreenProps<RootStackParamList, 'RouteDetail'>;

function RouteIllustration({ route }: { route: RouteInfo }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const color = ROUTE_COLORS[route.id] || colors.primary;

  const diagrams: Record<string, string> = {
    IV: `
    ┌─────────────────────┐
    │    PIEL              │
    │  ═══════════════     │
    │    TEJIDO SC         │
    │  ═══════════════     │
    │    MÚSCULO           │
    │  ═══════════════     │
    │  ──→ VENA ◉ ←──     │  ← Aguja 90°
    │  ═══════════════     │
    │  Biodisponibilidad:  │
    │       100%           │
    └─────────────────────┘`,
    IM: `
    ┌─────────────────────┐
    │    PIEL              │
    │  ═══════════════     │
    │    TEJIDO SC         │
    │  ═══════════════     │
    │    ↓ MÚSCULO ◉ ←──  │  ← Aguja 90°
    │  ═══════════════     │
    │                      │
    │  Volumen máx:        │
    │  Glúteo: 5 mL       │
    │  Deltoides: 2 mL    │
    └─────────────────────┘`,
    SC: `
    ┌─────────────────────┐
    │    PIEL              │
    │  ═══════════════     │
    │  ↓ TEJIDO SC ◉ ←──  │  ← Aguja 45°
    │  ═══════════════     │
    │    MÚSCULO           │
    │  ═══════════════     │
    │                      │
    │  Pellizcar pliegue   │
    │  Volumen máx: 1-2 mL│
    └─────────────────────┘`,
    intradermica: `
    ┌─────────────────────┐
    │  ↓ EPIDERMIS ◉ ←──  │  ← Aguja 5-15°
    │  ═══════════════     │     Bisel arriba
    │    DERMIS            │
    │  ═══════════════     │
    │    TEJIDO SC         │
    │  ═══════════════     │
    │                      │
    │  Formar HABÓN        │
    │  Vol: 0.1-0.5 mL    │
    └─────────────────────┘`,
    oral: `
    ┌─────────────────────┐
    │   💊 → BOCA         │
    │        ↓             │
    │     ESÓFAGO          │
    │        ↓             │
    │     ESTÓMAGO         │
    │        ↓             │
    │  INTESTINO DELGADO   │
    │    (Absorción)       │
    │        ↓             │
    │  HÍGADO → SANGRE    │
    │  (Primer paso)       │
    └─────────────────────┘`,
    sublingual: `
    ┌─────────────────────┐
    │                      │
    │    LENGUA            │
    │  ═══════════════     │
    │  💊 SUBLINGUAL ◉    │
    │     (Absorción)      │
    │        ↓             │
    │  PLEXO VENOSO        │
    │        ↓             │
    │  CIRCULACIÓN         │
    │  (Evita 1er paso)    │
    └─────────────────────┘`,
    inhalatoria: `
    ┌─────────────────────┐
    │   NARIZ/BOCA         │
    │        ↓             │
    │    LARINGE           │
    │        ↓             │
    │    TRÁQUEA           │
    │       / \\            │
    │  BRONQUIOS           │
    │     /   \\            │
    │ BRONQUIOLOS          │
    │    /     \\           │
    │  ALVÉOLOS ◉          │
    │  (Absorción)         │
    └─────────────────────┘`,
    transdermica: `
    ┌─────────────────────┐
    │  ▓▓▓ PARCHE ▓▓▓     │
    │  ═══════════════     │
    │  EPIDERMIS           │
    │  ─ ─ ─ ─ ─ ─ ─      │
    │  DERMIS              │
    │     ↓ ↓ ↓            │
    │  CAPILARES           │
    │     ↓ ↓ ↓            │
    │  CIRCULACIÓN         │
    │  (Liberación lenta)  │
    └─────────────────────┘`,
  };

  return (
    <View style={[styles.illustrationBox, { borderColor: color + '40' }]}>
      <Text style={styles.illustrationTitle}>📐 Diagrama</Text>
      <Text style={[styles.illustrationText, { color }]}>
        {diagrams[route.id] || `Vía: ${route.nombre}\n\nConsultar imagen de referencia`}
      </Text>
      {route.angulo && (
        <View style={[styles.angleBadge, { backgroundColor: color + '15' }]}>
          <Text style={[styles.angleText, { color }]}>Ángulo: {route.angulo}</Text>
        </View>
      )}
    </View>
  );
}

export function RouteDetailScreen({ route: navRoute }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const routeInfo = (routes as RouteInfo[]).find(r => r.id === navRoute.params.routeId);

  if (!routeInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Vía no encontrada</Text>
      </View>
    );
  }

  const color = ROUTE_COLORS[routeInfo.id] || colors.primary;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color} barStyle="light-content" />

      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerTitle}>{routeInfo.nombre}</Text>
        <Text style={styles.headerDesc}>{routeInfo.descripcion}</Text>
        {routeInfo.velocidad && (
          <View style={styles.speedBadge}>
            <Text style={styles.speedText}>⏱ {routeInfo.velocidad}</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <RouteIllustration route={routeInfo} />

        {routeInfo.zonas && routeInfo.zonas.length > 0 && (
          <CollapsibleSection title="Zonas de aplicación" icon="📍" accentColor={color} initiallyOpen>
            {routeInfo.zonas.map((zona, i) => (
              <View key={i} style={styles.zoneRow}>
                <View style={[styles.zoneDot, { backgroundColor: color }]} />
                <Text style={styles.zoneText}>{zona}</Text>
              </View>
            ))}
          </CollapsibleSection>
        )}

        <CollapsibleSection title="Técnica de administración" icon="📋" accentColor={color} initiallyOpen>
          {routeInfo.tecnica.map((paso, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNumber, { backgroundColor: color }]}>
                <Text style={styles.stepNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{paso}</Text>
            </View>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Precauciones" icon="⚠️" accentColor={colors.warning} initiallyOpen>
          {routeInfo.precauciones.map((prec, i) => (
            <View key={i} style={styles.precautionRow}>
              <Text style={styles.precautionBullet}>⚠️</Text>
              <Text style={styles.precautionText}>{prec}</Text>
            </View>
          ))}
        </CollapsibleSection>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  headerDesc: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6, lineHeight: 20 },
  speedBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  speedText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  scroll: { flex: 1 },
  illustrationBox: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 2,
  },
  illustrationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 8,
  },
  illustrationText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  angleBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  angleText: { fontSize: 12, fontWeight: '700' },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  zoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  zoneText: { fontSize: 14, color: colors.text, flex: 1 },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepNumberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  stepText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  precautionRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  precautionBullet: { fontSize: 14, marginRight: 8 },
  precautionText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  errorText: { fontSize: 16, color: colors.error, textAlign: 'center', marginTop: 40 },
});