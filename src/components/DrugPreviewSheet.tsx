import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Drug } from '../types';
import { useTheme } from '../context/ThemeContext';
import { UNIT_COLORS, PREGNANCY_COLORS, ROUTE_COLORS } from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

interface Props {
  drug: Drug | null;
  visible: boolean;
  onClose: () => void;
  onOpenFull: (drugId: string) => void;
}

export function DrugPreviewSheet({ drug, visible, onClose, onOpenFull }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  if (!drug) return null;

  const unitColor = UNIT_COLORS[drug.unidadId] || colors.primary;
  const pregColor = PREGNANCY_COLORS[drug.embarazo] || colors.textLight;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.colorDot, { backgroundColor: unitColor }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.drugName}>{drug.nombre}</Text>
              <Text style={styles.genericName}>{drug.nombreGenerico}</Text>
            </View>
            <View style={[styles.pregBadge, { backgroundColor: pregColor }]}>
              <Text style={styles.pregText}>{drug.embarazo}</Text>
            </View>
          </View>

          {/* Family */}
          <Text style={styles.family}>{drug.familia}</Text>

          {/* Routes */}
          <View style={styles.routesRow}>
            {drug.viaAdministracion.slice(0, 5).map(via => (
              <View key={via} style={[styles.routePill, { backgroundColor: (ROUTE_COLORS[via] || colors.textLight) + '15' }]}>
                <Text style={[styles.routeText, { color: ROUTE_COLORS[via] || colors.textSecondary }]}>{via}</Text>
              </View>
            ))}
          </View>

          {/* Quick info */}
          <ScrollView style={styles.infoSection} showsVerticalScrollIndicator={false}>
            {drug.dosis.adulto ? (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="pill" size={16} color={unitColor} style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Dosis adulto</Text>
                  <Text style={styles.infoValue} numberOfLines={2}>{drug.dosis.adulto}</Text>
                </View>
              </View>
            ) : null}

            {drug.indicaciones.length > 0 && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="clipboard-check-outline" size={16} color={unitColor} style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Indicaciones principales</Text>
                  <Text style={styles.infoValue} numberOfLines={3}>{drug.indicaciones.slice(0, 3).join(' • ')}</Text>
                </View>
              </View>
            )}

            {drug.cuidadosEnfermeria.length > 0 && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="heart-pulse" size={16} color={unitColor} style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Cuidados de enfermería</Text>
                  <Text style={styles.infoValue} numberOfLines={2}>{drug.cuidadosEnfermeria[0]}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Action button */}
          <TouchableOpacity
            style={[styles.openButton, { backgroundColor: unitColor }]}
            onPress={() => { onClose(); onOpenFull(drug.id); }}
            activeOpacity={0.8}
          >
            <Text style={styles.openButtonText}>Ver detalle completo</Text>
            <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: rs.space(20),
    paddingBottom: rs.space(32),
    maxHeight: '70%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: rs.space(10),
    marginBottom: rs.space(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: rs.space(10),
  },
  drugName: {
    fontSize: rs.font(20),
    fontWeight: '800',
    color: colors.text,
  },
  genericName: {
    fontSize: rs.font(13),
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 1,
  },
  pregBadge: {
    paddingHorizontal: rs.space(10),
    paddingVertical: rs.space(4),
    borderRadius: 10,
    marginLeft: rs.space(8),
  },
  pregText: {
    color: '#FFFFFF',
    fontSize: rs.font(12),
    fontWeight: '700',
  },
  family: {
    fontSize: rs.font(13),
    color: colors.textLight,
    marginTop: rs.space(4),
    marginLeft: rs.space(22),
  },
  routesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs.space(6),
    marginTop: rs.space(12),
  },
  routePill: {
    paddingHorizontal: rs.space(10),
    paddingVertical: rs.space(4),
    borderRadius: 20,
  },
  routeText: {
    fontSize: rs.font(12),
    fontWeight: '600',
  },
  infoSection: {
    marginTop: rs.space(16),
    maxHeight: rs.space(200),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: rs.space(12),
    marginBottom: rs.space(8),
  },
  infoLabel: {
    fontSize: rs.font(11),
    color: colors.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: rs.font(13),
    color: colors.text,
    marginTop: 2,
    lineHeight: rs.font(18),
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rs.space(16),
    borderRadius: 14,
    marginTop: rs.space(12),
    gap: rs.space(8),
  },
  openButtonText: {
    fontSize: rs.font(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
