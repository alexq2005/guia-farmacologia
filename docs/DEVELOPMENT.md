# Guia de Desarrollo

## Configuracion del Entorno

### Requisitos previos

1. **Node.js** >= 22.11.0
2. **Java JDK 25** (con JAVA_HOME configurado)
3. **Android Studio** con SDK 36, Build Tools 36.0.0, NDK 27.1.12297006
4. **Variables de entorno**:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED"
   ```

### Instalacion

```bash
cd GuiaFarmacologica
npm install
```

### Ejecucion en modo desarrollo

```bash
# Terminal 1: Metro bundler
npm start

# Terminal 2: Build e instalar en dispositivo/emulador
npm run android
```

## Compilacion

### Nota sobre Java 25

Java 25 requiere flags especiales para que CMake funcione correctamente. Siempre incluir:

```bash
export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED"
```

### Product Flavors

La app tiene dos variantes de compilacion:

| Flavor | `applicationId` | `IS_FREE` | Descripcion |
|--------|-----------------|-----------|-------------|
| `free` | `com.guiafarmacologica.free` | `true` | Todo desbloqueado, sin suscripcion, sin UI premium |
| `premium` | `com.guiafarmacologica` | `false` | Trial 14 dias + codigo de activacion + futura suscripcion |

### Comandos de compilacion

```bash
# Debug
./gradlew assembleFreeDebug
./gradlew assemblePremiumDebug

# Release (requiere keystore configurado)
./gradlew assembleFreeRelease
./gradlew assemblePremiumRelease

# Ambas variantes release
./gradlew assembleFreeRelease assemblePremiumRelease
```

### Ubicacion de APKs

| Variante | Ruta |
|----------|------|
| Free debug | `android/app/build/outputs/apk/free/debug/` |
| Premium debug | `android/app/build/outputs/apk/premium/debug/` |
| Free release | `android/app/build/outputs/apk/free/release/` + copia en `release/Nueva carpeta/` |
| Premium release | `android/app/build/outputs/apk/premium/release/` + copia en `release/` |

### Firma de Release

Las credenciales del keystore se almacenan en `android/gradle.properties.local` (gitignored):

```properties
MYAPP_UPLOAD_STORE_PASSWORD=tu_password
MYAPP_UPLOAD_KEY_PASSWORD=tu_password
```

El archivo del keystore (`guia-farmacologica-release.keystore`) debe estar en `android/app/`.

## Patrones de Codigo

### Patron de pantalla

Todas las pantallas siguen este patron:

```typescript
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';

export default function MiScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {/* contenido */}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
```

### Funciones premium-gated

Para bloquear una pantalla tras el paywall:

```typescript
import { PremiumGate } from '../components/PremiumGate';

export default function MiScreen() {
  return (
    <PremiumGate feature="Nombre de la Funcionalidad">
      {/* contenido que se bloquea */}
    </PremiumGate>
  );
}
```

En el build `free`, `PremiumGate` siempre muestra el contenido porque `isPremium` es `true`.

### Accesibilidad

Componentes interactivos deben incluir:

```typescript
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Descripcion de la accion"
  accessibilityState={{ selected: isActive }}
>
```

### Listas largas

Siempre usar `FlatList` en lugar de `ScrollView` + `.map()`:

```typescript
<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  initialNumToRender={15}
/>
```

### Normalizacion de texto

Usar la utilidad centralizada para busquedas insensibles a acentos:

```typescript
import { normalizeText } from '../utils/search';

const match = normalizeText(drug.nombre).includes(normalizeText(query));
```

### Etiquetas de categoria

Usar el mapa centralizado en lugar de switch/if:

```typescript
import { CATEGORY_LABELS } from '../utils/labels';

const label = CATEGORY_LABELS[drug.unidadId] || 'Sin categoria';
```

## Codigo de Activacion (Premium Build)

La version premium incluye un codigo secreto que desbloquea todas las funciones permanentemente.

**Como funciona:**
1. En AboutScreen, tocar el badge de version (`v0.1`) 5 veces rapido
2. Aparece un modal pidiendo el codigo
3. Se valida contra un hash SHA-256 (el codigo no existe en texto plano en el APK)
4. Si es correcto, se guarda en AsyncStorage y `isPremium` se activa permanentemente

**Cambiar el codigo:**
```bash
node -e 'console.log(require("crypto").createHash("sha256").update("NUEVO_CODIGO").digest("hex"))'
```
Reemplazar `ACTIVATION_HASH` en `src/utils/activation.ts` con el hash resultante.

**Archivos involucrados:**
- `src/utils/activation.ts` — SHA-256 puro en JS + validacion + persistencia
- `src/context/PremiumContext.tsx` — `isCodeActivated` + `activateWithCode()`
- `src/screens/AboutScreen.tsx` — Easter egg (5 taps) + modal de ingreso

## Como Agregar Contenido

### Agregar un nuevo farmaco

1. Editar `src/data/drugs.json`
2. Anadir un objeto `Drug` al array con todos los campos requeridos:
   ```json
   {
     "id": "d_XXXX",
     "nombre": "Nombre Generico",
     "nombreGenerico": "nombre-generico",
     "familia": "Familia farmacologica",
     "unidadId": "c01",
     "capituloId": "c01_01",
     "indicaciones": ["..."],
     "contraindicaciones": ["..."],
     "efectosAdversos": ["..."],
     "viaAdministracion": ["oral"],
     "dosis": { "adulto": "..." },
     "cuidadosEnfermeria": ["..."]
   }
   ```
3. El farmaco aparecera automaticamente en busqueda y en su categoria

### Agregar una nueva patologia

1. Editar `src/data/pathologies.json`
2. Incluir `linkedDrugs` con IDs de farmacos existentes

### Agregar un protocolo de emergencia

1. Editar `src/data/emergency_protocols.json`
2. Cada protocolo tiene `steps` con tiempos, `drugDoses`, `decisionPoints` y `redFlags`

### Agregar una escala clinica

1. Editar `src/data/clinical_scales.json`
2. Tipos soportados: `components` (sumable), `selector` (seleccion unica), `checklist`

### Agregar un valor de laboratorio

1. Editar `src/data/lab_values.json`
2. Incluir rangos por sexo (`male`, `female`) y opcionalmente `pediatric`

## Como Agregar una Pantalla Nueva

1. Crear `src/screens/NuevaPantalla.tsx` siguiendo el patron de pantalla
2. Agregar el tipo de ruta en `src/types/index.ts`:
   ```typescript
   export type RootStackParamList = {
     // ... rutas existentes
     NuevaPantalla: undefined; // o { param: string }
   };
   ```
3. Registrar en `src/navigation/AppNavigator.tsx`:
   ```typescript
   <Stack.Screen name="NuevaPantalla" component={NuevaPantallaScreen} />
   ```
4. Navegar desde otra pantalla:
   ```typescript
   navigation.navigate('NuevaPantalla');
   ```

## Como Agregar un Hook

1. Crear `src/hooks/useNuevoHook.ts`
2. Si necesita persistencia, usar AsyncStorage con clave `@guia_farmaco_<nombre>`
3. Si necesita estado global, crear un Context provider en `src/context/`
4. Registrar el provider en `App.tsx` en el orden correcto del arbol

## Estructura de Archivos Nativa (Android)

```
android/app/src/main/java/com/guiafarmacologica/
  ├── MainActivity.kt          ← Activity principal de React Native
  ├── MainApplication.kt       ← Registro de paquetes nativos
  ├── BuildConfigModule.kt     ← Modulo nativo que expone IS_FREE a JS
  └── BuildConfigPackage.kt    ← Registra BuildConfigModule
```

### Agregar un nuevo modulo nativo

1. Crear `MiModulo.kt` con `ReactContextBaseJavaModule`
2. Crear `MiModuloPackage.kt` con `ReactPackage`
3. Registrar en `MainApplication.kt`: `add(MiModuloPackage())`
4. Acceder desde JS: `NativeModules.MiModulo`

## Recursos Android

```
android/app/src/main/res/
  ├── drawable/
  │   ├── splash_logo.xml           ← Logo vectorial del splash (512x512)
  │   ├── launch_screen.xml         ← Layout del splash screen
  │   ├── ic_launcher_foreground.xml ← Icono del launcher (108dp)
  │   └── ic_launcher_background.xml
  ├── mipmap-*/                      ← Iconos del launcher en diferentes densidades
  └── values/
      ├── strings.xml                ← Nombre de la app
      ├── colors.xml                 ← Color del splash (#1E40AF)
      └── styles.xml                 ← Tema del splash
```

## Depuracion

### React Native Dev Menu

- **Android emulador**: `Ctrl + M`
- **Dispositivo fisico**: Agitar el dispositivo

### Logs

```bash
# Logs de React Native
npx react-native log-android

# Logs filtrados
adb logcat *:E ReactNative:V ReactNativeJS:V
```

### Recarga

- **Fast Refresh**: Automatico al guardar archivos
- **Full Reload**: Doble `R` en terminal de Metro

## Linting

```bash
npm run lint
```

## Tests

```bash
npm test
```

## ProGuard (Release)

ProGuard esta habilitado para release builds. Las reglas estan en `android/app/proguard-rules.pro`. Si un release build falla en runtime pero el debug funciona, revisar las reglas de ProGuard.
