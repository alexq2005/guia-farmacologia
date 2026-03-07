// ============================================================
// Icon mapping for units and features
// MaterialCommunityIcons names — used by CategoriesScreen, etc.
// ============================================================

export const UNIT_ICONS: Record<string, string> = {
  'u01': 'brain',                    // Sistema Nervioso
  'u02': 'heart-pulse',              // Cardiovascular
  'u03': 'virus-outline',            // Infecciones
  'u04': 'lungs',                    // Respiratorio
  'u05': 'stomach',                  // Digestivo
  'u06': 'diabetes',                 // Endocrino
  'u07': 'human-pregnant',           // Reproductor/Óseo
  'u08': 'bone',                     // Musculoesquelético
  'u09': 'hand-back-right-outline',  // Dermatología
  'u10': 'water-outline',            // Hematología
  'u11': 'alert-decagram-outline',   // Antídotos
  'u12': 'hospital-building',        // Hospitalario
  'u13': 'pill',                     // Psicofármacos
  'u14': 'clipboard-text-outline',   // Otros
};

export const TAB_ICONS: Record<string, string> = {
  'Inicio': 'home',
  'Categorias': 'bookshelf',
  'Busqueda': 'magnify',
  'Especial': 'alert-decagram',
  'Herramientas': 'wrench',
};

export const FEATURE_ICONS: Record<string, string> = {
  'emergency': 'ambulance',
  'antidotes': 'needle',
  'iv_compat': 'test-tube',
  'formulas': 'calculator-variant-outline',
  'glossary': 'book-open-variant',
  'routes': 'directions-fork',
};

export const ROUTE_ICONS: Record<string, string> = {
  'oral': 'pill',
  'IV': 'iv-bag',
  'IM': 'needle',
  'SC': 'needle',
  'sublingual': 'alpha-s-circle-outline',
  'topica': 'bottle-tonic-outline',
  'rectal': 'medical-bag',
  'inhalatoria': 'weather-windy',
  'oftalmica': 'eye-outline',
  'otica': 'ear-hearing',
  'nasal': 'head-outline',
  'transdermica': 'bandage',
  'intratecal': 'brain',
  'epidural': 'spine',
  'vaginal': 'circle-outline',
  'intradermica': 'water-outline',
};
