import axios from "axios";
import { expressOptions } from "#/env.js";

let url = "";
if (expressOptions.host === "127.0.0.1") {
  url = `http://${expressOptions.host}:${expressOptions.port}`;
}

const synchronization = {
  namespaced: true,
  state: () => ({
    autoSyncStatus: false,
  }),
  getters: {},
  mutations: {
    setAutoSyncStatus(state, autoSyncStatus) {
      state.autoSyncStatus = autoSyncStatus;
    },
  },
  actions: {
    async getAutoSyncStatus({ commit }) {
      const response = await axios.get(`${url}/api/v1/repos/sync/status`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      commit("setAutoSyncStatus", response.data.status === "enabled" ? true : false);
    },
    async autoSyncEnable({ commit }) {
      commit("setAutoSyncStatus", true);

      const response = await axios.post(`${url}/api/v1/repos/sync/enable`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        commit("setAutoSyncStatus", false);

        return alert("Auto sync failed! Please try again.");
      }
    },
    async autoSyncDisable({ commit }) {
      await axios.post(`${url}/api/v1/repos/sync/disable`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      commit("setAutoSyncStatus", false);
    },
    async getExactRepo(params) {
      const response = await axios.get(`${url}/api/v1/repos/${params.nameOrId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
    async getRepos(params) {
      const response = await axios.get(`${url}/api/v1/repos`, {
        params: {
          ...params,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
  },
};

export default synchronization;
