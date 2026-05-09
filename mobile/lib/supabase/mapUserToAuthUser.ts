import type { User } from '@supabase/supabase-js';

import type { AuthUser } from '@/store/userStore.types';

export default function mapUserToAuthUser(user: User): AuthUser {
  const meta = user.user_metadata as Record<string, unknown> | null | undefined;
  const fromMeta = meta?.full_name ?? meta?.name ?? meta?.display_name;
  let displayName: string | undefined;
  if (typeof fromMeta === 'string' && fromMeta.trim().length > 0) {
    displayName = fromMeta.trim();
  } else if (user.email) {
    displayName = user.email.split('@')[0];
  }
  return {
    id: user.id,
    email: user.email ?? undefined,
    displayName,
  };
}
