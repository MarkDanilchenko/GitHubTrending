import express from "express";
import repositoriesSyncController from "../controllers/repositoriesSync.js";
import validateRequest from "../middlewares/requestValidation.js";
import { manualSyncRepositoriesSchema } from "../utils/validationSchemas/repositoriesSync.js";

const router = express.Router();

// router.route("/manual").post(validateRequest(manualSyncRepositoriesSchema), repositoriesSyncController.manualSync);
router.route("/status").get(repositoriesSyncController.autoSyncStatus);
router.route("/enable").post(repositoriesSyncController.autoSyncEnable.bind(repositoriesSyncController));
router.route("/disable").post(repositoriesSyncController.autoSyncDisable);
router.route("/refresh").post(repositoriesSyncController.autoSyncRefresh);

// // http://localhost:3000/api/v1/repos_sync
// router.route("/repos_sync").post(syncController.syncTrendingRepos);
// // http://localhost:3000/api/v1/stop_auto_sync
// router.route("/stop_auto_sync").get(syncController.stopAutoSync);
// // http://localhost:3000/api/v1/start_auto_sync
// router.route("/start_auto_sync").get(syncController.startAutoSync);
// // http://localhost:3000/api/v1/status_auto_sync
// router.route("/status_auto_sync").get(syncController.statusAutoSync);

export default router;
