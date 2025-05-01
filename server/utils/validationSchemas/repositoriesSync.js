import { z } from "zod";
import { syncReposLangs, syncReposStars } from "#shared/constants/index.js";

const manualSyncRepositoriesSchema = z.object({
  body: z.object({
    lang: z.enum(syncReposLangs),
    stars: z.number().nonnegative().optional().default(syncReposStars),
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
    sort: z.enum(["name", "stargazers_count", "language"]).optional().default("stargazers_count"),
    order: z.enum(["1", "-1"]).optional().default("-1"),
    limit: z.coerce.number().min(1).max(100).default(10),
    offset: z.coerce.number().min(0).default(0),
  }),
});

export { manualSyncRepositoriesSchema, getRepositorySchema, getRepositoriesListSchema };
