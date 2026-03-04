import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList, TabParamList } from '../types';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

// Screens
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ icon, label, focused, colors }: { icon: string; label: string; focused: boolean; colors: ThemeColors }) {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.85)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1 : 0.85,
      useNativeDriver: true,
      speed: 20,
      bounciness: focused ? 12 : 0,
    }).start();
  }, [focused, scaleAnim]);

  return (
    <Animated.View style={[tabStyles.tabIconContainer, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={[tabStyles.tabIcon, focused && tabStyles.tabIconFocused]}>{icon}</Text>
      <Text style={[
        tabStyles.tabLabel,
        { color: focused ? colors.tabBarActive : colors.tabBarInactive },
        focused && tabStyles.tabLabelFocused,
      ]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>{label}</Text>
      {focused && <View style={[tabStyles.activeIndicator, { backgroundColor: colors.tabBarActive }]} />}
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
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 65 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 4,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" label="Inicio" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="📚" label="Categorías" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Busqueda"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🔍" label="Buscar" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Especial"
        component={SpecialScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🚨" label="Especial" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Herramientas"
        component={ToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🔧" label="Herramientas" focused={focused} colors={colors} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrugDetail"
          component={DrugDetailScreen}
          options={{ title: 'Detalle del Fármaco' }}
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
          name="QuizScreen"
          component={QuizScreen}
          options={{ title: 'Modo Estudio' }}
        />
        <Stack.Screen
          name="QuizSession"
          component={QuizSessionScreen}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{ title: 'Acerca de' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const tabStyles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 2,
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
    textAlign: 'center',
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
  activeIndicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginTop: 3,
  },
});
