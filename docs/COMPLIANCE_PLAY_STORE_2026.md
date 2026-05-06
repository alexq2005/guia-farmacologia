# Cumplimiento Google Play Store 2026 — Health Apps

A partir de **enero 2026** Google introdujo nuevos requisitos para apps de
salud y medicina. Este documento es un checklist específico para nuestro
caso (app de referencia farmacológica para profesionales de enfermería).

Fuentes de referencia:

- [Health Content and Services policy (Play Console)](https://support.google.com/googleplay/android-developer/answer/16679511)
- [Health apps declaration form](https://support.google.com/googleplay/android-developer/answer/14738291)
- [Google Play Health Apps Update — January 2026](https://myappmonitor.com/blog/google-play-health-apps-update-2026-requirements)

---

## Checklist de cumplimiento

### 1. Health apps declaration form (OBLIGATORIO)

- [ ] **Verificar en Play Console**: ir a _App content → Health apps_ y
      confirmar que el formulario está completado.
- [ ] Categoría declarada: **"Health information / reference"** (no es un
      dispositivo médico, no diagnostica, no trata).
- [ ] Indicar que **NO** se solicitan permisos `READ_HEALTH_DATA_IN_RECORDS`.

**Estado actual del proyecto**: el `AndroidManifest.xml` no solicita
permisos de Health Connect. ✅ Compatible.

### 2. Disclaimer en la descripción de Play Store (OBLIGATORIO)

Google exige que la descripción incluya literalmente (o muy cerca) el
siguiente wording:

> Esta aplicación NO es un dispositivo médico y NO diagnostica, trata, cura
> ni previene ninguna afección. La información proporcionada es de
> referencia educativa para profesionales de la salud. Siempre consulte a un
> profesional de la salud para consejo médico, diagnóstico o tratamiento, y
> verifique cualquier decisión clínica con las fuentes primarias y los
> protocolos de su institución.
>
> Nota: se evita el adjetivo "cualificado" (España) o "calificado" (LatAm)
> para que el disclaimer funcione en ambos mercados objetivo (España y
> Argentina/Latinoamérica). El wording neutro "profesional de la salud"
> se entiende en cualquier país hispanohablante sin sonar regional.

Versión en inglés (si se publica también para mercado anglófono):

> This app is NOT a medical device and does NOT diagnose, treat, cure, or
> prevent any medical condition. Information provided is for educational
> reference. Always consult a qualified healthcare professional for medical
> advice, diagnosis, or treatment, and verify any clinical decision against
> primary sources and your institution's protocols.

- [ ] Ya incluido en `playstore/ficha_play_store.txt` y
      `docs/play-store-listing.md` ✅
- [ ] Verificar al subir a Play Console que el listing público incluye
      este disclaimer textualmente.

### 3. Privacy policy (OBLIGATORIO)

Requisitos Google:

- [ ] URL **pública**, accesible sin login.
- [ ] **No PDF** — debe ser HTML o equivalente navegable.
- [ ] **No editable** — no Google Doc abierto, ni un wiki público.
- [ ] Especificar qué datos personales se recogen (en nuestro caso:
      ninguno — todo local).
- [ ] Especificar terceros con acceso a datos (en nuestro caso: ninguno
      mientras el crash reporting siga siendo no-op; cambiar si se activa
      Sentry/Crashlytics — ver `docs/CRASH_REPORTING.md`).

**Estado actual**: el archivo HTML existe en `docs/privacy-policy.html`
pero **falta hostearlo en una URL pública**. Opciones:

- GitHub Pages (gratis): crear repo público con el HTML como `index.html`.
- Firebase Hosting (gratis tier): `firebase deploy`.
- Cualquier hosting estático.

Una vez hosteado, pegar la URL en Play Console → _Store presence → Main
store listing → Privacy policy_.

### 4. App content rating

- [ ] Cuestionario IARC completado en Play Console.
- [ ] Categoría esperada: **Everyone / PEGI 3 / ESRB E** (sin contenido
      sensible).
- [ ] Respuesta a "¿Drogas/sustancias controladas?" → **No** (es
      referencia educativa, no promueve uso recreativo). Esta es la única
      pregunta del IARC que requiere atención porque la app maneja
      información sobre opioides, sedantes, etc., pero el contexto es
      asistencial.

### 5. Categoría de la app

- [ ] **Medical** (no Health & Fitness, no Education).

### 6. Permisos Android

Verificar que `AndroidManifest.xml` solo declara permisos justificables:

- [x] `INTERNET` — solo si se necesita (actualmente sí, para futuros
      crash reports y deep links a Play Store de las otras apps de la
      suite).
- [x] `<queries>` para esquemas `curso://` y `patologias://` — necesarios
      en Android 11+ para que `Linking.canOpenURL` funcione.
- [x] `<intent-filter>` para `farmacologia://` — para que las otras apps
      puedan abrir ésta.
- [ ] Verificar que **NO** está declarado ningún permiso `BODY_SENSORS`,
      `ACTIVITY_RECOGNITION`, `READ_HEALTH_DATA_*`, `BIND_DEVICE_ADMIN`
      ni similares que requieren justificación adicional.

### 7. Subscripciones IAP

- [ ] Productos `premium_monthly` y `premium_yearly` configurados en Play
      Console > Monetización (ver `playstore/checklist_publicacion.md`).
- [ ] Términos de la suscripción accesibles desde la app
      (`TermsScreen.tsx` ✅).
- [ ] Política de cancelación clara.

### 8. Target API y signing

- [ ] `targetSdkVersion` = 36 (vigente para 2026, definido en
      `android/build.gradle` via `rootProject.ext`).
- [ ] Release signed con `guia-farmacologica-release.keystore` (ver
      `playstore/checklist_publicacion.md`).
- [ ] APK release tiene ProGuard activado (`enableProguardInReleaseBuilds = true`
      en `android/app/build.gradle` ✅).

---

## Cosas que NO aplican (pero es útil saber)

- ❌ **HIPAA**: solo aplica en EE.UU. y solo si la app procesa PHI
  (Protected Health Information de pacientes identificados). Esta app
  no maneja PHI.
- ❌ **MDR (Medical Device Regulation EU)**: no aplica si la app no se
  declara como dispositivo médico. Esta app es referencia educativa, no
  dispositivo médico.
- ❌ **CE marking**: idem MDR.

⚠️ **Si alguna vez se agrega una calculadora que entregue una recomendación
de tratamiento específica para un paciente** (no solo un valor calculado
genérico), la app podría ser reclasificada como dispositivo médico de
clase IIa según MDR. Las calculadoras actuales son **fórmulas genéricas
que devuelven un valor**, no un consejo de tratamiento — eso las mantiene
fuera de MDR.

---

## Sellos de calidad opcionales

No son requisitos de Play Store, pero suman credibilidad:

### HONcode (Health On the Net)

- Costo: gratis.
- Validez: 1 año, renovable.
- 8 principios: autoridad, complementariedad, confidencialidad, atribución,
  justificación, profesionalismo, transparencia financiera, transparencia
  publicitaria.
- Solicitud: https://www.hon.ch/HONcode/
- **Estado actual**: candidato. Requisito principal pendiente: identificar
  responsable sanitario (campo `responsible.name` en `_meta.json`).

### Distintivo AppSaludable (Andalucía)

- Más estricto que HONcode, específico para apps.
- Requiere también: profesional sanitario detrás del contenido, criterios
  de selección documentados, compromiso de revisión y actualización.
- **Estado actual**: la mayoría de los requisitos están cubiertos por
  `_meta.json` + `docs/CLINICAL_REVIEW.md` + `docs/SOURCES.md`. Falta el
  responsable firmado.

---

## Checklist resumido pre-release

Antes de cada release a Play Store, verificar:

- [ ] Versión bumpeada (`npm run version:patch`).
- [ ] CHANGELOG `[Unreleased]` movido a la versión nueva.
- [ ] `tsc --noEmit` exit 0.
- [ ] `npm test` 100% pass.
- [ ] `npm run lint` 0 errors.
- [ ] APK release firmado (premium + free).
- [ ] Disclaimer presente en la descripción de Play Console (no solo en
      el archivo local).
- [ ] Privacy policy URL pública configurada en Play Console.
- [ ] Si cambió contenido clínico significativo, mencionarlo en las "What's
      new" notes de la release.
- [ ] Si se agregó/activó un proveedor de crash reporting, actualizar
      privacy policy ANTES del release.
