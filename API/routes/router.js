// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const { check } = require('express-validator');
const syncController = require('../controllers/sync_controller.js');

// --------------------------------------URLS "/api/v1/..."
// http://localhost:3000/api/v1/repos_sync
router.route('/repos_sync').post(syncController.syncTrendingRepos);
// http://localhost:3000/api/v1/repos_all?sortBy=null&limit=null&page=null
router.route('/repos_all').get(syncController.getTrendingRepos);
// http://localhost:3000/api/v1/repos_single/:nameOrId
router.route('/repos_single/:nameOrId').get(syncController.getTrendingReposExact);
// http://localhost:3000/api/v1/stop_auto_sync
router.route('/stop_auto_sync').get(syncController.stopAutoSync);
// http://localhost:3000/api/v1/start_auto_sync
router.route('/start_auto_sync').get(syncController.startAutoSync);
// http://localhost:3000/api/v1/status_auto_sync
router.route('/status_auto_sync').get(syncController.statusAutoSync);

// --------------------------------------EXPORT
module.exports = { router };
