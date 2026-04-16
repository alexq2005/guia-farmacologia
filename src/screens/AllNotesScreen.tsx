import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useDrugData } from '../hooks/useDrugData';
import { useNotesContext } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';
import { UNIT_COLORS } from '../utils/colors';
import { useFadeIn } from '../utils/animations';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'AllNotes'>;

export function AllNotesScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
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
      <StatusBar backgroundColor={colors.primary} barStyle={isDark ? 'light-content' : 'dark-content'} />
      <FlatList
        data={sortedNotes}
        keyExtractor={item => item.drugId}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="note-text-outline" size={48} color={colors.textLight} style={{ marginBottom: 12 }} />
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
                  <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.textLight} />
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

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neuBackground },
  list: { padding: rs.space(16), paddingBottom: rs.space(32) },
  emptyContainer: { alignItems: 'center', paddingVertical: rs.space(60) },
  emptyText: { fontSize: rs.font(16), fontWeight: '600', color: colors.text },
  emptySubtext: { fontSize: rs.font(13), color: colors.textLight, marginTop: 4 },
  noteCard: {
    ...neuCard(colors), padding: rs.space(14), marginBottom: rs.space(10), borderLeftWidth: 4,
  },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rs.space(6) },
  noteDrug: { fontSize: rs.font(16), fontWeight: '700', color: colors.text, flex: 1, marginRight: rs.space(8) },
  deleteBtn: { fontSize: rs.font(16) },
  noteText: { fontSize: rs.font(14), color: colors.textSecondary, lineHeight: rs.font(20) },
  noteDate: { fontSize: rs.font(11), color: colors.textLight, marginTop: rs.space(6) },
});