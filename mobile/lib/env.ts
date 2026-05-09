const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
const apiBase = process.env.EXPO_PUBLIC_API_BASE ?? '';

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  apiBase,
} as const;
