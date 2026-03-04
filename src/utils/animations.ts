import { useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

/** Simple fade-in on mount */
export function useFadeIn(duration: number = 400, delay: number = 0) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [opacity, duration, delay]);

  return opacity;
}

/** Staggered entrance for a list of items */
export function useStaggeredEntrance(count: number, staggerDelay: number = 80) {
  const anims = useRef<Animated.Value[]>([]);

  if (anims.current.length !== count) {
    anims.current = Array.from({ length: count }, () => new Animated.Value(0));
  }

  useEffect(() => {
    const animations = anims.current.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 350,
        delay: i * staggerDelay,
        useNativeDriver: true,
      }),
    );
    Animated.stagger(staggerDelay, animations).start();
  }, [count, staggerDelay]);

  return anims.current;
}

/** Press scale animation for cards */
export function useCardPressAnimation() {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scale]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scale]);

  return { scale, onPressIn, onPressOut };
}
