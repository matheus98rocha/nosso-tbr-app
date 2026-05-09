import 'react-native-gesture-handler';
import 'react-native-reanimated';

import '../global.css';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import RootLayoutNav from '@/components/RootLayoutNav';
import useRootBootstrap from '@/hooks/useRootBootstrap';
import RootProviders from '@/providers';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { error, isReady } = useRootBootstrap();
  const [rootSubtreeReady, setRootSubtreeReady] = useState(false);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (!isReady) {
      setRootSubtreeReady(false);
      return;
    }
    const frame = requestAnimationFrame(() => {
      setRootSubtreeReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [isReady]);

  if (!isReady || !rootSubtreeReady) {
    return null;
  }

  return (
    <RootProviders>
      <RootLayoutNav />
    </RootProviders>
  );
}
