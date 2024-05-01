import axios from 'axios';
let APIURL = process.env.SERVER_HOST && process.env.DB_HOST ? `` : `http://127.0.0.1:3000`;

export const git_autoSync = {
	namespaced: true,
	state: () => ({
		autoSyncStatus: true,
	}),
	getters: {},
	mutations: {
		setAutoSyncStatus(state, value) {
			state.autoSyncStatus = value;
		},
	},
	actions: {
		async startAutoSync({ commit, state }) {
			await axios
				.get(`${APIURL}/api/v1/start_auto_sync`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				})
				.then((response) => {
					if (response.status === 200) {
						commit('setAutoSyncStatus', true);
					} else if (response.status === 208) {
						alert(response.data.message);
						console.log(response.data.message);
					}
				})
				.catch((error) => {
					alert('Unexpected error! Auto sync functions failed!');
					console.log('Unexpected error! Auto sync functions failed!');
				});
		},
		async stopAutoSync({ commit, state }) {
			await axios
				.get(`${APIURL}/api/v1/stop_auto_sync`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				})
				.then((response) => {
					if (response.status === 200) {
						commit('setAutoSyncStatus', false);
					} else if (response.status === 208) {
						alert(response.data.message);
						console.log(response.data.message);
					}
				})
				.catch((error) => {
					alert('Unexpected error! Auto sync functions failed!');
					console.log('Unexpected error! Auto sync functions failed!');
				});
		},
		async statusAutoSync({ commit, state }) {
			await axios
				.get(`${APIURL}/api/v1/status_auto_sync`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				})
				.then((response) => {
					if (response.data.status === 'enabled') {
						commit('setAutoSyncStatus', true);
					} else if (response.data.status === 'disabled') {
						commit('setAutoSyncStatus', false);
					}
				})
				.catch((error) => {
					console.log(error.message);
				});
		},
		async syncTrendingRepos({ commit, state }, params) {
			let result = await axios.post(`${APIURL}/api/v1/repos_sync`, params, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});
			return result;
		},
		async getTrendingReposExact({ commit, state }, params) {
			let result = await axios.get(`${APIURL}/api/v1/repos_single/${params.nameOrId}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});
			return result;
		},
		async getTrendingRepos({ commit, state }, params) {
			let result = await axios.get(`${APIURL}/api/v1/repos_all?sortBy=${params.sortBy}&limit=${params.limit}&page=${params.page}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});
			return result;
		},
	},
};
