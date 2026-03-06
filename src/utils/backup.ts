import { Share, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BackupData {
  version: 1;
  exportedAt: number;
  favorites: string[];
  notes: Array<{ drugId: string; text: string; updatedAt: number }>;
  quizResults: Array<{
    id: string;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    category: string;
    completedAt: number;
  }>;
  searchHistory: Array<{ query: string; timestamp: number }>;
  recentDrugs: string[];
}

const KEYS = {
  favorites: '@guia_farmaco_favorites',
  notes: '@guia_farmaco_notes',
  quizResults: '@guia_farmaco_quiz_results',
  searchHistory: '@guia_farmaco_search_history',
  recentDrugs: '@guia_farmaco_recent_drugs',
};

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

export async function exportUserData(isPremium: boolean = true): Promise<void> {
  if (!isPremium) {
    Alert.alert(
      'Función Premium',
      'La exportación de datos es una función Premium. Actualiza tu plan para acceder.',
      [{ text: 'Entendido' }],
    );
    return;
  }
  const [favRaw, notesRaw, quizRaw, histRaw, recentRaw] = await Promise.all([
    AsyncStorage.getItem(KEYS.favorites).catch(() => null),
    AsyncStorage.getItem(KEYS.notes).catch(() => null),
    AsyncStorage.getItem(KEYS.quizResults).catch(() => null),
    AsyncStorage.getItem(KEYS.searchHistory).catch(() => null),
    AsyncStorage.getItem(KEYS.recentDrugs).catch(() => null),
  ]);

  const data: BackupData = {
    version: 1,
    exportedAt: Date.now(),
    favorites: safeJsonParse(favRaw, []),
    notes: safeJsonParse(notesRaw, []),
    quizResults: safeJsonParse(quizRaw, []),
    searchHistory: safeJsonParse(histRaw, []),
    recentDrugs: safeJsonParse(recentRaw, []),
  };

  const json = JSON.stringify(data, null, 2);
  await Share.share({
    message: json,
    title: `GuiaFarmacologica_backup_${new Date().toISOString().slice(0, 10)}`,
  });
}

export async function importUserData(json: string, isPremium: boolean = true): Promise<{ imported: boolean; message: string }> {
  if (!isPremium) {
    return { imported: false, message: 'La importación de datos es una función Premium. Actualiza tu plan para acceder.' };
  }
  let data: BackupData;
  try {
    data = JSON.parse(json);
  } catch {
    return { imported: false, message: 'JSON inválido. Verifica el formato del backup.' };
  }

  if (!data.version || data.version !== 1) {
    return { imported: false, message: 'Formato de backup no reconocido.' };
  }

  const writes: [string, string][] = [];

  if (Array.isArray(data.favorites) && data.favorites.length > 0) {
    const existing = safeJsonParse<string[]>(await AsyncStorage.getItem(KEYS.favorites).catch(() => null), []);
    const merged = [...new Set([...existing, ...data.favorites])];
    writes.push([KEYS.favorites, JSON.stringify(merged)]);
  }

  if (Array.isArray(data.notes) && data.notes.length > 0) {
    const existing = safeJsonParse<BackupData['notes']>(await AsyncStorage.getItem(KEYS.notes).catch(() => null), []);
    const noteMap = new Map(existing.map(n => [n.drugId, n]));
    data.notes.forEach(n => {
      const prev = noteMap.get(n.drugId);
      if (!prev || n.updatedAt > prev.updatedAt) noteMap.set(n.drugId, n);
    });
    writes.push([KEYS.notes, JSON.stringify([...noteMap.values()])]);
  }

  if (Array.isArray(data.quizResults) && data.quizResults.length > 0) {
    const existing = safeJsonParse<BackupData['quizResults']>(await AsyncStorage.getItem(KEYS.quizResults).catch(() => null), []);
    const ids = new Set(existing.map(r => r.id));
    const merged = [...existing, ...data.quizResults.filter(r => !ids.has(r.id))];
    writes.push([KEYS.quizResults, JSON.stringify(merged)]);
  }

  if (Array.isArray(data.searchHistory) && data.searchHistory.length > 0) {
    const existing = safeJsonParse<BackupData['searchHistory']>(await AsyncStorage.getItem(KEYS.searchHistory).catch(() => null), []);
    const queries = new Set(existing.map(h => h.query));
    const merged = [...existing, ...data.searchHistory.filter(h => !queries.has(h.query))].slice(0, 50);
    writes.push([KEYS.searchHistory, JSON.stringify(merged)]);
  }

  if (Array.isArray(data.recentDrugs) && data.recentDrugs.length > 0) {
    const existing = safeJsonParse<string[]>(await AsyncStorage.getItem(KEYS.recentDrugs).catch(() => null), []);
    const merged = [...new Set([...data.recentDrugs, ...existing])].slice(0, 15);
    writes.push([KEYS.recentDrugs, JSON.stringify(merged)]);
  }

  await AsyncStorage.multiSet(writes).catch(e => console.warn('Import write error:', e));

  const counts = [
    data.favorites?.length && `${data.favorites.length} favoritos`,
    data.notes?.length && `${data.notes.length} notas`,
    data.quizResults?.length && `${data.quizResults.length} resultados`,
    data.searchHistory?.length && `${data.searchHistory.length} búsquedas`,
    data.recentDrugs?.length && `${data.recentDrugs.length} recientes`,
  ].filter(Boolean).join(', ');

  return { imported: true, message: `Importado: ${counts || 'sin datos nuevos'}` };
}
