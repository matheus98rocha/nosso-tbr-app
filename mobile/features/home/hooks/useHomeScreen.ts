import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { supabase } from '@/lib';
import { useUserStore } from '@/store';

import type { HomeScreenProps } from '../components/HomeScreen.types';

export default function useHomeScreen(): HomeScreenProps {
  const displayName = useUserStore((s) => {
    const u = s.user;
    if (u?.displayName?.trim()) return u.displayName.trim();
    if (u?.email) return u.email;
    return 'Usuário';
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const performLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Sair', 'Não foi possível encerrar a sessão. Tente novamente.');
      }
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  const onLogoutPress = useCallback(() => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { style: 'cancel', text: 'Cancelar' },
      { style: 'destructive', text: 'Sair', onPress: () => void performLogout() },
    ]);
  }, [performLogout]);

  return useMemo(
    () => ({
      displayName,
      isLoggingOut,
      onLogoutPress,
    }),
    [displayName, isLoggingOut, onLogoutPress],
  );
}
