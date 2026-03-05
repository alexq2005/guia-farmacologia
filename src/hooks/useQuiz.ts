import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Drug, QuizQuestion, QuizResult } from '../types';

const RESULTS_KEY = '@guia_farmaco_quiz_results';

type QuestionType = QuizQuestion['type'];

const QUESTION_TEMPLATES: Record<QuestionType, (drug: Drug) => { q: string; correct: string; field: keyof Drug } | null> = {
  indication: (d) => {
    if (!d.indicaciones.length) return null;
    return { q: `¿Cuál es una indicación de ${d.nombre}?`, correct: d.indicaciones[0], field: 'indicaciones' };
  },
  contraindication: (d) => {
    if (!d.contraindicaciones.length) return null;
    return { q: `¿Cuál es una contraindicación de ${d.nombre}?`, correct: d.contraindicaciones[0], field: 'contraindicaciones' };
  },
  route: (d) => {
    if (!d.viaAdministracion.length) return null;
    return { q: `¿Por qué vía se administra ${d.nombre}?`, correct: d.viaAdministracion[0], field: 'viaAdministracion' };
  },
  pregnancy: (d) => {
    if (d.embarazo === 'N/A') return null;
    return { q: `¿Cuál es la categoría de embarazo de ${d.nombre}?`, correct: d.embarazo, field: 'embarazo' };
  },
  family: (d) => ({
    q: `¿A qué familia pertenece ${d.nombre}?`,
    correct: d.familia,
    field: 'familia',
  }),
  mechanism: (d) => {
    if (!d.mecanismoAccion) return null;
    return { q: `¿Cuál es el mecanismo de acción de ${d.nombre}?`, correct: d.mecanismoAccion, field: 'mecanismoAccion' };
  },
  adverse: (d) => {
    if (!d.efectosAdversos.length) return null;
    return { q: `¿Cuál es un efecto adverso de ${d.nombre}?`, correct: d.efectosAdversos[0], field: 'efectosAdversos' };
  },
  nursing: (d) => {
    if (!d.cuidadosEnfermeria.length) return null;
    return { q: `¿Cuál es un cuidado de enfermería para ${d.nombre}?`, correct: d.cuidadosEnfermeria[0], field: 'cuidadosEnfermeria' };
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateDistractors(correct: string, allValues: string[], count: number = 3): string[] {
  const pool = allValues.filter(v => v !== correct);
  return shuffle(pool).slice(0, count);
}

function collectFieldValues(drugs: Drug[], field: keyof Drug): string[] {
  const values = new Set<string>();
  for (const d of drugs) {
    const val = d[field];
    if (Array.isArray(val)) {
      (val as string[]).forEach(v => values.add(v));
    } else if (typeof val === 'string' && val) {
      values.add(val);
    }
  }
  return [...values];
}

export function useQuiz(drugs: Drug[]) {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(RESULTS_KEY).then(raw => {
      if (raw) {
        try { setResults(JSON.parse(raw)); } catch (e) { console.warn('Failed to parse quiz results:', e); }
      }
    }).catch(e => console.warn('Failed to load quiz results:', e));
  }, []);

  const fieldValuesCache = useMemo(() => {
    const fields: (keyof Drug)[] = ['indicaciones', 'contraindicaciones', 'viaAdministracion', 'embarazo', 'familia', 'mecanismoAccion', 'efectosAdversos', 'cuidadosEnfermeria'];
    const cache: Partial<Record<keyof Drug, string[]>> = {};
    for (const f of fields) {
      cache[f] = collectFieldValues(drugs, f);
    }
    return cache;
  }, [drugs]);

  const generateQuestions = useCallback((count: number, category?: string): QuizQuestion[] => {
    const filteredDrugs = category
      ? drugs.filter(d => d.unidadId === category)
      : drugs;

    if (filteredDrugs.length < 4) return [];

    const types: QuestionType[] = ['indication', 'contraindication', 'route', 'pregnancy', 'family', 'mechanism', 'adverse', 'nursing'];
    const questions: QuizQuestion[] = [];
    const usedDrugIds = new Set<string>();
    const maxAttempts = count * 10;
    let attempts = 0;

    while (questions.length < count && attempts < maxAttempts) {
      attempts++;
      const drug = filteredDrugs[Math.floor(Math.random() * filteredDrugs.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      if (usedDrugIds.has(`${drug.id}-${type}`)) continue;

      const template = QUESTION_TEMPLATES[type];
      const result = template(drug);
      if (!result) continue;

      const fieldKey = result.field;
      const allValues = fieldValuesCache[fieldKey] || [];
      if (allValues.length < 4) continue;

      const distractors = generateDistractors(result.correct, allValues);
      if (distractors.length < 3) continue;

      const options = shuffle([result.correct, ...distractors]);
      const correctIndex = options.indexOf(result.correct);

      questions.push({
        id: `${drug.id}-${type}-${Date.now()}-${questions.length}`,
        type,
        questionText: result.q,
        options,
        correctIndex,
        drugName: drug.nombre,
      });

      usedDrugIds.add(`${drug.id}-${type}`);
    }

    return questions;
  }, [drugs, fieldValuesCache]);

  const saveResult = useCallback((result: QuizResult) => {
    const updated = [result, ...results].slice(0, 50);
    setResults(updated);
    AsyncStorage.setItem(RESULTS_KEY, JSON.stringify(updated));
  }, [results]);

  const clearResults = useCallback(() => {
    setResults([]);
    AsyncStorage.setItem(RESULTS_KEY, JSON.stringify([]));
  }, []);

  const averageScore = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length);
  }, [results]);

  return { generateQuestions, saveResult, clearResults, results, averageScore };
}
