import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { Drug, SearchResult } from '../types';
import { normalizeText as normalize } from '../utils/search';
import { db, rowToDrug } from '../data/db';

/** Build search text from drug fields (replaces precalculated searchText) */
function buildSearchText(drug: Drug): string {
  return [
    drug.nombre,
    drug.nombreGenerico,
    ...drug.nombresComerciales,
    drug.familia,
    drug.clasificacion,
    ...drug.indicaciones,
    ...drug.contraindicaciones,
    ...drug.efectosAdversos,
    drug.mecanismoAccion,
    drug.embarazo,
    drug.lactancia,
    ...drug.viaAdministracion,
    drug.grupoFarmacologico,
    drug.grupoTerapeutico,
  ].filter(Boolean).join(' ');
}

/** Score a drug against a search query */
function scoreDrug(drug: Drug, searchTextMap: Map<string, string>, query: string): SearchResult | null {
  const normalizedQuery = normalize(query);
  const terms = normalizedQuery.split(/\s+/).filter(t => t.length >= 2);

  if (terms.length === 0) return null;

  let totalScore = 0;
  const matchedFields: string[] = [];

  // Check nombre (highest priority)
  const nombre = normalize(drug.nombre);
  const generico = normalize(drug.nombreGenerico);

  const comerciales = drug.nombresComerciales.map(normalize);
  const familia = normalize(drug.familia);
  const clasificacion = normalize(drug.clasificacion);

  for (const term of terms) {
    // Exact name match
    if (nombre === term || generico === term) {
      totalScore += 10;
      if (!matchedFields.includes('nombre')) matchedFields.push('nombre');
    }
    // Name starts with term
    else if (nombre.startsWith(term) || generico.startsWith(term)) {
      totalScore += 5;
      if (!matchedFields.includes('nombre')) matchedFields.push('nombre');
    }
    // Name contains term
    else if (nombre.includes(term) || generico.includes(term)) {
      totalScore += 3;
      if (!matchedFields.includes('nombre')) matchedFields.push('nombre');
    }

    // Check brand names
    if (comerciales.some(c => c.includes(term))) {
      totalScore += 2;
      if (!matchedFields.includes('comercial')) matchedFields.push('comercial');
    }

    // Check familia/clasificacion
    if (familia.includes(term) || clasificacion.includes(term)) {
      totalScore += 2;
      if (!matchedFields.includes('clasificacion')) matchedFields.push('clasificacion');
    }

    // Check indicaciones
    if (drug.indicaciones.some(i => normalize(i).includes(term))) {
      totalScore += 1;
      if (!matchedFields.includes('indicaciones')) matchedFields.push('indicaciones');
    }

    // Check searchText (catch-all, generated at runtime)
    if (totalScore === 0 && normalize(searchTextMap.get(drug.id) || '').includes(term)) {
      totalScore += 0.5;
      matchedFields.push('otro');
    }
  }

  if (totalScore === 0) return null;

  return { drug, score: totalScore, matchedFields };
}

export function useDrugSearch(drugs: Drug[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  // Precompute search text once for all drugs (replaces JSON searchText field)
  const searchTextMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const drug of drugs) {
      map.set(drug.id, buildSearchText(drug));
    }
    return map;
  }, [drugs]);

  const results = useMemo((): SearchResult[] => {
    if (debouncedQuery.trim().length < 2) return [];

    const result = db.executeSync('SELECT * FROM drugs');
    const rawData = result.rows?.map(rowToDrug) || [];

    const scored = rawData
      .map(drug => scoreDrug(drug, searchTextMap, debouncedQuery))
      .filter((r): r is SearchResult => r !== null);

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 50); // Limit to 50 results
  }, [drugs, debouncedQuery, searchTextMap]);

  const search = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    results,
    search,
    clear,
    resultCount: results.length,
  };
}
