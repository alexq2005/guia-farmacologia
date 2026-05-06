import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootStackParamList, TabParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useTabBar } from '../context/TabBarContext';
import { useResponsiveScale } from '../utils/responsive';

// ─── Tab Icons ─────────────────────────────────────────────────────────────
const TAB_ICONS = {
  home: { active: 'home', inactive: 'home-outline' },
  categories: {
    active: 'bookshelf',
    inactive: 'book-open-page-variant-outline',
  },
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
import { MiSuiteScreen } from '../screens/MiSuiteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ─── Animated Tab Bar ──────────────────────────────────────────────────────
const TAB_CONFIG: {
  name: keyof TabParamList;
  label: string;
  iconKey: keyof typeof TAB_ICONS;
}[] = [
  { name: 'Inicio', label: 'Inicio', iconKey: 'home' },
  { name: 'Categorias', label: 'Categorías', iconKey: 'categories' },
  { name: 'Busqueda', label: 'Buscar', iconKey: 'search' },
  { name: 'Especial', label: 'Especial', iconKey: 'special' },
  { name: 'Herramientas', label: 'Herramientas', iconKey: 'tools' },
];

function AnimatedTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const rs = useResponsiveScale();
  const { translateY, show } = useTabBar();

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, rs.space(4)),
          transform: [{ translateY }],
        },
      ]}
    >
      {TAB_CONFIG.map((tab, index) => {
        const focused = state.index === index;
        const icons = TAB_ICONS[tab.iconKey];
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: state.routes[index].key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) {
                navigation.navigate(tab.name);
              }
              show();
            }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={tab.label}
          >
            <View
              style={[
                styles.tabIconBg,
                focused && { backgroundColor: colors.primary + '12' },
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? icons.active : icons.inactive}
                size={rs.font(22)}
                color={focused ? colors.primary : colors.tabBarInactive}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? colors.primary : colors.tabBarInactive },
                focused && styles.tabLabelFocused,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

// ─── Main Tabs ─────────────────────────────────────────────────────────────
function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Categorias" component={CategoriesScreen} />
      <Tab.Screen name="Busqueda" component={SearchScreen} />
      <Tab.Screen name="Especial" component={SpecialScreen} />
      <Tab.Screen name="Herramientas" component={ToolsScreen} />
    </Tab.Navigator>
  );
}

// ─── App Navigator ─────────────────────────────────────────────────────────
export function AppNavigator() {
  const { colors } = useTheme();
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('@guia_farmaco_onboarding')
      .then(value => setHasOnboarded(value === 'true'))
      .catch(() => setHasOnboarded(true));
  }, []);

  if (hasOnboarded === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
            color: colors.text,
          },
          headerShadowVisible: false,
          animation: 'slide_from_right',
          animationDuration: 200,
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
          options={({ route }) => ({
            title: (route.params as any).drugName || 'Fármaco',
          })}
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
        <Stack.Screen
          name="MiSuite"
          component={MiSuiteScreen}
          options={{ title: 'Mi suite' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabIconBg: {
    width: 44,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
});
