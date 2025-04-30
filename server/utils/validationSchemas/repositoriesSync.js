import { z } from "zod";

const manualSyncRepositoriesSchema = z.object({
  body: z.object({
    programLanguage: z.string(),
    minStarsAmount: z.number().min(0),
  }),
});

const getRepositorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const getRepositoriesListSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    sort: z.string().optional().default("stargazers_count"),
    order: z.enum(["1", "-1"]).optional().default("-1"),
    limit: z.coerce.number().min(1).max(100).default(10),
    offset: z.coerce.number().min(0).default(0),
  }),
});

export { manualSyncRepositoriesSchema, getRepositorySchema, getRepositoriesListSchema };
