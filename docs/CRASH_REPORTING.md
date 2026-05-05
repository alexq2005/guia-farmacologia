# Crash Reporting

> Estado actual: **scaffolding listo, provider real no instalado**.
>
> El código de la app reporta excepciones a un wrapper en
> `src/utils/crashReporting.ts`. Por defecto el wrapper es no-op (solo
> `console.error` en dev). Cuando decidas activar un proveedor real, este
> documento te guía paso a paso.

## ¿Qué viene activado hoy?

- `crashReporting.captureException(error, context)` — interfaz pública
- `ErrorBoundary` ya llama a `captureException` automáticamente cuando React
  catchea un error en el árbol de componentes (ver
  `src/components/ErrorBoundary.tsx`).
- `initCrashReporting()` se invoca en `App.tsx` antes de cualquier render.

Sin DSN configurado, esto **no envía nada** a ningún servidor. Es seguro
mergear y publicar tal como está.

## Cuándo activarlo

Recomendado: **después del próximo release de Play Store** que contenga la
infraestructura de migraciones SQLite. El primer release post-migración es
el que más riesgo tiene de regresiones inesperadas — querés saber si crashea
en algún device específico.

## Opción A: Sentry (recomendado para esta app)

### 1. Crear cuenta y proyecto

1. Ir a https://sentry.io/signup/
2. Crear proyecto: tipo **React Native**, nombre `guia-farmacologica`
3. Copiar el DSN (formato: `https://abc...@o123456.ingest.sentry.io/789...`)
4. Configurar región **EU** si la app sirve mayormente Argentina/España
5. **Plan recomendado**: Free tier (5k errors/mes) inicialmente. Subir a
   Team plan ($26/mo) si la app llega a 50k+ DAU.

### 2. Instalar SDK

```bash
npm install @sentry/react-native
```

Esto agrega autolinking para Android. Para iOS necesitarías
`cd ios && pod install` (no aplicable a este proyecto, Android-only).

### 3. Wizard automático (opcional pero recomendado)

```bash
npx @sentry/wizard@latest -i reactNative -p android
```

El wizard:

- Patcha `MainApplication.kt` para inicializar Sentry nativo
- Agrega el plugin Sentry a `android/build.gradle` para sourcemaps automáticos
- Crea `sentry.properties` con auth token (gitignoreado)
- Configura release tracking con `versionName` + `versionCode`

### 4. Configurar provider real

Reemplazar `consoleProvider` y `provider` en
`src/utils/crashReporting.ts`:

```ts
import * as Sentry from '@sentry/react-native';
import { NativeModules } from 'react-native';

const SENTRY_DSN = 'YOUR_DSN_HERE'; // o leer de BuildConfigModule / .env

const sentryProvider: CrashReporter = {
  init() {
    if (__DEV__ || !SENTRY_DSN) {
      return; // no enviar nada en dev
    }
    Sentry.init({
      dsn: SENTRY_DSN,
      release: NativeModules.BuildConfigModule?.VERSION_NAME ?? 'unknown',
      // App medical: posición conservadora
      tracesSampleRate: 0.0, // sin performance monitoring
      sendDefaultPii: false, // sin IP, sin user IDs
      attachStacktrace: true,
      beforeSend(event) {
        // Strip notas/búsquedas privadas que pudieron entrar en breadcrumbs
        if (event.breadcrumbs) {
          event.breadcrumbs = event.breadcrumbs.filter(b => {
            const msg = (b.message ?? '').toLowerCase();
            return !msg.includes('nota:') && !msg.includes('search:');
          });
        }
        // Strip context.extra que podría tener datos del usuario
        if (event.extra) {
          delete event.extra.notes;
          delete event.extra.searchQuery;
        }
        return event;
      },
    });
  },
  captureException(error, context) {
    Sentry.captureException(error, { extra: context });
  },
  captureMessage(message, severity = 'error') {
    Sentry.captureMessage(message, severity as Sentry.SeverityLevel);
  },
  addBreadcrumb(message, data) {
    Sentry.addBreadcrumb({ message, data });
  },
  setTag(key, value) {
    Sentry.setTag(key, value);
  },
};

const provider: CrashReporter = sentryProvider;
```

### 5. Sourcemaps en releases

Para que los stack traces sean legibles (Hermes bytecode → JS), hay que
subir sourcemaps a Sentry en cada build de release. Si corriste el wizard,
ya está configurado. Si no, agregar a `scripts/upload-sourcemaps.sh` y
correr después de `assemblePremiumRelease`:

```bash
npx sentry-cli releases files "$VERSION_NAME" upload-sourcemaps \
  --dist "$VERSION_CODE" \
  --strip-prefix "$(pwd)" \
  android/app/build/generated/sourcemaps/react/release/
```

### 6. Privacy policy update

La privacy policy del proyecto (`docs/privacy-policy.html`) debe mencionar:

> Esta aplicación reporta errores técnicos anónimos a Sentry (sentry.io)
> para detectar y corregir fallas de la aplicación. No se envían datos
> personales del usuario, notas, búsquedas, ni información clínica.
> Los reportes incluyen el modelo del dispositivo, versión de Android,
> y el stack trace del error. Sentry retiene esta información por 30 días.

## Opción B: Firebase Crashlytics

Pros: gratis, mantenido por Google, integración Play Console.
Cons: requiere Firebase project + `google-services.json`, vendor lock-in.

```bash
npm install @react-native-firebase/app @react-native-firebase/crashlytics
```

Luego seguir la guía oficial de RN Firebase.

## Opción C: GlitchTip (self-hosted, compatible Sentry API)

Para máxima privacidad: GlitchTip es un Sentry-compatible open source que
podés correr en tu propio VPS. El SDK `@sentry/react-native` apunta a tu
servidor en lugar de sentry.io.

```ts
Sentry.init({
  dsn: 'https://tu-instancia.com/api/123/...',
});
```

## Mantener no-op (status quo)

Es una decisión válida si:

- No querés introducir dependencias de telemetría
- La app no tiene escala donde rastrear crashes valga el costo
- Confiás en feedback directo de usuarios + Play Console "Vitals"

Play Console > App quality > Android Vitals ya provee crash rate básico
agregado por device, sin SDK adicional. Es menos detallado pero gratis y
sin overhead de privacidad.
