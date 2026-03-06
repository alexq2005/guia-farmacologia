# Catalogo de Funcionalidades

## Funcionalidades Principales

### 1. Base de Datos Farmacologica

**Pantalla**: HomeScreen, SearchScreen, DrugDetailScreen
**Datos**: 1,781 farmacos

La funcionalidad central de la app. Cada farmaco incluye:
- Nombre generico y comercial
- Mecanismo de accion
- Indicaciones y contraindicaciones
- Efectos adversos e interacciones
- Dosificacion (adulto, pediatrico, geriatrico, ajuste renal/hepatico)
- Vias de administracion
- Categoria de embarazo (A-X) y lactancia
- Cuidados de enfermeria
- Farmacocinetica completa
- Datos de sobredosificacion (17 farmacos de alto riesgo)
- Grupo terapeutico y farmacologico (clasificacion ATC)

**DrugDetailScreen** es la pantalla mas compleja (~41KB) con secciones colapsables, badges de datos incompletos, indicadores de compatibilidad parenteral y boton de copiar.

### 2. Clasificacion por Categorias

**Pantalla**: CategoriesScreen, ChapterDrugsScreen
**Datos**: 14 unidades terapeuticas, 60+ capitulos

Navegacion jerarquica: Unidad > Capitulo > Farmacos. Cada unidad tiene color unico. Incluye conteo de farmacos por capitulo.

### 3. Busqueda Inteligente

**Pantalla**: SearchScreen
**Hook**: useDrugSearch

- Busqueda full-text sobre todos los campos del farmaco
- Insensible a acentos y mayusculas (`normalizeText()`)
- Texto de busqueda precomputado en `Map` (rendimiento optimizado)
- Resultados instantaneos con FlatList
- Historial de busquedas (max 20, borrado individual con long-press)

### 4. Protocolos de Emergencia

**Pantalla**: EmergencyProtocolsScreen, ProtocolDetailScreen
**Datos**: 14 protocolos
**Premium**: Si (gated con PremiumGate)

Protocolos con pasos cronometrados para situaciones criticas:
- ACLS (Paro Cardiaco)
- Anafilaxia
- Infarto Agudo de Miocardio (IAM)
- Accidente Cerebrovascular (ACV)
- Sepsis
- Crisis Hipertensiva
- Estatus Epileptico
- Hipoglucemia Severa
- Edema Agudo de Pulmon
- Shock Hemorragico
- Intoxicacion Aguda
- Cetoacidosis Diabetica
- Broncoespasmo Severo
- Sindrome Coronario Agudo

Cada protocolo incluye: pasos con tiempos, dosis de farmacos, puntos de decision y red flags.

### 5. Escalas Clinicas Interactivas

**Pantalla**: ClinicalScalesScreen, ScaleDetailScreen
**Datos**: 13 escalas
**Premium**: Si

Escalas con calculo automatico e interpretacion:

| Escala | Tipo | Uso |
|--------|------|-----|
| Glasgow (GCS) | components | Nivel de consciencia |
| APGAR | components | Valoracion neonatal |
| Norton | components | Riesgo de UPP |
| Braden | components | Riesgo de UPP |
| NEWS2 | components | Alerta temprana |
| RASS | selector | Sedacion/agitacion |
| Wells | checklist | Riesgo TEP |
| EVA | selector | Intensidad del dolor |
| Aldrete | components | Recuperacion postanestesica |
| qSOFA | checklist | Sospecha sepsis |
| NIHSS | components | Gravedad ACV |
| Mallampati | selector | Via aerea dificil |
| ASA | selector | Riesgo anestesico |

Tres tipos de interaccion: `components` (suman puntos), `selector` (seleccion unica), `checklist` (si/no).

### 6. Valores de Laboratorio

**Pantalla**: LabValuesScreen
**Datos**: 53 valores en 9 categorias
**Premium**: Si (parcial)

Categorias: Hematologia, Bioquimica, Coagulacion, Hepatico, Renal, Cardiaco, Endocrino, Orina, Gasometria.

Cada valor incluye:
- Rangos normales por sexo (masculino/femenino) y pediatricos
- Significado clinico de valores altos/bajos
- Farmacos que pueden alterar el valor
- Implicaciones de enfermeria

Funcion de compartir valor de laboratorio (`shareLabValue`).

### 7. Calculadoras Medicas

**Pantalla**: CalculatorsScreen
**Datos**: 15 calculadoras
**Premium**: Si

| Calculadora | Descripcion |
|-------------|-------------|
| Dosis por peso | mg/kg |
| Goteo IV | gotas/min, ml/h |
| IMC | Indice de masa corporal |
| Superficie corporal | Formula de Du Bois |
| Aclaramiento de creatinina | Cockcroft-Gault |
| Dosis pediatrica | Reglas de Young/Clark |
| Conversion de unidades | mg, mcg, mEq... |
| Calcio corregido | Por albumina |
| Anion Gap | Na - (Cl + HCO3) |
| Osmolalidad | Plasmatica calculada |
| QTc Bazett | Intervalo QT corregido |
| Parkland | Quemados (liquidos 24h) |
| Holliday-Segar | Mantenimiento pediatrico |
| Glasgow (texto) | GCS con interpretacion |
| APACHE II | Gravedad UCI |

### 8. Guia de Administracion Parenteral

**Pantalla**: ParenteralGuideScreen
**Datos**: 460 farmacos enriquecidos

Basada en la Guia del Hospital Son Espases. Cinco pestanas:

1. **Introduccion**: Conceptos basicos de via parenteral
2. **Soluciones**: Tipos de soluciones IV
3. **NPT**: Nutricion parenteral total
4. **Proteccion**: Equipos de proteccion personal
5. **Farmacos**: Lista de farmacos con info parenteral

Informacion por farmaco:
- Compatibilidad con SSF (NaCl 0.9%) y SG5% (indicadores tipo semaforo)
- Compatibilidad con NPT
- Flag de medicamento peligroso (33 farmacos)
- Proteccion personal necesaria
- Reconstitucion, dilucion, velocidad de administracion

### 9. Verificador de Interacciones

**Pantalla**: InteractionCheckerScreen

Seleccionar 2+ farmacos y verificar interacciones entre ellos. Niveles de severidad con codigo de colores.

### 10. Patologias

**Pantalla**: PathologiesScreen, PathologyDetailScreen
**Datos**: 60 patologias

Cada patologia incluye:
- Descripcion, signos y sintomas
- Diagnostico
- Tratamiento
- Cuidados de enfermeria
- Farmacos vinculados (navegacion directa a DrugDetail)

### 11. Quiz de Estudio

**Pantalla**: QuizScreen, QuizSessionScreen
**Hook**: useQuiz

8 tipos de preguntas generadas automaticamente desde los datos de farmacos:
- Identificar indicacion correcta
- Identificar contraindicacion
- Identificar efecto adverso
- Via de administracion
- Categoria de embarazo
- Mecanismo de accion
- Familia farmacologica
- Cuidados de enfermeria

Caracteristicas:
- Filtro por categoria terapeutica
- Puntuacion y porcentaje
- Historial de resultados (AsyncStorage)
- 692 farmacos elegibles para preguntas

### 12. Dashboard de Progreso

**Pantalla**: DashboardScreen
**Premium**: Si

Estadisticas de estudio:
- Puntuacion promedio en quizzes
- Barras de progreso por categoria
- Racha de estudio (dias consecutivos)
- Resumen de uso general

### 13. Comparador de Farmacos

**Pantalla**: DrugComparisonScreen
**Premium**: Si

Seleccionar hasta 3 farmacos y compararlos en tabla horizontal con 10 campos:
- Nombre, familia, mecanismo, indicaciones, contraindicaciones
- Efectos adversos, dosis, vias, embarazo, cuidados

---

## Funcionalidades de Usuario

### 14. Favoritos

**Context**: FavoritesContext
**Limite free**: 5 favoritos

Marcar farmacos como favoritos. Acceso rapido desde AllFavoritesScreen. Persistencia en AsyncStorage.

### 15. Notas Personales

**Context**: NotesContext
**Limite free**: 5 notas

Notas por farmaco con auto-guardado (debounce). Vista global en AllNotesScreen.

### 16. Historial de Busquedas

**Hook**: useSearchHistory
**Capacidad**: 20 entradas

Busquedas recientes con borrado individual (long-press) y borrado total.

### 17. Farmacos Recientes

**Hook**: useRecentDrugs
**Capacidad**: 15 farmacos

Scroll horizontal en HomeScreen con los ultimos farmacos visitados.

### 18. Exportacion/Importacion de Datos

**Archivo**: utils/backup.ts
**Premium**: Si

Exportar/importar datos del usuario (favoritos, notas, historial de quiz) como JSON. Funcion de pegado directo en ToolsScreen.

### 19. Compartir

**Archivo**: utils/share.ts

Tres funciones de compartir:
- `shareDrug()`: Informacion completa del farmaco como texto estructurado
- `shareProtocol()`: Protocolo de emergencia con pasos
- `shareLabValue()`: Valor de laboratorio con rangos

### 20. Copiar al Portapapeles

**Componente**: CopyButton (en DrugDetailScreen)

Boton para copiar nombre del farmaco y secciones de dosis. Feedback visual al copiar.

---

## Funcionalidades Visuales

### 21. Modo Oscuro

**Context**: ThemeContext
**Modos**: Claro, Oscuro, Sistema (automatico)

Las 31 pantallas y 7 componentes soportan modo oscuro completo con transiciones suaves.

### 22. Animaciones

**Archivo**: utils/animations.ts

- Fade-in al entrar a pantallas
- Entrada escalonada (staggered) en HomeScreen
- Escala al presionar DrugCard
- Rotacion de chevron en CollapsibleSection
- Animacion spring en iconos del tab bar
- Pulse animation en Skeleton loading

### 23. Skeleton Loading

**Componente**: Skeleton.tsx

Variantes: SkeletonCard, SkeletonList, SkeletonDrugDetail. Animacion de pulso durante carga de datos.

### 24. Splash Screen

**Archivo**: drawable/splash_logo.xml

Logo vectorial personalizado con:
- Anillo circular decorativo (doble)
- Cruz medica redondeada con sombra
- Libro abierto con lineas de texto
- Linea de pulso ECG
- Capsulas/pildoras como acento
- Texto "GUIA FARMACOLOGICA de Enfermeria"

Fondo azul #1E40AF, logo blanco con acentos #93C5FD.

---

## Funcionalidades Tecnicas

### 25. ErrorBoundary

**Componente**: ErrorBoundary.tsx

Envuelve toda la app. Si ocurre un error React no capturado:
- Muestra UI amigable con boton de reintentar
- En modo desarrollo, muestra detalles del error

### 26. Accesibilidad

Roles y labels en componentes interactivos:
- `DrugCard`: accessibilityRole, accessibilityLabel
- `CollapsibleSection`: accessibilityState (expanded)
- `SearchBar`: accessibilityRole="search"
- Tab bar: labels descriptivos

### 27. Sistema Premium / Free Build

**Modulo nativo**: BuildConfigModule
**Activacion**: src/utils/activation.ts (SHA-256)

Tres formas de desbloqueo:
- **Free build**: `IS_FREE=true` desde BuildConfig. `isPremium` siempre `true`. Sin UI de suscripcion.
- **Trial**: 14 dias desde primera instalacion (solo en premium build).
- **Codigo de activacion**: Easter egg en AboutScreen (tocar version 5 veces). Valida contra hash SHA-256, desbloquea permanentemente.

Funciones premium-gated:
- Protocolos de emergencia
- Escalas clinicas
- Calculadoras
- Dashboard
- Comparador de farmacos
- Exportacion de datos
- Favoritos ilimitados (5 en free trial expirado)
- Notas ilimitadas (5 en free trial expirado)

UI oculta en free build:
- Banner de trial en HomeScreen
- Fila "Premium" en AboutScreen
- Candados en ToolsScreen
- Pantalla PremiumScreen inaccesible

---

## Contenido Adicional

### 28. Glosario Medico

**Pantalla**: GlossaryScreen
**Datos**: 65+ terminos en 5 categorias

### 29. Vias de Administracion

**Pantalla**: RouteDetailScreen
**Datos**: 16 vias con tecnicas y precauciones

Incluye ilustraciones SVG (RouteIllustrationSVG).

### 30. Cuidados de Enfermeria

**Pantalla**: NursingCareScreen
**Datos**: 10+ protocolos de cuidados

Los 10 correctos, cuidados por via, alto riesgo, geriatria, pediatria.

### 31. Formulas Farmaceuticas

**Pantalla**: FormulaDetailScreen
**Datos**: 15 formulas de calculo

Formulas de dosificacion, goteo, diluciones, etc.

---

## Resumen de Premium vs Free

| Funcionalidad | Free (trial expirado) | Premium / Free Build |
|---------------|----------------------|---------------------|
| Busqueda de farmacos | Si | Si |
| Detalle de farmaco | Si | Si |
| Categorias | Si | Si |
| Favoritos | 5 max | Ilimitados |
| Notas | 5 max | Ilimitadas |
| Quiz | Si | Si |
| Protocolos emergencia | Bloqueado | Si |
| Escalas clinicas | Bloqueado | Si |
| Calculadoras | Bloqueado | Si |
| Valores laboratorio | Bloqueado | Si |
| Dashboard | Bloqueado | Si |
| Comparador farmacos | Bloqueado | Si |
| Export/Import datos | Bloqueado | Si |
| Modo oscuro | Si | Si |
| Compartir | Si | Si |
