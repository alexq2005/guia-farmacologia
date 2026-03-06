import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, StatusBar, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useDrugData } from '../hooks/useDrugData';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn } from '../utils/animations';
import scalesData from '../data/clinical_scales.json';
import labValuesData from '../data/lab_values.json';
import protocolsData from '../data/emergency_protocols.json';

const CONTACT_EMAIL = 'alexq2005@gmail.com';

export function AboutScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { getDrugCount, pathologies } = useDrugData();
  const fadeIn = useFadeIn(400);

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=Guía Farmacológica - Contacto`);
  };

  const stats = [
    { icon: '💊', value: getDrugCount().toString(), label: 'Fármacos' },
    { icon: '🏥', value: pathologies.length.toString(), label: 'Patologías' },
    { icon: '📊', value: scalesData.length.toString(), label: 'Escalas' },
    { icon: '🔬', value: labValuesData.length.toString(), label: 'Lab' },
    { icon: '🚨', value: protocolsData.length.toString(), label: 'Protocolos' },
    { icon: '🧮', value: '15', label: 'Calculadoras' },
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
            <Text style={styles.versionText}>v2.0</Text>
          </View>
        </View>

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
                <Text style={styles.statIcon}>{stat.icon}</Text>
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
              { icon: '🔍', text: 'Búsqueda inteligente con coincidencia sin acentos' },
              { icon: '⭐', text: 'Sistema de favoritos con persistencia local' },
              { icon: '📝', text: 'Notas personales por fármaco con autoguardado' },
              { icon: '🧠', text: 'Test interactivo con 8 tipos de preguntas' },
              { icon: '⚠️', text: 'Verificador de interacciones medicamentosas' },
              { icon: '💉', text: 'Guía parenteral (Son Espases) con compatibilidades' },
              { icon: '🌙', text: 'Modo oscuro con 3 opciones (claro/oscuro/sistema)' },
              { icon: '📤', text: 'Compartir información de fármacos' },
              { icon: '📊', text: 'Historial de búsquedas recientes' },
            ].map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
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
                <Text style={styles.sourceBullet}>📖</Text>
                <Text style={styles.sourceText}>{src}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={[styles.card, styles.disclaimerCard]}>
          <Text style={styles.disclaimerTitle}>⚕️ Aviso legal</Text>
          <Text style={styles.disclaimerText}>
            Esta aplicación es una herramienta de consulta y apoyo educativo. No reemplaza el criterio clínico profesional ni la consulta de fuentes primarias actualizadas. Verificá siempre la información con los protocolos de tu institución antes de administrar cualquier medicamento.
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
            <Text style={styles.emailIcon}>✉️</Text>
            <Text style={styles.emailText}>{CONTACT_EMAIL}</Text>
          </TouchableOpacity>
        </View>

        {/* Badges */}
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: colors.success + '15', borderColor: colors.success + '30' }]}>
            <Text style={styles.badgeIcon}>📱</Text>
            <Text style={[styles.badgeText, { color: colors.success }]}>100% Offline</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight + '15', borderColor: colors.primaryLight + '30' }]}>
            <Text style={styles.badgeIcon}>🇦🇷</Text>
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 18,
    borderRadius: 14,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    backgroundColor: colors.warning + '10',
    borderWidth: 1,
    borderColor: colors.warning + '30',
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
});
