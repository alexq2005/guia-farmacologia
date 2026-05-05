# OTA Updates — Investigación y Recomendación

> Estado: **research** — no implementado. Este documento existe para informar
> una decisión, no para definir un plan de ejecución.
>
> Fecha del análisis: 2026-05-05.

## Contexto

**Over-the-air (OTA) updates** permiten distribuir cambios de código JavaScript
(no nativo) sin pasar por Play Store. El bundle Hermes nuevo se descarga al
arranque de la app y reemplaza al embebido en el APK.

**Pregunta que motiva esta investigación**: ¿vale la pena introducir OTA en
_Guía Farmacológica de Enfermería_ para acelerar el ciclo de actualizaciones?

## El ciclo actual sin OTA

1. Bumpear versión (`npm run version:patch`)
2. Build release: `./gradlew assembleFreeRelease assemblePremiumRelease`
3. Subir AAB a Play Console
4. Review de Google: **típicamente 1-3 días** (puede ser 24h, puede ser una semana)
5. Rollout staged (10% → 25% → 50% → 100%) si se hace responsable
6. Usuario actualiza el APK desde Play Store → ve cambios

**Tiempo total** desde código verde a usuario: ~2-7 días para rollout completo.

## Opciones evaluadas (2026)

### ❌ Microsoft CodePush

- **Deprecated en marzo 2024**, retirement en 2026.
- AppCenter también discontinuado.
- **No usar**: sin soporte futuro.

### ❌ AppCenter Codepush

- Mismo equipo que CodePush, mismo destino. Discontinuado.

### ⚠️ Expo Updates (EAS Update)

- **Viable** en bare workflow (no necesita Expo CLI, solo el paquete).
- Tier gratuito: **1,000 MAU** (insuficiente si la app crece).
- Production: **USD $99/mes** (5,000 MAU) o $499/mes (50k MAU).
- Setup: 4-6 horas (instalación, config nativa Android, signing keys, channels).
- DX excelente, dashboard moderno, sourcemaps automáticos.
- Lock-in moderado: si dejás EAS, el SDK queda y migrar a self-hosted requiere refactor.

### ✅ expo-updates self-hosted

- Mismo SDK que EAS, pero el servidor lo hostea uno.
- Requiere: servidor S3 + CloudFront (o similar) + signing keys.
- Costo: **~USD $5/mes** VPS o tier free de R2/S3 + CDN.
- Setup: 10-15 horas (más complejo que EAS).
- Sin vendor lock-in.
- Mantenido por Expo (open source).

### ✅ react-native-ota-hot-update (independiente)

- Librería MIT, no afiliada a Expo.
- Self-hosted desde el inicio.
- Compatible RN 0.71+.
- Comunidad chica pero activa (~700 stars, mantenido en 2025).
- Setup: 6-8 horas.
- Buena opción si querés evitar el ecosistema Expo entero.

### ✅ "No OTA" (status quo)

- Cero complejidad nueva.
- Ciclo ya conocido.
- Para hotfixes críticos: **Play Console tiene "expedited review"** que reduce el tiempo a ~6h en casos justificados.

## Consideraciones específicas para una app médica

### 🚨 Política de Google Play

> "Apps that change core functionality without using Google Play update mechanisms
> (e.g., apps that download executable code or update significant portions of the
> app outside Play) may be removed."
> — Google Play Developer Policy

Interpretación práctica:

- ✅ **Bug fixes de UI** vía OTA: claramente permitido.
- ✅ **Cambios de strings, colores, copy**: permitido.
- ⚠️ **Cambios en lógica de cálculo (calculadoras, dosis)**: **gris**. Técnicamente "core functionality". Si Play detecta cambios de behavior significativos vía OTA, puede deshabilitar la app.
- ❌ **Agregar features nuevas significativas** vía OTA: **no permitido**.

Para esta app específicamente:

- 15 calculadoras médicas (Parkland, APACHE II, etc.) — cualquier cambio acá NO debería ir por OTA.
- Datos farmacológicos (drugs.json) — son contenido, no código. Discusión aparte.
- Bug fixes de navegación, tema, etc. — OTA OK.

### 🚨 Responsabilidad legal en app médica

- Si una OTA introduce un bug en cálculo de dosis y un usuario aplica esa dosis incorrecta → responsabilidad del publisher.
- Play Store review actúa como **gate** — si pasa la review, hay un argumento de "diligencia debida".
- OTA salta ese gate. El publisher es solo responsable.

## Comparación final

| Opción                      | Costo    | Setup  | Mantenimiento | Lock-in  | Apto medical   |
| --------------------------- | -------- | ------ | ------------- | -------- | -------------- |
| EAS Update                  | $99/mes+ | 4-6h   | Bajo          | Moderado | ⚠️ con cuidado |
| expo-updates self-host      | ~$5/mes  | 10-15h | Medio         | Bajo     | ⚠️ con cuidado |
| react-native-ota-hot-update | ~$5/mes  | 6-8h   | Medio         | Bajo     | ⚠️ con cuidado |
| **Status quo (sin OTA)**    | $0       | 0h     | Cero          | Cero     | ✅             |

## 🎯 Recomendación

**No implementar OTA. Mantener status quo.**

Razones:

1. **Categoría medical** + Google Play policy = OTA tiene zona gris peligrosa.
2. **Responsabilidad legal**: Play Store review es un gate útil para una app de
   consulta clínica.
3. **Beneficio marginal**: el ciclo de Play Store (1-3 días) es aceptable para
   una app de referencia. No hay urgencia de horas.
4. **Costo de oportunidad**: 6-15h de setup + ongoing maintenance + complejidad
   nueva en el árbol de dependencias. Mejor invertir esas horas en Sentry,
   tests, o limpieza de baseline.
5. **Hotfix crítico**: existe el camino de "expedited review" de Play Store.

### Cuándo reconsiderar

Reconsiderar OTA si:

- La app llega a 100k+ DAU y bug fixes no triviales aparecen con frecuencia mensual.
- Aparece una feature de "configuración remota" (feature flags, A/B tests, etc.)
  que justifique parte de la infraestructura.
- Google flexibiliza la política respecto a apps medical (improbable).

### Alternativa más barata para velocidad

En lugar de OTA, optimizar el **ciclo de Play Store**:

- **Configurar staged rollout automático** desde Play Console (10% → 100% en 7 días).
- **Pre-launch testing tracks** (internal, closed alpha, open beta) para validar
  builds antes de producción.
- **Pipeline de CI** que pre-construye AABs en cada merge a main, ahorrando ~30
  min de cada release manual.

Estas mejoras dan velocidad sin agregar OTA y se alinean con F2 (bump-version)
y F6 (CI) ya implementados.

## Referencias

- [Google Play Developer Policy — Device and Network Abuse](https://support.google.com/googleplay/android-developer/answer/9888379)
- [Expo Updates docs](https://docs.expo.dev/eas-update/introduction/)
- [react-native-ota-hot-update GitHub](https://github.com/vantuan88291/react-native-ota-hot-update)
- [CodePush retirement notice (Microsoft)](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/)
