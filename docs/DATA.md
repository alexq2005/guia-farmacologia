# Modelo de Datos

## Archivos JSON

Originalmente la data estuvo en `src/data/` en formatos JSON gigantescales. Hoy día operan como constructores/semillas, los cuales una vez detectados son transformados e hidratados instantáneamente a Tablas **SQLite** por `db.ts`, suprimiendo la necesidad de cargas RAM masivas.

| Archivo                    | Registros                  | Descripción                                                           |
| -------------------------- | -------------------------- | --------------------------------------------------------------------- |
| `drugs.json`               | 2,977 fármacos             | Base de datos principal farmacológica (hidratada a SQLite)            |
| `_meta.json`               | metadata 8 datasets        | Provenance, fuente canónica, fecha de revisión clínica por dataset    |
| `categories.json`          | 13 unidades, 117 capítulos | Clasificación terapéutica                                             |
| `pathologies.json`         | 60 patologías              | Enfermedades con fármacos vinculados                                  |
| `emergency_protocols.json` | 18 protocolos              | ACLS, anafilaxia, IAM, ACV, sepsis...                                 |
| `clinical_scales.json`     | 17 escalas                 | Glasgow, APGAR, Norton, Braden, NEWS2...                              |
| `lab_values.json`          | 61 valores                 | Rangos por sexo y pediátricos                                         |
| `parenteral_guide.json`    | 4 secciones                | Guía Son Espases (Introducción, Soluciones, NPT, Protección)          |
| `glossary.json`            | 205 términos               | Terminología médica                                                   |
| `formulas.json`            | 22 fórmulas                | Cálculos farmacéuticos (testeadas en `__tests__/calculators.test.ts`) |
| `routes.json`              | 15 vías                    | Vías de administración                                                |
| `emergency_drugs.json`     | 17 fármacos críticos       | Dosificación rápida de emergencia                                     |
| `antidotes.json`           | 15 antídotos               | Relación tóxico-antídoto                                              |
| `nursing_care.json`        | objeto estructurado        | Cuidados de enfermería por tipo                                       |
| `iv_compatibilities.json`  | Matriz                     | Compatibilidad fármaco-fármaco IV                                     |

> **Provenance**: cada dataset tiene metadata explícita en `_meta.json`
> (fuente canónica, fecha de edición, estado de revisión clínica). Ver
> [`SOURCES.md`](SOURCES.md) para origen de cada dataset y
> [`CLINICAL_REVIEW.md`](CLINICAL_REVIEW.md) para el procedimiento de firma
> profesional.

## Interfaz Drug (Principal)

```typescript
interface Drug {
  // === Identificación ===
  id: string; // "d_0001" - ID único
  nombre: string; // Nombre genérico principal
  nombreGenerico: string; // Nombre genérico (normalizado)
  nombresComerciales: string[]; // Marcas comerciales
  familia: string; // Familia farmacológica

  // === Clasificación ===
  clasificacion: string; // Clasificación general
  unidadId: string; // Unidad terapéutica (c01-c14)
  capituloId: string; // Capítulo dentro de la unidad
  grupoTerapeutico?: string; // ATC Level 1 (ej: "Sistema Cardiovascular")
  grupoFarmacologico?: string; // Grupo por mecanismo (ej: "IECA", "HBPM")

  // === Información Clínica ===
  mecanismoAccion: string; // Cómo actúa el fármaco
  indicaciones: string[]; // Para qué se usa
  contraindicaciones: string[]; // Cuándo NO usar
  efectosAdversos: string[]; // Efectos secundarios
  interacciones: string[]; // Interacciones con otros fármacos

  // === Dosificación ===
  viaAdministracion: RouteOfAdministration[]; // Vías (oral, IV, IM...)
  dosis: {
    adulto: string;
    pediatrico?: string;
    geriatrico?: string;
    ajusteRenal?: string;
    ajusteHepatico?: string;
  };
  presentaciones: string[]; // Formas disponibles

  // === Seguridad ===
  embarazo: PregnancyCategory; // Categoría FDA (A, B, C, D, X)
  lactancia: string; // Seguridad en lactancia

  // === Enfermería ===
  cuidadosEnfermeria: string[]; // Cuidados específicos

  // === Farmacocinética (opcional) ===
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

  // === Administración Parenteral (opcional) ===
  preparacionParenteral?: {
    reconstitucion?: string;
    dilucion?: string;
    volumenAdministracion?: string;
    velocidadAdministracion?: string;
    estabilidad?: string;
    solucionesCompatibles?: {
      ssf?: boolean | string; // Suero salino fisiológico (NaCl 0.9%)
      sg5?: boolean | string; // Suero glucosado 5%
      otras?: string;
    };
    compatibilidadNPT?: {
      // Nutrición parenteral total
      tresEnUno?: string;
      dosEnUno?: string;
      observaciones?: string;
    };
    proteccionPersonal?: string[]; // Precauciones para el personal
    medicamentoPeligroso?: boolean; // Flag de medicamento peligroso
    observaciones?: string;
  };

  // === Sobredosificación (opcional) ===
  riesgosSobremedicacion?: {
    descripcion: string;
    efectos: string[];
    manejo: string;
    alerta?: string;
  };

  // === Búsqueda (generado en runtime) ===
  searchText?: string; // Deprecated: se genera vía buildSearchText()
}
```

## Tipos Auxiliares

```typescript
type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X';

type RouteOfAdministration =
  | 'oral'
  | 'intravenosa'
  | 'intramuscular'
  | 'subcutanea'
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
```

## Categorías (categories.json)

```typescript
interface Unit {
  id: string; // "c01" a "c14"
  nombre: string; // "Sistema Cardiovascular", "Antiinfecciosos"...
  chapters: Chapter[];
}

interface Chapter {
  id: string; // "c01_01", "c01_02"...
  nombre: string; // "Antihipertensivos", "Antiarrítmicos"...
  drugCount: number;
}
```

### Unidades Terapéuticas (14)

| ID  | Nombre                     | Ejemplo de capítulos                               |
| --- | -------------------------- | -------------------------------------------------- |
| c01 | Sistema Cardiovascular     | Antihipertensivos, Antiarrítmicos, Anticoagulantes |
| c02 | Sistema Respiratorio       | Broncodilatadores, Antitusígenos                   |
| c03 | Sistema Nervioso           | Analgésicos, Anestésicos, Antipsicóticos           |
| c04 | Sistema Digestivo          | Antiácidos, Antieméticos, Laxantes                 |
| c05 | Antiinfecciosos            | Antibióticos, Antivirales, Antifúngicos            |
| c06 | Sistema Endocrino          | Antidiabéticos, Tiroides, Corticoides              |
| c07 | Sistema Musculoesquelético | AINEs, Relajantes musculares                       |
| c08 | Sistema Genitourinario     | Diuréticos, Uteroinhibidores                       |
| c09 | Dermatología               | Antifúngicos tópicos, Corticoides tópicos          |
| c10 | Oftalmología/ORL           | Colirios, Óticos                                   |
| c11 | Oncología                  | Antineoplásicos, Inmunosupresores                  |
| c12 | Sangre                     | Antianémicos, Factores de coagulación              |
| c13 | Vacunas/Inmunología        | Vacunas, Inmunoglobulinas                          |
| c14 | Otros                      | Vitaminas, Minerales, Antídotos                    |

## Patologías (pathologies.json)

```typescript
interface Pathology {
  id: string;
  nombre: string; // "Hipertensión Arterial"
  descripcion: string;
  signos: string[]; // Signos clínicos
  sintomas: string[];
  diagnostico: string[];
  tratamiento: string;
  cuidadosEnfermeria: string[];
  linkedDrugs: string[]; // IDs de fármacos relacionados
  categoria: string; // "cardiovascular", "respiratorio"...
}
```

## Protocolos de Emergencia (emergency_protocols.json)

```typescript
interface EmergencyProtocol {
  id: string;
  nombre: string; // "ACLS - Paro Cardíaco"
  descripcion: string;
  categoria: string;
  steps: {
    orden: number;
    accion: string;
    tiempo?: string; // "0:00", "2:00"...
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
  redFlags: string[]; // Señales de alarma
  notas?: string;
}
```

## Escalas Clínicas (clinical_scales.json)

```typescript
interface ClinicalScale {
  id: string;
  nombre: string; // "Escala de Glasgow"
  tipo: 'components' | 'selector' | 'checklist';
  descripcion: string;
  componentes?: {
    // tipo: components (sumable)
    nombre: string;
    opciones: { texto: string; valor: number }[];
  }[];
  opciones?: {
    // tipo: selector
    texto: string;
    valor: number;
    descripcion?: string;
  }[];
  items?: {
    // tipo: checklist
    texto: string;
    valor: number;
  }[];
  interpretacion: {
    rango: string; // "3-8", "9-12"...
    significado: string;
  }[];
}
```

## Valores de Laboratorio (lab_values.json)

```typescript
interface LabValue {
  id: string;
  nombre: string; // "Hemoglobina"
  categoria: string; // "hematología", "bioquímica"...
  unidad: string; // "g/dL", "mg/dL"...
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
  farmacosAlteran?: string[]; // Fármacos que modifican el valor
  implicacionesEnfermeria: string[];
}
```

## Datos del Usuario (AsyncStorage)

```typescript
interface DrugNote {
  drugId: string;
  text: string;
  updatedAt: number; // timestamp
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
  └── drugDoses.farmaco ────── Referencia textual a fármacos

lab_values.json
  └── farmacosAlteran ──────── Nombres de fármacos (texto)

iv_compatibilities.json
  └── Par de fármacos ──────── Compatibilidad (compatible/incompatible/variable)
```

## Tamaño de Datos

| Archivo         | Tamaño aprox. |
| --------------- | ------------- |
| drugs.json      | ~4.1 MB       |
| Resto de JSONs  | ~0.6 MB       |
| **Total datos** | **~10.5 MB**  |

Los datos solían destruir los emuladores por Heap Overflow en builds `debug`. Ahora son administrados en **modo lectura cero-costo** a través de **OP-SQLite**, una librería construida en C++ por el equipo de OPS que otorga acceso bloqueante-instantáneo sin inflar el bridge Async de React Native.
