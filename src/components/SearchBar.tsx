import React, { useRef, useCallback, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Buscar fármaco...',
  autoFocus = false,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const inputRef = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    onClear();
    inputRef.current?.focus();
  }, [onClear]);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 6,
  },
  clearText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '600',
  },
});