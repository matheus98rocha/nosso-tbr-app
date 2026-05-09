import { LogOut } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import type { HomeScreenProps } from "./HomeScreen.types";

export default function HomeScreen({
  displayName,
  isLoggingOut,
  onLogoutPress,
}: HomeScreenProps) {
  return (
    <SafeAreaView
      className="flex-1 bg-neutral-50 dark:bg-neutral-950"
      edges={["top", "bottom"]}
    >
      <View className="flex-1 px-6 pt-2">
        <View className="flex-1 items-center justify-center">
          <Animated.View
            entering={FadeInDown.duration(380)
              .delay(40)
              .easing(Easing.out(Easing.cubic))}
          >
            <Text className="text-center text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              {displayName}
            </Text>
          </Animated.View>

          <Animated.View
            className="mt-6"
            entering={FadeInDown.duration(400)
              .delay(110)
              .easing(Easing.out(Easing.cubic))}
          >
            <Pressable
              accessibilityLabel="Sair da conta"
              accessibilityRole="button"
              disabled={isLoggingOut}
              className={`flex-row items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-2.5 active:opacity-80 dark:border-neutral-600 dark:bg-neutral-900 ${isLoggingOut ? "opacity-60" : ""}`}
              onPress={onLogoutPress}
            >
              {isLoggingOut ? (
                <ActivityIndicator accessibilityLabel="Saindo" size="small" />
              ) : (
                <>
                  <LogOut color="#0c4a6e" size={18} />
                  <Text className="text-base font-semibold text-sky-900 dark:text-sky-400">
                    Sair
                  </Text>
                </>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
