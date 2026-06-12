# Bloque 1 — Revisión Clínica Pendiente (50 fármacos alto-riesgo)

> Lista priorizada según [docs/CLINICAL_REVIEW.md](../CLINICAL_REVIEW.md) sección "Bloque 1".
> Auto-generada el 2026-05-22 por `scripts/_gen_bloque1.js`. Refleja estado actual de cada fármaco en el dataset.

## Cómo usar este documento

1. Para cada categoría, abrí la ficha del fármaco en la app (o leé el JSON directo).
2. Compará contra la fuente canónica (CIMA / Vademécum ANMAT / Goodman & Gilman).
3. Cuando hayas terminado la revisión de un fármaco, marcá ☑ en la columna "Revisado".
4. Cuando hayas terminado todo el bloque, seguí el procedimiento en `docs/CLINICAL_REVIEW.md` sección "Cómo firmar la revisión".

## Estado actual de campos clínicos críticos

Leyenda de columnas:

- **FC**: subcampos populados en `farmacocinetica` (de 8 posibles). ≥3 = ✓ útil, <3 = ⚠ parcial.
- **AR**: `dosis.ajusteRenal` presente.
- **AH**: `dosis.ajusteHepatico` presente.
- **Ped**: `dosis.pediatrico` presente.
- **PP**: `preparacionParenteral` presente (vía IV/IM/SC).
- **Almac**: `almacenamiento` presente.

### Anticoagulantes

| Drug            | ID                        | Nombre completo                                         | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| --------------- | ------------------------- | ------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| heparina sodica | `heparina`                | Heparina No Fraccionada                                 | ✓4  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `heparina_infusion` (Heparina infusión continua)        |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| enoxaparina     | `enoxaparina`             | Enoxaparina                                             | ✓5  |  ✓  |  ✗  |  ✗  |  ✓  |   ✓   |    ☐     |
| dalteparina     | `dalteparina`             | Dalteparina                                             | ⚠0  |  ✗  |  ✗  |  ✗  |  —  |   ✗   |    ☐     |
| tinzaparina     | `tinzaparina`             | Tinzaparina                                             | ⚠0  |  ✓  |  ✗  |  ✗  |  ✓  |   ✗   |    ☐     |
| warfarina       | `warfarina`               | Warfarina                                               | ✓5  |  ✗  |  ✗  |  ✗  |  —  |   ✓   |    ☐     |
| acenocumarol    | `acenocumarol`            | Acenocumarol                                            | ✓8  |  ✗  |  ✗  |  ✗  |  —  |   ✓   |    ☐     |
| apixaban        | `apixaban`                | Apixaban                                                | ✓8  |  ✓  |  ✗  |  ✗  |  —  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `apixaban_detalle` (Apixabán Tromboprofilaxis)          |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| rivaroxaban     | `rivaroxaban`             | Rivaroxabán                                             | ✓8  |  ✓  |  ✓  |  ✓  |  —  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `rivaroxaban_profilaxis` (Rivaroxabán Tromboprofilaxis) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| dabigatran      | `dabigatran`              | Dabigatrán                                              | ✓8  |  ✓  |  ✓  |  ✓  |  —  |   ✓   |    ☐     |
| edoxaban        | `edoxaban`                | Edoxabán                                                | ✓7  |  ✗  |  ✗  |  ✗  |  —  |   ✓   |    ☐     |

### Insulinas

| Drug               | ID                        | Nombre completo                                                   | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| ------------------ | ------------------------- | ----------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| insulina regular   | `insulina_regular`        | Insulina Regular (Cristalina)                                     | ✓3  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `insulina_infusion` (Insulina infusión)                           |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| insulina NPH       | `insulina_nph`            | Insulina NPH (Isófana)                                            | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
| insulina glargina  | `insulina_glargina`       | Insulina glargina                                                 | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `insulina_glargina_lixisenatida` (Insulina Glargina/Lixisenatida) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| insulina detemir   | `insulina_detemir`        | Insulina Detemir                                                  | ✓8  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `insulina_detemir_detalle` (Insulina Detemir (detalle clínico))   |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| insulina lispro    | `insulina_lispro`         | Insulina lispro                                                   | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
| insulina aspart    | `insulina_aspart`         | Insulina Aspart                                                   | ✓8  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `cima_insulina_asparta_bifasica` (Insulina Asparta Bifásica)      |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| insulina glulisina | `insulina_glulisina`      | Insulina Glulisina                                                | ⚠0  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
| insulina degludec  | `insulina_degludec`       | Insulina Degludec                                                 | ✓8  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `insulina_degludec_liraglutida` (Insulina Degludec/Liraglutida)   |  —  |  —  |  —  |  —  |  —  |   —   |    —     |

### Opioides

| Drug          | ID                        | Nombre completo                                                                                                                                                          | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| morfina       | `morfina`                 | Morfina                                                                                                                                                                  | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `apomorfina` (Apomorfina), `morfina_infusion` (Morfina infusión UCI)                                                                                                     |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| fentanilo     | `fentanilo`               | Fentanilo                                                                                                                                                                | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `remifentanilo` (Remifentanilo), `sufentanilo` (Sufentanilo), `alfentanilo` (Alfentanilo)                                                                                |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| oxicodona     | `oxicodona`               | Oxicodona                                                                                                                                                                | ✓8  |  ✓  |  ✓  |  ✓  |  —  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `oxicodona_naloxona` (Oxicodona/Naloxona)                                                                                                                                |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| metadona      | `metadona`                | Metadona                                                                                                                                                                 | ✓6  |  ✓  |  ✓  |  ✗  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `metadona_iv` (Metadona IV), `cima_levometadona` (Levometadona), `drug2874` (Metadona)                                                                                   |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| tramadol      | `tramadol`                | Tramadol                                                                                                                                                                 | ✓6  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `cima_tramadol___celecoxib` (Tramadol + Celecoxib), `cima_tramadol___dexketoprofeno` (Tramadol + Dexketoprofeno), `cima_tramadol___paracetamol` (Tramadol + Paracetamol) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| remifentanilo | `remifentanilo`           | Remifentanilo                                                                                                                                                            | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `remifentanilo_infusion` (Remifentanilo infusión)                                                                                                                        |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| sufentanilo   | `sufentanilo`             | Sufentanilo                                                                                                                                                              | ✓8  |  ✓  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |

### Sedantes/anestesicos IV

| Drug            | ID                        | Nombre completo                                                                                                                                                                 | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| propofol        | `propofol`                | Propofol                                                                                                                                                                        | ✓5  |  ✗  |  ✗  |  ✗  |  ✓  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `propofol_infusion` (Propofol infusión UCI)                                                                                                                                     |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| midazolam       | `midazolam`               | Midazolam                                                                                                                                                                       | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `midazolam_anestesia` (Midazolam (anestesia)), `midazolam_infusion` (Midazolam infusión UCI), `midazolam_emergencia` (Midazolam Emergencia)                                     |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| ketamina        | `ketamina`                | Ketamina                                                                                                                                                                        | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `esketamina_nasal` (Esketamina Nasal), `ketamina_infusion` (Ketamina (Infusión analgésica)), `ketamina_sedacion` (Ketamina sedación)                                            |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| etomidato       | `etomidato`               | Etomidato                                                                                                                                                                       | ✓6  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
| dexmedetomidina | `dexmedetomidina`         | Dexmedetomidina                                                                                                                                                                 | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `dexmedetomidina_intranasal` (Dexmedetomidina intranasal (Sedación pediátrica)), `dexmedetomidina_infusion` (Dexmedetomidina infusión), `drug3099` (Dexmedetomidina (delirium)) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| succinilcolina  | `succinilcolina`          | Succinilcolina (Suxametonio)                                                                                                                                                    | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
| rocuronio       | `rocuronio`               | Rocuronio                                                                                                                                                                       | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
| cisatracurio    | `cisatracurio`            | Cisatracurio                                                                                                                                                                    | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|                 | _alternativas en dataset_ | `cisatracurio_detalle2` (Cisatracurio (Infusión UCI))                                                                                                                           |  —  |  —  |  —  |  —  |  —  |   —   |    —     |

### Vasoactivos

| Drug          | ID                        | Nombre completo                                                                                                                                          | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| ------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| noradrenalina | `noradrenalina`           | Noradrenalina (Norepinefrina)                                                                                                                            | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `noradrenalina_titulable` (Noradrenalina (protocolo de titulación)), `noradrenalina_emergencia` (Noradrenalina (emergencia))                             |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| adrenalina    | `noradrenalina`           | Noradrenalina (Norepinefrina)                                                                                                                            | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `adrenalina` (Adrenalina (Epinefrina)), `noradrenalina_titulable` (Noradrenalina (protocolo de titulación)), `epinefrina_inhalada` (Epinefrina inhalada) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| dopamina      | `dopamina`                | Dopamina                                                                                                                                                 | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `dopamina_emergencia` (Dopamina (emergencia))                                                                                                            |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| dobutamina    | `dobutamina`              | Dobutamina                                                                                                                                               | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
| nitroprusiato | `nitroprusiato`           | Nitroprusiato de sodio                                                                                                                                   | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `nitroprusiato_infusion` (Nitroprusiato de Sodio)                                                                                                        |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| vasopresina   | `vasopresina`             | Vasopresina (ADH)                                                                                                                                        | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `vasopresina_rcp` (Vasopresina RCP), `vasopresina_infusion` (Vasopresina infusión), `drug2815` (Vasopresina)                                             |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| levosimendan  | `levosimendan`            | Levosimendán                                                                                                                                             | ✓8  |  ✗  |  ✗  |  ✗  |  ✓  |   ✓   |    ☐     |
|               | _alternativas en dataset_ | `levosimendan_infusion` (Levosimendán Infusión), `cima_levosimendan` (Levosimendan), `drug2811` (Levosimendan)                                           |  —  |  —  |  —  |  —  |  —  |   —   |    —     |

### Antiarritmicos

| Drug       | ID                        | Nombre completo                                                                                                                                      | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| amiodarona | `amiodarona`              | Amiodarona                                                                                                                                           | ✓6  |  ✗  |  ✗  |  ✗  |  ✓  |   ✓   |    ☐     |
|            | _alternativas en dataset_ | `amiodarona_emergencia` (Amiodarona (emergencia)), `amiodarona_infusion` (Amiodarona infusión), `drug2843` (Amiodarona (SVA))                        |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| lidocaina  | `lidocaina`               | Lidocaína                                                                                                                                            | ✓4  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|            | _alternativas en dataset_ | `lidocaina_antiarritmico` (Lidocaína (Antiarrítmica)), `lidocaina_parche` (Lidocaína Parche Tópico), `lidocaina_emergencia` (Lidocaína (emergencia)) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| adenosina  | `adenosina`               | Adenosina                                                                                                                                            | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|            | _alternativas en dataset_ | `adenosina_arritmia` (Adenosina (antiarrítmico))                                                                                                     |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| digoxina   | `digoxina`                | Digoxina                                                                                                                                             | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|            | _alternativas en dataset_ | `digibind` (Anticuerpos anti-digoxina), `metildigoxina` (Metildigoxina)                                                                              |  —  |  —  |  —  |  —  |  —  |   —   |    —     |

### Electrolitos concentrados

| Drug               | ID                        | Nombre completo                                                                                                                                                                    | FC  | AR  | AH  | Ped | PP  | Almac | Revisado |
| ------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :---: | :------: |
| potasio cloruro    | `potasio_cloruro`         | Cloruro de potasio                                                                                                                                                                 | ✓8  |  ✓  |  ✓  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `cloruro_potasio` (Cloruro de Potasio), `cloruro_potasio_iv` (Cloruro de potasio IV), `cima_glucosa___potasio_cloruro` (Glucosa + Potasio Cloruro)                                 |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| sulfato magnesio   | `sulfato-magnesio`        | Sulfato de Magnesio                                                                                                                                                                | ⚠2  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `sulfato_magnesio_obstetrico` (Sulfato de Magnesio (Obstétrico)), `sulfato_magnesio_emergencia` (Sulfato de Magnesio (Emergencia)), `sulfato_magnesio_iv` (Sulfato de magnesio IV) |  —  |  —  |  —  |  —  |  —  |   —   |    —     |
| bicarbonato sodico | `drug2847`                | Bicarbonato sodico                                                                                                                                                                 | ⚠0  |  ✓  |  ✓  |  ✓  |  —  |   ✗   |    ☐     |
| gluconato calcio   | `gluconato_calcio`        | Gluconato de Calcio                                                                                                                                                                | ✓8  |  ✗  |  ✗  |  ✓  |  ✓  |   ✓   |    ☐     |
|                    | _alternativas en dataset_ | `gluconato_calcio_iv` (Gluconato de calcio IV), `cima_calcio_gluconato` (Calcio Gluconato), `drug2846` (Calcio (SVA))                                                              |  —  |  —  |  —  |  —  |  —  |   —   |    —     |

## Resumen ejecutivo

| Métrica                   | Valor         |
| ------------------------- | ------------- |
| Drugs en lista Bloque 1   | **48**        |
| Encontrados en dataset    | **48** (100%) |
| No encontrados            | 0             |
| Con FC útil (≥3 subs)     | 37 / 48 (77%) |
| Con ajusteRenal           | 25 / 48 (52%) |
| Con ajusteHepatico        | 21 / 48 (44%) |
| Con dosis.pediatrico      | 37 / 48 (77%) |
| Con preparacionParenteral | 39 / 48 (81%) |

## Próximo paso

1. Revisar ítem por ítem con tu credencial profesional al lado.
2. Cualquier fix técnico (typo, dosis desactualizada, contraindicación faltante) → commit normal con `fix(data): <fármaco>`.
3. Si una entrada tiene **alternativas** listadas, decidir cuál es la canónica y mergear/eliminar duplicados.
4. Cuando todos los ☐ pasen a ☑, firmar la revisión per `docs/CLINICAL_REVIEW.md` sección "Cómo firmar la revisión":
   - Editar `_meta.json drugs.lastClinicalReview`, `reviewedBy`, `reviewerCredential`
   - Editar `_meta.responsible` (top-level) si está null
   - Commit + `npm run version:patch` → release a Play Store

## Notas regionales acumuladas (Argentina)

> Conocimiento regional verificado durante el enriquecimiento de fármacos de
> alto uso. Fuente base AEMPS-CIMA + Pediamécum (AEPED); la práctica argentina
> manda cuando difiere. Última actualización: 2026-06-11.

### Nombres comerciales argentinos confirmados

- **Heparina sódica**: Heparina Sódica Richmond, Hepatriet (Craveri).
- **Metamizol (dipirona)**: Novalgina; en AR se la nombra habitualmente
  "dipirona" más que "metamizol".
- **Salbutamol**: Ventolin (GSK), Salbutral, Assal, Buto Asma.
- **Vancomicina**: Vancomicina Richmond, Vancomicina Fada.
- **Enoxaparina**: Clexane, además de genéricos locales (Dramaxide, Endorad).
- **Ondansetrón**: Zofran, Ondax, Modifical, Onsetrogen.

### Deltas de práctica / seguridad relevantes

- **Vancomicina**: el estándar de monitorización vigente (IDSA 2020) es
  **AUC/CIM 400-600**; el valle 15-20 mcg/mL se conserva como objetivo donde no
  se calcula AUC. Pediatría/neonatos siempre por niveles (inmadurez renal).
- **Amiodarona IV**: contiene **alcohol bencílico** → contraindicada en
  prematuros, neonatos y **< 3 años**. Diluir SOLO en SG5% (precipita en SF);
  equipo libre de PVC/DEHP.
- **Ondansetrón**: techo de **16 mg IV** por riesgo de QT/torsades; máx
  **8 mg/día** en insuficiencia hepática grave.
- **Enoxaparina pediátrica**: dosificar por **anti-Xa** (objetivo 0,5-1 U/mL);
  NO usar pauta cada 24h en niños (mayor aclaramiento).
- **Cloruro de potasio IV**: nunca en bolo; máx periférica clásica 10 mEq/h y
  40 mEq/L de concentración. Alto riesgo: doble verificación.

### Corrección de datos

- Se depuraron notas editoriales que estaban mal ubicadas dentro de
  `nombresComerciales` (no eran marcas): ondansetrón y enoxaparina.

## Regenerar este documento

Si querés re-snapshot del estado tras cambios en `drugs.json`:

```bash
node scripts/_gen_bloque1.js
```
