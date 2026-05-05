/**
 * Crash reporting abstraction.
 *
 * This module wraps whatever crash reporting backend the project uses (or none)
 * behind a stable interface. Components import from here, never from a vendor
 * SDK directly. Switching providers (Sentry → Crashlytics → custom) means
 * editing only this file.
 *
 * ## Default state: no-op
 *
 * Until a real provider is wired up, every method is a console-only stub.
 * The app behaves exactly as if no crash reporter were present, with the only
 * side effect being a `console.error` so devs see issues during development.
 *
 * ## How to wire up Sentry
 *
 * 1. `npm install @sentry/react-native`
 * 2. Run `npx @sentry/wizard@latest -i reactNative -p android` (requires Sentry
 *    account + DSN). This patches `MainApplication.kt` and `android/build.gradle`
 *    automatically, and sets up sourcemap uploads at build time.
 * 3. Replace the `provider` constant below with a Sentry-backed implementation.
 *    See `docs/CRASH_REPORTING.md` for the snippet.
 * 4. Set `SENTRY_DSN` in a local `.env` (gitignored) — read it via a helper
 *    like `react-native-config` or pass it through `BuildConfigModule`.
 *
 * ## Privacy posture (medical app)
 *
 * The Sentry implementation MUST be configured conservatively:
 *   - `tracesSampleRate: 0.0`        — no performance monitoring breadcrumbs
 *   - `sendDefaultPii: false`        — no IP, no user identifiers
 *   - `beforeSend(event)` strips     — drug notes, search queries, anything
 *     personally identifying that may have ended up in `event.extra` or
 *     `event.breadcrumbs`.
 *
 * This is the difference between "we know our app crashed on screen X" and
 * "we leaked a user's notes to a third party". Treat the second outcome as
 * unacceptable.
 */

type Severity = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

interface CrashReporter {
  /** Initialize the underlying SDK. Safe to call multiple times. */
  init(): void;

  /** Report a thrown exception with optional context. */
  captureException(error: unknown, context?: Record<string, unknown>): void;

  /** Report a non-error message at a chosen severity. */
  captureMessage(message: string, severity?: Severity): void;

  /** Add a breadcrumb (e.g. user action) for context on subsequent errors. */
  addBreadcrumb(message: string, data?: Record<string, unknown>): void;

  /**
   * Tag the current session with metadata. Avoid PII — typical use is
   * release version, build flavor, theme mode, premium state (boolean).
   */
  setTag(key: string, value: string): void;
}

/**
 * No-op provider. Logs to console in dev so issues are still visible during
 * development. Does nothing in production.
 */
const consoleProvider: CrashReporter = {
  init() {
    if (__DEV__) {
      console.log(
        '[crashReporting] no-op provider active. See src/utils/crashReporting.ts to wire a real backend.',
      );
    }
  },
  captureException(error, context) {
    if (__DEV__) {
      console.error('[crashReporting] captureException:', error, context);
    }
  },
  captureMessage(message, severity = 'error') {
    if (__DEV__) {
      console.warn(`[crashReporting] [${severity}] ${message}`);
    }
  },
  addBreadcrumb(message, data) {
    if (__DEV__) {
      console.log(`[crashReporting] breadcrumb: ${message}`, data ?? '');
    }
  },
  setTag(key, value) {
    if (__DEV__) {
      console.log(`[crashReporting] tag ${key}=${value}`);
    }
  },
};

/**
 * The active provider. Replace this assignment when wiring a real backend
 * (see file header). The rest of the codebase always imports from this module.
 */
const provider: CrashReporter = consoleProvider;

export const crashReporting = provider;

/**
 * Convenience top-level call to wire from App.tsx:
 *
 *   import { initCrashReporting } from './src/utils/crashReporting';
 *   initCrashReporting();
 */
export function initCrashReporting(): void {
  try {
    provider.init();
  } catch (error) {
    // The crash reporter must NEVER crash the app. If init throws, swallow it.
    if (__DEV__) {
      console.error('[crashReporting] init failed (swallowed):', error);
    }
  }
}
