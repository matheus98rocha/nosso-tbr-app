import { Moon, Sun } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

import useThemeToggleAnimation from '@/hooks/useThemeToggleAnimation';

import type { ThemeToggleProps } from './ThemeToggle.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const lightModeIconColor = '#d97706';
const darkModeIconColor = '#a5b4fc';

export default function ThemeToggle({ isDark, onPress }: ThemeToggleProps) {
  const { moonStyle, onPressIn, onPressOut, shellStyle, sunStyle } =
    useThemeToggleAnimation(isDark);

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      accessibilityState={{ selected: isDark }}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={shellStyle}
      className="h-11 w-11 items-center justify-center rounded-full bg-neutral-200/90 dark:bg-neutral-800/90"
    >
      <View className="relative h-8 w-8 items-center justify-center">
        <Animated.View
          style={[sunStyle, { position: 'absolute' }]}
          className="items-center justify-center"
        >
          <Sun color={lightModeIconColor} size={22} strokeWidth={2} />
        </Animated.View>
        <Animated.View
          style={[moonStyle, { position: 'absolute' }]}
          className="items-center justify-center"
        >
          <Moon color={darkModeIconColor} size={22} strokeWidth={2} />
        </Animated.View>
      </View>
    </AnimatedPressable>
  );
}
