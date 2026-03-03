import { useMemo, useCallback } from 'react';
import type { Drug, Unit, Chapter, CategoriesData, EmergencyDrug, Antidote, IVCompatibilitiesData, Pathology } from '../types';

// Lazy-loaded data imports
let _drugs: Drug[] | null = null;
let _categories: CategoriesData | null = null;
let _emergencyDrugs: EmergencyDrug[] | null = null;
let _antidotes: Antidote[] | null = null;
let _ivCompat: IVCompatibilitiesData | null = null;
let _pathologies: Pathology[] | null = null;

function getDrugs(): Drug[] {
  if (!_drugs) _drugs = require('../data/drugs.json');
  return _drugs!;
}

function getCategories(): CategoriesData {
  if (!_categories) _categories = require('../data/categories.json');
  return _categories!;
}

function getEmergencyDrugs(): EmergencyDrug[] {
  if (!_emergencyDrugs) _emergencyDrugs = require('../data/emergency_drugs.json');
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
  const drugs = useMemo(() => getDrugs(), []);
  const categories = useMemo(() => getCategories(), []);
  const emergencyDrugs = useMemo(() => getEmergencyDrugs(), []);
  const antidotes = useMemo(() => getAntidotes(), []);
  const ivCompatibilities = useMemo(() => getIVCompatibilities(), []);
  const pathologies = useMemo(() => getPathologies(), []);

  const getPathologyById = useCallback((id: string): Pathology | undefined => {
    return pathologies.find(p => p.id === id);
  }, [pathologies]);

  const getPathologiesByCategory = useCallback((category: string): Pathology[] => {
    return pathologies.filter(p => p.categoria === category);
  }, [pathologies]);

  const getDrugById = useCallback((id: string): Drug | undefined => {
    return drugs.find(d => d.id === id);
  }, [drugs]);

  const getDrugsByChapter = useCallback((chapterId: string): Drug[] => {
    return drugs.filter(d => d.capituloId === chapterId);
  }, [drugs]);

  const getDrugsByUnit = useCallback((unitId: string): Drug[] => {
    return drugs.filter(d => d.unidadId === unitId);
  }, [drugs]);

  const getUnitById = useCallback((unitId: string): Unit | undefined => {
    return categories.unidades.find(u => u.id === unitId);
  }, [categories]);

  const getChapterById = useCallback((chapterId: string): Chapter | undefined => {
    for (const unit of categories.unidades) {
      const chapter = unit.capitulos.find(c => c.id === chapterId);
      if (chapter) return chapter;
    }
    return undefined;
  }, [categories]);

  const getRandomDrug = useCallback((): Drug => {
    return drugs[Math.floor(Math.random() * drugs.length)];
  }, [drugs]);

  const getDrugCount = useCallback((): number => drugs.length, [drugs]);

  const getUnitDrugCount = useCallback((unitId: string): number => {
    return drugs.filter(d => d.unidadId === unitId).length;
  }, [drugs]);

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
