import express from "express";
import repositoriesController from "#server/controllers/repositories.js";
import validateRequest from "#server/middlewares/requestValidation.js";
import { getRepositoriesListSchema, getRepositorySchema } from "#server/utils/validationSchemas/repositoriesSync.js";

const router = express.Router();

router.route("/").get(validateRequest(getRepositoriesListSchema), repositoriesController.getRepos);
router.route("/:id").get(validateRequest(getRepositorySchema), repositoriesController.getExactRepo);

export default router;
