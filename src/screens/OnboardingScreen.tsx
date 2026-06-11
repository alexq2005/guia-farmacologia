import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { useFadeIn } from '../utils/animations';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

const ONBOARDING_KEY = '@guia_farmaco_onboarding';

interface SlideData {
  icon: string;
  title: string;
  subtitle: string;
  features: { icon: string; text: string }[];
  image: any;
  gradientColors: [string, string];
}

const SLIDES: SlideData[] = [
  {
    icon: 'pill',
    title: 'Tu guía farmacológica\nde bolsillo',
    subtitle: 'Referencia clínica completa',
    features: [
      { icon: 'book-open-variant', text: 'Referencia rápida para enfermería' },
      { icon: 'lock-outline', text: 'Todo offline, sin conexión necesaria' },
      { icon: 'stethoscope', text: 'Basada en evidencia clínica' },
    ],
    image: require('../assets/images/units/pharmacy.jpg'),
    gradientColors: ['rgba(37,99,235,0.75)', 'rgba(30,64,175,0.95)'],
  },
  {
    icon: 'database-outline',
    title: 'Base de datos\ncompleta',
    subtitle: '2,974 fármacos detallados',
    features: [
      { icon: 'pill', text: '2,974 fármacos con información detallada' },
      { icon: 'magnify', text: 'Búsqueda inteligente por nombre o familia' },
      { icon: 'alert-outline', text: 'Interacciones y contraindicaciones' },
      {
        icon: 'clipboard-text-outline',
        text: 'Cuidados de enfermería específicos',
      },
    ],
    image: require('../assets/images/units/pills.jpg'),
    gradientColors: ['rgba(124,58,237,0.75)', 'rgba(91,33,182,0.95)'],
  },
  {
    icon: 'hospital-box-outline',
    title: 'Herramientas\nclínicas',
    subtitle: 'Todo lo que necesitás en guardia',
    features: [
      { icon: 'alert-octagon', text: '14 protocolos de emergencia con pasos' },
      {
        icon: 'chart-timeline-variant-shimmer',
        text: '13 escalas clínicas interactivas',
      },
      {
        icon: 'calculator-variant-outline',
        text: '15 calculadoras farmacológicas',
      },
      {
        icon: 'flask-outline',
        text: '53 valores de laboratorio de referencia',
      },
    ],
    image: require('../assets/images/units/emergency.jpg'),
    gradientColors: ['rgba(220,38,38,0.7)', 'rgba(153,27,27,0.95)'],
  },
  {
    icon: 'head-question-outline',
    title: 'Aprende\ny estudia',
    subtitle: 'Preparate para los exámenes',
    features: [
      {
        icon: 'check-circle-outline',
        text: 'Test interactivo con 8 tipos de preguntas',
      },
      { icon: 'note-text-outline', text: 'Notas personales por fármaco' },
      { icon: 'star-outline', text: 'Favoritos y seguimiento de progreso' },
      { icon: 'trending-up', text: 'Dashboard con estadísticas de estudio' },
    ],
    image: require('../assets/images/units/brain.jpg'),
    gradientColors: ['rgba(16,185,129,0.7)', 'rgba(5,150,105,0.95)'],
  },
  {
    icon: 'rocket-launch-outline',
    title: '¡Todo listo!',
    subtitle: 'Tu compañera de guardia',
    features: [
      { icon: 'cellphone-check', text: 'Disponible sin conexión a internet' },
      {
        icon: 'moon-waning-crescent',
        text: 'Modo oscuro para guardias nocturnas',
      },
      { icon: 'sync', text: 'Actualizaciones periódicas de contenido' },
    ],
    image: require('../assets/images/units/hospital.jpg'),
    gradientColors: ['rgba(37,99,235,0.7)', 'rgba(30,64,175,0.95)'],
  },
];

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: NavigationProp;
}

export function OnboardingScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const rs = useResponsiveScale();
  const screenWidth = rs.width;
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const fadeIn = useFadeIn(500);
  const flatListRef = useRef<FlatList<SlideData>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const completeOnboarding = useCallback(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, 'true').catch(() => {});
    navigation.replace('MainTabs');
  }, [navigation]);

  const goToNext = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  }, [currentIndex, completeOnboarding]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
      setCurrentIndex(index);
    },
    [screenWidth],
  );

  const renderSlide = useCallback(
    ({ item }: { item: SlideData }) => (
      <ImageBackground
        source={item.image}
        style={[styles.slide, { width: screenWidth }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={item.gradientColors}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.slideContent}>
          <View style={styles.slideIconCircle}>
            <MaterialCommunityIcons
              name={item.icon}
              size={40}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          <View style={styles.featuresContainer}>
            {item.features.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <View style={styles.featureIconBg}>
                  <MaterialCommunityIcons
                    name={f.icon}
                    size={18}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    ),
    [styles, screenWidth],
  );

  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

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
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />

      <View
        style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}
      >
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
        <TouchableOpacity
          style={styles.actionButton}
          onPress={goToNext}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            {isLastSlide ? 'Comenzar' : 'Siguiente'}
          </Text>
          {!isLastSlide && (
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function createStyles(colors: ThemeColors, rs: ResponsiveScale) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    skipButton: {
      position: 'absolute',
      right: rs.space(20),
      zIndex: 10,
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingHorizontal: rs.space(16),
      paddingVertical: rs.space(8),
      borderRadius: 20,
    },
    skipText: { color: '#FFFFFF', fontSize: rs.font(14), fontWeight: '600' },
    slide: { flex: 1, justifyContent: 'flex-end' },
    slideContent: {
      paddingHorizontal: rs.space(28),
      paddingBottom: rs.space(120),
    },
    slideIconCircle: {
      width: rs.space(72),
      height: rs.space(72),
      borderRadius: rs.space(36),
      backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rs.space(20),
    },
    slideTitle: {
      fontSize: rs.font(30),
      fontWeight: '800',
      color: '#FFFFFF',
      lineHeight: rs.font(36),
      marginBottom: rs.space(8),
    },
    slideSubtitle: {
      fontSize: rs.font(15),
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '500',
      marginBottom: rs.space(24),
    },
    featuresContainer: { gap: rs.space(10) },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: 14,
      paddingVertical: rs.space(12),
      paddingHorizontal: rs.space(14),
    },
    featureIconBg: {
      width: rs.space(32),
      height: rs.space(32),
      borderRadius: rs.space(16),
      backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rs.space(12),
    },
    featureText: {
      fontSize: rs.font(14),
      color: '#FFFFFF',
      fontWeight: '500',
      flex: 1,
    },
    bottomSection: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: rs.space(28),
    },
    dotsContainer: {
      flexDirection: 'row',
      marginBottom: rs.space(20),
      gap: rs.space(8),
    },
    dot: { height: rs.space(6), borderRadius: rs.space(3) },
    dotActive: { backgroundColor: '#FFFFFF', width: rs.space(24) },
    dotInactive: {
      backgroundColor: 'rgba(255,255,255,0.35)',
      width: rs.space(6),
    },
    actionButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      paddingVertical: rs.space(16),
      width: '100%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: rs.font(17),
      fontWeight: '700',
    },
  });
}
