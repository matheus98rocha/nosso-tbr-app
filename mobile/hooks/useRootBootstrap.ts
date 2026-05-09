import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { UseRootBootstrapResult } from './useRootBootstrap.types';

export default function useRootBootstrap(): UseRootBootstrapResult {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const finalize = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      setIsReady(true);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    }
  }, []);

  useEffect(() => {
    void finalize();
  }, [finalize]);

  return useMemo(
    () => ({
      isReady,
      error,
    }),
    [error, isReady],
  );
}
