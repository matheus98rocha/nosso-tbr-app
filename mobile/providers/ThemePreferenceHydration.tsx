import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';

import { THEME_STORAGE_KEY } from '@/constants/themeStorage';

export default function ThemePreferenceHydration() {
  const didStartHydration = useRef(false);

  useEffect(() => {
    if (didStartHydration.current) return;
    didStartHydration.current = true;

    void (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          colorScheme.set(stored);
        }
      } catch {
        return;
      }
    })();
  }, []);

  return null;
}
