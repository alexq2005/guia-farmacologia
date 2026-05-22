import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Drug } from '../types';
import { UNIT_COLORS, PREGNANCY_COLORS, ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { useNeuPressAnimation } from '../utils/animations';
import { neuCard } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

interface Props {
  drug: Drug;
  onPress: () => void;
  onLongPress?: () => void;
  showUnit?: boolean;
  highlight?: string;
  /**
   * Nombre comercial que matcheó la query del usuario. Cuando viene definido
   * y es distinto del `nombre` canónico, se muestra como subtítulo destacado
   * ("Conocido como: <alias>") para que el usuario reconozca el resultado.
   * Sólo lo setea la búsqueda; en otros contextos (favoritos, listas por
   * categoría) queda undefined y el card se renderiza igual que antes.
   */
  matchedCommercial?: string;
}

export function DrugCard({
  drug,
  onPress,
  onLongPress,
  showUnit = false,
  highlight,
  matchedCommercial,
}: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const unitColor = UNIT_COLORS[drug.unidadId] || colors.primary;
  const pregColor = PREGNANCY_COLORS[drug.embarazo] || colors.textLight;
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(drug.id);
  const { scale, onPressIn, onPressOut } = useNeuPressAnimation();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      activeOpacity={0.7}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={`${drug.nombre}, ${drug.familia}`}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={[styles.colorBar, { backgroundColor: unitColor }]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {drug.nombre}
            </Text>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                toggleFavorite(drug.id);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.favBtn}
              accessibilityRole="button"
              accessibilityLabel={
                fav
                  ? `Quitar ${drug.nombre} de favoritos`
                  : `Agregar ${drug.nombre} a favoritos`
              }
              accessibilityState={{ selected: fav }}
            >
              <MaterialCommunityIcons
                name={fav ? 'heart' : 'heart-outline'}
                size={18}
                color={fav ? '#E91E63' : colors.textLight}
              />
            </TouchableOpacity>
            <View
              style={[styles.pregnancyBadge, { backgroundColor: pregColor }]}
            >
              <Text style={styles.pregnancyText}>{drug.embarazo}</Text>
            </View>
          </View>

          {matchedCommercial &&
          matchedCommercial.toLowerCase() !== drug.nombre.toLowerCase() ? (
            <View style={styles.matchedAliasRow}>
              <MaterialCommunityIcons
                name="magnify"
                size={11}
                color={colors.primary}
                style={{ marginRight: 3 }}
              />
              <Text style={styles.matchedAliasText} numberOfLines={1}>
                Conocido como:{' '}
                <Text style={styles.matchedAliasName}>{matchedCommercial}</Text>
              </Text>
            </View>
          ) : null}

          <Text style={styles.generic} numberOfLines={1}>
            {drug.nombreGenerico}
          </Text>
          <Text style={styles.family} numberOfLines={1}>
            {drug.familia}
          </Text>

          <View style={styles.routesRow}>
            {drug.viaAdministracion.slice(0, 4).map(via => (
              <View
                key={via}
                style={[
                  styles.routeBadge,
                  {
                    backgroundColor:
                      (ROUTE_COLORS[via] || colors.textLight) + '15',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.routeText,
                    { color: ROUTE_COLORS[via] || colors.textSecondary },
                  ]}
                >
                  {via}
                </Text>
              </View>
            ))}
            {drug.viaAdministracion.length > 4 && (
              <Text style={styles.moreRoutes}>
                +{drug.viaAdministracion.length - 4}
              </Text>
            )}
          </View>

          {drug.dosis.adulto ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
              }}
            >
              <MaterialCommunityIcons
                name="pill"
                size={14}
                color={colors.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.dose} numberOfLines={1}>
                {drug.dosis.adulto}
              </Text>
            </View>
          ) : null}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      ...neuCard(colors),
      marginHorizontal: rs.space(16),
      marginVertical: rs.space(6),
    },
    colorBar: {
      width: 5,
      borderTopLeftRadius: 18,
      borderBottomLeftRadius: 18,
    },
    content: {
      flex: 1,
      padding: rs.space(14),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      flex: 1,
    },
    pregnancyBadge: {
      paddingHorizontal: rs.space(8),
      paddingVertical: 2,
      borderRadius: 10,
      marginLeft: rs.space(8),
    },
    pregnancyText: {
      color: '#FFFFFF',
      fontSize: rs.font(11),
      fontWeight: '700',
    },
    matchedAliasRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3,
    },
    matchedAliasText: {
      fontSize: rs.font(11),
      color: colors.textSecondary,
      flex: 1,
    },
    matchedAliasName: {
      color: colors.primary,
      fontWeight: '600',
    },
    generic: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      marginTop: 2,
    },
    family: {
      fontSize: rs.font(12),
      color: colors.textLight,
      marginTop: 1,
    },
    routesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: rs.space(6),
      gap: 4,
    },
    routeBadge: {
      paddingHorizontal: rs.space(8),
      paddingVertical: 3,
      borderRadius: 20,
    },
    routeText: {
      fontSize: rs.font(11),
      fontWeight: '600',
    },
    moreRoutes: {
      fontSize: rs.font(11),
      color: colors.textLight,
      alignSelf: 'center',
      marginLeft: 4,
    },
    dose: {
      fontSize: rs.font(12),
      color: colors.text,
      fontStyle: 'italic',
      flex: 1,
    },
    favBtn: {
      marginLeft: rs.space(6),
      marginRight: 4,
    },
    favIcon: {
      fontSize: rs.font(16),
    },
  });
