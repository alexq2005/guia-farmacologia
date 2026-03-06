# Arquitectura de la Aplicacion

## Vision General

La app sigue una arquitectura basada en **React Context + Custom Hooks** sin librerias de estado externas. Toda la informacion clinica esta embebida como JSON estatico, sin depender de APIs externas ni bases de datos remotas.

```
                    ErrorBoundary
                         |
                    SafeAreaProvider
                         |
                    ThemeProvider          ← Modo claro/oscuro/sistema
                         |
                    PremiumProvider        ← Trial + suscripcion + flag free
                         |
                    FavoritesProvider      ← Farmacos favoritos
                         |
                    NotesProvider          ← Notas personales por farmaco
                         |
                    AppNavigator           ← React Navigation (tabs + stacks)
                    /    |    \
              TabBar  Screens  Modals
```

## Navegacion

### Estructura: Bottom Tabs + Stack Navigator

```
AppNavigator
  ├── BottomTabs (5 tabs principales)
  │   ├── Inicio (HomeScreen)
  │   ├── Categorias (CategoriesScreen)
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

- Iconos con animacion spring al recibir foco (escala 0.85 -> 1.0)
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

**Patron de estilos**: Todas las pantallas usan `createStyles(colors: ThemeColors)` con `useMemo` para recalcular estilos solo cuando cambian los colores.

### PremiumContext

```
Archivo:     src/context/PremiumContext.tsx
Storage:     @guia_farmaco_trial_start, @guia_farmaco_premium
Trial:       14 dias desde primera instalacion

Proporciona:
  - isPremium: boolean    (IS_FREE_BUILD || isCodeActivated || isSubscribed || isTrialActive)
  - isFreeBuild: boolean  (true en flavor free, oculta UI de suscripcion)
  - isCodeActivated: boolean (true si se ingreso codigo correcto)
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
Limite free: 5 favoritos (sin limite en premium/free build)

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
Limite free: 5 notas (sin limite en premium/free build)

Proporciona:
  - notes: DrugNote[]
  - setNote(drugId, text): void
  - getNote(drugId): DrugNote | undefined
  - deleteNote(drugId): void
```

## Custom Hooks

| Hook | Archivo | Funcion |
|------|---------|---------|
| `useDrugData` | hooks/useDrugData.ts | Carga drugs.json, construye `Map<id, Drug>` para lookup O(1) |
| `useDrugSearch` | hooks/useDrugSearch.ts | Busqueda full-text con `buildSearchText()` + normalizacion de acentos |
| `useFavorites` | hooks/useFavorites.ts | CRUD favoritos con AsyncStorage, limite en version free |
| `useNotes` | hooks/useNotes.ts | Notas por farmaco con auto-guardado (debounce), limite free |
| `useQuiz` | hooks/useQuiz.ts | Estado del quiz, 8 tipos de preguntas, filtros, puntuacion, historial |
| `useRecentDrugs` | hooks/useRecentDrugs.ts | Ultimos 15 farmacos visitados, AsyncStorage |
| `useSearchHistory` | hooks/useSearchHistory.ts | Historial de busquedas (max 20), borrado individual/total |

## Componentes Reutilizables

| Componente | Archivo | Uso |
|------------|---------|-----|
| `DrugCard` | components/DrugCard.tsx | Tarjeta de farmaco con nombre, familia, categoria. `React.memo`, accesibilidad, animacion press |
| `CollapsibleSection` | components/CollapsibleSection.tsx | Seccion expandible con rotacion de chevron animada |
| `SearchBar` | components/SearchBar.tsx | Barra de busqueda con icono, clear button, accesibilidad |
| `PremiumGate` | components/PremiumGate.tsx | Bloquea contenido si `isPremium` es false. Muestra UI de upgrade |
| `ErrorBoundary` | components/ErrorBoundary.tsx | Captura errores React, muestra UI de retry, detalles en dev |
| `Skeleton` | components/Skeleton.tsx | Componentes de carga (pulse animation): SkeletonCard, SkeletonList, SkeletonDrugDetail |
| `RouteIllustrationSVG` | components/RouteIllustrationSVG.tsx | Ilustraciones SVG de vias de administracion |

## Flujo de Datos

```
JSON files (src/data/)
     |
     ▼
Custom Hooks (useDrugData, useDrugSearch)
     |
     ▼
Map<string, Drug>  ←  Lookup O(1) por ID
     |
     ▼
Screens (consumen hooks + contexts)
     |
     ├── ThemeContext  → colores, modo oscuro
     ├── PremiumContext → desbloqueo de funciones
     ├── FavoritesContext → favoritos del usuario
     └── NotesContext → notas personales
```

### Busqueda

```
Input del usuario
     |
     ▼
normalizeText() → minusculas + sin acentos
     |
     ▼
buildSearchText(drug) → concatena todos los campos buscables
     |
     ▼
Precomputed Map en useMemo (evita recalcular cada keystroke)
     |
     ▼
Filtrado por includes() sobre searchText normalizado
     |
     ▼
Resultados renderizados en FlatList
```

## Modulo Nativo: BuildConfigModule

Para comunicar el flavor de compilacion (free/premium) al lado JavaScript:

```
Android (Kotlin)                    React Native (TypeScript)
BuildConfigModule.kt    ──────►    NativeModules.BuildConfigModule
  getConstants():                    .IS_FREE: boolean
    IS_FREE: boolean                 .VERSION_NAME: string
    VERSION_NAME: string             .FLAVOR: string
    FLAVOR: string

BuildConfigPackage.kt   ──────►    Registrado en MainApplication.kt
```

## Patron de Pantallas

Cada pantalla sigue este patron:

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
  - UNIT_COLORS: Record<string, string> (14 colores por unidad terapeutica)
  - PREGNANCY_COLORS: Record<string, string> (categorias A-X)
  - ROUTE_COLORS: Record<string, string> (colores por via de administracion)

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
- `buildSearchText()` precomputa texto de busqueda en `useMemo`
- `normalizeText()` centralizado (1 copia en lugar de 7)
- `React.memo` en componentes de lista (DrugCard, EmergencyCard)
- `FlatList` en lugar de `ScrollView` para listas largas
- `searchText` generado en runtime (ahorra ~1.2MB en drugs.json)
- `.catch()` en todas las cadenas de promesas de AsyncStorage
