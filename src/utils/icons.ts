// ============================================================
// Icon mapping for units and features
// Uses Unicode symbols for simplicity (no icon library needed)
// ============================================================

export const UNIT_ICONS: Record<string, string> = {
  'u01': '🧠', // Sistema Nervioso
  'u02': '❤️', // Cardiovascular
  'u03': '🦠', // Infecciones
  'u04': '🫁', // Respiratorio
  'u05': '🫃', // Digestivo
  'u06': '⚗️', // Endocrino
  'u07': '🦴', // Reproductor/Óseo
  'u08': '💪', // Musculoesquelético
  'u09': '🧴', // Dermatología
  'u10': '🩸', // Hematología
  'u11': '⚠️', // Antídotos
  'u12': '🏥', // Hospitalario
  'u13': '💊', // Psicofármacos
  'u14': '📋', // Otros
};

export const TAB_ICONS: Record<string, string> = {
  'Inicio': '🏠',
  'Categorias': '📚',
  'Busqueda': '🔍',
  'Especial': '🚨',
  'Herramientas': '🔧',
};

export const FEATURE_ICONS: Record<string, string> = {
  'emergency': '🚑',
  'antidotes': '💉',
  'iv_compat': '🧪',
  'formulas': '🧮',
  'glossary': '📖',
  'routes': '💊',
};

export const ROUTE_ICONS: Record<string, string> = {
  'oral': '💊',
  'IV': '💉',
  'IM': '💉',
  'SC': '💉',
  'sublingual': '👅',
  'topica': '🧴',
  'rectal': '💊',
  'inhalatoria': '🌬️',
  'oftalmica': '👁️',
  'otica': '👂',
  'nasal': '👃',
  'transdermica': '🩹',
  'intratecal': '🧠',
  'epidural': '🧠',
  'vaginal': '💊',
  'intradermica': '💉',
};
