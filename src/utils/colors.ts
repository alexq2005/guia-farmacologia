// ============================================================
// Color system — cada unidad temática tiene su propio color
// ============================================================

export const UNIT_COLORS: Record<string, string> = {
  'u01': '#7C3AED', // Sistema Nervioso — morado
  'u02': '#DC2626', // Cardiovascular — rojo
  'u03': '#059669', // Infecciones — verde
  'u04': '#2563EB', // Respiratorio — azul
  'u05': '#EA580C', // Digestivo — naranja
  'u06': '#B45309', // Endocrino — naranja oscuro
  'u07': '#DB2777', // Reproductor/Óseo — rosa
  'u08': '#0D9488', // Musculoesquelético — teal
  'u09': '#CA8A04', // Dermatología — amarillo
  'u10': '#991B1B', // Hematología — rojo oscuro
  'u11': '#EF4444', // Antídotos — rojo brillante
  'u12': '#6B7280', // Hospitalario — gris
  'u13': '#7E22CE', // Psicofármacos — púrpura
  'u14': '#0369A1', // Otros — azul oscuro
};

export const PREGNANCY_COLORS: Record<string, string> = {
  'A': '#16A34A',
  'B': '#2563EB',
  'C': '#EAB308',
  'D': '#EA580C',
  'X': '#DC2626',
  'N/A': '#9CA3AF',
};

export type ThemeColors = typeof LIGHT_COLORS;

export const LIGHT_COLORS = {
  primary: '#1E40AF',
  primaryLight: '#3B82F6',
  primaryDark: '#1E3A8A',
  secondary: '#059669',
  accent: '#7C3AED',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#16A34A',
  info: '#0EA5E9',
  emergency: '#DC2626',
  nursing: '#7C3AED',
  pediatric: '#EC4899',
  cardBackground: '#FFFFFF',
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
  tabBarActive: '#1E40AF',
  tabBarInactive: '#94A3B8',
  searchHighlight: '#FEF08A',
};

export const DARK_COLORS: ThemeColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  secondary: '#10B981',
  accent: '#A78BFA',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceElevated: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textLight: '#64748B',
  border: '#334155',
  borderLight: '#1E293B',
  error: '#EF4444',
  warning: '#FBBF24',
  success: '#34D399',
  info: '#38BDF8',
  emergency: '#EF4444',
  nursing: '#A78BFA',
  pediatric: '#F472B6',
  cardBackground: '#1E293B',
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.7)',
  tabBarActive: '#60A5FA',
  tabBarInactive: '#475569',
  searchHighlight: '#854D0E',
};

// Default export for backwards compatibility (used by screens that haven't migrated to useTheme)
export const COLORS = LIGHT_COLORS;

export const ROUTE_COLORS: Record<string, string> = {
  'oral': '#3B82F6',
  'IV': '#DC2626',
  'IM': '#EA580C',
  'SC': '#16A34A',
  'sublingual': '#8B5CF6',
  'topica': '#F59E0B',
  'rectal': '#6B7280',
  'inhalatoria': '#0EA5E9',
  'oftalmica': '#06B6D4',
  'otica': '#14B8A6',
  'nasal': '#22D3EE',
  'transdermica': '#A855F7',
  'intratecal': '#E11D48',
  'epidural': '#BE123C',
  'vaginal': '#DB2777',
  'intradermica': '#65A30D',
};

export const FORMULA_COLORS: Record<string, string> = {
  'dosificacion': '#3B82F6',
  'goteo': '#DC2626',
  'conversion': '#16A34A',
  'pediatria': '#EC4899',
  'renal': '#F59E0B',
};

export const PATHOLOGY_COLORS: Record<string, string> = {
  'cardiovascular': '#DC2626',
  'respiratorio': '#2563EB',
  'neurologico': '#7C3AED',
  'gastrointestinal': '#EA580C',
  'endocrino': '#B45309',
  'infeccioso': '#059669',
  'renal': '#F59E0B',
  'hematologico': '#991B1B',
  'psiquiatrico': '#7E22CE',
  'obstetrico': '#DB2777',
  'musculoesqueletico': '#0D9488',
  'emergencia': '#EF4444',
};

export const PATHOLOGY_ICONS: Record<string, string> = {
  'cardiovascular': '\u2764\uFE0F',
  'respiratorio': '\uD83E\uDEC1',
  'neurologico': '\uD83E\uDDE0',
  'gastrointestinal': '\uD83E\uDE7A',
  'endocrino': '\u2696\uFE0F',
  'infeccioso': '\uD83E\uDDA0',
  'renal': '\uD83E\uDEC0',
  'hematologico': '\uD83E\uDE78',
  'psiquiatrico': '\uD83E\uDDCA',
  'obstetrico': '\uD83E\uDD30',
  'musculoesqueletico': '\uD83E\uDDB4',
  'emergencia': '\uD83D\uDEA8',
};