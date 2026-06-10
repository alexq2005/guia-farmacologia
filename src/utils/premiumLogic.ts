/**
 * Pure premium/trial gate logic — extracted from PremiumContext so it can be
 * unit-tested in isolation (no React, no native modules, no timers).
 *
 * This is REVENUE-CRITICAL: a bug here either gives free users permanent access
 * (lost revenue) or cuts paying/trial users off early (angry users + refunds).
 * Keep it pure and keep the tests in __tests__/premiumLogic.test.ts green.
 */

export const TRIAL_DAYS = 14;

const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * Días de trial restantes.
 * @param trialStartDate epoch ms del inicio del trial, o null si nunca empezó
 * @param now epoch ms actual (inyectable para tests — NO usar Date.now() acá)
 * @param trialDays duración total del trial
 * @returns entero >= 0 (clamp a 0; nunca negativo)
 */
export function computeTrialDaysLeft(
  trialStartDate: number | null,
  now: number,
  trialDays: number = TRIAL_DAYS,
): number {
  if (!trialStartDate) return trialDays;
  const elapsed = now - trialStartDate;
  const remaining = trialDays - Math.floor(elapsed / DAY_MS);
  return Math.max(0, remaining);
}

export interface PremiumFlags {
  isFreeBuild: boolean;
  isCodeActivated: boolean;
  isSubscribed: boolean;
  isTrialActive: boolean;
}

/**
 * ¿El usuario tiene acceso premium? Cualquiera de las vías lo habilita.
 * (free build desbloquea todo; código; suscripción IAP; trial vigente)
 */
export function computeIsPremium(flags: PremiumFlags): boolean {
  return (
    flags.isFreeBuild ||
    flags.isCodeActivated ||
    flags.isSubscribed ||
    flags.isTrialActive
  );
}
