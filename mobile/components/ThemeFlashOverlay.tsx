import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export default function ThemeFlashOverlay() {
  const isDark = useColorScheme() === 'dark';
  const prevRef = useRef<boolean | null>(null);
  const flash = useSharedValue(0);

  useEffect(() => {
    if (prevRef.current === null) {
      prevRef.current = isDark;
      return;
    }
    if (prevRef.current === isDark) return;
    prevRef.current = isDark;
    flash.value = 0;
    flash.value = withSequence(
      withTiming(1, { duration: 95, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: 340, easing: Easing.inOut(Easing.cubic) }),
    );
  }, [isDark]);

  const veilStyle = useAnimatedStyle(() => ({
    opacity: flash.value * 0.92,
  }));

  const veilColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.14)';

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { backgroundColor: veilColor, zIndex: 40 }, veilStyle]}
    />
  );
}
