import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { DrugCard } from '../components/DrugCard';
import { useDrugData } from '../hooks/useDrugData';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';
import { useFadeIn } from '../utils/animations';

type Props = NativeStackScreenProps<RootStackParamList, 'AllFavorites'>;

export function AllFavoritesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { favorites } = useFavoritesContext();
  const { getDrugById } = useDrugData();
  const fadeIn = useFadeIn();

  const favDrugs = useMemo(() =>
    favorites.map(id => getDrugById(id)).filter(Boolean),
    [favorites, getDrugById]
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <FlatList
        data={favDrugs}
        keyExtractor={item => item!.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.count}>{favDrugs.length} favorito{favDrugs.length !== 1 ? 's' : ''}</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="heart" size={48} color={colors.error} style={{ marginBottom: 12 }} />
            <Text style={styles.emptyText}>No tienes favoritos aún</Text>
            <Text style={styles.emptySubtext}>Marca fármacos como favoritos desde su detalle</Text>
          </View>
        }
        renderItem={({ item }) => (
          <DrugCard
            drug={item!}
            onPress={() => navigation.navigate('DrugDetail', { drugId: item!.id })}
          />
        )}
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  list: { paddingBottom: 32 },
  count: { fontSize: 13, color: colors.textSecondary, marginHorizontal: 20, marginVertical: 8 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptySubtext: { fontSize: 13, color: colors.textLight, marginTop: 4 },
});