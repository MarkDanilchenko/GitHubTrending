// --------------------------------------CONTROLLER_SYNC_CONFIG
const { Octokit } = require('octokit');
const octokit = new Octokit({});
const { validationResult } = require('express-validator');
const { TrendingGitRepos } = require('../models/models.js');
let autoSync = require('./autosync.js');

// --------------------------------------CONTROLLER_SYNC
class SyncController {
	async syncTrendingRepos(req, res) {
		try {
			if (req.body.language === undefined || !['python', 'ruby', 'javascript'].includes(req.body.language)) {
				return res.status(400).json({ message: 'Invalid or missing language! Valid languages are: [ python, ruby, javascript ]' });
			}
			// ----------------------refresh auto sync timer
			autoSync.autoSyncTimer._idleTimeout > 0 ? autoSync.refreshTimer() : null;
			const result = await octokit.request('GET /search/repositories', {
				q: `stars:>=10000 language:${req.body.language}`,
				sort: 'stars',
				order: 'desc',
				per_page: 100,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
					Accept: 'application/vnd.github.v3+json',
				},
			});
			if (result.status === 200) {
				if ((await TrendingGitRepos.find({ language: { $regex: new RegExp(`^${req.body.language}$`, 'i') } })).length > 0) {
					await TrendingGitRepos.deleteMany({ language: { $regex: new RegExp(`^${req.body.language}$`, 'i') } });
				}
				for (const repo of result.data.items) {
					await TrendingGitRepos.create({
						full_name: repo.full_name,
						name: repo.name,
						git_id: repo.id,
						owner_login: repo.owner.login,
						html_url: repo.html_url,
						description: repo.description ? repo.description : 'Without description...',
						stargazers_count: repo.stargazers_count,
						language: repo.language,
					}).catch((error) => console.log(error));
				}
				res.status(200);
				res.json({ message: 'Sync completed!' });
				res.end();
			} else {
				res.status(500);
				res.json({ message: 'Sync failed!' });
				res.end();
			}
		} catch (error) {
			console.log(error);
			res.status(500);
			res.json({ message: 'Error: ' + error.message });
			res.end();
		}
	}
	async getTrendingRepos(req, res) {
		try {
			// >>>CURSOR-BASED PAGINATION
			// let query = {};
			// if (req.query.cursor) {
			// 	query = { _id: { $gt: req.query.cursor } };
			// }
			// const result = await TrendingGitRepos.find(query).sort({ _id: 1 }).limit(11);
			// if (result.length === 0) {
			// 	res.status(200);
			// 	res.json({ message: 'No data found!' });
			// 	res.end();
			// } else {
			// 	res.status(200);
			// 	res.json({
			// 		data: result,
			// 		cursor: result[result.length - 1]._id,
			// 	});
			// 	res.end();
			// }

			// >>>AGGREGATE PAGINATION
			const page = req.query.page ? parseInt(req.query.page) : 1;
			const limit = req.query.limit ? parseInt(req.query.limit) : 10;
			const skip = (page - 1) * limit;
			const sortMethod = req.body.sortMethod ? req.body.sortMethod : 'stargazers_count';
			let sortDirection = null;
			switch (sortMethod) {
				case 'stargazers_count':
					sortDirection = -1;
					break;
				case 'name':
					sortDirection = 1;
					break;
				case 'language':
					sortDirection = 1;
					break;
			}
			const result = await TrendingGitRepos.aggregate([{ $sort: { [sortMethod]: sortDirection } }, { $skip: skip }, { $limit: limit }]);
			if (result.length === 0) {
				res.status(200);
				res.json({ message: 'No data found!' });
				res.end();
			} else {
				res.status(200);
				res.json({
					data: result,
					pageInfo: {
						page: page,
						limit: limit,
						totalItems: await TrendingGitRepos.countDocuments({}),
						totalPages: Math.ceil((await TrendingGitRepos.countDocuments({})) / limit),
						previousPage: page > 1 ? page - 1 : null,
						nextPage: page < Math.ceil((await TrendingGitRepos.countDocuments({})) / limit) ? page + 1 : null,
					},
				});
				res.end();
			}

			// >>>SIMPLE SKIPLIMIT PAGINATION
			// const page = req.query.page ? parseInt(req.query.page) : 1;
			// const limit = req.query.limit ? parseInt(req.query.limit) : 10;
			// const skip = (page - 1) * limit;
			// const result = await TrendingGitRepos.find({}).sort({ stargazers_count: -1 }).skip(skip).limit(limit);
			// if (result.length === 0) {
			// 	res.status(200);
			// 	res.json({ message: 'No data found!' });
			// 	res.end();
			// } else {
			// 	res.status(200);
			// 	res.json({
			// 		data: result,
			// 		pageInfo: {
			// 			page: page,
			// 			limit: limit,
			// 			totalItems: await TrendingGitRepos.countDocuments({}),
			// 			totalPages: Math.ceil((await TrendingGitRepos.countDocuments({})) / limit),
			// 			prevPage: page > 1 ? page - 1 : null,
			// 			nextPage: page < Math.ceil((await TrendingGitRepos.countDocuments({})) / limit) ? page + 1 : null,
			// 		},
			// 	});
			// 	res.end();
			// }

			// >>>WITHOUT PAGINATION
			// let result = await TrendingGitRepos.find({}).sort({ stargazers_count: -1 });
			// if (result.length === 0) {
			// 	res.status(200);
			// 	res.json({ message: 'No data found!' });
			// 	res.end();
			// } else {
			// 	res.status(200);
			// 	res.json(result);
			// 	res.end();
			// }
		} catch (error) {
			console.log(error);
			res.status(500);
			res.json({ message: 'Error: ' + error.message });
			res.end();
		}
	}
	async getTrendingReposExact(req, res) {
		try {
			let result = null;
			if (typeof req.params.nameOrId === 'string') {
				result = await TrendingGitRepos.findOne({ name: { $regex: new RegExp(`^${req.params.nameOrId}$`, 'i') } });
			} else {
				result = await TrendingGitRepos.findOne({ git_id: req.params.nameOrId });
			}
			if (result === null) {
				res.status(200);
				res.json({ message: 'No data found!' });
				res.end();
			} else {
				res.status(200);
				res.json(result);
				res.end();
			}
		} catch (error) {
			console.log(error);
			res.status(500);
			res.json({ message: 'Error: ' + error.message });
			res.end();
		}
	}
	async stopAutoSync(req, res) {
		try {
			if (autoSync.autoSyncTimer._idleTimeout > 0) {
				autoSync.stopTimer();
				res.status(200);
				res.json({ message: 'Auto sync disabled!' });
				res.end();
			} else {
				res.status(208);
				res.json({ message: 'Auto sync already disabled!' });
				res.end();
			}
		} catch (error) {
			console.log('Error: ' + error.message);
			res.status(500);
			res.end();
		}
	}
	async startAutoSync(req, res) {
		try {
			if (autoSync.autoSyncTimer._idleTimeout > 0) {
				res.status(208);
				res.json({ message: 'Auto sync already enabled!' });
				res.end();
			} else {
				autoSync.startTimer();
				res.status(200);
				res.json({ message: 'Auto sync started!' });
				res.end();
			}
		} catch (error) {
			console.log('Error: ' + error.message);
			res.status(500);
			res.end();
		}
	}
	async statusAutoSync(req, res) {
		try {
			if (autoSync.autoSyncTimer._idleTimeout > 0) {
				res.status(200);
				res.json({ status: 'enabled' });
				res.end();
			} else {
				res.status(200);
				res.json({ status: 'disabled' });
				res.end();
			}
		} catch (error) {
			console.log('Error: ' + error.message);
			res.status(500);
			res.end();
		}
	}
}

// --------------------------------------EXPORT
module.exports = new SyncController();
