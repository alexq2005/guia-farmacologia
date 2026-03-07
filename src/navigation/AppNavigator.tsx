import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import type { RootStackParamList, TabParamList } from '../types';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { neuElevated } from '../utils/neumorphism';
// Icon names inlined to avoid circular/module issues
const TAB_ICONS = {
  home: { active: 'home', inactive: 'home-outline' },
  categories: { active: 'bookshelf', inactive: 'book-open-page-variant-outline' },
  search: { active: 'magnify', inactive: 'magnify' },
  special: { active: 'alert-decagram', inactive: 'alert-decagram-outline' },
  tools: { active: 'wrench', inactive: 'wrench-outline' },
};

// Screens
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SpecialScreen } from '../screens/SpecialScreen';
import { ToolsScreen } from '../screens/ToolsScreen';
import { DrugDetailScreen } from '../screens/DrugDetailScreen';
import { ChapterDrugsScreen } from '../screens/ChapterDrugsScreen';
import { FormulaDetailScreen } from '../screens/FormulaDetailScreen';
import { RouteDetailScreen } from '../screens/RouteDetailScreen';
import { GlossaryScreen } from '../screens/GlossaryScreen';
import { NursingCareScreen } from '../screens/NursingCareScreen';
import { PathologiesScreen } from '../screens/PathologiesScreen';
import { PathologyDetailScreen } from '../screens/PathologyDetailScreen';
import { InteractionCheckerScreen } from '../screens/InteractionCheckerScreen';
import { CalculatorsScreen } from '../screens/CalculatorsScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { QuizSessionScreen } from '../screens/QuizSessionScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ClinicalScalesScreen } from '../screens/ClinicalScalesScreen';
import { ScaleDetailScreen } from '../screens/ScaleDetailScreen';
import { LabValuesScreen } from '../screens/LabValuesScreen';
import { EmergencyProtocolsScreen } from '../screens/EmergencyProtocolsScreen';
import { ProtocolDetailScreen } from '../screens/ProtocolDetailScreen';
import { ParenteralGuideScreen } from '../screens/ParenteralGuideScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DrugComparisonScreen } from '../screens/DrugComparisonScreen';
import { AllNotesScreen } from '../screens/AllNotesScreen';
import { AllFavoritesScreen } from '../screens/AllFavoritesScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { TermsScreen } from '../screens/TermsScreen';
import { PremiumScreen } from '../screens/PremiumScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ iconActive, iconInactive, label, focused, colors }: {
  iconActive: string; iconInactive: string; label: string; focused: boolean; colors: ThemeColors;
}) {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.9)).current;
  const bgAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        speed: 18,
        bounciness: focused ? 8 : 0,
      }),
      Animated.timing(bgAnim, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [focused, scaleAnim, bgAnim]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.primary + '15'],
  });

  return (
    <Animated.View style={[tabStyles.tabIconContainer, { transform: [{ scale: scaleAnim }] }]}>
      <Animated.View style={[tabStyles.tabIconBg, { backgroundColor: bgColor }]}>
        <MaterialCommunityIcons
          name={focused ? iconActive : iconInactive}
          size={focused ? 26 : 23}
          color={focused ? colors.primary : colors.tabBarInactive}
        />
      </Animated.View>
      <Text style={[
        tabStyles.tabLabel,
        { color: focused ? colors.primary : colors.tabBarInactive },
        focused && tabStyles.tabLabelFocused,
      ]} numberOfLines={1}>{label}</Text>
    </Animated.View>
  );
}

function MainTabs() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          ...neuElevated(colors),
          borderTopWidth: 0,
          marginHorizontal: 12,
          marginBottom: Math.max(insets.bottom, 8),
          height: 68,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconActive={TAB_ICONS.home.active} iconInactive={TAB_ICONS.home.inactive}
              label="Inicio" focused={focused} colors={colors} />
          ),
          tabBarAccessibilityLabel: 'Inicio',
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconActive={TAB_ICONS.categories.active} iconInactive={TAB_ICONS.categories.inactive}
              label="Categorías" focused={focused} colors={colors} />
          ),
          tabBarAccessibilityLabel: 'Categorías',
        }}
      />
      <Tab.Screen
        name="Busqueda"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconActive={TAB_ICONS.search.active} iconInactive={TAB_ICONS.search.inactive}
              label="Buscar" focused={focused} colors={colors} />
          ),
          tabBarAccessibilityLabel: 'Buscar fármacos',
        }}
      />
      <Tab.Screen
        name="Especial"
        component={SpecialScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconActive={TAB_ICONS.special.active} iconInactive={TAB_ICONS.special.inactive}
              label="Especial" focused={focused} colors={colors} />
          ),
          tabBarAccessibilityLabel: 'Medicamentos especiales',
        }}
      />
      <Tab.Screen
        name="Herramientas"
        component={ToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconActive={TAB_ICONS.tools.active} iconInactive={TAB_ICONS.tools.inactive}
              label="Herramientas" focused={focused} colors={colors} />
          ),
          tabBarAccessibilityLabel: 'Herramientas clínicas',
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { colors } = useTheme();
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('@guia_farmaco_onboarding')
      .then(value => setHasOnboarded(value === 'true'))
      .catch(() => setHasOnboarded(true));
  }, []);

  // While loading, return null so the native splash screen stays visible
  if (hasOnboarded === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          animation: 'slide_from_right',
          animationDuration: 250,
          headerBackground: () => (
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          ),
        }}
        initialRouteName={hasOnboarded ? 'MainTabs' : 'Onboarding'}
      >
        {!hasOnboarded && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false, animation: 'fade' }}
          />
        )}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrugDetail"
          component={DrugDetailScreen}
          options={({ route }) => ({ title: (route.params as { drugId: string; drugName?: string }).drugName || 'Fármaco' })}
        />
        <Stack.Screen
          name="ChapterDrugs"
          component={ChapterDrugsScreen}
          options={{ title: 'Fármacos' }}
        />
        <Stack.Screen
          name="FormulaDetail"
          component={FormulaDetailScreen}
          options={{ title: 'Fórmula' }}
        />
        <Stack.Screen
          name="RouteDetail"
          component={RouteDetailScreen}
          options={{ title: 'Vía de Administración' }}
        />
        <Stack.Screen
          name="GlossaryScreen"
          component={GlossaryScreen}
          options={{ title: 'Glosario' }}
        />
        <Stack.Screen
          name="NursingCare"
          component={NursingCareScreen}
          options={{ title: 'Cuidados de Enfermería' }}
        />
        <Stack.Screen
          name="PathologiesScreen"
          component={PathologiesScreen}
          options={{ title: 'Patologías' }}
        />
        <Stack.Screen
          name="PathologyDetail"
          component={PathologyDetailScreen}
          options={{ title: 'Detalle de Patología' }}
        />
        <Stack.Screen
          name="InteractionChecker"
          component={InteractionCheckerScreen}
          options={{ title: 'Interacciones' }}
        />
        <Stack.Screen
          name="Calculators"
          component={CalculatorsScreen}
          options={{ title: 'Calculadoras' }}
        />
        <Stack.Screen
          name="ClinicalScales"
          component={ClinicalScalesScreen}
          options={{ title: 'Escalas Clínicas' }}
        />
        <Stack.Screen
          name="ScaleDetail"
          component={ScaleDetailScreen}
          options={{ title: 'Escala' }}
        />
        <Stack.Screen
          name="LabValues"
          component={LabValuesScreen}
          options={{ title: 'Valores de Laboratorio' }}
        />
        <Stack.Screen
          name="EmergencyProtocols"
          component={EmergencyProtocolsScreen}
          options={{ title: 'Protocolos de Emergencia' }}
        />
        <Stack.Screen
          name="ProtocolDetail"
          component={ProtocolDetailScreen}
          options={{ title: 'Protocolo' }}
        />
        <Stack.Screen
          name="ParenteralGuide"
          component={ParenteralGuideScreen}
          options={{ title: 'Guía Parenteral' }}
        />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          options={{ title: 'Test Farmacológico' }}
        />
        <Stack.Screen
          name="QuizSession"
          component={QuizSessionScreen}
          options={{ title: 'Test' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Mi Progreso' }}
        />
        <Stack.Screen
          name="DrugComparison"
          component={DrugComparisonScreen}
          options={{ title: 'Comparador de Fármacos' }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{ title: 'Acerca de' }}
        />
        <Stack.Screen
          name="AllNotes"
          component={AllNotesScreen}
          options={{ title: 'Mis Notas' }}
        />
        <Stack.Screen
          name="AllFavorites"
          component={AllFavoritesScreen}
          options={{ title: 'Mis Favoritos' }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ title: 'Política de Privacidad' }}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{ title: 'Términos y Condiciones' }}
        />
        <Stack.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{ title: 'Premium' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 56,
  },
  tabIconBg: {
    width: 44,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
});
