# Guía Farmacológica de Enfermería

Aplicación móvil Android de referencia farmacológica para profesionales de enfermería. Contiene información detallada de **2,977 fármacos**, escalas clínicas, protocolos de emergencia, valores de laboratorio, calculadoras médicas y herramientas de estudio.

## Descripción General

Herramienta de consulta rápida para el ámbito hospitalario y ambulatorio:

- **2,977 fármacos** con mecanismo de acción, indicaciones, contraindicaciones, dosis, interacciones y cuidados de enfermería
- **18 protocolos de emergencia** con pasos cronometrados (ACLS, anafilaxia, IAM, ACV, sepsis...)
- **17 escalas clínicas** interactivas (Glasgow, APGAR, Norton, Braden, NEWS2, RASS, Wells...)
- **61 valores de laboratorio** con rangos por sexo y pediátricos
- **15 calculadoras médicas** dedicadas + **22 fórmulas** de cálculo testeadas (`__tests__/calculators.test.ts`)
- **Guía parenteral** con compatibilidades IV (460 fármacos enriquecidos)
- **60 patologías** con fármacos vinculados y cuidados de enfermería
- **MiSuite**: hub de navegación cross-app con las 3 apps del ecosistema (Curso, Patologías, Farmacológica)
- Quiz de estudio, favoritos, notas personales, modo oscuro, exportación de datos
- **🚀 Escalamiento a 60 FPS (v2.0)**: Migración extrema usando `SQLite` sincrónico por puente JSI (absorbe los 10MB de JSON de la RAM). Renderizado infinito fluidísimo mediante el framework de lista de Shopify (`FlashList`), memoización de contextos anti-renders y encriptación de variables nativas (Keystore).

## Requisitos del Sistema

| Requisito      | Versión                                 |
| -------------- | --------------------------------------- |
| Node.js        | >= 22.11.0                              |
| Java JDK       | 21 (recomendado: JBR de Android Studio) |
| Android SDK    | API 24-36                               |
| Gradle         | 9.0.0                                   |
| React Native   | 0.84.1                                  |
| Android mínimo | 7.0 Nougat (API 24)                     |

## Inicio Rápido

### 1. Instalar dependencias

```bash
cd GuiaFarmacologica
npm install
```

### 2. Iniciar Metro Bundler

```bash
npm run android:metro:clean
```

### 3. Compilar y ejecutar (debug)

```bash
# En otra terminal
npm run android:free
```

Estos comandos configuran automáticamente `JAVA_HOME`, `ANDROID_HOME` y `adb` para evitar problemas de PATH en Windows + Git Bash.

### 4. Compilar APK de release

```bash
export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED"
cd android && ./gradlew assemblePremiumRelease assembleFreeRelease
```

APKs generadas en:

- **Premium**: `android/app/build/outputs/apk/release/`
- **Free**: `android/app/build/outputs/apk/release/Nueva carpeta/`

## Variantes de Compilación (Flavors)

| Flavor    | Application ID               | Descripción                                                         |
| --------- | ---------------------------- | ------------------------------------------------------------------- |
| `free`    | `com.guiafarmacologica.free` | Todas las funcionalidades desbloqueadas, sin sistema de suscripción |
| `premium` | `com.guiafarmacologica`      | Trial de 14 días + suscripción premium                              |

```bash
./gradlew assembleFreeDebug       # Debug libre
./gradlew assemblePremiumDebug    # Debug premium
./gradlew assembleFreeRelease     # Release libre
./gradlew assemblePremiumRelease  # Release premium
```

## Estructura del Proyecto

```
GuiaFarmacologica/
  src/
    screens/          33 pantallas
    components/       9 componentes reutilizables
    context/          5 providers (Theme, Premium, Favorites, Notes, TabBar)
    hooks/            7 custom hooks
    navigation/       AppNavigator (tabs + stack)
    types/            Interfaces TypeScript
    utils/            Utilidades compartidas (incl. crashReporting, datasetMeta, calculators)
    data/             17 archivos JSON con datos clínicos + _meta.json (provenance)
  __tests__/          6 archivos de test (109 tests, ~1s)
  android/            Proyecto nativo Android (New Architecture activa)
  .github/workflows/  CI con typecheck + lint + test
  .husky/             pre-commit (prettier) + pre-push (typecheck)
  scripts/            Scripts utilitarios (bump-version, fetch_cima, etc.)
  docs/               Documentación técnica
  playstore/          Materiales para Google Play Console
```

## Documentación

### Docs principales

| Documento                               | Contenido                                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitectura, navegación, providers, flujo de datos, sistema de migraciones SQLite |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md)   | Guía de desarrollo, patrones, cómo agregar contenido                               |
| [DATA.md](docs/DATA.md)                 | Modelo de datos, interfaces, archivos JSON                                         |
| [FEATURES.md](docs/FEATURES.md)         | Catálogo completo de funcionalidades                                               |

### Docs de calidad y compliance

| Documento                                                           | Contenido                                                                   |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [SOURCES.md](docs/SOURCES.md)                                       | Fuentes oficiales (AEMPS-CIMA, GuíaSalud, etc.) y política de actualización |
| [CLINICAL_REVIEW.md](docs/CLINICAL_REVIEW.md)                       | Protocolo de revisión clínica por bloques de riesgo                         |
| [COMPLIANCE_PLAY_STORE_2026.md](docs/COMPLIANCE_PLAY_STORE_2026.md) | Checklist de cumplimiento Google Play 2026                                  |
| [CRASH_REPORTING.md](docs/CRASH_REPORTING.md)                       | Cómo activar Sentry / Crashlytics cuando se decida                          |
| [NEW_ARCHITECTURE.md](docs/NEW_ARCHITECTURE.md)                     | Estado de Fabric/TurboModules y matriz de compat                            |
| [OTA_UPDATES_RESEARCH.md](docs/OTA_UPDATES_RESEARCH.md)             | Análisis de OTA updates (recomendación: NO implementar)                     |

### Roadmap, changelog y release

- [ROADMAP.md](docs/ROADMAP.md) — plan canónico de versiones (v1.0 → v2.0+)
- [CHANGELOG.md](CHANGELOG.md) — Keep-a-Changelog 1.1.0
- `npm run version:patch|minor|major` — bump sincronizado de versiones

## Stack Tecnológico

- **Framework**: React Native CLI 0.84.1 (sin Expo)
- **Lenguaje**: TypeScript 5.8
- **Navegación**: React Navigation 7 (bottom tabs + native stack)
- **Motor JS**: Hermes
- **Almacenamiento**: EncryptedStorage (Keystore nativo) y OP-SQLite (Archivos locales JSI)
- **Gráficos**: react-native-svg
- **Datos**: JSON embebido automatizado vía SQLite
- **Dependencias core optimizadas**: `@shopify/flash-list` para listas masivas a 60 FPS.

## Contenido Clínico

| Tipo                    | Cantidad                   |
| ----------------------- | -------------------------- |
| Fármacos                | 2,977                      |
| Patologías              | 60                         |
| Escalas clínicas        | 17                         |
| Protocolos emergencia   | 18                         |
| Valores laboratorio     | 61                         |
| Calculadoras dedicadas  | 15                         |
| Fórmulas (testeadas)    | 22                         |
| Vías administración     | 15                         |
| Glosario                | 205 términos               |
| Categorías terapéuticas | 13 unidades, 117 capítulos |
| Antídotos               | 15                         |
| Fármacos de emergencia  | 17                         |

> Procedencia y estado de revisión clínica de cada dataset documentados en
> [`src/data/_meta.json`](src/data/_meta.json) y [SOURCES.md](docs/SOURCES.md).
