# React Native New Architecture (Fabric + TurboModules)

> **Status**: Active by default since RN 0.82+. The app is ALREADY running on
> the New Architecture — no migration needed. This document tracks library
> compatibility and verification checklist.

## Background

React Native's "New Architecture" (originally announced in 2018) replaces:

- **Bridge → JSI**: synchronous JS↔native calls instead of async serialized
  messages. Existing JSI consumers in this project: `@op-engineering/op-sqlite`.
- **Paper renderer → Fabric**: shadow tree managed in C++, eliminates many
  layout bugs and improves render scheduling.
- **NativeModules → TurboModules**: lazy-loaded, type-checked, code-generated
  bindings between native and JS.

Since RN 0.82 (released late 2025), New Arch is **the default**. The
`newArchEnabled` flag in `gradle.properties` is deprecated and ignored —
removing it is the recommended action.

## Current state in this project

```
gradle.properties:    newArchEnabled NOT present (correct)
hermesEnabled:        true
RN version:           0.84.1
Build log shows:      "The application will run with the New Architecture
                       enabled by default."
                      "Task :app:generateAutolinkingNewArchitectureFiles"
```

✅ **The app is already running on New Architecture.**

## Library compatibility matrix

| Library                                    | Version | New Arch ready             | Notes                      |
| ------------------------------------------ | ------- | -------------------------- | -------------------------- |
| `@op-engineering/op-sqlite`                | 15.2.7  | ✅ Native JSI              | Already uses JSI directly  |
| `@react-navigation/native`                 | 7.1.31  | ✅ Yes                     | v7 fully Fabric-compatible |
| `@react-navigation/bottom-tabs`            | 7.15.3  | ✅ Yes                     | —                          |
| `@react-navigation/native-stack`           | 7.14.2  | ✅ Yes                     | —                          |
| `@shopify/flash-list`                      | 2.3.1   | ✅ Yes                     | v2 rewritten for new arch  |
| `react-native-screens`                     | 4.24.0  | ✅ Yes                     | v4 Fabric-native           |
| `react-native-safe-area-context`           | 5.7.0   | ✅ Yes                     | v5 Fabric-native           |
| `react-native-svg`                         | 15.15.3 | ✅ Yes                     | v15 supports Fabric        |
| `react-native-iap`                         | 13.0.4  | ✅ Yes                     | v13 ported to TurboModules |
| `react-native-encrypted-storage`           | 4.0.3   | ⚠️ Legacy bridge           | Still works via interop    |
| `react-native-vector-icons`                | 10.3.0  | ⚠️ Legacy bridge           | Still works via interop    |
| `react-native-linear-gradient`             | 2.8.3   | ⚠️ Deprecated API warnings | Works but emits warnings   |
| `react-native-share`                       | 12.2.6  | ⚠️ Legacy bridge           | Still works via interop    |
| `react-native-clipboard/clipboard`         | 1.16.3  | ⚠️ Legacy bridge           | Still works via interop    |
| `react-native-async-storage/async-storage` | 2.2.0   | ⚠️ Legacy bridge           | Still works via interop    |
| `react-native-view-shot`                   | 4.0.3   | ⚠️ Legacy bridge           | Still works via interop    |

### Interop layer

RN provides a **compatibility layer** that wraps legacy NativeModules so they
work transparently under TurboModules. The `⚠️` libraries above run through
this interop — **they work** but:

- Emit deprecated API warnings at build time (visible in `build_*.log`).
- Lose the perf benefits of TurboModule code-gen.
- May break in a future RN release when interop is removed (no announced date,
  but plan for ~2027).

## Verification checklist

Before assuming the app works correctly under New Arch, **smoke test on a
real device** (not emulator, since emulators sometimes mask Fabric bugs):

### Visual / layout

- [ ] HomeScreen renders correctly, gradient header visible
- [ ] Bottom tab bar animations spring smoothly (5 tabs)
- [ ] Search results virtualize with FlashList (no skipped frames on rapid scroll)
- [ ] DrugDetailScreen sections collapse/expand without flicker
- [ ] Dark mode toggle (Settings) repaints all screens

### Native modules

- [ ] SQLite hydration completes (drugs visible in Search) — `op-sqlite` JSI
- [ ] Theme persists across restart — `AsyncStorage` interop
- [ ] Activation code modal in About (5 taps) — `EncryptedStorage` interop
- [ ] Premium subscription button opens Play Billing — `react-native-iap`
- [ ] Vector icons render — `vector-icons` interop
- [ ] Share button on a fármaco opens system share sheet — `react-native-share`
- [ ] LinearGradient backgrounds on headers — `linear-gradient` (deprecated warning expected)
- [ ] Copy-to-clipboard button on dose section copies — `clipboard` interop
- [ ] SVG illustrations render in RouteDetail — `react-native-svg`

### Performance regressions to watch

- [ ] First render time within ~5% of pre-migration baseline
- [ ] Scroll FPS in long lists ≥ 55fps p95 (FlashList is core to UX)
- [ ] App size (APK release) — Fabric adds ~3-5 MB to native libs

## What to do if something breaks

If a library breaks under New Arch:

1. **Check the lib's GitHub** for an issue tagged "Fabric" or "New Architecture"
2. **Try the legacy bridge mode** as last resort: in the JS file, import via
   `require()` instead of ES `import`, which tells RN to use the bridge.
3. **Replace the lib**: most legacy libs have Fabric-native alternatives
   (e.g. `react-native-fast-image` → `expo-image`).
4. **Fall back to old arch (NOT recommended)**: theoretically possible by
   re-adding `newArchEnabled=false` to `gradle.properties`, but RN 0.82+ may
   remove this escape hatch in any patch release.

## When to revisit this doc

- Whenever a `react-native-*` lib is updated → check its New Arch status.
- After any RN minor bump (0.84 → 0.85 etc.) — Fabric support is rapidly
  evolving, libs may improve.
- When build warnings about "deprecated API" appear from a NEW library.
- Once the interop deprecation date is announced (planned for ~2027).
