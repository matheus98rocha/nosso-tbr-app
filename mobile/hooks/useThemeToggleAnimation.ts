import { useCallback, useEffect, useRef } from 'react';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function useThemeToggleAnimation(isDark: boolean) {
  const themeProgress = useSharedValue(isDark ? 1 : 0);
  const pressed = useSharedValue(0);
  const prevDarkRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevDarkRef.current === null) {
      prevDarkRef.current = isDark;
      return;
    }
    if (prevDarkRef.current === isDark) return;
    prevDarkRef.current = isDark;
    themeProgress.value = withTiming(isDark ? 1 : 0, { duration: 360 });
  }, [isDark]);

  const onPressIn = useCallback(() => {
    pressed.value = withSpring(1, { damping: 14, stiffness: 420 });
  }, [pressed]);

  const onPressOut = useCallback(() => {
    pressed.value = withSpring(0, { damping: 16, stiffness: 380 });
  }, [pressed]);

  const shellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.9], Extrapolation.CLAMP) }],
  }));

  const sunStyle = useAnimatedStyle(() => ({
    opacity: interpolate(themeProgress.value, [0, 0.45], [1, 0], Extrapolation.CLAMP),
    transform: [
      {
        rotate: `${interpolate(themeProgress.value, [0, 1], [0, -56], Extrapolation.CLAMP)}deg`,
      },
      {
        scale: interpolate(themeProgress.value, [0, 0.5], [1, 0.4], Extrapolation.CLAMP),
      },
    ],
  }));

  const moonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(themeProgress.value, [0.55, 1], [0, 1], Extrapolation.CLAMP),
    transform: [
      {
        rotate: `${interpolate(themeProgress.value, [0, 1], [56, 0], Extrapolation.CLAMP)}deg`,
      },
      {
        scale: interpolate(themeProgress.value, [0.5, 1], [0.4, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  return {
    moonStyle,
    onPressIn,
    onPressOut,
    shellStyle,
    sunStyle,
  };
}
