import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import type { Drug } from '../types';
import { UNIT_COLORS, PREGNANCY_COLORS, ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { useCardPressAnimation } from '../utils/animations';

interface Props {
  drug: Drug;
  onPress: () => void;
  showUnit?: boolean;
  highlight?: string;
}

export function DrugCard({ drug, onPress, showUnit = false, highlight }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const unitColor = UNIT_COLORS[drug.unidadId] || colors.primary;
  const pregColor = PREGNANCY_COLORS[drug.embarazo] || colors.textLight;
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(drug.id);
  const { scale, onPressIn, onPressOut } = useCardPressAnimation();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} onPressIn={onPressIn} onPressOut={onPressOut} accessibilityRole="button" accessibilityLabel={`${drug.nombre}, ${drug.familia}`}>
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <View style={[styles.colorBar, { backgroundColor: unitColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{drug.nombre}</Text>
          <TouchableOpacity
            onPress={(e) => { e.stopPropagation(); toggleFavorite(drug.id); }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.favBtn}
            accessibilityRole="button"
            accessibilityLabel={fav ? `Quitar ${drug.nombre} de favoritos` : `Agregar ${drug.nombre} a favoritos`}
            accessibilityState={{ selected: fav }}
          >
            <Text style={styles.favIcon}>{fav ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</Text>
          </TouchableOpacity>
          <View style={[styles.pregnancyBadge, { backgroundColor: pregColor }]}>
            <Text style={styles.pregnancyText}>{drug.embarazo}</Text>
          </View>
        </View>

        <Text style={styles.generic} numberOfLines={1}>{drug.nombreGenerico}</Text>
        <Text style={styles.family} numberOfLines={1}>{drug.familia}</Text>

        <View style={styles.routesRow}>
          {drug.viaAdministracion.slice(0, 4).map(via => (
            <View
              key={via}
              style={[styles.routeBadge, { backgroundColor: (ROUTE_COLORS[via] || colors.textLight) + '20' }]}
            >
              <Text style={[styles.routeText, { color: ROUTE_COLORS[via] || colors.textSecondary }]}>
                {via}
              </Text>
            </View>
          ))}
          {drug.viaAdministracion.length > 4 && (
            <Text style={styles.moreRoutes}>+{drug.viaAdministracion.length - 4}</Text>
          )}
        </View>

        {drug.dosis.adulto ? (
          <Text style={styles.dose} numberOfLines={1}>
            💊 {drug.dosis.adulto}
          </Text>
        ) : null}
      </View>
    </Animated.View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  colorBar: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  pregnancyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  pregnancyText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  generic: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  family: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 1,
  },
  routesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 4,
  },
  routeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  routeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  moreRoutes: {
    fontSize: 11,
    color: colors.textLight,
    alignSelf: 'center',
    marginLeft: 4,
  },
  dose: {
    fontSize: 12,
    color: colors.text,
    marginTop: 6,
    fontStyle: 'italic',
  },
  favBtn: {
    marginLeft: 6,
    marginRight: 4,
  },
  favIcon: {
    fontSize: 16,
  },
});