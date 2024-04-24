// --------------------------------------AUTOSYNC_CONFIG
const { Octokit } = require('octokit');
const octokit = new Octokit({});
const { TrendingGitRepos } = require('../models/models.js');

// --------------------------------------AUTOSYNC
class AutoSync {
	autoSyncTimer = null;
	languages = ['python', 'ruby', 'javascript'];
	remaining = process.env.AUTO_SYNC_TIME || 3600;

	run = async () => {
		console.log('Auto sync is running:');
		try {
			// for (let i = 0; i < this.languages.length; i++) {
			// 	console.log(`Syncing ${this.languages[i]}...`);
			// }
			for (const language of this.languages) {
				console.log(`Syncing ${language}...`);
				const result = await octokit.request('GET /search/repositories', {
					q: `stars:>=10000 language:${language}`,
					sort: 'stars',
					order: 'desc',
					per_page: 100,
					headers: {
						'X-GitHub-Api-Version': '2022-11-28',
						Accept: 'application/vnd.github.v3+json',
					},
				});
				if (result.status === 200) {
					if ((await TrendingGitRepos.find({ language: { $regex: new RegExp(`^${language}$`, 'i') } })).length > 0) {
						await TrendingGitRepos.deleteMany({ language: { $regex: new RegExp(`^${language}$`, 'i') } });
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
				} else {
					throw new Error('Auto sync failed!');
				}
			}
			console.log(`Auto sync completed! Remaining in ${this.remaining} seconds...`);
		} catch (error) {
			console.log(error);
		}
		this.autoSyncTimer = setTimeout(this.run, 1000 * this.remaining);
	};
	async startTimer() {
		console.log(`Auto sync started!`);
		this.run();
	}
	async stopTimer() {
		console.log('Auto sync disabled!');
		clearTimeout(this.autoSyncTimer);
	}
	async refreshTimer() {
		console.log(`Auto sync timer refreshed! Remaining in ${this.remaining} seconds...`);
		this.autoSyncTimer.refresh();
	}
}

// --------------------------------------EXPORT
module.exports = new AutoSync();
