import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { Platform, StatusBar as RNStatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useThemeToggle from '@/hooks/useThemeToggle';

import ThemeToggle from './ThemeToggle';

export default function ThemeToggleContainer() {
  const insets = useSafeAreaInsets();
  const { isDark, onToggle } = useThemeToggle();

  const topPadding = useMemo(() => {
    const fallback =
      Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 0 : 0;
    return Math.max(insets.top, fallback) + 8;
  }, [insets.top]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View
        className="absolute right-0 top-0 z-50"
        pointerEvents="box-none"
        style={{ paddingTop: topPadding, paddingRight: 16 }}
      >
        <ThemeToggle isDark={isDark} onPress={onToggle} />
      </View>
    </>
  );
}
