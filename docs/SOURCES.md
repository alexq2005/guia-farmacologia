# Fuentes oficiales y referencias clínicas

Este documento describe las fuentes desde las que se construyen y mantienen
los datasets clínicos del proyecto. Su propósito es:

1. **Traceability**: dejar constancia explícita de la procedencia de cada dato.
2. **Cumplimiento HONcode / AppSaludable**: ambas certificaciones requieren
   identificación de fuentes y criterios de selección.
3. **Auditabilidad**: si un regulador o un revisor externo pide cuentas, este
   documento es el punto de partida.

La metadata por dataset (fechas, fuente concreta, criterios) vive en
[`src/data/_meta.json`](../src/data/_meta.json). Este archivo es la
descripción humana de esas fuentes.

---

## Fuentes primarias por dataset

### Fármacos (`drugs.json`)

**Fuente canónica**: AEMPS CIMA — Centro de Información online de Medicamentos.

- URL: https://cima.aemps.es/
- API REST: https://cima.aemps.es/cima/rest/
- Documentación: https://www.aemps.gob.es/apps/cima/docs/CIMA_REST_API.pdf
- Cobertura: ~15.000 medicamentos autorizados, revocados y suspendidos en
  España, ~1.600 principios activos.
- Actualización: diaria.
- Licencia: información pública, libre acceso.

**Cómo se sincroniza**: el script `scripts/fetch_cima.py` consulta la API REST
de CIMA y genera/actualiza fragmentos de `drugs.json`. Cuando se corra el
script, **debe actualizarse `_meta.datasets.drugs.lastSyncWithSource`** con
la fecha del run.

**Fuentes secundarias** (consulta para enriquecer fichas):

- Vademecum.es — base comercial pero con datos AEMPS+EMA. https://www.vademecum.es/
- Fichas técnicas EMA (Agencia Europea del Medicamento). https://www.ema.europa.eu/
- BNF (British National Formulary). Solo para contraste de buenas prácticas.

---

### Patologías (`pathologies.json`)

**Fuente canónica**: Catálogo de Guías de Práctica Clínica del Sistema
Nacional de Salud español (GuíaSalud).

- URL: https://portal.guiasalud.es/gpc/
- Cobertura: GPC validadas por instituciones del SNS.
- Licencia: contenido público.

**Cómo se mantiene**: revisión manual por patología. Cada patología debe
contrastarse con la guía vigente correspondiente (cardiovascular →
guías SEC/ESC; respiratorio → SEPAR/GOLD; etc.).

---

### Protocolos de emergencia (`emergency_protocols.json`)

**Fuente canónica**: guías internacionales de las sociedades correspondientes.

- ACLS, BLS → American Heart Association (https://cpr.heart.org/) o
  European Resuscitation Council (https://www.erc.edu/) — usar versión
  vigente (las guías se renuevan cada 5 años, próxima edición esperada 2025
  AHA / 2026 ERC consolidación).
- Sepsis → Surviving Sepsis Campaign + SEMICYUC.
- IAM/SCA → Sociedad Europea de Cardiología (ESC).
- ACV → AHA/ASA stroke guidelines.

**Crítico**: cualquier protocolo cronometrado **debe verificarse contra la
edición vigente de la guía**. Cambios en dosis o secuencia entre ediciones
son frecuentes y clínicamente significativos.

---

### Escalas clínicas (`clinical_scales.json`)

**Fuente canónica**: literatura primaria de cada escala. Cada escala fue
publicada originalmente en una revista científica con un método validado.
Ejemplos:

| Escala        | Publicación original                              |
| ------------- | ------------------------------------------------- |
| Glasgow (GCS) | Teasdale & Jennett, _The Lancet_ 1974             |
| APGAR         | Apgar, _Anesthesia and Analgesia_ 1953            |
| Norton        | Norton, _Lancet_ 1962                             |
| Braden        | Bergstrom, Braden et al., _Nursing Research_ 1987 |
| NEWS2         | Royal College of Physicians UK, 2017              |
| qSOFA         | Singer et al., _JAMA_ 2016                        |
| Wells         | Wells et al., _Lancet_ 1997                       |
| NIHSS         | Brott et al., _Stroke_ 1989                       |

Las componentes y rangos de cada escala están bloqueados por la fuente
original — **no inventar variantes**.

---

### Valores de laboratorio (`lab_values.json`)

**Fuente canónica**: rangos de referencia de manuales de laboratorio clínico.

⚠️ **Aviso importante**: los rangos de laboratorio **varían entre laboratorios**
según el método analítico, calibración y población. Los valores en
`lab_values.json` son **orientativos**. La UI advierte explícitamente que el
profesional debe contrastar con los rangos del laboratorio de su centro.

---

### Guía parenteral (`parenteral_guide.json`)

**Fuente canónica**: Guía de Administración Parenteral del Hospital
Universitario Son Espases (Mallorca, España).

- Información clínica de fármacos parenterales reside en `drugs.json` campo
  `preparacionParenteral` (460 fármacos enriquecidos).
- 33 fármacos marcados como medicamentos peligrosos según los criterios de
  la guía.

---

### Fórmulas (`formulas.json`)

**Fuente canónica**: literatura primaria de cada fórmula.

| Fórmula               | Publicación original                                      |
| --------------------- | --------------------------------------------------------- |
| Mosteller (BSA)       | Mosteller, _N Engl J Med_ 1987                            |
| Cockcroft-Gault       | Cockcroft & Gault, _Nephron_ 1976                         |
| Devine PCI            | Devine BJ, _Drug Intelligence and Clinical Pharmacy_ 1974 |
| Young (pediátrica)    | regla histórica documentada en farmacopeas                |
| Clark (pediátrica)    | regla histórica documentada en farmacopeas                |
| Anion Gap             | bioquímica clínica estándar                               |
| Osmolaridad calculada | bioquímica clínica estándar                               |
| Calcio corregido      | Payne et al., _BMJ_ 1973                                  |

Implementación testeada en
[`__tests__/calculators.test.ts`](../__tests__/calculators.test.ts) contra
valores de referencia hand-calculated de cada fórmula.

---

### Glosario (`glossary.json`)

Diccionarios médicos generales y terminología farmacológica estándar
(ej. Diccionario de la Real Academia Nacional de Medicina, glosarios
de farmacología hospitalaria).

---

## Política de actualización

| Dataset                    | Cadencia recomendada                                           | Disparador                         |
| -------------------------- | -------------------------------------------------------------- | ---------------------------------- |
| `drugs.json`               | Trimestral (ideal) o cuando cambien fichas técnicas relevantes | Run de `fetch_cima.py`             |
| `pathologies.json`         | Anual o cuando se publique GPC actualizada                     | Revisión por GuíaSalud             |
| `emergency_protocols.json` | Cuando una sociedad publica nueva edición (~5 años)            | Comunicado oficial                 |
| `clinical_scales.json`     | Solo si aparece nueva escala validada                          | Literatura                         |
| `lab_values.json`          | Anual                                                          | Revisión de manuales de referencia |
| `parenteral_guide.json`    | Cuando Son Espases publique nueva edición                      | Hospital                           |
| `formulas.json`            | Solo si aparece nueva fórmula validada                         | Literatura                         |
| `glossary.json`            | Anual                                                          | Revisión                           |

## Cómo registrar una sincronización

Cuando se actualiza un dataset desde su fuente canónica:

1. Editar el archivo JSON correspondiente.
2. **Bumpear `DATASET_VERSION` en `src/data/db.ts`** si es `drugs.json`
   (ver [`DEVELOPMENT.md`](DEVELOPMENT.md#cómo-agregar-contenido)).
3. Actualizar la entrada correspondiente en `src/data/_meta.json`:
   - `lastEdited`: hoy.
   - `lastSyncWithSource`: hoy si la edición vino de la fuente canónica.
4. **NO tocar `lastClinicalReview` ni `reviewedBy`** — eso solo lo hace un
   profesional sanitario tras una revisión completa (ver
   [`CLINICAL_REVIEW.md`](CLINICAL_REVIEW.md)).
5. Documentar el cambio en `CHANGELOG.md` `[Unreleased]`.
6. Bumpear versión de la app: `npm run version:patch`.
