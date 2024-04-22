// --------------------------------------CONTROLLER_SYNC_CONFIG
const { Octokit } = require('octokit');
const octokit = new Octokit({});
const { validationResult } = require('express-validator');
const { TrendingGitRepos } = require('../models/models.js');

// --------------------------------------CONTROLLER_SYNC
class SyncController {
	async syncTrendingRepos(req, res) {
		try {
			if (req.body.language === undefined || !['python', 'ruby', 'javascript'].includes(req.body.language)) {
				return res.status(400).json({ message: 'Invalid or missing language! Valid languages: [ python, ruby, javascript ]' });
			}
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
				if ((await TrendingGitRepos.find({ language: req.body.language })).length > 0) {
					await TrendingGitRepos.deleteMany({ language: req.body.language });
				}
				for (const repo of result.data.items) {
					await TrendingGitRepos.create({
						full_name: repo.full_name,
						git_id: repo.id,
						owner_login: repo.owner.login,
						html_url: repo.html_url,
						description: repo.description ? repo.description : 'Without description...',
						stargazers_count: repo.stargazers_count,
						language: repo.language.toLowerCase(),
					}).catch((error) => console.log(error));
				}
				res.status(200);
				res.json({ message: 'Sync operation completed!' });
				res.end();
			} else {
				res.status(500);
				res.json({ message: 'Sync operation failed!' });
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
			const result = await TrendingGitRepos.find({}).sort({ stargazers_count: -1 });
			if (result.length === 0) {
				res.status(200);
				res.json({ message: 'No data found!' });
				res.end();
			} else {
				res.status(200);
				res.json(JSON.stringify(result));
				res.end();
			}
		} catch (error) {
			console.log(error);
			res.status(500);
			res.json({ message: 'Error: ' + error.message });
			res.end();
		}
	}
	async getTrendingReposExact(req, res) {
		try {
			const result = await TrendingGitRepos.findOne({ $or: [{ full_name: req.params.nameOrId }, { git_id: req.params.nameOrId }] });
			if (result === null) {
				res.status(200);
				res.json({ message: 'No data found!' });
				res.end();
			} else {
				res.status(200);
				res.json(JSON.stringify(result));
				res.end();
			}
		} catch (error) {
			console.log(error);
			res.status(500);
			res.json({ message: 'Error: ' + error.message });
			res.end();
		}
	}
}

// --------------------------------------EXPORT
module.exports = new SyncController();
