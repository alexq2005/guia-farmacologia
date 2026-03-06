# Guia Farmacologica de Enfermeria

Aplicacion movil Android de referencia farmacologica para profesionales de enfermeria. Contiene informacion detallada de **1781 farmacos**, escalas clinicas, protocolos de emergencia, valores de laboratorio, calculadoras medicas y herramientas de estudio.

## Descripcion General

Herramienta de consulta rapida para el ambito hospitalario y ambulatorio:

- **1781 farmacos** con mecanismo de accion, indicaciones, contraindicaciones, dosis, interacciones y cuidados de enfermeria
- **14 protocolos de emergencia** con pasos cronometrados (ACLS, anafilaxia, IAM, ACV, sepsis...)
- **13 escalas clinicas** interactivas (Glasgow, APGAR, Norton, Braden, NEWS2, RASS, Wells...)
- **53 valores de laboratorio** con rangos por sexo y pediatricos
- **15 calculadoras medicas** (dosis, goteo, IMC, aclaramiento creatinina, APACHE II...)
- **Guia parenteral** con compatibilidades IV (460 farmacos enriquecidos)
- **60 patologias** con farmacos vinculados y cuidados de enfermeria
- Quiz de estudio, favoritos, notas personales, modo oscuro, exportacion de datos

## Requisitos del Sistema

| Requisito | Version |
|-----------|---------|
| Node.js | >= 22.11.0 |
| Java JDK | 25 |
| Android SDK | API 24-36 |
| Gradle | 9.0.0 |
| React Native | 0.84.1 |
| Android minimo | 7.0 Nougat (API 24) |

## Inicio Rapido

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

## Variantes de Compilacion (Flavors)

| Flavor | Application ID | Descripcion |
|--------|---------------|-------------|
| `free` | `com.guiafarmacologica.free` | Todas las funcionalidades desbloqueadas, sin sistema de suscripcion |
| `premium` | `com.guiafarmacologica` | Trial de 14 dias + suscripcion premium |

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
    data/             14 archivos JSON con datos clinicos
  android/            Proyecto nativo Android
  scripts/            Scripts de generacion de datos
  docs/               Documentacion tecnica
```

## Documentacion

| Documento | Contenido |
|-----------|-----------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitectura, navegacion, providers, flujo de datos |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md) | Guia de desarrollo, patrones, como agregar contenido |
| [DATA.md](docs/DATA.md) | Modelo de datos, interfaces, archivos JSON |
| [FEATURES.md](docs/FEATURES.md) | Catalogo completo de funcionalidades |

## Stack Tecnologico

- **Framework**: React Native CLI 0.84.1 (sin Expo)
- **Lenguaje**: TypeScript 5.8
- **Navegacion**: React Navigation 7 (bottom tabs + native stack)
- **Motor JS**: Hermes
- **Almacenamiento**: AsyncStorage
- **Graficos**: react-native-svg
- **Datos**: JSON embebido (sin backend ni API externa)
- **Dependencias externas**: 5 librerias (AsyncStorage, Clipboard, Navigation, SafeArea, SVG)

## Contenido Clinico

| Tipo | Cantidad |
|------|----------|
| Farmacos | 1,781 |
| Patologias | 60 |
| Escalas clinicas | 13 |
| Protocolos emergencia | 14 |
| Valores laboratorio | 53 |
| Calculadoras | 15 |
| Formulas | 15 |
| Vias administracion | 16 |
| Glosario | 65+ terminos |
| Categorias terapeuticas | 14 unidades, 60+ capitulos |
