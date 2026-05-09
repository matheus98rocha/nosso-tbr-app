import { useMemo } from 'react';

import type { ModalScreenViewProps } from '../components/ModalScreenView.types';

export default function useModalScreen(): ModalScreenViewProps {
  const title = useMemo(() => 'Sobre o app', []);
  const body = useMemo(
    () => 'Este é o cliente móvel do Nosso TBR em Expo Router, NativeWind e TanStack Query.',
    [],
  );

  return useMemo(
    () => ({
      title,
      body,
    }),
    [body, title],
  );
}
