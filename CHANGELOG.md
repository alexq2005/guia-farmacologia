# Changelog

All notable changes to **Guía Farmacológica de Enfermería** are documented in
this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The Android `versionCode` (separate from the semver `versionName`) increments by
**+1 on every release**, regardless of bump type, because Google Play rejects
APKs with duplicate version codes.

## [Unreleased]

### Added

- **MiSuite — hub del ecosistema de 3 apps de enfermería** (`src/screens/MiSuiteScreen.tsx`): pantalla nueva que detecta cuáles de las 3 apps están instaladas en el dispositivo (Curso, Patologías, Farmacológica) y ofrece abrirlas o descargarlas. Usa `Linking.canOpenURL` con esquemas custom (`farmacologia://`, `patologias://`, `curso://`). Entrada desde Tools sección "Ecosistema". Permisos Android `<queries>` para package visibility (Android 11+) y `<intent-filter>` para que las otras apps abran ésta.
- **Tests de calculadoras médicas** (`__tests__/calculators.test.ts`): 35 tests cubriendo las 22 fórmulas (f01-f22) hand-calculados contra fuentes médicas canónicas (Mosteller, Cockcroft-Gault, Devine, Young, Clark, etc.). Edge cases: empty/non-numeric/comma-decimal locale es-ES. Test de regresión bloquea la convención vieja de "sexo".
- **Test de integridad referencial** entre `pathologies.json` y `drugs.json` (`__tests__/pathologies-refs.test.ts`): valida que las 494 referencias matchean IDs reales. Falla CI si alguien renombra un drug ID sin actualizar refs.
- **Crash reporting scaffolding** (`src/utils/crashReporting.ts`): interfaz abstracta con no-op provider por defecto. `ErrorBoundary` integrado vía `componentDidCatch`. Listo para activar Sentry/Crashlytics cuando se decida (ver `docs/CRASH_REPORTING.md`).
- **Doc `docs/NEW_ARCHITECTURE.md`**: matriz de compatibilidad de las 16 librerías nativas + checklist de smoke test en device. La app YA corre en New Architecture (default RN 0.82+).
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
- `docs/ARCHITECTURE.md`: sección nueva **"Sistema de Migraciones SQLite"** con explicación del bug histórico y enlace al flujo de release en DEVELOPMENT.md.
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
