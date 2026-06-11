import { useMemo, useCallback } from 'react';
import type {
  Drug,
  Unit,
  Chapter,
  CategoriesData,
  EmergencyDrug,
  Antidote,
  IVCompatibilitiesData,
  Pathology,
} from '../types';

// Lazy-loaded data imports
let _drugs: Drug[] | null = null;
let _categories: CategoriesData | null = null;
let _emergencyDrugs: EmergencyDrug[] | null = null;
let _antidotes: Antidote[] | null = null;
let _ivCompat: IVCompatibilitiesData | null = null;
let _pathologies: Pathology[] | null = null;

import { db, rowToDrug } from '../data/db';

// Lazy-loaded data imports
// Let drugs be fetched from SQLite, other files are small enough for RAM.

function getCategories(): CategoriesData {
  if (!_categories) _categories = require('../data/categories.json');
  return _categories!;
}

function getEmergencyDrugs(): EmergencyDrug[] {
  if (!_emergencyDrugs)
    _emergencyDrugs = require('../data/emergency_drugs.json');
  return _emergencyDrugs!;
}

function getAntidotes(): Antidote[] {
  if (!_antidotes) _antidotes = require('../data/antidotes.json');
  return _antidotes!;
}

function getIVCompatibilities(): IVCompatibilitiesData {
  if (!_ivCompat) _ivCompat = require('../data/iv_compatibilities.json');
  return _ivCompat!;
}

function getPathologies(): Pathology[] {
  if (!_pathologies) _pathologies = require('../data/pathologies.json');
  return _pathologies!;
}

export function useDrugData() {
  const drugs = useMemo(() => {
    const result = db.executeSync('SELECT * FROM drugs');
    return result.rows?.map(rowToDrug) || [];
  }, []);

  const categories = useMemo(() => getCategories(), []);
  const emergencyDrugs = useMemo(() => getEmergencyDrugs(), []);
  const antidotes = useMemo(() => getAntidotes(), []);
  const ivCompatibilities = useMemo(() => getIVCompatibilities(), []);
  const pathologies = useMemo(() => getPathologies(), []);

  const getPathologyById = useCallback(
    (id: string): Pathology | undefined => {
      return pathologies.find(p => p.id === id);
    },
    [pathologies],
  );

  const getPathologiesByCategory = useCallback(
    (category: string): Pathology[] => {
      return pathologies.filter(p => p.categoria === category);
    },
    [pathologies],
  );

  const getDrugById = useCallback((id: string): Drug | undefined => {
    const result = db.executeSync('SELECT * FROM drugs WHERE id = ? LIMIT 1', [
      id,
    ]);
    const row = result.rows?.[0];
    return row ? rowToDrug(row) : undefined;
  }, []);

  const getDrugsByChapter = useCallback((chapterId: string): Drug[] => {
    const result = db.executeSync('SELECT * FROM drugs WHERE capituloId = ?', [
      chapterId,
    ]);
    return result.rows?.map(rowToDrug) || [];
  }, []);

  const getDrugsByUnit = useCallback((unitId: string): Drug[] => {
    const result = db.executeSync('SELECT * FROM drugs WHERE unidadId = ?', [
      unitId,
    ]);
    return result.rows?.map(rowToDrug) || [];
  }, []);

  const getUnitById = useCallback(
    (unitId: string): Unit | undefined => {
      return categories.unidades.find(u => u.id === unitId);
    },
    [categories],
  );

  const getChapterById = useCallback(
    (chapterId: string): Chapter | undefined => {
      for (const unit of categories.unidades) {
        const chapter = unit.capitulos.find(c => c.id === chapterId);
        if (chapter) return chapter;
      }
      return undefined;
    },
    [categories],
  );

  const getRandomDrug = useCallback((): Drug => {
    const result = db.executeSync(
      'SELECT * FROM drugs ORDER BY RANDOM() LIMIT 1',
    );
    return rowToDrug(result.rows![0]);
  }, []);

  const getDrugCount = useCallback((): number => {
    const result = db.executeSync('SELECT COUNT(*) as count FROM drugs');
    return (result.rows?.[0].count as number) || 0;
  }, []);

  const getUnitDrugCount = useCallback((unitId: string): number => {
    const result = db.executeSync(
      'SELECT COUNT(*) as count FROM drugs WHERE unidadId = ?',
      [unitId],
    );
    return (result.rows?.[0].count as number) || 0;
  }, []);

  return {
    drugs,
    categories,
    emergencyDrugs,
    antidotes,
    ivCompatibilities,
    pathologies,
    getDrugById,
    getDrugsByChapter,
    getDrugsByUnit,
    getUnitById,
    getChapterById,
    getRandomDrug,
    getDrugCount,
    getUnitDrugCount,
    getPathologyById,
    getPathologiesByCategory,
  };
}
