import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import type { User } from '@supabase/supabase-js';

import { mapUserToAuthUser, supabase } from '@/lib/supabase';
import { useUserStore } from '@/store';

export default function useSessionBootstrap(): void {
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const setSessionHydrated = useUserStore((s) => s.setSessionHydrated);

  const applySessionUser = useCallback(
    (sessionUser: User | null | undefined) => {
      if (sessionUser) {
        setUser(mapUserToAuthUser(sessionUser));
      } else {
        clearUser();
      }
      setSessionHydrated(true);
    },
    [clearUser, setSessionHydrated, setUser],
  );

  const syncSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      clearUser();
      setSessionHydrated(true);
      Alert.alert('Sessão', 'Não foi possível validar a sessão atual. Faça login novamente.');
      return;
    }
    const sessionUser = data.session?.user;
    applySessionUser(sessionUser);
  }, [applySessionUser, clearUser, setSessionHydrated]);

  useEffect(() => {
    void syncSession();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      applySessionUser(session?.user);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [applySessionUser, syncSession]);
}
