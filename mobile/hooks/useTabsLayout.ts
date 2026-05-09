import { useMemo } from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

import type { UseTabsLayoutResult } from './useTabsLayout.types';

export default function useTabsLayout(): UseTabsLayoutResult {
  const colorScheme = useColorScheme();
  const headerShown = useClientOnlyValue(false, true);

  return useMemo(() => {
    const palette = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return {
      linkIconColor: palette.text,
      screenOptions: {
        headerShown,
        tabBarActiveTintColor: palette.tint,
      },
    };
  }, [colorScheme, headerShown]);
}
