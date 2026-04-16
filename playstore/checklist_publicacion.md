# Checklist de Publicación — Google Play Store

## Pre-requisitos

- [ ] **Cuenta Google Play Console** — Registro en [play.google.com/console](https://play.google.com/console) ($25 USD, pago único)
- [ ] **Correo de contacto** verificado: alexq2005@gmail.com

---

## 1. Assets Gráficos

### Icono (obligatorio)
- [ ] Abrir `playstore/generate_icon.html` en un navegador
- [ ] Descargar el icono 512×512 PNG
- [ ] Verificar que se ve bien sobre fondo claro y oscuro

### Feature Graphic (obligatorio)
- [ ] Abrir `playstore/generate_feature_graphic.html` en un navegador
- [ ] Verificar que dice "2784 Fármacos" (ya actualizado)
- [ ] Descargar el gráfico 1024×500 PNG

### Screenshots (obligatorio, mínimo 2, recomendado 5-8)
- [ ] Compilar la app en modo debug: `./gradlew installPremiumDebug`
- [ ] Tomar capturas en un dispositivo/emulador (1080×1920 portrait)
- [ ] Capturas sugeridas:
  1. HomeScreen — pantalla principal con fármaco del día
  2. DrugDetail — detalle de un fármaco completo
  3. SearchScreen — búsqueda con resultados
  4. QuizScreen — test farmacológico
  5. ClinicalScales — escala de Glasgow interactiva
  6. LabValues — valores de laboratorio
  7. EmergencyProtocols — protocolo de emergencia
  8. Calculators — calculadora clínica
- [ ] Guardar en `playstore/screenshots/`

---

## 2. Política de Privacidad (obligatorio)

La política ya está escrita en `docs/privacy-policy.html`. Debe estar accesible en una URL pública.

**Opciones para hostear:**

### Opción A: GitHub Pages (gratis, recomendado)
1. Crear un repositorio público en GitHub (ej: `guia-farmacologica-legal`)
2. Subir `privacy-policy.html` como `index.html`
3. Settings → Pages → Deploy from main branch
4. URL resultante: `https://tu-usuario.github.io/guia-farmacologica-legal/`

### Opción B: Firebase Hosting (gratis tier)
1. `firebase init hosting` en un directorio temporal
2. Copiar `privacy-policy.html` a `public/index.html`
3. `firebase deploy`
4. URL resultante: `https://tu-proyecto.web.app/`

---

## 3. Compilar APK Release

```bash
# Desde GuiaFarmacologica/android/
export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED"

# Compilar versión premium (la que va a Play Store)
./gradlew assemblePremiumRelease

# APK resultante en:
# app/build/outputs/apk/release/  (copia automática)
# app/build/outputs/apk/premium/release/  (original)
```

- [ ] Verificar que el APK se genera sin errores
- [ ] Verificar `versionName: "1.0.0"` y `versionCode: 3`
- [ ] Probar el APK release en un dispositivo real antes de subir

---

## 4. Crear Ficha en Google Play Console

### Información básica
- [ ] **Nombre**: Guía Farmacológica Enfermería (≤30 chars)
- [ ] **Descripción breve**: copiar de `playstore/ficha_play_store.txt` (≤80 chars)
- [ ] **Descripción completa**: copiar de `playstore/ficha_play_store.txt` (≤4000 chars)
- [ ] **Categoría**: Medicina
- [ ] **Correo de contacto**: alexq2005@gmail.com
- [ ] **Política de privacidad**: pegar la URL pública (del paso 2)

### Assets gráficos
- [ ] Subir icono 512×512
- [ ] Subir feature graphic 1024×500
- [ ] Subir screenshots (mínimo 2)

---

## 5. Cuestionario de Clasificación de Contenido

Google requiere completar un cuestionario (IARC) para asignar clasificación.

**Respuestas orientativas:**
- ¿Contiene violencia? → **No**
- ¿Contenido sexual? → **No**
- ¿Lenguaje ofensivo? → **No**
- ¿Drogas/sustancias controladas? → **No** (es referencia médica educativa, no promueve uso recreativo)
- ¿Permite interacción entre usuarios? → **No**
- ¿Comparte ubicación del usuario? → **No**
- ¿Recopila datos personales? → **No** (todo se almacena localmente)
- ¿Contiene publicidad? → **No**
- ¿Compras dentro de la app? → **Sí** (suscripción)

**Resultado esperado**: Everyone / Todos (PEGI 3 / ESRB E)

---

## 6. Configurar Suscripciones (Google Play Console)

En **Monetización → Productos → Suscripciones**:

### Suscripción Mensual
- [ ] ID del producto: `premium_monthly`
- [ ] Nombre: "Premium Mensual"
- [ ] Descripción: "Acceso completo a todas las funciones premium"
- [ ] Precio: **4.99€/mes**
- [ ] Período de prueba gratuita: **14 días**
- [ ] Período de gracia: 7 días (recomendado)

### Suscripción Anual
- [ ] ID del producto: `premium_yearly`
- [ ] Nombre: "Premium Anual"
- [ ] Descripción: "Acceso completo a todas las funciones premium — ahorro ~58%"
- [ ] Precio: **24.99€/año**
- [ ] Período de prueba gratuita: **14 días**
- [ ] Período de gracia: 7 días (recomendado)

> **Nota**: Los IDs de producto deben coincidir con los usados en el código de la app. Actualmente la app usa el sistema de activación por código (`activation.ts`), no Google Play Billing. Para suscripciones reales via Play Store, se necesitará integrar `react-native-iap` o similar.

---

## 7. Subir APK y Enviar a Revisión

- [ ] Ir a **Release → Production → Create new release**
- [ ] Subir el APK premium release
- [ ] Añadir notas de la versión:
  ```
  Versión 1.0.0 — Lanzamiento inicial
  • 2784 fármacos con información completa
  • 13 escalas clínicas interactivas
  • 14 protocolos de emergencia
  • 15 calculadoras clínicas
  • Guía de administración parenteral
  • Test farmacológico con 8 tipos de preguntas
  • 100% offline
  ```
- [ ] Revisar toda la ficha una última vez
- [ ] **Enviar a revisión** (Google tarda 1-7 días en la primera revisión)

---

## 8. Post-publicación

- [ ] Verificar que la app aparece en Play Store
- [ ] Probar la descarga desde Play Store en un dispositivo limpio
- [ ] Monitorizar las métricas iniciales en Play Console (crashes, ANRs)
- [ ] Responder a las primeras reseñas de usuarios

---

## Notas Importantes

- La **versión free** (`com.guiafarmacologica.free`) se puede subir como app separada si se desea, con su propia ficha
- El APK release ya tiene **ProGuard** habilitado para ofuscación y reducción de tamaño (~41MB)
- El **keystore de release** debe guardarse de forma segura — si se pierde, no se pueden publicar actualizaciones
