import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn } from '../utils/animations';

export function PrivacyPolicyScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn(350);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Animated.ScrollView style={{ opacity: fadeIn }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Última actualización: Marzo 2026</Text>

        <Text style={styles.sectionTitle}>1. Información General</Text>
        <Text style={styles.text}>
          Guía Farmacológica Integral de Enfermería ("la Aplicación") es una herramienta de consulta
          farmacológica desarrollada para profesionales y estudiantes de enfermería. La Aplicación
          funciona de forma completamente offline y no requiere conexión a internet para su uso principal.
        </Text>

        <Text style={styles.sectionTitle}>2. Datos que Recopilamos</Text>
        <Text style={styles.subtitle}>2.1 Datos almacenados localmente</Text>
        <Text style={styles.text}>
          La Aplicación almacena los siguientes datos exclusivamente en su dispositivo mediante AsyncStorage (almacenamiento local):
        </Text>
        <View style={styles.bulletList}>
          {[
            'Fármacos marcados como favoritos',
            'Notas personales escritas en cada fármaco',
            'Historial de búsquedas recientes (máximo 20 entradas)',
            'Fármacos visitados recientemente (máximo 15)',
            'Resultados de tests/quiz realizados',
            'Preferencia de tema visual (claro/oscuro/sistema)',
            'Datos de progreso de estudio (dashboard)',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>2.2 Datos que NO recopilamos</Text>
        <Text style={styles.highlight}>
          La Aplicación NO recopila, transmite ni comparte ningún dato personal con servidores
          externos, terceros ni servicios de análisis. No utilizamos cookies, rastreadores,
          servicios de publicidad ni herramientas de análisis de uso.
        </Text>

        <Text style={styles.sectionTitle}>3. Almacenamiento y Seguridad</Text>
        <Text style={styles.text}>
          Todos los datos del usuario se almacenan exclusivamente en el dispositivo del usuario
          mediante AsyncStorage de React Native. Los datos:
        </Text>
        <View style={styles.bulletList}>
          {[
            'Nunca abandonan su dispositivo',
            'No se sincronizan con ningún servidor o nube',
            'Se eliminan automáticamente al desinstalar la aplicación',
            'Pueden ser exportados/importados manualmente por el usuario (función de respaldo)',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>4. Permisos</Text>
        <Text style={styles.text}>
          La Aplicación solicita únicamente el permiso de INTERNET, utilizado exclusivamente para
          la funcionalidad de envío de correo electrónico de contacto desde la pantalla "Acerca de".
          No se realiza ninguna transmisión de datos del usuario a través de este permiso.
        </Text>

        <Text style={styles.sectionTitle}>5. Datos de Menores</Text>
        <Text style={styles.text}>
          La Aplicación es una herramienta educativa profesional dirigida a estudiantes y profesionales
          de enfermería. No está diseñada para menores de 13 años. No recopilamos intencionalmente
          información personal de menores.
        </Text>

        <Text style={styles.sectionTitle}>6. Eliminación de Datos</Text>
        <Text style={styles.text}>
          El usuario puede eliminar todos sus datos en cualquier momento mediante:
        </Text>
        <View style={styles.bulletList}>
          {[
            'Desinstalar la aplicación (elimina todos los datos locales)',
            'Borrar datos de la aplicación desde Ajustes del dispositivo > Aplicaciones > Guía Farmacológica > Almacenamiento > Borrar datos',
            'Eliminar favoritos, notas o historial individualmente desde la propia aplicación',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>7. Cambios en esta Política</Text>
        <Text style={styles.text}>
          Nos reservamos el derecho de actualizar esta política de privacidad. Las modificaciones
          se reflejarán en la fecha de "Última actualización" al inicio de este documento.
          Se recomienda revisar periódicamente esta política.
        </Text>

        <Text style={styles.sectionTitle}>8. Contacto</Text>
        <Text style={styles.text}>
          Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos
          sobre sus datos, puede contactarnos en:
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
  lastUpdated: { fontSize: 12, color: colors.textLight, marginBottom: 20, fontStyle: 'italic' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 8 },
  subtitle: { fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 12, marginBottom: 6 },
  text: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 8 },
  highlight: {
    fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: 8,
    backgroundColor: colors.success + '10', padding: 12, borderRadius: 10,
    borderLeftWidth: 3, borderLeftColor: colors.success, fontWeight: '500',
  },
  bulletList: { marginBottom: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4, paddingLeft: 8 },
  bullet: { fontSize: 14, color: colors.primary, marginRight: 8, lineHeight: 22 },
  bulletText: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, flex: 1 },
  contactEmail: { fontSize: 15, color: colors.primary, fontWeight: '600', marginTop: 4 },
  footer: { alignItems: 'center', marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  footerText: { fontSize: 12, color: colors.textLight },
});