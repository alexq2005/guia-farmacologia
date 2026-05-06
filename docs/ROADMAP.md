# Roadmap

> Documento canónico de planificación técnica. Reemplaza el calendario fechado
> de [`playstore/PLAN_ACTUALIZACIONES.md`](../playstore/PLAN_ACTUALIZACIONES.md)
> (que se mantiene como referencia direccional de marketing).
>
> **Última actualización**: Mayo 2026 · Estado actual: preparando re-release de
> v1.0 con infraestructura sólida.

---

## Filosofía

1. **Versionado**: SemVer. La versión es la **única fuente de verdad** de qué
   contiene la APK que está en manos del usuario. Sin marketing, sin "v2.0
   experience" como nombre comercial — versión técnica = versión visible.

   - `1.0` (Major.Minor) — lo que ve el usuario en AboutScreen.
   - `1.0.0` (Major.Minor.Patch) — versión técnica completa en `build.gradle`
     y `package.json`.
   - `versionCode` (Android) — entero monótono, sube +1 en cada release a
     Play Store, **independiente de SemVer**.

2. **Estabilidad antes que features**. Una release rota destruye más
   credibilidad que diez releases sin features nuevas. La regla:

   > Si rompe algo, no se publica. Si no agrega valor demostrable al
   > profesional de enfermería, no se publica.

3. **Cada release debe poder revertirse**. Antes de subir a Play Store
   production, mínimo 24h en track interno o closed alpha. Una release
   rota se revierte con `git revert <sha>` + nuevo `npm run version:patch`.

4. **Las fechas en este roadmap son indicativas, no contractuales.** El orden
   de versiones SÍ es contractual.

---

## v1.0 — release actual (Mayo 2026)

**Estado**: lista para publicar tras la sesión de infraestructura del 5-6 de
mayo de 2026. versionCode subirá de 3 a 4 al re-publicar; versionName sigue
siendo `"1.0.0"` (`v1.0` en UI).

**Esto NO es una feature release** — es un re-ship de v1.0 con la base sana
necesaria para que cualquier release futura sea entregable de forma
confiable.

### Qué incluye respecto a la versionCode 3 publicada

**Bugs runtime resueltos** (todos llegaron a producción):

- Sistema de hidratación SQLite no propagaba cambios de `drugs.json` a
  usuarios existentes. Ahora hay migraciones explícitas con
  `DATASET_VERSION`.
- Sección "Patologías relacionadas" en `DrugDetailScreen` siempre estaba
  vacía por un comparador roto (`f.drugId === drug.id` sobre array de
  strings).
- `useMemo` condicional en `FormulaDetailScreen` violaba Rules of Hooks
  (potencial crash con formula ID inválido).
- Inconsistencia clínica en codificación de "sexo" entre f10/f16/f19
  (cada una esperaba un valor numérico distinto para "mujer"). Riesgo:
  Cockcroft-Gault de mujer calculado como hombre → menor ajuste renal →
  toxicidad de aminoglucósidos.

**Infraestructura nueva**:

- Sistema de migraciones SQLite (schema + dataset versioning)
- Suite de 109 tests (calculadoras hand-calculated, schema integrity,
  referential integrity entre datasets)
- CI con GitHub Actions (typecheck + lint + test bloqueantes)
- Pre-commit hooks (prettier) + pre-push hooks (typecheck)
- Sistema de provenance (`_meta.json`) con fecha de revisión por dataset
- UI: banner de procedencia en `DrugDetailScreen`, sección de revisión
  por dataset en `AboutScreen`
- Crash reporting scaffold (no-op, listo para activar Sentry/Crashlytics)
- Compliance Google Play 2026 (disclaimer wording, declaración Health apps)
- MiSuite — hub cross-app del ecosistema (Curso + Patologías + Farmacológica)

**Refactors técnicos**:

- `calculateResult` extraída de `FormulaDetailScreen` a
  `src/utils/calculators.ts` (testeable)
- TypeScript baseline limpio (8 errores pre-existentes resueltos)
- Lint baseline a 0 errors (549 warnings restantes, no bloqueantes)
- 173 PNGs movidos de root a `screenshots/`, 76 scripts históricos
  archivados
- Documentación re-sincronizada con conteos reales

### Pendiente antes de subir v1.0 al store

- [ ] Hostear `docs/privacy-policy.html` en URL pública (GitHub Pages
      gratis recomendado).
- [ ] Verificar que el formulario "Health apps declaration" en Play Console
      esté completado.
- [ ] Decidir si activar Sentry/Crashlytics ANTES o DESPUÉS de v1.0
      (afecta privacy policy).
- [ ] Build APK release firmado (premium + free).
- [ ] Test manual end-to-end en device físico.
- [ ] Subir AAB a track interno → 24-48h smoke test → producción.

### Lo que NO incluye v1.0

- Revisión clínica firmada (`_meta.lastClinicalReview` sigue siendo `null`
  para todos los datasets). La UI muestra "Pendiente revisión clínica"
  honestamente.
- Sentry/Crashlytics activo (scaffold listo, provider real pendiente).
- iOS (Android-only).

---

## v1.1 — Observabilidad y revisión clínica firmada

**Tema central**: hacer la app **defendible profesionalmente** y poder
diagnosticar problemas en producción.

**Bump**: `npm run version:minor` (1.0.0 → 1.1.0, versionCode +1).

**Foco**:

- **Crash reporting activo**:
  - Crear cuenta en proveedor elegido (Sentry recomendado, Crashlytics o
    GlitchTip self-hosted como alternativas — ver
    [`CRASH_REPORTING.md`](CRASH_REPORTING.md))
  - Reemplazar `consoleProvider` en `src/utils/crashReporting.ts`
  - Configurar release tracking con `versionName`
  - Subida automática de sourcemaps en build de release
  - **Actualizar privacy policy** (URL pública) con mención del proveedor
    antes de la release
- **Primera revisión clínica firmada (Bloque 1: 50 fármacos de alto riesgo)**:
  - Contactar farmacéutico/médico/enfermero colegiado
  - Revisión según procedimiento en
    [`CLINICAL_REVIEW.md`](CLINICAL_REVIEW.md)
  - Llenar `_meta.responsible.name` y `lastClinicalReview` de `drugs.json`
  - UI cambia automáticamente de "Pendiente" a "✓ Revisado"
- **Solicitud HONcode**: con `_meta.responsible` firmado, presentar
  candidatura a https://www.hon.ch/HONcode/ (gratis, 1 año validez)

**Definition of done**: app con crash reports llegando al dashboard del
proveedor + al menos un dataset con badge verde "✓ Revisado".

---

## v1.2 — UX y descubrimiento

**Tema central**: facilitar que el usuario **encuentre lo que necesita más
rápido**, sin tocar contenido clínico.

**Bump**: `version:minor`.

**Candidatos** (priorización pendiente):

- **Búsqueda por voz**: micrófono en `SearchBar` → speech-to-text → query.
  Librería candidata: `@react-native-voice/voice`. Permiso
  `RECORD_AUDIO`. Trade-off: agrega permiso visible al usuario y dependencia.
- **Filtros guardados**: el usuario marca filtros frecuentes (ej:
  "Pediátricos vía IV") y los recupera con un toque.
- **Ordenamiento configurable** en lista de fármacos (alfabético / unidad /
  más visitados).
- **Dark mode más granular**: respetar tema del sistema durante el día y
  cambiar automáticamente.
- **Mejora de Home**: card grande de "Fármaco del día" reemplazada por
  "Continuar donde quedaste" si hay actividad reciente.

**Definition of done**: smoke test muestra reducción medible en taps
necesarios para llegar a las 10 fichas más consultadas.

---

## v1.3 — Contenido nuevo (con revisión)

**Tema central**: **expandir** lo que la app sabe, **manteniendo la barra
clínica alta**.

**Bump**: `version:minor`. Si crece mucho el dataset y rompe APK size limit,
considerar subir a `2.0`.

**Candidatos**:

- **+40 patologías** (objetivo: 100 totales) con fármacos vinculados.
  Bumpear `_meta.pathologies.lastEdited` y `lastClinicalReview` (revisión
  clínica obligatoria).
- **+5 escalas clínicas**: Downton, TISS-28, Child-Pugh, SOFA, Karnofsky.
- **+5 protocolos de emergencia**: transfusión sanguínea, sedación
  consciente, dolor agudo, aislamiento, donación de órganos.
- **Expansión guía parenteral**: pasar de 460 fármacos enriquecidos a 800.
- **Cobertura latinoamericana**: revisar cuáles fármacos de
  vademécums LATAM (ANMAT Argentina, ISP Chile, INVIMA Colombia, COFEPRIS
  México) faltan respecto al base CIMA.

**Riesgo**: si el dataset crece mucho, `drugs.json` podría pasar el límite
de 100MB del APK. Mitigación: comprimir JSON, mover datos no críticos a
download bajo demanda en una versión futura.

---

## v2.0 — iOS y arquitectura unificada

**Tema central**: ampliar plataforma sin romper Android.

**Bump**: `version:major` (2.0.0).

**Cuándo hacerlo**: cuando v1.x esté estable, con HONcode firmado, con
revisión clínica al menos sobre Bloque 1 + 2 (drugs alto-riesgo +
emergencias), y haya demanda iOS demostrable.

**Foco**:

- **Build iOS** del mismo código (RN ya soporta iOS — el proyecto está
  Android-only por elección, no por limitación técnica).
- **Apple App Store** flow: cuenta, certificados, App Store Connect,
  TestFlight, review process.
- **Auditoría completa de Fabric/TurboModules** en device iOS (ver
  [`NEW_ARCHITECTURE.md`](NEW_ARCHITECTURE.md)) — algunas libs marked como
  "Legacy bridge" pueden necesitar reemplazo en iOS.
- **Suscripciones cross-platform**: Apple In-App Purchase + Google Play
  Billing en paralelo. Probable necesidad de un servidor de validación de
  receipts para preservar compras al cambiar de plataforma.

**Riesgo**: iOS es trabajo significativo, no es "compilar el mismo código".
Plan honesto: 2-3 meses de dev sólo para alcanzar paridad.

---

## v2.1+ — Visión a futuro (no commiteado)

Ideas que NO están priorizadas pero pueden tomarse en cualquier momento:

| Idea                                                      | Por qué importaría              | Costo aproximado            |
| --------------------------------------------------------- | ------------------------------- | --------------------------- |
| Casos clínicos interactivos                               | Diferenciación pedagógica       | Alto (contenido + UI nueva) |
| Sincronización en la nube de favoritos/notas              | Pasaje de device a device       | Alto (requiere backend)     |
| Modo "guardia": pantalla compacta para uso en turno largo | UX en hospital                  | Medio                       |
| Ampliación de calculadoras a 25+                          | Cobertura clínica               | Medio (cada una con tests)  |
| Widget Android (fármaco del día)                          | Retención                       | Medio                       |
| Reconocimiento de OCR en envases de medicamentos          | "Apuntá la cámara a la caja"    | Alto (depende de modelo ML) |
| Modo offline completo en iOS también                      | Diferenciación vs MIMS/Medscape | Medio                       |
| Plan estudiante con verificación .edu                     | Adquisición                     | Bajo + acuerdo legal        |

---

## Backlog técnico (no es feature, es deuda)

Cosas que mejorarían la salud del proyecto sin agregar features:

- **Limpiar 549 warnings de lint** (mayoría `react-native/no-inline-styles`)
  — paciencia archivo-por-archivo, sin riesgo. Bajaría a sub-100 warnings.
- **Tests de componentes** (no solo lógica): requiere arreglar el jest
  preset para transformar `@react-navigation/*`. Bloqueador conocido.
- **Tests de PremiumContext** con mocks de IAP — útil para detectar
  regresiones cuando se toque billing.
- **Refactor de `useDrugSearch` a SQL FTS** (Full-Text Search nativo de
  SQLite) — performance gain visible solo si hay quejas de lentitud.
- **Pre-commit hook con eslint** (no solo prettier) — pendiente de bajar
  los warnings primero.
- **Audit periódico de dependencias**: `npm audit` mostraba 6
  vulnerabilidades en la última corrida. Revisar trimestralmente.

---

## Decisiones pendientes del usuario

Cosas que requieren input humano antes de avanzar en el roadmap:

| Decisión                                                           | Bloquea           | Recomendación                                             |
| ------------------------------------------------------------------ | ----------------- | --------------------------------------------------------- |
| Activar Sentry/Crashlytics/GlitchTip o seguir sin telemetría       | v1.1              | Sentry con config conservadora (ver `CRASH_REPORTING.md`) |
| Identificar el responsable sanitario para `_meta.responsible.name` | HONcode + v1.1    | Tu nombre + credencial profesional                        |
| Conseguir profesional para Bloque 1 de revisión clínica            | v1.1              | Empezar con red profesional propia                        |
| URL pública para `privacy-policy.html`                             | v1.0 (Play Store) | GitHub Pages gratis                                       |
| ¿Considerar iOS?                                                   | v2.0 timing       | Decidir cuando v1.x esté estable                          |
| Cadencia real de release                                           | Todo el roadmap   | Sugerencia: 1 minor cada 2-3 meses                        |

---

## Cómo se navega entre versiones

Cada release sigue el mismo flujo (documentado en
[`DEVELOPMENT.md`](DEVELOPMENT.md)):

1. Trabajar en `[Unreleased]` del `CHANGELOG.md` durante el ciclo.
2. Cuando esté listo: `npm run version:patch|minor|major`.
3. Revisar el diff (build.gradle, package.json, CHANGELOG).
4. Editar `CHANGELOG.md` con notas reales para la sección recién creada.
5. `git commit -am "chore(release): vX.Y.Z"` + `git tag vX.Y.Z`.
6. Build release: `./gradlew assembleFreeRelease assemblePremiumRelease`.
7. Subir AAB a Play Console (track interno primero).
8. 24-48h en interno → producción con staged rollout (10% → 25% → 50% → 100%).

---

## Cuándo se actualiza este roadmap

- Después de cada release (mover la versión completada a "release actual").
- Cuando aparezca evidencia que invalide una prioridad (feedback de
  usuarios, alerta de seguridad, cambio regulatorio).
- Al menos cada trimestre como housekeeping, aunque no haya cambios
  externos.

Si pasan 6 meses sin actualizar este doc, **considerarlo desactualizado**
y revisar contra la realidad del proyecto antes de tomar decisiones.
