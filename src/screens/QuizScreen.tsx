import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useDrugData } from '../hooks/useDrugData';
import { useQuiz } from '../hooks/useQuiz';
import { useFadeIn } from '../utils/animations';
import type { ThemeColors } from '../utils/colors';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { PremiumGate } from '../components/PremiumGate';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizScreen'>;

const QUESTION_COUNTS = [5, 10, 15, 20];

export function QuizScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { drugs, categories } = useDrugData();
  const { results, averageScore } = useQuiz(drugs);
  const fadeIn = useFadeIn();
  const [selectedCount, setSelectedCount] = useState(10);

  const unitOptions = [
    { id: undefined, label: 'Todas las categorías', iconName: 'bookshelf' },
    ...categories.unidades.map(u => ({ id: u.id, label: u.nombre, iconName: u.icon === 'brain' ? 'brain' : 'clipboard-list-outline' })),
  ];

  return (
    <PremiumGate feature="Test Farmacológico">
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.quiz} barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { backgroundColor: colors.quiz }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="brain" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Test Farmacológico</Text>
        </View>
        <Text style={styles.headerSubtitle}>Pon a prueba tus conocimientos</Text>
      </View>

      <Animated.ScrollView style={[styles.scroll, { opacity: fadeIn }]} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        {results.length > 0 && (
          <View style={styles.statsCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialCommunityIcons name="chart-bar" size={18} color={colors.text} style={{ marginRight: 6 }} />
              <Text style={[styles.statsTitle, { marginBottom: 0 }]}>Tu Progreso</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{results.length}</Text>
                <Text style={styles.statLabel}>Sesiones</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: averageScore >= 70 ? colors.quizCorrect : colors.quizWrong }]}>
                  {averageScore}%
                </Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {results.reduce((s, r) => s + r.totalQuestions, 0)}
                </Text>
                <Text style={styles.statLabel}>Preguntas</Text>
              </View>
            </View>
          </View>
        )}

        {/* Question Count Selector */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          <MaterialCommunityIcons name="lightning-bolt" size={20} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Preguntas</Text>
        </View>
        <View style={styles.quickGrid}>
          {QUESTION_COUNTS.map(count => (
            <TouchableOpacity
              key={count}
              style={[styles.quickCard, selectedCount === count && { backgroundColor: colors.quiz, borderColor: colors.quiz }]}
              onPress={() => setSelectedCount(count)}
              activeOpacity={0.7}
            >
              <Text style={[styles.quickNumber, selectedCount === count && { color: '#FFFFFF' }]}>{count}</Text>
              <Text style={[styles.quickLabel, selectedCount === count && { color: 'rgba(255,255,255,0.8)' }]} numberOfLines={1} adjustsFontSizeToFit>preguntas</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Start with selected count */}
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.quiz }]}
          onPress={() => navigation.navigate('QuizSession', { questionCount: selectedCount })}
          activeOpacity={0.7}
        >
          <Text style={styles.startButtonText}>Iniciar test — {selectedCount} preguntas</Text>
        </TouchableOpacity>

        {/* By Category — uses selected count */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
          <MaterialCommunityIcons name="folder-outline" size={20} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Por Categoría</Text>
        </View>
        <View style={styles.categoryList}>
          {unitOptions.map((unit, i) => (
            <TouchableOpacity
              key={i}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('QuizSession', { category: unit.id, questionCount: selectedCount })}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name={unit.iconName} size={24} color={colors.quiz} style={{ marginRight: 12 }} />
              <Text style={styles.categoryLabel} numberOfLines={1}>{unit.label}</Text>
              <Text style={styles.categoryCount}>{selectedCount}</Text>
              <Text style={styles.categoryArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Results */}
        {results.length > 0 && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={colors.text} style={{ marginRight: 6 }} />
              <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Resultados Recientes</Text>
            </View>
            {results.slice(0, 5).map((r, i) => (
              <View key={i} style={styles.resultCard}>
                <View style={[styles.resultBadge, {
                  backgroundColor: r.percentage >= 70 ? colors.quizCorrect + '20' : colors.quizWrong + '20',
                }]}>
                  <Text style={[styles.resultPercent, {
                    color: r.percentage >= 70 ? colors.quizCorrect : colors.quizWrong,
                  }]}>
                    {r.percentage}%
                  </Text>
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultScore}>{r.correctAnswers}/{r.totalQuestions} correctas</Text>
                  <Text style={styles.resultDate}>
                    {new Date(r.completedAt).toLocaleDateString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </View>
    </PremiumGate>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  header: {
    paddingTop: rs.space(16), paddingBottom: rs.space(20), paddingHorizontal: rs.space(20),
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: rs.font(24), fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: rs.font(14), color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  scroll: { flex: 1 },
  statsCard: {
    ...neuCard(colors), marginHorizontal: rs.space(16), marginTop: rs.space(16), padding: rs.space(16),
  },
  statsTitle: { fontSize: rs.font(16), fontWeight: '700', color: colors.text, marginBottom: rs.space(12) },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: rs.font(24), fontWeight: '800', color: colors.quiz },
  statLabel: { fontSize: rs.font(11), color: colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: colors.border },
  sectionTitle: { fontSize: rs.font(18), fontWeight: '700', color: colors.text, marginHorizontal: rs.space(20), marginTop: rs.space(20), marginBottom: rs.space(10) },
  quickGrid: { flexDirection: 'row', paddingHorizontal: rs.space(16), gap: rs.space(10) },
  quickCard: {
    flex: 1, backgroundColor: colors.quiz + '15', borderRadius: 14, paddingVertical: rs.space(14), paddingHorizontal: rs.space(8),
    alignItems: 'center', borderWidth: 1, borderColor: colors.quiz + '30',
  },
  quickNumber: { fontSize: rs.font(28), fontWeight: '800', color: colors.quiz },
  quickLabel: { fontSize: rs.font(12), color: colors.quiz, fontWeight: '600', marginTop: 2 },
  categoryList: { paddingHorizontal: rs.space(16), gap: rs.space(6) },
  categoryCard: {
    ...neuCardSubtle(colors), flexDirection: 'row', alignItems: 'center', padding: rs.space(14),
  },
  categoryIcon: { fontSize: rs.font(24), marginRight: rs.space(12) },
  categoryLabel: { flex: 1, fontSize: rs.font(15), fontWeight: '600', color: colors.text },
  categoryCount: { fontSize: rs.font(12), fontWeight: '700', color: colors.quiz, marginRight: 4, backgroundColor: colors.quiz + '15', paddingHorizontal: rs.space(8), paddingVertical: 2, borderRadius: 8 },
  categoryArrow: { fontSize: rs.font(20), color: colors.textLight },
  startButton: { marginHorizontal: rs.space(16), marginTop: rs.space(12), paddingVertical: rs.space(16), borderRadius: 14, alignItems: 'center' },
  startButtonText: { fontSize: rs.font(16), fontWeight: '700', color: '#FFFFFF' },
  resultCard: {
    ...neuCardSubtle(colors), flexDirection: 'row', alignItems: 'center', marginHorizontal: rs.space(16), marginBottom: rs.space(6), padding: rs.space(12),
  },
  resultBadge: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  resultPercent: { fontSize: rs.font(16), fontWeight: '800' },
  resultInfo: { flex: 1, marginLeft: rs.space(12) },
  resultScore: { fontSize: rs.font(15), fontWeight: '600', color: colors.text },
  resultDate: { fontSize: rs.font(12), color: colors.textSecondary, marginTop: 2 },
});
