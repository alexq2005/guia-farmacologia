import { useState, useMemo, useCallback } from 'react';
import type { Drug, SearchResult } from '../types';

/** Normalize text for search: lowercase, remove accents */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/** Score a drug against a search query */
function scoreDrug(drug: Drug, query: string): SearchResult | null {
  const normalizedQuery = normalize(query);
  const terms = normalizedQuery.split(/\s+/).filter(t => t.length >= 2);

  if (terms.length === 0) return null;

  let totalScore = 0;
  const matchedFields: string[] = [];

  // Check nombre (highest priority)
  const nombre = normalize(drug.nombre);
  const generico = normalize(drug.nombreGenerico);

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
    const comerciales = drug.nombresComerciales.map(normalize);
    if (comerciales.some(c => c.includes(term))) {
      totalScore += 2;
      if (!matchedFields.includes('comercial')) matchedFields.push('comercial');
    }

    // Check familia/clasificacion
    if (normalize(drug.familia).includes(term) || normalize(drug.clasificacion).includes(term)) {
      totalScore += 2;
      if (!matchedFields.includes('clasificacion')) matchedFields.push('clasificacion');
    }

    // Check indicaciones
    if (drug.indicaciones.some(i => normalize(i).includes(term))) {
      totalScore += 1;
      if (!matchedFields.includes('indicaciones')) matchedFields.push('indicaciones');
    }

    // Check searchText (catch-all)
    if (totalScore === 0 && normalize(drug.searchText).includes(term)) {
      totalScore += 0.5;
      matchedFields.push('otro');
    }
  }

  if (totalScore === 0) return null;

  return { drug, score: totalScore, matchedFields };
}

export function useDrugSearch(drugs: Drug[]) {
  const [query, setQuery] = useState('');

  const results = useMemo((): SearchResult[] => {
    if (query.trim().length < 2) return [];

    const scored = drugs
      .map(drug => scoreDrug(drug, query))
      .filter((r): r is SearchResult => r !== null);

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 50); // Limit to 50 results
  }, [drugs, query]);

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
