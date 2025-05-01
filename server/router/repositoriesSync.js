import express from "express";
import repositoriesSyncController from "../controllers/repositoriesSync.js";
import validateRequest from "../middlewares/requestValidation.js";
import { manualSyncRepositoriesSchema } from "../utils/validationSchemas/repositoriesSync.js";

const router = express.Router();

router
  .route("/manual")
  .post(
    validateRequest(manualSyncRepositoriesSchema),
    repositoriesSyncController.manualSync.bind(repositoriesSyncController),
  );
router.route("/status").get(repositoriesSyncController.autoSyncStatus);
router.route("/enable").post(repositoriesSyncController.autoSyncEnable.bind(repositoriesSyncController));
router.route("/disable").post(repositoriesSyncController.autoSyncDisable);
router.route("/refresh").post(repositoriesSyncController.autoSyncRefresh);

export default router;
