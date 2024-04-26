import { createStore } from 'vuex';
import { color_mode } from '@/store/color_mode.js';

export default createStore({
	state: () => ({}),
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		color_mode: color_mode,
	},
});
