/**
 * Dataset metadata loader and helpers.
 *
 * Reads `src/data/_meta.json` which holds provenance and review status for
 * each clinical dataset. The metadata lives in a separate file (rather than
 * wrapping each dataset in `{_meta, data}`) so existing loaders that import
 * the JSON arrays directly (db.ts, hooks, screens) keep working unchanged.
 *
 * Use this module from UI code that needs to surface "última revisión" or
 * source information to the user, and from the schema test that guards
 * against missing fields.
 */

import metaJson from '../data/_meta.json';

export type DatasetKey =
  | 'drugs'
  | 'pathologies'
  | 'emergency_protocols'
  | 'clinical_scales'
  | 'lab_values'
  | 'parenteral_guide'
  | 'formulas'
  | 'glossary';

export interface DatasetMeta {
  displayName: string;
  file: string;
  entries: number;
  /** ISO date (YYYY-MM-DD) — last time this JSON was edited at the technical level. */
  lastEdited: string;
  /** ISO date or null. Set ONLY by a human with the credential below after reviewing. */
  lastClinicalReview: string | null;
  /** Full name of the clinician who signed the review. */
  reviewedBy: string | null;
  /** e.g. "Farmacéutico colegiado COF-12345", "Enfermero/a especialista", etc. */
  reviewerCredential: string | null;
  /** Human-readable source description (e.g. "AEMPS-CIMA + literatura"). */
  sourceCanonical: string;
  /** Optional URL to the canonical source. */
  sourceUrl: string | null;
  /** ISO date — last time the dataset was synced with sourceCanonical (e.g. fetch_cima.py run). */
  lastSyncWithSource: string | null;
  /** Plain-language description of inclusion/exclusion criteria. Required for HONcode/AppSaludable. */
  selectionCriteria: string;
}

export interface ResponsibleParty {
  name: string | null;
  credential: string | null;
  contact: string;
}

export interface AllMeta {
  _schema: string;
  _description: string;
  responsible: ResponsibleParty;
  datasets: Record<DatasetKey, DatasetMeta>;
}

const meta = metaJson as AllMeta;

export function getResponsible(): ResponsibleParty {
  return meta.responsible;
}

export function getMeta(key: DatasetKey): DatasetMeta {
  return meta.datasets[key];
}

export function getAllDatasetKeys(): DatasetKey[] {
  return Object.keys(meta.datasets) as DatasetKey[];
}

/**
 * Status for UI badges. "reviewed" = has both date and reviewer credential.
 * "edited" = JSON has been edited but not clinically signed off.
 */
export type ReviewStatus = 'reviewed' | 'edited' | 'unknown';

export function getReviewStatus(key: DatasetKey): ReviewStatus {
  const m = meta.datasets[key];
  if (m.lastClinicalReview && m.reviewedBy) return 'reviewed';
  if (m.lastEdited) return 'edited';
  return 'unknown';
}

/**
 * Human-readable label for UI banners.
 *
 *   reviewed → "Revisado clínicamente: 2026-05-12 · Dr. X"
 *   edited   → "Edición técnica: 2026-05-06 · Pendiente revisión clínica"
 *   unknown  → "Información sin metadatos"
 */
export function formatReviewLabel(key: DatasetKey): string {
  const m = meta.datasets[key];
  const status = getReviewStatus(key);
  if (status === 'reviewed') {
    return `Revisado clínicamente: ${m.lastClinicalReview} · ${m.reviewedBy}`;
  }
  if (status === 'edited') {
    return `Edición técnica: ${m.lastEdited} · Pendiente revisión clínica`;
  }
  return 'Información sin metadatos';
}

/**
 * Format month-year (e.g. "Mayo 2026") for compact UI.
 * Defensive — accepts ISO YYYY-MM-DD or null.
 */
export function formatMonthYear(isoDate: string | null): string {
  if (!isoDate) return '—';
  const [year, month] = isoDate.split('-');
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const m = parseInt(month, 10);
  if (Number.isNaN(m) || m < 1 || m > 12) return isoDate;
  return `${months[m - 1]} ${year}`;
}
