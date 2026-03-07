import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Centralized icon component for consistent usage across the app
export function Icon({
  name,
  size = 24,
  color = '#000',
  family = 'material',
}: {
  name: string;
  size?: number;
  color?: string;
  family?: 'material' | 'ion';
}) {
  if (family === 'ion') {
    return <Ionicons name={name} size={size} color={color} />;
  }
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

// ============================================================
// Icon name mappings — single source of truth
// ============================================================

// Tab bar
export const TAB_ICONS = {
  home: { active: 'home', inactive: 'home-outline' },
  categories: { active: 'bookshelf', inactive: 'book-open-page-variant-outline' },
  search: { active: 'magnify', inactive: 'magnify' },
  special: { active: 'alert-decagram', inactive: 'alert-decagram-outline' },
  tools: { active: 'wrench', inactive: 'wrench-outline' },
} as const;

// Quick actions on Home
export const QUICK_ICONS = {
  search: 'text-search',
  quiz: 'head-question-outline',
  protocols: 'hospital-box-outline',
  scales: 'chart-timeline-variant-shimmer',
  lab: 'flask-outline',
} as const;

// Drug detail sections
export const SECTION_ICONS = {
  mechanism: 'cog-outline',
  indications: 'check-decagram-outline',
  contraindications: 'close-octagon-outline',
  adverseEffects: 'alert-outline',
  interactions: 'swap-horizontal',
  dosage: 'needle',
  nursing: 'account-heart-outline',
  pharmacokinetics: 'chart-bell-curve-cumulative',
  storage: 'fridge-outline',
  parenteral: 'iv-bag',
  reconstitution: 'flask-round-bottom-outline',
  dilution: 'water-outline',
  solutions: 'test-tube',
  observations: 'clipboard-text-outline',
  overdose: 'alert-circle-outline',
  pregnancy: 'human-pregnant',
  routes: 'directions-fork',
  presentations: 'pill',
  lactation: 'baby-bottle-outline',
  replacement: 'swap-horizontal-circle-outline',
} as const;

// Tools screen
export const TOOL_ICONS = {
  quiz: 'head-question-outline',
  comparison: 'scale-balance',
  interactions: 'swap-horizontal-bold',
  calculators: 'calculator-variant-outline',
  scales: 'chart-timeline-variant-shimmer',
  lab: 'flask-outline',
  protocols: 'hospital-box-outline',
  parenteral: 'iv-bag',
  pathologies: 'stethoscope',
  glossary: 'book-alphabet',
  routes: 'directions-fork',
  formulas: 'function-variant',
  nursing: 'account-heart-outline',
  dashboard: 'chart-arc',
  favorites: 'heart-outline',
  notes: 'note-text-outline',
  backup: 'cloud-sync-outline',
  premium: 'star-four-points-outline',
  about: 'information-outline',
  privacy: 'shield-lock-outline',
  terms: 'file-document-outline',
} as const;

// Categories
export const CATEGORY_ICONS = {
  nervous: 'brain',
  cardiovascular: 'heart-pulse',
  respiratory: 'lungs',
  digestive: 'stomach',
  musculoskeletal: 'bone',
  endocrine: 'diabetes',
  antiinfective: 'virus-outline',
  antineoplastic: 'ribbon',
  blood: 'water-outline',
  dermatology: 'hand-back-right-outline',
  genitourinary: 'kidney',
  eye: 'eye-outline',
  immune: 'shield-plus-outline',
  hospital: 'hospital-building',
} as const;
