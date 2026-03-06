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
  preparacionParenteral?: {
    // Campos básicos
    reconstitucion?: string;
    dilucion?: string;
    volumenAdministracion?: string;
    velocidadAdministracion?: string;
    estabilidad?: string;
    // Guía Son Espases — campos extendidos
    solucionesCompatibles?: {
      ssf?: boolean | string;    // NaCl 0.9%: true=compatible, false=incompatible, string=condicional
      sg5?: boolean | string;    // SG 5%
      otras?: string;            // Ringer Lactato, etc.
    };
    compatibilidadNPT?: {
      tresEnUno?: string;        // Amino + glucosa + lípidos
      dosEnUno?: string;         // Amino + glucosa (sin lípidos)
      observaciones?: string;
    };
    proteccionPersonal?: string[];  // Instrucciones manipulación segura
    medicamentoPeligroso?: boolean; // Flag visual ⚠️
    observaciones?: string;         // Observaciones adicionales
  };
  riesgosSobremedicacion?: {
    descripcion: string;
    efectos: string[];
    manejo: string;
    alerta?: string;
  };
  grupoFarmacologico?: string;  // Pharmacological group (by mechanism)
  grupoTerapeutico?: string;    // Therapeutic group (by clinical use/system)
  unidadId: string;
  capituloId: string;
  searchText?: string; // Deprecated: generated at runtime
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

/** Escala clínica interactiva */
export type ScaleType = 'components' | 'selector' | 'checklist';

export interface ScaleOption {
  label: string;
  value: number;
}

export interface ScaleComponent {
  nombre: string;
  opciones: ScaleOption[];
}

export interface ScaleInterpretation {
  rango: [number, number]; // [min, max] inclusive
  label: string;
  color: string;
  descripcion: string;
}

export interface ClinicalScale {
  id: string;
  nombre: string;
  abreviatura: string;
  descripcion: string;
  tipo: ScaleType;
  categoria: 'neurologia' | 'neonatologia' | 'riesgo_ulceras' | 'sepsis' | 'via_aerea' | 'sedacion' | 'dolor' | 'trombosis' | 'postanestesia' | 'asa';
  componentes: ScaleComponent[];
  interpretaciones: ScaleInterpretation[];
  rangoTotal: [number, number];
  contextoClinico: string;
  referencia: string;
}

/** Valor de laboratorio */
export type LabCategory = 'hematologia' | 'bioquimica' | 'coagulacion' | 'hepatico' | 'renal' | 'cardiaco' | 'endocrino' | 'orina' | 'gasometria';

export interface LabRange {
  min: number;
  max: number;
  unidad: string;
}

export interface LabValue {
  id: string;
  nombre: string;
  abreviatura: string;
  categoria: LabCategory;
  rangos: {
    adultoHombre?: LabRange;
    adultoMujer?: LabRange;
    adulto?: LabRange;
    pediatrico?: LabRange;
  };
  significadoAlto: string;
  significadoBajo: string;
  farmacosAlteran: string[];
  implicacionesEnfermeria: string[];
}

/** Protocolo de emergencia */
export type ProtocolCategory = 'cardiaco' | 'respiratorio' | 'neurologico' | 'metabolico' | 'sepsis' | 'trauma' | 'otro';
export type ProtocolPriority = 'critico' | 'urgente' | 'emergente';

export interface ProtocolStep {
  orden: number;
  tiempo?: string;
  accion: string;
  detalles?: string;
  critico?: boolean;
  farmacos?: {
    nombre: string;
    dosis: string;
    via: string;
  }[];
  decision?: {
    pregunta: string;
    si: string;
    no: string;
  };
}

export interface EmergencyProtocol {
  id: string;
  nombre: string;
  abreviatura?: string;
  descripcion: string;
  categoria: ProtocolCategory;
  prioridad: ProtocolPriority;
  banderasRojas: string[];
  pasos: ProtocolStep[];
  resumenFarmacos: {
    nombre: string;
    dosis: string;
    via: string;
    indicacion: string;
  }[];
  notasEnfermeria: string[];
}

/** Datos de Cuidados de Enfermería (nursing_care.json) */
export interface NursingRight {
  numero: number;
  nombre: string;
  descripcion: string;
  ejemplo: string;
}

export interface NursingAssessmentCategory {
  nombre: string;
  items: string[];
}

export interface NursingRouteCare {
  nombre: string;
  cuidados: string[];
}

export interface NursingHighRiskCategory {
  nombre: string;
  farmacos: string[];
  precauciones: string[];
}

export interface NursingProcedure {
  nombre: string;
  pasos: string[];
}

export interface NursingDocSection {
  nombre: string;
  items: string[];
}

export interface NursingCalcFormula {
  nombre: string;
  formula: string;
  ejemplo: string;
}

export interface NursingCareData {
  derechosAdministracion: {
    titulo: string;
    descripcion: string;
    items: NursingRight[];
  };
  valoracionPreAdministracion: {
    titulo: string;
    descripcion: string;
    categorias: NursingAssessmentCategory[];
  };
  cuidadosPorVia: {
    titulo: string;
    vias: NursingRouteCare[];
  };
  medicamentosAltoRiesgo: {
    titulo: string;
    descripcion: string;
    categorias: NursingHighRiskCategory[];
  };
  procedimientosEspeciales: {
    titulo: string;
    procedimientos: NursingProcedure[];
  };
  documentacionEnfermeria: {
    titulo: string;
    secciones: NursingDocSection[];
  };
  calculosFarmacologicos: {
    titulo: string;
    formulas: NursingCalcFormula[];
  };
}

/** Props de navegación */
export type RootStackParamList = {
  MainTabs: undefined;
  DrugDetail: { drugId: string; drugName?: string };
  ChapterDrugs: { chapterId: string; unitName: string; unitColor: string };
  FormulaDetail: { formulaId: string };
  RouteDetail: { routeId: RouteOfAdministration };
  GlossaryScreen: undefined;
  NursingCare: undefined;
  PathologiesScreen: undefined;
  PathologyDetail: { pathologyId: string };
  InteractionChecker: { preloadDrugId?: string } | undefined;
  Calculators: undefined;
  ClinicalScales: undefined;
  ScaleDetail: { scaleId: string };
  LabValues: undefined;
  EmergencyProtocols: undefined;
  ProtocolDetail: { protocolId: string };
  QuizScreen: undefined;
  QuizSession: { category?: string; questionCount: number };
  ParenteralGuide: undefined;
  AboutScreen: undefined;
  Dashboard: undefined;
  DrugComparison: { preloadDrugId?: string } | undefined;
  AllNotes: undefined;
  AllFavorites: undefined;
};

export type TabParamList = {
  Inicio: undefined;
  Categorias: undefined;
  Busqueda: undefined;
  Especial: undefined;
  Herramientas: undefined;
};

/** Nota personal sobre un fármaco */
export interface DrugNote {
  drugId: string;
  text: string;
  updatedAt: number; // timestamp
}

/** Entrada del historial de búsquedas */
export interface SearchHistoryEntry {
  query: string;
  timestamp: number;
}

/** Pregunta del quiz */
export interface QuizQuestion {
  id: string;
  type: 'indication' | 'contraindication' | 'route' | 'pregnancy' | 'family' | 'mechanism' | 'adverse' | 'nursing';
  questionText: string;
  options: string[];
  correctIndex: number;
  drugName: string;
}

/** Sesión activa de quiz */
export interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  startedAt: number;
}

/** Resultado de quiz completado */
export interface QuizResult {
  id: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  category: string;
  completedAt: number;
}

/** Resultado de búsqueda */
export interface SearchResult {
  drug: Drug;
  score: number;
  matchedFields: string[];
}
