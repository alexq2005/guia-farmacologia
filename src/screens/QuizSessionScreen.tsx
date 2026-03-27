import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Animated, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, QuizQuestion, QuizResult } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useDrugData } from '../hooks/useDrugData';
import { useQuiz } from '../hooks/useQuiz';
import { useFadeIn } from '../utils/animations';
import type { ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizSession'>;

const TYPE_LABELS: Record<string, string> = {
  indication: 'Indicación',
  contraindication: 'Contraindicación',
  route: 'Vía de administración',
  pregnancy: 'Embarazo',
  family: 'Familia farmacológica',
  mechanism: 'Mecanismo de acción',
  adverse: 'Efecto adverso',
  nursing: 'Cuidado de enfermería',
};

export function QuizSessionScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { drugs } = useDrugData();
  const { generateQuestions, saveResult } = useQuiz(drugs);
  const fadeIn = useFadeIn(300);

  const { category, questionCount } = route.params;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ question: QuizQuestion; selectedAnswer: number; isCorrect: boolean }[]>([]);

  const questionFade = useFadeIn(250);

  useEffect(() => {
    const q = generateQuestions(questionCount, category);
    setQuestions(q);
    if (q.length === 0) {
      navigation.goBack();
    }
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? (currentIndex + 1) / questions.length : 0;

  const handleAnswer = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === currentQuestion?.correctIndex;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    if (currentQuestion) {
      setAnsweredQuestions(prev => [...prev, { question: currentQuestion, selectedAnswer: index, isCorrect }]);
    }
  }, [showResult, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const result: QuizResult = {
        id: Date.now().toString(),
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        percentage: Math.round((correctCount / questions.length) * 100),
        category: category || 'todas',
        completedAt: Date.now(),
      };
      saveResult(result);
      setFinished(true);
    }
  }, [currentIndex, questions, correctCount, category, saveResult]);

  if (questions.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Generando preguntas...</Text>
      </View>
    );
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);

    if (showReview) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={colors.quiz} barStyle="light-content" />
          <View style={styles.reviewHeader}>
            <TouchableOpacity onPress={() => setShowReview(false)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="chevron-left" size={22} color={colors.quiz} />
              <Text style={[styles.reviewHeaderTitle, { color: colors.quiz }]}>Volver a resultados</Text>
            </TouchableOpacity>
            <Text style={styles.reviewHeaderSubtitle}>{correctCount}/{questions.length} correctas · {pct}%</Text>
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {answeredQuestions.map((aq, idx) => (
              <View key={idx} style={[styles.reviewCard, { borderLeftColor: aq.isCorrect ? colors.quizCorrect : colors.quizWrong }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <MaterialCommunityIcons
                    name={aq.isCorrect ? 'check-circle' : 'close-circle'}
                    size={18}
                    color={aq.isCorrect ? colors.quizCorrect : colors.quizWrong}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.reviewQuestionNum}>Pregunta {idx + 1}</Text>
                  <View style={[styles.reviewTypeBadge, { backgroundColor: colors.quiz + '15' }]}>
                    <Text style={[styles.reviewTypeText, { color: colors.quiz }]}>{TYPE_LABELS[aq.question.type] || aq.question.type}</Text>
                  </View>
                </View>
                <Text style={styles.reviewDrugName}>{aq.question.drugName}</Text>
                <Text style={styles.reviewQuestion}>{aq.question.questionText}</Text>
                <View style={{ marginTop: 8, gap: 4 }}>
                  {aq.question.options.map((opt, oi) => {
                    const isSelected = oi === aq.selectedAnswer;
                    const isCorrectOpt = oi === aq.question.correctIndex;
                    let bgColor = 'transparent';
                    let textColor = colors.textSecondary;
                    if (isCorrectOpt) { bgColor = colors.quizCorrect + '12'; textColor = colors.quizCorrect; }
                    else if (isSelected && !aq.isCorrect) { bgColor = colors.quizWrong + '12'; textColor = colors.quizWrong; }
                    return (
                      <View key={oi} style={[styles.reviewOption, { backgroundColor: bgColor }]}>
                        <Text style={[styles.reviewOptionLetter, { color: textColor }]}>{String.fromCharCode(65 + oi)}</Text>
                        <Text style={[styles.reviewOptionText, isCorrectOpt && { color: colors.quizCorrect, fontWeight: '600' }, isSelected && !aq.isCorrect && { color: colors.quizWrong }]}>{opt}</Text>
                        {isCorrectOpt && <MaterialCommunityIcons name="check" size={16} color={colors.quizCorrect} style={{ marginLeft: 4 }} />}
                        {isSelected && !aq.isCorrect && <MaterialCommunityIcons name="close" size={16} color={colors.quizWrong} style={{ marginLeft: 4 }} />}
                      </View>
                    );
                  })}
                </View>
                <View style={[styles.reviewExplanation, { backgroundColor: (aq.isCorrect ? colors.quizCorrect : colors.warning) + '08' }]}>
                  <Text style={styles.reviewExplanationText}>{aq.question.explanation}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.quiz} barStyle="light-content" />
        <Animated.View style={[styles.finishedContainer, { opacity: fadeIn }]}>
          <MaterialCommunityIcons
            name={pct >= 70 ? 'party-popper' : pct >= 50 ? 'arm-flex-outline' : 'bookshelf'}
            size={64}
            color={pct >= 70 ? colors.quizCorrect : pct >= 50 ? colors.warning : colors.quizWrong}
          />
          <Text style={styles.finishedTitle}>
            {pct >= 70 ? '¡Excelente!' : pct >= 50 ? '¡Buen intento!' : '¡Sigue practicando!'}
          </Text>
          <View style={[styles.scoreCircle, {
            borderColor: pct >= 70 ? colors.quizCorrect : pct >= 50 ? colors.warning : colors.quizWrong,
          }]}>
            <Text style={[styles.scorePercent, {
              color: pct >= 70 ? colors.quizCorrect : pct >= 50 ? colors.warning : colors.quizWrong,
            }]}>{pct}%</Text>
          </View>
          <Text style={styles.scoreDetail}>{correctCount} de {questions.length} correctas</Text>

          <View style={styles.finishedActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.quiz }]}
              onPress={() => {
                const q = generateQuestions(questionCount, category);
                setQuestions(q);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setCorrectCount(0);
                setFinished(false);
                setShowReview(false);
                setAnsweredQuestions([]);
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.actionButtonText}>Intentar de nuevo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.quiz }]}
              onPress={() => setShowReview(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="clipboard-text-search-outline" size={18} color={colors.quiz} style={{ marginRight: 6 }} />
                <Text style={[styles.actionButtonText, { color: colors.quiz }]}>Revisar respuestas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}
              onPress={() => navigation.goBack()}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="chevron-left" size={18} color={colors.text} style={{ marginRight: 4 }} />
                <Text style={[styles.actionButtonText, { color: colors.text }]}>Volver al menú</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.quiz} barStyle="light-content" />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: colors.quiz }]} />
        </View>
        <Text style={styles.progressText}>{currentIndex + 1}/{questions.length}</Text>
      </View>

      <ScrollView style={styles.questionContainer} contentContainerStyle={styles.questionContent} showsVerticalScrollIndicator={false}>
      <Animated.View style={{ opacity: fadeIn }}>
        {/* Type Badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{TYPE_LABELS[currentQuestion.type] || currentQuestion.type}</Text>
        </View>

        {/* Question */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="pill" size={14} color={colors.textSecondary} style={{ marginRight: 4 }} />
          <Text style={[styles.drugName, { marginBottom: 0 }]}>{currentQuestion.drugName}</Text>
        </View>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>

        {/* Options */}
        <View style={styles.optionsList}>
          {currentQuestion.options.map((option, i) => {
            let optionStyle = styles.option;
            let textStyle = styles.optionText;

            if (showResult) {
              if (i === currentQuestion.correctIndex) {
                optionStyle = { ...styles.option, ...styles.optionCorrect };
                textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
              } else if (i === selectedAnswer && i !== currentQuestion.correctIndex) {
                optionStyle = { ...styles.option, ...styles.optionWrong };
                textStyle = { ...styles.optionText, ...styles.optionTextWrong };
              }
            } else if (i === selectedAnswer) {
              optionStyle = { ...styles.option, ...styles.optionSelected };
            }

            return (
              <TouchableOpacity
                key={i}
                style={optionStyle}
                onPress={() => handleAnswer(i)}
                activeOpacity={0.7}
                disabled={showResult}
              >
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + i)}</Text>
                <Text style={textStyle} numberOfLines={3}>{option}</Text>
                {showResult && i === currentQuestion.correctIndex && (
                  <MaterialCommunityIcons name="check" size={20} color={colors.quizCorrect} style={{ marginLeft: 8 }} />
                )}
                {showResult && i === selectedAnswer && i !== currentQuestion.correctIndex && (
                  <MaterialCommunityIcons name="close" size={20} color={colors.quizWrong} style={{ marginLeft: 8 }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation on all answers */}
        {showResult && (
          <View style={[
            styles.explanationBox,
            selectedAnswer === currentQuestion.correctIndex
              ? { backgroundColor: colors.quizCorrect + '12', borderLeftColor: colors.quizCorrect }
              : {},
          ]}>
            <View style={styles.explanationHeader}>
              <MaterialCommunityIcons
                name={selectedAnswer === currentQuestion.correctIndex ? 'check-circle-outline' : 'lightbulb-on-outline'}
                size={18}
                color={selectedAnswer === currentQuestion.correctIndex ? colors.quizCorrect : colors.warning}
              />
              <Text style={[
                styles.explanationTitle,
                selectedAnswer === currentQuestion.correctIndex ? { color: colors.quizCorrect } : {},
              ]}>
                {selectedAnswer === currentQuestion.correctIndex ? '¡Correcto!' : 'Explicación'}
              </Text>
            </View>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}

        {/* Score Counter */}
        <View style={styles.scoreCounter}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="check" size={16} color={colors.quizCorrect} style={{ marginRight: 4 }} />
            <Text style={styles.scoreCounterText}>{correctCount} correctas</Text>
          </View>
        </View>

        {/* Next Button */}
        {showResult && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: colors.quiz }]}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nextButtonText}>
                {currentIndex < questions.length - 1 ? 'Siguiente' : 'Ver resultado'}
              </Text>
              {currentIndex < questions.length - 1 && (
                <MaterialCommunityIcons name="chevron-right" size={18} color="#FFFFFF" style={{ marginLeft: 4 }} />
              )}
            </View>
          </TouchableOpacity>
        )}
      </Animated.View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: colors.textSecondary },
  progressContainer: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
  },
  progressBar: {
    flex: 1, height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden', marginRight: 12,
  },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 14, fontWeight: '700', color: colors.textSecondary },
  questionContainer: { flex: 1 },
  questionContent: { paddingHorizontal: 16, paddingBottom: 24 },
  typeBadge: {
    alignSelf: 'flex-start', backgroundColor: colors.quiz + '15', paddingHorizontal: 12,
    paddingVertical: 4, borderRadius: 12, marginBottom: 8,
  },
  typeText: { fontSize: 12, fontWeight: '700', color: colors.quiz },
  drugName: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 4 },
  questionText: { fontSize: 20, fontWeight: '700', color: colors.text, lineHeight: 28, marginBottom: 20 },
  optionsList: { gap: 10 },
  option: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 14,
    padding: 16, elevation: 1, borderWidth: 2, borderColor: colors.border,
  },
  optionSelected: { borderColor: colors.quiz, backgroundColor: colors.quiz + '08' },
  optionCorrect: { borderColor: colors.quizCorrect, backgroundColor: colors.quizCorrect + '10' },
  optionWrong: { borderColor: colors.quizWrong, backgroundColor: colors.quizWrong + '10' },
  optionLetter: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.background,
    textAlign: 'center', lineHeight: 28, fontSize: 14, fontWeight: '700', color: colors.textSecondary, marginRight: 12,
  },
  optionText: { flex: 1, fontSize: 15, color: colors.text, lineHeight: 21 },
  optionTextCorrect: { color: colors.quizCorrect, fontWeight: '600' },
  optionTextWrong: { color: colors.quizWrong },
  checkMark: { fontSize: 20, color: colors.quizCorrect, fontWeight: '800', marginLeft: 8 },
  crossMark: { fontSize: 20, color: colors.quizWrong, fontWeight: '800', marginLeft: 8 },
  explanationBox: {
    marginTop: 16, backgroundColor: colors.warning + '12', borderRadius: 14,
    padding: 14, borderLeftWidth: 4, borderLeftColor: colors.warning,
  },
  explanationHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 6,
  },
  explanationTitle: {
    fontSize: 14, fontWeight: '700', color: colors.warning, marginLeft: 6,
  },
  explanationText: {
    fontSize: 14, color: colors.text, lineHeight: 20,
  },
  scoreCounter: { marginTop: 16, alignItems: 'center' },
  scoreCounterText: { fontSize: 14, color: colors.quizCorrect, fontWeight: '600' },
  nextButton: {
    marginTop: 16, paddingVertical: 16, borderRadius: 14, alignItems: 'center',
  },
  nextButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  // Finished screen
  finishedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  finishedEmoji: { fontSize: 64, marginBottom: 8 },
  finishedTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 20 },
  scoreCircle: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 6, alignItems: 'center',
    justifyContent: 'center', marginBottom: 8,
  },
  scorePercent: { fontSize: 36, fontWeight: '800' },
  scoreDetail: { fontSize: 16, color: colors.textSecondary, marginBottom: 32 },
  finishedActions: { width: '100%', gap: 12 },
  actionButton: { paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  actionButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  // Review screen
  reviewHeader: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  reviewHeaderTitle: { fontSize: 15, fontWeight: '700' },
  reviewHeaderSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  reviewCard: { ...neuCard(colors), padding: 14, marginBottom: 12, borderLeftWidth: 4 },
  reviewQuestionNum: { fontSize: 13, fontWeight: '700', color: colors.text, flex: 1 },
  reviewTypeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  reviewTypeText: { fontSize: 10, fontWeight: '700' },
  reviewDrugName: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic', marginBottom: 2 },
  reviewQuestion: { fontSize: 15, fontWeight: '600', color: colors.text, lineHeight: 21 },
  reviewOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  reviewOptionLetter: { fontSize: 12, fontWeight: '700', width: 20 },
  reviewOptionText: { flex: 1, fontSize: 13, color: colors.text },
  reviewExplanation: { marginTop: 8, padding: 10, borderRadius: 8 },
  reviewExplanationText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});
