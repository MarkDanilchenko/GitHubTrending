export const color_mode = {
	namespaced: true,
	state: () => ({
		colorMode: localStorage.getItem('colorMode'),
	}),
	getters: {},
	mutations: {
		setColorMode(state, value) {
			state.colorMode = value;
		},
	},
	actions: {},
};
