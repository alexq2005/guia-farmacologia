import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import type { ThemeColors } from '../utils/colors';

const PREMIUM_FEATURES = [
  { icon: '🧠', text: 'Test farmacológico interactivo' },
  { icon: '⚖️', text: 'Comparador de fármacos (hasta 3)' },
  { icon: '⚠️', text: 'Verificador de interacciones' },
  { icon: '🧮', text: '15 calculadoras clínicas' },
  { icon: '📊', text: '13 escalas clínicas interactivas' },
  { icon: '🔬', text: '53 valores de laboratorio' },
  { icon: '🚨', text: '14 protocolos de emergencia' },
  { icon: '💉', text: 'Guía parenteral completa' },
  { icon: '📈', text: 'Dashboard de progreso' },
  { icon: '❤️', text: 'Favoritos y notas ilimitados' },
  { icon: '💾', text: 'Exportación/importación de datos' },
];

const FREE_FEATURES = [
  { icon: '💊', text: '1781 fármacos con información completa' },
  { icon: '📚', text: 'Navegación por categorías y sistemas' },
  { icon: '🔍', text: 'Búsqueda inteligente sin acentos' },
  { icon: '🌙', text: 'Modo oscuro' },
  { icon: '📤', text: 'Compartir información de fármacos' },
];

type PlanType = 'monthly' | 'annual';

export function PremiumScreen() {
  const { colors } = useTheme();
  const { isPremium, isTrialActive, trialDaysLeft, isSubscribed, restoreSubscription } = usePremium();
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
          <Text style={styles.headerIcon}>⭐</Text>
          <Text style={styles.headerTitle}>Premium</Text>
          <Text style={styles.headerSubtitle}>
            Desbloquea todo el potencial de tu guía farmacológica
          </Text>
        </View>

        {/* Trial Status */}
        <View style={styles.statusCard}>
          {isSubscribed ? (
            <>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '15', borderColor: colors.success + '30' }]}>
                <Text style={[styles.statusBadgeText, { color: colors.success }]}>Suscripción Activa</Text>
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
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
              {isPremium && <Text style={styles.featureCheck}>✓</Text>}
            </View>
          ))}
        </View>

        {/* Free Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Siempre Gratis</Text>
          {FREE_FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
              <Text style={styles.featureCheck}>✓</Text>
            </View>
          ))}
        </View>

        {/* Plan Selection & Subscribe */}
        {!isSubscribed && (
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: -16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    alignItems: 'center',
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
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 18,
    borderRadius: 14,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
