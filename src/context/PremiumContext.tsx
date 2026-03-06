import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isActivated as checkActivation, validateActivationCode, saveActivation } from '../utils/activation';

/** Free build has all features unlocked — no trial/subscription needed */
const IS_FREE_BUILD: boolean = NativeModules.BuildConfigModule?.IS_FREE ?? false;

const TRIAL_START_KEY = '@guia_farmaco_trial_start';
const PREMIUM_KEY = '@guia_farmaco_premium';
const TRIAL_DAYS = 14;

interface PremiumContextType {
  /** true if trial active OR subscription active */
  isPremium: boolean;
  /** true if this is the free build (no subscription system) */
  isFreeBuild: boolean;
  /** true if unlocked via activation code */
  isCodeActivated: boolean;
  /** true if within 30-day trial */
  isTrialActive: boolean;
  /** days remaining in trial (0 if expired) */
  trialDaysLeft: number;
  /** trial start timestamp */
  trialStartDate: number | null;
  /** whether user has active subscription */
  isSubscribed: boolean;
  /** manually activate subscription (for future IAP integration) */
  activateSubscription: () => void;
  /** restore purchase */
  restoreSubscription: () => void;
  /** try to activate with a secret code, returns true if valid */
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

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(TRIAL_START_KEY),
      AsyncStorage.getItem(PREMIUM_KEY),
      checkActivation(),
    ]).then(([trialRaw, premiumRaw, activated]) => {
      if (trialRaw) {
        setTrialStartDate(parseInt(trialRaw, 10));
      } else {
        // First launch — start trial now
        const now = Date.now();
        setTrialStartDate(now);
        AsyncStorage.setItem(TRIAL_START_KEY, now.toString()).catch(() => {});
      }
      if (premiumRaw === 'true') {
        setIsSubscribed(true);
      }
      if (activated) {
        setIsCodeActivated(true);
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const trialDaysLeft = (() => {
    if (!trialStartDate) return TRIAL_DAYS;
    const elapsed = Date.now() - trialStartDate;
    const remaining = TRIAL_DAYS - Math.floor(elapsed / (1000 * 60 * 60 * 24));
    return Math.max(0, remaining);
  })();

  const isTrialActive = trialDaysLeft > 0;
  const isPremium = IS_FREE_BUILD || isCodeActivated || isSubscribed || isTrialActive;

  const activateSubscription = useCallback(() => {
    setIsSubscribed(true);
    AsyncStorage.setItem(PREMIUM_KEY, 'true').catch(() => {});
  }, []);

  const restoreSubscription = useCallback(() => {
    // Placeholder — will check Google Play Billing in the future
    // For now, just check AsyncStorage
    AsyncStorage.getItem(PREMIUM_KEY).then(val => {
      if (val === 'true') setIsSubscribed(true);
    }).catch(() => {});
  }, []);

  const activateWithCode = useCallback(async (code: string): Promise<boolean> => {
    if (validateActivationCode(code)) {
      await saveActivation();
      setIsCodeActivated(true);
      return true;
    }
    return false;
  }, []);

  if (!loaded) return null;

  return (
    <PremiumContext.Provider value={{
      isPremium,
      isFreeBuild: IS_FREE_BUILD,
      isCodeActivated,
      isTrialActive,
      trialDaysLeft,
      trialStartDate,
      isSubscribed,
      activateSubscription,
      restoreSubscription,
      activateWithCode,
      loaded,
    }}>
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
