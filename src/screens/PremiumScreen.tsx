import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import type { ThemeColors } from '../utils/colors';
import { neuCard, neuElevated } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import {
  PRODUCT_IDS,
  formatPeriod,
  type SubscriptionProduct,
} from '../utils/billing';

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
  {
    iconName: 'content-save-outline',
    text: 'Exportación/importación de datos',
  },
];

const FREE_FEATURES = [
  { iconName: 'pill', text: '2,974 fármacos con información completa' },
  { iconName: 'bookshelf', text: 'Navegación por categorías y sistemas' },
  { iconName: 'magnify', text: 'Búsqueda inteligente sin acentos' },
  { iconName: 'moon-waning-crescent', text: 'Modo oscuro' },
  { iconName: 'export-variant', text: 'Compartir información de fármacos' },
];

// Fallback prices when Google Play products haven't loaded yet
const FALLBACK_PRICES: Record<
  string,
  { price: string; period: string; monthlyEquiv: string }
> = {
  [PRODUCT_IDS.MONTHLY]: {
    price: '$2.99',
    period: 'mes',
    monthlyEquiv: '$2.99/mes',
  },
  [PRODUCT_IDS.ANNUAL]: {
    price: '$19.99',
    period: 'año',
    monthlyEquiv: '$1.67/mes',
  },
};

export function PremiumScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const {
    isPremium,
    isTrialActive,
    trialDaysLeft,
    isSubscribed,
    isCodeActivated,
    products,
    isBillingLoading,
    purchase,
    restore,
  } = usePremium();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const [selectedPlan, setSelectedPlan] = React.useState<string>(
    PRODUCT_IDS.ANNUAL,
  );

  // Find products by ID
  const monthlyProduct = products.find(
    p => p.productId === PRODUCT_IDS.MONTHLY,
  );
  const annualProduct = products.find(p => p.productId === PRODUCT_IDS.ANNUAL);

  const handleSubscribe = async () => {
    const product =
      selectedPlan === PRODUCT_IDS.ANNUAL ? annualProduct : monthlyProduct;

    if (!product?.offerToken) {
      Alert.alert(
        'No disponible',
        'La suscripción no está disponible en este momento. Verifica tu conexión e intenta de nuevo.',
      );
      return;
    }

    await purchase(product.productId, product.offerToken);
  };

  const handleRestore = async () => {
    const restored = await restore();
    if (restored) {
      Alert.alert(
        'Restaurado',
        'Tu suscripción Premium ha sido restaurada correctamente.',
      );
    } else {
      Alert.alert(
        'Sin compras',
        'No se encontraron suscripciones activas asociadas a tu cuenta de Google Play.',
      );
    }
  };

  const getPrice = (productId: string): string => {
    const product = products.find(p => p.productId === productId);
    return product?.price || FALLBACK_PRICES[productId]?.price || '';
  };

  const getPeriod = (productId: string): string => {
    const product = products.find(p => p.productId === productId);
    return product
      ? formatPeriod(product.period)
      : FALLBACK_PRICES[productId]?.period || '';
  };

  const getMonthlyEquiv = (
    product: SubscriptionProduct | undefined,
    fallbackId: string,
  ): string => {
    if (product && product.priceMicros > 0 && product.period === 'P1Y') {
      const monthly = product.priceMicros / 12 / 1_000_000;
      return `${product.currency === 'USD' ? '$' : ''}${monthly.toFixed(
        2,
      )}/${formatPeriod('P1M')}`;
    }
    return FALLBACK_PRICES[fallbackId]?.monthlyEquiv || '';
  };

  const getSavingsPercent = (): string => {
    if (annualProduct && monthlyProduct && monthlyProduct.priceMicros > 0) {
      const yearlyViaMonthly = monthlyProduct.priceMicros * 12;
      const savings = Math.round(
        (1 - annualProduct.priceMicros / yearlyViaMonthly) * 100,
      );
      return savings > 0 ? `Ahorra ${savings}%` : '';
    }
    return 'Ahorra 44%';
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
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
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: colors.success + '15',
                    borderColor: colors.success + '30',
                  },
                ]}
              >
                <Text
                  style={[styles.statusBadgeText, { color: colors.success }]}
                >
                  {isCodeActivated
                    ? 'Activado con Código'
                    : 'Suscripción Activa'}
                </Text>
              </View>
              <Text style={styles.statusDescription}>
                Tienes acceso completo a todas las funciones Premium.
              </Text>
            </>
          ) : isTrialActive ? (
            <>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: colors.primary + '15',
                    borderColor: colors.primary + '30',
                  },
                ]}
              >
                <Text
                  style={[styles.statusBadgeText, { color: colors.primary }]}
                >
                  Prueba Gratuita Activa
                </Text>
              </View>
              <Text style={styles.trialDays}>{trialDaysLeft}</Text>
              <Text style={styles.trialDaysLabel}>días restantes</Text>
              <View style={styles.trialBar}>
                <View
                  style={[
                    styles.trialBarFill,
                    {
                      width: `${(trialDaysLeft / 14) * 100}%`,
                      backgroundColor:
                        trialDaysLeft > 3 ? colors.primary : colors.warning,
                    },
                  ]}
                />
              </View>
              <Text style={styles.statusDescription}>
                Disfruta de todas las funciones Premium durante tu período de
                prueba.
              </Text>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: colors.error + '15',
                    borderColor: colors.error + '30',
                  },
                ]}
              >
                <Text style={[styles.statusBadgeText, { color: colors.error }]}>
                  Prueba Finalizada
                </Text>
              </View>
              <Text style={styles.statusDescription}>
                Tu período de prueba de 14 días ha finalizado. Suscríbete para
                seguir usando las funciones Premium.
              </Text>
            </>
          )}
        </View>

        {/* Premium Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funciones Premium</Text>
          {PREMIUM_FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialCommunityIcons
                name={f.iconName}
                size={18}
                color={colors.primary}
                style={{ marginRight: 12, width: 24, textAlign: 'center' }}
              />
              <Text style={styles.featureText}>{f.text}</Text>
              {isPremium && (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={colors.success}
                />
              )}
            </View>
          ))}
        </View>

        {/* Free Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Siempre Gratis</Text>
          {FREE_FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialCommunityIcons
                name={f.iconName}
                size={18}
                color={colors.primary}
                style={{ marginRight: 12, width: 24, textAlign: 'center' }}
              />
              <Text style={styles.featureText}>{f.text}</Text>
              <MaterialCommunityIcons
                name="check"
                size={16}
                color={colors.success}
              />
            </View>
          ))}
        </View>

        {/* Plan Selection & Subscribe */}
        {!isSubscribed && !isCodeActivated && (
          <View style={styles.actionSection}>
            {/* Plan Cards */}
            <View style={styles.plansRow}>
              {/* Annual Plan */}
              <TouchableOpacity
                style={[
                  styles.planCard,
                  selectedPlan === PRODUCT_IDS.ANNUAL && {
                    borderColor: colors.primary,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedPlan(PRODUCT_IDS.ANNUAL)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.planBestBadge,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.planBestText}>Mejor valor</Text>
                </View>
                <Text style={styles.planPrice}>
                  {getPrice(PRODUCT_IDS.ANNUAL)}
                </Text>
                <Text style={styles.planPeriod}>
                  /{getPeriod(PRODUCT_IDS.ANNUAL)}
                </Text>
                {getSavingsPercent() ? (
                  <View
                    style={[
                      styles.planSaveBadge,
                      { backgroundColor: colors.success + '15' },
                    ]}
                  >
                    <Text
                      style={[styles.planSaveText, { color: colors.success }]}
                    >
                      {getSavingsPercent()}
                    </Text>
                  </View>
                ) : null}
                <Text style={styles.planMonthly}>
                  {getMonthlyEquiv(annualProduct, PRODUCT_IDS.ANNUAL)}
                </Text>
              </TouchableOpacity>

              {/* Monthly Plan */}
              <TouchableOpacity
                style={[
                  styles.planCard,
                  selectedPlan === PRODUCT_IDS.MONTHLY && {
                    borderColor: colors.primary,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedPlan(PRODUCT_IDS.MONTHLY)}
                activeOpacity={0.7}
              >
                <Text style={[styles.planPrice, { marginTop: 24 }]}>
                  {getPrice(PRODUCT_IDS.MONTHLY)}
                </Text>
                <Text style={styles.planPeriod}>
                  /{getPeriod(PRODUCT_IDS.MONTHLY)}
                </Text>
                <Text style={[styles.planMonthly, { marginTop: 28 }]}>
                  Sin compromiso
                </Text>
              </TouchableOpacity>
            </View>

            {/* Subscribe Button */}
            <TouchableOpacity
              style={[
                styles.subscribeButton,
                isBillingLoading && { opacity: 0.7 },
              ]}
              onPress={handleSubscribe}
              activeOpacity={0.7}
              disabled={isBillingLoading}
            >
              {isBillingLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.subscribeButtonText}>
                  Suscribirse — {getPrice(selectedPlan)}/
                  {getPeriod(selectedPlan)}
                </Text>
              )}
            </TouchableOpacity>

            {/* Restore */}
            <TouchableOpacity
              style={styles.restoreButton}
              onPress={handleRestore}
              activeOpacity={0.7}
              disabled={isBillingLoading}
            >
              <Text style={styles.restoreButtonText}>Restaurar compra</Text>
            </TouchableOpacity>

            {/* Legal */}
            <Text style={styles.legalText}>
              La suscripción se renueva automáticamente. Puedes cancelarla en
              cualquier momento desde Google Play {'>'} Suscripciones. El pago
              se carga a tu cuenta de Google Play.
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neuBackground,
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: rs.space(24),
      paddingBottom: rs.space(32),
      paddingHorizontal: rs.space(24),
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: '#FFFFFF',
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      color: 'rgba(255,255,255,0.8)',
      textAlign: 'center',
      marginTop: rs.space(8),
      lineHeight: rs.font(20),
    },
    statusCard: {
      ...neuElevated(colors),
      marginHorizontal: rs.space(16),
      marginTop: -16,
      padding: rs.space(20),
      alignItems: 'center',
    },
    statusBadge: {
      paddingHorizontal: rs.space(16),
      paddingVertical: rs.space(6),
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: rs.space(12),
    },
    statusBadgeText: {
      fontSize: rs.font(13),
      fontWeight: '700',
    },
    trialDays: {
      fontSize: rs.font(48),
      fontWeight: '800',
      color: colors.primary,
    },
    trialDaysLabel: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      marginBottom: rs.space(12),
    },
    trialBar: {
      width: '100%',
      height: rs.space(6),
      backgroundColor: colors.border,
      borderRadius: 3,
      marginBottom: rs.space(12),
      overflow: 'hidden',
    },
    trialBarFill: {
      height: '100%',
      borderRadius: 3,
    },
    statusDescription: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: rs.font(19),
    },
    section: {
      ...neuCard(colors),
      marginHorizontal: rs.space(16),
      marginTop: rs.space(12),
      padding: rs.space(18),
    },
    sectionTitle: {
      fontSize: rs.font(17),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(14),
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(12),
    },
    featureText: {
      fontSize: rs.font(14),
      color: colors.text,
      flex: 1,
    },
    actionSection: {
      paddingHorizontal: rs.space(16),
      marginTop: rs.space(20),
    },
    plansRow: {
      flexDirection: 'row',
      gap: rs.space(12),
      marginBottom: rs.space(16),
    },
    planCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: rs.space(16),
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
      fontSize: rs.font(11),
      fontWeight: '700',
      color: '#FFFFFF',
    },
    planPrice: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: colors.text,
      marginTop: rs.space(8),
    },
    planPeriod: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      fontWeight: '600',
    },
    planSaveBadge: {
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(4),
      borderRadius: 10,
      marginTop: rs.space(8),
    },
    planSaveText: {
      fontSize: rs.font(12),
      fontWeight: '700',
    },
    planMonthly: {
      fontSize: rs.font(12),
      color: colors.textLight,
      marginTop: rs.space(6),
    },
    subscribeButton: {
      backgroundColor: colors.primary,
      paddingVertical: rs.space(18),
      borderRadius: 14,
      alignItems: 'center',
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    subscribeButtonText: {
      fontSize: rs.font(17),
      fontWeight: '700',
      color: '#FFFFFF',
    },
    restoreButton: {
      paddingVertical: rs.space(14),
      alignItems: 'center',
      marginTop: rs.space(8),
    },
    restoreButtonText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      fontWeight: '600',
    },
    legalText: {
      fontSize: rs.font(11),
      color: colors.textLight,
      textAlign: 'center',
      lineHeight: rs.font(16),
      marginTop: rs.space(12),
      paddingHorizontal: rs.space(8),
    },
  });
