import React, { useMemo, useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, StatusBar, Animated, TextInput, Alert, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useDrugData } from '../hooks/useDrugData';
import { usePremium } from '../context/PremiumContext';
import type { ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';
import { useFadeIn } from '../utils/animations';
import scalesData from '../data/clinical_scales.json';
import labValuesData from '../data/lab_values.json';
import protocolsData from '../data/emergency_protocols.json';

const CONTACT_EMAIL = 'alexq2005@gmail.com';

export function AboutScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { getDrugCount, pathologies } = useDrugData();
  const { isFreeBuild, isCodeActivated, activateWithCode } = usePremium();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeIn = useFadeIn(400);

  // Easter egg: tap version 5 times to reveal activation input
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showActivation, setShowActivation] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  const handleVersionTap = useCallback(() => {
    tapCount.current++;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 4000);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      setShowActivation(true);
    }
  }, []);

  const handleActivate = useCallback(async () => {
    if (!activationCode.trim()) return;
    const success = await activateWithCode(activationCode);
    if (success) {
      setShowActivation(false);
      setActivationCode('');
      Alert.alert('Activado', 'Todas las funciones han sido desbloqueadas permanentemente.');
    } else {
      Alert.alert('Código incorrecto', 'El código de activación no es válido.');
    }
  }, [activationCode, activateWithCode]);

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=Guía Farmacológica - Contacto`);
  };

  const stats = [
    { icon: 'pill', value: getDrugCount().toString(), label: 'Fármacos' },
    { icon: 'hospital-box-outline', value: pathologies.length.toString(), label: 'Patologías' },
    { icon: 'chart-timeline-variant-shimmer', value: scalesData.length.toString(), label: 'Escalas' },
    { icon: 'flask-outline', value: labValuesData.length.toString(), label: 'Lab' },
    { icon: 'alert-octagon', value: protocolsData.length.toString(), label: 'Protocolos' },
    { icon: 'calculator-variant-outline', value: '15', label: 'Calculadoras' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Animated.ScrollView style={{ opacity: fadeIn }} showsVerticalScrollIndicator={false}>
        {/* App Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            {/* Cruz médica */}
            <View style={styles.crossContainer}>
              <View style={styles.crossVertical} />
              <View style={styles.crossHorizontal} />
            </View>
            {/* Libro abierto */}
            <View style={styles.bookContainer}>
              <View style={styles.bookLeft} />
              <View style={styles.bookSpine} />
              <View style={styles.bookRight} />
            </View>
          </View>

          <Text style={styles.appName}>Guía Farmacológica{'\n'}Integral de Enfermería</Text>
          <View style={styles.versionBadge}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.versionText}>v1.0</Text>
              {isCodeActivated && <MaterialCommunityIcons name="check-circle" size={14} color="#059669" style={{ marginLeft: 4 }} />}
            </View>
          </View>
        </View>

        {/* Activation Modal */}
        <Modal visible={showActivation} transparent animationType="fade" onRequestClose={() => setShowActivation(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Código de Activación</Text>
              <TextInput
                style={[styles.modalInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                value={activationCode}
                onChangeText={setActivationCode}
                placeholder="Ingresa el código..."
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: colors.border }]}
                  onPress={() => { setShowActivation(false); setActivationCode(''); }}
                >
                  <Text style={[styles.modalBtnText, { color: colors.text }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                  onPress={handleActivate}
                >
                  <Text style={[styles.modalBtnText, { color: '#FFFFFF' }]}>Activar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Acerca de la app</Text>
          <Text style={styles.cardText}>
            Guía de consulta rápida para profesionales y estudiantes de enfermería.
            Incluye fármacos, patologías, escalas clínicas interactivas, valores de laboratorio,
            protocolos de emergencia, calculadoras, interacciones y cuidados de enfermería.
          </Text>
          <Text style={styles.cardText}>
            Toda la información está disponible sin conexión a internet,
            diseñada para ser accesible en cualquier momento y lugar.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contenido</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <MaterialCommunityIcons name={stat.icon} size={24} color={colors.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Funcionalidades</Text>
          <View style={styles.featureList}>
            {[
              { icon: 'magnify', text: 'Búsqueda inteligente con coincidencia sin acentos' },
              { icon: 'star-outline', text: 'Sistema de favoritos con persistencia local' },
              { icon: 'note-text-outline', text: 'Notas personales por fármaco con autoguardado' },
              { icon: 'head-question-outline', text: 'Test interactivo con 8 tipos de preguntas' },
              { icon: 'swap-horizontal-bold', text: 'Verificador de interacciones medicamentosas' },
              { icon: 'iv-bag', text: 'Guía parenteral (Son Espases) con compatibilidades' },
              { icon: 'moon-waning-crescent', text: 'Modo oscuro con 3 opciones (claro/oscuro/sistema)' },
              { icon: 'share-variant-outline', text: 'Compartir información de fármacos' },
              { icon: 'history', text: 'Historial de búsquedas recientes' },
            ].map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <MaterialCommunityIcons name={f.icon} size={18} color={colors.primary} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sources */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fuentes y referencias</Text>
          <Text style={styles.cardText}>
            La información farmacológica ha sido recopilada y verificada a partir de las siguientes fuentes:
          </Text>
          <View style={styles.sourceList}>
            {[
              'Vademécum Farmacológico Nacional (ANMAT)',
              'Manual de Enfermería Farmacológica — Castells & Hernández',
              'Guía Terapéutica Antimicrobiana (Sanford)',
              'Guía de Administración Parenteral — Hospital Son Espases',
              'British National Formulary (BNF)',
              'UpToDate® Clinical Database',
              'Medscape Drug Reference',
              'Fichas técnicas AEMPS / EMA',
            ].map((src, i) => (
              <View key={i} style={styles.sourceRow}>
                <MaterialCommunityIcons name="book-open-variant" size={12} color={colors.textSecondary} style={{ marginRight: 8, marginTop: 1 }} />
                <Text style={styles.sourceText}>{src}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer — Prominent medical disclaimer */}
        <View style={[styles.card, styles.disclaimerCard]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MaterialCommunityIcons name="medical-bag" size={18} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={[styles.disclaimerTitle, { marginBottom: 0 }]}>Aviso médico importante</Text>
          </View>
          <Text style={styles.disclaimerText}>
            Esta aplicación es una herramienta de CONSULTA EDUCATIVA y REFERENCIA RÁPIDA.
            No constituye consejo médico, diagnóstico ni tratamiento.
          </Text>
          <Text style={[styles.disclaimerText, { fontWeight: '700', marginTop: 6 }]}>
            SIEMPRE verifique la información con fuentes primarias y los protocolos de su
            institución antes de administrar cualquier medicamento.
          </Text>
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contacto</Text>
          <Text style={styles.cardText}>
            ¿Encontraste un error? ¿Tenés sugerencias o comentarios?
            No dudes en escribirnos.
          </Text>
          <TouchableOpacity style={styles.emailButton} onPress={handleEmail} activeOpacity={0.7}>
            <MaterialCommunityIcons name="email-outline" size={20} color={colors.primaryLight} style={{ marginRight: 10 }} />
            <Text style={styles.emailText}>{CONTACT_EMAIL}</Text>
          </TouchableOpacity>
        </View>

        {/* Legal & Premium */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isFreeBuild ? 'Legal' : 'Legal y suscripción'}</Text>
          {!isFreeBuild && (
            <TouchableOpacity
              style={styles.legalRow}
              onPress={() => navigation.navigate('PremiumScreen')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="star" size={18} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={styles.legalText}>Premium</Text>
              <Text style={styles.legalArrow}>›</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.legalRow}
            onPress={() => navigation.navigate('PrivacyPolicy')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="lock-outline" size={18} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <Text style={styles.legalText}>Política de Privacidad</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.legalRow}
            onPress={() => navigation.navigate('Terms')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="file-document-outline" size={18} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <Text style={styles.legalText}>Términos y Condiciones</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Badges */}
        <View style={styles.badgesRow}>
          <TouchableOpacity
            style={[styles.badge, { backgroundColor: colors.success + '15', borderColor: colors.success + '30' }]}
            onPress={handleVersionTap}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="cellphone" size={18} color={colors.success} style={{ marginRight: 6 }} />
            <Text style={[styles.badgeText, { color: colors.success }]}>100% Offline</Text>
          </TouchableOpacity>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight + '15', borderColor: colors.primaryLight + '30' }]}>
            <MaterialCommunityIcons name="flag-outline" size={18} color={colors.primaryLight} style={{ marginRight: 6 }} />
            <Text style={[styles.badgeText, { color: colors.primaryLight }]}>Hecho en Argentina</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Desarrollado con dedicación para la comunidad de enfermería.
          </Text>
          <Text style={styles.footerCopy}>© 2025-2026 — Todos los derechos reservados</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neuBackground,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 16,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  crossContainer: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossVertical: {
    width: 10,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  crossHorizontal: {
    position: 'absolute',
    width: 30,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  bookContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignItems: 'flex-end',
  },
  bookLeft: {
    width: 24,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 2,
    transform: [{ skewY: '-4deg' }],
  },
  bookSpine: {
    width: 2,
    height: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  bookRight: {
    width: 24,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 2,
    transform: [{ skewY: '4deg' }],
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  versionBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    ...neuCard(colors), margin: 16, marginBottom: 0, padding: 16,
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
    marginBottom: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 4,
    rowGap: 14,
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight + '12',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight + '25',
  },
  emailIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  emailText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaryLight,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  featureList: {
    marginTop: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 15,
    marginRight: 10,
    marginTop: 2,
  },
  featureText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    flex: 1,
  },
  sourceList: {
    marginTop: 8,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  sourceBullet: {
    fontSize: 12,
    marginRight: 8,
    marginTop: 1,
  },
  sourceText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  disclaimerCard: {
    backgroundColor: colors.danger + '08',
    borderWidth: 2,
    borderColor: colors.danger + '30',
  },
  disclaimerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  footerText: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerCopy: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 8,
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  legalIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  legalText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  legalArrow: {
    fontSize: 22,
    color: colors.textLight,
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalContent: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
