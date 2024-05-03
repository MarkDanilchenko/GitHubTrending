// --------------------------------------DB_MODELS_CONFIG
const { mongoose } = require('./db.js');
const Schema = mongoose.Schema;

// --------------------------------------SCHEMAS
const TrendingGitReposSchema = new Schema(
	{
		full_name: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		git_id: {
			type: Number,
			required: true,
			unique: true,
		},
		owner_login: {
			type: String,
			required: true,
		},
		html_url: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			default: '',
		},
		stargazers_count: {
			type: Number,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

// --------------------------------------MODELS
const TrendingGitRepos = mongoose.model('TrendingGitRepos', TrendingGitReposSchema);

// --------------------------------------EXPORT
module.exports = { TrendingGitRepos, mongoose };
