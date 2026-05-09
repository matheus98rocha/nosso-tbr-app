import 'react-native-gesture-handler';
import 'react-native-reanimated';

import '../global.css';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import RootLayoutNav from '@/components/RootLayoutNav';
import useRootBootstrap from '@/hooks/useRootBootstrap';
import RootProviders from '@/providers';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { error, isReady } = useRootBootstrap();

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  if (!isReady) {
    return null;
  }

  return (
    <RootProviders>
      <RootLayoutNav />
    </RootProviders>
  );
}
