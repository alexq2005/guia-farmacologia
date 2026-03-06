import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, StatusBar, Animated } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { useNotesContext } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { UNIT_COLORS } from '../utils/colors';
import { useFadeIn } from '../utils/animations';

type Props = NativeStackScreenProps<RootStackParamList, 'AllNotes'>;

export function AllNotesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { notes, deleteNote } = useNotesContext();
  const { getDrugById } = useDrugData();
  const fadeIn = useFadeIn();

  const sortedNotes = useMemo(() =>
    [...notes].sort((a, b) => b.updatedAt - a.updatedAt),
    [notes]
  );

  const handleDelete = (drugId: string, drugName: string) => {
    Alert.alert('Eliminar nota', `¿Eliminar la nota de "${drugName}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteNote(drugId) },
    ]);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <FlatList
        data={sortedNotes}
        keyExtractor={item => item.drugId}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>📝</Text>
            <Text style={styles.emptyText}>No tienes notas aún</Text>
            <Text style={styles.emptySubtext}>Escribe notas en el detalle de cualquier fármaco</Text>
          </View>
        }
        renderItem={({ item }) => {
          const drug = getDrugById(item.drugId);
          const unitColor = drug ? (UNIT_COLORS[drug.unidadId] || colors.primary) : colors.primary;
          return (
            <TouchableOpacity
              style={[styles.noteCard, { borderLeftColor: unitColor }]}
              onPress={() => navigation.navigate('DrugDetail', { drugId: item.drugId })}
              activeOpacity={0.7}
            >
              <View style={styles.noteHeader}>
                <Text style={styles.noteDrug} numberOfLines={1}>{drug?.nombre || item.drugId}</Text>
                <TouchableOpacity
                  onPress={() => handleDelete(item.drugId, drug?.nombre || item.drugId)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.deleteBtn}>🗑️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.noteText} numberOfLines={3}>{item.text}</Text>
              <Text style={styles.noteDate}>
                {new Date(item.updatedAt).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 32 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.text },
  emptySubtext: { fontSize: 13, color: colors.textLight, marginTop: 4 },
  noteCard: {
    backgroundColor: colors.surface, borderRadius: 14, padding: 14, marginBottom: 10,
    borderLeftWidth: 4, elevation: 2,
    shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2,
  },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  noteDrug: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1, marginRight: 8 },
  deleteBtn: { fontSize: 16 },
  noteText: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  noteDate: { fontSize: 11, color: colors.textLight, marginTop: 6 },
});