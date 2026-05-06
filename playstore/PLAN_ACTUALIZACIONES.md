# Plan de Actualizaciones — Guía Farmacológica de Enfermería

## Estrategia General

**Objetivo**: Mantener usuarios activos, justificar suscripción mensual y crecer en reviews.
**Cadencia**: 1 actualización mayor por mes + fixes semanales si es necesario.
**Regla de oro**: Cada update debe dar al usuario una razón para abrir la app de nuevo.

---

## ⚠️ Estado actual del cronograma (Mayo 2026)

Este plan refleja la intención original al lanzar la app en Abril 2026. El
roadmap se reordenó en Mayo 2026: el trabajo del mes se invirtió en
**infraestructura fundacional** en lugar de las features de UX previstas
para el Mes 2:

- Sistema de migraciones SQLite (resolvió bug crítico: `drugs.json` no
  llegaba a usuarios existentes — ver `CHANGELOG.md` `[Unreleased]`)
- Suite de tests (109 tests, fórmulas clínicas verificadas hand-calculated)
- CI con GitHub Actions, husky pre-commit/pre-push hooks
- Sistema de metadata por dataset (`_meta.json`) + UI de provenance
- Crash reporting scaffold (no-op, listo para activar Sentry/Crashlytics)
- Compliance Google Play 2026 (disclaimer, declaración Health apps)
- MiSuite — hub cross-app del ecosistema

**Razón del reordenamiento**: este trabajo era prerequisito para que cualquier
feature futura llegue a usuarios de forma confiable. Las features de UX
(búsqueda por voz, +patologías, push notifications, etc.) descritas abajo
se difieren a meses posteriores según prioridades.

El plan original se mantiene como referencia direccional — los meses no
son fechas literales sino orden de prioridad.

---

## Fase 1 — Primeros 3 meses (Lanzamiento + Tracción)

### Mes 1: Lanzamiento (Abril 2026)

**Foco**: Publicar, primeros usuarios, feedback

| Tarea                   | Detalle                                             |
| ----------------------- | --------------------------------------------------- |
| Publicar en Play Store  | APK + ficha + capturas                              |
| Crear Instagram/TikTok  | @guiafarmacologica                                  |
| Publicar 10 posts/reels | Tips farmacológicos + "descarga la app"             |
| Compartir en 20+ grupos | WhatsApp/Facebook de estudiantes de enfermería      |
| Pedir reviews           | A colegas, compañeros, conocidos (meta: 30 reviews) |
| Monitorear crashes      | Google Play Console > Android Vitals                |
| Fix bugs reportados     | Responder reviews negativas con fixes               |

### Mes 2: Búsqueda por Voz + Visual Upgrade (Mayo 2026)

**Update v1.1 — Búsqueda por Voz y Fotos Reales**

| Feature                        | Detalle                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Búsqueda por voz**           | Botón micrófono en SearchBar → Google Speech → texto → búsqueda. Librería: `@react-native-voice/voice`. Permiso RECORD_AUDIO |
| **Fotos reales en categorías** | Reemplazar íconos planos por fotos médicas reales de Unsplash en CategoriesScreen y ToolsScreen                              |
| **Fármaco del día mejorado**   | Card hero con foto + gradiente en HomeScreen                                                                                 |
| **Rediseño HomeScreen**        | Hero cards con fotos por categoría terapéutica                                                                               |
| Marketing                      | Reel: "Buscá fármacos con tu voz" + demo en video                                                                            |

### Mes 3: Contenido nuevo + Engagement (Junio 2026)

**Update v1.2 — Más Patologías + Notificaciones**

| Feature                       | Detalle                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| **+40 patologías**            | Llegar a 100 patologías con fármacos vinculados             |
| **Fármaco del día push**      | Notificación push diaria con fármaco aleatorio y dato clave |
| **Compartir resultados quiz** | Botón para compartir score en redes/WhatsApp                |
| **Rediseño QuizScreen**       | Cards con fotos por categoría de pregunta                   |
| **+500 fármacos nuevos**      | Llegar a ~2300 fármacos                                     |
| Marketing                     | "Fármaco del día" en Instagram Stories                      |

---

## Fase 2 — Meses 4-6 (Crecimiento)

### Mes 4: Gamificación + Estudio (Julio 2026)

**Update v1.3 — Modo Estudio + Flashcards**

| Feature                      | Detalle                                                                   |
| ---------------------------- | ------------------------------------------------------------------------- |
| **Flashcards**               | Tarjetas de repaso: fármaco → indicación/dosis, pregunta/respuesta rápida |
| **Modo estudio**             | Marcar fármacos como "estudiado" / "por repasar"                          |
| **Recordatorios de estudio** | Notificación configurable para repasar                                    |
| **Racha de estudio**         | "Llevas 7 días consecutivos estudiando" (gamificación)                    |
| **Widget Android**           | Fármaco del día en la pantalla de inicio                                  |

### Mes 5: Expansión de contenido (Agosto 2026)

**Update v1.4 — Más herramientas clínicas**

| Feature                         | Detalle                                                                  |
| ------------------------------- | ------------------------------------------------------------------------ |
| **+5 escalas clínicas**         | Downton, APACHE II, TISS-28, Child-Pugh, SOFA                            |
| **+5 protocolos**               | Transfusión sanguínea, quimioterapia, aislamiento, dolor agudo, sedación |
| **Más calculadoras**            | Corrección de sodio, déficit de agua libre, escala de Glasgow pediátrica |
| **Guía de diluciones mejorada** | Tabla visual de compatibilidades expandida                               |

### Mes 6: Monetización (Septiembre 2026)

**Update v1.5 — Plan Anual + Referidos**

| Feature                  | Detalle                                               |
| ------------------------ | ----------------------------------------------------- |
| **Google Play Billing**  | Integrar `react-native-iap` para suscripciones reales |
| **Plan anual**           | €24.99/año (ahorro del 58% vs mensual)                |
| **Código de referido**   | "Invitá a un colega y ambos obtienen 1 mes gratis"    |
| **Descuento estudiante** | Verificación con email .edu → 50% descuento           |

---

## Fase 3 — Meses 7-12 (Consolidación)

### Mes 7-8: Multiplataforma

**Update v2.0 — iOS**

| Feature                    | Detalle                                         |
| -------------------------- | ----------------------------------------------- |
| **Publicar en App Store**  | Mismo código (React Native), adaptar para iOS   |
| **Sincronización**         | Backup de favoritos/notas en la nube (opcional) |
| **App Store Optimization** | Capturas, keywords, descripción optimizada      |

### Mes 9-10: Interactividad

**Update v2.1 — Casos Clínicos**

| Feature                  | Detalle                                             |
| ------------------------ | --------------------------------------------------- |
| **30 casos clínicos**    | Paciente simulado → seleccionar fármacos correctos  |
| **Árbol de decisiones**  | Cada elección cambia el resultado del paciente      |
| **Score de desempeño**   | Evaluación de las decisiones farmacológicas tomadas |
| **Casos por dificultad** | Básico, intermedio, avanzado                        |

### Mes 11-12: Contenido Premium+

**Update v2.2 — Contenido exclusivo**

| Feature                    | Detalle                                        |
| -------------------------- | ---------------------------------------------- |
| **Videos cortos**          | 2-3 min explicando técnicas de administración  |
| **Resúmenes descargables** | PDF por categoría terapéutica para imprimir    |
| **Preparación de examen**  | Quiz específico para exámenes de certificación |
| **Cross-promotion**        | Enlace a app Patologías de Enfermería          |

---

## Métricas Clave (KPIs)

| Métrica                    | Meta Mes 1 | Meta Mes 3 | Meta Mes 6 | Meta Mes 12 |
| -------------------------- | ---------- | ---------- | ---------- | ----------- |
| Descargas totales          | 500        | 3,000      | 10,000     | 30,000      |
| Reviews en Play Store      | 30         | 100        | 300        | 1,000       |
| Rating promedio            | 4.5+       | 4.5+       | 4.3+       | 4.3+        |
| Suscriptores activos       | 20         | 150        | 500        | 2,000       |
| Ingreso mensual (EUR)      | €100       | €750       | €2,500     | €10,000     |
| Retención día 7            | 40%        | 50%        | 55%        | 60%         |
| DAU (usuarios activos/día) | 50         | 300        | 1,000      | 3,000       |

---

## Proyección de Ingresos

### Escenario conservador (precio €4.99/mes)

| Mes | Descargas acum. | Conversión 3% | Suscriptores | Ingreso/mes |
| --- | --------------- | ------------- | ------------ | ----------- |
| 1   | 500             | 15            | 15           | €75         |
| 3   | 3,000           | 90            | 70           | €350        |
| 6   | 10,000          | 300           | 200          | €998        |
| 12  | 30,000          | 900           | 500          | €2,495      |

### Escenario optimista (precio €4.99/mes + marketing activo)

| Mes | Descargas acum. | Conversión 5% | Suscriptores | Ingreso/mes |
| --- | --------------- | ------------- | ------------ | ----------- |
| 1   | 1,000           | 50            | 50           | €250        |
| 3   | 5,000           | 250           | 200          | €998        |
| 6   | 20,000          | 1,000         | 600          | €2,994      |
| 12  | 50,000          | 2,500         | 1,500        | €7,485      |

> **Nota**: Google Play se queda con 15% (primer millón anual) de comisión.
> Ingresos netos = Ingreso bruto × 0.85

---

## Contenido para Redes Sociales

### Instagram / TikTok — Ideas de contenido

| Tipo                      | Ejemplo                                              | Frecuencia |
| ------------------------- | ---------------------------------------------------- | ---------- |
| **Fármaco del día**       | "Furosemida: 5 cuidados de enfermería"               | 3/semana   |
| **Interacción peligrosa** | "¿Sabías que Warfarina + AINEs = hemorragia?"        | 2/semana   |
| **Tip de administración** | "Nunca mezclar Vancomicina con..."                   | 2/semana   |
| **Quiz rápido**           | "¿Cuál es la categoría de embarazo del Metotrexato?" | 1/semana   |
| **Meme de enfermería**    | Humor relatable para engagement                      | 1/semana   |
| **Tutorial app**          | Cómo usar el verificador de interacciones            | 1/semana   |

### Hashtags recomendados

```
#enfermería #farmacología #fármacos #medicamentos
#cuidadosdeenfermería #vademécum #guíafarmacológica
#estudiatedeenfermería #hospitallife #dosis
#interacciones #protocolos #escalasclínicas
#appmédica #enfermeríalatina #saludpública
```

---

## Prioridades si hay poco tiempo

Si solo podés dedicar pocas horas por semana, enfocate en:

1. **Redes sociales** (30 min/día) — es lo que más mueve descargas
2. **Responder reviews** (10 min/día) — mejora rating y retención
3. **1 update por mes** — contenido nuevo justifica suscripción
4. **Fix bugs rápido** — 1 estrella por crash es difícil de recuperar

Lo que NO hacer:

- No gastar plata en ads hasta tener 100+ reviews orgánicas
- No agregar features complejas antes de tener tracción
- No ignorar feedback negativo — cada review negativa es una oportunidad
