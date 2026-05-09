import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';

import ThemeFlashOverlay from '@/components/ThemeFlashOverlay';
import ThemeToggle from '@/components/ThemeToggle';
import { useColorScheme } from '@/components/useColorScheme';

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    [colorScheme],
  );

  return (
    <View className="flex-1">
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </ThemeProvider>
      <ThemeFlashOverlay />
      <ThemeToggle />
    </View>
  );
}
