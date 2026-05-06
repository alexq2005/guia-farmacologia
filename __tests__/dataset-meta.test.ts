/**
 * Tests for src/data/_meta.json — dataset provenance metadata.
 *
 * These tests guard against:
 *   - Forgetting to update entry counts after editing a dataset
 *   - Schema drift (missing required fields)
 *   - Date format inconsistencies
 *
 * They do NOT validate clinical correctness — only that the metadata file
 * stays internally consistent with the data files it describes.
 */

import meta from '../src/data/_meta.json';
import drugs from '../src/data/drugs.json';
import pathologies from '../src/data/pathologies.json';
import emergencyProtocols from '../src/data/emergency_protocols.json';
import clinicalScales from '../src/data/clinical_scales.json';
import labValues from '../src/data/lab_values.json';
import parenteralGuide from '../src/data/parenteral_guide.json';
import formulas from '../src/data/formulas.json';
import glossary from '../src/data/glossary.json';

// Datasets that are top-level arrays — entries should equal array length.
// parenteral_guide is excluded because the JSON is a structured object with
// sections, not a list of items. Its `entries` in _meta.json refers to the
// number of sections (currently 4) and is validated below as a positive int.
const arrayBackedCounts: Record<string, number> = {
  drugs: (drugs as unknown[]).length,
  pathologies: (pathologies as unknown[]).length,
  emergency_protocols: (emergencyProtocols as unknown[]).length,
  clinical_scales: (clinicalScales as unknown[]).length,
  lab_values: (labValues as unknown[]).length,
  formulas: (formulas as unknown[]).length,
  glossary: (glossary as unknown[]).length,
};
// All datasets known to the project (used for the "covers every dataset" test).
const allDatasetKeys = [...Object.keys(arrayBackedCounts), 'parenteral_guide'];
// Touch the import to keep TypeScript from tree-shaking it.
void parenteralGuide;

const REQUIRED_FIELDS = [
  'displayName',
  'file',
  'entries',
  'lastEdited',
  'lastClinicalReview',
  'reviewedBy',
  'reviewerCredential',
  'sourceCanonical',
  'sourceUrl',
  'lastSyncWithSource',
  'selectionCriteria',
] as const;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe('_meta.json structural integrity', () => {
  it('has a schema version', () => {
    expect(meta._schema).toBeDefined();
    expect(typeof meta._schema).toBe('string');
  });

  it('declares responsible party with at least a contact', () => {
    expect(meta.responsible).toBeDefined();
    expect(meta.responsible.contact).toBeTruthy();
  });

  it('covers every dataset that the project actually loads', () => {
    const declared = Object.keys(meta.datasets).sort();
    const actual = [...allDatasetKeys].sort();
    expect(declared).toEqual(actual);
  });

  it.each(Object.keys(meta.datasets))(
    '%s — has all required metadata fields',
    key => {
      const m = (meta.datasets as Record<string, Record<string, unknown>>)[key];
      for (const field of REQUIRED_FIELDS) {
        expect(m).toHaveProperty(field);
      }
    },
  );

  it.each(Object.keys(arrayBackedCounts))(
    '%s — entries count matches the actual JSON file (array-backed datasets)',
    key => {
      const declared = (meta.datasets as Record<string, { entries: number }>)[
        key
      ].entries;
      const actual = arrayBackedCounts[key];
      expect(declared).toBe(actual);
    },
  );

  it('parenteral_guide — entries is a positive integer (object-backed dataset)', () => {
    const m = (meta.datasets as Record<string, { entries: number }>)
      .parenteral_guide;
    expect(typeof m.entries).toBe('number');
    expect(m.entries).toBeGreaterThan(0);
  });

  it.each(Object.keys(meta.datasets))(
    '%s — lastEdited is ISO date format YYYY-MM-DD',
    key => {
      const m = (meta.datasets as Record<string, { lastEdited: string }>)[key];
      expect(m.lastEdited).toMatch(ISO_DATE);
    },
  );

  it.each(Object.keys(meta.datasets))(
    '%s — selectionCriteria is non-empty (required for HONcode/AppSaludable)',
    key => {
      const m = (
        meta.datasets as Record<string, { selectionCriteria: string }>
      )[key];
      expect(m.selectionCriteria).toBeTruthy();
      expect(m.selectionCriteria.length).toBeGreaterThan(20);
    },
  );

  it.each(Object.keys(meta.datasets))(
    '%s — review consistency: reviewedBy and lastClinicalReview must both be set or both null',
    key => {
      const m = (
        meta.datasets as Record<
          string,
          { lastClinicalReview: string | null; reviewedBy: string | null }
        >
      )[key];
      const hasDate = m.lastClinicalReview !== null;
      const hasReviewer = m.reviewedBy !== null;
      // Either both set or both null. Half-set is misleading to the user.
      expect(hasDate).toBe(hasReviewer);
    },
  );

  it.each(Object.keys(meta.datasets))(
    '%s — if lastClinicalReview is set, it is ISO date format',
    key => {
      const m = (
        meta.datasets as Record<string, { lastClinicalReview: string | null }>
      )[key];
      if (m.lastClinicalReview !== null) {
        expect(m.lastClinicalReview).toMatch(ISO_DATE);
      }
    },
  );
});
