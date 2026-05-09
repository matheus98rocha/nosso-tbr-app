import { z } from 'zod';

export const exploreSchema = z.object({
  email: z.string().email('E-mail inválido'),
});
