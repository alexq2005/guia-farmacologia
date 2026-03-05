import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  title: string;
  icon?: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  accentColor?: string;
  badge?: string;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  initiallyOpen = false,
  accentColor,
  badge,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const accent = accentColor || colors.primary;
  const rotateAnim = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const next = !isOpen;
    setIsOpen(next);
    Animated.timing(rotateAnim, {
      toValue: next ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, { borderLeftColor: accent }]}
        onPress={toggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View style={styles.titleRow}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: accent + '20' }]}>
              <Text style={[styles.badgeText, { color: accent }]}>{badge}</Text>
            </View>
          ) : null}
        </View>
        <Animated.Text style={[styles.chevron, { transform: [{ rotate: chevronRotate }] }]}>▼</Animated.Text>
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: colors.surface,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderLeftWidth: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  chevron: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});