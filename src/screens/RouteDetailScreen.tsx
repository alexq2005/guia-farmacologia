import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Animated, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, RouteInfo } from '../types';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { RouteIllustrationSVG } from '../components/RouteIllustrationSVG';
import { ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useFadeIn } from '../utils/animations';
import routes from '../data/routes.json';
import { neuCard } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { getRouteImage } from '../utils/routeImages';

type Props = NativeStackScreenProps<RootStackParamList, 'RouteDetail'>;

export function RouteDetailScreen({ route: navRoute }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn();
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
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={color} barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerTitle}>{routeInfo.nombre}</Text>
        <Text style={styles.headerDesc}>{routeInfo.descripcion}</Text>
        {routeInfo.velocidad && (
          <View style={styles.speedBadge}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="timer-outline" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.speedText}>{routeInfo.velocidad}</Text>
            </View>
          </View>
        )}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Clinical photo */}
        <View style={[neuCard(colors), { margin: rs.space(16), marginBottom: rs.space(8), overflow: 'hidden' }]}>
          <Image
            source={getRouteImage(routeInfo.id)}
            style={{ width: '100%', height: rs.space(160), borderRadius: 18 }}
            resizeMode="cover"
          />
        </View>

        {/* Anatomical diagram */}
        <RouteIllustrationSVG routeId={routeInfo.id} accentColor={color} colors={colors} />

        {routeInfo.zonas && routeInfo.zonas.length > 0 && (
          <CollapsibleSection title="Zonas de aplicación" icon="map-marker-outline" accentColor={color} initiallyOpen>
            {routeInfo.zonas.map((zona, i) => (
              <View key={i} style={styles.zoneRow}>
                <View style={[styles.zoneDot, { backgroundColor: color }]} />
                <Text style={styles.zoneText}>{zona}</Text>
              </View>
            ))}
          </CollapsibleSection>
        )}

        <CollapsibleSection title="Técnica de administración" icon="clipboard-list-outline" accentColor={color} initiallyOpen>
          {routeInfo.tecnica.map((paso, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNumber, { backgroundColor: color }]}>
                <Text style={styles.stepNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{paso}</Text>
            </View>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Precauciones" icon="alert-outline" accentColor={colors.warning} initiallyOpen>
          {routeInfo.precauciones.map((prec, i) => (
            <View key={i} style={styles.precautionRow}>
              <MaterialCommunityIcons name="alert-outline" size={14} color={colors.warning} style={{ marginRight: 8 }} />
              <Text style={styles.precautionText}>{prec}</Text>
            </View>
          ))}
        </CollapsibleSection>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    paddingTop: rs.space(16),
    paddingBottom: rs.space(20),
    paddingHorizontal: rs.space(20),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: rs.font(22), fontWeight: '800', color: '#FFFFFF' },
  headerDesc: { fontSize: rs.font(13), color: 'rgba(255,255,255,0.8)', marginTop: rs.space(6), lineHeight: rs.font(20) },
  speedBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: rs.space(12),
    paddingVertical: rs.space(6),
    borderRadius: 10,
    marginTop: rs.space(10),
    alignSelf: 'flex-start',
  },
  speedText: { color: '#FFFFFF', fontSize: rs.font(12), fontWeight: '600' },
  scroll: { flex: 1 },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs.space(6),
  },
  zoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: rs.space(10),
  },
  zoneText: { fontSize: rs.font(14), color: colors.text, flex: 1 },
  stepRow: {
    flexDirection: 'row',
    marginBottom: rs.space(10),
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs.space(10),
    marginTop: 1,
  },
  stepNumberText: { color: '#FFFFFF', fontSize: rs.font(12), fontWeight: '700' },
  stepText: { fontSize: rs.font(14), color: colors.text, flex: 1, lineHeight: rs.font(20) },
  precautionRow: {
    flexDirection: 'row',
    marginBottom: rs.space(8),
    alignItems: 'flex-start',
  },
  precautionBullet: { fontSize: rs.font(14), marginRight: rs.space(8) },
  precautionText: { fontSize: rs.font(14), color: colors.text, flex: 1, lineHeight: rs.font(20) },
  errorText: { fontSize: rs.font(16), color: colors.error, textAlign: 'center', marginTop: rs.space(40) },
});