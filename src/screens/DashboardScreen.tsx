import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrugData } from '../hooks/useDrugData';
import { useQuiz } from '../hooks/useQuiz';
import { useRecentDrugs } from '../hooks/useRecentDrugs';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn } from '../utils/animations';
import { PremiumGate } from '../components/PremiumGate';

function ProgressBar({ label, value, max, color, colors }: { label: string; value: number; max: number; color: string; colors: ThemeColors }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 13, color: colors.text, fontWeight: '600' }}>{label}</Text>
        <Text style={{ fontSize: 13, color, fontWeight: '700' }}>{Math.round(pct)}%</Text>
      </View>
      <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4 }}>
        <View style={{ width: `${pct}%` as any, height: 8, backgroundColor: color, borderRadius: 4 }} />
      </View>
    </View>
  );
}

function StatCard({ icon, value, label, color, colors }: { icon: string; value: string | number; label: string; color: string; colors: ThemeColors }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: color + '10', borderRadius: 14, padding: 14 }}>
      <Text style={{ fontSize: 24 }}>{icon}</Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color, marginTop: 4 }}>{value}</Text>
      <Text style={{ fontSize: 10, color: colors.textSecondary, marginTop: 2, textAlign: 'center' }}>{label}</Text>
    </View>
  );
}

export function DashboardScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn();
  const { drugs } = useDrugData();
  const { results: quizResults, averageScore } = useQuiz(drugs);
  const { recentDrugs } = useRecentDrugs();
  const { favoriteCount } = useFavoritesContext();
  const { noteCount } = useNotesContext();

  const totalQuestions = quizResults.reduce((s, r) => s + r.totalQuestions, 0);
  const totalCorrect = quizResults.reduce((s, r) => s + r.correctAnswers, 0);

  // Study streak: count consecutive days with quiz activity
  const streak = useMemo(() => {
    if (quizResults.length === 0) return 0;
    const days = new Set(quizResults.map(r =>
      new Date(r.completedAt).toISOString().slice(0, 10),
    ));
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (days.has(d.toISOString().slice(0, 10))) count++;
      else if (i > 0) break;
    }
    return count;
  }, [quizResults]);

  // Progress by category
  const categoryProgress = useMemo(() => {
    const catMap: Record<string, { total: number; correct: number }> = {};
    quizResults.forEach(r => {
      const cat = r.category || 'general';
      if (!catMap[cat]) catMap[cat] = { total: 0, correct: 0 };
      catMap[cat].total += r.totalQuestions;
      catMap[cat].correct += r.correctAnswers;
    });
    return Object.entries(catMap)
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 8);
  }, [quizResults]);

  // Recent quiz sessions
  const recentQuizzes = useMemo(() =>
    [...quizResults].sort((a, b) => b.completedAt - a.completedAt).slice(0, 10),
  [quizResults]);

  const catColors = ['#3B82F6', '#DC2626', '#16A34A', '#F59E0B', '#8B5CF6', '#EC4899', '#0EA5E9', '#EA580C'];

  return (
    <PremiumGate feature="Dashboard de Progreso">
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={colors.quiz} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Dashboard de Estudio</Text>
        <Text style={styles.headerSubtitle}>Tu progreso de aprendizaje</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <StatCard icon="📝" value={quizResults.length} label="Sesiones" color={colors.quiz} colors={colors} />
          <StatCard icon="📊" value={`${averageScore}%`} label="Promedio" color={averageScore >= 70 ? colors.success : colors.warning} colors={colors} />
          <StatCard icon="✅" value={totalCorrect} label="Correctas" color={colors.success} colors={colors} />
          <StatCard icon="🔥" value={streak} label="Racha días" color="#EA580C" colors={colors} />
        </View>

        {/* Usage Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Uso General</Text>
          <View style={styles.usageGrid}>
            <View style={[styles.usageItem, { backgroundColor: colors.surface }]}>
              <Text style={styles.usageIcon}>👁️</Text>
              <Text style={[styles.usageValue, { color: colors.primary }]}>{recentDrugs.length}</Text>
              <Text style={styles.usageLabel}>Fármacos vistos</Text>
            </View>
            <View style={[styles.usageItem, { backgroundColor: colors.surface }]}>
              <Text style={styles.usageIcon}>📝</Text>
              <Text style={[styles.usageValue, { color: colors.info }]}>{noteCount}</Text>
              <Text style={styles.usageLabel}>Notas escritas</Text>
            </View>
            <View style={[styles.usageItem, { backgroundColor: colors.surface }]}>
              <Text style={styles.usageIcon}>❤️</Text>
              <Text style={[styles.usageValue, { color: colors.error }]}>{favoriteCount}</Text>
              <Text style={styles.usageLabel}>Favoritos</Text>
            </View>
            <View style={[styles.usageItem, { backgroundColor: colors.surface }]}>
              <Text style={styles.usageIcon}>❓</Text>
              <Text style={[styles.usageValue, { color: colors.quiz }]}>{totalQuestions}</Text>
              <Text style={styles.usageLabel}>Preguntas</Text>
            </View>
          </View>
        </View>

        {/* Progress by Category */}
        {categoryProgress.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Progreso por Categoría</Text>
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              {categoryProgress.map(([cat, data], i) => (
                <ProgressBar
                  key={cat}
                  label={cat === 'general' ? 'General' : cat}
                  value={data.correct}
                  max={data.total}
                  color={catColors[i % catColors.length]}
                  colors={colors}
                />
              ))}
            </View>
          </View>
        )}

        {/* Recent Sessions */}
        {recentQuizzes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🕐 Últimas Sesiones</Text>
            {recentQuizzes.map(quiz => {
              const scoreColor = quiz.percentage >= 80 ? colors.success : quiz.percentage >= 50 ? colors.warning : colors.error;
              return (
                <View key={quiz.id} style={[styles.quizRow, { backgroundColor: colors.surface }]}>
                  <View style={[styles.scoreBadge, { backgroundColor: scoreColor + '15' }]}>
                    <Text style={[styles.scoreText, { color: scoreColor }]}>{quiz.percentage}%</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.quizRowTitle, { color: colors.text }]}>
                      {quiz.correctAnswers}/{quiz.totalQuestions} correctas
                    </Text>
                    <Text style={{ fontSize: 11, color: colors.textLight }}>
                      {new Date(quiz.completedAt).toLocaleDateString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      {quiz.category ? ` · ${quiz.category}` : ''}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {quizResults.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>Aún no hay datos de estudio</Text>
            <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>Completa algunos tests para ver tu progreso aquí</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
    </PremiumGate>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.quiz, paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  scroll: { flex: 1 },
  statsGrid: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginHorizontal: 20, marginBottom: 10 },
  card: { marginHorizontal: 16, padding: 16, borderRadius: 14, elevation: 2, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  usageGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  usageItem: { width: '47%' as any, borderRadius: 14, padding: 14, alignItems: 'center', elevation: 1, marginHorizontal: '1.5%' as any },
  usageIcon: { fontSize: 24 },
  usageValue: { fontSize: 22, fontWeight: '800', marginTop: 4 },
  usageLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  quizRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 6, padding: 12, borderRadius: 12, elevation: 1 },
  scoreBadge: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: 14, fontWeight: '800' },
  quizRowTitle: { fontSize: 14, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptyHint: { fontSize: 13, marginTop: 4, textAlign: 'center', paddingHorizontal: 40 },
});
