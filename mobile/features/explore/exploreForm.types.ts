import type { z } from 'zod';

import { exploreSchema } from './exploreSchema';

export type ExploreFormValues = z.infer<typeof exploreSchema>;
