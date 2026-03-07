import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import type { ThemeColors } from '../utils/colors';
import { neuCard, neuElevated } from '../utils/neumorphism';

const PREMIUM_FEATURES = [
  { iconName: 'brain', text: 'Test farmacológico interactivo' },
  { iconName: 'scale-balance', text: 'Comparador de fármacos (hasta 3)' },
  { iconName: 'alert-outline', text: 'Verificador de interacciones' },
  { iconName: 'calculator-variant-outline', text: '15 calculadoras clínicas' },
  { iconName: 'chart-bar', text: '13 escalas clínicas interactivas' },
  { iconName: 'microscope', text: '53 valores de laboratorio' },
  { iconName: 'alert-octagon', text: '14 protocolos de emergencia' },
  { iconName: 'needle', text: 'Guía parenteral completa' },
  { iconName: 'chart-line', text: 'Dashboard de progreso' },
  { iconName: 'heart', text: 'Favoritos y notas ilimitados' },
  { iconName: 'content-save-outline', text: 'Exportación/importación de datos' },
];

const FREE_FEATURES = [
  { iconName: 'pill', text: '1781 fármacos con información completa' },
  { iconName: 'bookshelf', text: 'Navegación por categorías y sistemas' },
  { iconName: 'magnify', text: 'Búsqueda inteligente sin acentos' },
  { iconName: 'moon-waning-crescent', text: 'Modo oscuro' },
  { iconName: 'export-variant', text: 'Compartir información de fármacos' },
];

type PlanType = 'monthly' | 'annual';

export function PremiumScreen() {
  const { colors } = useTheme();
  const { isPremium, isTrialActive, trialDaysLeft, isSubscribed, isCodeActivated, restoreSubscription } = usePremium();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanType>('annual');

  const handleSubscribe = () => {
    Alert.alert(
      'Próximamente',
      `La suscripción ${selectedPlan === 'annual' ? 'anual ($19.99/año)' : 'mensual ($2.99/mes)'} mediante Google Play estará disponible muy pronto. ¡Gracias por tu interés!`,
      [{ text: 'Entendido' }],
    );
  };

  const handleRestore = () => {
    restoreSubscription();
    Alert.alert(
      'Restaurar compra',
      'Si realizaste una compra previamente, se restaurará automáticamente al vincular con Google Play.',
      [{ text: 'OK' }],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="star" size={48} color="#FFD700" />
          <Text style={styles.headerTitle}>Premium</Text>
          <Text style={styles.headerSubtitle}>
            Desbloquea todo el potencial de tu guía farmacológica
          </Text>
        </View>

        {/* Trial Status */}
        <View style={styles.statusCard}>
          {isSubscribed || isCodeActivated ? (
            <>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '15', borderColor: colors.success + '30' }]}>
                <Text style={[styles.statusBadgeText, { color: colors.success }]}>
                  {isCodeActivated ? 'Activado con Código' : 'Suscripción Activa'}
                </Text>
              </View>
              <Text style={styles.statusDescription}>
                Tienes acceso completo a todas las funciones Premium.
              </Text>
            </>
          ) : isTrialActive ? (
            <>
              <View style={[styles.statusBadge, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
                <Text style={[styles.statusBadgeText, { color: colors.primary }]}>Prueba Gratuita Activa</Text>
              </View>
              <Text style={styles.trialDays}>{trialDaysLeft}</Text>
              <Text style={styles.trialDaysLabel}>días restantes</Text>
              <View style={styles.trialBar}>
                <View style={[styles.trialBarFill, { width: `${(trialDaysLeft / 14) * 100}%`, backgroundColor: trialDaysLeft > 3 ? colors.primary : colors.warning }]} />
              </View>
              <Text style={styles.statusDescription}>
                Disfruta de todas las funciones Premium durante tu período de prueba.
              </Text>
            </>
          ) : (
            <>
              <View style={[styles.statusBadge, { backgroundColor: colors.error + '15', borderColor: colors.error + '30' }]}>
                <Text style={[styles.statusBadgeText, { color: colors.error }]}>Prueba Finalizada</Text>
              </View>
              <Text style={styles.statusDescription}>
                Tu período de prueba de 14 días ha finalizado. Suscríbete para seguir usando las funciones Premium.
              </Text>
            </>
          )}
        </View>

        {/* Premium Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funciones Premium</Text>
          {PREMIUM_FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialCommunityIcons name={f.iconName} size={18} color={colors.primary} style={{ marginRight: 12, width: 24, textAlign: 'center' }} />
              <Text style={styles.featureText}>{f.text}</Text>
              {isPremium && <MaterialCommunityIcons name="check" size={16} color={colors.success} />}
            </View>
          ))}
        </View>

        {/* Free Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Siempre Gratis</Text>
          {FREE_FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialCommunityIcons name={f.iconName} size={18} color={colors.primary} style={{ marginRight: 12, width: 24, textAlign: 'center' }} />
              <Text style={styles.featureText}>{f.text}</Text>
              <MaterialCommunityIcons name="check" size={16} color={colors.success} />
            </View>
          ))}
        </View>

        {/* Plan Selection & Subscribe */}
        {!isSubscribed && !isCodeActivated && (
          <View style={styles.actionSection}>
            {/* Plan Cards */}
            <View style={styles.plansRow}>
              <TouchableOpacity
                style={[
                  styles.planCard,
                  selectedPlan === 'annual' && { borderColor: colors.primary, borderWidth: 2 },
                ]}
                onPress={() => setSelectedPlan('annual')}
                activeOpacity={0.7}
              >
                <View style={[styles.planBestBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.planBestText}>Mejor valor</Text>
                </View>
                <Text style={styles.planPrice}>$19.99</Text>
                <Text style={styles.planPeriod}>/año</Text>
                <View style={[styles.planSaveBadge, { backgroundColor: colors.success + '15' }]}>
                  <Text style={[styles.planSaveText, { color: colors.success }]}>Ahorra 44%</Text>
                </View>
                <Text style={styles.planMonthly}>$1.67/mes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.planCard,
                  selectedPlan === 'monthly' && { borderColor: colors.primary, borderWidth: 2 },
                ]}
                onPress={() => setSelectedPlan('monthly')}
                activeOpacity={0.7}
              >
                <Text style={[styles.planPrice, { marginTop: 24 }]}>$2.99</Text>
                <Text style={styles.planPeriod}>/mes</Text>
                <Text style={[styles.planMonthly, { marginTop: 28 }]}>Sin compromiso</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
              activeOpacity={0.7}
            >
              <Text style={styles.subscribeButtonText}>
                {selectedPlan === 'annual' ? 'Suscribirse — $19.99/año' : 'Suscribirse — $2.99/mes'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.restoreButton}
              onPress={handleRestore}
              activeOpacity={0.7}
            >
              <Text style={styles.restoreButtonText}>Restaurar compra</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neuBackground,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  statusCard: {
    ...neuElevated(colors), marginHorizontal: 16, marginTop: -16, padding: 20, alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  trialDays: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
  },
  trialDaysLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  trialBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  trialBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  statusDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
  section: {
    ...neuCard(colors), marginHorizontal: 16, marginTop: 12, padding: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  featureCheck: {
    fontSize: 16,
    color: colors.success,
    fontWeight: '700',
  },
  actionSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  plansRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  planCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  planBestBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 4,
    alignItems: 'center',
  },
  planBestText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  planPeriod: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  planSaveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
  },
  planSaveText: {
    fontSize: 12,
    fontWeight: '700',
  },
  planMonthly: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 6,
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  subscribeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  restoreButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  restoreButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
