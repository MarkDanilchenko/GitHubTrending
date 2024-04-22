// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const { check } = require('express-validator');
const syncController = require('../controllers/sync_controller.js');

// --------------------------------------URLS "/api/v1/..."
// http://localhost:3000/api/v1/repos_sync
router.route('/repos_sync').post(syncController.syncTrendingRepos);
// http://localhost:3000/api/v1/repos_all
router.route('/repos_all').get(syncController.getTrendingRepos);
// http://localhost:3000/api/v1/repos_single/:nameOrId
router.route('/repos_single/:nameOrId').get(syncController.getTrendingReposExact);

// --------------------------------------EXPORT
module.exports = { router };
