# Guía Farmacológica de Enfermería

Aplicación móvil Android de referencia farmacológica para profesionales de enfermería. Contiene información detallada de **1781 fármacos**, escalas clínicas, protocolos de emergencia, valores de laboratorio, calculadoras médicas y herramientas de estudio.

## Descripción General

Herramienta de consulta rápida para el ámbito hospitalario y ambulatorio:

- **1781 fármacos** con mecanismo de acción, indicaciones, contraindicaciones, dosis, interacciones y cuidados de enfermería
- **14 protocolos de emergencia** con pasos cronometrados (ACLS, anafilaxia, IAM, ACV, sepsis...)
- **13 escalas clínicas** interactivas (Glasgow, APGAR, Norton, Braden, NEWS2, RASS, Wells...)
- **53 valores de laboratorio** con rangos por sexo y pediátricos
- **15 calculadoras médicas** (dosis, goteo, IMC, aclaramiento creatinina, APACHE II...)
- **Guía parenteral** con compatibilidades IV (460 fármacos enriquecidos)
- **60 patologías** con fármacos vinculados y cuidados de enfermería
- Quiz de estudio, favoritos, notas personales, modo oscuro, exportación de datos

## Requisitos del Sistema

| Requisito | Versión |
|-----------|---------|
| Node.js | >= 22.11.0 |
| Java JDK | 25 |
| Android SDK | API 24-36 |
| Gradle | 9.0.0 |
| React Native | 0.84.1 |
| Android mínimo | 7.0 Nougat (API 24) |

## Inicio Rápido

### 1. Instalar dependencias

```bash
cd GuiaFarmacologica
npm install
```

### 2. Iniciar Metro Bundler

```bash
npm start
```

### 3. Compilar y ejecutar (debug)

```bash
# En otra terminal
npm run android
```

### 4. Compilar APK de release

```bash
export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED"
cd android && ./gradlew assemblePremiumRelease assembleFreeRelease
```

APKs generadas en:
- **Premium**: `android/app/build/outputs/apk/release/`
- **Free**: `android/app/build/outputs/apk/release/Nueva carpeta/`

## Variantes de Compilación (Flavors)

| Flavor | Application ID | Descripción |
|--------|---------------|-------------|
| `free` | `com.guiafarmacologica.free` | Todas las funcionalidades desbloqueadas, sin sistema de suscripción |
| `premium` | `com.guiafarmacologica` | Trial de 14 días + suscripción premium |

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
    screens/          31 pantallas
    components/       7 componentes reutilizables
    context/          4 providers (Theme, Premium, Favorites, Notes)
    hooks/            7 custom hooks
    navigation/       AppNavigator (tabs + stack)
    types/            Interfaces TypeScript
    utils/            Utilidades compartidas
    data/             14 archivos JSON con datos clínicos
  android/            Proyecto nativo Android
  scripts/            Scripts de generación de datos
  docs/               Documentación técnica
```

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitectura, navegación, providers, flujo de datos |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md) | Guía de desarrollo, patrones, cómo agregar contenido |
| [DATA.md](docs/DATA.md) | Modelo de datos, interfaces, archivos JSON |
| [FEATURES.md](docs/FEATURES.md) | Catálogo completo de funcionalidades |

## Stack Tecnológico

- **Framework**: React Native CLI 0.84.1 (sin Expo)
- **Lenguaje**: TypeScript 5.8
- **Navegación**: React Navigation 7 (bottom tabs + native stack)
- **Motor JS**: Hermes
- **Almacenamiento**: AsyncStorage
- **Gráficos**: react-native-svg
- **Datos**: JSON embebido (sin backend ni API externa)
- **Dependencias externas**: 5 librerías (AsyncStorage, Clipboard, Navigation, SafeArea, SVG)

## Contenido Clínico

| Tipo | Cantidad |
|------|----------|
| Fármacos | 1,781 |
| Patologías | 60 |
| Escalas clínicas | 13 |
| Protocolos emergencia | 14 |
| Valores laboratorio | 53 |
| Calculadoras | 15 |
| Fórmulas | 15 |
| Vías administración | 16 |
| Glosario | 65+ términos |
| Categorías terapéuticas | 14 unidades, 60+ capítulos |
