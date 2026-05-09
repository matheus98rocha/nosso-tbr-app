import { useCallback, useEffect } from 'react';

import { mapUserToAuthUser, supabase } from '@/lib/supabase';
import { useUserStore } from '@/store';

export default function useSessionBootstrap(): void {
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const setSessionHydrated = useUserStore((s) => s.setSessionHydrated);

  const syncSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const sessionUser = data.session?.user;
    if (sessionUser) {
      setUser(mapUserToAuthUser(sessionUser));
    } else {
      clearUser();
    }
    setSessionHydrated(true);
  }, [clearUser, setSessionHydrated, setUser]);

  useEffect(() => {
    void syncSession();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void syncSession();
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [syncSession]);
}
