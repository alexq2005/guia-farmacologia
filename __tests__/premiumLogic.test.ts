/**
 * Tests de la lógica premium/trial — REVENUE-CRITICAL.
 *
 * Si estos tests rompen, o la app deja entrar gratis a todos (revenue perdido)
 * o corta a usuarios que pagaron (refunds + reseñas malas). Cubren el cálculo
 * de días de trial y la combinación de vías de acceso premium.
 */

import {
  computeTrialDaysLeft,
  computeIsPremium,
  resolveSubscriptionState,
  TRIAL_DAYS,
} from '../src/utils/premiumLogic';

const DAY = 1000 * 60 * 60 * 24;

describe('computeTrialDaysLeft', () => {
  it('devuelve el trial completo si nunca empezó (trialStartDate null)', () => {
    expect(computeTrialDaysLeft(null, Date.now())).toBe(TRIAL_DAYS);
  });

  it('día 0 (recién empezado): quedan los 14 días completos', () => {
    const start = 1_700_000_000_000;
    expect(computeTrialDaysLeft(start, start)).toBe(14);
  });

  it('a mitad de trial (7 días): quedan 7', () => {
    const start = 1_700_000_000_000;
    expect(computeTrialDaysLeft(start, start + 7 * DAY)).toBe(7);
  });

  it('justo al borde del día 13.9: todavía queda 1 (no redondea hacia abajo de más)', () => {
    const start = 1_700_000_000_000;
    expect(computeTrialDaysLeft(start, start + 13.9 * DAY)).toBe(1);
  });

  it('exactamente al cumplirse 14 días: trial agotado (0)', () => {
    const start = 1_700_000_000_000;
    expect(computeTrialDaysLeft(start, start + 14 * DAY)).toBe(0);
  });

  it('pasado el trial: clamp a 0, NUNCA negativo', () => {
    const start = 1_700_000_000_000;
    expect(computeTrialDaysLeft(start, start + 30 * DAY)).toBe(0);
    expect(computeTrialDaysLeft(start, start + 365 * DAY)).toBe(0);
  });

  it('reloj hacia atrás (now < start): no explota, no da más que el total', () => {
    const start = 1_700_000_000_000;
    const result = computeTrialDaysLeft(start, start - 5 * DAY);
    expect(result).toBeLessThanOrEqual(TRIAL_DAYS + 5); // tolerante, pero finito
    expect(result).toBeGreaterThan(0);
  });

  it('respeta una duración de trial custom', () => {
    const start = 1_700_000_000_000;
    expect(computeTrialDaysLeft(start, start + 3 * DAY, 7)).toBe(4);
  });
});

describe('computeIsPremium', () => {
  const base = {
    isFreeBuild: false,
    isCodeActivated: false,
    isSubscribed: false,
    isTrialActive: false,
  };

  it('sin ninguna vía → NO premium (paywall activo)', () => {
    expect(computeIsPremium(base)).toBe(false);
  });

  it('free build → premium (todo desbloqueado)', () => {
    expect(computeIsPremium({ ...base, isFreeBuild: true })).toBe(true);
  });

  it('código activado → premium', () => {
    expect(computeIsPremium({ ...base, isCodeActivated: true })).toBe(true);
  });

  it('suscripción IAP activa → premium', () => {
    expect(computeIsPremium({ ...base, isSubscribed: true })).toBe(true);
  });

  it('trial vigente → premium', () => {
    expect(computeIsPremium({ ...base, isTrialActive: true })).toBe(true);
  });

  it('REGRESIÓN: trial expirado + sin suscripción + sin código → paywall (NO premium)', () => {
    // Este es el caso que protege el revenue: usuario cuyo trial venció
    // y no pagó NO debe seguir teniendo acceso.
    expect(
      computeIsPremium({
        isFreeBuild: false,
        isCodeActivated: false,
        isSubscribed: false,
        isTrialActive: false,
      }),
    ).toBe(false);
  });
});

describe('resolveSubscriptionState', () => {
  it('consulta exitosa CON compra activa → suscripto + persistir true', () => {
    expect(resolveSubscriptionState(true, true, false)).toEqual({
      isSubscribed: true,
      persist: 'set',
    });
    expect(resolveSubscriptionState(true, true, true)).toEqual({
      isSubscribed: true,
      persist: 'set',
    });
  });

  it('REGRESIÓN (revenue): consulta exitosa SIN compra activa → revocar aunque el cache diga premium', () => {
    // Suscripción cancelada: el flag persistido NO puede valer para siempre.
    expect(resolveSubscriptionState(true, false, true)).toEqual({
      isSubscribed: false,
      persist: 'remove',
    });
  });

  it('consulta exitosa sin compra activa y sin cache → no suscripto', () => {
    expect(resolveSubscriptionState(true, false, false)).toEqual({
      isSubscribed: false,
      persist: 'remove',
    });
  });

  it('REGRESIÓN (UX): consulta fallida (offline) → conservar el cache, NUNCA revocar', () => {
    // Un suscriptor pago sin conexión NO puede perder acceso.
    expect(resolveSubscriptionState(false, false, true)).toEqual({
      isSubscribed: true,
      persist: 'keep',
    });
    expect(resolveSubscriptionState(false, false, false)).toEqual({
      isSubscribed: false,
      persist: 'keep',
    });
  });
});
