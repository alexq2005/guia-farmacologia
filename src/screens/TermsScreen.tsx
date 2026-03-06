import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn } from '../utils/animations';

export function TermsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn(350);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Animated.ScrollView style={{ opacity: fadeIn }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Última actualización: Marzo 2026</Text>

        {/* DISCLAIMER MÉDICO — el más importante */}
        <View style={styles.medicalDisclaimer}>
          <Text style={styles.disclaimerIcon}>⚕️</Text>
          <Text style={styles.disclaimerTitle}>AVISO MÉDICO IMPORTANTE</Text>
          <Text style={styles.disclaimerText}>
            Esta aplicación es una herramienta de CONSULTA EDUCATIVA y REFERENCIA RÁPIDA.
            NO constituye consejo médico, diagnóstico ni tratamiento.
          </Text>
          <Text style={styles.disclaimerText}>
            La información contenida NO reemplaza:
          </Text>
          <View style={styles.disclaimerList}>
            {[
              'El criterio clínico del profesional de salud',
              'Los protocolos y guías de tu institución sanitaria',
              'La consulta de fichas técnicas oficiales actualizadas (AEMPS, EMA, FDA)',
              'La supervisión de un médico o farmacéutico',
            ].map((item, i) => (
              <Text key={i} style={styles.disclaimerListItem}>  ✗  {item}</Text>
            ))}
          </View>
          <Text style={[styles.disclaimerText, { fontWeight: '700', marginTop: 8 }]}>
            SIEMPRE verifique la dosis, indicaciones, contraindicaciones e interacciones
            con fuentes primarias antes de administrar cualquier medicamento.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
        <Text style={styles.text}>
          Al descargar, instalar o utilizar la aplicación Guía Farmacológica Integral de Enfermería
          ("la Aplicación"), usted acepta estos términos y condiciones de uso. Si no está de acuerdo,
          debe desinstalar la Aplicación inmediatamente.
        </Text>

        <Text style={styles.sectionTitle}>2. Propósito de la Aplicación</Text>
        <Text style={styles.text}>
          La Aplicación tiene un propósito exclusivamente educativo e informativo. Está diseñada
          como herramienta de apoyo para profesionales y estudiantes de enfermería. La información
          farmacológica incluida se basa en fuentes de referencia reconocidas pero puede contener
          errores, omisiones o información desactualizada.
        </Text>

        <Text style={styles.sectionTitle}>3. Limitación de Responsabilidad</Text>
        <Text style={styles.text}>
          Los desarrolladores de la Aplicación:
        </Text>
        <View style={styles.bulletList}>
          {[
            'NO garantizan la exactitud, integridad o actualidad de la información farmacológica presentada',
            'NO se responsabilizan por decisiones clínicas tomadas en base a la información de la Aplicación',
            'NO se responsabilizan por errores de dosificación, interacciones no listadas o contraindicaciones omitidas',
            'NO asumen responsabilidad por daños directos, indirectos o consecuentes derivados del uso de la Aplicación',
            'Recomiendan SIEMPRE verificar la información con fuentes oficiales y protocolos institucionales',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>4. Uso Apropiado</Text>
        <Text style={styles.text}>El usuario se compromete a:</Text>
        <View style={styles.bulletList}>
          {[
            'Utilizar la Aplicación como herramienta complementaria, no como fuente única de información',
            'Verificar toda información crítica (dosis, interacciones) con fuentes primarias',
            'No utilizar la Aplicación para autodiagnóstico o automedicación',
            'Reportar errores detectados al correo de contacto',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>5. Propiedad Intelectual</Text>
        <Text style={styles.text}>
          La Aplicación, incluyendo su diseño, código fuente, contenido farmacológico compilado,
          estructura de datos y elementos visuales, es propiedad de sus desarrolladores y está
          protegida por las leyes de propiedad intelectual aplicables.
        </Text>
        <Text style={styles.text}>
          La información farmacológica ha sido compilada a partir de fuentes públicas y de referencia
          reconocidas. Los nombres comerciales de medicamentos pertenecen a sus respectivos
          titulares y se utilizan únicamente con fines informativos.
        </Text>

        <Text style={styles.sectionTitle}>6. Actualizaciones</Text>
        <Text style={styles.text}>
          La información farmacológica puede no reflejar las últimas actualizaciones de fichas
          técnicas o guías clínicas. Los desarrolladores se esfuerzan por mantener la información
          actualizada pero no pueden garantizar su vigencia en todo momento. Es responsabilidad
          del usuario verificar la información con fuentes actualizadas.
        </Text>

        <Text style={styles.sectionTitle}>7. Modificaciones</Text>
        <Text style={styles.text}>
          Nos reservamos el derecho de modificar estos términos en cualquier momento.
          Las modificaciones entrarán en vigor en el momento de su publicación en la Aplicación.
          El uso continuado de la Aplicación tras las modificaciones implica la aceptación de
          los nuevos términos.
        </Text>

        <Text style={styles.sectionTitle}>8. Contacto</Text>
        <Text style={styles.text}>
          Para consultas, reportes de errores o sugerencias:
        </Text>
        <Text style={styles.contactEmail}>alexq2005@gmail.com</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025-2026 Guía Farmacológica de Enfermería</Text>
          <Text style={styles.footerText}>Todos los derechos reservados</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  lastUpdated: { fontSize: 12, color: colors.textLight, marginBottom: 16, fontStyle: 'italic' },
  medicalDisclaimer: {
    backgroundColor: colors.danger + '08', padding: 18, borderRadius: 14,
    borderWidth: 2, borderColor: colors.danger + '40', marginBottom: 24,
  },
  disclaimerIcon: { fontSize: 28, textAlign: 'center', marginBottom: 8 },
  disclaimerTitle: { fontSize: 16, fontWeight: '800', color: colors.danger, textAlign: 'center', marginBottom: 12 },
  disclaimerText: { fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: 4 },
  disclaimerList: { marginVertical: 8 },
  disclaimerListItem: { fontSize: 13, color: colors.danger, lineHeight: 22, fontWeight: '500' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 8 },
  text: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 8 },
  bulletList: { marginBottom: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4, paddingLeft: 8 },
  bullet: { fontSize: 14, color: colors.primary, marginRight: 8, lineHeight: 22 },
  bulletText: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, flex: 1 },
  contactEmail: { fontSize: 15, color: colors.primary, fontWeight: '600', marginTop: 4 },
  footer: { alignItems: 'center', marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  footerText: { fontSize: 12, color: colors.textLight },
});