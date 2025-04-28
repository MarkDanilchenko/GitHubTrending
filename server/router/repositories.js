import express from "express";
import repositoriesController from "../controllers/repositories.js";

const router = express.Router();

router.route("/").get(repositoriesController.getRepos);
router.route("/:id").get(repositoriesController.getExactRepo);

export default router;
