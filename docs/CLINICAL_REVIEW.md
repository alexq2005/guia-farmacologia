# Protocolo de Revisión Clínica

Este documento define el procedimiento que debe seguir un profesional
sanitario para hacer una **revisión clínica formal** de los datasets del
proyecto. La revisión clínica es lo que llena los campos
`lastClinicalReview`, `reviewedBy` y `reviewerCredential` en
[`src/data/_meta.json`](../src/data/_meta.json).

> **Importante**: una "edición técnica" del JSON (corregir un typo, agregar
> un fármaco, sincronizar con CIMA) **no es** una revisión clínica. La
> revisión clínica es un acto profesional con responsabilidad asociada.

---

## ¿Quién puede firmar una revisión?

Personas con credencial sanitaria habilitada para emitir información
farmacológica/clínica:

- Farmacéutico colegiado
- Médico colegiado (especialidades relevantes según dataset)
- Enfermero/a colegiado/a (con énfasis en farmacología clínica)

El nombre y la credencial del revisor se almacenan en `_meta.json`
explícitamente. Esto es un compromiso de responsabilidad: el revisor está
dejando constancia de que el contenido cumple con el estándar profesional
en la fecha indicada.

---

## Antes de empezar

1. Acceso a fuentes canónicas vigentes (ver [`SOURCES.md`](SOURCES.md)).
2. Tiempo suficiente: una revisión completa de `drugs.json` (2.977 fármacos)
   no es razonable de hacer en una sola sesión. Ver "Estrategia por bloques"
   abajo.
3. Decisión sobre alcance: ¿revisión completa o muestreo? Ambos son
   válidos si se documenta el alcance.

---

## Estrategia por bloques (recomendada)

En lugar de "revisar 2.977 fármacos", priorizar por **riesgo clínico** y
**frecuencia de uso**.

### Bloque 1 — Fármacos de alto riesgo (50 fármacos)

Si hay un solo bloque que revisar, es éste. Son los fármacos con mayor
potencial de daño en caso de error de dosis o administración:

**Anticoagulantes**: heparina sódica, heparina de bajo peso (enoxaparina,
dalteparina, tinzaparina), warfarina, acenocumarol, apixabán, rivaroxabán,
dabigatrán, edoxabán.

**Insulinas**: regular, NPH, glargina, detemir, lispro, aspart, glulisina,
degludec.

**Opioides**: morfina, fentanilo, oxicodona, metadona, tramadol, remifentanilo,
sufentanilo.

**Sedantes/anestésicos IV**: propofol, midazolam, ketamina, etomidato,
dexmedetomidina, succinilcolina, rocuronio, cisatracurio.

**Vasoactivos**: noradrenalina, adrenalina, dopamina, dobutamina,
nitroprusiato, vasopresina, levosimendán.

**Antiarrítmicos**: amiodarona, lidocaína, adenosina, digoxina.

**Quimioterapia citotóxica** (los 33 marcados como medicamentos peligrosos
en la guía Son Espases).

**Electrolitos concentrados**: cloruro potásico IV, sulfato magnesio IV,
bicarbonato sódico, gluconato cálcico.

### Bloque 2 — Emergencias (todos los protocolos + dosis de los fármacos del

carro de paro)

- 18 protocolos en `emergency_protocols.json` — verificar contra ediciones
  vigentes de AHA/ERC/SEMICYUC.
- Fármacos del carro de paro: adrenalina, amiodarona, atropina, naloxona,
  flumazenil, glucagón, glucosado 50%, sulfato de magnesio, bicarbonato,
  cloruro de calcio.

### Bloque 3 — Pediatría

Revisar dosis pediátricas de los 50 fármacos del Bloque 1, más los más
usados en pediatría (paracetamol, ibuprofeno, ondansetrón, dexametasona,
salbutamol, ceftriaxona, amoxicilina, mupirocina).

### Bloque 4 — Calculadoras

Las 22 fórmulas de `formulas.json` ya tienen tests automáticos
(`__tests__/calculators.test.ts`) que verifican los cálculos contra
valores hand-calculated. La revisión clínica adicional consiste en:

1. Verificar que la implementación matemática sigue siendo la canónica
   (Mosteller, Cockcroft-Gault, etc.) según la última publicación de
   referencia.
2. Verificar que las descripciones y unidades en `formulas.json` son
   correctas y pedagógicamente claras.

### Bloque 5 — Resto

Cuando los bloques 1-4 estén firmados, atacar el resto en orden alfabético
por sección terapéutica.

---

## Procedimiento por ítem

Para cada fármaco/protocolo/escala revisado:

1. **Abrir la ficha** en la app o leer directamente el JSON.
2. **Comparar** contra la fuente canónica:
   - Para fármacos: ficha técnica AEMPS CIMA del producto correspondiente.
   - Para protocolos: edición vigente de la guía de la sociedad.
   - Para escalas: publicación original (ya validadas, normalmente solo se
     revisa que las componentes estén correctas).
3. **Anotar discrepancias**:
   - Diferencias en dosis (adulto/pediátrico/renal/hepático).
   - Indicaciones desactualizadas.
   - Contraindicaciones nuevas (alertas FDA/EMA reciente).
   - Efectos adversos relevantes faltantes.
   - Interacciones críticas faltantes.
4. **Decisión**:
   - Si la discrepancia es menor (estilo, terminología): hacer commit con
     el fix.
   - Si la discrepancia es clínicamente significativa (cambia decisión de
     dosis): hacer commit + dejar constancia explícita en el commit
     message + bumpear `DATASET_VERSION`.

---

## Cómo firmar la revisión

Cuando un bloque (o el dataset completo) está revisado:

1. Editar `src/data/_meta.json` para el dataset correspondiente:

   ```json
   "lastClinicalReview": "2026-MM-DD",
   "reviewedBy": "Nombre Apellido",
   "reviewerCredential": "Farmacéutico colegiado COF-12345"
   ```

2. Editar `responsible` (top-level) si todavía está null:

   ```json
   "responsible": {
     "name": "Nombre Apellido",
     "credential": "Farmacéutico colegiado COF-12345",
     "contact": "alexq2005@gmail.com"
   }
   ```

3. Documentar el alcance de la revisión en
   `CHANGELOG.md` `[Unreleased] → Changed`:

   ```
   - Revisión clínica firmada de drugs.json (Bloque 1: 50 fármacos de alto
     riesgo) por [Nombre], [Credencial] el 2026-MM-DD.
   ```

4. Bumpear versión: `npm run version:patch`.

5. Confirmar que el test de schema pasa
   (`npx jest __tests__/dataset-meta.test.ts`).

6. Build + release a Play Store.

A partir de ese momento la app muestra "✓ Revisado clínicamente: [fecha] ·
[Nombre]" en lugar de "Pendiente revisión clínica" — tanto en
DrugDetailScreen (para el dataset `drugs`) como en AboutScreen (para todos
los datasets).

---

## Periodicidad recomendada

Una vez firmada una revisión, no es eterna. Sugerencia:

| Dataset                              | Frecuencia                                            |
| ------------------------------------ | ----------------------------------------------------- |
| `drugs.json` (alto riesgo, Bloque 1) | Anual mínimo, idealmente semestral                    |
| `drugs.json` (resto)                 | Anual                                                 |
| `emergency_protocols.json`           | Cuando AHA/ERC publica nueva edición                  |
| `clinical_scales.json`               | Solo si la escala se actualiza                        |
| `lab_values.json`                    | Anual                                                 |
| `parenteral_guide.json`              | Cuando Son Espases publica nueva edición              |
| `formulas.json`                      | Solo si aparece evidencia que invalide alguna fórmula |
| `glossary.json`                      | Bienal                                                |

Si pasa más tiempo del recomendado sin revisar, **considerar volver al
estado "Pendiente"** (poner de nuevo `lastClinicalReview: null`) hasta que
se revise. Es más honesto con el usuario que dejar una revisión vencida.

---

## Caso especial: fármacos retirados o nuevas alertas

Si AEMPS, EMA o FDA emiten una alerta de seguridad que afecta a un fármaco
en el dataset:

1. **Acción inmediata**: editar la ficha agregando la alerta o marcando el
   fármaco como retirado, según corresponda.
2. **Bumpear `DATASET_VERSION`** para que llegue a usuarios existentes.
3. **No esperar a la próxima revisión programada** — release patch
   inmediato.
4. Documentar en CHANGELOG con el ID de la alerta (ej:
   "AEMPS NIINFP/2026/03 — retirada de [fármaco]").
