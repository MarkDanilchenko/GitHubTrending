import axios from "axios";
import { expressOptionsVite } from "../env.js";

let url = "";
if (expressOptionsVite.host === "127.0.0.1") {
  url = `http://${expressOptionsVite.host}:${expressOptionsVite.port}`;
}

const synchronization = {
  namespaced: true,
  state: () => ({
    autoSyncStatus: null,
  }),
  getters: {},
  mutations: {
    setAutoSyncStatus(state, autoSyncStatus) {
      state.autoSyncStatus = autoSyncStatus;
    },
  },
  actions: {
    async getAutoSyncStatus({ commit }) {
      try {
        const response = await axios.get(`${url}/api/v1/repos/sync/status`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        commit("setAutoSyncStatus", response.data.status === "enabled" ? true : false);
      } catch {
        commit("setAutoSyncStatus", false);
      }
    },
  },
};

export default synchronization;
