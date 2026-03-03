// ============================================================
// Guía Farmacológica de Enfermería — Type Definitions
// ============================================================

/** Categoría de riesgo en embarazo (FDA) */
export type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X' | 'N/A';

/** Vías de administración */
export type RouteOfAdministration =
  | 'oral'
  | 'IV'
  | 'IM'
  | 'SC'
  | 'sublingual'
  | 'topica'
  | 'rectal'
  | 'inhalatoria'
  | 'oftalmica'
  | 'otica'
  | 'nasal'
  | 'transdermica'
  | 'intratecal'
  | 'epidural'
  | 'vaginal'
  | 'intradermica';

/** Un fármaco completo con los 13+ campos */
export interface Drug {
  id: string;
  nombre: string;
  nombreGenerico: string;
  nombresComerciales: string[];
  familia: string;
  clasificacion: string;
  mecanismoAccion: string;
  indicaciones: string[];
  contraindicaciones: string[];
  efectosAdversos: string[];
  interacciones: string[];
  viaAdministracion: RouteOfAdministration[];
  dosis: {
    adulto: string;
    pediatrico?: string;
    geriatrico?: string;
    ajusteRenal?: string;
    ajusteHepatico?: string;
  };
  presentaciones: string[];
  embarazo: PregnancyCategory;
  lactancia: string;
  cuidadosEnfermeria: string[];
  farmacocinetica?: {
    absorcion?: string;
    distribucion?: string;
    metabolismo?: string;
    excrecion?: string;
    vidaMedia?: string;
    inicioAccion?: string;
    picoAccion?: string;
    duracionAccion?: string;
  };
  almacenamiento?: string;
  riesgosSobremedicacion?: {
    descripcion: string;
    efectos: string[];
    manejo: string;
    alerta?: string;
  };
  unidadId: string;
  capituloId: string;
  searchText: string; // Precalculated for search
}

/** Unidad temática (ej: Sistema Nervioso) */
export interface Unit {
  id: string;
  nombre: string;
  numero: number;
  color: string;
  icon: string;
  capitulos: Chapter[];
}

/** Capítulo dentro de una unidad */
export interface Chapter {
  id: string;
  nombre: string;
  unidadId: string;
  drugIds: string[];
}

/** Estructura de categorías */
export interface CategoriesData {
  unidades: Unit[];
}

/** Fármaco de emergencia */
export interface EmergencyDrug {
  id: string;
  nombre: string;
  indicacion: string;
  dosis: string;
  via: string;
  velocidadAdmin: string;
  presentacion: string;
  efectosAdversos: string;
  notas: string;
}

/** Antídoto */
export interface Antidote {
  id: string;
  toxico: string;
  antidoto: string;
  dosis: string;
  via: string;
  inicio: string;
  notas: string;
}

/** Compatibilidad IV */
export type IVCompatibility = 'compatible' | 'incompatible' | 'variable' | 'desconocido';

export interface IVCompatibilityEntry {
  farmaco1: string;
  farmaco2: string;
  compatibilidad: IVCompatibility;
  notas: string;
}

export interface IVCompatibilitiesData {
  farmacos: string[];
  compatibilidades: IVCompatibilityEntry[];
}

/** Fórmula de cálculo farmacológico */
export interface Formula {
  id: string;
  nombre: string;
  categoria: 'dosificacion' | 'goteo' | 'conversion' | 'pediatria' | 'renal';
  formula: string;
  variables: FormulaVariable[];
  ejemplo: string;
  explicacion: string;
}

export interface FormulaVariable {
  nombre: string;
  descripcion: string;
  unidad: string;
}

/** Entrada del glosario */
export interface GlossaryEntry {
  termino: string;
  definicion: string;
  abreviatura?: string;
  categoria: 'farmacologia' | 'anatomia' | 'enfermeria' | 'abreviatura' | 'general';
}

/** Información de vía de administración */
export interface RouteInfo {
  id: RouteOfAdministration;
  nombre: string;
  descripcion: string;
  tecnica: string[];
  precauciones: string[];
  imagen: string; // asset key
  zonas?: string[];
  angulo?: string;
  velocidad?: string;
}

/** Patología clínica */
export type PathologyCategory =
  | 'cardiovascular'
  | 'respiratorio'
  | 'neurologico'
  | 'gastrointestinal'
  | 'endocrino'
  | 'infeccioso'
  | 'renal'
  | 'hematologico'
  | 'psiquiatrico'
  | 'obstetrico'
  | 'musculoesqueletico'
  | 'emergencia';

export interface Pathology {
  id: string;
  nombre: string;
  definicion: string;
  fisiopatologiaBreve: string;
  signosSintomas: string[];
  farmacosRelacionados: string[]; // drug IDs from drugs.json
  cuidadosEnfermeria: string[];
  criteriosAlarma: string[];
  categoria: PathologyCategory;
}

/** Props de navegación */
export type RootStackParamList = {
  MainTabs: undefined;
  DrugDetail: { drugId: string };
  ChapterDrugs: { chapterId: string; unitName: string; unitColor: string };
  FormulaDetail: { formulaId: string };
  FormulaCalculator: { formulaId: string };
  RouteDetail: { routeId: RouteOfAdministration };
  GlossaryScreen: undefined;
  NursingCare: undefined;
  PathologiesScreen: undefined;
  PathologyDetail: { pathologyId: string };
  InteractionChecker: undefined;
  Calculators: undefined;
};

export type TabParamList = {
  Inicio: undefined;
  Categorias: undefined;
  Busqueda: undefined;
  Especial: undefined;
  Herramientas: undefined;
};

/** Resultado de búsqueda */
export interface SearchResult {
  drug: Drug;
  score: number;
  matchedFields: string[];
}
