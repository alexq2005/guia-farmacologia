/**
 * Schema validation tests for src/data/drugs.json.
 *
 * Why this exists: drugs.json is hydrated into SQLite at first boot (and
 * re-hydrated when DATASET_VERSION bumps). If the JSON is malformed or has
 * required fields missing, the SQLite INSERT will fail mid-transaction,
 * rollback, and the user is left without data.
 *
 * These tests act as a guard against accidental corruption when contributors
 * edit the JSON directly or generate it from a script. They run in CI and
 * prevent "broken data" PRs from merging.
 */

import drugs from '../src/data/drugs.json';

interface DrugLike {
  id: string;
  nombre: string;
  unidadId: string;
  capituloId: string;
  [key: string]: unknown;
}

const allDrugs = drugs as DrugLike[];

describe('drugs.json schema', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(allDrugs)).toBe(true);
    expect(allDrugs.length).toBeGreaterThan(0);
  });

  it('matches the documented count (sanity check, update on every dataset bump)', () => {
    // If you bumped DATASET_VERSION because content changed, update this number.
    // If this test fails after editing drugs.json, either the count is wrong
    // or you forgot to update this expected value.
    expect(allDrugs.length).toBe(2974);
  });

  it('every drug has a non-empty `id`', () => {
    const offenders = allDrugs.filter(d => !d.id || typeof d.id !== 'string');
    expect(offenders).toEqual([]);
  });

  it('every drug has a non-empty `nombre`', () => {
    const offenders = allDrugs
      .filter(d => !d.nombre || typeof d.nombre !== 'string')
      .map(d => d.id);
    expect(offenders).toEqual([]);
  });

  it('every drug has `unidadId` and `capituloId` (required for category navigation)', () => {
    const missingUnit = allDrugs.filter(d => !d.unidadId).map(d => d.id);
    const missingChapter = allDrugs.filter(d => !d.capituloId).map(d => d.id);
    expect(missingUnit).toEqual([]);
    expect(missingChapter).toEqual([]);
  });

  it('all `id` values are unique (SQLite PRIMARY KEY constraint would fail otherwise)', () => {
    const ids = allDrugs.map(d => d.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      // Find the duplicates so the failure message is actionable
      const seen = new Set<string>();
      const dups: string[] = [];
      for (const id of ids) {
        if (seen.has(id)) dups.push(id);
        seen.add(id);
      }
      throw new Error(
        `Duplicate drug IDs found: ${dups.slice(0, 10).join(', ')}${
          dups.length > 10 ? ` (+${dups.length - 10} more)` : ''
        }`,
      );
    }
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('array fields are arrays (not strings or undefined) when present', () => {
    const arrayFields = [
      'nombresComerciales',
      'indicaciones',
      'contraindicaciones',
      'efectosAdversos',
      'interacciones',
      'viaAdministracion',
      'presentaciones',
      'cuidadosEnfermeria',
    ];
    for (const field of arrayFields) {
      const offenders = allDrugs
        .filter(d => d[field] !== undefined && !Array.isArray(d[field]))
        .map(d => d.id);
      if (offenders.length > 0) {
        throw new Error(
          `Field "${field}" is not an array in: ${offenders
            .slice(0, 5)
            .join(', ')}`,
        );
      }
    }
  });

  it('`isPremium` is boolean or undefined (never string/number)', () => {
    const offenders = allDrugs
      .filter(
        d => d.isPremium !== undefined && typeof d.isPremium !== 'boolean',
      )
      .map(d => d.id);
    expect(offenders).toEqual([]);
  });
});
