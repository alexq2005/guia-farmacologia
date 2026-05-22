# Changelog

All notable changes to **Guía Farmacológica de Enfermería** are documented in
this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The Android `versionCode` (separate from the semver `versionName`) increments by
**+1 on every release**, regardless of bump type, because Google Play rejects
APKs with duplicate version codes.

## [Unreleased]

### Removed

- **3 entradas zombie eliminadas de `drugs.json`** (IDs cuyo slug no se correspondía con el contenido, por hijacking histórico):
  - `amrinona` → contenía datos de Angiotensina II (Giapreza); canónica `angiotensina_ii` ya existía
  - `nitroprusiatosodico_nuevo` → contenía datos de Fenoldopam (Corlopam); canónica `fenoldopam` ya existía
  - `andexanet_alfa_detalle` → duplicada de `andexanet_alfa`/`andexanet` (ambas canónicas ya existían)
  - Las 3 estaban en `categories.json` con su ID zombie; se reemplazaron por sus equivalentes canónicos. Ninguna estaba referenciada por `pathologies.json` (no rompe integridad referencial).

### Changed

- **`meropenem_nuevo` renombrado a `imipenem_cilastatina_relebactam`** (`src/data/drugs.json`): el ID legacy era misleading (slug "meropenem" pero contenido era Imipenem/Cilastatina/Relebactam = Recarbrio). Es la única fuente de este drug, así que se renombra en vez de eliminar. Referencia en `categories.json` actualizada.
- **`drugs.json` ahora tiene 2974 entradas (era 2977)** tras la limpieza de zombies. `DATASET_VERSION` bumpeado de 3 a 4. `_meta.json drugs.entries` actualizado. `__tests__/drugs-schema.test.ts` count expectation actualizado.
- **Badge "Información parcial" en `DrugDetailScreen.tsx`** ahora considera `farmacocinetica` como faltante si tiene **menos de 3 subcampos populados** (antes solo flaggeaba ausencia total del objeto). Un fármaco con sólo `absorcion` poblado (~96% de los que tienen el objeto) ya no se considera completo. Resultado: cobertura "útil" pasa de 58% reportado a 25% real, alineando el badge con la calidad real de la data clínica.
- **Card de resultado de búsqueda ahora muestra el alias comercial matcheado**: cuando la query del usuario matcheó vía `nombresComerciales` y ese alias difiere del `nombre` canónico, el card incluye una línea "🔍 Conocido como: <alias>" entre el título y el genérico. Resuelve un gap entre searchability y discoverability — antes el algoritmo encontraba la entrada pero el usuario no la reconocía visualmente (ej. buscar "buscapina compuesta" devolvía un card titulado "Butilescopolamina Bromuro + Metamizol" sin pista de por qué matcheaba). El fix es sistémico (`SearchResult.matchedCommercial?: string` + `DrugCard` prop) — aplica a TODOS los drugs con `nombresComerciales`, no solo Buscapina Compuesta.
- **Enriquecida entrada `cima_butilescopolamina_bromuro___metamizol` (Buscapina Compuesta) con práctica argentina** (`src/data/drugs.json`): la entrada CIMA-imported estaba incompleta (dosis truncada a mitad de frase, `presentaciones: []`, sin `preparacionParenteral`). Ahora documenta tanto el producto combinado español (BUSCOPRESC COMPOSITUM, ampolla única 2500/20) como la **preparación artesanal de guardia en Argentina** (2 amp Buscapina + 2 amp Dipirona, diluido en 50-100 mL SF, IV lenta 10-15 min o IM profundo). Incluye `preparacionParenteral` completo, 2 cuidados de enfermería AR-específicos, y `dosis.pediatrico` con restricción explícita en <12 años. Además, agregados los aliases comerciales **"Buscapina Compuesta"** y **"Buscapina Compositum"** a `nombresComerciales` para que la búsqueda accent-insensitive AR-friendly funcione (antes solo aparecía con "BUSCOPRESC COMPOSITUM"). `DATASET_VERSION` bumpeado de 1 a 3 (los usuarios actualizados verán el cambio sin reinstalar).
- `src/data/db.ts`: `DATASET_VERSION` 1 → 4 (acumulado sesión 2026-05-21).
- `src/data/_meta.json`: `drugs.lastEdited` → 2026-05-21, `drugs.entries` 2977 → 2974.

### Added

- **`docs/data_coverage_gaps.md`** — reporte auto-generado de las 2,234 entradas con farmacocinética incompleta (<3 subcampos populados). Agrupadas por grupo terapéutico para priorización del Bloque 1 de revisión clínica (v1.1). Top gaps: Antiinfecciosos (151), Sistema Nervioso (106), Antineoplásicos (101), Dermatología (96). 193 entradas además carecen de `grupoTerapeutico` — meta-gap secundario.
- **`docs/clinical_review/bloque_1.md`** — scaffolding del Bloque 1 de revisión clínica (50 fármacos alto-riesgo según `docs/CLINICAL_REVIEW.md`). Auto-generado por `scripts/_gen_bloque1.js`, idempotente — puede re-runearse después de cualquier cambio de contenido para re-snapshot el estado. Para cada fármaco lista: ID en dataset, nombre canónico, presencia de `farmacocinetica` (≥3 subs), `ajusteRenal`, `ajusteHepatico`, `dosis.pediatrico`, `preparacionParenteral`, `almacenamiento`, y checkbox para marcar como revisado. Stats: 48/48 drugs encontrados; gaps principales son `ajusteRenal` (52% cubierto) y `ajusteHepatico` (44%). Detecta duplicados potenciales en el dataset (ej. `insulina_detemir` + `insulina_detemir_detalle`) como input al reviewer.
- **`scripts/improve_cima_fc.py`** — herramienta para re-parsear el campo `farmacocinetica` de los drugs `cima_*` extrayendo 8 subcampos (absorcion/distribucion/metabolismo/excrecion/vidaMedia/inicioAccion/picoAccion/duracionAccion) desde el texto crudo de la sección 5.2 de CIMA ya cacheado en `scripts/cima_cache/clinical/`. Causa raíz: `fetch_cima.py:794-798` original solo metía todo el texto en `absorcion`. Parser usa estrategia dual (headers explícitos si están + clasificación por keywords como fallback). Settings de sesión (1a/2a/3c/4a): CIMA único fuente, modo supervisado (dry-run default, `--apply` para escribir), policy de solo-rellenar-huecos (nunca sobreescribe). **Dry-run sobre 1003 drugs cima\_\* propone enriquecer 815 (81%) con un total de ~2,181 nuevos datapoints clínicos**, sin necesidad de fetches nuevos a CIMA. Output: `scripts/_output/fc_proposed_diffs.md` (review humano) + `scripts/_output/fc_summary.json` (stats). Phase B (mapping manual top-200 para drugs hand-curated) pendiente.
- **MiSuite — hub del ecosistema de 3 apps de enfermería** (`src/screens/MiSuiteScreen.tsx`): pantalla nueva que detecta cuáles de las 3 apps están instaladas en el dispositivo (Curso, Patologías, Farmacológica) y ofrece abrirlas o descargarlas. Usa `Linking.canOpenURL` con esquemas custom (`farmacologia://`, `patologias://`, `curso://`). Entrada desde Tools sección "Ecosistema". Permisos Android `<queries>` para package visibility (Android 11+) y `<intent-filter>` para que las otras apps abran ésta.
- **Tests de calculadoras médicas** (`__tests__/calculators.test.ts`): 35 tests cubriendo las 22 fórmulas (f01-f22) hand-calculados contra fuentes médicas canónicas (Mosteller, Cockcroft-Gault, Devine, Young, Clark, etc.). Edge cases: empty/non-numeric/comma-decimal locale es-ES. Test de regresión bloquea la convención vieja de "sexo".
- **Test de integridad referencial** entre `pathologies.json` y `drugs.json` (`__tests__/pathologies-refs.test.ts`): valida que las 494 referencias matchean IDs reales. Falla CI si alguien renombra un drug ID sin actualizar refs.
- **Crash reporting scaffolding** (`src/utils/crashReporting.ts`): interfaz abstracta con no-op provider por defecto. `ErrorBoundary` integrado vía `componentDidCatch`. Listo para activar Sentry/Crashlytics cuando se decida (ver `docs/CRASH_REPORTING.md`).
- **Doc `docs/NEW_ARCHITECTURE.md`**: matriz de compatibilidad de las 16 librerías nativas + checklist de smoke test en device. La app YA corre en New Architecture (default RN 0.82+).
- **Doc `docs/ROADMAP.md`**: plan canónico de versiones (v1.0 actual → v1.1 observabilidad y revisión clínica → v1.2 UX → v1.3 contenido → v2.0 iOS) con backlog técnico, decisiones pendientes y filosofía de versionado. `playstore/PLAN_ACTUALIZACIONES.md` ahora apunta a este doc como fuente principal y se mantiene solo como plan de marketing.
- **Sistema de migraciones SQLite** con dual versioning (`SCHEMA_VERSION` via `PRAGMA user_version` + `DATASET_VERSION` via tabla `_meta`) en `src/data/db.ts`. Permite que actualizaciones de `drugs.json` lleguen a usuarios existentes — antes la BD solo se hidrataba en fresh install.
- **Script `scripts/bump-version.js`** para sincronizar `versionName` y `versionCode` entre `android/app/build.gradle` y `package.json`, con flag `--dry-run`. Mueve la sección `[Unreleased]` del CHANGELOG a la versión recién creada.
- **npm scripts**: `version:patch`, `version:minor`, `version:major`, `version:dry`, `typecheck`, `prepare`.
- **CHANGELOG.md** formato Keep-a-Changelog 1.1.0 con backfill de v1.0.0.
- **Pre-commit hooks** con husky 9.1.7 + lint-staged 16.4.0:
  - `pre-commit`: lint-staged sobre archivos staged (eslint --fix + prettier --write)
  - `pre-push`: `tsc --noEmit` bloqueante
- **CI GitHub Actions** (`.github/workflows/check.yml`) con 3 jobs paralelos: typecheck (bloqueante), lint (informational), test (bloqueante).
- **Tests** (21 tests / 3 archivos / ~7s):
  - `__tests__/search.test.ts` — normalización accent-insensitive
  - `__tests__/activation.test.ts` — SHA-256 puro JS + validación de código premium
  - `__tests__/drugs-schema.test.ts` — guarda contra corrupción de `drugs.json` (IDs únicos, campos requeridos, tipos, conteo)
- **Documento `docs/OTA_UPDATES_RESEARCH.md`** con análisis comparativo de OTA updates y recomendación de NO implementar para una app medical.

### Changed

- **Codificación uniforme de "sexo"** en calculadoras f10 (Cockcroft-Gault), f16 (Devine PCI) y f19 (Déficit Na): convención `sexo === 0 → mujer, otro → hombre` en las tres. Antes cada fórmula esperaba un valor numérico distinto (0.85 / 0 / 0.5).
- **Form UI de calculadoras**: cuando una variable se llama `sexo`, ahora se renderiza como toggle visual de dos botones (Mujer / Hombre) en vez de TextInput numérico — imposible ingresar valores arbitrarios.
- `calculateResult` extraída de `FormulaDetailScreen.tsx` a `src/utils/calculators.ts` (función pura testeable).
- `src/data/formulas.json`: descripciones del campo `sexo` en f10/f16/f19 aclaradas a "0 = Mujer, 1 = Hombre".
- **Conteos sincronizados a 2,977 fármacos** (eran 1,781 / 2,784 / 2,877 según el archivo):
  - Código UI visible al usuario: `OnboardingScreen.tsx`, `PremiumScreen.tsx`, `App.tsx` header, `MiSuiteScreen.tsx`
  - Docs: `docs/DATA.md`, `docs/FEATURES.md`, `docs/play-store-listing.md`
  - Marketing: `playstore/checklist_publicacion.md`, `playstore/generate_feature_graphic.html`, `playstore/ficha_play_store.txt` (ficha definitiva para Play Store)
- `docs/DATA.md`: contador de fórmulas actualizado de 15 → 22.
- `docs/ARCHITECTURE.md`: secciones nuevas **"Sistema de Migraciones SQLite"**, **"Sistema de Metadata por Dataset"** (provenance) y **"Crash Reporting"** con enlaces a docs especializados.
- `docs/DEVELOPMENT.md`: sección "Cómo Agregar Contenido" extendida con paso para actualizar `_meta.json` (`lastEdited`, `entries`, `lastSyncWithSource`) cada vez que se edita un dataset. CI bloquea si el conteo desincroniza.
- `docs/DATA.md`: tabla de archivos JSON sincronizada con conteos reales (118 → 117 capítulos, 14 → 13 unidades, 53 → 61 lab values, 13 → 17 escalas, 14 → 18 protocolos, 65+ → 205 glosario, etc.) y nueva fila para `_meta.json`.
- `docs/FEATURES.md`: secciones nuevas para **MiSuite** (hub ecosistema 3-apps) y **Provenance Banner** (UI de revisión clínica). Conteos sincronizados.
- `README.md`: estructura del proyecto actualizada (33 screens vs 31, 9 components vs 7, 5 contexts vs 4, 17 data files vs 14), tabla de Contenido Clínico con conteos reales, nueva sección "Docs de calidad y compliance" con todos los nuevos documentos.
- `playstore/PLAN_ACTUALIZACIONES.md`: nota explícita de que el roadmap original fue reordenado en Mayo 2026 hacia infraestructura fundacional. Las features de UX previstas se difieren.
- `docs/DEVELOPMENT.md`: easter-egg de activación reformulado para no pinear una versión específica del badge.
- `src/data/db.ts`: la repopulación de la tabla `drugs` ahora es `DELETE FROM drugs` + `INSERT OR REPLACE` dentro de transacción, en lugar de `INSERT OR IGNORE` solo si la tabla estaba vacía. Idempotente y rollback-safe.
- `docs/DEVELOPMENT.md`: sección "Cómo Agregar Contenido" documenta el flujo correcto post-SQLite — editar JSON + bumpear `DATASET_VERSION`. Aclara qué datasets están en SQLite vs RAM.
- `README.md`: conteo actualizado de 1,781 → 2,977 fármacos (sincronizado con el dataset real).
- `package.json`: versión sincronizada de "0.0.1" → "1.0.0" (corrige desync histórico con `build.gradle`).
- `Drug` interface (`src/types/index.ts`): agregado `embarazoNota?: string` (presente en 43 fármacos).
- `RouteIllustrationSVG.tsx`: tipo `anchor` cambiado a union literal `'start' | 'middle' | 'end'`. Línea 383: JSX expression dividida arreglada con string único.
- `Chapter/Pathologies/SearchScreen.tsx`: removido `estimatedItemSize` (deprecated en `@shopify/flash-list` v2).
- `.gitignore`: extendido con `screenshots/`, `scripts/_archive/`, `build_*.log`, `window_dump_*.xml`, `ss_*.png`, `splash_*.png`, `emulator_*.png`, `app_*.png`.
- Repo limpio: 173 PNGs del root → `screenshots/`, 76 scripts históricos → `scripts/_archive/` (de 96 a 20 scripts activos).

### Fixed

- **Riesgo clínico de codificación de "sexo"** en calculadoras: antes el TextInput numérico aceptaba cualquier valor y cada fórmula esperaba uno distinto para "mujer" (0.85 en Cockcroft-Gault, 0 en Devine, 0.5 en Déficit Na). Si el profesional ingresaba el número equivocado, el cálculo daba resultado de hombre incluso para mujer (Cockcroft-Gault sobrestimado → menor ajuste renal → toxicidad de aminoglucósidos/vancomicina). Resuelto con UI toggle + convención uniforme + tests.
- **`useMemo` condicional** en `FormulaDetailScreen.tsx:85`: violaba Rules of Hooks (hook después de early return). Podía crashear con "Rendered more hooks than during the previous render" al navegar a una fórmula con ID inválido.
- **Bug crítico de actualización**: usuarios con la app instalada no recibían cambios en `drugs.json` al actualizar el APK desde Play Store. La BD persistía entre updates y el código solo hidrataba si `count === 0`. Ahora detecta version mismatch y rehidrata.
- **Bug runtime semántico** (`DrugDetailScreen.tsx:146`): `farmacosRelacionados.some(f => f.drugId === drug.id)` siempre devolvía `false` porque `farmacosRelacionados` es `string[]`, no objetos. La sección "patologías relacionadas" en la ficha del fármaco siempre estaba vacía. Cambiado a `f === drug.id`.
  > Investigación posterior: el match rate real es 100% (494/494 refs). El bug era exclusivamente la línea de código. Test de integridad referencial agregado para prevenir regresiones futuras.
- TypeScript baseline limpio: 8 errores pre-existentes resueltos (FlashList, SVG types, Drug interface, route params).

### Removed

- `__tests__/App.test.tsx`: placeholder roto que requería mocks completos de la cadena RN navigation y nunca se ejecutó realmente.

## [1.0.0] - 2026-04-16

Primera versión publicada en Google Play Store. `versionCode 3`.

### Added

- **Contenido clínico**: 2,977 fármacos, 60 patologías, 13 escalas clínicas, 14 protocolos de emergencia, 53 valores de laboratorio, 15 calculadoras médicas, guía parenteral con 460 fármacos enriquecidos.
- **Navegación**: 5 bottom tabs (Inicio, Categorías, Buscar, Especial, Herramientas) + stack navigator con 27 pantallas.
- **Dark mode**: tres modos (`light` / `dark` / `system`) con `useColorScheme()`, persistencia en AsyncStorage.
- **Búsqueda**: indexación in-memory con `Map<string, Drug>`, normalización accent-insensitive, FlashList para 60 FPS sobre miles de items.
- **Quiz mode**: 8 tipos de preguntas, filtros por categoría, historial de resultados.
- **Notas personales**: por fármaco, auto-save con debounce, NotesContext.
- **Favoritos** y **historial de búsqueda** con AsyncStorage.
- **Drug Comparison**: multi-select hasta 3 fármacos, tabla horizontal scrollable con 10 campos.
- **Dashboard**: analytics de estudio (quiz stats, progreso por categoría, racha).
- **Sistema premium**: trial de 14 días, suscripción IAP (`react-native-iap` v13), código de activación (SHA-256, easter egg en AboutScreen tap×5).
- **Build flavors**: `free` (todo desbloqueado, `applicationId com.guiafarmacologica.free`) y `premium` (`applicationId com.guiafarmacologica`).
- **UX neumórfica**: dual borders, gradient headers, inset inputs, animaciones spring en tab bar y CollapsibleSection.
- **Almacenamiento**: SQLite via OP-SQLite (JSI síncrono) para fármacos, EncryptedStorage (Keystore) para activación y suscripción.
- **Accesibilidad**: `accessibilityRole`/`Label`/`State` en componentes interactivos (DrugCard, CollapsibleSection, SearchBar, tab bar).
- **ErrorBoundary** envolviendo el árbol completo con UI de retry y detalles dev-only.
- **Skeleton loading** con animación pulse (Skeleton, SkeletonCard, SkeletonList, SkeletonDrugDetail).
- **Compartir**: `react-native-share` integrado con texto estructurado para fármacos, protocolos, lab values.
- **Splash screen** custom: `splash_logo.xml` vectorial 512×512 con anillo, cruz, libro, ECG y cápsula.

### Stack

- React Native 0.84.1 (sin Expo) + TypeScript 5.8 + Hermes
- React Navigation 7 (bottom tabs + native stack)
- @op-engineering/op-sqlite + react-native-encrypted-storage
- @shopify/flash-list para listas masivas
- react-native-svg, react-native-linear-gradient, react-native-iap

### Known issues

- Bug de Metro chunked encoding en Windows en modo dev: workaround documentado en `troubleshooting.md` (offline bundle).
- Warning `newArchEnabled=false` deprecated desde RN 0.82 (no bloqueante).
- Errores de TypeScript pre-existentes que Babel ignora en runtime: `@shopify/flash-list` v2 removió `estimatedItemSize` (3 screens), tipos SVG en `RouteIllustrationSVG`, `embarazoNota` no declarado en `Drug` interface, `drugId` accedido sobre `string` en route params.

[Unreleased]: https://example.com/compare/v1.0.0...HEAD
[1.0.0]: https://example.com/releases/tag/v1.0.0
