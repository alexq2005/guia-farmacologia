import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ icon, label, focused, colors }: { icon: string; label: string; focused: boolean; colors: ThemeColors }) {
  return (
    <View style={tabStyles.tabIconContainer}>
      <Text style={[tabStyles.tabIcon, focused && tabStyles.tabIconFocused]}>{icon}</Text>
      <Text style={[
        tabStyles.tabLabel,
        { color: focused ? colors.tabBarActive : colors.tabBarInactive },
        focused && tabStyles.tabLabelFocused,
      ]}>{label}</Text>
    </View>
  );
}

function MainTabs() {
  const { colors } = useTheme();

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
          height: 65,
          paddingBottom: 8,
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
          tabBarIcon: ({ focused }) => <TabIcon icon="🔍" label="Búsqueda" focused={focused} colors={colors} />,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
});