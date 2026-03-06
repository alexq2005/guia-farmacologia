# Modelo de Datos

## Archivos JSON

Todos los datos clinicos estan en `src/data/` como archivos JSON embebidos. No se usa backend ni API externa.

| Archivo | Registros | Descripcion |
|---------|-----------|-------------|
| `drugs.json` | 1,781 farmacos | Base de datos principal farmacologica |
| `categories.json` | 14 unidades, 60+ capitulos | Clasificacion terapeutica |
| `pathologies.json` | 60 patologias | Enfermedades con farmacos vinculados |
| `emergency_protocols.json` | 14 protocolos | ACLS, anafilaxia, IAM, ACV, sepsis... |
| `clinical_scales.json` | 13 escalas | Glasgow, APGAR, Norton, Braden, NEWS2... |
| `lab_values.json` | 53 valores | Rangos por sexo y pediatricos |
| `parenteral_guide.json` | Guia general | Introduccion a via parenteral |
| `glossary.json` | 65+ terminos | Terminologia medica |
| `formulas.json` | 15 formulas | Calculos farmaceuticos |
| `routes.json` | 16 vias | Vias de administracion |
| `emergency_drugs.json` | Farmacos criticos | Dosificacion rapida de emergencia |
| `antidotes.json` | Antidotos | Relacion toxico-antidoto |
| `nursing_care.json` | 10+ protocolos | Cuidados de enfermeria por tipo |
| `iv_compatibilities.json` | Matriz | Compatibilidad farmaco-farmaco IV |

## Interfaz Drug (Principal)

```typescript
interface Drug {
  // === Identificacion ===
  id: string;                          // "d_0001" - ID unico
  nombre: string;                      // Nombre generico principal
  nombreGenerico: string;              // Nombre generico (normalizado)
  nombresComerciales: string[];        // Marcas comerciales
  familia: string;                     // Familia farmacologica

  // === Clasificacion ===
  clasificacion: string;               // Clasificacion general
  unidadId: string;                    // Unidad terapeutica (c01-c14)
  capituloId: string;                  // Capitulo dentro de la unidad
  grupoTerapeutico?: string;           // ATC Level 1 (ej: "Sistema Cardiovascular")
  grupoFarmacologico?: string;         // Grupo por mecanismo (ej: "IECA", "HBPM")

  // === Informacion Clinica ===
  mecanismoAccion: string;             // Como actua el farmaco
  indicaciones: string[];              // Para que se usa
  contraindicaciones: string[];        // Cuando NO usar
  efectosAdversos: string[];           // Efectos secundarios
  interacciones: string[];             // Interacciones con otros farmacos

  // === Dosificacion ===
  viaAdministracion: RouteOfAdministration[];  // Vias (oral, IV, IM...)
  dosis: {
    adulto: string;
    pediatrico?: string;
    geriatrico?: string;
    ajusteRenal?: string;
    ajusteHepatico?: string;
  };
  presentaciones: string[];            // Formas disponibles

  // === Seguridad ===
  embarazo: PregnancyCategory;         // Categoria FDA (A, B, C, D, X)
  lactancia: string;                   // Seguridad en lactancia

  // === Enfermeria ===
  cuidadosEnfermeria: string[];        // Cuidados especificos

  // === Farmacocinetica (opcional) ===
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

  // === Almacenamiento ===
  almacenamiento?: string;

  // === Administracion Parenteral (opcional) ===
  preparacionParenteral?: {
    reconstitucion?: string;
    dilucion?: string;
    volumenAdministracion?: string;
    velocidadAdministracion?: string;
    estabilidad?: string;
    solucionesCompatibles?: {
      ssf?: boolean | string;          // Suero salino fisiologico (NaCl 0.9%)
      sg5?: boolean | string;          // Suero glucosado 5%
      otras?: string;
    };
    compatibilidadNPT?: {              // Nutricion parenteral total
      tresEnUno?: string;
      dosEnUno?: string;
      observaciones?: string;
    };
    proteccionPersonal?: string[];     // Precauciones para el personal
    medicamentoPeligroso?: boolean;    // Flag de medicamento peligroso
    observaciones?: string;
  };

  // === Sobredosificacion (opcional) ===
  riesgosSobremedicacion?: {
    descripcion: string;
    efectos: string[];
    manejo: string;
    alerta?: string;
  };

  // === Busqueda (generado en runtime) ===
  searchText?: string;                 // Deprecated: se genera via buildSearchText()
}
```

## Tipos Auxiliares

```typescript
type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X';

type RouteOfAdministration =
  | 'oral' | 'intravenosa' | 'intramuscular' | 'subcutanea'
  | 'sublingual' | 'topica' | 'rectal' | 'inhalatoria'
  | 'oftalmica' | 'otica' | 'nasal' | 'transdermica'
  | 'intratecal' | 'epidural' | 'vaginal' | 'intradermica';
```

## Categorias (categories.json)

```typescript
interface Unit {
  id: string;        // "c01" a "c14"
  nombre: string;    // "Sistema Cardiovascular", "Antiinfecciosos"...
  chapters: Chapter[];
}

interface Chapter {
  id: string;        // "c01_01", "c01_02"...
  nombre: string;    // "Antihipertensivos", "Antiarritmicos"...
  drugCount: number;
}
```

### Unidades Terapeuticas (14)

| ID | Nombre | Ejemplo de capitulos |
|----|--------|---------------------|
| c01 | Sistema Cardiovascular | Antihipertensivos, Antiarritmicos, Anticoagulantes |
| c02 | Sistema Respiratorio | Broncodilatadores, Antitusigenos |
| c03 | Sistema Nervioso | Analgesicos, Anestesicos, Antipsicoticos |
| c04 | Sistema Digestivo | Antiacidos, Antiemeticos, Laxantes |
| c05 | Antiinfecciosos | Antibioticos, Antivirales, Antifungicos |
| c06 | Sistema Endocrino | Antidiabeticos, Tiroides, Corticoides |
| c07 | Sistema Musculoesqueletico | AINEs, Relajantes musculares |
| c08 | Sistema Genitourinario | Diureticos, Uteroinhibidores |
| c09 | Dermatologia | Antifungicos topicos, Corticoides topicos |
| c10 | Oftalmologia/ORL | Colirios, Oticos |
| c11 | Oncologia | Antineoplasicos, Inmunosupresores |
| c12 | Sangre | Antianemicos, Factores de coagulacion |
| c13 | Vacunas/Inmunologia | Vacunas, Inmunoglobulinas |
| c14 | Otros | Vitaminas, Minerales, Antidotos |

## Patologias (pathologies.json)

```typescript
interface Pathology {
  id: string;
  nombre: string;           // "Hipertension Arterial"
  descripcion: string;
  signos: string[];          // Signos clinicos
  sintomas: string[];
  diagnostico: string[];
  tratamiento: string;
  cuidadosEnfermeria: string[];
  linkedDrugs: string[];     // IDs de farmacos relacionados
  categoria: string;         // "cardiovascular", "respiratorio"...
}
```

## Protocolos de Emergencia (emergency_protocols.json)

```typescript
interface EmergencyProtocol {
  id: string;
  nombre: string;            // "ACLS - Paro Cardiaco"
  descripcion: string;
  categoria: string;
  steps: {
    orden: number;
    accion: string;
    tiempo?: string;          // "0:00", "2:00"...
    detalle?: string;
    critico?: boolean;
  }[];
  drugDoses: {
    farmaco: string;
    dosis: string;
    via: string;
    frecuencia?: string;
  }[];
  decisionPoints: {
    pregunta: string;
    opciones: { texto: string; siguiente: string }[];
  }[];
  redFlags: string[];         // Senales de alarma
  notas?: string;
}
```

## Escalas Clinicas (clinical_scales.json)

```typescript
interface ClinicalScale {
  id: string;
  nombre: string;            // "Escala de Glasgow"
  tipo: 'components' | 'selector' | 'checklist';
  descripcion: string;
  componentes?: {             // tipo: components (sumable)
    nombre: string;
    opciones: { texto: string; valor: number }[];
  }[];
  opciones?: {                // tipo: selector
    texto: string;
    valor: number;
    descripcion?: string;
  }[];
  items?: {                   // tipo: checklist
    texto: string;
    valor: number;
  }[];
  interpretacion: {
    rango: string;            // "3-8", "9-12"...
    significado: string;
  }[];
}
```

## Valores de Laboratorio (lab_values.json)

```typescript
interface LabValue {
  id: string;
  nombre: string;            // "Hemoglobina"
  categoria: string;         // "hematologia", "bioquimica"...
  unidad: string;            // "g/dL", "mg/dL"...
  rangos: {
    male?: { min: number; max: number };
    female?: { min: number; max: number };
    pediatric?: { min: number; max: number };
    general?: { min: number; max: number };
  };
  significado: {
    alto: string;
    bajo: string;
  };
  farmacosAlteran?: string[];  // Farmacos que modifican el valor
  implicacionesEnfermeria: string[];
}
```

## Datos del Usuario (AsyncStorage)

```typescript
interface DrugNote {
  drugId: string;
  text: string;
  updatedAt: number;         // timestamp
}

interface SearchHistoryEntry {
  query: string;
  timestamp: number;
}

interface QuizResult {
  date: number;
  score: number;
  total: number;
  category?: string;
  questionType?: string;
}
```

## Relaciones entre Datos

```
categories.json
  └── Unit.id ──────────────── Drug.unidadId
       └── Chapter.id ─────── Drug.capituloId

pathologies.json
  └── Pathology.linkedDrugs ── Drug.id (array de IDs)

emergency_protocols.json
  └── drugDoses.farmaco ────── Referencia textual a farmacos

lab_values.json
  └── farmacosAlteran ──────── Nombres de farmacos (texto)

iv_compatibilities.json
  └── Par de farmacos ──────── Compatibilidad (compatible/incompatible/variable)
```

## Tamano de Datos

| Archivo | Tamano aprox. |
|---------|--------------|
| drugs.json | ~4.1 MB |
| Resto de JSONs | ~0.6 MB |
| **Total datos** | **~4.7 MB** |

Los datos se cargan una sola vez al inicio y se mantienen en memoria. El campo `searchText` se genera en runtime via `buildSearchText()` para ahorrar ~1.2MB en el bundle.
