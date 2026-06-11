# Catálogo de Funcionalidades

## Funcionalidades Principales

### 1. Base de Datos Farmacológica

**Pantalla**: HomeScreen, SearchScreen, DrugDetailScreen
**Datos**: 2,974 fármacos (Operando a 0 coste RAM vía `SQLite JSI Extractor`)

La funcionalidad central de la app. Cada fármaco incluye:

- Nombre genérico y comercial
- Mecanismo de acción
- Indicaciones y contraindicaciones
- Efectos adversos e interacciones
- Dosificación (adulto, pediátrico, geriátrico, ajuste renal/hepático)
- Vías de administración
- Categoría de embarazo (A-X) y lactancia
- Cuidados de enfermería
- Farmacocinética completa
- Datos de sobredosificación (17 fármacos de alto riesgo)
- Grupo terapéutico y farmacológico (clasificación ATC)

**DrugDetailScreen** es la pantalla más compleja (~41KB) con secciones colapsables, badges de datos incompletos, indicadores de compatibilidad parenteral y botón de copiar.

### 2. Clasificación por Categorías

**Pantalla**: CategoriesScreen, ChapterDrugsScreen
**Datos**: 13 unidades terapéuticas, 117 capítulos

Navegación jerárquica: Unidad > Capítulo > Fármacos. Cada unidad tiene color único. Incluye conteo de fármacos por capítulo.

### 3. Búsqueda Inteligente

**Pantalla**: SearchScreen
**Hook**: useDrugSearch

- Búsqueda full-text sobre todos los campos del fármaco
- Insensible a acentos y mayúsculas (`normalizeText()`)
- Texto de búsqueda precomputado en SQL
- Resultados fluidos a 60 FPS inamovibles renderizados vía **FlashList**
- Historial de búsquedas (max 20, borrado individual con long-press)

### 4. Protocolos de Emergencia

**Pantalla**: EmergencyProtocolsScreen, ProtocolDetailScreen
**Datos**: 18 protocolos
**Premium**: Sí (gated con PremiumGate)

Protocolos con pasos cronometrados para situaciones críticas:

- ACLS (Paro Cardíaco)
- Anafilaxia
- Infarto Agudo de Miocardio (IAM)
- Accidente Cerebrovascular (ACV)
- Sepsis
- Crisis Hipertensiva
- Estatus Epiléptico
- Hipoglucemia Severa
- Edema Agudo de Pulmón
- Shock Hemorrágico
- Intoxicación Aguda
- Cetoacidosis Diabética
- Broncoespasmo Severo
- Síndrome Coronario Agudo

Cada protocolo incluye: pasos con tiempos, dosis de fármacos, puntos de decisión y red flags.

### 5. Escalas Clínicas Interactivas

**Pantalla**: ClinicalScalesScreen, ScaleDetailScreen
**Datos**: 17 escalas
**Premium**: Sí

Escalas con cálculo automático e interpretación:

| Escala        | Tipo       | Uso                         |
| ------------- | ---------- | --------------------------- |
| Glasgow (GCS) | components | Nivel de consciencia        |
| APGAR         | components | Valoración neonatal         |
| Norton        | components | Riesgo de UPP               |
| Braden        | components | Riesgo de UPP               |
| NEWS2         | components | Alerta temprana             |
| RASS          | selector   | Sedación/agitación          |
| Wells         | checklist  | Riesgo TEP                  |
| EVA           | selector   | Intensidad del dolor        |
| Aldrete       | components | Recuperación postanestésica |
| qSOFA         | checklist  | Sospecha sepsis             |
| NIHSS         | components | Gravedad ACV                |
| Mallampati    | selector   | Vía aérea difícil           |
| ASA           | selector   | Riesgo anestésico           |

Tres tipos de interacción: `components` (suman puntos), `selector` (selección única), `checklist` (sí/no).

### 6. Valores de Laboratorio

**Pantalla**: LabValuesScreen
**Datos**: 61 valores en 9 categorías
**Premium**: Sí (parcial)

Categorías: Hematología, Bioquímica, Coagulación, Hepático, Renal, Cardíaco, Endocrino, Orina, Gasometría.

Cada valor incluye:

- Rangos normales por sexo (masculino/femenino) y pediátricos
- Significado clínico de valores altos/bajos
- Fármacos que pueden alterar el valor
- Implicaciones de enfermería

Función de compartir valor de laboratorio (`shareLabValue`).

### 7. Calculadoras Médicas

**Pantalla**: CalculatorsScreen
**Datos**: 15 calculadoras
**Premium**: Sí

| Calculadora                | Descripción              |
| -------------------------- | ------------------------ |
| Dosis por peso             | mg/kg                    |
| Goteo IV                   | gotas/min, ml/h          |
| IMC                        | Índice de masa corporal  |
| Superficie corporal        | Fórmula de Du Bois       |
| Aclaramiento de creatinina | Cockcroft-Gault          |
| Dosis pediátrica           | Reglas de Young/Clark    |
| Conversión de unidades     | mg, mcg, mEq...          |
| Calcio corregido           | Por albúmina             |
| Anion Gap                  | Na - (Cl + HCO3)         |
| Osmolalidad                | Plasmática calculada     |
| QTc Bazett                 | Intervalo QT corregido   |
| Parkland                   | Quemados (líquidos 24h)  |
| Holliday-Segar             | Mantenimiento pediátrico |
| Glasgow (texto)            | GCS con interpretación   |
| APACHE II                  | Gravedad UCI             |

### 8. Guía de Administración Parenteral

**Pantalla**: ParenteralGuideScreen
**Datos**: 460 fármacos enriquecidos

Basada en la Guía del Hospital Son Espases. Cinco pestañas:

1. **Introducción**: Conceptos básicos de vía parenteral
2. **Soluciones**: Tipos de soluciones IV
3. **NPT**: Nutrición parenteral total
4. **Protección**: Equipos de protección personal
5. **Fármacos**: Lista de fármacos con info parenteral

Información por fármaco:

- Compatibilidad con SSF (NaCl 0.9%) y SG5% (indicadores tipo semáforo)
- Compatibilidad con NPT
- Flag de medicamento peligroso (33 fármacos)
- Protección personal necesaria
- Reconstitución, dilución, velocidad de administración

### 9. Verificador de Interacciones

**Pantalla**: InteractionCheckerScreen

Seleccionar 2+ fármacos y verificar interacciones entre ellos. Niveles de severidad con código de colores.

### 10. Patologías

**Pantalla**: PathologiesScreen, PathologyDetailScreen
**Datos**: 60 patologías

Cada patología incluye:

- Descripción, signos y síntomas
- Diagnóstico
- Tratamiento
- Cuidados de enfermería
- Fármacos vinculados (navegación directa a DrugDetail)

### 11. Quiz de Estudio

**Pantalla**: QuizScreen, QuizSessionScreen
**Hook**: useQuiz

8 tipos de preguntas generadas automáticamente desde los datos de fármacos:

- Identificar indicación correcta
- Identificar contraindicación
- Identificar efecto adverso
- Vía de administración
- Categoría de embarazo
- Mecanismo de acción
- Familia farmacológica
- Cuidados de enfermería

Características:

- Filtro por categoría terapéutica
- Puntuación y porcentaje
- Historial de resultados (AsyncStorage)
- 692 fármacos elegibles para preguntas

### 12. Dashboard de Progreso

**Pantalla**: DashboardScreen
**Premium**: Sí

Estadísticas de estudio:

- Puntuación promedio en quizzes
- Barras de progreso por categoría
- Racha de estudio (días consecutivos)
- Resumen de uso general

### 13. Comparador de Fármacos

**Pantalla**: DrugComparisonScreen
**Premium**: Sí

Seleccionar hasta 3 fármacos y compararlos en tabla horizontal con 10 campos:

- Nombre, familia, mecanismo, indicaciones, contraindicaciones
- Efectos adversos, dosis, vías, embarazo, cuidados

### 13b. MiSuite — Hub del Ecosistema

**Pantalla**: MiSuiteScreen (acceso desde ToolsScreen → "Ecosistema")

Hub que detecta cuáles de las 3 apps de enfermería están instaladas en el
dispositivo y permite abrirlas o descargarlas:

- **Guía Farmacológica** (esta app) — _qué le doy al paciente_
- **Patologías de Enfermería** (`com.patologiasenfermeria.free`) — _qué tiene el paciente_
- **Curso de Enfermería** (`com.cursoenfermeria.free`) — _cómo se hace_

Implementación: `Linking.canOpenURL` con esquemas custom (`farmacologia://`,
`patologias://`, `curso://`). Permisos `<queries>` declarados en
AndroidManifest para Android 11+ package visibility.

### 13c. Provenance Banner

**Pantalla**: DrugDetailScreen (footer de cada ficha) + AboutScreen (sección
"Revisión y actualización")

Banner discreto que muestra fuente del dato + fecha de edición + estado de
revisión clínica ("Pendiente" hasta que un profesional firme, "✓ Revisado"
después). Ver [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md) para procedimiento.

---

## Funcionalidades de Usuario

### 14. Favoritos

**Context**: FavoritesContext
**Límite free**: 5 favoritos

Marcar fármacos como favoritos. Acceso rápido desde AllFavoritesScreen. Persistencia en AsyncStorage.

### 15. Notas Personales

**Context**: NotesContext
**Límite free**: 5 notas

Notas por fármaco con auto-guardado (debounce). Vista global en AllNotesScreen.

### 16. Historial de Búsquedas

**Hook**: useSearchHistory
**Capacidad**: 20 entradas

Búsquedas recientes con borrado individual (long-press) y borrado total.

### 17. Fármacos Recientes

**Hook**: useRecentDrugs
**Capacidad**: 15 fármacos

Scroll horizontal en HomeScreen con los últimos fármacos visitados.

### 18. Exportación/Importación de Datos

**Archivo**: utils/backup.ts
**Premium**: Sí

Exportar/importar datos del usuario (favoritos, notas, historial de quiz) como JSON. Función de pegado directo en ToolsScreen.

### 19. Compartir

**Archivo**: utils/share.ts

Tres funciones de compartir:

- `shareDrug()`: Información completa del fármaco como texto estructurado
- `shareProtocol()`: Protocolo de emergencia con pasos
- `shareLabValue()`: Valor de laboratorio con rangos

### 20. Copiar al Portapapeles

**Componente**: CopyButton (en DrugDetailScreen)

Botón para copiar nombre del fármaco y secciones de dosis. Feedback visual al copiar.

---

## Funcionalidades Visuales

### 21. Modo Oscuro

**Context**: ThemeContext
**Modos**: Claro, Oscuro, Sistema (automático)

Las 31 pantallas y 7 componentes soportan modo oscuro completo con transiciones suaves.

### 22. Animaciones

**Archivo**: utils/animations.ts

- Fade-in al entrar a pantallas
- Entrada escalonada (staggered) en HomeScreen
- Escala al presionar DrugCard
- Rotación de chevron en CollapsibleSection
- Animación spring en íconos del tab bar
- Pulse animation en Skeleton loading

### 23. Skeleton Loading

**Componente**: Skeleton.tsx

Variantes: SkeletonCard, SkeletonList, SkeletonDrugDetail. Animación de pulso durante carga de datos.

### 24. Splash Screen

**Archivo**: drawable/splash_logo.xml

Logo vectorial personalizado con:

- Anillo circular decorativo (doble)
- Cruz médica redondeada con sombra
- Libro abierto con líneas de texto
- Línea de pulso ECG
- Cápsulas/píldoras como acento
- Texto "GUÍA FARMACOLÓGICA de Enfermería"

Fondo azul #1E40AF, logo blanco con acentos #93C5FD.

---

## Funcionalidades Técnicas

### 25. ErrorBoundary

**Componente**: ErrorBoundary.tsx

Envuelve toda la app. Si ocurre un error React no capturado:

- Muestra UI amigable con botón de reintentar
- En modo desarrollo, muestra detalles del error

### 26. Accesibilidad

Roles y labels en componentes interactivos:

- `DrugCard`: accessibilityRole, accessibilityLabel
- `CollapsibleSection`: accessibilityState (expanded)
- `SearchBar`: accessibilityRole="search"
- Tab bar: labels descriptivos

### 27. Sistema Premium / Free Build

**Módulo nativo**: BuildConfigModule
**Activación**: src/utils/activation.ts (SHA-256)

Tres formas de desbloqueo:

- **Free build**: `IS_FREE=true` desde BuildConfig. `isPremium` siempre `true`. Sin UI de suscripción.
- **Trial**: 14 días desde primera instalación (solo en premium build).
- **Código de activación**: Easter egg en AboutScreen (tocar versión 5 veces). Valida contra hash SHA-256, desbloquea permanentemente.

Funciones premium-gated:

- Protocolos de emergencia
- Escalas clínicas
- Calculadoras
- Dashboard
- Comparador de fármacos
- Exportación de datos
- Favoritos ilimitados (5 en free trial expirado)
- Notas ilimitadas (5 en free trial expirado)

UI oculta en free build:

- Banner de trial en HomeScreen
- Fila "Premium" en AboutScreen
- Candados en ToolsScreen
- Pantalla PremiumScreen inaccesible

---

## Contenido Adicional

### 28. Glosario Médico

**Pantalla**: GlossaryScreen
**Datos**: 65+ términos en 5 categorías

### 29. Vías de Administración

**Pantalla**: RouteDetailScreen
**Datos**: 16 vías con técnicas y precauciones

Incluye ilustraciones SVG (RouteIllustrationSVG).

### 30. Cuidados de Enfermería

**Pantalla**: NursingCareScreen
**Datos**: 10+ protocolos de cuidados

Los 10 correctos, cuidados por vía, alto riesgo, geriatría, pediatría.

### 31. Fórmulas Farmacéuticas

**Pantalla**: FormulaDetailScreen
**Datos**: 15 fórmulas de cálculo

Fórmulas de dosificación, goteo, diluciones, etc.

---

## Resumen de Premium vs Free

| Funcionalidad         | Free (trial expirado) | Premium / Free Build |
| --------------------- | --------------------- | -------------------- |
| Búsqueda de fármacos  | Sí                    | Sí                   |
| Detalle de fármaco    | Sí                    | Sí                   |
| Categorías            | Sí                    | Sí                   |
| Favoritos             | 5 max                 | Ilimitados           |
| Notas                 | 5 max                 | Ilimitadas           |
| Quiz                  | Sí                    | Sí                   |
| Protocolos emergencia | Bloqueado             | Sí                   |
| Escalas clínicas      | Bloqueado             | Sí                   |
| Calculadoras          | Bloqueado             | Sí                   |
| Valores laboratorio   | Bloqueado             | Sí                   |
| Dashboard             | Bloqueado             | Sí                   |
| Comparador fármacos   | Bloqueado             | Sí                   |
| Export/Import datos   | Bloqueado             | Sí                   |
| Modo oscuro           | Sí                    | Sí                   |
| Compartir             | Sí                    | Sí                   |
