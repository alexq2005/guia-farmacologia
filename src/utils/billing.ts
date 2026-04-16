// ============================================================
// Google Play Billing — subscription management via react-native-iap v12
// ============================================================

import { Platform } from 'react-native';
import {
  initConnection,
  endConnection,
  getSubscriptions,
  requestSubscription,
  getAvailablePurchases,
  finishTransaction,
  purchaseUpdatedListener,
  purchaseErrorListener,
  SubscriptionPlatform,
  type Subscription,
  type SubscriptionAndroid,
  type SubscriptionPurchase,
  type PurchaseError,
} from 'react-native-iap';
import type { EmitterSubscription } from 'react-native';

// ─── Product IDs (must match Google Play Console) ────────────────────────────

export const PRODUCT_IDS = {
  MONTHLY: 'premium_monthly',
  ANNUAL: 'premium_annual',
} as const;

export const SKU_LIST: string[] = [PRODUCT_IDS.MONTHLY, PRODUCT_IDS.ANNUAL];

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SubscriptionProduct {
  productId: string;
  title: string;
  description: string;
  /** Localized price string (e.g. "ARS 2,999.00") */
  price: string;
  /** Price in micros (e.g. 2990000) */
  priceMicros: number;
  /** Currency code (e.g. "ARS", "USD") */
  currency: string;
  /** Billing period ISO 8601 (e.g. "P1M", "P1Y") */
  period: string;
  /** Offer token required for purchase on Google Play */
  offerToken: string;
  /** Free trial period if available */
  freeTrialPeriod?: string;
}

export type { SubscriptionPurchase, PurchaseError, EmitterSubscription };

// ─── Connection ──────────────────────────────────────────────────────────────

export async function initBilling(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  try {
    const result = await initConnection();
    return !!result;
  } catch (error) {
    console.warn('[Billing] Init failed:', error);
    return false;
  }
}

export async function closeBilling(): Promise<void> {
  try {
    await endConnection();
  } catch {}
}

// ─── Fetch products ──────────────────────────────────────────────────────────

export async function fetchSubscriptionProducts(): Promise<SubscriptionProduct[]> {
  try {
    const subs = await getSubscriptions({ skus: SKU_LIST });
    return subs.flatMap(parseSubscription);
  } catch (error) {
    console.warn('[Billing] Fetch subscriptions failed:', error);
    return [];
  }
}

function parseSubscription(sub: Subscription): SubscriptionProduct[] {
  // Only handle Android subscriptions (this app is Android-only)
  if (sub.platform !== SubscriptionPlatform.android) {
    return [];
  }

  const androidSub = sub as SubscriptionAndroid;
  const offers = androidSub.subscriptionOfferDetails;
  if (!offers || offers.length === 0) {
    return [{
      productId: androidSub.productId,
      title: androidSub.title || androidSub.productId,
      description: androidSub.description || '',
      price: '',
      priceMicros: 0,
      currency: '',
      period: '',
      offerToken: '',
    }];
  }

  return offers.map((offer) => {
    const phases = offer.pricingPhases.pricingPhaseList;
    const recurringPhase = phases.find(p =>
      parseInt(p.priceAmountMicros || '0', 10) > 0,
    ) || phases[phases.length - 1];
    const trialPhase = phases.find(p =>
      parseInt(p.priceAmountMicros || '0', 10) === 0,
    );

    return {
      productId: androidSub.productId,
      title: androidSub.title || androidSub.productId,
      description: androidSub.description || '',
      price: recurringPhase?.formattedPrice || '',
      priceMicros: parseInt(recurringPhase?.priceAmountMicros || '0', 10),
      currency: recurringPhase?.priceCurrencyCode || '',
      period: recurringPhase?.billingPeriod || '',
      offerToken: offer.offerToken || '',
      freeTrialPeriod: trialPhase?.billingPeriod,
    };
  });
}

// ─── Purchase ────────────────────────────────────────────────────────────────

export async function purchaseSubscription(
  productId: string,
  offerToken: string,
): Promise<void> {
  await requestSubscription({
    sku: productId,
    subscriptionOffers: [{ sku: productId, offerToken }],
  });
}

// ─── Restore ─────────────────────────────────────────────────────────────────

export async function restorePurchases(): Promise<SubscriptionPurchase[]> {
  try {
    const purchases = await getAvailablePurchases();
    return purchases.filter(p =>
      SKU_LIST.includes(p.productId),
    ) as SubscriptionPurchase[];
  } catch (error) {
    console.warn('[Billing] Restore failed:', error);
    return [];
  }
}

// ─── Acknowledge ─────────────────────────────────────────────────────────────

export async function acknowledgePurchase(
  purchase: SubscriptionPurchase,
): Promise<void> {
  try {
    await finishTransaction({ purchase, isConsumable: false });
  } catch (error) {
    console.warn('[Billing] Finish transaction failed:', error);
  }
}

// ─── Listeners ───────────────────────────────────────────────────────────────

export function onPurchaseUpdate(
  callback: (purchase: SubscriptionPurchase) => void,
): EmitterSubscription {
  return purchaseUpdatedListener((purchase) => {
    callback(purchase as SubscriptionPurchase);
  });
}

export function onPurchaseError(
  callback: (error: PurchaseError) => void,
): EmitterSubscription {
  return purchaseErrorListener(callback);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format billing period (ISO 8601) to human-readable Spanish */
export function formatPeriod(period: string): string {
  if (period === 'P1M') return 'mes';
  if (period === 'P3M') return 'trimestre';
  if (period === 'P6M') return 'semestre';
  if (period === 'P1Y') return 'año';
  return period;
}

/** Check if a purchase is still active (Android) */
export function isPurchaseActive(purchase: SubscriptionPurchase): boolean {
  return purchase.autoRenewingAndroid === true
    || purchase.purchaseStateAndroid === 1;
}
