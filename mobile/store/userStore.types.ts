export type AuthUser = {
  readonly id: string;
  readonly email?: string;
  readonly displayName?: string;
};

export type UserSlice = {
  user: AuthUser | null;
  isSessionHydrated: boolean;
  setUser: (user: AuthUser | null) => void;
  setSessionHydrated: (value: boolean) => void;
  clearUser: () => void;
};
