# Guía de Desarrollo

## Configuración del Entorno

### Requisitos previos

1. **Node.js** >= 22.11.0
2. **Java JDK 21** (recomendado: JBR de Android Studio)
3. **Android Studio** con SDK 36, Build Tools 36.0.0, NDK 27.1.12297006
4. **Variables de entorno**:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED"
   ```

### Instalación

```bash
cd GuiaFarmacologica
npm install
```

### Ejecución en modo desarrollo

```bash
# Terminal 1: Metro bundler
npm run android:metro:clean

# Terminal 2: Build e instalar en dispositivo/emulador
npm run android:free
```

Estos scripts cargan automáticamente `JAVA_HOME` (JBR de Android Studio), `ANDROID_HOME` y `adb` en `PATH` para evitar errores de entorno en Git Bash.

## Compilación

### Troubleshooting SQLite

Si aparece `Hydration Error: no such table: drugs_u0` en el emulador:

1. Limpiar build y cachés de Metro.
2. Reinstalar la app para reinicializar la base local.

```bash
# desde la raíz del proyecto
npx react-native start --reset-cache
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

Nota: `src/data/db.ts` crea vistas de compatibilidad legacy (`drugs_u0..drugs_u13`) para builds viejos que aún consultan tablas por unidad.

Si aparece `Hydration Error: UNIQUE constraint failed: drugs.id`:

1. Es un choque por IDs duplicados en el dataset JSON durante la carga inicial.
2. La hidratación ahora usa `INSERT OR IGNORE` para no romper la transacción.
3. Reinstalar la app para recrear la base local en limpio.

```bash
cd android && ./gradlew uninstallFreeDebug && cd ..
npx react-native run-android --mode freeDebug --active-arch-only
```

### Nota sobre Java y memoria

Para este proyecto en Windows, usar Java 21 (JBR de Android Studio) mejora estabilidad frente a crashes de Gradle/NDK por memoria nativa.

Si ves `Gradle build daemon disappeared unexpectedly` o `Out of Memory Error (arena.cpp)`:

1. Forzar JAVA_HOME al JBR de Android Studio.
2. Usar la configuración low-memory de `android/gradle.properties`.
3. Compilar primero el flavor `free` en debug.

Comando recomendado:

```bash
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
export PATH="$JAVA_HOME/bin:$PATH"
cd android && ./gradlew --stop && ./gradlew app:assembleFreeDebug --no-daemon
```

Alternativa rápida para desarrollo diario:

```bash
npm run android:metro:clean
npm run android:free
```

### Product Flavors

La app tiene dos variantes de compilación:

| Flavor    | `applicationId`              | `IS_FREE` | Descripción                                               |
| --------- | ---------------------------- | --------- | --------------------------------------------------------- |
| `free`    | `com.guiafarmacologica.free` | `true`    | Todo desbloqueado, sin suscripción, sin UI premium        |
| `premium` | `com.guiafarmacologica`      | `false`   | Trial 14 días + código de activación + futura suscripción |

### Comandos de compilación

```bash
# Debug
./gradlew assembleFreeDebug
./gradlew assemblePremiumDebug

# Release (requiere keystore configurado)
./gradlew assembleFreeRelease
./gradlew assemblePremiumRelease

# Dispositivo físico (recomendado: ARM64, evita error "no compatible")
./gradlew assembleFreeRelease -PreactNativeArchitectures=arm64-v8a
./gradlew assemblePremiumRelease -PreactNativeArchitectures=arm64-v8a

# Ambas variantes release
./gradlew assembleFreeRelease assemblePremiumRelease
```

### Ubicación de APKs

| Variante        | Ruta                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| Free debug      | `android/app/build/outputs/apk/free/debug/`                                       |
| Premium debug   | `android/app/build/outputs/apk/premium/debug/`                                    |
| Free release    | `android/app/build/outputs/apk/free/release/` + copia en `release/Nueva carpeta/` |
| Premium release | `android/app/build/outputs/apk/premium/release/` + copia en `release/`            |

### Firma de Release

Las credenciales del keystore se almacenan en `android/gradle.properties.local` (gitignored):

```properties
MYAPP_UPLOAD_STORE_PASSWORD=tu_password
MYAPP_UPLOAD_KEY_PASSWORD=tu_password
```

El archivo del keystore (`guia-farmacologica-release.keystore`) debe estar en `android/app/`.

## Patrones de Código

### Patrón de pantalla

Todas las pantallas siguen este patrón:

```typescript
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';

export default function MiScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return <View style={styles.container}>{/* contenido */}</View>;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
  accessibilityLabel="Descripción de la acción"
  accessibilityState={{ selected: isActive }}
>
```

### Listas largas

A causa de los enormes conjuntos de datos, está estrictamente prohibido usar genéricos. **Siempre usar `FlashList`** de `@shopify/flash-list`:

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  estimatedItemSize={100} // C R I T I C O para la optimización
/>;
```

### Normalización de texto

Usar la utilidad centralizada para búsquedas insensibles a acentos:

```typescript
import { normalizeText } from '../utils/search';

const match = normalizeText(drug.nombre).includes(normalizeText(query));
```

### Etiquetas de categoría

Usar el mapa centralizado en lugar de switch/if:

```typescript
import { CATEGORY_LABELS } from '../utils/labels';

const label = CATEGORY_LABELS[drug.unidadId] || 'Sin categoría';
```

## Código de Activación (Premium Build)

La versión premium incluye un código secreto que desbloquea todas las funciones permanentemente.

**Cómo funciona:**

1. En AboutScreen, tocar el badge de versión (mostrado como la versión actual del APK, ej. `v1.0.0`) 5 veces rápido
2. Aparece un modal pidiendo el código
3. Se valida contra un hash SHA-256 (el código no existe en texto plano en el APK)
4. Si es correcto, se guarda en AsyncStorage y `isPremium` se activa permanentemente

**Cambiar el código:**

```bash
node -e 'console.log(require("crypto").createHash("sha256").update("NUEVO_CODIGO").digest("hex"))'
```

Reemplazar `ACTIVATION_HASH` en `src/utils/activation.ts` con el hash resultante.

**Archivos involucrados:**

- `src/utils/activation.ts` — SHA-256 puro en JS + validación + persistencia
- `src/context/PremiumContext.tsx` — `isCodeActivated` + `activateWithCode()`
- `src/screens/AboutScreen.tsx` — Easter egg (5 taps) + modal de ingreso

## Cómo Agregar Contenido

> ⚠️ **CRÍTICO — Leer antes de editar `drugs.json`**:
> Los fármacos viven en una BD SQLite local que se hidrata desde `drugs.json`
> en el primer arranque. **Si solo editás el JSON sin bumpear la versión, los
> usuarios que ya tienen la app instalada NO van a recibir los cambios al
> actualizar** — su BD persiste entre updates de APK.
>
> Para que cualquier cambio de `drugs.json` llegue a usuarios existentes:
>
> 1. Editar `src/data/drugs.json`
> 2. **Bumpear `DATASET_VERSION` en `src/data/db.ts`** (incrementar en 1)
> 3. Documentar el cambio en `CHANGELOG.md` bajo `[Unreleased]`
> 4. Bumpear versión de la app (`scripts/bump-version.js` cuando exista)
>
> En el primer arranque post-update, la app detecta `dataset_version` distinto
> en la tabla `_meta`, hace `DELETE FROM drugs` y repobla desde el JSON nuevo.
> Los favoritos/notas/quiz progress del usuario se preservan (viven en
> AsyncStorage/EncryptedStorage, no en la tabla `drugs`).

### Agregar un nuevo fármaco

1. Editar `src/data/drugs.json` añadiendo un objeto `Drug`:
   ```json
   {
     "id": "d_XXXX",
     "nombre": "Nombre Genérico",
     "nombreGenerico": "nombre-generico",
     "familia": "Familia farmacológica",
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
2. **Bumpear `DATASET_VERSION` en `src/data/db.ts`** (ver bloque crítico arriba)
3. Verificar smoke test: instalar APK debug, comprobar que el fármaco aparece
   en búsqueda; luego desinstalar e instalar de nuevo para verificar fresh-install
4. El fármaco aparecerá automáticamente en búsqueda y en su categoría

### Cambiar el schema de la tabla `drugs` (agregar columna)

1. Agregar la columna en `CREATE TABLE` dentro de `ensureBaseSchema()` en `db.ts`
2. **Bumpear `SCHEMA_VERSION`** en `db.ts`
3. Agregar la migración correspondiente en `SCHEMA_MIGRATIONS`:
   ```ts
   // v1 → v2: agregar columna 'codigoNacional'
   (db) => { db.executeSync('ALTER TABLE drugs ADD COLUMN codigoNacional TEXT'); },
   ```
4. **Nunca reordenar ni eliminar migraciones existentes** — están aplicándose
   linealmente en BDs de usuarios reales
5. Si la columna nueva debe poblarse desde `drugs.json`, **también bumpear `DATASET_VERSION`**
   para forzar la repopulación

### Agregar una nueva patología

1. Editar `src/data/pathologies.json`
2. Incluir `linkedDrugs` con IDs de fármacos existentes
3. ⚠️ **Las patologías NO están en SQLite** — se cargan en RAM desde el JSON,
   por lo que los cambios llegan a usuarios sin necesidad de bumpear versiones
   (siempre que el `versionCode` del APK suba). Lo mismo aplica a:
   `lab_values.json`, `emergency_protocols.json`, `clinical_scales.json`,
   `parenteral_guide.json`, `formulas.json`, `glossary.json`, `routes.json`

### Agregar un protocolo de emergencia

1. Editar `src/data/emergency_protocols.json`
2. Cada protocolo tiene `steps` con tiempos, `drugDoses`, `decisionPoints` y `redFlags`

### Agregar una escala clínica

1. Editar `src/data/clinical_scales.json`
2. Tipos soportados: `components` (sumable), `selector` (selección única), `checklist`

### Agregar un valor de laboratorio

1. Editar `src/data/lab_values.json`
2. Incluir rangos por sexo (`male`, `female`) y opcionalmente `pediatric`

## Cómo Agregar una Pantalla Nueva

1. Crear `src/screens/NuevaPantalla.tsx` siguiendo el patrón de pantalla
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

## Cómo Agregar un Hook

1. Crear `src/hooks/useNuevoHook.ts`
2. Si necesita persistencia, usar AsyncStorage con clave `@guia_farmaco_<nombre>`
3. Si necesita estado global, crear un Context provider en `src/context/`
4. Registrar el provider en `App.tsx` en el orden correcto del árbol

## Estructura de Archivos Nativa (Android)

```
android/app/src/main/java/com/guiafarmacologica/
  ├── MainActivity.kt          ← Activity principal de React Native
  ├── MainApplication.kt       ← Registro de paquetes nativos
  ├── BuildConfigModule.kt     ← Módulo nativo que expone IS_FREE a JS
  └── BuildConfigPackage.kt    ← Registra BuildConfigModule
```

### Agregar un nuevo módulo nativo

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
  │   ├── ic_launcher_foreground.xml ← Ícono del launcher (108dp)
  │   └── ic_launcher_background.xml
  ├── mipmap-*/                      ← Íconos del launcher en diferentes densidades
  └── values/
      ├── strings.xml                ← Nombre de la app
      ├── colors.xml                 ← Color del splash (#1E40AF)
      └── styles.xml                 ← Tema del splash
```

## Depuración

### React Native Dev Menu

- **Android emulador**: `Ctrl + M`
- **Dispositivo físico**: Agitar el dispositivo

### Logs

```bash
# Logs de React Native
npx react-native log-android

# Logs filtrados
adb logcat *:E ReactNative:V ReactNativeJS:V
```

### Recarga

- **Fast Refresh**: Automático al guardar archivos
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

ProGuard está habilitado para release builds. Las reglas están en `android/app/proguard-rules.pro`. Si un release build falla en runtime pero el debug funciona, revisar las reglas de ProGuard.
