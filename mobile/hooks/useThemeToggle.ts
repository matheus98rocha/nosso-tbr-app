import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useCallback, useMemo } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { THEME_STORAGE_KEY } from '@/constants/themeStorage';

export default function useThemeToggle() {
  const resolved = useColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();

  const isDark = useMemo(() => resolved === 'dark', [resolved]);

  const onToggle = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    setColorScheme(next);
    void AsyncStorage.setItem(THEME_STORAGE_KEY, next);
  }, [isDark, setColorScheme]);

  return useMemo(
    () => ({
      isDark,
      onToggle,
    }),
    [isDark, onToggle],
  );
}
