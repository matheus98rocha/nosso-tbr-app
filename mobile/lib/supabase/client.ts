import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import { env } from '@/lib/env';

const supabaseUrl =
  env.supabaseUrl.trim().length > 0
    ? env.supabaseUrl.trim()
    : 'https://configure-no-env.supabase.co';

const supabaseAnonKey =
  env.supabaseAnonKey.trim().length > 0
    ? env.supabaseAnonKey.trim()
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.configure-placeholder';

const memoryAuthStorage = () => ({
  getItem: async () => null as string | null,
  setItem: async () => undefined,
  removeItem: async () => undefined,
});

const webLocalStorage = () => ({
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
});

const createAuthStorage = () => {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') {
      return memoryAuthStorage();
    }
    return webLocalStorage();
  }
  return AsyncStorage;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createAuthStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
