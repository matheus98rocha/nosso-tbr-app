import { ActivityIndicator, View } from 'react-native';

import { LoginScreen, useLoginScreenLayout } from '@/features/auth';
import { HomeScreen, useHomeScreen } from '@/features/home';
import { useUserStore } from '@/store';

export default function IndexRoute() {
  const isSessionHydrated = useUserStore((s) => s.isSessionHydrated);
  const user = useUserStore((s) => s.user);
  const loginProps = useLoginScreenLayout();
  const homeProps = useHomeScreen();

  if (!isSessionHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <ActivityIndicator accessibilityLabel="Carregando sessão" size="large" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen {...loginProps} />;
  }

  return <HomeScreen {...homeProps} />;
}
