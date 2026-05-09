import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useColorScheme as useSystemColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  const { colorScheme } = useNativeWindColorScheme();
  const systemScheme = useSystemColorScheme();

  if (colorScheme === 'light' || colorScheme === 'dark') {
    return colorScheme;
  }

  return systemScheme === 'dark' ? 'dark' : 'light';
}
