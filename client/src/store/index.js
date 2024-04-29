import { createStore } from 'vuex';
import { color_mode } from '@/store/color_mode.js';
import { git_autoSync } from '@/store/git_autoSync.js';

export default createStore({
	state: () => ({}),
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		color_mode: color_mode,
		git_autoSync: git_autoSync,
	},
});
