// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const { check } = require('express-validator');

// --------------------------------------URLS "/api/v1/..."
// http://localhost:3000/api/v1/force_sync
router.route('/force_sync');
// http://localhost:3000/api/v1/repos_all
router.route('/repos_all');
// http://localhost:3000/api/v1/repos_single/:nameOrId
router.route('/repos_single/:nameOrId');

// --------------------------------------EXPORT
module.exports = { router };
