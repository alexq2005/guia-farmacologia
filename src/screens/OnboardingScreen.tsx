import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn } from '../utils/animations';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ONBOARDING_KEY = '@guia_farmaco_onboarding';

interface SlideData {
  icon: string;
  title: string;
  features: { icon: string; text: string }[];
}

const SLIDES: SlideData[] = [
  {
    icon: 'pill',
    title: 'Tu guía farmacológica\nde bolsillo',
    features: [
      { icon: 'book-open-variant', text: 'Referencia rápida para enfermería' },
      { icon: 'lock-outline', text: 'Todo offline, sin conexión necesaria' },
      { icon: 'stethoscope', text: 'Basada en evidencia clínica' },
    ],
  },
  {
    icon: 'database-outline',
    title: 'Base de datos completa',
    features: [
      { icon: 'pill', text: '1781+ fármacos con información detallada' },
      { icon: 'magnify', text: 'Búsqueda inteligente por nombre o familia' },
      { icon: 'alert-outline', text: 'Interacciones y contraindicaciones' },
      { icon: 'clipboard-text-outline', text: 'Cuidados de enfermería específicos' },
    ],
  },
  {
    icon: 'hospital-box-outline',
    title: 'Herramientas clínicas',
    features: [
      { icon: 'alert-octagon', text: '14 protocolos de emergencia con pasos' },
      { icon: 'chart-timeline-variant-shimmer', text: '13 escalas clínicas interactivas' },
      { icon: 'calculator-variant-outline', text: '15 calculadoras farmacológicas' },
      { icon: 'flask-outline', text: '53 valores de laboratorio de referencia' },
    ],
  },
  {
    icon: 'head-question-outline',
    title: 'Aprende y estudia',
    features: [
      { icon: 'check-circle-outline', text: 'Quiz interactivo con 8 tipos de preguntas' },
      { icon: 'note-text-outline', text: 'Notas personales por fármaco' },
      { icon: 'star-outline', text: 'Favoritos y seguimiento de progreso' },
      { icon: 'trending-up', text: 'Dashboard con estadísticas de estudio' },
    ],
  },
  {
    icon: 'rocket-launch-outline',
    title: '¡Todo listo!',
    features: [
      { icon: 'cellphone-check', text: 'Disponible sin conexión a internet' },
      { icon: 'moon-waning-crescent', text: 'Modo oscuro para guardias nocturnas' },
      { icon: 'sync', text: 'Actualizaciones periódicas de contenido' },
    ],
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: NavigationProp;
}

export function OnboardingScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const fadeIn = useFadeIn(500);
  const flatListRef = useRef<FlatList<SlideData>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const completeOnboarding = useCallback(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, 'true').catch(() => {});
    navigation.replace('MainTabs');
  }, [navigation]);

  const goToNext = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      completeOnboarding();
    }
  }, [currentIndex, completeOnboarding]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      setCurrentIndex(index);
    },
    [],
  );

  const renderSlide = useCallback(
    ({ item }: { item: SlideData }) => (
      <View style={styles.slide}>
        <MaterialCommunityIcons name={item.icon} size={64} color="#FFFFFF" style={{ marginBottom: 24 }} />
        <Text style={styles.slideTitle}>{item.title}</Text>
        <View style={styles.featuresContainer}>
          {item.features.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialCommunityIcons name={f.icon} size={20} color="#FFFFFF" style={{ marginRight: 12 }} />
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>
      </View>
    ),
    [styles],
  );

  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Skip button */}
      {!isLastSlide && (
        <TouchableOpacity
          style={[styles.skipButton, { top: insets.top + 12 }]}
          onPress={completeOnboarding}
          accessibilityRole="button"
          accessibilityLabel="Omitir introducción"
        >
          <Text style={styles.skipText}>Omitir</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(_, i) => String(i)}
        bounces={false}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Bottom section: dots + button */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}>
        {/* Pagination dots */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Action button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={goToNext}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={isLastSlide ? 'Comenzar a usar la app' : 'Siguiente slide'}
        >
          <Text style={styles.actionButtonText}>
            {isLastSlide ? 'Comenzar' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    skipButton: {
      position: 'absolute',
      right: 20,
      zIndex: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    skipText: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 15,
      fontWeight: '600',
    },
    slide: {
      width: SCREEN_WIDTH,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    slideIcon: {
      fontSize: 64,
      marginBottom: 24,
    },
    slideTitle: {
      fontSize: 26,
      fontWeight: '800',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 34,
    },
    featuresContainer: {
      width: '100%',
      gap: 16,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    featureIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    featureText: {
      fontSize: 15,
      color: '#FFFFFF',
      fontWeight: '500',
      flex: 1,
    },
    bottomSection: {
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    dotsContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      gap: 8,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    dotActive: {
      backgroundColor: '#FFFFFF',
      width: 28,
    },
    dotInactive: {
      backgroundColor: 'rgba(255,255,255,0.35)',
    },
    actionButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 48,
      width: '100%',
      alignItems: 'center',
    },
    actionButtonText: {
      color: colors.primary,
      fontSize: 17,
      fontWeight: '800',
    },
  });
}
