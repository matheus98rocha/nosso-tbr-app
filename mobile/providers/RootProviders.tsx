import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import useSessionBootstrap from '@/hooks/useSessionBootstrap';

import type { RootProvidersProps } from './RootProviders.types';

function SessionRunner() {
  useSessionBootstrap();
  return null;
}

export default function RootProviders({ children }: RootProvidersProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
          },
        },
      }),
    [],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SessionRunner />
        {children}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
