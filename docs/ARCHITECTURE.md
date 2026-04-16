# Arquitectura de la Aplicación

## Visión General

La app original seguía una arquitectura JSON simple, pero fue optimizada a **SQLite Nativo C++ (JSI)**. La información clínica reside en tablas locales para eludir picos de RAM, operando con **React Context memoizados** bajo el framework *FlashList* de altas prestaciones mecánicas.

```
                    ErrorBoundary
                         |
                    SafeAreaProvider
                         |
                    ThemeProvider          ← Modo claro/oscuro/sistema
                         |
                    PremiumProvider        ← Trial + suscripción + flag free
                         |
                    FavoritesProvider      ← Fármacos favoritos
                         |
                    NotesProvider          ← Notas personales por fármaco
                         |
                    AppNavigator           ← React Navigation (tabs + stacks)
                    /    |    \
              TabBar  Screens  Modals
```

## Navegación

### Estructura: Bottom Tabs + Stack Navigator

```
AppNavigator
  ├── BottomTabs (5 tabs principales)
  │   ├── Inicio (HomeScreen)
  │   ├── Categorías (CategoriesScreen)
  │   ├── Buscar (SearchScreen)
  │   ├── Especial (SpecialScreen)
  │   └── Herramientas (ToolsScreen)
  │
  └── Stack Screens (accesibles desde cualquier tab)
      ├── DrugDetail
      ├── ChapterDrugs
      ├── FormulaDetail
      ├── RouteDetail
      ├── Glossary
      ├── NursingCare
      ├── Pathologies / PathologyDetail
      ├── InteractionChecker
      ├── Calculators
      ├── Quiz / QuizSession
      ├── ClinicalScales / ScaleDetail
      ├── LabValues
      ├── EmergencyProtocols / ProtocolDetail
      ├── ParenteralGuide
      ├── Dashboard
      ├── DrugComparison
      ├── AllNotes / AllFavorites
      ├── Premium / About / Terms / Privacy
      └── PremiumScreen
```

### Animaciones del Tab Bar

- Íconos con animación spring al recibir foco (escala 0.85 -> 1.0)
- Indicador activo (barra azul) bajo el tab seleccionado
- Cambio de color: inactivo (gris) -> activo (azul primario)

## Contextos (Providers)

### ThemeContext

```
Archivo:     src/context/ThemeContext.tsx
Storage key: @guia_farmaco_theme
Modos:       'light' | 'dark' | 'system'

Proporciona:
  - colors: ThemeColors (LIGHT_COLORS o DARK_COLORS)
  - isDark: boolean
  - themeMode: ThemeMode
  - setThemeMode(mode): void
  - toggleTheme(): void
```

**Patrón de estilos**: Todas las pantallas usan `createStyles(colors: ThemeColors)` con `useMemo` para recalcular estilos solo cuando cambian los colores.

### PremiumContext

```
Archivo:     src/context/PremiumContext.tsx
Storage:     EncryptedStorage nativo (reemplazo de AsyncStorage inseguro)
Trial:       14 días desde primera instalación

Proporciona:
  - isPremium: boolean    (IS_FREE_BUILD || isCodeActivated || isSubscribed || isTrialActive)
  - isFreeBuild: boolean  (true en flavor free, oculta UI de suscripción)
  - isCodeActivated: boolean (true si se ingresó código correcto)
  - isTrialActive: boolean
  - trialDaysLeft: number
  - isSubscribed: boolean
  - activateSubscription(): void
  - restoreSubscription(): void
  - activateWithCode(code): Promise<boolean>
```

**Build flavors**: En el build `free`, `NativeModules.BuildConfigModule.IS_FREE` es `true`, haciendo que `isPremium` sea siempre `true` y desbloqueando todas las funciones.

### FavoritesContext

```
Archivo:     src/context/FavoritesContext.tsx
Hook:        useFavorites(isPremium)
Storage key: @guia_farmaco_favorites
Límite free: 5 favoritos (sin límite en premium/free build)

Proporciona:
  - favorites: string[]
  - toggleFavorite(drugId): void
  - isFavorite(drugId): boolean
```

### NotesContext

```
Archivo:     src/context/NotesContext.tsx
Hook:        useNotes(isPremium)
Storage key: @guia_farmaco_notes
Límite free: 5 notas (sin límite en premium/free build)

Proporciona:
  - notes: DrugNote[]
  - setNote(drugId, text): void
  - getNote(drugId): DrugNote | undefined
  - deleteNote(drugId): void
```

## Custom Hooks

| Hook | Archivo | Función |
|------|---------|---------|
| `useDrugData` | hooks/useDrugData.ts | Ahora consulta localmente tablas SQLite a través del hook `db.executeSync` |
| `useDrugSearch` | hooks/useDrugSearch.ts | Consultas SQL super optimizadas |
| `useFavorites` | hooks/useFavorites.ts | CRUD favoritos con AsyncStorage, límite en versión free |
| `useNotes` | hooks/useNotes.ts | Notas por fármaco con auto-guardado (debounce), límite free |
| `useQuiz` | hooks/useQuiz.ts | Estado del quiz, 8 tipos de preguntas, filtros, puntuación, historial |
| `useRecentDrugs` | hooks/useRecentDrugs.ts | Últimos 15 fármacos visitados, AsyncStorage |
| `useSearchHistory` | hooks/useSearchHistory.ts | Historial de búsquedas (max 20), borrado individual/total |

## Componentes Reutilizables

| Componente | Archivo | Uso |
|------------|---------|-----|
| `DrugCard` | components/DrugCard.tsx | Tarjeta de fármaco con nombre, familia, categoría. `React.memo`, accesibilidad, animación press |
| `CollapsibleSection` | components/CollapsibleSection.tsx | Sección expandible con rotación de chevron animada |
| `SearchBar` | components/SearchBar.tsx | Barra de búsqueda con ícono, clear button, accesibilidad |
| `PremiumGate` | components/PremiumGate.tsx | Bloquea contenido si `isPremium` es false. Muestra UI de upgrade |
| `ErrorBoundary` | components/ErrorBoundary.tsx | Captura errores React, muestra UI de retry, detalles en dev |
| `Skeleton` | components/Skeleton.tsx | Componentes de carga (pulse animation): SkeletonCard, SkeletonList, SkeletonDrugDetail |
| `RouteIllustrationSVG` | components/RouteIllustrationSVG.tsx | Ilustraciones SVG de vías de administración |

## Flujo de Datos

```
db.ts (JSI SQLite Engine)
     |
     ▼
Custom Hooks via executeSync()
     |
     ▼
Lectura Zero-RAM directa a la UI mediante FlashList
     |
     ▼
Screens (consumen hooks + contexts)
     |
     ├── ThemeContext  → colores, modo oscuro
     ├── PremiumContext → desbloqueo de funciones
     ├── FavoritesContext → favoritos del usuario
     └── NotesContext → notas personales
```

### Búsqueda

```
Input del usuario
     |
     ▼
normalizeText() → minúsculas + sin acentos
     |
     ▼
buildSearchText(drug) → concatena todos los campos buscables
     |
     ▼
Precomputed Map en useMemo (evita recalcular cada keystroke)
     |
     ▼
Extracción ultra rápida mediante base de datos SQL
     |
     ▼
Resultados renderizados en FlashList
```

## Módulo Nativo: BuildConfigModule

Para comunicar el flavor de compilación (free/premium) al lado JavaScript:

```
Android (Kotlin)                    React Native (TypeScript)
BuildConfigModule.kt    ──────►    NativeModules.BuildConfigModule
  getConstants():                    .IS_FREE: boolean
    IS_FREE: boolean                 .VERSION_NAME: string
    VERSION_NAME: string             .FLAVOR: string
    FLAVOR: string

BuildConfigPackage.kt   ──────►    Registrado en MainApplication.kt
```

## Patrón de Pantallas

Cada pantalla sigue este patrón:

```typescript
import { useTheme } from '../context/ThemeContext';

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
  // ...
});
```

## Sistema de Colores

```
colors.ts exporta:
  - LIGHT_COLORS: ThemeColors (tema claro)
  - DARK_COLORS: ThemeColors (tema oscuro)
  - UNIT_COLORS: Record<string, string> (14 colores por unidad terapéutica)
  - PREGNANCY_COLORS: Record<string, string> (categorías A-X)
  - ROUTE_COLORS: Record<string, string> (colores por vía de administración)

ThemeColors incluye:
  primary, secondary, accent, background, surface, card,
  text, textSecondary, textTertiary, border, divider,
  error, warning, success, info, emergency, nursing, pediatric,
  quiz, quizCorrect, quizWrong, noteBackground, noteBorder,
  shadow, overlay, statusBar, tabBar, tabBarInactive
```

## Almacenamiento Local (AsyncStorage)

| Clave | Contenido | Contexto |
|-------|-----------|----------|
| `@guia_farmaco_theme` | 'light' \| 'dark' \| 'system' | ThemeContext |
| `@guia_farmaco_trial_start` | timestamp (ms) | PremiumContext |
| `@guia_farmaco_premium` | 'true' \| null | PremiumContext |
| `@guia_farmaco_favorites` | string[] (IDs) | FavoritesContext |
| `@guia_farmaco_notes` | DrugNote[] (JSON) | NotesContext |
| `@guia_farmaco_search_history` | SearchHistoryEntry[] | useSearchHistory |
| `@guia_farmaco_recent_drugs` | string[] (IDs, max 15) | useRecentDrugs |
| `@guia_farmaco_quiz_results` | QuizResult[] | useQuiz |
| `@guia_farmaco_activated` | 'true' \| null | activation.ts |

## Rendimiento

- `Map<string, Drug>` para lookup O(1) en lugar de `Array.find()`
- `buildSearchText()` precomputa texto de búsqueda en `useMemo`
- `normalizeText()` centralizado (1 copia en lugar de 7)
- `React.memo` en componentes de lista (DrugCard, EmergencyCard)
- `FlatList` en lugar de `ScrollView` para listas largas
- `searchText` generado en runtime (ahorra ~1.2MB en drugs.json)
- `.catch()` en todas las cadenas de promesas de AsyncStorage
