import { create } from 'zustand';

import type { UserSlice } from './userStore.types';

export const useUserStore = create<UserSlice>((set) => ({
  user: null,
  isSessionHydrated: false,
  setUser: (user) => set({ user }),
  setSessionHydrated: (value) => set({ isSessionHydrated: value }),
  clearUser: () => set({ user: null }),
}));
