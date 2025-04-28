import { z } from "zod";

const manualSyncRepositoriesSchema = z.object({
  body: z.object({
    programLanguage: z.string(),
    minStarsAmount: z.number().min(0),
  }),
});

export { manualSyncRepositoriesSchema };
