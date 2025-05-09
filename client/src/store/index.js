import { createStore } from "vuex";
import synchronization from "./synchronization.js";

export default createStore({
  state: () => ({
    colorMode: null,
  }),
  getters: {},
  mutations: {
    setColorMode(state, colorMode) {
      state.colorMode = colorMode;
    },
  },
  actions: {},
  modules: {
    synchronization,
  },
});
