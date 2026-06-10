import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { NativeModules, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  isActivated as checkActivation,
  validateActivationCode,
  saveActivation,
} from '../utils/activation';
import { computeTrialDaysLeft, computeIsPremium } from '../utils/premiumLogic';
import {
  initBilling,
  closeBilling,
  fetchSubscriptionProducts,
  purchaseSubscription,
  restorePurchases,
  acknowledgePurchase,
  onPurchaseUpdate,
  onPurchaseError,
  isPurchaseActive,
  type SubscriptionProduct,
  type EmitterSubscription,
} from '../utils/billing';

/** Free build has all features unlocked — no trial/subscription needed */
const IS_FREE_BUILD: boolean =
  NativeModules.BuildConfigModule?.IS_FREE ?? false;

const TRIAL_START_KEY = '@guia_farmaco_trial_start';
const PREMIUM_KEY = '@guia_farmaco_premium';
const TRIAL_DAYS = 14;

interface PremiumContextType {
  /** true if trial active OR subscription active OR code activated */
  isPremium: boolean;
  /** true if this is the free build (no subscription system) */
  isFreeBuild: boolean;
  /** true if unlocked via activation code */
  isCodeActivated: boolean;
  /** true if within trial period */
  isTrialActive: boolean;
  /** days remaining in trial (0 if expired) */
  trialDaysLeft: number;
  /** trial start timestamp */
  trialStartDate: number | null;
  /** whether user has active Google Play subscription */
  isSubscribed: boolean;
  /** available subscription products from Google Play */
  products: SubscriptionProduct[];
  /** whether billing is initializing or purchasing */
  isBillingLoading: boolean;
  /** purchase a subscription */
  purchase: (productId: string, offerToken: string) => Promise<void>;
  /** restore purchases from Google Play */
  restore: () => Promise<boolean>;
  /** try to activate with a secret code */
  activateWithCode: (code: string) => Promise<boolean>;
  /** context loaded from storage */
  loaded: boolean;
}

const PremiumContext = createContext<PremiumContextType | null>(null);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [trialStartDate, setTrialStartDate] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCodeActivated, setIsCodeActivated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const purchaseListenerRef = useRef<EmitterSubscription | null>(null);
  const errorListenerRef = useRef<EmitterSubscription | null>(null);

  // ─── Initialize trial + activation + billing ─────────────────────────────

  useEffect(() => {
    let mounted = true;

    async function init() {
      // Load local state
      const [trialRaw, premiumRaw, activated] = await Promise.all([
        EncryptedStorage.getItem(TRIAL_START_KEY).catch(() => null),
        EncryptedStorage.getItem(PREMIUM_KEY).catch(() => null),
        checkActivation(),
      ]);

      if (!mounted) return;

      if (trialRaw) {
        setTrialStartDate(parseInt(trialRaw, 10));
      } else if (!IS_FREE_BUILD) {
        const now = Date.now();
        setTrialStartDate(now);
        EncryptedStorage.setItem(TRIAL_START_KEY, now.toString()).catch(
          () => {},
        );
      }

      if (premiumRaw === 'true') {
        setIsSubscribed(true);
      }

      if (activated) {
        setIsCodeActivated(true);
      }

      setLoaded(true);

      // Initialize Google Play Billing (premium build only)
      if (!IS_FREE_BUILD) {
        const connected = await initBilling();
        if (connected && mounted) {
          // Fetch available products
          const subs = await fetchSubscriptionProducts();
          if (mounted) setProducts(subs);

          // Check for existing active subscriptions
          const purchases = await restorePurchases();
          const activePurchase = purchases.find(isPurchaseActive);
          if (activePurchase && mounted) {
            setIsSubscribed(true);
            EncryptedStorage.setItem(PREMIUM_KEY, 'true').catch(() => {});
          }
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // ─── Purchase listeners ──────────────────────────────────────────────────

  useEffect(() => {
    if (IS_FREE_BUILD) return;

    purchaseListenerRef.current = onPurchaseUpdate(async purchase => {
      // Acknowledge/finish the transaction (required within 3 days)
      await acknowledgePurchase(purchase);

      if (isPurchaseActive(purchase)) {
        setIsSubscribed(true);
        setIsBillingLoading(false);
        EncryptedStorage.setItem(PREMIUM_KEY, 'true').catch(() => {});
      }
    });

    errorListenerRef.current = onPurchaseError(error => {
      setIsBillingLoading(false);
      // Don't show alert for user cancellation
      if (error.code !== 'E_USER_CANCELLED') {
        Alert.alert(
          'Error',
          'No se pudo completar la compra. Intenta nuevamente.',
        );
      }
    });

    return () => {
      purchaseListenerRef.current?.remove();
      errorListenerRef.current?.remove();
      closeBilling();
    };
  }, []);

  // ─── Derived state ───────────────────────────────────────────────────────

  const trialDaysLeft = computeTrialDaysLeft(
    trialStartDate,
    Date.now(),
    TRIAL_DAYS,
  );
  const isTrialActive = trialDaysLeft > 0;
  const isPremium = computeIsPremium({
    isFreeBuild: IS_FREE_BUILD,
    isCodeActivated,
    isSubscribed,
    isTrialActive,
  });

  // ─── Actions ─────────────────────────────────────────────────────────────

  const purchase = useCallback(
    async (productId: string, offerToken: string) => {
      setIsBillingLoading(true);
      try {
        await purchaseSubscription(productId, offerToken);
        // Result handled by purchaseUpdatedListener
      } catch {
        setIsBillingLoading(false);
        Alert.alert(
          'Error',
          'No se pudo iniciar la compra. Verifica tu conexión.',
        );
      }
    },
    [],
  );

  const restore = useCallback(async (): Promise<boolean> => {
    setIsBillingLoading(true);
    try {
      const purchases = await restorePurchases();
      const activePurchase = purchases.find(isPurchaseActive);

      if (activePurchase) {
        await acknowledgePurchase(activePurchase);
        setIsSubscribed(true);
        EncryptedStorage.setItem(PREMIUM_KEY, 'true').catch(() => {});
        setIsBillingLoading(false);
        return true;
      }

      setIsBillingLoading(false);
      return false;
    } catch {
      setIsBillingLoading(false);
      return false;
    }
  }, []);

  const activateWithCode = useCallback(
    async (code: string): Promise<boolean> => {
      if (validateActivationCode(code)) {
        await saveActivation();
        setIsCodeActivated(true);
        return true;
      }
      return false;
    },
    [],
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  if (!loaded) return null;

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        isFreeBuild: IS_FREE_BUILD,
        isCodeActivated,
        isTrialActive,
        trialDaysLeft,
        trialStartDate,
        isSubscribed,
        products,
        isBillingLoading,
        purchase,
        restore,
        activateWithCode,
        loaded,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium(): PremiumContextType {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider');
  }
  return context;
}
